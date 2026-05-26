<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth_guard.php';

try {
    require_admin();
    $stmt = db()->query(
        "SELECT id, name, email, phone, message, status, created_at
         FROM enquiries
         WHERE status <> 'closed'
         ORDER BY created_at DESC
         LIMIT 25"
    );

    send_json(['pendingOrders' => $stmt->fetchAll()]);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load admin pending orders.', 'error' => $error->getMessage()], 500);
}
