'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

const appointments = [
  { id: 1, patient: 'John Doe', date: '2023-06-15', time: '10:00 AM', type: 'Check-up', status: 'Scheduled' },
  { id: 2, patient: 'Jane Smith', date: '2023-06-15', time: '11:30 AM', type: 'Follow-up', status: 'Completed' },
  { id: 3, patient: 'Alice Johnson', date: '2023-06-16', time: '2:00 PM', type: 'Consultation', status: 'Scheduled' },
  { id: 4, patient: 'Bob Brown', date: '2023-06-16', time: '3:30 PM', type: 'Check-up', status: 'Cancelled' },
  { id: 5, patient: 'Charlie Davis', date: '2023-06-17', time: '9:00 AM', type: 'Follow-up', status: 'Scheduled' },
]

export default function AppointmentsManagementPage() {
  const [date, setDate] = useState<Date>()
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
        className="flex-grow w-full py-10 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl font-bold mt-16 mb-8 text-white" variants={itemVariants}>Appointments Management</motion.h1>
        
        <motion.div variants={itemVariants} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <Input placeholder="Patient Name" className="flex-1" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={`w-full md:w-[240px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Input type="time" className="w-full md:w-[150px]" />
                </div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Appointment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkup">Check-up</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="w-full md:w-auto">Schedule Appointment</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden md:table-cell">Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Time</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow 
                      key={appointment.id}
                      className="transition-colors duration-200"
                      style={{
                        backgroundColor: hoveredRow === index ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                      }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell className="font-medium">{appointment.patient}</TableCell>
                      <TableCell>{appointment.date}<br className="md:hidden" /><span className="md:hidden">{appointment.time}</span></TableCell>
                      <TableCell className="hidden md:table-cell">{appointment.time}</TableCell>
                      <TableCell className="hidden md:table-cell">{appointment.type}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                          <Button variant="outline" size="sm" className="w-full md:w-auto">Edit</Button>
                          <Button variant="destructive" size="sm" className="w-full md:w-auto">Cancel</Button>
                        </div>
                      </TableCell>
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

