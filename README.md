# Meet the Team

## Prerequisites

- Git
- Docker Desktop

## Clone the Repository

```bash
git clone git@github.com:thejas-web/meet_the_team-.git
cd meet_the_team-
```

## Environment Setup

Copy the example environment file.

### Windows PowerShell

```powershell
Copy-Item .env.example .env.local
```

### Git Bash / Linux / macOS

```bash
cp .env.example .env.local
```

Update `.env.local` with the required environment variables.

## Build the Project

```bash
docker compose --env-file .env.local build
```

## Start the Project

```bash
docker compose --env-file .env.local up -d
```

## Database Setup

Run migrations:

```bash
docker compose --env-file .env.local exec backend python manage.py migrate
```

Create a Django admin user:

```bash
docker compose --env-file .env.local exec backend python manage.py createsuperuser
```

Collect static files:

```bash
docker compose --env-file .env.local exec backend python manage.py collectstatic --noinput
```

## Access the Application

### Frontend

```text
http://localhost:5173/
```

### Django Admin

```text
http://localhost:8000/admin/
```

### API

```text
http://localhost:8000/api/team/
```

## Stop the Project

```bash
docker compose --env-file .env.local down
```

## Start the Project Again

```bash
docker compose --env-file .env.local up -d
```

## Rebuild the Project

Use this when dependencies or Docker configuration are changed:

```bash
docker compose --env-file .env.local up -d --build
```

## View Logs

```bash
docker compose --env-file .env.local logs -f
```

## Important

- Do not commit `.env.local`.
- Use `.env.example` as the environment configuration template.
- Do not delete Docker volumes unless you intentionally want to remove the local database and media data.