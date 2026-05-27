import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AGENTICLY — AI-Powered Crypto Trading',
  description: 'All-in-one futures, spot, and AI trading platform on Base Chain.',
  icons: { icon: '/AGENTICLY-logo.png' },
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