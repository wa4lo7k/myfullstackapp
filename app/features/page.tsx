'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Heart, Brain, Shield, Calendar, Video, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const features = [
  { name: 'Health Monitoring', icon: Heart, description: 'Track vital signs and health metrics in real-time.', color: 'text-green-500' },
  { name: 'AI-Powered Insights', icon: Brain, description: 'Receive personalized health recommendations powered by AI.', color: 'text-purple-500' },
  { name: 'Secure Data Storage', icon: Shield, description: 'Your health data is protected with state-of-the-art encryption.', color: 'text-gray-700' },
  { name: 'Appointment Scheduling', icon: Calendar, description: 'Book and manage your healthcare appointments with ease.', color: 'text-orange-500' },
  { name: 'Telemedicine', icon: Video, description: 'Connect with healthcare providers through secure video calls.', color: 'text-teal-500' },
  { name: 'Digital Health Records', icon: FileText, description: 'Access and update your health records anytime, anywhere.', color: 'text-blue-400' },
]

const data = [
  { name: 'Health Monitoring', value: 95, color: '#4CAF50' },
  { name: 'AI Insights', value: 88, color: '#9C27B0' },
  { name: 'Data Security', value: 99, color: '#2196F3' },
  { name: 'Appointment Booking', value: 92, color: '#FF9800' },
  { name: 'Telemedicine', value: 85, color: '#00BCD4' },
  { name: 'Digital Records', value: 90, color: '#3F51B5' },
]

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded shadow-md border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-gray-600">Effectiveness: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#2980B9] via-[#6DD5FA] to-[#FFFFFF]">
      <Header />
      <motion.main 
        className="flex-grow container mx-auto py-10 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          variants={itemVariants}
        >
          HealthSync Features
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{feature.name}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feature Effectiveness</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#2D3748', fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: '#2D3748', fontSize: 12 }}
                label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft', fill: '#2D3748' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="value" name="Effectiveness">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}

