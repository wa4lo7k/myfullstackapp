import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const stats = [
  { title: "Total Notifications", value: "1,234" },
  { title: "Critical Alerts", value: "5" },
  { title: "Total Logs", value: "10,234" },
  { title: "User Actions", value: "567" },
]

const notifications = [
  { id: 1, message: 'New user registered', type: 'Info', time: '5 mins ago' },
  { id: 2, message: 'Server CPU usage high', type: 'Warning', time: '10 mins ago' },
  { id: 3, message: 'Payment failed', type: 'Error', time: '1 hour ago' },
]

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Notifications Management</h1>
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
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Button>Mark All as Read</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Message</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell>{notification.message}</TableCell>
              <TableCell>
                <Badge variant={notification.type.toLowerCase() as "default" | "secondary" | "destructive"}>
                  {notification.type}
                </Badge>
              </TableCell>
              <TableCell>{notification.time}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">View</Button>
                <Button variant="destructive" size="sm">Dismiss</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">System Logs</h2>
        <div className="flex justify-between items-center mb-4">
          <Input type="text" placeholder="Search logs..." className="max-w-sm" />
          <Button>Export Logs</Button>
        </div>
        {/* Add system logs table here */}
      </div>
    </div>
  )
}

