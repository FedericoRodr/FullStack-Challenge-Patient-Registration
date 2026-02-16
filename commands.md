# Backend

## Create laravel project
composer create-project laravel/laravel .

## Run laravel project
php artisan serve

## Create model
php artisan make:model AModel -m

## Create controller
php artisan make:controller AController

# Docker

## Set up development environment
docker-compose up -d

## Stop and remove containers, networks, volumes, and images
docker-compose down -v

## Migrate database
docker compose exec backend php artisan migrate

## View the services
docker compose ps