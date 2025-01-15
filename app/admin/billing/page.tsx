import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const stats = [
  { title: "Total Claims", value: "1,234" },
  { title: "Pending Claims", value: "56" },
  { title: "Total Billed", value: "$543,210" },
  { title: "Approval Rate", value: "95%" },
]

const recentClaims = [
  { id: 1, patient: 'John Doe', amount: '$250', status: 'Approved' },
  { id: 2, patient: 'Jane Smith', amount: '$500', status: 'Pending' },
  { id: 3, patient: 'Mike Brown', amount: '$150', status: 'Rejected' },
]

export default function BillingPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Billing Management</h1>
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
        <h2 className="text-2xl font-semibold">Recent Claims</h2>
        <Button>Process New Claim</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentClaims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>{claim.patient}</TableCell>
              <TableCell>{claim.amount}</TableCell>
              <TableCell>{claim.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

