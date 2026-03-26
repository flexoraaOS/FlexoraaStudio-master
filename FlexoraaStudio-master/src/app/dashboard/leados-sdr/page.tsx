'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, CheckCircle, Clock, Flame, Calendar as CalendarIcon, Phone, MessageSquare, Bell, Wallet } from "lucide-react";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, LineChart } from "recharts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DailyOutreachTracker } from '@/components/dashboard/sdr/DailyOutreachTracker';
import { DropOffAnalysis } from '@/components/dashboard/sdr/DropOffAnalysis';
import { AiChatAnalysis } from '@/components/dashboard/AiChatAnalysis';
import { CreditUsageDialog } from '@/components/dashboard/leados/CreditUsageDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

// -- NEW: Architecture Hooks --
import { useDataFetch } from '@/hooks/useDataFetch';
import { sdrService } from '@/services/sdrService';
import { EmptyState, ErrorState } from '@/components/ui/empty-state';
import { ComponentLoader } from '@/components/ui/loading-state';

const ActivityDialog = ({
  title, description, data, icon, children,
}: {
  title: string; description: string; data: any[]; icon: React.ReactNode; children: React.ReactNode;
}) => {
  const [filter, setFilter] = React.useState('Today');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon} {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <div className="flex items-center gap-2 mb-4">
                <Button variant={filter === 'Today' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('Today')}>Today</Button>
                <Button variant={filter === 'This Week' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('This Week')}>This Week</Button>
                <Button variant={filter === 'This Month' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('This Month')}>This Month</Button>
            </div>
            {data && data.length > 0 ? (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Lead Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Outcome</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.leadName}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell><Badge variant="outline">{item.outcome}</Badge></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            ) : (
                <EmptyState description="No activity data found for the selected filter." />
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function LeadOSSdrPage() {
  const { data: kpis, isLoading: isKpiLoading, error: kpiErr } = useDataFetch(sdrService.getLeadOsSdrKpis);
  const { data: performance, isLoading: isPerfLoading, error: perfErr } = useDataFetch(sdrService.getLeadOsSdrPerformance);
  const { data: callsData, isLoading: isCallsLoading, error: callsErr } = useDataFetch(sdrService.getLeadOsSdrCalls);
  const { data: messagesData, isLoading: isMsgLoading, error: msgErr } = useDataFetch(sdrService.getLeadOsSdrMessages);

  // Notifications logic would also hit an endpoint; mimicking empty state here
  const notifications: any[] = [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">LeadOS SDR Dashboard</h1>
            <p className="text-muted-foreground mt-1">Your command center for high-velocity sales.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <CreditUsageDialog>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Wallet className="mr-2 h-4 w-4" />
                    Credits Left: {isKpiLoading ? '...' : (kpis?.credits || 0).toLocaleString()}
                </Button>
            </CreditUsageDialog>
            <Popover>
                <PopoverTrigger asChild>
                     <Button variant="outline" size="icon" className="relative h-9 w-9">
                        <Bell className="h-4 w-4" />
                     </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                   <div className="space-y-4">
                        <div className="font-semibold text-lg">Notifications</div>
                         <Separator />
                        <ul className="space-y-3">
                            {notifications.length > 0 ? notifications.map((n, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1">{n.icon}</div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{n.title}</p>
                                        <p className="text-xs text-muted-foreground">{n.description}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{n.time}</p>
                                </li>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No new notifications.</p>
                            )}
                        </ul>
                   </div>
                </PopoverContent>
            </Popover>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/sdr-leads">
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">New Leads Today</CardTitle>
                    <Users className="h-4 w-4 text-primary"/>
                </CardHeader>
                <CardContent>
                    {isKpiLoading ? <ComponentLoader lines={1} height="h-10"/> : (
                        <>
                            <div className="text-2xl font-bold">{kpis?.newLeads || 0}</div>
                            {kpis?.newLeadsChange && <p className="text-xs text-muted-foreground"><span className="text-muted-foreground">0</span> from yesterday</p>}
                        </>
                    )}
                </CardContent>
            </Card>
        </Link>
        <ActivityDialog
            title="Recent Calls"
            description="A log of your recent call activities."
            data={callsData || []}
            icon={<Phone className="h-5 w-5" />}
        >
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Calls Made</CardTitle>
                    <Phone className="h-4 w-4 text-primary"/>
                </CardHeader>
                <CardContent>
                    {isKpiLoading ? <ComponentLoader lines={1} height="h-10"/> : (
                        <>
                            <div className="text-2xl font-bold">{kpis?.callsMade || 0}</div>
                            <p className="text-xs text-muted-foreground">Target: 0</p>
                        </>
                    )}
                </CardContent>
            </Card>
        </ActivityDialog>
        <ActivityDialog
            title="Recent Messages"
            description="A log of your recent messaging activities."
            data={messagesData || []}
            icon={<MessageSquare className="h-5 w-5" />}
        >
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                    <MessageSquare className="h-4 w-4 text-primary"/>
                </CardHeader>
                <CardContent>
                    {isKpiLoading ? <ComponentLoader lines={1} height="h-10"/> : (
                        <>
                            <div className="text-2xl font-bold">{kpis?.messagesSent || 0}</div>
                            <p className="text-xs text-muted-foreground">Target: 0</p>
                        </>
                    )}
                </CardContent>
            </Card>
        </ActivityDialog>
        <Link href="/dashboard/appointments">
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
              <CalendarIcon className="h-4 w-4 text-primary"/>
            </CardHeader>
            <CardContent>
              {isKpiLoading ? <ComponentLoader lines={1} height="h-10"/> : (
                  <>
                      <div className="text-2xl font-bold">{kpis?.meetingsBooked || 0}</div>
                      <p className="text-xs text-muted-foreground">Target: 0</p>
                  </>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
           <DropOffAnalysis />
        </div>
        <div className="lg:col-span-1 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>Today's Task List</CardTitle>
                    <CardDescription>Your upcoming tasks and follow-ups.</CardDescription>
                </CardHeader>
                <CardContent>
                    <EmptyState description="All caught up for today!" />
                </CardContent>
             </Card>
            <AiChatAnalysis />
        </div>
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <DailyOutreachTracker />
            <Card>
                <CardHeader>
                    <CardTitle>Performance Score</CardTitle>
                    <CardDescription>Your weekly performance trend.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    {perfErr ? <ErrorState /> : 
                     isPerfLoading ? <ComponentLoader height="100%" /> :
                     (!performance || performance.length === 0) ? <EmptyState /> : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis domain={[0, 100]} fontSize={12}/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                <Legend wrapperStyle={{fontSize: '12px'}}/>
                                <Line type="monotone" dataKey="value" name="Performance Score" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                     )}
                </CardContent>
            </Card>
       </div>
    </div>
  );
}