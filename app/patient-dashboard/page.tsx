'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Activity, Droplet, Calendar, Video, FileText, Bell, Footprints, PieChart, Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const healthData = [
  { name: 'Jan', old: 65, new: 70 },
  { name: 'Feb', old: 59, new: 68 },
  { name: 'Mar', old: 80, new: 79 },
  { name: 'Apr', old: 81, new: 85 },
  { name: 'May', old: 56, new: 65 },
]

const stressData = [
  { name: 'Low', value: 30 },
  { name: 'Medium', value: 45 },
  { name: 'High', value: 25 },
]

const notificationData = [
  { name: 'Mon', urgent: 2, regular: 5, informational: 8 },
  { name: 'Tue', urgent: 1, regular: 3, informational: 6 },
  { name: 'Wed', urgent: 3, regular: 4, informational: 5 },
  { name: 'Thu', urgent: 0, regular: 2, informational: 7 },
  { name: 'Fri', urgent: 2, regular: 6, informational: 4 },
  { name: 'Sat', urgent: 1, regular: 1, informational: 3 },
  { name: 'Sun', urgent: 0, regular: 2, informational: 2 },
]

const STRESS_COLORS = ['#4299E1', '#48BB78', '#F6AD55']

export default function PatientDashboard() {
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
        className="flex-grow w-full py-10 px-4 bg-gradient-to-r from-[#8A2387] via-[#E94057] to-[#F27121]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl font-bold mt-16 mb-8 text-white" variants={itemVariants}>Patient Dashboard</motion.h1>
        
        {/* Health Metrics */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={containerVariants}>
          {[
            { title: "Blood Pressure", value: "120/80 mmHg", icon: Heart, color: "bg-red-100 hover:bg-red-200" },
            { title: "Heart Rate", value: "72 bpm", icon: Activity, color: "bg-blue-100 hover:bg-blue-200" },
            { title: "Blood Sugar", value: "100 mg/dL", icon: Droplet, color: "bg-green-100 hover:bg-green-200" },
            { title: "Daily Steps", value: "8,547 steps", icon: Footprints, color: "bg-yellow-100 hover:bg-yellow-200" },
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
                  <CardTitle className="text-lg font-semibold text-gray-700">{metric.title}</CardTitle>
                  <metric.icon className="h-5 w-5 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Charts */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" variants={containerVariants}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white hover:bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                  <PieChart className="mr-2 h-5 w-5" /> AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#4A5568" />
                    <YAxis stroke="#4A5568" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="old" stroke="#3182CE" name="Previous" strokeWidth={2} />
                    <Line type="monotone" dataKey="new" stroke="#48BB78" name="Current" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white hover:bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                  <Zap className="mr-2 h-5 w-5" /> Stress Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={stressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {stressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STRESS_COLORS[index % STRESS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={containerVariants}>
          {[
            { title: "Schedule Appointment", icon: Calendar, color: "bg-blue-500 hover:bg-blue-600" },
            { title: "Start Consultation", icon: Video, color: "bg-green-500 hover:bg-green-600" },
            { title: "Update Health Records", icon: FileText, color: "bg-purple-500 hover:bg-purple-600" },
          ].map((action, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className={`w-full h-full py-6 ${action.color} text-white transition-all duration-300`}>
                <action.icon className="mr-2 h-5 w-5" /> {action.title}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* AI Health Insights */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" variants={containerVariants}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white hover:bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">AI Health Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#4A5568" />
                    <YAxis stroke="#4A5568" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="old" fill="#FC8181" name="Previous" />
                    <Bar dataKey="new" fill="#68D391" name="Current" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="mt-4 text-gray-600">Based on your recent health data, we recommend increasing your daily water intake and adding 15 minutes of light exercise to your routine.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Notification Graph */}
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white hover:bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">Notification Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={notificationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#4A5568" />
                    <YAxis stroke="#4A5568" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="urgent" stackId="a" fill="#FC8181" name="Urgent" />
                    <Bar dataKey="regular" stackId="a" fill="#4299E1" name="Regular" />
                    <Bar dataKey="informational" stackId="a" fill="#68D391" name="Informational" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Notifications */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card className="transition-all duration-300 hover:border-2 hover:border-gray-300 hover:shadow-lg bg-white hover:bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold text-gray-700">
                <Bell className="mr-2 h-5 w-5" /> Urgent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 bg-white p-3 rounded-lg">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Your appointment with Dr. Smith is tomorrow at 10:00 AM.
                </li>
                <li className="flex items-center text-gray-600 bg-white p-3 rounded-lg">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Your prescription for Lisinopril has been refilled.
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}

