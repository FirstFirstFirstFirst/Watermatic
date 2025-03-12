"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function MaintenanceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Example scheduled maintenance dates
  const scheduledDates = [
    new Date(2023, 9, 15), // Oct 15, 2023
    new Date(2023, 9, 22), // Oct 22, 2023
    new Date(2023, 10, 5), // Nov 5, 2023
    new Date(2023, 10, 18), // Nov 18, 2023
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Schedule</CardTitle>
        <CardDescription>Upcoming maintenance activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiers={{
                  scheduled: scheduledDates,
                }}
                modifiersStyles={{
                  scheduled: {
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    fontWeight: "bold",
                  },
                }}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>

          <div className="w-full space-y-2">
            <h3 className="text-sm font-medium">Scheduled for today:</h3>
            <div className="rounded-md border p-3">
              <div className="font-medium">Routine Inspection</div>
              <div className="text-sm text-muted-foreground">Building A - Main Supply</div>
              <div className="mt-2 text-sm">Check for leaks, verify pressure readings, inspect valve operation.</div>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
            <div className="h-3 w-3 rounded-full bg-blue-100"></div>
            <span>Scheduled maintenance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

