<?php
/**
 * Background Mailer Script
 * Runs in the background to send emails without blocking the UI.
 * Optimized for speed using SSL/465 and Chunked Attachment Streaming.
 */

if ($argc < 2) {
    die("Usage: php background_mailer.php <payload_file.json>\n");
}

$payloadFile = $argv[1];

if (!file_exists($payloadFile)) {
    die("Payload file not found.\n");
}

$payload = json_decode(file_get_contents($payloadFile), true);
if (!$payload) {
    die("Invalid payload JSON.\n");
}

// -----------------------------------------------------------------------------
// Native Pure PHP Socket SMTP Mailer - Optimized for Speed
// -----------------------------------------------------------------------------
function sendSmtpEmail($to, $subject, $htmlBody, $attachments, $config, $replyToEmail = '', $replyToName = '') {
    $startTime = microtime(true);
    
    // Force SMTPS (Port 465) for Gmail to skip STARTTLS negotiation delay (saves ~1-2 seconds)
    $host = $config['smtp_host'];
    $port = $config['smtp_port'];
    if (strpos($host, 'smtp.gmail.com') !== false) {
        $host = 'ssl://smtp.gmail.com';
        $port = 465;
    } elseif ($port == 465 && strpos($host, 'ssl://') === false) {
        $host = 'ssl://' . $host;
    }

    $username = $config['smtp_username'];
    $password = $config['smtp_password'];
    $from = $username;
    $fromName = $config['school_name'] ?? 'Kidwin Preschool Admissions';

    $socket = @fsockopen($host, $port, $errno, $errstr, 15);
    if (!$socket) throw new Exception("Could not connect to SMTP server: $host:$port ($errstr)");
    stream_set_timeout($socket, 15);

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
        if (substr($res, 0, 3) != $expectedCode) throw new Exception("SMTP Command failed [{$cmd}] - Response: " . trim($res));
        return $res;
    }

    readSmtpResponse($socket);
    sendSmtpCommand($socket, "EHLO " . gethostname(), '250');

    // If using 587 and not forced to SSL
    if ($port == 587 && strpos($host, 'ssl://') === false) {
        sendSmtpCommand($socket, "STARTTLS", '220');
        $cryptoMethod = STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
        stream_socket_enable_crypto($socket, true, $cryptoMethod);
        sendSmtpCommand($socket, "EHLO " . gethostname(), '250');
    }

    sendSmtpCommand($socket, "AUTH LOGIN", '334');
    sendSmtpCommand($socket, base64_encode($username), '334');
    sendSmtpCommand($socket, base64_encode($password), '235');

    sendSmtpCommand($socket, "MAIL FROM: <{$from}>", '250');
    sendSmtpCommand($socket, "RCPT TO: <{$to}>", '250');
    sendSmtpCommand($socket, "DATA", '354');

    $boundary = "==Multipart_Boundary_x" . md5(time()) . "x";

    $headers  = "From: {$fromName} <{$from}>\r\n";
    $headers .= "To: <{$to}>\r\n";
    if (!empty($replyToEmail)) $headers .= "Reply-To: {$replyToName} <{$replyToEmail}>\r\n";
    $headers .= "Subject: {$subject}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    // Write headers and HTML body
    fputs($socket, $headers . "\r\n");
    
    $body  = "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";
    fputs($socket, $body);

    // Stream files directly into the socket to avoid high memory usage and socket blocking
    foreach ($attachments as $att) {
        if (file_exists($att['path'])) {
            $fileName = $att['name'];
            $fileHeader  = "--{$boundary}\r\n";
            $fileHeader .= "Content-Type: application/octet-stream; name=\"{$fileName}\"\r\n";
            $fileHeader .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n";
            $fileHeader .= "Content-Transfer-Encoding: base64\r\n\r\n";
            fputs($socket, $fileHeader);

            // Read in 57-byte chunks (which base64 encodes to exactly 76 characters + \r\n)
            $handle = fopen($att['path'], 'rb');
            if ($handle) {
                while (!feof($handle)) {
                    $chunk = fread($handle, 57);
                    if ($chunk !== false && strlen($chunk) > 0) {
                        fputs($socket, base64_encode($chunk) . "\r\n");
                    }
                }
                fclose($handle);
            }
            fputs($socket, "\r\n");
        }
    }

    fputs($socket, "--{$boundary}--\r\n.\r\n");
    $dataRes = readSmtpResponse($socket);
    if (substr($dataRes, 0, 3) != '250') throw new Exception("Failed to send message data: " . trim($dataRes));

    sendSmtpCommand($socket, "QUIT", '221');
    fclose($socket);
    
    $endTime = microtime(true);
    return round($endTime - $startTime, 2);
}

try {
    $timeTaken = sendSmtpEmail(
        $payload['to'],
        $payload['subject'],
        $payload['htmlBody'],
        $payload['attachments'],
        $payload['config'],
        $payload['replyToEmail'],
        $payload['replyToName']
    );
    error_log("[" . date('Y-m-d H:i:s') . "] Success: Email sent for " . $payload['subject'] . " in {$timeTaken}s\n", 3, __DIR__ . '/mail.log');
} catch (Exception $e) {
    error_log("[" . date('Y-m-d H:i:s') . "] Error: " . $e->getMessage() . "\n", 3, __DIR__ . '/mail.log');
} finally {
    // Cleanup temporary files
    foreach ($payload['attachments'] as $att) {
        if (file_exists($att['path'])) {
            @unlink($att['path']);
        }
    }
    // Cleanup payload file
    @unlink($payloadFile);
}

