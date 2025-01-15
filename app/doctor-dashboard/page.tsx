'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, Video, Bell, Search, UserPlus, Clock, Activity, FileText, Briefcase } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const patientData = [
  { name: 'Jan', newPatients: 20, totalPatients: 100 },
  { name: 'Feb', newPatients: 25, totalPatients: 125 },
  { name: 'Mar', newPatients: 30, totalPatients: 155 },
  { name: 'Apr', newPatients: 22, totalPatients: 177 },
  { name: 'May', newPatients: 28, totalPatients: 205 },
]

const appointmentData = [
  { name: 'Mon', scheduled: 8, completed: 7 },
  { name: 'Tue', scheduled: 10, completed: 9 },
  { name: 'Wed', scheduled: 12, completed: 11 },
  { name: 'Thu', scheduled: 9, completed: 8 },
  { name: 'Fri', scheduled: 11, completed: 10 },
]

const specialtyData = [
  { name: 'Cardiology', value: 30 },
  { name: 'Neurology', value: 25 },
  { name: 'Orthopedics', value: 20 },
  { name: 'Pediatrics', value: 15 },
  { name: 'Other', value: 10 },
]

const SPECIALTY_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1']

export default function DoctorDashboard() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-grow w-full py-10 px-4 bg-gradient-to-r from-[#1A2980] to-[#26D0CE]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl font-bold mt-16 mb-8 text-white" variants={itemVariants}>Doctor Dashboard</motion.h1>
        
        {/* Key Metrics */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={containerVariants}>
          {[
            { title: "Total Patients", value: "1,234", icon: Users, color: "bg-blue-100 hover:bg-blue-200 text-blue-600" },
            { title: "Appointments Today", value: "8", icon: Calendar, color: "bg-green-100 hover:bg-green-200 text-green-600" },
            { title: "Telemedicine Calls", value: "3", icon: Video, color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-600" },
            { title: "Pending Reports", value: "5", icon: FileText, color: "bg-purple-100 hover:bg-purple-200 text-purple-600" },
          ].map((metric, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className={`transition-all duration-300 ${metric.color} ${hoveredCard === index ? 'border-2 border-gray-300 shadow-lg' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">{metric.title}</CardTitle>
                  <metric.icon className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Charts */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" variants={containerVariants}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                  <Activity className="mr-2 h-5 w-5" /> Patient Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={patientData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#4B5563" />
                    <YAxis stroke="#4B5563" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="newPatients" stroke="#3B82F6" name="New Patients" strokeWidth={2} />
                    <Line type="monotone" dataKey="totalPatients" stroke="#10B981" name="Total Patients" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                  <Briefcase className="mr-2 h-5 w-5" /> Specialty Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={specialtyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {specialtyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SPECIALTY_COLORS[index % SPECIALTY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={containerVariants}>
          {[
            { title: "Patient Search", icon: Search, color: "bg-blue-500 hover:bg-blue-600" },
            { title: "Add New Patient", icon: UserPlus, color: "bg-green-500 hover:bg-green-600" },
            { title: "Manage Schedule", icon: Clock, color: "bg-purple-500 hover:bg-purple-600" },
          ].map((action, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className={`w-full h-full py-6 ${action.color} text-white transition-all duration-300`}>
                <action.icon className="mr-2 h-5 w-5" /> {action.title}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Appointment Analytics */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" variants={containerVariants}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">Appointment Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={appointmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#4B5563" />
                    <YAxis stroke="#4B5563" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="scheduled" fill="#3B82F6" name="Scheduled" />
                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="mt-4 text-gray-600">Your appointment completion rate this week is 90%. Great job maintaining a high standard of patient care!</p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Today's Schedule */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { name: "John Doe", time: "09:00 AM", type: "Check-up" },
                    { name: "Jane Smith", time: "10:30 AM", type: "Follow-up" },
                    { name: "Mike Johnson", time: "02:00 PM", type: "New Patient" },
                    { name: "Emily Brown", time: "03:30 PM", type: "Consultation" },
                  ].map((appointment, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium text-gray-800">{appointment.name}</p>
                          <p className="text-sm text-gray-500">{appointment.time} - {appointment.type}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        View
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Notifications */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                <Bell className="mr-2 h-5 w-5" /> Important Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  { type: "urgent", message: "Emergency consultation requested for Patient #12345.", time: "5 minutes ago" },
                  { type: "warning", message: "New lab results available for Patient #67890.", time: "1 hour ago" },
                  { type: "info", message: "Reminder: Team meeting at 4:00 PM today.", time: "2 hours ago" },
                  { type: "success", message: "Patient #54321 has confirmed their appointment.", time: "3 hours ago" },
                ].map((notification, index) => (
                  <li key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                    notification.type === 'urgent' ? 'bg-red-50' :
                    notification.type === 'warning' ? 'bg-yellow-50' :
                    notification.type === 'info' ? 'bg-blue-50' :
                    'bg-green-50'
                  }`}>
                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      notification.type === 'urgent' ? 'bg-red-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'info' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}

