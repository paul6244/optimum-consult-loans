import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { ErrorBoundary } from '@/components/error-boundary'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  title: 'Optimum Consult LTD | Clearer financial decisions',
  description: 'Trusted payslip loan consolidation and financial guidance for CAGD workers in Ghana.',
  verification: {
    google: 'vP29eWvKRUbFzT_RON2TOmNP8o4PIanpz192qa-2nbg'
  }
}

export const viewport: Viewport = { 
  colorScheme: 'light', 
  themeColor: '#f6f5ef',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${inter.variable} ${fraunces.variable} antialiased`}><ErrorBoundary>{children}</ErrorBoundary>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
