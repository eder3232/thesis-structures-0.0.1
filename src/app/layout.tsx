import { Inter as FontSans } from 'next/font/google'
import type { Metadata } from 'next'

import { cn } from '@/lib/utils'

import JotaiProvider from '@/shared/providers/jotai-provider'
import ThemeProvider from '@/shared/providers/theme-provider'

import { siteConfig } from '@/shared/config/site'

import './globals.css'

import Footer from '@/components/shared/footer/footer'
import Navbar from '@/components/shared/navbar/navbar'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [
    {
      url: '/bocchi_right.ico',
      href: '/bocchi_right.ico',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased relative',
          fontSans.variable
        )}
      >
        <JotaiProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="pb-36">
              <Navbar />
              <div className="container pt-6 mb-36">{children}</div>
            </div>
            <Footer />
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  )
}
