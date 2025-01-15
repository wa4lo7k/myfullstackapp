'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { User, Lock } from 'lucide-react'

export default function Login() {
  const [loginType, setLoginType] = useState('patient')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (loginType === 'admin' && username === 'admin' && password === 'admin') {
      router.push('/admin')
    } else if (loginType === 'patient' && username === 'patient' && password === 'patient') {
      router.push('/patient-dashboard')
    } else if (loginType === 'doctor' && username === 'doctor' && password === 'doctor') {
      router.push('/doctor-dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-indigo-600">
      <Header />
      <main className="flex-grow container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to HealthSync</h1>
            <div className="flex justify-center space-x-4 mb-6">
              {['patient', 'doctor', 'admin'].map((type) => (
                <button
                  key={type}
                  onClick={() => setLoginType(type)}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors duration-300 ${
                    loginType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Login
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Password"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

