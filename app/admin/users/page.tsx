import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Patient' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Doctor' },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
]

export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>
      <div className="flex justify-between items-center mb-4">
        <Input type="text" placeholder="Search users..." className="max-w-sm" />
        <Button>Add User</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

