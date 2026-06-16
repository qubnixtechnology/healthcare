<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth_guard.php';

try {
    require_admin();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $stmt = db()->query(
            "SELECT id, name, email, phone, message, status, created_at
             FROM enquiries
             WHERE status <> 'closed'
             ORDER BY created_at DESC
             LIMIT 100"
        );

        send_json(['pendingOrders' => $stmt->fetchAll()]);
    }

    if ($method === 'POST') {
        $data = read_json();
        require_fields($data, ['name', 'email', 'message']);
        $status = in_array(($data['status'] ?? 'new'), ['new', 'contacted'], true) ? $data['status'] : 'new';
        $stmt = db()->prepare(
            'INSERT INTO enquiries (name, email, phone, message, status)
             VALUES (:name, :email, :phone, :message, :status)'
        );
        $stmt->execute([
            'name' => trim($data['name']),
            'email' => trim($data['email']),
            'phone' => trim((string) ($data['phone'] ?? '')),
            'message' => trim($data['message']),
            'status' => $status,
        ]);

        send_json(['message' => 'Pending order created.', 'id' => (int) db()->lastInsertId()], 201);
    }

    if ($method === 'PUT') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) send_json(['message' => 'Missing pending order id.'], 422);
        $data = read_json();
        require_fields($data, ['name', 'email', 'message', 'status']);
        $status = in_array($data['status'], ['new', 'contacted', 'closed'], true) ? $data['status'] : 'new';
        $stmt = db()->prepare(
            'UPDATE enquiries
             SET name = :name, email = :email, phone = :phone, message = :message, status = :status
             WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'name' => trim($data['name']),
            'email' => trim($data['email']),
            'phone' => trim((string) ($data['phone'] ?? '')),
            'message' => trim($data['message']),
            'status' => $status,
        ]);

        send_json(['message' => 'Pending order updated.']);
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) send_json(['message' => 'Missing pending order id.'], 422);
        $stmt = db()->prepare('DELETE FROM enquiries WHERE id = :id');
        $stmt->execute(['id' => $id]);

        send_json(['message' => 'Pending order deleted.']);
    }

    send_json(['message' => 'Method not allowed.'], 405);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load admin pending orders.', 'error' => $error->getMessage()], 500);
}
