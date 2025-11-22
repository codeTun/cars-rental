import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample cars
  const cars = await Promise.all([
    prisma.car.create({
      data: {
        numImma: 'ABC-123',
        marque: 'Toyota',
        modele: 'Corolla',
        kilometrage: 45000,
        etat: 0,
        prixLocation: 45.50
      }
    }),
    prisma.car.create({
      data: {
        numImma: 'XYZ-789',
        marque: 'Honda',
        modele: 'Civic',
        kilometrage: 32000,
        etat: 0,
        prixLocation: 42.00
      }
    }),
    prisma.car.create({
      data: {
        numImma: 'DEF-456',
        marque: 'Ford',
        modele: 'Focus',
        kilometrage: 67000,
        etat: 0,
        prixLocation: 38.00
      }
    }),
    prisma.car.create({
      data: {
        numImma: 'GHI-101',
        marque: 'BMW',
        modele: '320i',
        kilometrage: 28000,
        etat: 0,
        prixLocation: 85.00
      }
    }),
    prisma.car.create({
      data: {
        numImma: 'JKL-202',
        marque: 'Mercedes',
        modele: 'C-Class',
        kilometrage: 15000,
        etat: 0,
        prixLocation: 95.00
      }
    })
  ])

  console.log(`✅ Created ${cars.length} cars`)

  // Create sample renters
  const renters = await Promise.all([
    prisma.renter.create({
      data: {
        nom: 'Dupont',
        prenom: 'Jean',
        adresse: '123 Rue de la Paix, Paris, France'
      }
    }),
    prisma.renter.create({
      data: {
        nom: 'Martin',
        prenom: 'Marie',
        adresse: '456 Avenue des Champs, Lyon, France'
      }
    }),
    prisma.renter.create({
      data: {
        nom: 'Bernard',
        prenom: 'Pierre',
        adresse: '789 Boulevard Victor Hugo, Marseille, France'
      }
    }),
    prisma.renter.create({
      data: {
        nom: 'Dubois',
        prenom: 'Sophie',
        adresse: '321 Rue de Rivoli, Toulouse, France'
      }
    })
  ])

  console.log(`✅ Created ${renters.length} renters`)

  // Create a sample active rental
  const activeRental = await prisma.rental.create({
    data: {
      carId: cars[0].id,
      renterId: renters[0].id,
      dateDebut: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      kmDebut: cars[0].kilometrage
    }
  })

  // Update the car to rented status
  await prisma.car.update({
    where: { id: cars[0].id },
    data: { etat: 1 }
  })

  console.log('✅ Created 1 active rental')

  // Create sample completed rentals
  const completedRentals = await Promise.all([
    prisma.rental.create({
      data: {
        carId: cars[1].id,
        renterId: renters[1].id,
        dateDebut: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        dateFin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        kmDebut: 30000,
        kmFin: 30850,
        montantTotal: 210.00 // 5 days * 42.00
      }
    }),
    prisma.rental.create({
      data: {
        carId: cars[2].id,
        renterId: renters[2].id,
        dateDebut: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        dateFin: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
        kmDebut: 65000,
        kmFin: 65780,
        montantTotal: 190.00 // 5 days * 38.00
      }
    })
  ])

  console.log(`✅ Created ${completedRentals.length} completed rentals`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })



