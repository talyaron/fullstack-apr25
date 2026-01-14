# Docker Setup Instructions

## Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Make sure Docker is running

## Quick Start

1. Clone the repository
2. Navigate to the project folder:
   ```bash
   cd classPuzzle
   ```
3. Start all services:
   ```bash
   docker-compose up --build
   ```
4. Open your browser:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Useful Commands

| Command | Description |
|---------|-------------|
| `docker-compose up --build` | Build and start all containers |
| `docker-compose up -d` | Start in background (detached mode) |
| `docker-compose down` | Stop all containers |
| `docker-compose down -v` | Stop and remove all data (including database) |
| `docker-compose logs -f` | View live logs from all services |

## Project Structure

```
classPuzzle/
├── docker-compose.yml    # Orchestrates all services
├── backend/
│   ├── Dockerfile        # Backend container config
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile        # Frontend container config
│   └── .dockerignore
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| frontend | 3000 | React application |
| backend | 5000 | Express API server |
| mongodb | 27017 | MongoDB database |

## Troubleshooting

**Port already in use?**
Stop any local services using ports 3000, 5000, or 27017, or modify the ports in `docker-compose.yml`.

**Changes not reflecting?**
Rebuild the containers:
```bash
docker-compose up --build
```

**Need a fresh start?**
Remove everything including the database:
```bash
docker-compose down -v
```
