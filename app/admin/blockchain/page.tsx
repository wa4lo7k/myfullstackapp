import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const stats = [
  { title: "Total Transactions", value: "10,234" },
  { title: "Block Height", value: "1,234,567" },
  { title: "Network Status", value: "Healthy" },
  { title: "Smart Contracts", value: "45" },
]

const recentTransactions = [
  { id: 1, hash: '0x1234...5678', from: '0xabcd...efgh', to: '0xijkl...mnop', value: '0.5 ETH' },
  { id: 2, hash: '0x5678...9abc', from: '0xqrst...uvwx', to: '0xyzab...cdef', value: '1.2 ETH' },
  { id: 3, hash: '0x9abc...def0', from: '0xghij...klmn', to: '0xopqr...stuv', value: '0.8 ETH' },
]

export default function BlockchainPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blockchain Management</h1>
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
        <h2 className="text-2xl font-semibold">Recent Transactions</h2>
        <Button>View All Transactions</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction Hash</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.hash}</TableCell>
              <TableCell>{transaction.from}</TableCell>
              <TableCell>{transaction.to}</TableCell>
              <TableCell>{transaction.value}</TableCell>
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

