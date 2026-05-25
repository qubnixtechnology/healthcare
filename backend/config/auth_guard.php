<?php
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/response.php';

function bearer_token(): string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (stripos($header, 'Bearer ') !== 0) {
        return '';
    }
    return trim(substr($header, 7));
}

function require_admin(): array
{
    $token = bearer_token();
    if ($token === '') {
        send_json(['message' => 'Admin login required.'], 401);
    }

    $stmt = db()->prepare(
        'SELECT users.id, users.name, users.email, users.role
         FROM auth_tokens
         INNER JOIN users ON users.id = auth_tokens.user_id
         WHERE auth_tokens.token_hash = :token_hash
           AND auth_tokens.expires_at > NOW()
         LIMIT 1'
    );
    $stmt->execute(['token_hash' => hash('sha256', $token)]);
    $user = $stmt->fetch();

    if (!$user || $user['role'] !== 'admin') {
        send_json(['message' => 'Admin access only.'], 403);
    }

    return $user;
}
