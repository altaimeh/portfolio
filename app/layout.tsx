import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Al-Taimee Hassan — Full Stack Engineer',
  description: 'Full Stack Engineer building reliable, modern web applications for enterprise teams.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
