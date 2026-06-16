<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
$path = trim(str_replace('/api', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)), '/');
if ($path === 'products' || $path === 'products.php') { require __DIR__ . '/api/products.php'; exit; }
if ($path === 'auth.php') { require __DIR__ . '/api/auth.php'; exit; }
if ($path === 'contact.php') { require __DIR__ . '/api/contact.php'; exit; }
if ($path === 'dashboard.php') { require __DIR__ . '/api/dashboard.php'; exit; }
if ($path === 'admin/dashboard-stats' || $path === 'admin/dashboard-stats.php') { require __DIR__ . '/api/admin/admin_dashboard_stats.php'; exit; }
if ($path === 'admin/enquiries' || $path === 'admin/enquiries.php') { require __DIR__ . '/api/admin/admin_enquiries.php'; exit; }
if ($path === 'admin/solutions' || $path === 'admin/solutions.php') { require __DIR__ . '/api/admin/admin_solutions.php'; exit; }
if ($path === 'admin/users' || $path === 'admin/users.php') { require __DIR__ . '/api/admin/admin_users.php'; exit; }
if ($path === 'admin/pending-orders' || $path === 'admin/pending-orders.php') { require __DIR__ . '/api/admin/admin_pending_orders.php'; exit; }
require_once __DIR__ . '/config/response.php';
send_json(['message' => 'CURAVERIS HEALTHCARE PRIVATE LIMITED API', 'routes' => ['/api/products', '/api/auth.php', '/api/contact.php', '/api/admin/dashboard-stats', '/api/admin/enquiries', '/api/admin/solutions', '/api/admin/users', '/api/admin/pending-orders']]);
