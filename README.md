# 🚗 Cars Rental Management System

A modern car rental management application with Next.js frontend and FastAPI backend.

## 📋 Project Structure

```
cars-rental/
├── app/                    # Next.js frontend pages
├── backend/               # FastAPI backend
├── components/            # React components
├── prisma/               # Database schema
├── types/                # TypeScript definitions
└── docker-compose.yml    # Docker configuration
```

## 🚀 Quick Start

### Option 1: With Docker (Recommended)

```bash
docker-compose up -d
docker-compose exec frontend npx prisma db push
docker-compose exec frontend npm run db:seed
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000/docs

### Option 2: Local Development

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python run.py
```

**Frontend:**
```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## 📚 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [Docker Guide](./DOCKER_README.md)

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Database**: PostgreSQL 16
- **Deployment**: Docker, Docker Compose

## 📝 Features

- ✅ Car management (CRUD operations)
- ✅ Renter management
- ✅ Rental management with active/history tracking
- ✅ Real-time availability updates
- ✅ Return car functionality with cost calculation
- ✅ Tunisian Dinar (DT) currency support
- ✅ French language interface

## 📄 License

MIT
