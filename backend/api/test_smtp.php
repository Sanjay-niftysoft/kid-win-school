<?php
/**
 * Kidwin Preschool - SMTP Diagnostic Test Script
 * Run via PHP CLI: php backend/api/test_smtp.php
 * Or via browser if using a local PHP server.
 */

$envPath = __DIR__ . '/../../.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name  = trim($name);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            putenv("{$name}={$value}");
            $_ENV[$name] = $value;
        }
    }
    echo "Loaded .env from: " . realpath($envPath) . "\n";
} else {
    echo "WARNING: .env not found at: " . $envPath . "\n";
}

$smtp_host    = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
$smtp_port    = intval(getenv('SMTP_PORT') ?: 587);
$smtp_user    = getenv('SMTP_USERNAME') ?: '';
$smtp_pass    = getenv('SMTP_PASSWORD') ?: '';
$school_email = getenv('SCHOOL_EMAIL') ?: 'sanjay@niftysoft.in';

echo "\n=== SMTP CONFIG ===\n";
echo "Host    : {$smtp_host}\n";
echo "Port    : {$smtp_port}\n";
echo "User    : " . (empty($smtp_user) ? "EMPTY!!!" : $smtp_user) . "\n";
echo "Pass    : " . (empty($smtp_pass) ? "EMPTY!!!" : str_repeat('*', strlen($smtp_pass)) . " (" . strlen($smtp_pass) . " chars)") . "\n";
echo "To      : {$school_email}\n";

if (empty($smtp_user) || empty($smtp_pass)) {
    echo "\nCannot test: SMTP credentials missing in .env!\n";
    exit(1);
}

echo "\n=== STEP 1: TCP Connection ===\n";
$errno = 0;
$errstr = '';
$socket = @fsockopen($smtp_host, $smtp_port, $errno, $errstr, 15);
if (!$socket) {
    echo "FAILED: Could not connect to {$smtp_host}:{$smtp_port}\n";
    echo "Error {$errno}: {$errstr}\n";
    echo "\nPossible causes:\n";
    echo "- Firewall/antivirus blocking outgoing port 587\n";
    echo "- No internet on this machine\n";
    exit(1);
}

echo "SUCCESS: Connected to {$smtp_host}:{$smtp_port}\n";
$banner = fgets($socket, 515);
echo "Banner : " . trim($banner) . "\n";

function smtpSend($socket, $cmd, $expectCode) {
    fputs($socket, $cmd . "\r\n");
    $res = '';
    while ($str = fgets($socket, 515)) {
        $res .= $str;
        if (substr($str, 3, 1) == ' ') break;
    }
    $code = substr($res, 0, 3);
    $ok = ($code == $expectCode);
    return array('ok' => $ok, 'code' => $code, 'response' => trim($res));
}

echo "\n=== STEP 2: EHLO ===\n";
$r = smtpSend($socket, 'EHLO ' . gethostname(), '250');
echo ($r['ok'] ? "OK: " : "FAIL: ") . $r['response'] . "\n";

echo "\n=== STEP 3: STARTTLS ===\n";
$r = smtpSend($socket, 'STARTTLS', '220');
if (!$r['ok']) {
    echo "FAIL: " . $r['response'] . "\n";
    exit(1);
}
echo "OK: STARTTLS accepted\n";

$tlsEnabled = stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT);
if (!$tlsEnabled) {
    echo "FAIL: TLS upgrade failed\n";
    exit(1);
}
echo "OK: TLS encryption enabled\n";

echo "\n=== STEP 4: Re-EHLO after TLS ===\n";
$r = smtpSend($socket, 'EHLO ' . gethostname(), '250');
echo ($r['ok'] ? "OK: " : "FAIL: ") . $r['response'] . "\n";

echo "\n=== STEP 5: AUTH LOGIN ===\n";
$r = smtpSend($socket, 'AUTH LOGIN', '334');
if (!$r['ok']) {
    echo "FAIL: " . $r['response'] . "\n"; exit(1);
}
echo "OK: AUTH LOGIN requested username\n";

$r = smtpSend($socket, base64_encode($smtp_user), '334');
if (!$r['ok']) {
    echo "FAIL (username rejected): " . $r['response'] . "\n"; exit(1);
}
echo "OK: Username accepted, sending password\n";

$r = smtpSend($socket, base64_encode($smtp_pass), '235');
if (!$r['ok']) {
    echo "FAIL (auth failed): " . $r['response'] . "\n";
    echo "\nThis usually means:\n";
    echo "- Wrong App Password (must be 16 chars, no spaces)\n";
    echo "- 2-Step Verification not enabled\n";
    echo "- App Password not created for 'Mail'\n";
    exit(1);
}
echo "SUCCESS: Authentication passed!\n";

echo "\n=== STEP 6: Send Test Email ===\n";
$r = smtpSend($socket, "MAIL FROM: <{$smtp_user}>", '250');
echo ($r['ok'] ? "OK: MAIL FROM" : "FAIL: " . $r['response']) . "\n";

$r = smtpSend($socket, "RCPT TO: <{$school_email}>", '250');
echo ($r['ok'] ? "OK: RCPT TO" : "FAIL: " . $r['response']) . "\n";

$r = smtpSend($socket, 'DATA', '354');
echo ($r['ok'] ? "OK: DATA" : "FAIL: " . $r['response']) . "\n";

if ($r['ok']) {
    $testMsg  = "From: Kidwin Test <{$smtp_user}>\r\n";
    $testMsg .= "To: <{$school_email}>\r\n";
    $testMsg .= "Subject: [TEST] Kidwin SMTP Verification " . date('H:i:s') . "\r\n";
    $testMsg .= "MIME-Version: 1.0\r\n";
    $testMsg .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $testMsg .= "This is a test email sent at " . date('Y-m-d H:i:s') . ".\n";
    $testMsg .= "If you received this, SMTP is working correctly!\n";
    $testMsg .= "\r\n.\r\n";

    fputs($socket, $testMsg);
    $res = '';
    while ($str = fgets($socket, 515)) {
        $res .= $str;
        if (substr($str, 3, 1) == ' ') break;
    }
    $code = substr($res, 0, 3);
    if ($code == '250') {
        echo "\n===========================================\n";
        echo " EMAIL SENT SUCCESSFULLY!\n";
        echo " Check {$school_email} (and spam folder)\n";
        echo "===========================================\n";
    } else {
        echo "FAIL sending email: " . trim($res) . "\n";
    }
}

smtpSend($socket, 'QUIT', '221');
fclose($socket);
