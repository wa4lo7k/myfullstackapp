'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { healthAPI, authAPI } from '@/lib/api'

export default function TestAPIPage() {
  const [healthStatus, setHealthStatus] = useState<any>(null)
  const [authResult, setAuthResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testHealthCheck = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await healthAPI.check()
      if (result.error) {
        setError(result.error)
      } else {
        setHealthStatus(result.data)
      }
    } catch (err) {
      setError('Failed to connect to backend')
    } finally {
      setLoading(false)
    }
  }

  const testRegistration = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await authAPI.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'patient'
      })
      
      if (result.error) {
        setError(result.error)
      } else {
        setAuthResult(result.data)
      }
    } catch (err) {
      setError('Registration test failed')
    } finally {
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await authAPI.login({
        email: 'test@example.com',
        password: 'password123'
      })
      
      if (result.error) {
        setError(result.error)
      } else {
        setAuthResult(result.data)
        // Store token for future requests
        if (result.data?.token) {
          localStorage.setItem('authToken', result.data.token)
        }
      }
    } catch (err) {
      setError('Login test failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">HealthSync API Integration Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Health Check Test */}
          <Card>
            <CardHeader>
              <CardTitle>Backend Health Check</CardTitle>
              <CardDescription>Test if frontend can connect to backend API</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={testHealthCheck} 
                disabled={loading}
                className="w-full mb-4"
              >
                {loading ? 'Testing...' : 'Test Health Check'}
              </Button>
              
              {healthStatus && (
                <div className="bg-green-100 p-3 rounded-md">
                  <h4 className="font-semibold text-green-800">✅ Success!</h4>
                  <pre className="text-sm text-green-700 mt-2">
                    {JSON.stringify(healthStatus, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Authentication Test */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Test</CardTitle>
              <CardDescription>Test user registration and login</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  onClick={testRegistration} 
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  {loading ? 'Testing...' : 'Test Registration'}
                </Button>
                
                <Button 
                  onClick={testLogin} 
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  {loading ? 'Testing...' : 'Test Login'}
                </Button>
              </div>
              
              {authResult && (
                <div className="bg-blue-100 p-3 rounded-md mt-4">
                  <h4 className="font-semibold text-blue-800">Auth Result:</h4>
                  <pre className="text-sm text-blue-700 mt-2">
                    {JSON.stringify(authResult, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="max-w-2xl mx-auto mt-6">
            <CardContent className="pt-6">
              <div className="bg-red-100 p-3 rounded-md">
                <h4 className="font-semibold text-red-800">❌ Error:</h4>
                <p className="text-red-700 mt-2">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Connection Info */}
        <Card className="max-w-2xl mx-auto mt-6">
          <CardHeader>
            <CardTitle>Connection Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Frontend URL:</strong> http://localhost:3000</p>
              <p><strong>Backend URL:</strong> http://localhost:3001</p>
              <p><strong>API Base URL:</strong> http://localhost:3001/api</p>
              <p><strong>CORS:</strong> Enabled for all origins (*)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
