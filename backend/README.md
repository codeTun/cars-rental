# Car Rental Management API - Backend

A comprehensive FastAPI backend for managing a car rental business.

## 🚀 Features

- **RESTful API** with automatic OpenAPI documentation
- **CRUD Operations** for Cars, Renters, and Rentals
- **Database Integration** using SQLAlchemy ORM
- **Data Validation** with Pydantic schemas
- **CORS Support** for frontend integration
- **Clean Architecture** with separation of concerns

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- SQLite (comes with Python)

## 🛠️ Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env if needed (optional - defaults work fine)
   ```

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
# From the project root directory
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Or run directly:

```bash
python -m backend.main
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Production Mode

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs - Interactive API documentation
- **ReDoc**: http://localhost:8000/redoc - Alternative documentation format

## 🗂️ Project Structure

```
backend/
├── __init__.py           # Package initialization
├── main.py              # FastAPI application entry point
├── database.py          # Database configuration and connection
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic validation schemas
├── crud.py              # Database CRUD operations
├── routers/             # API route handlers
│   ├── __init__.py
│   ├── cars.py          # Car endpoints
│   ├── renters.py       # Renter endpoints
│   └── rentals.py       # Rental endpoints
├── requirements.txt     # Python dependencies
└── README.md           # This file
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
- `GET /rentals/car/{car_id}` - Get rentals by car
- `GET /rentals/renter/{renter_id}` - Get rentals by renter
- `POST /rentals` - Create new rental
- `PUT /rentals/{id}` - Update rental (return car)
- `DELETE /rentals/{id}` - Delete rental

## 💾 Database

The application uses SQLite database located at `../prisma/dev.db` (shared with Next.js frontend).

### Database Models

- **Car**: Vehicle information (registration, brand, model, mileage, price)
- **Renter**: Customer information (name, address)
- **Rental**: Rental transactions (dates, mileage, amount)

## 🔄 Example API Calls

### Create a Car

```bash
curl -X POST "http://localhost:8000/cars" \
  -H "Content-Type: application/json" \
  -d '{
    "numImma": "ABC123",
    "marque": "Toyota",
    "modele": "Corolla",
    "kilometrage": 50000,
    "etat": 0,
    "prixLocation": 50.0
  }'
```

### Get All Available Cars

```bash
curl "http://localhost:8000/cars?available_only=true"
```

### Create a Rental

```bash
curl -X POST "http://localhost:8000/rentals" \
  -H "Content-Type: application/json" \
  -d '{
    "carId": 1,
    "renterId": 1,
    "dateDebut": "2025-11-21T10:00:00",
    "kmDebut": 50000
  }'
```

### Return a Car

```bash
curl -X PUT "http://localhost:8000/rentals/1" \
  -H "Content-Type: application/json" \
  -d '{
    "dateFin": "2025-11-22T10:00:00",
    "kmFin": 50200,
    "montantTotal": 100.0
  }'
```

## 🧪 Testing

You can test the API using:

1. **Swagger UI**: http://localhost:8000/docs (interactive testing)
2. **curl**: Command line HTTP client
3. **Postman**: API testing tool
4. **httpie**: User-friendly command line HTTP client

## 🔒 Security Features

- **Input Validation**: All inputs validated with Pydantic
- **SQL Injection Protection**: Using SQLAlchemy ORM
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Comprehensive error responses

## 🐛 Troubleshooting

### Database Issues

If you encounter database errors:

```bash
# Delete the database and let it recreate
rm ../prisma/dev.db
```

### Port Already in Use

If port 8000 is busy:

```bash
# Use a different port
uvicorn backend.main:app --reload --port 8001
```

### Module Not Found

Make sure you're running from the project root:

```bash
# Run from: cars-rental/
python -m backend.main
```

## 📝 Development Tips

- Use the interactive docs at `/docs` for testing
- Check the database with Prisma Studio: `npm run db:studio`
- Enable debug mode for detailed error messages
- Use virtual environments to avoid dependency conflicts

## 🤝 Integration with Frontend

The backend is configured to work with the Next.js frontend running on:
- http://localhost:3000
- http://localhost:3001

CORS is pre-configured for these origins.

## 📄 License

This project is part of a car rental management system.

## 👨‍💻 Author

Built with FastAPI, SQLAlchemy, and Pydantic.







