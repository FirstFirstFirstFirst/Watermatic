"use client";

import { useEffect, useRef } from "react";
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
  LineStyle,
  Time,
  MouseEventParams,
  ISeriesApi,
} from "lightweight-charts";

interface UsageData {
  week: string;
  actual: number;
  target: number;
}

export function UsageTrends() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const data: UsageData[] = [
    { week: "Week 1", actual: 780, target: 800 },
    { week: "Week 2", actual: 820, target: 800 },
    { week: "Week 3", actual: 750, target: 780 },
    { week: "Week 4", actual: 770, target: 760 },
    { week: "Week 5", actual: 720, target: 740 },
  ];

  // Convert data for Lightweight Charts format
  const actualData = data.map((item, index) => ({
    time: index as Time, // Using index as time for categorical data
    value: item.actual,
  }));

  const targetData = data.map((item, index) => ({
    time: index as Time,
    value: item.target,
  }));

  useEffect(() => {
    if (chartContainerRef.current) {
      // Clear any existing chart
      const element = chartContainerRef.current;
      element.innerHTML = "";

      // Create chart with styling options
      const chart = createChart(element, {
        layout: {
          textColor: "hsl(var(--foreground))",
          background: { color: "transparent" },
        },
        grid: {
          vertLines: {
            color: "rgba(200, 200, 200, 0.2)",
          },
          horzLines: {
            color: "rgba(200, 200, 200, 0.2)",
          },
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
          tickMarkFormatter: (time: number) => {
            // Map the index back to week name
            return data[time]?.week || "";
          },
        },
        handleScroll: false,
        handleScale: false,
        crosshair: {
          vertLine: {
            labelVisible: false,
          },
        },
      });

      // Make chart responsive
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length === 0 || !element) return;
        const { width, height } = entries[0].contentRect;
        chart.applyOptions({ width, height });
      });

      resizeObserver.observe(element);

      // Add actual usage line series
      const actualSeries = chart.addSeries(LineSeries, {
        color: "#3b82f6", // blue-500
        lineWidth: 3,
        lastValueVisible: false,
        priceLineVisible: false,
        crosshairMarkerVisible: true,
        lineType: 0,
      });

      actualSeries.setData(actualData);

      // Add target line series
      const targetSeries = chart.addSeries(LineSeries, {
        color: "#fb923c", // orange-400
        lineWidth: 2,
        lastValueVisible: false,
        priceLineVisible: false,
        lineStyle: LineStyle.Dashed,
        lineType: 0,
      });

      targetSeries.setData(targetData);

      // Fit all data to view
      chart.timeScale().fitContent();

      // Create custom tooltip
      const toolTip = document.createElement("div");
      toolTip.className = "chart-tooltip";
      toolTip.style.position = "absolute";
      toolTip.style.display = "none";
      toolTip.style.padding = "8px";
      toolTip.style.boxSizing = "border-box";
      toolTip.style.fontSize = "12px";
      toolTip.style.color = "hsl(var(--foreground))";
      toolTip.style.background = "hsl(var(--card))";
      toolTip.style.borderRadius = "4px";
      toolTip.style.boxShadow = "0 2px 5px 0 rgba(0, 0, 0, 0.1)";
      toolTip.style.pointerEvents = "none";
      toolTip.style.zIndex = "1000";
      element.appendChild(toolTip);

      // Add tooltip functionality
      chart.subscribeCrosshairMove((param: MouseEventParams) => {
        if (!param.point || param.point.x < 0 || param.point.y < 0) {
          toolTip.style.display = "none";
          return;
        }

        // Get time (index)
        const timeIndex = param.time as unknown as number;
        if (
          timeIndex === undefined ||
          timeIndex < 0 ||
          timeIndex >= data.length
        ) {
          toolTip.style.display = "none";
          return;
        }

        // Get values at the time point
        const weekData = data[timeIndex];

        // Fixed handling of series values
        let actualValue = null;
        let targetValue = null;

        if (param.seriesData) {
          const actualPoint = param.seriesData.get(
            actualSeries as ISeriesApi<"Line">
          );
          const targetPoint = param.seriesData.get(
            targetSeries as ISeriesApi<"Line">
          );

          // For line series, we need to check if the point exists and then access its properties
          if (actualPoint && "value" in actualPoint) {
            actualValue = actualPoint.value;
          }

          if (targetPoint && "value" in targetPoint) {
            targetValue = targetPoint.value;
          }
        }

        // Update tooltip content
        toolTip.innerHTML = `
          <div class="text-sm font-medium">${weekData.week}</div>
          <div class="flex items-center gap-2 text-sm mt-1">
            <div class="h-2 w-2 rounded-full" style="background-color: #3b82f6"></div>
            <span>Actual: ${actualValue} m³</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <div class="h-2 w-2 rounded-full" style="background-color: #fb923c"></div>
            <span>Target: ${targetValue} m³</span>
          </div>
        `;

        // Position tooltip
        const toolTipWidth = 160;
        const toolTipMargin = 15;

        let shiftedCoordinate = param.point.x - 50;
        shiftedCoordinate = Math.max(
          0,
          Math.min(element.clientWidth - toolTipWidth, shiftedCoordinate)
        );

        toolTip.style.left = `${shiftedCoordinate}px`;
        toolTip.style.top = `${toolTipMargin}px`;
        toolTip.style.display = "block";
      });

      // Hide tooltip when mouse leaves chart
      element.addEventListener("mouseleave", () => {
        toolTip.style.display = "none";
      });

      // Clean up on unmount
      return () => {
        chart.remove();
        resizeObserver.disconnect();
        if (toolTip && toolTip.parentNode) {
          toolTip.parentNode.removeChild(toolTip);
        }
      };
    }
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage vs Target</CardTitle>
        <CardDescription>
          Weekly comparison with conservation targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <div ref={chartContainerRef} className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
