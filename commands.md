# Backend

## Create laravel project
composer create-project laravel/laravel .

## Run laravel project
php artisan serve

## Create model
php artisan make:model AModel -m

## Create controller
php artisan make:controller AController

## Create mailable class
php artisan make:mail AClass

## Create queue table
php artisan queue:table

## Create symbolic link from "public/storage" to "storage/app/public"
php artisan storage:link


# Frontend

## Create vite project
npm create vite@latest

# Docker

## Set up development environment
docker-compose up -d

## Stop and remove containers, networks, volumes, and images
docker-compose down -v

## Migrate database
docker compose exec backend php artisan migrate

## View the services
docker compose ps

## Logs of a service
docker logs AProject