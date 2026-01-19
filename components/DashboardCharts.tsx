'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

interface RentalData {
  dateDebut: string
  montantTotal?: number | null
}

// Hook to detect if component is mounted (for SSR)
function useIsMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

// Revenue Bar Chart - Monthly revenue
export function RevenueChart({ rentals }: { rentals: RentalData[] }) {
  const isMounted = useIsMounted()
  
  // Group rentals by month
  const monthlyData = rentals.reduce((acc, rental) => {
    if (!rental.montantTotal) return acc
    const date = new Date(rental.dateDebut)
    const monthKey = date.toLocaleString('fr-FR', { month: 'short', year: '2-digit' })
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, revenue: 0, count: 0 }
    }
    acc[monthKey].revenue += rental.montantTotal
    acc[monthKey].count += 1
    return acc
  }, {} as Record<string, { month: string; revenue: number; count: number }>)

  const data = Object.values(monthlyData).slice(-6) // Last 6 months

  // If no data, show placeholder
  if (data.length === 0) {
    data.push({ month: 'Jan', revenue: 0, count: 0 })
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">📊 Revenus Mensuels</h3>
          <p className="text-sm text-gray-500">Évolution des revenus par mois</p>
        </div>
        <div className="bg-emerald-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-emerald-700">
            {data.reduce((sum, d) => sum + d.revenue, 0).toFixed(0)} DT
          </span>
        </div>
      </div>
      <div className="h-[300px]">
        {!isMounted ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="animate-pulse text-gray-400">Chargement du graphique...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `${value} DT`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value) => [`${Number(value || 0).toFixed(2)} DT`, 'Revenus']}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#colorRevenue)" 
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

// Car Status Pie Chart
export function CarStatusChart({ available, rented }: { available: number; rented: number }) {
  const isMounted = useIsMounted()
  
  const data = [
    { name: 'Disponibles', value: available, color: '#10B981' },
    { name: 'Louées', value: rented, color: '#F59E0B' },
  ]

  const total = available + rented

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">🚗 État des Voitures</h3>
          <p className="text-sm text-gray-500">Répartition du parc automobile</p>
        </div>
        <div className="bg-blue-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-blue-700">{total} voitures</span>
        </div>
      </div>
      <div className="h-[250px]">
        {!isMounted ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="animate-pulse text-gray-400">Chargement du graphique...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value, name) => [`${value} voitures`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
          <span className="text-sm text-gray-600">Disponibles ({available})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
          <span className="text-sm text-gray-600">Louées ({rented})</span>
        </div>
      </div>
    </div>
  )
}

// Rentals Trend Line Chart
export function RentalsTrendChart({ rentals }: { rentals: RentalData[] }) {
  const isMounted = useIsMounted()
  
  // Group by week
  const weeklyData = rentals.reduce((acc, rental) => {
    const date = new Date(rental.dateDebut)
    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() - date.getDay())
    const weekKey = weekStart.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
    
    if (!acc[weekKey]) {
      acc[weekKey] = { week: weekKey, locations: 0, revenue: 0 }
    }
    acc[weekKey].locations += 1
    acc[weekKey].revenue += rental.montantTotal || 0
    return acc
  }, {} as Record<string, { week: string; locations: number; revenue: number }>)

  const data = Object.values(weeklyData).slice(-8) // Last 8 weeks

  // If no data, show placeholder
  if (data.length === 0) {
    data.push({ week: 'Sem. 1', locations: 0, revenue: 0 })
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">📈 Tendance des Locations</h3>
          <p className="text-sm text-gray-500">Évolution hebdomadaire</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-gray-600">Revenus</span>
          </div>
        </div>
      </div>
      <div className="h-[250px]">
        {!isMounted ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="animate-pulse text-gray-400">Chargement du graphique...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickFormatter={(value) => `${value} DT`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value, name) => [
                  name === 'locations' ? `${value} locations` : `${Number(value || 0).toFixed(2)} DT`,
                  name === 'locations' ? 'Locations' : 'Revenus'
                ]}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="locations" 
                stroke="#3B82F6" 
                fill="url(#colorLocations)"
                strokeWidth={2}
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                fill="url(#colorRevenueArea)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorLocations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorRevenueArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
