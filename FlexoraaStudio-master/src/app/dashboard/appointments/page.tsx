
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { format } from "date-fns";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(dayAfter.getDate() + 2);
const dayAfterPlus1 = new Date(today);
dayAfterPlus1.setDate(dayAfterPlus1.getDate() + 3);
const dayAfterPlus2 = new Date(today);
dayAfterPlus2.setDate(dayAfterPlus2.getDate() + 5);


const appointments: { date: Date; time: string; leadId: string; with: string; }[] = [];

export default function AppointmentsPage() {
    const [date, setDate] = React.useState<Date | undefined>();
    
    React.useEffect(() => {
        // We set the date in a useEffect to avoid hydration mismatches
        setDate(new Date());
    }, []);
    
    const bookedDays = appointments.map(a => a.date);

    return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Appointments</h1>
        <p className="text-muted-foreground mt-1">
          A full-page view of your team's booked appointments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments Calendar</CardTitle>
          <CardDescription>
            Select a date to see the appointments scheduled for that day. Dates with appointments are highlighted.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex justify-center">
                     <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border p-3"
                        modifiers={{ booked: bookedDays }}
                        modifiersStyles={{ booked: { border: '1px solid hsl(var(--primary))' } }}
                     />
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">
                        Appointments for {date ? format(date, "PPP") : "..."}
                    </h3>
                    <div className="space-y-4">
                        {appointments.filter(app => date && format(app.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')).length > 0 ? (
                           appointments
                            .filter(app => date && format(app.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                            .map((app, index) => (
                              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-secondary">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{app.time}</span>
                                </div>
                                <div className="flex-1 flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{app.leadId}</span>
                                    <span className="text-muted-foreground">with</span>
                                    <span className="font-medium">{app.with}</span>
                                </div>
                                <Badge className="gradient-background text-primary-foreground">Booked</Badge>
                              </div>
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground py-10">
                                No appointments scheduled for this date.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
    )
}
