"use client";

import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createChart,
  LineSeries,
  AreaSeries,
  Time,
  SingleValueData,
  ColorType,
} from "lightweight-charts";

export function EfficiencyChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const data = [
    { month: "July", efficiency: 72 },
    { month: "August", efficiency: 75 },
    { month: "September", efficiency: 78 },
    { month: "October", efficiency: 82 },
  ];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartContainer = chartContainerRef.current;
    const chart = createChart(chartContainer, {
      layout: {
        textColor: "#64748b",
        background: { type: ColorType.Solid, color: "transparent" },
      },
      grid: {
        vertLines: { color: "#e2e8f0" },
        horzLines: { color: "#e2e8f0" },
      },
      width: chartContainer.clientWidth,
      height: 300,
    });

    const handleResize = () => {
      chart.applyOptions({ width: chartContainer.clientWidth });
    };

    const formattedData: SingleValueData<Time>[] = data.map((item, index) => {
      return {
        time: { day: index + 1, month: 1, year: 2023 } as Time,
        value: item.efficiency,
      };
    });

    // Add area series
    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "#22c55e",
      topColor: "rgba(34, 197, 94, 0.4)",
      bottomColor: "rgba(34, 197, 94, 0.1)",
    });
    areaSeries.setData(formattedData);

    // Add line series
    const lineSeries = chart.addSeries(LineSeries, {
      color: "#22c55e",
      lineWidth: 2,
    });
    lineSeries.setData(formattedData);

    // Configure Y axis
    chart.applyOptions({
      rightPriceScale: {
        visible: true,
        borderColor: "transparent",
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
    });

    // Configure X axis (time scale)
    chart.timeScale().applyOptions({
      borderColor: "transparent",
    });

    chart.timeScale().fitContent();

    // Custom x-axis labels
    const labelsContainer = document.createElement("div");
    labelsContainer.className = "flex justify-between px-1 w-full mt-2";
    labelsContainer.setAttribute("data-testid", "chart-labels");

    data.forEach((item) => {
      const label = document.createElement("div");
      label.textContent = item.month;
      label.className = "text-sm text-slate-500";
      labelsContainer.appendChild(label);
    });

    chartContainer.appendChild(labelsContainer);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      if (chartContainer.contains(labelsContainer)) {
        chartContainer.removeChild(labelsContainer);
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Efficiency</CardTitle>
        <CardDescription>Efficiency score trend (0-100)</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} className="h-[300px]" />
        <div className="mt-10 flex justify-between text-sm text-muted-foreground">
          <div>Poor: &lt;70</div>
          <div>Average: 70-80</div>
          <div>Good: &gt;80</div>
        </div>
      </CardContent>
    </Card>
  );
}
