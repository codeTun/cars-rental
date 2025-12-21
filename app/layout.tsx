import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gestion de Location de Voitures',
  description: 'Gérez votre entreprise de location de voitures efficacement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-800 text-white">
            <div className="flex items-center justify-center h-24 border-b border-gray-700 bg-white">
              <Link href="/" className="flex items-center justify-center p-2">
                <Image src="/logo.png" alt="TuniCars+" width={200} height={80} className="object-contain" priority />
              </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              <NavLink href="/" icon="📊">Tableau de bord</NavLink>
              <NavLink href="/cars" icon="🚙">Voitures</NavLink>
              <NavLink href="/renters" icon="👥">Locataires</NavLink>
              <NavLink href="/rentals" icon="📋">Locations</NavLink>
            </nav>
            <div className="p-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">© 2025 Gestion Location Auto</p>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Mobile Navigation */}
            <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
              <Link href="/" className="flex items-center bg-white rounded-md px-3 py-2">
                <Image src="/logo.png" alt="TuniCars+" width={160} height={65} className="object-contain" priority />
              </Link>
              <div className="flex gap-4">
                <Link href="/" className="hover:text-gray-300">📊</Link>
                <Link href="/cars" className="hover:text-gray-300">🚙</Link>
                <Link href="/renters" className="hover:text-gray-300">👥</Link>
                <Link href="/rentals" className="hover:text-gray-300">📋</Link>
              </div>
            </div>
            
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span>{children}</span>
    </Link>
  )
}
