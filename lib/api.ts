// API configuration and helper functions for HealthSync frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888/api'

// API helper function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return { data, error: null }
  } catch (error) {
    console.error('API request failed:', error)
    return { data: null, error: error.message }
  }
}

// Authentication API
export const authAPI = {
  register: async (userData: {
    name: string
    email: string
    password: string
    role: string
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  getProfile: async () => {
    return apiRequest('/auth/profile')
  },
}

// Appointments API
export const appointmentsAPI = {
  getAll: async () => {
    return apiRequest('/appointments')
  },

  create: async (appointmentData: {
    patient_id: number
    doctor_id: number
    date: string
    notes?: string
  }) => {
    return apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    })
  },

  update: async (id: number, updates: any) => {
    return apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  },

  delete: async (id: number) => {
    return apiRequest(`/appointments/${id}`, {
      method: 'DELETE',
    })
  },
}

// Health Records API
export const recordsAPI = {
  getAll: async () => {
    return apiRequest('/records')
  },

  create: async (recordData: {
    user_id: number
    type: string
    data: any
    date?: string
  }) => {
    return apiRequest('/records', {
      method: 'POST',
      body: JSON.stringify(recordData),
    })
  },

  update: async (id: number, updates: any) => {
    return apiRequest(`/records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  },

  delete: async (id: number) => {
    return apiRequest(`/records/${id}`, {
      method: 'DELETE',
    })
  },
}

// Notifications API
export const notificationsAPI = {
  getAll: async () => {
    return apiRequest('/notifications')
  },

  markAsRead: async (id: number) => {
    return apiRequest(`/notifications/${id}/read`, {
      method: 'PUT',
    })
  },
}

// Device Data API
export const devicesAPI = {
  getData: async () => {
    return apiRequest('/devices/data')
  },

  addData: async (deviceData: {
    device_type: string
    data: any
    timestamp?: string
  }) => {
    return apiRequest('/devices/data', {
      method: 'POST',
      body: JSON.stringify(deviceData),
    })
  },
}

// AI Insights API
export const aiAPI = {
  getInsights: async () => {
    return apiRequest('/ai/insights')
  },
}

// Health check
export const healthAPI = {
  check: async () => {
    return apiRequest('/health')
  },
}

// Export API base URL for other uses
export { API_BASE_URL }
