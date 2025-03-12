"use client"

import { useState } from "react"
import { CheckCircle, Clock, Filter, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MaintenanceTasks() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  const tasks = [
    {
      id: 1,
      name: "Fix water leak",
      location: "Building A - Room 206A",
      assignee: "Technician",
      dueDate: "22/06",
      status: "pending",
      priority: "high",
      comment: "Urgent repair needed",
    },
    {
      id: 2,
      name: "Pressure regulator check",
      location: "Main Supply Line",
      assignee: "Technician",
      dueDate: "22/06",
      status: "pending",
      priority: "medium",
      comment: "Routine inspection",
    },
    {
      id: 3,
      name: "pH balance adjustment",
      location: "Swimming Pool",
      assignee: "Technician",
      dueDate: "22/06",
      status: "pending",
      priority: "medium",
      comment: "Chemical adjustment required",
    },
    {
      id: 4,
      name: "Flow meter calibration",
      location: "Building C - Floor 3",
      assignee: "Technician",
      dueDate: "23/06",
      status: "pending",
      priority: "low",
      comment: "Annual calibration",
    },
    {
      id: 5,
      name: "Replace sensor battery",
      location: "Building C - Floor 3",
      assignee: "Technician",
      dueDate: "24/06",
      status: "completed",
      priority: "low",
      comment: "Completed ahead of schedule",
    },
  ]

  const filteredTasks = filter === "all" ? tasks : tasks.filter((task) => task.status === filter)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Maintenance Tasks</CardTitle>
          <CardDescription>Assigned maintenance tasks and their status</CardDescription>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>All Tasks</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("pending")}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("completed")}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.priority}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {task.status === "completed" ? (
                      <>
                        <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                        <span>Pending</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{task.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

