<?php
require_once __DIR__ . '/env.php';
load_env();
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $host = env_value('DB_HOST', '127.0.0.1');
    $name = env_value('DB_NAME', 'gl_healthcare');
    $user = env_value('DB_USER', 'root');
    $pass = env_value('DB_PASS', '');
    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    return $pdo;
}
