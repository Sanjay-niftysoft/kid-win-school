<?php
/**
 * Kidwin Preschool - Online Admission Registration API Endpoint
 * Pure PHP Direct Socket SMTP Implementation (Zero external dependencies needed).
 * Connects directly to smtp.gmail.com:587 over TLS & sends email + attachments.
 */

// Allow CORS for local dev testing
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed. Only POST requests are accepted.']);
    exit;
}

$configPath = __DIR__ . '/../config/mail.php';
$config = file_exists($configPath) ? require $configPath : [
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 587,
    'smtp_username' => 'kathiravankathir910@gmail.com',
    'smtp_password' => 'foggenswltkjcwck',
    'smtp_encryption' => 'tls',
    'school_email' => 'sanjay@niftysoft.in',
    'max_file_size' => 1 * 1024 * 1024,
    'allowed_extensions' => ['jpg', 'jpeg', 'png', 'pdf'],
    'blocked_extensions' => ['php', 'exe', 'sh', 'js', 'html', 'phtml']
];

/**
 * Native Pure PHP Socket SMTP Mailer
 * Connects directly to SMTP Server over TCP/TLS and sends MIME emails.
 */
function sendSmtpEmail($to, $subject, $htmlBody, $attachments, $config, $replyToEmail = '', $replyToName = '') {
    $host = $config['smtp_host'];
    $port = $config['smtp_port'];
    $username = $config['smtp_username'];
    $password = $config['smtp_password'];
    $from = $username;
    $fromName = $config['school_name'] ?? 'Kidwin Preschool Admissions';

    // Socket Connection with strict 8 second connection timeout
    $socket = @fsockopen($host, $port, $errno, $errstr, 8);
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server {$host}:{$port} - {$errstr} ({$errno})");
    }

    // Set stream timeout to 5 seconds to prevent blocking on fgets
    stream_set_timeout($socket, 5);

    function readSmtpResponse($socket) {
        $response = '';
        while ($str = fgets($socket, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == ' ') break;
        }
        return $response;
    }

    function sendSmtpCommand($socket, $cmd, $expectedCode) {
        fputs($socket, $cmd . "\r\n");
        $res = readSmtpResponse($socket);
        if (substr($res, 0, 3) != $expectedCode) {
            throw new Exception("SMTP Command failed [{$cmd}]: " . trim($res));
        }
        return $res;
    }

    readSmtpResponse($socket);
    sendSmtpCommand($socket, "EHLO " . gethostname(), '250');

    // STARTTLS Upgrade for Port 587
    if ($port == 587 || $config['smtp_encryption'] === 'tls') {
        sendSmtpCommand($socket, "STARTTLS", '220');
        $cryptoMethod = STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
            $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
        }
        if (!stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
            throw new Exception("Failed to enable TLS encryption.");
        }
        stream_set_timeout($socket, 5);
        sendSmtpCommand($socket, "EHLO " . gethostname(), '250');
    }

    // SMTP Auth Login
    sendSmtpCommand($socket, "AUTH LOGIN", '334');
    sendSmtpCommand($socket, base64_encode($username), '334');
    sendSmtpCommand($socket, base64_encode($password), '235');

    // Mail Envelope
    sendSmtpCommand($socket, "MAIL FROM: <{$from}>", '250');
    sendSmtpCommand($socket, "RCPT TO: <{$to}>", '250');

    // DATA Command
    sendSmtpCommand($socket, "DATA", '354');

    // Construct MIME Multipart Body
    $boundary = "==Multipart_Boundary_x" . md5(time()) . "x";

    $headers  = "From: {$fromName} <{$from}>\r\n";
    $headers .= "To: <{$to}>\r\n";
    if (!empty($replyToEmail)) {
        $headers .= "Reply-To: {$replyToName} <{$replyToEmail}>\r\n";
    }
    $headers .= "Subject: {$subject}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    // HTML Message Part
    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";

    // File Attachments
    foreach ($attachments as $att) {
        if (file_exists($att['path'])) {
            $fileContent = file_get_contents($att['path']);
            $encodedContent = chunk_split(base64_encode($fileContent));
            $fileName = $att['name'];

            $body .= "--{$boundary}\r\n";
            $body .= "Content-Type: application/octet-stream; name=\"{$fileName}\"\r\n";
            $body .= "Content-Description: {$fileName}\r\n";
            $body .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $body .= $encodedContent . "\r\n\r\n";
        }
    }

    $body .= "--{$boundary}--\r\n";

    // Write Full Email Data
    fputs($socket, $headers . "\r\n" . $body . "\r\n.\r\n");
    $dataRes = readSmtpResponse($socket);
    if (substr($dataRes, 0, 3) != '250') {
        throw new Exception("Failed to send message data: " . trim($dataRes));
    }

    sendSmtpCommand($socket, "QUIT", '221');
    fclose($socket);

    return true;
}

try {
    function cleanInput($field) {
        return isset($_POST[$field]) ? htmlspecialchars(trim($_POST[$field]), ENT_QUOTES, 'UTF-8') : '';
    }

    // 1. Fetch Form Fields
    $childName        = cleanInput('childName');
    $preferredName    = cleanInput('preferredName');
    $childAge         = cleanInput('childAge');
    $dob              = cleanInput('dob');
    $gender           = cleanInput('gender');
    $address          = cleanInput('address');

    $academicYear     = cleanInput('academicYear');
    $program          = cleanInput('program');
    $startDate        = cleanInput('startDate');

    $parent1Name      = cleanInput('parent1Name');
    $parent1Occ       = cleanInput('parent1Occ');
    $parent1Mobile    = cleanInput('parent1Mobile');
    $parent1Email     = cleanInput('parent1Email');

    $parent2Name      = cleanInput('parent2Name');
    $parent2Occ       = cleanInput('parent2Occ');
    $parent2Mobile    = cleanInput('parent2Mobile');
    $relationship     = cleanInput('relationship');

    $motherTongue     = cleanInput('motherTongue');
    $hasSiblings      = cleanInput('hasSiblings');
    $siblingDetails   = cleanInput('siblingDetails');

    $emergencyName    = cleanInput('emergencyName');
    $emergencyRel     = cleanInput('emergencyRel');
    $emergencyMobile  = cleanInput('emergencyMobile');

    $hasAllergies     = cleanInput('hasAllergies');
    $allergiesDetail  = cleanInput('allergiesDetail');
    $hasMedical       = cleanInput('hasMedical');
    $medicalDetail    = cleanInput('medicalDetail');
    $dietary          = cleanInput('dietary');

    $howHeard         = cleanInput('howHeard');
    $additionalInfo   = cleanInput('additionalInfo');

    $parentSignName   = cleanInput('parentSignName');
    $signatureData    = cleanInput('signatureData');
    $signDate         = cleanInput('signDate');

    // 2. Mandatory Validation
    $errors = [];
    if (empty($childName)) $errors[] = "Child Name is required.";
    if (empty($dob)) $errors[] = "DOB is required.";
    if (empty($gender)) $errors[] = "Gender is required.";
    if (empty($address)) $errors[] = "Address is required.";
    if (empty($program)) $errors[] = "Program is required.";
    if (empty($parent1Name)) $errors[] = "Father / Parent 1 Name is required.";
    if (empty($parent1Mobile)) $errors[] = "Parent 1 Mobile is required.";
    if (empty($parent1Email) || !filter_var($parent1Email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid Parent 1 Email is required.";
    }
    if (empty($parent2Name)) $errors[] = "Mother / Parent 2 Name is required.";
    if (empty($parent2Mobile)) $errors[] = "Parent 2 Mobile is required.";
    if (empty($emergencyMobile)) $errors[] = "Emergency Mobile is required.";
    if (empty($parentSignName)) $errors[] = "Parent Signature Name is required.";

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Validation failed: ' . implode(' ', $errors)]);
        exit;
    }

    // 3. Generate Application ID
    $applicationId = 'KW' . date('Ymd') . rand(1000, 9999);

    // 4. Handle File Uploads
    $uploadDir = sys_get_temp_dir() . '/kidwin_uploads';
    if (!is_dir($uploadDir)) @mkdir($uploadDir, 0777, true);

    $tempFiles = [];
    function processUpload($fileKey, $fieldName, $config, &$tempFiles, $uploadDir) {
        if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] === UPLOAD_ERR_NO_FILE) return null;
        $file = $_FILES[$fileKey];

        if ($file['size'] > $config['max_file_size']) throw new Exception("File {$fieldName} exceeds 1MB limit.");

        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (in_array($ext, $config['blocked_extensions']) || !in_array($ext, $config['allowed_extensions'])) {
            throw new Exception("Invalid file extension for {$fieldName}. Allowed: JPG, PNG, PDF.");
        }

        $safeName = $fieldName . '_' . uniqid() . '.' . $ext;
        $permPath = $uploadDir . '/' . $safeName;
        move_uploaded_file($file['tmp_name'], $permPath);
        $tempFiles[] = ['path' => $permPath, 'name' => $safeName];
        return $safeName;
    }

    processUpload('childPhoto', 'Child_Photo', $config, $tempFiles, $uploadDir);
    processUpload('birthCertificate', 'Birth_Certificate', $config, $tempFiles, $uploadDir);
    processUpload('previousSchoolRecord', 'Previous_School_Record', $config, $tempFiles, $uploadDir);
    processUpload('medicalRecord', 'Medical_Record', $config, $tempFiles, $uploadDir);
    processUpload('signaturePhoto', 'Parent_Signature_Photo', $config, $tempFiles, $uploadDir);

    // Base64 Signature Image (Canvas Drawing or Data URL)
    if (!empty($signatureData) && strpos($signatureData, 'data:image') === 0) {
        list(, $data) = explode(',', $signatureData);
        $sigDecoded   = base64_decode($data);
        if ($sigDecoded !== false) {
            $sigPath = $uploadDir . '/Signature_' . $applicationId . '.png';
            file_put_contents($sigPath, $sigDecoded);
            $tempFiles[] = ['path' => $sigPath, 'name' => 'Parent_Signature.png'];
        }
    }

    // 5. Construct Email HTML
    $emailHtml = "
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <style>
        body { font-family: Arial, sans-serif; background-color: #fff; color: #333; margin: 0; padding: 10px; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 15px; }
        h1 { font-size: 18px; color: #1B75BC; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0; }
        .section-title { font-weight: bold; background: #f4f4f4; padding: 5px; margin-top: 15px; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 5px; }
        td { padding: 4px 8px; font-size: 13px; border-bottom: 1px solid #eee; vertical-align: top; }
        td.label { font-weight: bold; color: #555; width: 35%; }
      </style>
    </head>
    <body>
      <div class='container'>
        <h1>Kidwin Preschool Admission [ID: {$applicationId}]</h1>

        <div>
          <div class='section-title'>1. Child Information</div>
          <table>
            <tr><td class='label'>Child Name:</td><td>{$childName}</td></tr>
            <tr><td class='label'>Preferred / Nickname:</td><td>{$preferredName}</td></tr>
            <tr><td class='label'>Child's Age:</td><td>{$childAge}</td></tr>
            <tr><td class='label'>Date of Birth:</td><td>{$dob}</td></tr>
            <tr><td class='label'>Gender:</td><td>{$gender}</td></tr>
            <tr><td class='label'>Home Address:</td><td>{$address}</td></tr>
          </table>
          <div class='section-title'>2. Admission Details</div>
          <table>
            <tr><td class='label'>Academic Year:</td><td>{$academicYear}</td></tr>
            <tr><td class='label'>Program / Class:</td><td>{$program}</td></tr>
            <tr><td class='label'>Preferred Start Date:</td><td>{$startDate}</td></tr>
          </table>

          <div class='section-title'>3. Parent / Guardian Details</div>
          <table>
            <tr><td class='label'>Father / Parent 1:</td><td>{$parent1Name} ({$parent1Occ})<br>Mobile: {$parent1Mobile} | Email: {$parent1Email}</td></tr>
            <tr><td class='label'>Mother / Parent 2:</td><td>{$parent2Name} ({$parent2Occ})<br>Mobile: {$parent2Mobile}</td></tr>
            <tr><td class='label'>Relationship:</td><td>{$relationship}</td></tr>
          </table>

          <div class='section-title'>4. Family Information</div>
          <table>
            <tr><td class='label'>Mother Tongue:</td><td>{$motherTongue}</td></tr>
            <tr><td class='label'>Siblings:</td><td>{$hasSiblings} " . ($hasSiblings === 'Yes' ? "({$siblingDetails})" : "") . "</td></tr>
          </table>

          <div class='section-title'>5. Emergency Contact</div>
          <table>
            <tr><td class='label'>Emergency Contact:</td><td>{$emergencyName} ({$emergencyRel}) - {$emergencyMobile}</td></tr>
          </table>

          <div class='section-title'>6. Health & Additional Info</div>
          <table>
            <tr><td class='label'>Allergies:</td><td>{$hasAllergies} " . ($hasAllergies === 'Yes' ? "({$allergiesDetail})" : "") . "</td></tr>
            <tr><td class='label'>Medical Conditions:</td><td>{$hasMedical} " . ($hasMedical === 'Yes' ? "({$medicalDetail})" : "") . "</td></tr>
            <tr><td class='label'>Dietary:</td><td>{$dietary}</td></tr>
            <tr><td class='label'>How Heard:</td><td>{$howHeard}</td></tr>
            <tr><td class='label'>Additional Notes:</td><td>{$additionalInfo}</td></tr>
            <tr><td class='label'>Signed By:</td><td>{$parentSignName} on {$signDate}</td></tr>
          </table>
        </div>
      </div>
    </body>
    </html>
    ";

    // 6. Spawn Background Process
    $subject = "New Admission Registration - Kidwin Preschool - [{$applicationId}]";
    $to = $config['school_email'];

    $payloadData = [
        'to' => $to,
        'subject' => $subject,
        'htmlBody' => $emailHtml,
        'attachments' => $tempFiles,
        'config' => $config,
        'replyToEmail' => $parent1Email,
        'replyToName' => $parent1Name
    ];

    $payloadFile = $uploadDir . '/mail_payload_' . uniqid() . '.json';
    file_put_contents($payloadFile, json_encode($payloadData));

    $bgScript = escapeshellarg(__DIR__ . '/background_mailer.php');
    $argFile = escapeshellarg($payloadFile);
    
    // Windows background process
    pclose(popen("start /B php {$bgScript} {$argFile} > NUL 2> NUL", "r"));

    // Respond immediately
    http_response_code(200);
    echo json_encode([
        'success'        => true,
        'message'        => 'Registration submitted successfully.',
        'application_id' => $applicationId
    ]);

} catch (Exception $e) {
    if (!headers_sent()) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Processing failed: ' . $e->getMessage()
        ]);
    }
}
