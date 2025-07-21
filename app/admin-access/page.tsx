'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Lock, Users, BarChart3, Settings, ArrowRight, Home } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const adminFeatures = [
  {
    icon: Users,
    title: 'User Management',
    description: 'Manage patients, doctors, and staff accounts with comprehensive user controls.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Access detailed analytics, system reports, and performance metrics.'
  },
  {
    icon: Settings,
    title: 'System Configuration',
    description: 'Configure system settings, security policies, and platform preferences.'
  },
  {
    icon: Shield,
    title: 'Security Management',
    description: 'Monitor security events, manage access controls, and audit logs.'
  }
]

export default function AdminAccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-white hover:text-blue-400 transition-colors duration-200">
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            HealthSync Admin Portal
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive administration dashboard for managing the HealthSync platform, 
            users, and system configurations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {adminFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Access Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-2xl text-white">Secure Admin Access</CardTitle>
              <CardDescription className="text-gray-300">
                This portal is restricted to authorized administrators only. 
                Please authenticate with your admin credentials to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-blue-200 text-sm">
                  <strong>Demo Credentials:</strong><br />
                  Email: admin@healthsync.com<br />
                  Password: admin123
                </p>
              </div>
              
              <Link href="/admin/login">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Access Admin Portal
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <p className="text-sm text-gray-400 mt-4">
                Need help? Contact your system administrator or IT support team.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-200 text-sm">
              <strong>Security Notice:</strong> All admin activities are logged and monitored. 
              Unauthorized access attempts will be reported to system administrators.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
