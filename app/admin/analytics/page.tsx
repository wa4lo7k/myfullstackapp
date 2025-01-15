import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const stats = [
  { title: "Total AI Models", value: "15" },
  { title: "Reports Generated", value: "1,234" },
  { title: "Accuracy Rate", value: "97.5%" },
  { title: "High Risk Alerts", value: "23" },
]

const recentReports = [
  { id: 1, model: 'Heart Disease Predictor', accuracy: '98%', date: '2023-06-15' },
  { id: 2, model: 'Diabetes Risk Assessment', accuracy: '96%', date: '2023-06-14' },
  { id: 3, model: 'Cancer Detection', accuracy: '99%', date: '2023-06-13' },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
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
        <h2 className="text-2xl font-semibold">Recent Predictive Reports</h2>
        <Button>Upload New AI Model</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.model}</TableCell>
              <TableCell>{report.accuracy}</TableCell>
              <TableCell>{report.date}</TableCell>
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

