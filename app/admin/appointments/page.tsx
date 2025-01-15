import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const appointments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2023-06-15', time: '10:00 AM' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', date: '2023-06-16', time: '2:00 PM' },
  { id: 3, patient: 'Mike Brown', doctor: 'Dr. Lee', date: '2023-06-17', time: '11:30 AM' },
]

export default function AppointmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Appointments Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input type="text" placeholder="Search appointments..." className="max-w-sm" />
        <Button>Add Appointment</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patient}</TableCell>
              <TableCell>{appointment.doctor}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

