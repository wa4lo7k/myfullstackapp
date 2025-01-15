'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { name: 'Active Patients', value: 100000 },
  { name: 'Healthcare Providers', value: 5000 },
  { name: 'Telemedicine Calls', value: 25000 },
  { name: 'AI Diagnoses', value: 75000 },
  { name: 'Prescriptions Filled', value: 150000 },
  { name: 'Health Records Managed', value: 500000 },
];

const cardColors = [
  'bg-blue-500 hover:bg-blue-600',
  'bg-green-500 hover:bg-green-600',
  'bg-purple-500 hover:bg-purple-600',
  'bg-red-500 hover:bg-red-600',
  'bg-yellow-500 hover:bg-yellow-600',
  'bg-indigo-500 hover:bg-indigo-600',
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Trusted by Healthcare Professionals
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className={`${cardColors[index]} p-6 rounded-lg transform transition-all duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-4xl font-bold mb-2">
                {item.value.toLocaleString()}
              </p>
              <p className="text-xl">{item.name}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="w-full h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fill: '#fff', fontWeight: 'bold' }} />
              <YAxis tick={{ fill: '#fff', fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: 'none', borderRadius: '0.375rem' }} 
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="value" fill="#60a5fa" className="hover:opacity-80 transition-opacity duration-300">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  )
}

