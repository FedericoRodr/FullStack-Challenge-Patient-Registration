#!/bin/sh

set -e

echo "Waiting for database..."
sleep 5

echo "Running migrations..."
php artisan migrate --force

echo "Starting Laravel server..."
exec php artisan serve --host=0.0.0.0 --port=8000
