# 🚗 Car Rental Management System

Full-stack car rental management application with Next.js frontend and FastAPI backend.

---

## 🎯 Features

- **Cars Management** - Add, edit, delete, and track vehicles
- **Renters Management** - Manage customer information
- **Rentals Management** - Handle car rentals and returns
- **Real-time Status** - Track car availability
- **Automatic Calculations** - Mileage tracking and pricing
- **Modern UI** - Responsive design with Tailwind CSS
- **Type-Safe** - Full TypeScript support
- **API Documentation** - Auto-generated Swagger docs

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+ and pip
- **Git**

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd cars-rental
```

### 2. Setup Frontend

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start dev server
npm run dev
```

Frontend runs on: http://localhost:3000

See **[FRONTEND.md](FRONTEND.md)** for complete frontend documentation.

### 3. Setup Backend

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Start FastAPI server
START_BACKEND.bat
```

Backend runs on: http://localhost:8000  
API Docs: http://localhost:8000/docs

See **[backend/README.md](backend/README.md)** for complete backend documentation.

---

## 📁 Project Structure

```
cars-rental/
│
├── app/                    # Next.js pages
├── components/             # React components
├── lib/                    # Utilities & API client
├── types/                  # TypeScript definitions
├── prisma/                 # Database schema
│
├── backend/                # FastAPI backend
│   ├── main.py            # FastAPI app
│   ├── models.py          # Database models
│   ├── schemas.py         # Pydantic schemas
│   ├── crud.py            # CRUD operations
│   └── routers/           # API routes
│
├── FRONTEND.md            # Frontend documentation
├── backend/README.md      # Backend documentation
└── README.md              # This file
```

---

## 🔧 Technology Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **SQLite** - Database
- **Uvicorn** - ASGI server

---

## 🌐 API Endpoints

### Cars
- `GET /cars` - List all cars
- `POST /cars` - Create car
- `GET /cars/{id}` - Get car
- `PUT /cars/{id}` - Update car
- `DELETE /cars/{id}` - Delete car

### Renters
- `GET /renters` - List all renters
- `POST /renters` - Create renter
- `GET /renters/{id}` - Get renter
- `PUT /renters/{id}` - Update renter
- `DELETE /renters/{id}` - Delete renter

### Rentals
- `GET /rentals` - List all rentals
- `POST /rentals` - Create rental
- `GET /rentals/{id}` - Get rental
- `PUT /rentals/{id}` - Return car
- `DELETE /rentals/{id}` - Delete rental

Full API documentation: http://localhost:8000/docs

---

## 🧪 Testing

### Test Backend Connection

1. Start both frontend and backend
2. Visit: http://localhost:3000/test-connection
3. All tests should pass ✅

### Postman Collection

Import `Car_Rental_API.postman_collection.json` for pre-configured API requests.

---

## 🔒 Environment Variables

### Frontend (.env.local)

Required variables for API connection (26 total). See `.env.example` or `FRONTEND.md` for complete list.

Key variables:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# ... + 25 endpoint variables
```

### Backend

Backend uses the same database as frontend (`prisma/dev.db`).

---

## 🗄️ Database

### Schema

**Cars**: Vehicle information (registration, brand, model, mileage, price, status)  
**Renters**: Customer information (name, address)  
**Rentals**: Rental transactions (dates, mileage, amounts)

### Commands

```bash
npm run db:studio    # Open Prisma Studio
npm run db:push      # Push schema changes
npm run db:seed      # Seed sample data
```

---

## 🔄 Development Workflow

### Typical Flow

1. **Start Backend**: `START_BACKEND.bat`
2. **Start Frontend**: `npm run dev`
3. **Make Changes**: Code in `app/`, `components/`, or `backend/`
4. **Test**: Visit http://localhost:3000
5. **API Docs**: Check http://localhost:8000/docs

### Adding a Feature

1. **Backend**: Add route in `backend/routers/`
2. **Frontend**: Add API call to `lib/api-client.ts`
3. **Types**: Add types to `types/`
4. **UI**: Create component in `components/`
5. **Page**: Use component in `app/`

---

## 📚 Documentation

- **[FRONTEND.md](FRONTEND.md)** - Complete frontend guide
- **[backend/README.md](backend/README.md)** - Complete backend guide
- **[API Docs](http://localhost:8000/docs)** - Interactive API documentation

---

## 🐛 Troubleshooting

### Frontend won't start
- Check `.env.local` exists with all variables
- Run `npm install`
- Delete `.next` folder

### Backend won't start
- Check Python dependencies: `pip install -r backend/requirements.txt`
- Verify port 8000 is available
- Check database exists: `prisma/dev.db`

### API calls failing
- Ensure backend is running
- Check environment variables
- Verify CORS settings

### Type errors
- Import types from `@/types`
- Run `npm run build` to check
- Restart TypeScript server

---

## 📦 Production Deployment

### Frontend

```bash
npm run build
npm run start
```

Update `.env.production` with production API URL.

### Backend

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

Consider using:
- **Vercel** for Next.js
- **Railway/Render** for FastAPI
- **PostgreSQL** for production database

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## 📝 License

This project is for educational purposes.

---

## 🆘 Support

- Check documentation: `FRONTEND.md` and `backend/README.md`
- Test connection: http://localhost:3000/test-connection
- API docs: http://localhost:8000/docs
- Open an issue for bugs

---

## ✅ Quick Checklist

- [ ] Node.js and Python installed
- [ ] Dependencies installed (`npm install` + `pip install`)
- [ ] `.env.local` created with all variables
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Test connection passes
- [ ] Database exists at `prisma/dev.db`

---

**Built with ❤️ using Next.js and FastAPI**
