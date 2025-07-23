// Supabase Authentication Replacement for your current auth system
import { auth, db } from './supabase'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

// Replace your current register function
export const useSupabaseAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const register = async (name: string, email: string, password: string, role: string = 'patient') => {
    try {
      // Sign up with Supabase Auth
      const { data, error } = await auth.signUp(email, password, { name, role })
      
      if (error) throw error

      if (data.user) {
        // Create user profile in your users table
        const { error: profileError } = await db.users.create({
          id: data.user.id,
          name,
          email,
          role: role as 'patient' | 'doctor' | 'admin'
        })

        if (profileError) throw profileError
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signIn(email, password)
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const logout = async () => {
    try {
      const { error } = await auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getUserProfile = async () => {
    if (!user) return null
    
    try {
      const { data, error } = await db.users.getById(user.id)
      if (error) throw error
      return data
    } catch (error) {
      console.error('Get profile error:', error)
      return null
    }
  }

  return {
    user,
    loading,
    register,
    login,
    logout,
    getUserProfile
  }
}

// Admin authentication replacement
export const useAdminAuth = () => {
  const { user, loading, login, logout } = useSupabaseAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const profile = await db.users.getById(user.id)
        setIsAdmin(profile.data?.role === 'admin')
      } else {
        setIsAdmin(false)
      }
    }

    checkAdminStatus()
  }, [user])

  const adminLogin = async (email: string, password: string) => {
    const result = await login(email, password)
    
    if (result.data?.user) {
      const profile = await db.users.getById(result.data.user.id)
      if (profile.data?.role !== 'admin') {
        await logout()
        return { data: null, error: { message: 'Access denied. Admin privileges required.' } }
      }
    }

    return result
  }

  return {
    user,
    loading,
    isAdmin,
    adminLogin,
    logout
  }
}

// Real-time notifications hook
export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    if (!userId) return

    // Load initial notifications
    const loadNotifications = async () => {
      const { data } = await db.notifications.getByUser(userId)
      if (data) setNotifications(data)
    }

    loadNotifications()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('user-notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  const markAsRead = async (notificationId: number) => {
    await db.notifications.markAsRead(notificationId)
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  return {
    notifications,
    markAsRead
  }
}

// Appointments hook with real-time updates
export const useAppointments = (userId: string, userRole: 'patient' | 'doctor') => {
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    if (!userId) return

    // Load initial appointments
    const loadAppointments = async () => {
      const { data } = userRole === 'patient' 
        ? await db.appointments.getByPatient(userId)
        : await db.appointments.getByDoctor(userId)
      
      if (data) setAppointments(data)
    }

    loadAppointments()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('user-appointments')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments',
          filter: userRole === 'patient' 
            ? `patient_id=eq.${userId}`
            : `doctor_id=eq.${userId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAppointments(prev => [payload.new, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setAppointments(prev => 
              prev.map(a => a.id === payload.new.id ? payload.new : a)
            )
          } else if (payload.eventType === 'DELETE') {
            setAppointments(prev => 
              prev.filter(a => a.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId, userRole])

  const createAppointment = async (appointmentData: any) => {
    const { data, error } = await db.appointments.create(appointmentData)
    return { data, error }
  }

  const updateAppointment = async (id: number, updates: any) => {
    const { data, error } = await db.appointments.update(id, updates)
    return { data, error }
  }

  const deleteAppointment = async (id: number) => {
    const { error } = await db.appointments.delete(id)
    return { error }
  }

  return {
    appointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
  }
}
