<?php
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/auth_guard.php';

try {
    require_admin();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $stmt = db()->query(
            'SELECT id, name, category, price, rating, stock, image, description, created_at
             FROM products
             ORDER BY id DESC'
        );

        send_json(['solutions' => $stmt->fetchAll()]);
    }

    if ($method === 'POST') {
        $data = read_json();
        require_fields($data, ['name', 'category', 'image', 'description']);
        $stmt = db()->prepare(
            'INSERT INTO products (name, category, price, rating, stock, image, description)
             VALUES (:name, :category, :price, :rating, :stock, :image, :description)'
        );
        $stmt->execute([
            'name' => trim($data['name']),
            'category' => trim($data['category']),
            'price' => (float) ($data['price'] ?? 0),
            'rating' => (float) ($data['rating'] ?? 4.5),
            'stock' => (int) ($data['stock'] ?? 0),
            'image' => trim($data['image']),
            'description' => trim($data['description']),
        ]);

        send_json(['message' => 'Solution created.', 'id' => (int) db()->lastInsertId()], 201);
    }

    if ($method === 'PUT') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) send_json(['message' => 'Missing solution id.'], 422);
        $data = read_json();
        require_fields($data, ['name', 'category', 'image', 'description']);
        $stmt = db()->prepare(
            'UPDATE products
             SET name = :name, category = :category, price = :price, rating = :rating,
                 stock = :stock, image = :image, description = :description
             WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'name' => trim($data['name']),
            'category' => trim($data['category']),
            'price' => (float) ($data['price'] ?? 0),
            'rating' => (float) ($data['rating'] ?? 4.5),
            'stock' => (int) ($data['stock'] ?? 0),
            'image' => trim($data['image']),
            'description' => trim($data['description']),
        ]);

        send_json(['message' => 'Solution updated.']);
    }

    if ($method === 'DELETE') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) send_json(['message' => 'Missing solution id.'], 422);
        $stmt = db()->prepare('DELETE FROM products WHERE id = :id');
        $stmt->execute(['id' => $id]);

        send_json(['message' => 'Solution deleted.']);
    }

    send_json(['message' => 'Method not allowed.'], 405);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to load admin solutions.', 'error' => $error->getMessage()], 500);
}
