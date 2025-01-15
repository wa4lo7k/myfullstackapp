'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

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

export default function Register() {
  const [role, setRole] = useState('patient')

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#373B44] to-[#4286f4]">
      <Header />
      <motion.main 
        className="flex-grow container mx-auto py-10 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl font-bold mb-6 text-center text-white" variants={itemVariants}>Register for HealthSync</motion.h1>
        <motion.form className="max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg" variants={itemVariants}>
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-200">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 bg-gray-700 text-white"
              placeholder="Enter your full name"
              required 
            />
          </motion.div>
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 bg-gray-700 text-white"
              placeholder="Enter your email address"
              required 
            />
          </motion.div>
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">Password</label>
            <input 
              type="password" 
              id="password"
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 bg-gray-700 text-white"
              placeholder="Enter your password"
              required 
            />
          </motion.div>
          <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-200">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 bg-gray-700 text-white"
              placeholder="Confirm your password"
              required 
            />
          </motion.div>
          <motion.div className="mb-6" variants={itemVariants}>
            <label className="block mb-2 text-sm font-medium text-gray-200">Role</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="patient"
                  checked={role === 'patient'}
                  onChange={() => setRole('patient')}
                  className="mr-2 focus:ring-2 focus:ring-indigo-500 text-indigo-600"
                />
                <span className="text-sm text-gray-200">Patient</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="doctor"
                  checked={role === 'doctor'}
                  onChange={() => setRole('doctor')}
                  className="mr-2 focus:ring-2 focus:ring-indigo-500 text-indigo-600"
                />
                <span className="text-sm text-gray-200">Doctor</span>
              </label>
            </div>
          </motion.div>
          <motion.button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </motion.form>
      </motion.main>
      <Footer />
    </div>
  )
}

