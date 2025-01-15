'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/admin/sidebar'
import ThemeSwitcher from '@/components/theme-switcher'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleLogout = () => {
    // Here you would typically clear any authentication tokens or user data
    // For this example, we'll just redirect to the login page
    router.push('/login')
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-card border-b border-border">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-card-foreground">HealthSync Admin</h1>
              <div className="flex items-center space-x-4">
                <ThemeSwitcher />
                <Button variant="outline" size="icon" onClick={handleLogout} className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900">
                  <LogOut className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Logout</span>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

