import Link from 'next/link'
import { carsAPI, rentersAPI, rentalsAPI } from '@/lib/api-client'

export default async function HomePage() {
  // Fetch data from API
  const [carsResult, rentersResult, rentalsResult] = await Promise.all([
    carsAPI.getAll(),
    rentersAPI.getAll(),
    rentalsAPI.getAll()
  ])

  const cars = carsResult.data || []
  const renters = rentersResult.data || []
  const rentals = rentalsResult.data || []

  // Calculate statistics
  const totalCars = cars.length
  const availableCars = cars.filter(c => c.etat === 0).length
  const rentedCars = cars.filter(c => c.etat === 1).length
  
  const now = new Date()
  
  // Active = Car not returned yet (kmFin is null) AND (no end date OR end date in future)
  const activeRentals = rentals.filter(r => {
    if (r.kmFin !== null) return false
    if (!r.dateFin) return true
    const endDate = new Date(r.dateFin)
    return endDate >= now
  }).length

  // Count renters with active rentals
  const rentersWithActiveRentals = new Set(
    rentals.filter(r => {
      if (r.kmFin !== null) return false
      if (!r.dateFin) return true
      const endDate = new Date(r.dateFin)
      return endDate >= now
    }).map(r => r.renterId)
  ).size

  // REVENUE: Counted when rental is CREATED (payment is upfront)
  // Based on dateDebut (rental start date = payment date)
  const rentalsWithRevenue = rentals.filter(r => r.montantTotal && r.montantTotal > 0)
  const totalRevenue = rentalsWithRevenue.reduce((sum, r) => sum + (r.montantTotal || 0), 0)
  
  // Revenue by period - based on when rental STARTED (dateDebut)
  const todayRevenue = rentalsWithRevenue
    .filter(r => {
      const startDate = new Date(r.dateDebut)
      return startDate.toDateString() === now.toDateString()
    })
    .reduce((sum, r) => sum + (r.montantTotal || 0), 0)
  
  const thisWeekRevenue = rentalsWithRevenue
    .filter(r => {
      const startDate = new Date(r.dateDebut)
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return startDate >= weekAgo
    })
    .reduce((sum, r) => sum + (r.montantTotal || 0), 0)
  
  const thisMonthRevenue = rentalsWithRevenue
    .filter(r => {
      const startDate = new Date(r.dateDebut)
      return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, r) => sum + (r.montantTotal || 0), 0)

  const stats = [
    {
      title: 'Total Voitures',
      value: totalCars,
      description: `${availableCars} disponibles, ${rentedCars} louées`,
      href: '/cars',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Locataires',
      value: renters.length,
      description: `${rentersWithActiveRentals} en location`,
      href: '/renters',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Locations Actives',
      value: activeRentals,
      description: 'En cours',
      href: '/rentals',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Revenus Total',
      value: `${totalRevenue.toFixed(2)} DT`,
      description: `${rentalsWithRevenue.length} locations payées`,
      href: '/rentals',
      color: 'from-emerald-500 to-emerald-600'
    }
  ]

  const revenueStats = [
    { period: "Aujourd'hui", amount: todayRevenue, icon: '📅' },
    { period: 'Cette Semaine', amount: thisWeekRevenue, icon: '📊' },
    { period: 'Ce Mois', amount: thisMonthRevenue, icon: '📈' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion de Location de Voitures</h1>
          <p className="mt-1 text-sm text-gray-500">Gérez votre entreprise de location de voitures efficacement</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className="relative">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-xs text-gray-500">{stat.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Revenue Stats Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8" id="revenue-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Revenus par Période</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {revenueStats.map((stat) => (
              <div key={stat.period} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className="text-sm font-medium text-green-700">{stat.period}</span>
                </div>
                <p className="text-3xl font-bold text-green-900">{stat.amount.toFixed(2)} DT</p>
                <p className="text-sm text-green-600 mt-1">Bénéfices générés</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/cars"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Gérer les Voitures
            </Link>
            
            <Link
              href="/renters"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Gérer les Locataires
            </Link>
            
            <Link
              href="/rentals"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Gérer les Locations
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
