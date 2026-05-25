<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
$path = trim(str_replace('/api', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)), '/');
if ($path === 'products' || $path === 'products.php') { require __DIR__ . '/api/products.php'; exit; }
if ($path === 'auth.php') { require __DIR__ . '/api/auth.php'; exit; }
if ($path === 'contact.php') { require __DIR__ . '/api/contact.php'; exit; }
if ($path === 'dashboard.php') { require __DIR__ . '/api/dashboard.php'; exit; }
require_once __DIR__ . '/config/response.php';
send_json(['message' => 'CURAVERIS HEALTHCARE PRIVATE LIMITED API', 'routes' => ['/api/products', '/api/auth.php', '/api/contact.php', '/api/dashboard.php']]);
