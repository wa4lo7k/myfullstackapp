'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  FileText,
  Settings,
  Bell,
  Wifi,
  Video,
  CreditCard,
  Shield,
  BarChart3,
  Activity,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const adminModules = [
  {
    title: 'User Management',
    description: 'Manage patients, doctors, and staff accounts',
    icon: Users,
    href: '/admin/users',
    color: 'from-blue-500 to-blue-600',
    stats: '1,234 users'
  },
  {
    title: 'Analytics',
    description: 'View system analytics and reports',
    icon: BarChart3,
    href: '/admin/analytics',
    color: 'from-green-500 to-green-600',
    stats: '↗ 12% growth'
  },
  {
    title: 'Appointments',
    description: 'Monitor and manage all appointments',
    icon: Calendar,
    href: '/admin/appointments',
    color: 'from-purple-500 to-purple-600',
    stats: '45 today'
  },
  {
    title: 'System Settings',
    description: 'Configure system preferences and security',
    icon: Settings,
    href: '/admin/settings',
    color: 'from-gray-500 to-gray-600',
    stats: 'All systems OK'
  },
  {
    title: 'Notifications',
    description: 'Manage system-wide notifications',
    icon: Bell,
    href: '/admin/notifications',
    color: 'from-yellow-500 to-yellow-600',
    stats: '8 pending'
  },
  {
    title: 'IoT Devices',
    description: 'Monitor connected medical devices',
    icon: Wifi,
    href: '/admin/iot',
    color: 'from-cyan-500 to-cyan-600',
    stats: '23 connected'
  },
  {
    title: 'Telemedicine',
    description: 'Manage video consultation platform',
    icon: Video,
    href: '/admin/telemedicine',
    color: 'from-indigo-500 to-indigo-600',
    stats: '12 active calls'
  },
  {
    title: 'Billing',
    description: 'Handle payments and billing management',
    icon: CreditCard,
    href: '/admin/billing',
    color: 'from-emerald-500 to-emerald-600',
    stats: '$45,230 today'
  },
  {
    title: 'Blockchain',
    description: 'Manage blockchain health records',
    icon: Shield,
    href: '/admin/blockchain',
    color: 'from-orange-500 to-orange-600',
    stats: '1,456 records'
  }
]

const quickStats = [
  { label: 'Total Users', value: '1,234', change: '+12%', icon: Users },
  { label: 'Active Sessions', value: '89', change: '+5%', icon: Activity },
  { label: 'Revenue Today', value: '$45,230', change: '+18%', icon: TrendingUp },
  { label: 'System Health', value: '99.9%', change: '0%', icon: Shield }
]

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the HealthSync administration portal</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, index) => (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Admin Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Administration Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={module.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">{module.stats}</span>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        Access →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

