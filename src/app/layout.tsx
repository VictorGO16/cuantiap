import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Metodología Cuantitativa',
  description: 'Aplicación pedagógica para metodología cuantitativa, medición, psicometría y estadística',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
