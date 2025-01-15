'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const healthRecords = [
  { date: '2023-06-01', type: 'Blood Test', result: 'Normal', doctor: 'Dr. Smith' },
  { date: '2023-05-15', type: 'X-Ray', result: 'No abnormalities', doctor: 'Dr. Johnson' },
  { date: '2023-04-22', type: 'Physical Exam', result: 'Healthy', doctor: 'Dr. Brown' },
  { date: '2023-03-10', type: 'Vaccination', result: 'Completed', doctor: 'Dr. Davis' },
]

export default function HealthRecordsPage() {
  const [hoveredRow, setHoveredRow] = useState(null)

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
        className="flex-grow w-full py-10 px-4 bg-gradient-to-r from-blue-500 to-purple-600"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl font-bold mt-16 mb-8 text-white" variants={itemVariants}>Health Records</motion.h1>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Your Health Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Doctor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthRecords.map((record, index) => (
                    <TableRow 
                      key={index}
                      className="transition-colors duration-200"
                      style={{
                        backgroundColor: hoveredRow === index ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                      }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.result}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}

