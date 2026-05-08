import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Metodología Cuantitativa',
    template: '%s — Metodología Cuantitativa',
  },
  description: 'Aplicación pedagógica para aprender metodología cuantitativa, medición, psicometría y estadística aplicada.',
}

// Force light mode regardless of OS/browser preference.
// colorScheme: 'light' generates <meta name="color-scheme" content="light">
// which opts out of Chrome Android's force-dark and iOS dark mode reader.
export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FAFAF9',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} style={{ colorScheme: 'light' }}>
      <body>{children}</body>
    </html>
  )
}
