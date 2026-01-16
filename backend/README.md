# 🚀 Backend - FastAPI

FastAPI backend for the Car Rental Management System.

## 📋 Prerequisites

- Python 3.11 or higher
- PostgreSQL 16

## 🛠️ Setup

```bash
# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
cd backend
pip install -r requirements.txt
```

Configure `.env` file:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cars-rental?schema=public
```

## 🏃 Run

```bash
# Development
python run.py

# Or with uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Access:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

## 🚀 Features

- RESTful API with FastAPI
- PostgreSQL database with SQLAlchemy ORM
- Pydantic validation
- CORS enabled for frontend
- Automatic API documentation

## 🗂️ Project Structure

```
backend/
├── main.py              # FastAPI entry point
├── database.py          # Database configuration
├── models.py            # SQLAlchemy models
├── schemas.py           # Pydantic schemas
├── crud.py              # Database operations
├── routers/             # API endpoints
│   ├── cars.py
│   ├── renters.py
│   └── rentals.py
├── requirements.txt
└── run.py
```

## 🔌 API Endpoints

### Cars (`/cars`)

- `GET /cars` - List all cars
- `GET /cars/{id}` - Get specific car
- `POST /cars` - Create new car
- `PUT /cars/{id}` - Update car
- `DELETE /cars/{id}` - Delete car

### Renters (`/renters`)

- `GET /renters` - List all renters
- `GET /renters/{id}` - Get specific renter
- `POST /renters` - Create new renter
- `PUT /renters/{id}` - Update renter
- `DELETE /renters/{id}` - Delete renter

### Rentals (`/rentals`)

- `GET /rentals` - List all rentals
- `GET /rentals/{id}` - Get specific rental
- `POST /rentals` - Create new rental
- `PUT /rentals/{id}` - Update rental (return car)
- `DELETE /rentals/{id}` - Delete rental

## 💾 Database

PostgreSQL with SQLAlchemy ORM.

**Models:**
- Car: Vehicle information
- Renter: Customer information
- Rental: Rental transactions

## 🧪 Testing

Use Swagger UI at http://localhost:8000/docs for interactive testing.

## 📦 Dependencies

- fastapi: Web framework
- uvicorn: ASGI server
- sqlalchemy: ORM
- psycopg2-binary: PostgreSQL adapter
- pydantic: Data validation
