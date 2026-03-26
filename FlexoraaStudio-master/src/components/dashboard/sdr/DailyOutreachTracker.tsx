
'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const dailyOutreachData: any[] = [];

export function DailyOutreachTracker() {
    return (
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Daily Outreach Tracker</CardTitle>
                <CardDescription>Your call and message activity vs. target.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={dailyOutreachData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{
                              background: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "var(--radius)"
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        <Bar dataKey="calls" stackId="a" fill="hsl(var(--chart-1))" name="Calls" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="messages" stackId="a" fill="hsl(var(--chart-2))" name="Messages" radius={[4, 4, 0, 0]}/>
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
