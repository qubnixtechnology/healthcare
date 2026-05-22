<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/response.php';
try {
    $stmt = db()->query('SELECT id, name, category, price, rating, stock, image, description FROM products ORDER BY id DESC');
    send_json(['products' => $stmt->fetchAll()]);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load products', 'error' => $error->getMessage()], 500);
}
