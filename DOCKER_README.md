# 🐳 Docker Deployment Guide

## 📋 Prerequisites

- Docker Desktop installed and running
- Docker Hub account (for pushing images)

---

## 🚀 Local Deployment

### Start all services:
```bash
docker-compose up -d
```

### Initialize database:
```bash
docker-compose exec frontend npx prisma db push
docker-compose exec frontend npm run db:seed
```

### Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000/docs
- Database: localhost:5432

### View logs:
```bash
docker-compose logs -f
```

### Stop services:
```bash
docker-compose down
```

---

## 🏗️ Build and Push to Docker Hub

Replace `YOUR_USERNAME` with your Docker Hub username.

### 1. Login to Docker Hub
```bash
docker login
```

### 2. Build Backend Image
```bash
docker build -f Dockerfile.backend -t cars-rental-backend:latest .
```

### 3. Build Frontend Image
```bash
docker build -f Dockerfile.frontend -t cars-rental-frontend:latest .
```

### 4. Tag Images
```bash
docker tag cars-rental-backend:latest YOUR_USERNAME/cars-rental-backend:latest
docker tag cars-rental-frontend:latest YOUR_USERNAME/cars-rental-frontend:latest
```

### 5. Push to Docker Hub
```bash
docker push YOUR_USERNAME/cars-rental-backend:latest
docker push YOUR_USERNAME/cars-rental-frontend:latest
```

---

## 🌍 Deploy on Another Server

### 1. Update docker-compose.yml

Replace the `build` sections with your Docker Hub images:

```yaml
backend:
  image: YOUR_USERNAME/cars-rental-backend:latest
  # Remove build section

frontend:
  image: YOUR_USERNAME/cars-rental-frontend:latest
  # Remove build section
```

### 2. Deploy
```bash
docker-compose pull
docker-compose up -d
docker-compose exec frontend npx prisma db push
docker-compose exec frontend npm run db:seed
```

---

## 🔧 Useful Commands

```bash
# Rebuild services
docker-compose up -d --build

# View service status
docker-compose ps

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh

# Access database
docker-compose exec database psql -U postgres -d cars-rental

# Remove everything (⚠️ deletes data)
docker-compose down -v

# View images
docker images | grep cars-rental

# Remove unused images
docker image prune -a
```

---

## 📦 Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js app |
| Backend | 8000 | FastAPI REST API |
| Database | 5432 | PostgreSQL 16 |

---

## 🗄️ Database Management

```bash
# Backup database
docker-compose exec database pg_dump -U postgres cars-rental > backup.sql

# Restore database
docker-compose exec -T database psql -U postgres cars-rental < backup.sql

# Reset database
docker-compose exec frontend npx prisma migrate reset
```

---

## ⚠️ Troubleshooting

**Services not starting?**
```bash
docker-compose logs -f
docker-compose restart
```

**Port already in use?**
```bash
# Edit docker-compose.yml and change ports:
# "3001:3000" instead of "3000:3000"
```

**Database connection failed?**
```bash
docker-compose exec database pg_isready -U postgres
```

**Reset everything:**
```bash
docker-compose down -v
docker-compose up -d --build
```



