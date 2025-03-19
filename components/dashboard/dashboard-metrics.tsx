"use client";
import { Droplet, Gauge, Thermometer, Waves } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type MetricId =
  | "flow-rate"
  | "water-level"
  | "water-pressure"
  | "turbidity"
  | "water-ph";

export interface Metric {
  id: MetricId;
  title: string;
  value: string;
  icon: React.ElementType;
  status: string;
  change: string;
  color: string;
  borderColor: string;
}

interface DashboardMetricsProps {
  onMetricClick: (id: MetricId) => void;
  activeMetric: MetricId;
}

export function DashboardMetrics({
  onMetricClick,
  activeMetric,
}: DashboardMetricsProps) {
  const metrics: Metric[] = [
    {
      id: "flow-rate",
      title: "Water Flow Rate",
      value: "37.6 L/min",
      icon: Waves,
      status: "Normal",
      change: "+2.5%",
      color: "blue",
      borderColor: "",
    },
    {
      id: "water-level",
      title: "Water Level",
      value: "2.5 m",
      icon: Droplet,
      status: "Normal",
      change: "-0.3%",
      color: "blue",
      borderColor: "",
    },
    {
      id: "water-pressure",
      title: "Water Pressure",
      value: "2.8 bar",
      icon: Gauge,
      status: "Normal",
      change: "+0.1%",
      color: "blue",
      borderColor: "",
    },
    {
      id: "turbidity",
      title: "Turbidity",
      value: "1.5 NTU",
      icon: Waves,
      status: "Normal",
      change: "-0.2%",
      color: "blue",
      borderColor: "",
    },
    {
      id: "water-ph",
      title: "Water pH",
      value: "7.1",
      icon: Thermometer,
      status: "Normal",
      change: "+0.1%",
      color: "blue",
      borderColor: "",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          className={`${
            metric.id === activeMetric ? "ring-2 ring-blue-500" : ""
          } cursor-pointer transition-all hover:shadow-md`}
          onClick={() => onMetricClick(metric.id)}
        >
          <CardHeader className="pb-2">
            <CardDescription>{metric.title}</CardDescription>
            <CardTitle className="text-2xl">{metric.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <metric.icon className="mr-1 h-4 w-4 text-blue-500" />
                <span>{metric.status}</span>
              </div>
              <div>{metric.change}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
