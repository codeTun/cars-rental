/**
 * API Client for FastAPI Backend
 * This replaces the direct Prisma calls with API calls to the backend
 * All endpoints are configured via environment variables for security
 */

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
  ApiResponse,
  HealthCheckResponse,
  MessageResponse,
} from '@/types'

// API Configuration from environment variables
// NO FALLBACKS - All must be configured in .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!

// Validate that API_BASE_URL is configured
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL must be configured in .env.local')
}

// API Endpoints - ALL from environment variables (NO FALLBACKS for security)
const ENDPOINTS = {
  // System
  health: process.env.NEXT_PUBLIC_API_HEALTH!,
  root: process.env.NEXT_PUBLIC_API_ROOT!,
  
  // Cars
  cars: {
    base: process.env.NEXT_PUBLIC_API_CARS_BASE!,
    getAll: process.env.NEXT_PUBLIC_API_CARS_GET_ALL!,
    getById: (id: number) => process.env.NEXT_PUBLIC_API_CARS_GET_BY_ID!.replace('{id}', String(id)),
    create: process.env.NEXT_PUBLIC_API_CARS_CREATE!,
    update: (id: number) => process.env.NEXT_PUBLIC_API_CARS_UPDATE!.replace('{id}', String(id)),
    delete: (id: number) => process.env.NEXT_PUBLIC_API_CARS_DELETE!.replace('{id}', String(id)),
  },
  
  // Renters
  renters: {
    base: process.env.NEXT_PUBLIC_API_RENTERS_BASE!,
    getAll: process.env.NEXT_PUBLIC_API_RENTERS_GET_ALL!,
    getById: (id: number) => process.env.NEXT_PUBLIC_API_RENTERS_GET_BY_ID!.replace('{id}', String(id)),
    create: process.env.NEXT_PUBLIC_API_RENTERS_CREATE!,
    update: (id: number) => process.env.NEXT_PUBLIC_API_RENTERS_UPDATE!.replace('{id}', String(id)),
    delete: (id: number) => process.env.NEXT_PUBLIC_API_RENTERS_DELETE!.replace('{id}', String(id)),
    search: process.env.NEXT_PUBLIC_API_RENTERS_SEARCH!,
  },
  
  // Rentals
  rentals: {
    base: process.env.NEXT_PUBLIC_API_RENTALS_BASE!,
    getAll: process.env.NEXT_PUBLIC_API_RENTALS_GET_ALL!,
    getById: (id: number) => process.env.NEXT_PUBLIC_API_RENTALS_GET_BY_ID!.replace('{id}', String(id)),
    getByCar: (carId: number) => process.env.NEXT_PUBLIC_API_RENTALS_GET_BY_CAR!.replace('{car_id}', String(carId)),
    getByRenter: (renterId: number) => process.env.NEXT_PUBLIC_API_RENTALS_GET_BY_RENTER!.replace('{renter_id}', String(renterId)),
    create: process.env.NEXT_PUBLIC_API_RENTALS_CREATE!,
    update: (id: number) => process.env.NEXT_PUBLIC_API_RENTALS_UPDATE!.replace('{id}', String(id)),
    delete: (id: number) => process.env.NEXT_PUBLIC_API_RENTALS_DELETE!.replace('{id}', String(id)),
  },
} as const

// Generic API fetch function
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        error: errorData?.detail || `HTTP error! status: ${response.status}`,
      }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

// ============== Cars API ==============

export const carsAPI = {
  getAll: async (availableOnly = false) => {
    const url = availableOnly 
      ? `${ENDPOINTS.cars.getAll}?available_only=true` 
      : ENDPOINTS.cars.getAll
    return apiFetch<Car[]>(url)
  },

  getById: async (id: number) => {
    return apiFetch<Car>(ENDPOINTS.cars.getById(id))
  },

  create: async (data: CreateCarInput) => {
    return apiFetch<Car>(ENDPOINTS.cars.create, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: number, data: UpdateCarInput) => {
    return apiFetch<Car>(ENDPOINTS.cars.update(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: number) => {
    return apiFetch<MessageResponse>(ENDPOINTS.cars.delete(id), {
      method: 'DELETE',
    })
  },
}

// ============== Renters API ==============

export const rentersAPI = {
  getAll: async (search?: string) => {
    const url = search 
      ? `${ENDPOINTS.renters.getAll}?search=${encodeURIComponent(search)}` 
      : ENDPOINTS.renters.getAll
    return apiFetch<Renter[]>(url)
  },

  getById: async (id: number) => {
    return apiFetch<Renter>(ENDPOINTS.renters.getById(id))
  },

  create: async (data: CreateRenterInput) => {
    return apiFetch<Renter>(ENDPOINTS.renters.create, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: number, data: UpdateRenterInput) => {
    return apiFetch<Renter>(ENDPOINTS.renters.update(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: number) => {
    return apiFetch<MessageResponse>(ENDPOINTS.renters.delete(id), {
      method: 'DELETE',
    })
  },

  search: async (query: string) => {
    return apiFetch<Renter[]>(`${ENDPOINTS.renters.search}?search=${encodeURIComponent(query)}`)
  },
}

// ============== Rentals API ==============

export const rentalsAPI = {
  getAll: async (activeOnly = false) => {
    const url = activeOnly 
      ? `${ENDPOINTS.rentals.getAll}?active_only=true` 
      : ENDPOINTS.rentals.getAll
    return apiFetch<Rental[]>(url)
  },

  getById: async (id: number) => {
    return apiFetch<Rental>(ENDPOINTS.rentals.getById(id))
  },

  getByCar: async (carId: number) => {
    return apiFetch<Rental[]>(ENDPOINTS.rentals.getByCar(carId))
  },

  getByRenter: async (renterId: number) => {
    return apiFetch<Rental[]>(ENDPOINTS.rentals.getByRenter(renterId))
  },

  create: async (data: CreateRentalInput) => {
    return apiFetch<Rental>(ENDPOINTS.rentals.create, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: number, data: UpdateRentalInput) => {
    return apiFetch<Rental>(ENDPOINTS.rentals.update(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: number) => {
    return apiFetch<MessageResponse>(ENDPOINTS.rentals.delete(id), {
      method: 'DELETE',
    })
  },
}

// ============== Health Check ==============

export const healthAPI = {
  check: async () => {
    return apiFetch<HealthCheckResponse>(ENDPOINTS.health)
  },
}

export default {
  cars: carsAPI,
  renters: rentersAPI,
  rentals: rentalsAPI,
  health: healthAPI,
}

