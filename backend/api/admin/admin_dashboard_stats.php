<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth_guard.php';

try {
    require_admin();
    $solutions = (int) db()->query('SELECT COUNT(*) FROM products')->fetchColumn();
    $enquiries = (int) db()->query('SELECT COUNT(*) FROM enquiries')->fetchColumn();
    $users = (int) db()->query("SELECT COUNT(*) FROM users WHERE role = 'user'")->fetchColumn();
    $pendingOrders = (int) db()->query("SELECT COUNT(*) FROM enquiries WHERE status <> 'closed'")->fetchColumn();

    send_json([
        'stats' => [
            'solutions' => $solutions,
            'enquiries' => $enquiries,
            'users' => $users,
            'pendingOrders' => $pendingOrders,
        ],
    ]);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load admin dashboard stats.', 'error' => $error->getMessage()], 500);
}
