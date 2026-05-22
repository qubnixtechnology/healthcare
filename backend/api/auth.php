<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/response.php';
$action = $_GET['action'] ?? 'login';
$data = read_json();
try {
    if ($action === 'signup') {
        require_fields($data, ['name', 'email', 'password']);
        $stmt = db()->prepare('INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)');
        $stmt->execute(['name' => $data['name'], 'email' => $data['email'], 'password_hash' => password_hash($data['password'], PASSWORD_DEFAULT)]);
        send_json(['message' => 'Account created successfully.']);
    }
    require_fields($data, ['email', 'password']);
    $stmt = db()->prepare('SELECT id, name, email, password_hash FROM users WHERE email = :email LIMIT 1');
    $stmt->execute(['email' => $data['email']]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($data['password'], $user['password_hash'])) {
        send_json(['message' => 'Invalid email or password.'], 401);
    }
    unset($user['password_hash']);
    send_json(['message' => 'Login successful.', 'user' => $user]);
} catch (PDOException $error) {
    if ($error->getCode() === '23000') { send_json(['message' => 'Email already exists.'], 409); }
    send_json(['message' => 'Authentication failed.', 'error' => $error->getMessage()], 500);
}
