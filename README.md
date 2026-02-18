# Patient Registration Application

A simple patient registration app:

- **Backend**: Laravel API (PHP) + Postgres
- **Frontend**: React (Vite + TypeScript)

The UI lets you list patients and create a new patient. The backend exposes a small REST API and stores uploaded files in its public storage.

## Services & URLs (Docker)

When running with Docker Compose:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Backend health: http://localhost:8000/api/health
- pgAdmin: http://localhost:5050 (login: admin@admin.com / admin)
- Postgres: localhost:5432 (db: clinic_db, user: admin, password: admin)

## Quick start (Docker)

From the repository root:

```bash
cd patient-registration/backend
compose install
cd ..
cd frontend
npm install
cd ..
docker compose up -d --build
docker compose exec backend php artisan queue:work
```
To stop everything:

```bash
cd patient-registration
docker compose down -v
```

Notes:

- The backend container runs migrations on startup.
- The backend container also ensures the public storage symlink exists (so uploaded images are served from `/storage/...`).
- This project uses Mailtrap for email testing in development. Emails are not sent to real inboxes. You can see the configuration in `backend/.env` (MAIL_HOST, MAIL_PORT, etc). To process the email queue, run `docker compose exec backend php artisan queue:work`. If you want to try the email you must create an account in Mailtrap and set the MAIL_USERNAME and MAIL_PASSWORD in the .env file with your Mailtrap credentials.
- When starting the application, the backend may take a few seconds to become ready while it initializes and connects to required services. The frontend should wait until the backend is ready before making requests. You can check the backend with the health endpoint: http://localhost:8000/api/health. When it returns a successful response, the backend is ready to receive requests from the frontend.