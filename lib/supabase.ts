import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (generated from your schema)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'patient' | 'doctor' | 'admin'
          profile?: string
          phone?: string
          address?: string
          date_of_birth?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'patient' | 'doctor' | 'admin'
          profile?: string
          phone?: string
          address?: string
          date_of_birth?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'patient' | 'doctor' | 'admin'
          profile?: string
          phone?: string
          address?: string
          date_of_birth?: string
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: number
          patient_id: string
          doctor_id: string
          date: string
          status: string
          notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          patient_id: string
          doctor_id: string
          date: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          patient_id?: string
          doctor_id?: string
          date?: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      health_records: {
        Row: {
          id: number
          user_id: string
          type: string
          data: any
          date: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          data: any
          date?: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          data?: any
          date?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: number
          user_id: string
          message: string
          type: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          message: string
          type?: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          message?: string
          type?: string
          read?: boolean
          created_at?: string
        }
      }
      device_data: {
        Row: {
          id: number
          user_id: string
          device_type: string
          data: any
          timestamp: string
        }
        Insert: {
          id?: number
          user_id: string
          device_type: string
          data: any
          timestamp?: string
        }
        Update: {
          id?: number
          user_id?: string
          device_type?: string
          data?: any
          timestamp?: string
        }
      }
      ai_insights: {
        Row: {
          id: number
          user_id: string
          insight: string
          confidence: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          insight: string
          confidence?: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          insight?: string
          confidence?: number
          created_at?: string
        }
      }
    }
  }
}

// Typed Supabase client
export const supabaseTyped = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const auth = {
  // Sign up new user
  signUp: async (email: string, password: string, userData: { name: string; role: string }) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },

  // Sign out user
  signOut: async () => {
    return await supabase.auth.signOut()
  },

  // Get current user
  getUser: async () => {
    return await supabase.auth.getUser()
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Users
  users: {
    create: async (userData: Database['public']['Tables']['users']['Insert']) => {
      return await supabaseTyped.from('users').insert(userData).select().single()
    },
    getById: async (id: string) => {
      return await supabaseTyped.from('users').select('*').eq('id', id).single()
    },
    getByEmail: async (email: string) => {
      return await supabaseTyped.from('users').select('*').eq('email', email).single()
    },
    update: async (id: string, updates: Database['public']['Tables']['users']['Update']) => {
      return await supabaseTyped.from('users').update(updates).eq('id', id).select().single()
    }
  },

  // Appointments
  appointments: {
    create: async (appointmentData: Database['public']['Tables']['appointments']['Insert']) => {
      return await supabaseTyped.from('appointments').insert(appointmentData).select().single()
    },
    getByPatient: async (patientId: string) => {
      return await supabaseTyped.from('appointments').select('*').eq('patient_id', patientId)
    },
    getByDoctor: async (doctorId: string) => {
      return await supabaseTyped.from('appointments').select('*').eq('doctor_id', doctorId)
    },
    update: async (id: number, updates: Database['public']['Tables']['appointments']['Update']) => {
      return await supabaseTyped.from('appointments').update(updates).eq('id', id).select().single()
    },
    delete: async (id: number) => {
      return await supabaseTyped.from('appointments').delete().eq('id', id)
    }
  },

  // Health Records
  healthRecords: {
    create: async (recordData: Database['public']['Tables']['health_records']['Insert']) => {
      return await supabaseTyped.from('health_records').insert(recordData).select().single()
    },
    getByUser: async (userId: string) => {
      return await supabaseTyped.from('health_records').select('*').eq('user_id', userId)
    },
    update: async (id: number, updates: Database['public']['Tables']['health_records']['Update']) => {
      return await supabaseTyped.from('health_records').update(updates).eq('id', id).select().single()
    },
    delete: async (id: number) => {
      return await supabaseTyped.from('health_records').delete().eq('id', id)
    }
  },

  // Notifications
  notifications: {
    create: async (notificationData: Database['public']['Tables']['notifications']['Insert']) => {
      return await supabaseTyped.from('notifications').insert(notificationData).select().single()
    },
    getByUser: async (userId: string) => {
      return await supabaseTyped.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    },
    markAsRead: async (id: number) => {
      return await supabaseTyped.from('notifications').update({ read: true }).eq('id', id).select().single()
    },
    delete: async (id: number) => {
      return await supabaseTyped.from('notifications').delete().eq('id', id)
    }
  }
}

// Real-time subscriptions
export const realtime = {
  // Subscribe to appointments changes
  subscribeToAppointments: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('appointments')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'appointments',
          filter: `patient_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to notifications
  subscribeToNotifications: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}
