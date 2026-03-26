
'use client';

import React, { useMemo, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, BarElement } from "chart.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Instagram, Facebook, MessageSquare, Mail, Calendar as CalendarIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';


ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement);

const PLATFORMS = ["WhatsApp", "Instagram", "Facebook", "Gmail"];
const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));

const platformColors = {
  WhatsApp: 'hsl(var(--chart-1))',
  Instagram: 'hsl(var(--chart-2))',
  Facebook: 'hsl(var(--chart-3))',
  Gmail: 'hsl(var(--chart-4))',
};

import { EmptyState } from '@/components/ui/empty-state';

const PlatformActivityHeatmap = ({ externalData }: { externalData?: any[] }) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  if (!externalData || externalData.length === 0) {
      return (
          <Card>
              <CardHeader>
                   <CardTitle className="flex items-center gap-2">Platform Activity by Hour</CardTitle>
                   <CardDescription>Comparing normalized user activity scores (0-100) across channels.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                  <EmptyState />
              </CardContent>
          </Card>
      );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
                 <CardTitle className="flex items-center gap-2">Platform Activity by Hour</CardTitle>
                <CardDescription>Comparing normalized user activity scores (0-100) across channels.</CardDescription>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-full sm:w-[260px] justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                        dateRange.to ? (
                        <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                        </>
                        ) : (
                        format(dateRange.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={externalData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="hour" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value, index) => index % 4 === 0 ? value : ''}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip 
              cursor={{ fill: 'hsl(var(--secondary))' }}
              contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)' }}
            />
            <RechartsLegend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="WhatsApp" fill={platformColors.WhatsApp} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Instagram" fill={platformColors.Instagram} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Facebook" fill={platformColors.Facebook} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Gmail" fill={platformColors.Gmail} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export { PlatformActivityHeatmap };
