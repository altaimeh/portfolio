import type { Metadata } from 'next'
import './globals.css'

/**
 * Page-level SEO metadata injected into the <head> by Next.js.
 * Sets the browser tab title and the description used by search engines
 * and social-media link previews.
 */
export const metadata: Metadata = {
  title: 'Al-Taimee Hassan',
  description: 'Full Stack Engineer building reliable, modern web applications for enterprise teams.',
}

/**
 * RootLayout
 * ----------
 * The top-level layout component that wraps every page in the app.
 * Next.js App Router requires this file to define the <html> and <body>
 * tags for the site. Any provider, global style, or global UI (fonts,
 * analytics, theme wrappers, etc.) would be mounted here so that it is
 * shared across every route.
 */
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
