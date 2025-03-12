"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function UsageTable() {
  const [sortColumn, setSortColumn] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const usageData = [
    { date: "Oct 2023", total: "3,120 m³", average: "104 m³/day", peak: "156 m³", cost: "$4,680" },
    { date: "Sep 2023", total: "3,400 m³", average: "113 m³/day", peak: "172 m³", cost: "$5,100" },
    { date: "Aug 2023", total: "3,600 m³", average: "120 m³/day", peak: "185 m³", cost: "$5,400" },
    { date: "Jul 2023", total: "3,700 m³", average: "123 m³/day", peak: "190 m³", cost: "$5,550" },
    { date: "Jun 2023", total: "3,500 m³", average: "117 m³/day", peak: "178 m³", cost: "$5,250" },
    { date: "May 2023", total: "3,300 m³", average: "110 m³/day", peak: "168 m³", cost: "$4,950" },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Monthly Usage Details</CardTitle>
          <CardDescription>Historical water usage data by month</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                Month
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("total")}>
                Total Usage
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("average")}>
                Daily Average
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("peak")}>
                Peak Day
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("cost")}>
                Estimated Cost
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usageData.map((item) => (
              <TableRow key={item.date}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{item.average}</TableCell>
                <TableCell>{item.peak}</TableCell>
                <TableCell>{item.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

