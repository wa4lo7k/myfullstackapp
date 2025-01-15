import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, Video, CreditCard, BarChart2, Settings, Bell, Database, Cpu } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: Home, color: 'text-blue-500' },
  { name: 'Users', href: '/admin/users', icon: Users, color: 'text-green-500' },
  { name: 'Appointments', href: '/admin/appointments', icon: Calendar, color: 'text-yellow-500' },
  { name: 'Telemedicine', href: '/admin/telemedicine', icon: Video, color: 'text-purple-500' },
  { name: 'Billing', href: '/admin/billing', icon: CreditCard, color: 'text-blue-500' },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2, color: 'text-green-500' },
  { name: 'Blockchain', href: '/admin/blockchain', icon: Database, color: 'text-yellow-500' },
  { name: 'IoT Devices', href: '/admin/iot', icon: Cpu, color: 'text-purple-500' },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell, color: 'text-blue-500' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, color: 'text-green-500' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-card w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              pathname === item.href
                ? `bg-gray-200 dark:bg-gray-700 ${item.color}`
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon className={`h-5 w-5 ${item.color}`} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

