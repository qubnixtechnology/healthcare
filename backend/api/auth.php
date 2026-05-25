<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/response.php';
$action = $_GET['action'] ?? 'login';
$data = read_json();
try {
    if ($action === 'signup') {
        require_fields($data, ['name', 'email', 'password']);
        $stmt = db()->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (:name, :email, :password_hash, :role)');
        $stmt->execute(['name' => $data['name'], 'email' => $data['email'], 'password_hash' => password_hash($data['password'], PASSWORD_DEFAULT), 'role' => 'user']);
        send_json(['message' => 'Account created successfully.']);
    }
    require_fields($data, ['email', 'password']);
    $stmt = db()->prepare('SELECT id, name, email, role, password_hash FROM users WHERE email = :email LIMIT 1');
    $stmt->execute(['email' => $data['email']]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($data['password'], $user['password_hash'])) {
        send_json(['message' => 'Invalid email or password.'], 401);
    }
    $token = bin2hex(random_bytes(32));
    $tokenStmt = db()->prepare('INSERT INTO auth_tokens (user_id, token_hash, expires_at) VALUES (:user_id, :token_hash, DATE_ADD(NOW(), INTERVAL 1 DAY))');
    $tokenStmt->execute(['user_id' => $user['id'], 'token_hash' => hash('sha256', $token)]);
    unset($user['password_hash']);
    $user['token'] = $token;
    send_json(['message' => 'Login successful.', 'user' => $user]);
} catch (PDOException $error) {
    if ($error->getCode() === '23000') { send_json(['message' => 'Email already exists.'], 409); }
    send_json(['message' => 'Authentication failed.', 'error' => $error->getMessage()], 500);
}
