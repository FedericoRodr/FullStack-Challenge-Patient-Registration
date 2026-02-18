#!/bin/sh
set -e

echo "Running migrations..."
php artisan migrate --force

echo "Ensuring storage link..."
php artisan storage:link || true

echo "Fixing permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Starting Apache..."
exec apache2-foreground
