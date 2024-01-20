import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from '@/components/ui/nav-bar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quran App',
  description: 'Built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={10}><Navbar /></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={90}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </ThemeProvider>
      </body>
    </html>
    </>
    )
}
