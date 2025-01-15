'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, PlusCircle, MapPin, Pill } from 'lucide-react'

const medicines = [
  { name: "Aspirin", price: "$5.99" },
  { name: "Ibuprofen", price: "$7.49" },
  { name: "Acetaminophen", price: "$6.99" },
  { name: "Amoxicillin", price: "$12.99" },
  { name: "Lisinopril", price: "$8.99" },
]

export default function PharmacySection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')

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

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.section 
      className="py-16 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Pill className="w-12 h-12 text-blue-500 mr-4" />
          <motion.h2 
            className="text-3xl font-bold text-center text-blue-600"
            variants={itemVariants}
          >
            Pharmacy
          </motion.h2>
        </div>
        <div className="max-w-md mx-auto mb-8 space-y-4">
          <motion.div className="relative" variants={itemVariants}>
            <input
              type="text"
              placeholder="Search for medicines..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-blue-800 placeholder-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </motion.div>
          <motion.div className="relative" variants={itemVariants}>
            <input
              type="text"
              placeholder="Enter your location..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 text-green-800 placeholder-green-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" />
          </motion.div>
        </div>
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" variants={containerVariants}>
          {filteredMedicines.map((medicine, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <span className="font-medium text-sm mb-2 text-gray-800">{medicine.name}</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-green-600">{medicine.price}</span>
                <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  <PlusCircle size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

