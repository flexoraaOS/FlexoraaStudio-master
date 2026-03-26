
'use client';

import React, { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

ChartJS.register(MatrixController, MatrixElement, CategoryScale, LinearScale, Tooltip, Legend);

const DAYS = ["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"];
const HOURS = Array.from({ length: 24 }, (_, i) => (i).toString().padStart(2, "0") + ":00");

// A more refined, monochromatic color scale based on the primary theme color.
function valueToColor(v: number, max: number, themeColor: { h: number, s: number, l: number }) {
  if (v === 0) return 'hsl(var(--secondary))';
  const t = Math.max(0, Math.min(1, max ? v / max : 0));
  const lightness = themeColor.l + (100 - themeColor.l) * (1 - t * 0.8); // from theme color up to almost white
  const saturation = themeColor.s * (0.5 + t * 0.5); // Increase saturation with value
  const alpha = 0.3 + t * 0.7;
  return `hsla(${themeColor.h}, ${saturation}%, ${lightness}%, ${alpha})`;
}

import { EmptyState } from '@/components/ui/empty-state';

export default function HeatmapMatrix({ externalData }: { externalData?: any[] }) {
  const maxVal = useMemo(() => externalData ? externalData.reduce((m: any, d: any) => Math.max(m, d.v || 0), 0) : 0, [externalData]);

  if (!externalData || externalData.length === 0) {
      return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Engagement Heatmap
                    <Badge variant="outline" className="text-primary border-primary/50">Premium</Badge>
                </CardTitle>
                <CardDescription>Peak activity times by day and hour.</CardDescription>
            </CardHeader>
            <CardContent className="h-[420px]">
                <EmptyState />
            </CardContent>
        </Card>
      );
  }

  const matrixData = externalData;

  // Extract HSL values from CSS variables to use in color logic
  const primaryColorHSL = { h: 0, s: 84, l: 60 }; // Assuming default --primary: 0 84% 60%

  const chartData: any = {
    datasets: [{
      label: "Engagement",
      data: matrixData,
      backgroundColor: (ctx: any) => valueToColor(ctx.raw.v ?? 0, maxVal, primaryColorHSL),
      borderColor: 'hsl(var(--card))',
      borderWidth: 2,
      borderRadius: 4, // Rounded corners for a softer look
      width: ({ chart }: { chart: any }) => (chart.width - 60) / HOURS.length,
      height: ({ chart }: { chart: any }) => (chart.height - 70) / DAYS.length,
      hoverBackgroundColor: (ctx: any) => valueToColor(ctx.raw.v ?? 0, maxVal + 20, primaryColorHSL),
      hoverBorderColor: 'hsl(var(--primary))',
    }]
  };

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "hsl(var(--background) / 0.8)",
        titleColor: "hsl(var(--foreground))",
        bodyColor: "hsl(var(--foreground))",
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (items: any) => {
            const idx = items[0].dataIndex;
            const row = items[0].dataset.data[idx];
            return `${DAYS[row.y]} • ${HOURS[row.x]}`;
          },
          label: (items: any) => {
            const row = items.dataset.data[items.dataIndex];
            return `Engagements: ${row.v}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: "category",
        labels: HOURS,
        offset: true,
        grid: { display: false },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: { size: 10, family: "Inter, system-ui" },
          callback: function (val: any, idx: any) {
              return idx % 6 === 0 ? this.getLabelForValue(val) : '';
          }
        }
      },
      y: {
        type: "category",
        labels: DAYS,
        offset: true,
        grid: { display: false },
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: { size: 12, family: "Inter, system-ui" }
        }
      }
    },
    layout: { padding: { left: 0, right: 10, top: 10, bottom: 0 } }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                Engagement Heatmap
                <Badge variant="outline" className="text-primary border-primary/50">Premium</Badge>
            </CardTitle>
            <CardDescription>Peak activity times by day and hour.</CardDescription>
        </CardHeader>
        <CardContent className="h-[420px]">
            <Chart type="matrix" data={chartData} options={options} />
        </CardContent>
    </Card>
  );
}
