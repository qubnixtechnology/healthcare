<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth_guard.php';

try {
    require_admin();
    $stmt = db()->query(
        'SELECT id, name, email, role, created_at
         FROM users
         ORDER BY created_at DESC
         LIMIT 50'
    );

    send_json(['users' => $stmt->fetchAll()]);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load admin users.', 'error' => $error->getMessage()], 500);
}
