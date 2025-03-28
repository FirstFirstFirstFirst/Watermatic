"use client";

import { Droplet, Activity, Gauge } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { sensors, type Sensor, type BuildingName } from "@/mockData/sensors";

export function SensorMap() {
  // Get the right icon component based on the iconType
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "Droplet":
        return <Droplet className="h-4 w-4 text-white" />;
      case "Activity":
        return <Activity className="h-4 w-4 text-white" />;
      case "Gauge":
      default:
        return <Gauge className="h-4 w-4 text-white" />;
    }
  };

  // Function to get sensors by building
  const getSensorsByBuilding = (building: BuildingName): Sensor[] => {
    return sensors.filter((sensor) => sensor.building === building);
  };

  // Function to get sensor status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Normal":
        return "bg-green-500";
      case "Warning":
        return "bg-yellow-500";
      case "Alert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Function to get proper sensor label
  const getSensorLabel = (sensor: Sensor) => {
    switch (sensor.type) {
      case "Flow Meter":
        return "L/min";
      case "Leak Detector":
        return "";
      case "pH Sensor":
        return "pH";
      case "Pressure Sensor":
        return "kPa";
      default:
        return "";
    }
  };

  // Function to render a sensor with its tooltip
  const renderSensor = (sensor: Sensor) => (
    <Tooltip key={sensor.id}>
      <TooltipTrigger asChild>
        <div
          className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full ${getStatusColor(
            sensor.status
          )} shadow-md transition-all hover:scale-110`}
        >
          {getIconComponent(sensor.iconType)}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="font-bold">
          {sensor.type}{" "}
          {getSensorLabel(sensor) ? `(${getSensorLabel(sensor)})` : ""}
        </div>
        <div className="text-xs">
          {sensor.status} ({sensor.battery}%)
        </div>
      </TooltipContent>
    </Tooltip>
  );

  // Function to render a row of sensors with proper spacing
  const renderSensorRow = (sensors: Sensor[], maxPerRow: number = 5) => {
    const rows = [];
    for (let i = 0; i < sensors.length; i += maxPerRow) {
      const rowSensors = sensors.slice(i, i + maxPerRow);
      rows.push(
        <div key={i} className="mt-1 flex justify-center gap-2">
          {rowSensors.map(renderSensor)}
        </div>
      );
    }
    return rows;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Overview</CardTitle>
        <CardDescription>Sensor locations and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[350px] w-full rounded-md border bg-muted/20 p-4">
          <TooltipProvider delayDuration={100}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="flex flex-col items-center gap-4">
                {/* Building A - Top */}
                <div className="h-auto w-64 rounded-md bg-yellow-200 p-2 text-center font-medium">
                  Building A
                  {renderSensorRow(getSensorsByBuilding("Building A"), 5)}
                </div>

                <div className="flex gap-4">
                  {/* Building B - Left */}
                  <div className="h-auto w-32 rounded-md bg-pink-200 p-2 text-center font-medium">
                    Building B
                    {renderSensorRow(getSensorsByBuilding("Building B"), 3)}
                  </div>

                  {/* Swimming Pool - Center */}
                  <div className="h-auto w-32 rounded-md bg-blue-200 p-2 text-center font-medium">
                    Swimming Pool
                    {renderSensorRow(getSensorsByBuilding("Swimming Pool"), 3)}
                  </div>

                  {/* Building C - Right */}
                  <div className="h-auto w-32 rounded-md bg-green-200 p-2 text-center font-medium">
                    Building C
                    {renderSensorRow(getSensorsByBuilding("Building C"), 3)}
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>

          <div className="absolute bottom-4 right-4 flex flex-wrap items-center gap-4 rounded-md bg-white/80 p-2 text-xs shadow-md">
            <div className="flex items-center gap-1">
              <Badge
                variant="custom"
                className="h-5 w-5 rounded-full bg-green-500 p-0 flex items-center justify-center"
              >
                <Gauge className="h-3 w-3 text-white" />
              </Badge>
              <span className="font-medium">Normal</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                variant="custom"
                className="h-5 w-5 rounded-full bg-yellow-500 p-0 flex items-center justify-center"
              >
                <Activity className="h-3 w-3 text-white" />
              </Badge>
              <span className="font-medium">Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                variant="custom"
                className="h-5 w-5 rounded-full bg-red-500 p-0 flex items-center justify-center"
              >
                <Droplet className="h-3 w-3 text-white" />
              </Badge>
              <span className="font-medium">Alert</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
