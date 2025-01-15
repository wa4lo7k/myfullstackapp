import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const stats = [
  { title: "Total Devices", value: "1,234" },
  { title: "Active Devices", value: "987" },
  { title: "Data Points", value: "1,234,567" },
  { title: "Alerts", value: "23" },
]

const connectedDevices = [
  { id: 1, name: 'Heart Rate Monitor', status: 'Active', lastPing: '2 mins ago' },
  { id: 2, name: 'Blood Pressure Sensor', status: 'Inactive', lastPing: '1 hour ago' },
  { id: 3, name: 'Glucose Monitor', status: 'Active', lastPing: '5 mins ago' },
]

export default function IoTPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">IoT Devices Management</h1>
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Connected Devices</h2>
        <Button>Add New Device</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Ping</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {connectedDevices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.status}</TableCell>
              <TableCell>{device.lastPing}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">View Data</Button>
                <Button variant="destructive" size="sm">Disconnect</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

