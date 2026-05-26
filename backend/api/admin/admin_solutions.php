<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth_guard.php';

try {
    require_admin();
    $stmt = db()->query(
        'SELECT id, name, category, price, rating, stock, image, description, created_at
         FROM products
         ORDER BY id DESC'
    );

    send_json(['solutions' => $stmt->fetchAll()]);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load admin solutions.', 'error' => $error->getMessage()], 500);
}
