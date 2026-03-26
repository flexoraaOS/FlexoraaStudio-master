
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Users, DollarSign, UserPlus, TrendingDown, ArrowUpDown, Search, Activity, Target, Trophy, Bot, BarChart2, Shield, AlertTriangle, TrendingUp, BarChart, FileText, Settings, PowerOff, Power, HardDrive, Cpu, Percent, CheckCircle, XCircle, Calendar as CalendarIcon, Server, Cloud, Signal, AlertCircle, History, Disc, Laptop, Info, Building, UserCheck, Briefcase, FileClock, BarChart3, Receipt, HeartPulse, List, PieChart as PieChartIcon, GitBranch, MessageSquare, Phone, User, Milestone, Wallet, Hand, Eye, Download, PlusCircle, Save, Mic, Square, Sparkles, SlidersHorizontal, Lightbulb, Zap, HelpCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell, Sector, BarChart as RechartsBarChart, Bar, LabelList, Line } from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays } from 'date-fns';
import { AnimatedStat } from '@/components/ui/animated-stat';
import { Label } from '@/components/ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';


const businessKPIs = {
    activeClients: 42,
    newClients: 5,
    churnedClients: 1,
    mrr: 45231,
    arr: 45231 * 12,
    retention: 97.6,
    upcomingRenewals: 4,
};

const leadOsAnalytics = {
    executions: 250000,
    accuracy: 96.5,
    costSaved: 28500,
    processingSpeed: 12, // in seconds
};

const agentOsAnalytics = {
    inboundLeads: 8850,
    persuasionSuccess: 22.3,
    appointmentsBooked: 450,
    responseSpeed: 32, // in seconds
};

const systemHealth = {
    uptime: 99.98,
    errors24h: 2,
    errors7d: 15,
};

const financialData = {
    revenue: { total: 52130, leados: 35000, agentos: 17130, recurring: 40000, topUp: 12130 },
    costs: { total: 18500, api: 12000, infra: 4500, ops: 2000 },
    profit: { gross: 52130 - 12000, net: 52130 - 18500 },
    cashBalance: 125430.50,
    creditsBought: 25000,
    creditsUsed: 18500,
};

const cashFlowData = Array.from({ length: 6 }, (_, i) => {
  const date = subDays(new Date(), (5 - i) * 30);
  const cashIn = Math.floor(Math.random() * 20000) + 40000;
  const cashOut = Math.floor(Math.random() * 10000) + 15000;
  return {
    month: format(date, 'MMM'),
    cashIn,
    cashOut,
    netFlow: cashIn - cashOut,
  }
});


const topClients = [
    { name: "Innovate Inc.", revenue: 15000 },
    { name: "Solutions Corp.", revenue: 12000 },
    { name: "Data Dynamics", revenue: 8000 },
];


const revenueCostData = [
    { name: 'Revenue', value: financialData.revenue.total, fill: 'hsl(var(--chart-2))' },
    { name: 'API Costs', value: financialData.costs.api, fill: 'hsl(var(--chart-1))' },
    { name: 'Infra Costs', value: financialData.costs.infra, fill: 'hsl(var(--chart-4))' },
    { name: 'Ops Costs', value: financialData.costs.ops, fill: 'hsl(var(--chart-5))' },
]

const revenueByProductData = [
    { name: 'LeadOS', value: financialData.revenue.leados, fill: 'hsl(var(--chart-1))' },
    { name: 'AgentOS', value: financialData.revenue.agentos, fill: 'hsl(var(--chart-2))' },
]

type TimelineEvent = {
    type: 'created' | 'stage_change' | 'note' | 'follow_up';
    title: string;
    content: string;
    date: string;
};

const initialClientManagementData = [
    { client: 'Innovate Inc.', industry: 'Tech Startup', contact: 'Alice Johnson', product: 'LeadOS & AgentOS', status: 'Active', contractStart: '2023-01-15', contractEnd: '2025-01-14', plan: 'Pro', accountManager: 'John Doe', leadOsCredits: 45000, leadOsMax: 50000, agentOsCredits: 8000, agentOsMax: 10000, avatarHint: 'abstract logo', timeline: [
      { type: 'created', title: 'Client Onboarded', content: 'Onboarded via Enterprise plan.', date: '2023-01-15' },
      { type: 'note', title: 'Note Added by John Doe', content: 'Client is highly satisfied with initial results.', date: '2023-03-20' },
      { type: 'stage_change', title: 'Renewal Flagged', content: 'Approaching contract end date.', date: '2024-07-01' },
    ] as TimelineEvent[] },
    { client: 'Solutions Corp.', industry: 'Consulting', contact: 'Bob Williams', product: 'LeadOS', status: 'Active', contractStart: '2023-06-01', contractEnd: '2024-05-31', plan: 'Growth', accountManager: 'Jane Smith', leadOsCredits: 18000, leadOsMax: 25000, agentOsCredits: 0, agentOsMax: 0, avatarHint: 'geometric logo', timeline: [
      { type: 'created', title: 'Client Onboarded', content: 'Onboarded via Growth plan.', date: '2023-06-01' },
      { type: 'note', title: 'Note Added by Jane Smith', content: 'Requested a feature for custom reporting.', date: '2024-01-10' },
    ] as TimelineEvent[] },
    { client: 'Data Dynamics', industry: 'Data Analytics', contact: 'Charlie Brown', product: 'AgentOS', status: 'Active', contractStart: '2024-03-20', contractEnd: '2025-03-19', plan: 'Starter', accountManager: 'John Doe', leadOsCredits: 0, leadOsMax: 0, agentOsCredits: 4500, agentOsMax: 5000, avatarHint: 'data logo', timeline: [
        { type: 'created', title: 'Client Onboarded', content: 'Onboarded via Starter plan.', date: '2024-03-20' },
    ] as TimelineEvent[] },
    { client: 'Market Movers', industry: 'Marketing Agency', contact: 'Diana Prince', product: 'LeadOS', status: 'Inactive', contractStart: '2023-02-10', contractEnd: '2024-02-09', plan: 'Growth', accountManager: 'Jane Smith', leadOsCredits: 0, leadOsMax: 10000, agentOsCredits: 0, agentOsMax: 0, avatarHint: 'marketing logo', timeline: [
         { type: 'created', title: 'Client Onboarded', content: 'Onboarded via Growth plan.', date: '2023-02-10' },
         { type: 'stage_change', title: 'Client Churned', content: 'Did not renew contract.', date: '2024-02-10' },
    ] as TimelineEvent[] },
];

type ClientData = typeof initialClientManagementData[0];

const growthData = [
    { month: 'Jan', clients: 2 },
    { month: 'Feb', clients: 3 },
    { month: 'Mar', clients: 5 },
    { month: 'Apr', clients: 4 },
    { month: 'May', clients: 6 },
    { month: 'Jun', clients: 7 },
    { month: 'Jul', clients: 5 },
];

const revenueTrendData = Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'MMM d'),
    revenue: Math.floor(Math.random() * 500) + 1500,
}));

const revenueMixData = Array.from({ length: 12 }, (_, i) => {
    const date = subDays(new Date(), (11 - i) * 30);
    return {
        month: format(date, 'MMM'),
        recurring: Math.floor(Math.random() * 20000) + 30000,
        oneTime: Math.floor(Math.random() * 10000) + 5000,
    }
});

const costTrendData = Array.from({ length: 6 }, (_, i) => {
  const date = subDays(new Date(), (5 - i) * 30);
  return {
    month: format(date, 'MMM'),
    api: Math.floor(Math.random() * 5000) + 10000,
    infra: Math.floor(Math.random() * 1000) + 4000,
    ops: Math.floor(Math.random() * 500) + 1800,
  }
});

const costCategoryData = [
  { name: 'API', value: financialData.costs.api, fill: 'hsl(var(--chart-1))' },
  { name: 'Infra', value: financialData.costs.infra, fill: 'hsl(var(--chart-2))' },
  { name: 'Ops', value: financialData.costs.ops, fill: 'hsl(var(--chart-3))' },
];

const vendorCostData = [
  { name: 'Meta', value: 8000, fill: 'hsl(var(--chart-1))' },
  { name: 'Google AI', value: 4000, fill: 'hsl(var(--chart-2))' },
  { name: 'Hetzner', value: 4500, fill: 'hsl(var(--chart-3))' },
  { name: 'Other', value: 2000, fill: 'hsl(var(--chart-4))' },
];

const alertsData = [
    {
        id: 1,
        type: 'Error',
        title: 'Overdue Invoice',
        description: 'Client "Data Dynamics" has an overdue invoice of $4,990.',
        timestamp: '1 day ago',
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        action: 'View Client'
    },
    {
        id: 2,
        type: 'Warning',
        title: 'API Cost Spike',
        description: 'Meta WhatsApp API costs have increased by 30% in the last 24 hours.',
        timestamp: '3 hours ago',
        icon: <TrendingDown className="h-5 w-5 text-yellow-500" />,
        action: 'Review Costs'
    },
    {
        id: 3,
        type: 'Info',
        title: 'Client Nearing Credit Limit',
        description: 'Client "Innovate Inc." has used 90% of their LeadOS credits.',
        timestamp: 'Just now',
        icon: <Info className="h-5 w-5 text-blue-500" />,
        action: 'View Client'
    }
];

const rawExecutionData = Array.from({ length: 30 }, (_, i) => {
    const date = format(subDays(new Date(), 29 - i), 'MMM d');
    const leados = Math.floor(Math.random() * 2000) + 8000;
    const agentos = Math.floor(Math.random() * 1000) + 3000;
    return { date, leados, agentos, total: leados + agentos };
});

const apiUsageData = {
    google: { tokensIn: 12500000, tokensOut: 3125000, cost: 450.75 },
    meta: { messagesSent: 280000, apiCalls: 1200000 },
}

const apiUsageChartData = [
    { name: 'Google Tokens', value: (apiUsageData.google.tokensIn + apiUsageData.google.tokensOut) / 1000, fill: 'hsl(var(--chart-2))' },
    { name: 'Meta Messages', value: apiUsageData.meta.messagesSent / 100, fill: 'hsl(var(--chart-1))' },
]


const LogNewCostDialog = () => {
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle form submission to your backend here
        console.log("Saving new cost...");
        toast({
            title: "Cost Logged",
            description: "The new cost has been successfully recorded.",
        });
        setOpen(false);
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                 <Button><PlusCircle className="mr-2 h-4 w-4"/>Log New Cost</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Log New Cost</DialogTitle>
                    <DialogDescription>Manually enter a new operational cost.</DialogDescription>
                </DialogHeader>
                 <form onSubmit={handleSave}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cost-type" className="text-right">Cost Type</Label>
                            <Select>
                                <SelectTrigger id="cost-type" className="col-span-3"><SelectValue placeholder="Select type..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="api">API</SelectItem>
                                    <SelectItem value="infra">Infra</SelectItem>
                                    <SelectItem value="ops">Ops</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="vendor" className="text-right">Vendor</Label>
                            <Select>
                                <SelectTrigger id="vendor" className="col-span-3">
                                    <SelectValue placeholder="Select a vendor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hetzner">Hetzner</SelectItem>
                                    <SelectItem value="razorpay">Razorpay</SelectItem>
                                    <SelectItem value="aws">AWS</SelectItem>
                                    <SelectItem value="meta">Meta</SelectItem>
                                    <SelectItem value="google-ai">Google AI</SelectItem>
                                    <SelectItem value="custom" className="font-bold text-primary">Add New Vendor...</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">Amount</Label>
                            <Input id="amount" type="number" placeholder="0.00" className="col-span-2" />
                             <Select defaultValue="inr">
                                <SelectTrigger id="currency" className="col-span-1"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inr">INR</SelectItem>
                                    <SelectItem value="usd">USD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="invoice-id" className="text-right">Invoice ID</Label>
                            <Input id="invoice-id" placeholder="Optional" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <Select>
                                <SelectTrigger id="status" className="col-span-3"><SelectValue placeholder="Select status..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                             <Label htmlFor="date-incurred" className="text-right">Date Incurred</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="col-span-3 font-normal justify-start"><CalendarIcon className="mr-2 h-4 w-4"/><span>Pick a date</span></Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" initialFocus /></PopoverContent>
                             </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="notes" className="text-right pt-2">Notes</Label>
                            <Textarea id="notes" placeholder="e.g., Monthly server costs for..." className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                        <Button type="submit">Save Cost</Button>
                    </DialogFooter>
                 </form>
            </DialogContent>
        </Dialog>
    )
}

const CostsBreakdownDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [showVendorCost, setShowVendorCost] = React.useState(false);
  
  const costDetailData = [
    { id: 'CST-001', type: 'API', vendor: 'Meta (WhatsApp)', amount: '₹8,000', status: 'Paid', date: '2024-07-25' },
    { id: 'CST-002', type: 'Infra', vendor: 'Hetzner', amount: '₹4,500', status: 'Paid', date: '2024-07-28' },
    { id: 'CST-003', type: 'API', vendor: 'Google AI', amount: '₹4,000', status: 'Paid', date: '2024-07-26' },
  ];
  
  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size="xs" variant="outline"><Eye className="mr-1 h-3 w-3"/>View Breakdown</Button>
        </DialogTrigger>
        <DialogContent className="max-w-7xl h-[90vh]">
            <DialogHeader>
                <DialogTitle className="text-2xl font-headline">Costs Breakdown</DialogTitle>
                <DialogDescription>A detailed analysis of your operational costs.</DialogDescription>
            </DialogHeader>
             <div className="flex-1 overflow-y-auto space-y-6 pt-4 pr-2">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2 items-center flex-wrap">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button id="costs-date" variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>Pick a date range</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="range" numberOfMonths={2} />
                        </PopoverContent>
                    </Popover>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Select cost type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Costs</SelectItem>
                            <SelectItem value="api">API</SelectItem>
                            <SelectItem value="infra">Infrastructure</SelectItem>
                            <SelectItem value="ops">Operations</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Select vendor" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Vendors</SelectItem>
                            <SelectItem value="meta">Meta (WhatsApp)</SelectItem>
                            <SelectItem value="google-ai">Google AI</SelectItem>
                            <SelectItem value="hetzner">Hetzner</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="inr">
                        <SelectTrigger className="w-full sm:w-[120px]"><SelectValue placeholder="Currency" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="inr">INR (₹)</SelectItem>
                            <SelectItem value="usd">USD ($)</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex-1" />
                    <Button variant="destructive" size="sm"><AlertTriangle className="mr-2 h-4 w-4"/>Set Cost Alert</Button>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
                </div>
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Cost</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${financialData.costs.total.toLocaleString()}</div><p className="text-xs text-muted-foreground">in selected period</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">% Cost of Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{((financialData.costs.total / financialData.revenue.total) * 100).toFixed(1)}%</div><p className="text-xs text-muted-foreground">Efficiency Metric</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg. API Cost / Lead</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$0.24</div><p className="text-xs text-muted-foreground">Based on verified leads</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Infra Utilization</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">78%</div><p className="text-xs text-muted-foreground">Disk Usage</p></CardContent></Card>
                </div>
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Cost Trend (Monthly)</CardTitle></CardHeader>
                        <CardContent className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={costTrendData} stackOffset="sign">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`}/>
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                    <Legend wrapperStyle={{fontSize: '12px'}}/>
                                    <Bar dataKey="api" name="API" fill="hsl(var(--chart-1))" stackId="a" radius={[4, 4, 0, 0]}/>
                                    <Bar dataKey="infra" name="Infrastructure" fill="hsl(var(--chart-2))" stackId="a" />
                                    <Bar dataKey="ops" name="Operations" fill="hsl(var(--chart-3))" stackId="a" radius={[0, 0, 4, 4]}/>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Cost Share</CardTitle>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="cost-toggle" className="text-sm font-normal text-muted-foreground">By Category</Label>
                                    <Switch id="cost-toggle" checked={showVendorCost} onCheckedChange={setShowVendorCost} aria-label="Toggle between cost category and vendor view"/>
                                    <Label htmlFor="cost-toggle" className="text-sm font-normal text-muted-foreground">By Vendor</Label>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[250px]">
                           <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={showVendorCost ? vendorCostData : costCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                         {(showVendorCost ? vendorCostData : costCategoryData).map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                    <Legend wrapperStyle={{fontSize: '12px'}}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
                {/* Detailed Table */}
                <Card>
                    <CardHeader>
                      <CardTitle>Detailed View</CardTitle>
                       <div className="relative mt-2">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by vendor, type, or invoice ID..." className="pl-8" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Cost Type</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {costDetailData.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium"><Badge variant="outline">{item.type}</Badge></TableCell>
                              <TableCell>{item.vendor}</TableCell>
                              <TableCell>{item.amount}</TableCell>
                              <TableCell><Badge className="text-green-400 border-green-400/50 bg-green-500/10">{item.status}</Badge></TableCell>
                              <TableCell className="text-muted-foreground">{item.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                </Card>
             </div>
        </DialogContent>
      </Dialog>
  );
};


const RevenueBreakdownDialog = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const [dimension, setDimension] = React.useState('product');

  React.useEffect(() => {
    // We set the date range in a useEffect to avoid hydration mismatches
    setDateRange({
      from: subDays(new Date(), 29),
      to: new Date(),
    });
  }, []);
  
  const revenueDetailData = [
    { id: 'INV-001', client: 'Innovate Inc.', product: 'LeadOS', revenue: '₹8,999', type: 'Recurring', status: 'Paid', date: '2024-07-25' },
    { id: 'INV-002', client: 'Solutions Corp.', product: 'LeadOS', revenue: '₹14,999', type: 'Recurring', status: 'Paid', date: '2024-07-24' },
    { id: 'INV-003', client: 'Data Dynamics', product: 'AgentOS', revenue: '₹4,999', type: 'Recurring', status: 'Paid', date: '2024-07-23' },
    { id: 'INV-004', client: 'Innovate Inc.', product: 'Credit Top-up', revenue: '₹5,000', type: 'One-Time', status: 'Paid', date: '2024-07-22' },
  ];
  
  const arpu = financialData.revenue.total / businessKPIs.activeClients;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="xs" variant="outline"><Eye className="mr-1 h-3 w-3"/>View Breakdown</Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Revenue Breakdown</DialogTitle>
          <DialogDescription>A detailed analysis of your revenue streams. Use the filters to slice the data.</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-6 pt-4 pr-2">
          {/* Filters */}
           <div className="flex flex-col sm:flex-row gap-2 items-center flex-wrap">
             <Popover>
                <PopoverTrigger asChild>
                    <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-full sm:w-[240px] justify-start text-left font-normal",
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
                <PopoverContent className="w-auto p-0" align="start">
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
            <Select value={dimension} onValueChange={setDimension}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select dimension" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">By Product</SelectItem>
                <SelectItem value="client">By Client</SelectItem>
                <SelectItem value="plan">By Plan/Tier</SelectItem>
                <SelectItem value="region">By Region</SelectItem>
                <SelectItem value="type">By Type</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="inr">
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inr">INR (₹)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
          </div>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${financialData.revenue.total.toLocaleString()}</div><p className="text-xs text-muted-foreground">in selected period</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg. Revenue / Client</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${arpu.toFixed(2)}</div><p className="text-xs text-muted-foreground">ARPU</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Recurring Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${financialData.revenue.recurring.toLocaleString()}</div><p className="text-xs text-muted-foreground">MRR & ARR combined</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">One-Time Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${financialData.revenue.topUp.toLocaleString()}</div><p className="text-xs text-muted-foreground">Credit Top-ups</p></CardContent></Card>
          </div>

          {/* Charts */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueTrendData}>
                                 <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`}/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-1">
                    <CardHeader><CardTitle>Breakdown by {dimension}</CardTitle></CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={revenueByProductData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-1">
                    <CardHeader><CardTitle>Recurring vs. One-Time</CardTitle></CardHeader>
                    <CardContent className="h-[250px]">
                         <ResponsiveContainer width="100%" height="100%">
                             <RechartsBarChart data={revenueMixData} stackOffset="sign">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`}/>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                <Legend wrapperStyle={{fontSize: '12px'}}/>
                                <Bar dataKey="recurring" name="Recurring" fill="hsl(var(--chart-2))" stackId="a" radius={[4, 4, 0, 0]}/>
                                <Bar dataKey="oneTime" name="One-Time" fill="hsl(var(--chart-3))" stackId="a" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

          {/* Detailed Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed View</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by client, product, or invoice ID..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client / Product</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueDetailData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{dimension === 'product' ? item.product : item.client}</TableCell>
                      <TableCell>{item.revenue}</TableCell>
                      <TableCell><Badge variant="outline">{item.type}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{item.id}</TableCell>
                      <TableCell><Badge className="text-green-400 border-green-400/50 bg-green-500/10">{item.status}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{item.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const timelineEventIcons: Record<TimelineEvent['type'], React.ReactElement> = {
    created: <UserPlus className="h-4 w-4" />,
    stage_change: <Milestone className="h-4 w-4" />,
    note: <FileText className="h-4 w-4" />,
    follow_up: <Clock className="h-4 w-4" />,
};

const ClientDetailDialog = ({ client, open, onOpenChange }: { client: ClientData | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!client) return null;

    const activityData = Array.from({ length: 7 }, (_, i) => ({
      name: format(subDays(new Date(), 6 - i), 'eee'),
      Leads: Math.floor(Math.random() * 50) + 10,
      Conversations: Math.floor(Math.random() * 200) + 50,
    }));
    
    const conversationSplitData = [
      { name: 'Service', value: 400, fill: 'hsl(var(--chart-1))' },
      { name: 'Marketing', value: 300, fill: 'hsl(var(--chart-2))' },
      { name: 'Utility', value: 300, fill: 'hsl(var(--chart-3))' },
    ];

    const invoiceHistory = [
        { id: 'INV-C1-003', date: '2024-07-01', amount: '₹14,999', status: 'Paid' },
        { id: 'INV-C1-002', date: '2024-06-01', amount: '₹14,999', status: 'Paid' },
        { id: 'INV-C1-001', date: '2024-05-01', amount: '₹14,999', status: 'Paid' },
    ];


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh]">
                 <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={`https://placehold.co/48x48.png?text=${client.client.charAt(0)}`} data-ai-hint={client.avatarHint}/>
                            <AvatarFallback>{client.client.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-2xl font-headline">{client.client}</DialogTitle>
                            <DialogDescription>{client.industry}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <Tabs defaultValue="profile" className="flex flex-col h-full">
                        <TabsList className="shrink-0">
                            <TabsTrigger value="profile"><User className="mr-2 h-4 w-4"/>Profile</TabsTrigger>
                            <TabsTrigger value="usage"><PieChartIcon className="mr-2 h-4 w-4"/>Usage</TabsTrigger>
                            <TabsTrigger value="performance"><TrendingUp className="mr-2 h-4 w-4"/>Performance</TabsTrigger>
                            <TabsTrigger value="billing"><Receipt className="mr-2 h-4 w-4"/>Billing</TabsTrigger>
                            <TabsTrigger value="health"><HeartPulse className="mr-2 h-4 w-4"/>Health</TabsTrigger>
                            <TabsTrigger value="logs"><History className="mr-2 h-4 w-4"/>Logs</TabsTrigger>
                        </TabsList>
                        <div className="flex-1 overflow-y-auto pt-4 pr-2">
                            <TabsContent value="profile" className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Client Profile</CardTitle></CardHeader>
                                    <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2"><Building className="h-4 w-4 text-primary"/><strong>Company:</strong> {client.client}</div>
                                        <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary"/><strong>Industry:</strong> {client.industry}</div>
                                        <div className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-primary"/><strong>Contact:</strong> {client.contact}</div>
                                        <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary"/><strong>Plan:</strong><Badge variant="secondary">{client.plan}</Badge></div>
                                        <div className="flex items-center gap-2"><FileClock className="h-4 w-4 text-primary"/><strong>Contract:</strong> {client.contractStart} to {client.contractEnd}</div>
                                        <div className="flex items-center gap-2"><User className="h-4 w-4 text-primary"/><strong>Account Manager:</strong> {client.accountManager}</div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                             <TabsContent value="usage" className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Quota Consumption</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        {client.leadOsMax > 0 && <div><Label>LeadOS Credits</Label><Progress value={(client.leadOsCredits / client.leadOsMax) * 100} /><p className="text-xs text-right text-muted-foreground mt-1">{client.leadOsCredits.toLocaleString()}/{client.leadOsMax.toLocaleString()}</p></div>}
                                        {client.agentOsMax > 0 && <div><Label>AgentOS Credits</Label><Progress value={(client.agentOsCredits / client.agentOsMax) * 100} /><p className="text-xs text-right text-muted-foreground mt-1">{client.agentOsCredits.toLocaleString()}/{client.agentOsMax.toLocaleString()}</p></div>}
                                    </CardContent>
                                </Card>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <Card>
                                        <CardHeader><CardTitle>Activity Trend (Last 7 Days)</CardTitle></CardHeader>
                                        <CardContent className="h-[200px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RechartsBarChart data={activityData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" fontSize={12} />
                                                    <YAxis fontSize={12} />
                                                    <Tooltip />
                                                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                                                    <Bar dataKey="Leads" fill="hsl(var(--chart-1))" />
                                                    <Bar dataKey="Conversations" fill="hsl(var(--chart-2))" />
                                                </RechartsBarChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader><CardTitle>WhatsApp Conversation Split</CardTitle></CardHeader>
                                        <CardContent className="h-[200px]">
                                             <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={conversationSplitData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                                         {conversationSplitData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            <TabsContent value="performance" className="grid md:grid-cols-3 gap-6">
                                <Card><CardHeader><CardTitle>Leads Generated</CardTitle></CardHeader><CardContent className="text-3xl font-bold">1,204</CardContent></Card>
                                <Card><CardHeader><CardTitle>Leads Converted</CardTitle></CardHeader><CardContent className="text-3xl font-bold">88</CardContent></Card>
                                <Card><CardHeader><CardTitle>Conversion %</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-green-400">7.3%</CardContent></Card>
                                <Card><CardHeader><CardTitle>Avg. API Latency</CardTitle></CardHeader><CardContent className="text-3xl font-bold">112ms</CardContent></Card>
                                <Card><CardHeader><CardTitle>Error Rate</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-red-400">0.4%</CardContent></Card>
                            </TabsContent>
                             <TabsContent value="billing" className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Billing & Financials</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                                            <div><strong>Current Cycle:</strong> Jul 1 - Aug 1, 2024</div>
                                            <div><strong>Outstanding Invoices:</strong> <span className="text-red-400">None</span></div>
                                            <div><strong>LTV:</strong> ₹44,997</div>
                                        </div>
                                         <Separator className="my-4"/>
                                         <h4 className="font-semibold text-md mb-2">Invoice History</h4>
                                        <Table>
                                            <TableHeader><TableRow><TableHead>Invoice ID</TableHead><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                                            <TableBody>
                                                {invoiceHistory.map(inv => (
                                                    <TableRow key={inv.id}><TableCell>{inv.id}</TableCell><TableCell>{inv.date}</TableCell><TableCell>{inv.amount}</TableCell><TableCell><Badge className="text-green-400 border-green-400/50 bg-green-500/10">{inv.status}</Badge></TableCell></TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="health" className="space-y-6">
                                 <Card>
                                    <CardHeader><CardTitle>Health & Alerts</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><span className="font-medium">API Status</span><Badge className="bg-green-500/20 text-green-400">Operational</Badge></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><span className="font-medium">SLA Compliance (30d)</span><span className="font-bold text-green-400">99.98%</span></div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary"><span className="font-medium">Active Alerts</span><span className="text-muted-foreground">None</span></div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="logs" className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Activity Timeline</CardTitle></CardHeader>
                                    <CardContent>
                                      <div className="relative py-4 pr-4">
                                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -z-10"></div>
                                        {client.timeline.map((event, index) => (
                                            <div key={index} className="flex gap-4 items-start mb-6">
                                                <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-full bg-secondary flex items-center justify-center border-4 border-background">
                                                    <span className="text-primary">{timelineEventIcons[event.type]}</span>
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <p className="font-semibold text-sm">{event.title}</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                                                    <p className="text-sm mt-1">{event.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const RetentionBreakdownDialog = () => {
    const churnReasons = [
        { reason: 'High Price', count: 12 },
        { reason: 'Missing Features', count: 8 },
        { reason: 'Switched to Competitor', count: 5 },
    ]

    const upcomingRenewals = [
        { client: 'Solutions Corp.', plan: 'Growth', renewalDate: '2024-08-31' },
        { client: 'Innovate Inc.', plan: 'Pro', renewalDate: '2024-09-14' },
    ]
    return (
         <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="xs" className="absolute bottom-4 right-4"><Eye className="mr-1 h-3 w-3"/>View Breakdown</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Client Retention Analysis</DialogTitle>
                    <DialogDescription>A detailed look at client loyalty and churn.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active Clients</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{businessKPIs.activeClients}</div><p className="text-xs text-muted-foreground">Using product this month</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Churned Clients</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-400">{businessKPIs.churnedClients}</div><p className="text-xs text-muted-foreground">Lost this month</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Retention Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-400">{businessKPIs.retention}%</div><p className="text-xs text-muted-foreground">Last 90 days</p></CardContent></Card>
                </div>
                 <div className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Top 3 Churn Reasons</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                {churnReasons.map(r => <li key={r.reason} className="flex justify-between"><span>{r.reason}</span> <span className="font-semibold">{r.count} clients</span></li>)}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Upcoming Renewals (30 days)</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader><TableRow><TableHead>Client</TableHead><TableHead>Plan</TableHead><TableHead>Renewal Date</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {upcomingRenewals.map(r => <TableRow key={r.client}><TableCell>{r.client}</TableCell><TableCell><Badge variant="secondary">{r.plan}</Badge></TableCell><TableCell>{r.renewalDate}</TableCell></TableRow>)}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const ForecastSimulatorDialog = () => {
    const [newClients, setNewClients] = React.useState([10]);
    const [avgRevenue, setAvgRevenue] = React.useState([1500]);
    const [marketingSpend, setMarketingSpend] = React.useState([5000]);

    const projectedRevenue = newClients[0] * avgRevenue[0];
    const projectedProfit = projectedRevenue - marketingSpend[0];

    const forecastData = [
        { name: 'Revenue', value: projectedRevenue, fill: 'hsl(var(--chart-2))' },
        { name: 'Costs', value: marketingSpend[0], fill: 'hsl(var(--chart-1))' },
        { name: 'Profit', value: projectedProfit, fill: 'hsl(var(--chart-4))' },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-full">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Simulate Scenarios
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Forecast Simulator</DialogTitle>
                    <DialogDescription>Adjust the sliders to model different financial scenarios.</DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-8 py-4">
                    <div className="space-y-8">
                        <div>
                            <Label htmlFor="new-clients" className="text-sm font-medium">New Clients per Month: <span className="text-primary font-bold">{newClients[0]}</span></Label>
                            <Slider id="new-clients" defaultValue={newClients} max={100} step={1} onValueChange={setNewClients} />
                        </div>
                        <div>
                            <Label htmlFor="avg-revenue" className="text-sm font-medium">Avg. Revenue per Client: <span className="text-primary font-bold">${avgRevenue[0].toLocaleString()}</span></Label>
                            <Slider id="avg-revenue" defaultValue={avgRevenue} max={5000} step={100} onValueChange={setAvgRevenue} />
                        </div>
                        <div>
                            <Label htmlFor="marketing-spend" className="text-sm font-medium">Monthly Marketing Spend: <span className="text-primary font-bold">${marketingSpend[0].toLocaleString()}</span></Label>
                            <Slider id="marketing-spend" defaultValue={marketingSpend} max={20000} step={500} onValueChange={setMarketingSpend} />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                             <div className="flex justify-between font-medium">
                                <span>Projected Monthly Revenue:</span>
                                <span className="text-green-400">${projectedRevenue.toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between font-medium">
                                <span>Projected Costs:</span>
                                <span className="text-red-400">${marketingSpend[0].toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                                <span>Projected Profit:</span>
                                <span>${projectedProfit.toLocaleString()}</span>
                             </div>
                        </div>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsBarChart data={forecastData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    <LabelList dataKey="value" position="right" formatter={(value: number) => `$${value.toLocaleString()}`} />
                                    {forecastData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export default function AdminDashboardPage() {
  const [clientData, setClientData] = React.useState(initialClientManagementData);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const [finDateRange, setFinDateRange] = React.useState<DateRange | undefined>(undefined);
  const [prodDateRange, setProdDateRange] = React.useState<DateRange | undefined>(undefined);
  const [productFilter, setProductFilter] = React.useState('all');
  const [apiView, setApiView] = React.useState('health');
  const { toast } = useToast();
  const [selectedClient, setSelectedClient] = React.useState<ClientData | null>(null);
  const [pieActiveIndex, setPieActiveIndex] = React.useState(0);

  const executionData = React.useMemo(() => {
    return rawExecutionData.map(d => {
      const { date, leados, agentos, total } = d;
      if (productFilter === 'leados') {
        return { date, leados, agentos: 0, total: leados };
      }
      if (productFilter === 'agentos') {
        return { date, leados: 0, agentos, total: agentos };
      }
      return d;
    });
  }, [productFilter]);

  const totalExecutions = React.useMemo(() => executionData.reduce((acc, curr) => acc + curr.total, 0), [executionData]);
  const totalLeadOSExecutions = React.useMemo(() => executionData.reduce((acc, curr) => acc + curr.leados, 0), [executionData]);
  const totalAgentOSExecutions = React.useMemo(() => executionData.reduce((acc, curr) => acc + curr.agentos, 0), [executionData]);


  React.useEffect(() => {
    // We set the date range in a useEffect to avoid hydration mismatches
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 29);
    setDateRange({ from: thirtyDaysAgo, to: today });
    setFinDateRange({ from: thirtyDaysAgo, to: today });
    setProdDateRange({ from: thirtyDaysAgo, to: today });
  }, []);
  
  const onPieEnter = React.useCallback((_: any, index: number) => {
    setPieActiveIndex(index);
  }, []);
  
  const renderActiveShape = (props: any) => {
      const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
      return (
        <g>
          <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">{payload.name}</text>
          <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="hsl(var(--foreground))" className="font-semibold">${value.toLocaleString()}</text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius + 5}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            className="chart-glow"
            style={{ filter: `drop-shadow(0 0 8px ${fill})` }}
          />
        </g>
      );
  };


  const handleWorkspaceToggle = (clientName: string, checked: boolean) => {
    setClientData(prevData =>
      prevData.map(client =>
        client.client === clientName ? { ...client, status: checked ? 'Active' : 'Inactive' } : client
      )
    );
    toast({
        title: "Client Workspace Updated",
        description: `${clientName}'s workspace has been ${checked ? 'activated' : 'deactivated'}.`
    })
  };
  
  const handleViewDetails = (client: ClientData) => {
      setSelectedClient(client);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Owner Dashboard</h1>
        <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search dashboard..." className="pl-9" />
        </div>
      </div>


      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="system-ops">System Ops</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 pt-4">
            {/* Business KPIs */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{businessKPIs.activeClients}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-500">+{businessKPIs.newClients}</span> new, <span className="text-red-500">-{businessKPIs.churnedClients}</span> churned this month
                        </p>
                    </CardContent>
                </Card>
                <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">MRR</CardTitle>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${businessKPIs.mrr.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ARR</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${businessKPIs.arr.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Annual Run Rate</p>
                    </CardContent>
                </Card>
                 <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Client Retention</CardTitle>
                        <Shield className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{businessKPIs.retention}%</div>
                        <p className="text-xs text-muted-foreground">{businessKPIs.upcomingRenewals} upcoming renewals</p>
                    </CardContent>
                    <RetentionBreakdownDialog />
                </Card>
            </div>
             <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Product Analysis</CardTitle>
                        <CardDescription>Performance metrics for your AI engines.</CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                id="prod-date" variant={"outline"}
                                className={cn( "w-full sm:w-[240px] justify-start text-left font-normal", !prodDateRange && "text-muted-foreground" )} >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {prodDateRange?.from ? ( prodDateRange.to ? ( <> {format(prodDateRange.from, "LLL dd, y")} - {format(prodDateRange.to, "LLL dd, y")} </> ) : ( format(prodDateRange.from, "LLL dd, y") ) ) : ( <span>Pick a date</span> )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar initialFocus mode="range" defaultMonth={prodDateRange?.from} selected={prodDateRange} onSelect={setProdDateRange} numberOfMonths={2} />
                            </PopoverContent>
                        </Popover>
                         <Select value={productFilter} onValueChange={setProductFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Products</SelectItem>
                                <SelectItem value="leados">LeadOS</SelectItem>
                                <SelectItem value="agentos">AgentOS</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                </CardHeader>
                 <CardContent className="space-y-8">
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Executions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalExecutions.toLocaleString()}</div><p className="text-xs text-muted-foreground">Across all products</p></CardContent></Card>
                        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">LeadOS Executions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalLeadOSExecutions.toLocaleString()}</div><p className="text-xs text-muted-foreground">Workflows completed</p></CardContent></Card>
                        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">AgentOS Actions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalAgentOSExecutions.toLocaleString()}</div><p className="text-xs text-muted-foreground">Messages, etc.</p></CardContent></Card>
                        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Error Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-400">0.2%</div><p className="text-xs text-muted-foreground">Failed executions</p></CardContent></Card>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader><CardTitle>Execution Trend Over Time</CardTitle></CardHeader>
                            <CardContent className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={executionData}>
                                        <defs>
                                            <linearGradient id="colorLeadOS" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/><stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/></linearGradient>
                                            <linearGradient id="colorAgentOS" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/><stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/></linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`}/>
                                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                        <Legend wrapperStyle={{fontSize: '12px'}}/>
                                        {(productFilter === 'all' || productFilter === 'leados') && <Area type="monotone" dataKey="leados" name="LeadOS" stroke="hsl(var(--chart-1))" fill="url(#colorLeadOS)" stackId="1"/>}
                                        {(productFilter === 'all' || productFilter === 'agentos') && <Area type="monotone" dataKey="agentos" name="AgentOS" stroke="hsl(var(--chart-2))" fill="url(#colorAgentOS)" stackId="1"/>}
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <div className="grid grid-cols-2 gap-6">
                            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">LeadOS Speed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{leadOsAnalytics.processingSpeed}s</div><p className="text-xs text-muted-foreground">Avg. qualify time</p></CardContent></Card>
                            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">AgentOS Speed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{agentOsAnalytics.responseSpeed}s</div><p className="text-xs text-muted-foreground">Avg. response time</p></CardContent></Card>
                            <Card className="col-span-2"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">AgentOS Handoff Rate</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8%</div><p className="text-xs text-muted-foreground">Escalated to human</p></CardContent></Card>
                        </div>
                     </div>
                 </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center gap-3 w-full">
                        <Trophy className="h-6 w-6 text-yellow-400"/>
                        <div className="flex-1">
                            <p className="text-sm font-semibold">Top Performing Agent</p>
                            <p className="text-xs text-muted-foreground">AgentOS is leading with {agentOsAnalytics.appointmentsBooked} appointments booked.</p>
                        </div>
                    </div>
                </CardFooter>
             </Card>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle>Product Analytics</CardTitle>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    id="overview-date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full sm:w-[300px] justify-start text-left font-normal",
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
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4 p-4 rounded-lg bg-secondary/50">
                            <h3 className="font-semibold flex items-center gap-2"><BarChart2 className="h-5 w-5 text-primary"/>LeadOS</h3>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between"><span>Executions (month):</span> <AnimatedStat target={leadOsAnalytics.executions} className="font-bold"/></div>
                                <div className="flex justify-between"><span>Avg. Accuracy:</span> <AnimatedStat target={leadOsAnalytics.accuracy} suffix="%" className="font-bold"/></div>
                                <div className="flex justify-between"><span>Est. Cost Saved:</span> <AnimatedStat target={leadOsAnalytics.costSaved} prefix="$" className="font-bold"/></div>
                            </div>
                        </div>
                        <div className="space-y-4 p-4 rounded-lg bg-secondary/50">
                            <h3 className="font-semibold flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/>AgentOS</h3>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between"><span>Inbound Leads Handled:</span> <AnimatedStat target={agentOsAnalytics.inboundLeads} className="font-bold"/></div>
                                <div className="flex justify-between"><span>Persuasion Success:</span> <AnimatedStat target={agentOsAnalytics.persuasionSuccess} suffix="%" className="font-bold"/></div>
                                <div className="flex justify-between"><span>Appointments Booked:</span> <AnimatedStat target={agentOsAnalytics.appointmentsBooked} className="font-bold"/></div>
                            </div>
                        </div>
                    </CardContent>
                     <CardFooter className="border-t pt-4">
                        <div className="flex items-center gap-3 w-full">
                            <Trophy className="h-6 w-6 text-yellow-400"/>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">Top Performing Agent</p>
                                <p className="text-xs text-muted-foreground">AgentOS is leading with {agentOsAnalytics.appointmentsBooked} appointments booked.</p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle>Growth &amp; Forecast</CardTitle>
                            <CardDescription>Client acquisition trendline.</CardDescription>
                        </div>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                id="growth-date"
                                variant={"outline"}
                                className={cn(
                                    "w-full sm:w-[300px] justify-start text-left font-normal",
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
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} 
                                />
                                <Area type="monotone" dataKey="clients" name="New Clients" stroke="hsl(var(--primary))" fill="url(#colorClients)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="financials" className="space-y-8 pt-4">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Financial Control</CardTitle>
                        <CardDescription>Owner-level financial intelligence hub.</CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                id="fin-date" variant={"outline"}
                                className={cn( "w-[240px] justify-start text-left font-normal", !finDateRange && "text-muted-foreground" )} >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {finDateRange?.from ? ( finDateRange.to ? ( <> {format(finDateRange.from, "LLL dd, y")} - {format(finDateRange.to, "LLL dd, y")} </> ) : ( format(finDateRange.from, "LLL dd, y") ) ) : ( <span>Pick a date</span> )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar initialFocus mode="range" defaultMonth={finDateRange?.from} selected={finDateRange} onSelect={setFinDateRange} numberOfMonths={2} />
                            </PopoverContent>
                        </Popover>
                         <LogNewCostDialog />
                     </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Top Row KPIs */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${financialData.revenue.total.toLocaleString()}</div><p className="text-xs text-muted-foreground">in selected period</p></CardContent><CardFooter><RevenueBreakdownDialog /></CardFooter></Card>
                         <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Costs</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${financialData.costs.total.toLocaleString()}</div><p className="text-xs text-muted-foreground">API, Infra, Ops</p></CardContent><CardFooter><CostsBreakdownDialog /></CardFooter></Card>
                        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Net Profit</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-400">${financialData.profit.net.toLocaleString()}</div><p className="text-xs text-muted-foreground">After all costs</p></CardContent></Card>
                         <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Cash Balance</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${financialData.cashBalance.toLocaleString()}</div><p className="text-xs text-muted-foreground">In Bank</p></CardContent></Card>
                         <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Credits Bought</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-blue-400">${financialData.creditsBought.toLocaleString()}</div><p className="text-xs text-muted-foreground">in selected period</p></CardContent></Card>
                         <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Credits Used</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-yellow-400">${financialData.creditsUsed.toLocaleString()}</div><p className="text-xs text-muted-foreground">in selected period</p></CardContent></Card>
                    </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <Card>
                            <CardHeader><CardTitle>Cash Flow Snapshot</CardTitle></CardHeader>
                            <CardContent className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsBarChart data={cashFlowData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                        <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false}/>
                                        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`}/>
                                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                                        <Legend wrapperStyle={{fontSize: '12px'}}/>
                                        <Bar dataKey="cashIn" name="Cash In" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]}/>
                                        <Bar dataKey="cashOut" name="Cash Out" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]}/>
                                        <Line type="monotone" dataKey="netFlow" name="Net Flow" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--chart-4))" }}/>
                                    </RechartsBarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Forecast &amp; Trends</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between"><span>Projected Revenue (30d):</span> <span className="font-semibold">$55,000</span></div>
                                <div className="flex justify-between"><span>Projected Costs (30d):</span> <span className="font-semibold">$20,000</span></div>
                                <div className="flex justify-between border-t pt-2"><span>Break-even Forecast:</span> <span className="font-semibold">N/A</span></div>
                                <ForecastSimulatorDialog />
                            </CardContent>
                        </Card>
                     </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-8 pt-4">
            <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                    <CardTitle>Client Management</CardTitle>
                    <CardDescription>Oversee all client accounts and their configurations.</CardDescription>
                     <div className="relative pt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search by client name or industry..." className="pl-9"/>
                    </div>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead>LeadOS Usage</TableHead>
                                <TableHead>AgentOS Usage</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {clientData.map(client => (
                            <TableRow key={client.client}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={`https://placehold.co/40x40.png?text=${client.client.charAt(0)}`} data-ai-hint={client.avatarHint}/>
                                            <AvatarFallback>{client.client.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{client.client}</p>
                                            <p className="text-xs text-muted-foreground">{client.industry}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{client.product}</Badge>
                                </TableCell>
                                 <TableCell>
                                    {client.leadOsMax > 0 ? (
                                        <div className="w-40">
                                            <Progress value={(client.leadOsCredits / client.leadOsMax) * 100} />
                                            <p className="text-xs text-right text-muted-foreground mt-1">{client.leadOsCredits.toLocaleString()}/{client.leadOsMax.toLocaleString()}</p>
                                        </div>
                                    ) : ( <span className="text-muted-foreground">-</span> )}
                                </TableCell>
                                <TableCell>
                                    {client.agentOsMax > 0 ? (
                                         <div className="w-40">
                                            <Progress value={(client.agentOsCredits / client.agentOsMax) * 100} />
                                            <p className="text-xs text-right text-muted-foreground mt-1">{client.agentOsCredits.toLocaleString()}/{client.agentOsMax.toLocaleString()}</p>
                                        </div>
                                    ) : ( <span className="text-muted-foreground">-</span> )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            checked={client.status === 'Active'}
                                            onCheckedChange={(checked) => handleWorkspaceToggle(client.client, checked)}
                                            aria-label="Toggle client status"
                                        />
                                         <Badge variant={client.status === 'Active' ? 'default' : 'secondary'} className={cn(client.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/10 text-red-400')}>
                                            {client.status}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => handleViewDetails(client)}>
                                                <Info className="mr-2 h-4 w-4" />View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem><Laptop className="mr-2 h-4 w-4"/>Login as Client</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                   </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="system-ops" className="space-y-8 pt-4">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Server className="h-5 w-5 text-primary"/>Server Resources</CardTitle>
                        <CardDescription>Hetzner VPS</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <Label className="flex items-center gap-2"><Cpu className="h-4 w-4"/> CPU Usage</Label>
                            <span className='font-semibold'>45%</span>
                            </div>
                            <Progress value={45} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <Label className="flex items-center gap-2"><HardDrive className="h-4 w-4"/> Memory Usage</Label>
                                <span className='font-semibold'>62%</span>
                            </div>
                            <Progress value={62} />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <Label className="flex items-center gap-2"><Disc className="h-4 w-4"/> Disk Usage</Label>
                                <span className='font-semibold'>78%</span>
                            </div>
                            <Progress value={78} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2"><Cloud className="h-5 w-5 text-primary"/>API Usage & Status</CardTitle>
                            <Select value={apiView} onValueChange={setApiView}>
                                <SelectTrigger className="w-[150px] h-8 text-xs">
                                    <SelectValue placeholder="Select view" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="health">API Health</SelectItem>
                                    <SelectItem value="usage">Token/Call Usage</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <CardDescription>Real-time API health & usage</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        {apiView === 'health' ? (
                            <>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">Meta WhatsApp Cloud API</span>
                                        <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> <span className="text-xs font-medium text-green-500">Operational</span></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">Google AI API</span>
                                        <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> <span className="text-xs font-medium text-green-500">Operational</span></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">Razorpay API</span>
                                        <div className="flex items-center gap-1.5"><XCircle className="h-4 w-4 text-red-500" /> <span className="text-xs font-medium text-red-500">Outage</span></div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">Supabase</span>
                                        <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> <span className="text-xs font-medium text-green-500">Operational</span></div>
                                    </div>
                                </div>
                                 <Separator />
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">ChatGPT API</span>
                                        <div className="flex items-center gap-1.5"><AlertCircle className="h-4 w-4 text-yellow-500" />  <span className="text-xs font-medium text-yellow-500">Degraded</span></div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-2">Google AI (Gemini)</h4>
                                    <div className="text-xs space-y-1 text-muted-foreground">
                                        <p>Tokens In: {apiUsageData.google.tokensIn.toLocaleString()}</p>
                                        <p>Tokens Out: {apiUsageData.google.tokensOut.toLocaleString()}</p>
                                        <p>Est. Cost: ${apiUsageData.google.cost.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm mb-2">Meta (WhatsApp)</h4>
                                    <div className="text-xs space-y-1 text-muted-foreground">
                                        <p>Messages Sent: {apiUsageData.meta.messagesSent.toLocaleString()}</p>
                                        <p>API Calls: {apiUsageData.meta.apiCalls.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="h-[100px] w-full">
                                    <ResponsiveContainer>
                                        <RechartsBarChart data={apiUsageChartData} layout="vertical" margin={{ left: 20 }}>
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" hide />
                                            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                                                 <LabelList dataKey="name" position="insideLeft" style={{ fill: 'hsl(var(--primary-foreground))' }}/>
                                                {apiUsageChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </RechartsBarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Signal className="h-5 w-5 text-primary"/>Reliability</CardTitle>
                        <CardDescription>Performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">API Error Rate (24h)</span>
                            <span className="font-bold text-red-400">0.8%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Avg. API Latency</span>
                            <span className="font-bold">120ms</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Leads Handled (WhatsApp)</span>
                            <span className="font-bold">6,230</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Leads Handled (IG/FB)</span>
                            <span className="font-bold">2,620</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => toast({title: "Coming Soon!", description: "Detailed logs will be available here."})}>
                            <History className="mr-2 h-4 w-4"/> View &amp; Export Detailed Logs
                        </Button>
                    </CardFooter>
                </Card>
             </div>
        </TabsContent>
         <TabsContent value="alerts" className="space-y-8 pt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>Important system and client notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {alertsData.map((alert) => (
                        <div key={alert.id} className={cn(
                            "flex items-start gap-4 p-4 rounded-lg border",
                            alert.type === 'Error' && 'bg-red-500/10 border-red-500/20',
                            alert.type === 'Warning' && 'bg-yellow-500/10 border-yellow-500/20',
                            alert.type === 'Info' && 'bg-blue-500/10 border-blue-500/20'
                        )}>
                            <div className="flex-shrink-0 mt-1">{alert.icon}</div>
                            <div className="flex-1">
                                <p className="font-semibold">{alert.title}</p>
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm">{alert.action}</Button>
                                <Button variant="ghost" size="sm">Dismiss</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
       
       <ClientDetailDialog 
            client={selectedClient} 
            open={!!selectedClient} 
            onOpenChange={(open) => { if(!open) setSelectedClient(null) }}
       />
      
    </div>
  );
}

    
    

    
