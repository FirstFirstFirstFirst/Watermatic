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
  ColorType,
  HistogramSeries,
  Time,
  HistogramData,
} from "lightweight-charts";

interface ComparisonItem {
  month: string;
  usage: number;
}

export function ComparisonChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);

  const data: ComparisonItem[] = [
    { month: "September", usage: 3540 },
    { month: "October", usage: 3120 },
  ];

  const savingsAmount = 420;
  const savingsPercentage = 11.9;

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartContainer = chartContainerRef.current;

    // Clear any existing labels before creating new chart
    if (labelsRef.current && chartContainer.contains(labelsRef.current)) {
      chartContainer.removeChild(labelsRef.current);
    }

    const chart = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#e2e8f0" },
      },
      width: chartContainer.clientWidth,
      height: 300,
      rightPriceScale: {
        borderColor: "transparent",
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: "transparent",
        tickMarkFormatter: () => "",
      },
      localization: {
        priceFormatter: (price: number) => `${price} m³`,
      },
    });

    // Format data correctly for HistogramSeries
    const formattedData: HistogramData<Time>[] = data.map((item, index) => ({
      time: { day: index + 1, month: 1, year: 2023 } as Time,
      value: item.usage,
    }));

    const histogramSeries = chart.addSeries(HistogramSeries, {
      color: "#3b82f6",
      base: 0,
    });

    histogramSeries.setData(formattedData);
    chart.timeScale().fitContent();

    // Create custom labels in a more React-friendly way
    const labelsContainer = document.createElement("div");
    labelsContainer.className = "flex justify-around w-full mt-2";
    labelsRef.current = labelsContainer;

    data.forEach((item) => {
      const label = document.createElement("div");
      label.textContent = item.month;
      label.className = "text-sm text-slate-500";
      labelsContainer.appendChild(label);
    });

    chartContainer.appendChild(labelsContainer);

    // Handle resize
    const handleResize = () => {
      chart.applyOptions({ width: chartContainer.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();

      // Clean up labels
      if (labelsRef.current && chartContainer.contains(labelsRef.current)) {
        chartContainer.removeChild(labelsRef.current);
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Saving</CardTitle>
        <CardDescription>Monthly comparison (m³)</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} className="h-[300px]" />
        <div className="mt-10 flex justify-center">
          <div className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-800">
            {savingsAmount} m³ saved ({savingsPercentage}% reduction)
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
