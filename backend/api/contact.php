<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/response.php';
$data = read_json();
require_fields($data, ['name', 'email', 'message']);
try {
    $stmt = db()->prepare('INSERT INTO enquiries (name, email, phone, message) VALUES (:name, :email, :phone, :message)');
    $stmt->execute(['name' => $data['name'], 'email' => $data['email'], 'phone' => $data['phone'] ?? '', 'message' => $data['message']]);
    send_json(['message' => 'Thank you. CURAVERIS HEALTHCARE PRIVATE LIMITED will contact you soon.']);
} catch (Throwable $error) {
    send_json(['message' => 'Unable to submit enquiry.', 'error' => $error->getMessage()], 500);
}
