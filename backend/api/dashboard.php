<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/response.php';
try {
    $products = (int) db()->query('SELECT COUNT(*) FROM products')->fetchColumn();
    $enquiries = (int) db()->query('SELECT COUNT(*) FROM enquiries')->fetchColumn();
    $customers = (int) db()->query('SELECT COUNT(*) FROM users')->fetchColumn();
    send_json(['stats' => ['products' => $products, 'enquiries' => $enquiries, 'customers' => $customers, 'pendingOrders' => max(3, $enquiries)]]);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load dashboard stats.', 'error' => $error->getMessage()], 500);
}
