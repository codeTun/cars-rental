# 🎨 Frontend Documentation - Next.js

## 📋 Overview

Next.js 16 frontend for the Car Rental Management System with TypeScript, Tailwind CSS, and FastAPI backend integration.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_HEALTH=/health
NEXT_PUBLIC_API_ROOT=/
NEXT_PUBLIC_API_CARS_BASE=/cars
NEXT_PUBLIC_API_CARS_GET_ALL=/cars
NEXT_PUBLIC_API_CARS_GET_BY_ID=/cars/{id}
NEXT_PUBLIC_API_CARS_CREATE=/cars
NEXT_PUBLIC_API_CARS_UPDATE=/cars/{id}
NEXT_PUBLIC_API_CARS_DELETE=/cars/{id}
NEXT_PUBLIC_API_RENTERS_BASE=/renters
NEXT_PUBLIC_API_RENTERS_GET_ALL=/renters
NEXT_PUBLIC_API_RENTERS_GET_BY_ID=/renters/{id}
NEXT_PUBLIC_API_RENTERS_CREATE=/renters
NEXT_PUBLIC_API_RENTERS_UPDATE=/renters/{id}
NEXT_PUBLIC_API_RENTERS_DELETE=/renters/{id}
NEXT_PUBLIC_API_RENTERS_SEARCH=/renters
NEXT_PUBLIC_API_RENTALS_BASE=/rentals
NEXT_PUBLIC_API_RENTALS_GET_ALL=/rentals
NEXT_PUBLIC_API_RENTALS_GET_BY_ID=/rentals/{id}
NEXT_PUBLIC_API_RENTALS_GET_BY_CAR=/rentals/car/{car_id}
NEXT_PUBLIC_API_RENTALS_GET_BY_RENTER=/rentals/renter/{renter_id}
NEXT_PUBLIC_API_RENTALS_CREATE=/rentals
NEXT_PUBLIC_API_RENTALS_UPDATE=/rentals/{id}
NEXT_PUBLIC_API_RENTALS_DELETE=/rentals/{id}
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV=development
```

### 3. Start Development Server
```bash
npm run dev
```

Open http://localhost:3000

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── cars/              # Car management pages
│   ├── renters/           # Renter management pages
│   ├── rentals/           # Rental management pages
│   └── test-connection/   # Backend connection test
│
├── components/            # React components
│   ├── CarForm.tsx
│   ├── RenterForm.tsx
│   ├── RentalForm.tsx
│   ├── DeleteCarButton.tsx
│   ├── DeleteRenterButton.tsx
│   ├── ReturnCarForm.tsx
│   └── SearchRenters.tsx
│
├── lib/                   # Utilities
│   ├── api-client.ts     # FastAPI client
│   └── prisma.ts         # Database client
│
├── types/                 # TypeScript definitions
│   ├── cars.d.ts
│   ├── renters.d.ts
│   ├── rentals.d.ts
│   ├── api.d.ts
│   └── index.d.ts
│
└── prisma/               # Database
    ├── schema.prisma
    └── dev.db
```

---

## 🔌 API Integration

### Using the API Client

```typescript
import { carsAPI } from '@/lib/api-client'
import type { Car } from '@/types'

// Get all cars
const result = await carsAPI.getAll()

// Create a car
const newCar = await carsAPI.create({
  numImma: "ABC-123",
  marque: "Toyota",
  modele: "Corolla",
  kilometrage: 50000,
  prixLocation: 45.50
})

// Update a car
const updated = await carsAPI.update(1, {
  prixLocation: 50.00
})

// Delete a car
await carsAPI.delete(1)
```

### Available APIs

- **carsAPI**: Car CRUD operations
- **rentersAPI**: Renter CRUD operations
- **rentalsAPI**: Rental CRUD operations
- **healthAPI**: Health check

---

## 🎨 Pages

### Cars Management
- `/cars` - List all cars
- `/cars/new` - Add new car
- `/cars/[id]` - View car details
- `/cars/[id]/edit` - Edit car

### Renters Management
- `/renters` - List all renters
- `/renters/new` - Add new renter
- `/renters/[id]` - View renter details
- `/renters/[id]/edit` - Edit renter

### Rentals Management
- `/rentals` - List all rentals
- `/rentals/new` - Create new rental
- `/rentals/[id]` - View rental details & return car

### Testing
- `/test-connection` - Test backend connection

---

## 🎯 TypeScript Types

Import types from `@/types`:

```typescript
import type {
  Car,
  CreateCarInput,
  UpdateCarInput,
  Renter,
  CreateRenterInput,
  UpdateRenterInput,
  Rental,
  CreateRentalInput,
  UpdateRentalInput,
} from '@/types'
```

---

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Commands

```bash
npm run db:studio    # Open Prisma Studio
npm run db:push      # Push schema to database
npm run db:seed      # Seed database
```

---

## 🧪 Testing Backend Connection

Visit http://localhost:3000/test-connection to verify:
- Environment variables are loaded
- Backend is running
- All API endpoints are accessible

---

## 🎨 Styling

Uses **Tailwind CSS** with custom configuration:
- Modern, responsive design
- Color-coded status indicators
- Smooth transitions and hover effects

---

## 🔒 Security

- All API endpoints from environment variables
- No hardcoded URLs in code
- CORS configured for localhost:3000
- Type-safe API calls

---

## 📦 Dependencies

### Core
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS

### Database
- **Prisma** - Database ORM
- **SQLite** - Database

---

## 🐛 Troubleshooting

### App won't start
- Check `.env.local` exists and has all variables
- Run `npm install`
- Delete `.next` folder and restart

### API calls failing
- Ensure backend is running on port 8000
- Check environment variables are correct
- Verify CORS settings in backend

### Type errors
- Run `npm run build` to check TypeScript
- Import types from `@/types`
- Restart IDE/TypeScript server

---

## 🚀 Production Build

```bash
# Build
npm run build

# Start
npm run start
```

For production deployment, update `.env.production`:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)


