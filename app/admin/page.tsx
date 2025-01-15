import React from 'react'
import { Overview } from '@/components/admin/overview'

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Overview />
    </div>
  )
}

