"use client";

import { useState } from "react";
import {
  Battery,
  BatteryCharging,
  BatteryWarning,
  Signal,
  SignalLow,
  SignalMedium,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sensors } from "@/mockData/sensors";
export function SensorTable() {
  const [view, setView] = useState<"all" | "alerts">("all");

  const filteredSensors =
    view === "all"
      ? sensors
      : sensors.filter((sensor) => sensor.status !== "Normal");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Sensor Status</CardTitle>
          <CardDescription>
            Real-time status of all water sensors
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("all")}
          >
            All
          </Button>
          <Button
            variant={view === "alerts" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("alerts")}
          >
            Alerts
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Battery</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Reading</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSensors.map((sensor) => (
              <TableRow key={sensor.id}>
                <TableCell className="font-medium">{sensor.id}</TableCell>
                <TableCell>{sensor.location}</TableCell>
                <TableCell>{sensor.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {sensor.battery > 80 ? (
                      <Battery className="h-4 w-4 text-green-500" />
                    ) : sensor.battery > 30 ? (
                      <BatteryCharging className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <BatteryWarning className="h-4 w-4 text-red-500" />
                    )}
                    {sensor.battery}%
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {sensor.signal === "Strong" ? (
                      <Signal className="h-4 w-4 text-green-500" />
                    ) : sensor.signal === "Medium" ? (
                      <SignalMedium className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <SignalLow className="h-4 w-4 text-red-500" />
                    )}
                    {sensor.signal}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      sensor.status === "Normal"
                        ? "bg-green-100 text-green-800"
                        : sensor.status === "Warning"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {sensor.status}
                  </div>
                </TableCell>
                <TableCell>{sensor.lastReading}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
