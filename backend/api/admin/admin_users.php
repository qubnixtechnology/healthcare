<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth_guard.php';

try {
    $admin = require_admin();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $stmt = db()->query(
            'SELECT id, name, email, role, created_at
             FROM users
             ORDER BY created_at DESC
             LIMIT 100'
        );

        send_json(['users' => $stmt->fetchAll()]);
    }

    if ($method === 'POST') {
        $data = read_json();
        require_fields($data, ['name', 'email', 'password', 'role']);
        $role = in_array($data['role'], ['user', 'admin'], true) ? $data['role'] : 'user';
        $stmt = db()->prepare(
            'INSERT INTO users (name, email, password_hash, role)
             VALUES (:name, :email, :password_hash, :role)'
        );
        $stmt->execute([
            'name' => trim($data['name']),
            'email' => trim($data['email']),
            'password_hash' => password_hash($data['password'], PASSWORD_DEFAULT),
            'role' => $role,
        ]);

        send_json(['message' => 'User created.', 'id' => (int) db()->lastInsertId()], 201);
    }

    if ($method === 'PUT') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) send_json(['message' => 'Missing user id.'], 422);
        $data = read_json();
        require_fields($data, ['name', 'email', 'role']);
        $role = in_array($data['role'], ['user', 'admin'], true) ? $data['role'] : 'user';

        if ($id === (int) $admin['id'] && $role !== 'admin') {
            send_json(['message' => 'You cannot remove admin role from your own account.'], 422);
        }

        if (isset($data['password']) && trim((string) $data['password']) !== '') {
            $stmt = db()->prepare(
                'UPDATE users
                 SET name = :name, email = :email, role = :role, password_hash = :password_hash
                 WHERE id = :id'
            );
            $stmt->execute([
                'id' => $id,
                'name' => trim($data['name']),
                'email' => trim($data['email']),
                'role' => $role,
                'password_hash' => password_hash($data['password'], PASSWORD_DEFAULT),
            ]);
        } else {
            $stmt = db()->prepare(
                'UPDATE users
                 SET name = :name, email = :email, role = :role
                 WHERE id = :id'
            );
            $stmt->execute([
                'id' => $id,
                'name' => trim($data['name']),
                'email' => trim($data['email']),
                'role' => $role,
            ]);
        }

        send_json(['message' => 'User updated.']);
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) send_json(['message' => 'Missing user id.'], 422);
        if ($id === (int) $admin['id']) {
            send_json(['message' => 'You cannot delete your own admin account.'], 422);
        }
        $stmt = db()->prepare('DELETE FROM users WHERE id = :id');
        $stmt->execute(['id' => $id]);

        send_json(['message' => 'User deleted.']);
    }

    send_json(['message' => 'Method not allowed.'], 405);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load admin users.', 'error' => $error->getMessage()], 500);
}
