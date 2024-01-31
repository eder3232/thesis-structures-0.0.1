import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/shared/navbar/navbar'
import { siteConfig } from '@/shared/config/site'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import { Provider } from 'jotai'
import Footer from '@/components/shared/footer/footer'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [
    {
      url: 'bocchi_right.ico',
      href: 'bocchi_right.ico',
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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-36">
              <Navbar />
              <div className="container">{children}</div>
            </div>
            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
