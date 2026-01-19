'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { rentalsAPI } from '@/lib/api-client'
import type { Car, Renter } from '@/types'

interface RentalFormProps {
  cars: Car[]
  renters: Renter[]
}

export function RentalForm({ cars, renters }: RentalFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [endDate, setEndDate] = useState('')
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  // Calculate estimated price when car or end date changes
  const calculatePrice = (car: Car | null, endDateValue: string) => {
    if (!car || !endDateValue) {
      setEstimatedPrice(0)
      return
    }
    const start = new Date()
    const end = new Date(endDateValue)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (days > 0) {
      setEstimatedPrice(days * car.prixLocation)
    } else {
      setEstimatedPrice(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      carId: parseInt(formData.get('carId') as string),
      renterId: parseInt(formData.get('renterId') as string),
      kmDebut: selectedCar?.kilometrage || 0,
      dateFin: endDate || undefined,
      montantTotal: estimatedPrice > 0 ? estimatedPrice : undefined,
    }

    const result = await rentalsAPI.create(data)

    if (result.success) {
      router.push('/rentals')
      router.refresh()
    } else {
      setError(result.error || 'Une erreur est survenue')
      setIsSubmitting(false)
    }
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Aucune voiture disponible pour le moment.</p>
        <a href="/cars/new" className="text-blue-600 hover:text-blue-700 font-medium">
          Ajouter une nouvelle voiture
        </a>
      </div>
    )
  }

  if (renters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Aucun locataire dans le système.</p>
        <a href="/renters/new" className="text-purple-600 hover:text-purple-700 font-medium">
          Ajouter un nouveau locataire
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="carId" className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner une Voiture *
        </label>
        <select
          id="carId"
          name="carId"
          required
          onChange={(e) => {
            const car = cars.find(c => c.id === parseInt(e.target.value)) || null
            setSelectedCar(car)
            calculatePrice(car, endDate)
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
        >
          <option value="">Choisir une voiture...</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.marque} {car.modele} - {car.numImma} ({car.prixLocation.toFixed(2)} DT/jour)
            </option>
          ))}
        </select>
        
        {selectedCar && (
          <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Kilométrage actuel:</span>
                <span className="ml-2 font-bold text-blue-900">{selectedCar.kilometrage.toLocaleString()} km</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Prix/Jour:</span>
                <span className="ml-2 font-bold text-blue-900">{selectedCar.prixLocation.toFixed(2)} DT</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="renterId" className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner un Locataire *
        </label>
        <select
          id="renterId"
          name="renterId"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
        >
          <option value="">Choisir un locataire...</option>
          {renters.map((renter) => (
            <option key={renter.id} value={renter.id}>
              {renter.prenom} {renter.nom} - {renter.adresse}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-2">
          Date de Fin Prévue *
        </label>
        <input
          type="date"
          id="dateFin"
          name="dateFin"
          required
          min={new Date().toISOString().split('T')[0]}
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value)
            calculatePrice(selectedCar, e.target.value)
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
        />
      </div>

      {estimatedPrice > 0 && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-green-900 font-medium">Prix Total Estimé:</span>
            <span className="text-2xl font-bold text-green-700">{estimatedPrice.toFixed(2)} DT</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Calculé automatiquement selon la durée de location
          </p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> La location commencera aujourd'hui avec le kilométrage actuel de la voiture.
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Création de la Location...' : 'Créer la Location'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
