import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jaimin Patel',
  description: 'Personal website of Jaimin Patel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-lg font-bold">Jaimin Patel</div>
            <div className="space-x-6">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/resources" className="hover:text-gray-300">Resources</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Jaimin Patel. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 