<?php
/**
 * Dynamic Environment & Mail Configuration
 * Reads from root .env or backend/.env automatically.
 * No hardcoded credentials.
 */

// Helper to load .env variables into $_ENV / getenv()
function loadEnvFile($envPath) {
    if (!file_exists($envPath)) return;
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            putenv("{$name}={$value}");
            $_ENV[$name] = $value;
        }
    }
}

// Load .env from root or backend directory
loadEnvFile(__DIR__ . '/../../.env');
loadEnvFile(__DIR__ . '/../.env');
loadEnvFile(__DIR__ . '/.env');

return [
    // SMTP Credentials
    'smtp_host'       => getenv('SMTP_HOST') ?: 'smtp.gmail.com',
    'smtp_port'       => intval(getenv('SMTP_PORT') ?: 587),
    'smtp_username'   => getenv('SMTP_USERNAME') ?: 'admissions@kidwinpreschool.com',
    'smtp_password'   => getenv('SMTP_PASSWORD') ?: '',
    'smtp_encryption' => getenv('SMTP_ENCRYPTION') ?: 'tls',

    // Destination School Inbox
    'school_email'    => getenv('SCHOOL_EMAIL') ?: 'sanjay@niftysoft.in',
    'school_name'     => getenv('SCHOOL_NAME') ?: 'Kidwin Preschool Admissions',

    // Max Upload File Size (Default 1MB)
    'max_file_size'   => intval(getenv('MAX_FILE_SIZE') ?: (1 * 1024 * 1024)),

    // Allowed File Extensions
    'allowed_extensions' => ['jpg', 'jpeg', 'png', 'pdf'],

    // Blocked Extensions (Security)
    'blocked_extensions' => ['php', 'php5', 'phtml', 'exe', 'sh', 'js', 'html', 'htaccess', 'cgi', 'pl']
];
