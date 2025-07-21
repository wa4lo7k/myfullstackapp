'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // For demo purposes, use hardcoded admin credentials
      // In production, this should connect to your backend API
      if (formData.email === 'admin@healthsync.com' && formData.password === 'admin123') {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Store admin session (in production, use proper JWT tokens)
        localStorage.setItem('adminToken', 'demo-admin-token')
        localStorage.setItem('userRole', 'admin')
        
        router.push('/admin')
      } else {
        setError('Invalid admin credentials. Use admin@healthsync.com / admin123 for demo.')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-md">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">Admin Portal</CardTitle>
            <CardDescription className="text-gray-300">
              Access the HealthSync administration dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-500/20 border-red-500/50 text-red-100">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-200">
                  Admin Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    placeholder="admin@healthsync.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? 'Signing in...' : 'Sign In to Admin Portal'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Demo Credentials: admin@healthsync.com / admin123
              </p>
              <Link
                href="/"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                ← Back to Home
              </Link>
              <p className="text-xs text-gray-500 mt-2">
                Direct access: /admin
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
