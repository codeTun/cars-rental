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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      carId: parseInt(formData.get('carId') as string),
      renterId: parseInt(formData.get('renterId') as string),
      kmDebut: selectedCar?.kilometrage || 0,
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
            const car = cars.find(c => c.id === parseInt(e.target.value))
            setSelectedCar(car || null)
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
        >
          <option value="">Choisir une voiture...</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.marque} {car.modele} - {car.numImma} ({car.prixLocation.toFixed(2)} €/jour)
            </option>
          ))}
        </select>
        
        {selectedCar && (
          <div className="mt-3 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Kilométrage actuel:</span>
                <span className="ml-2 font-medium">{selectedCar.kilometrage.toLocaleString()} km</span>
              </div>
              <div>
                <span className="text-gray-600">Prix/Jour:</span>
                <span className="ml-2 font-medium">{selectedCar.prixLocation.toFixed(2)} €</span>
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

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> La location commencera immédiatement avec la date actuelle et le kilométrage actuel de la voiture.
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
