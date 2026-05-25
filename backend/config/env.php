<?php
function load_env(): void
{
    $path = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
    if (!file_exists($path)) {
        return;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#') || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}
function env_value(string $key, string $default = ''): string
{
    return $_ENV[$key] ?? getenv($key) ?: $default;
}
