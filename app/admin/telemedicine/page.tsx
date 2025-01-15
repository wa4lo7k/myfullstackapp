import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const stats = [
  { title: "Active Sessions", value: "5" },
  { title: "Total Sessions Today", value: "23" },
  { title: "Avg. Duration", value: "32 mins" },
  { title: "Success Rate", value: "98%" },
]

const activeSessions = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', duration: '15:23' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', duration: '08:45' },
]

export default function TelemedicinePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Telemedicine Management</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Active Sessions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.patient}</TableCell>
              <TableCell>{session.doctor}</TableCell>
              <TableCell>{session.duration}</TableCell>
              <TableCell>
                <Button variant="destructive" size="sm">Terminate</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

