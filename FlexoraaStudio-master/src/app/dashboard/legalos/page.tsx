
'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Cell, PieChart, Pie, Sector, CartesianGrid } from 'recharts';
import { BookCopy, FileCheck2, Scale, ShieldAlert, PlusCircle, Search, Filter, Briefcase, FileClock, GanttChartSquare, ChevronsRight, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const legalKpis = {
    activeMatters: 42,
    contractsForReview: 8,
    highRiskItems: 15,
    upcomingDeadlines: 3,
};

const activeMattersData = [
    { id: 'CON-001', name: 'MSA with Innovate Inc.', type: 'Contract', status: 'In Review', priority: 'High' },
    { id: 'REG-001', name: 'GDPR Article 30 Update', type: 'Compliance', status: 'Action Required', priority: 'High' },
    { id: 'CASE-001', name: 'Innovate Inc. vs. Competitor LLC', type: 'Litigation', status: 'Discovery', priority: 'Medium' },
    { id: 'CON-005', name: 'Software License - CRM', type: 'Contract', status: 'For Renewal', priority: 'Medium' },
    { id: 'CASE-002', name: 'Smith Employment Claim', type: 'Litigation', status: 'Negotiation', priority: 'Low' },
];

const contractPipelineData = [
    { name: 'Drafting', value: 3, fill: 'hsl(var(--chart-3))' },
    { name: 'In Review', value: 8, fill: 'hsl(var(--chart-2))' },
    { name: 'Negotiation', value: 5, fill: 'hsl(var(--chart-4))' },
    { name: 'Executed', value: 25, fill: 'hsl(var(--chart-5))' },
];

const riskExposureData = [
    { name: 'Contractual', value: 40, fill: 'hsl(var(--chart-1))' },
    { name: 'Regulatory', value: 30, fill: 'hsl(var(--chart-2))' },
    { name: 'Litigation', value: 20, fill: 'hsl(var(--chart-4))' },
    { name: 'Operational', value: 10, fill: 'hsl(var(--chart-5))' },
];

const upcomingDeadlinesData = [
    { name: 'Software License - CRM', type: 'Contract Renewal', deadline: '2024-09-01' },
    { name: 'GDPR Article 30 Update', type: 'Compliance Task', deadline: '2024-09-15' },
    { name: 'NDA with Solutions Corp.', type: 'Contract Expiry', deadline: '2024-10-01' },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-base font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="hsl(var(--foreground))" className="text-sm">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-300"
        style={{ filter: `drop-shadow(0 0 8px ${fill})`}}
      />
    </g>
  );
};


export default function LegalOSDashboard() {
    const [filter, setFilter] = useState('All');
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = React.useCallback((_: any, index: number) => {
        setActiveIndex(index);
    }, []);

    const filteredMatters = useMemo(() => {
        if (filter === 'All') return activeMattersData;
        return activeMattersData.filter(m => m.type === filter);
    }, [filter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">LegalOS Dashboard</h1>
            <p className="text-muted-foreground mt-1">Your AI-powered legal intelligence co-pilot.</p>
        </div>
        <Button className="w-full sm:w-auto gradient-background text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4"/>
            Create New Matter
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Active Matters</CardTitle><Briefcase className="h-4 w-4 text-primary"/></CardHeader><CardContent><div className="text-2xl font-bold">{legalKpis.activeMatters}</div><p className="text-xs text-muted-foreground">+2 from last week</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Contracts for Review</CardTitle><FileCheck2 className="h-4 w-4 text-primary"/></CardHeader><CardContent><div className="text-2xl font-bold">{legalKpis.contractsForReview}</div><p className="text-xs text-muted-foreground">3 waiting over 48 hours</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">High-Risk Items</CardTitle><ShieldAlert className="h-4 w-4 text-primary"/></CardHeader><CardContent><div className="text-2xl font-bold">{legalKpis.highRiskItems}</div><p className="text-xs text-muted-foreground">Across all matters</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle><FileClock className="h-4 w-4 text-primary"/></CardHeader><CardContent><div className="text-2xl font-bold">{legalKpis.upcomingDeadlines}</div><p className="text-xs text-muted-foreground">Within next 30 days</p></CardContent></Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle>My Workspace</CardTitle>
                            <CardDescription>A unified view of your active matters.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search matters..." className="pl-8" />
                            </div>
                             <Button variant="outline" size="sm" onClick={() => setFilter('All')} className={cn(filter === 'All' && 'bg-accent text-accent-foreground')}>All</Button>
                             <Button variant="outline" size="sm" onClick={() => setFilter('Contract')} className={cn(filter === 'Contract' && 'bg-accent text-accent-foreground')}>Contracts</Button>
                             <Button variant="outline" size="sm" onClick={() => setFilter('Compliance')} className={cn(filter === 'Compliance' && 'bg-accent text-accent-foreground')}>Compliance</Button>
                             <Button variant="outline" size="sm" onClick={() => setFilter('Litigation')} className={cn(filter === 'Litigation' && 'bg-accent text-accent-foreground')}>Litigation</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader><TableRow><TableHead>Matter Name</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Priority</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {filteredMatters.map(m => (
                                <TableRow key={m.id}>
                                    <TableCell className="font-medium">{m.name}</TableCell>
                                    <TableCell><Badge variant="outline">{m.type}</Badge></TableCell>
                                    <TableCell><Badge variant="secondary">{m.status}</Badge></TableCell>
                                    <TableCell><Badge variant={m.priority === 'High' ? 'destructive' : m.priority === 'Medium' ? 'default' : 'secondary'} className={m.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}>{m.priority}</Badge></TableCell>
                                    <TableCell className="text-right"><Button variant="ghost" size="sm"><ChevronsRight className="h-4 w-4"/></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Contract Review Pipeline</CardTitle>
                    <CardDescription>Current distribution of contracts by stage.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contractPipelineData} layout="vertical" margin={{ left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} cursor={{ fill: 'hsl(var(--secondary))' }}/>
                            <Bar dataKey="value" name="Contracts" radius={[0, 4, 4, 0]}>
                                {contractPipelineData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader><CardTitle>Risk Hotspots</CardTitle><CardDescription>Aggregated risk exposure across all matters.</CardDescription></CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            <Pie 
                                data={riskExposureData} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={60} 
                                outerRadius={80}
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onMouseEnter={onPieEnter}
                            >
                                {riskExposureData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} className="outline-none" />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Upcoming Deadlines</CardTitle><CardDescription>Key dates to monitor in the next 30 days.</CardDescription></CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                       {upcomingDeadlinesData.map(d => (
                           <li key={d.name} className="flex items-start gap-4">
                                <div className="flex-shrink-0 h-10 w-10 bg-secondary rounded-lg flex flex-col items-center justify-center">
                                    <span className="text-xs font-bold text-red-500">{new Date(d.deadline).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-lg font-bold">{new Date(d.deadline).getDate()}</span>
                                </div>
                               <div>
                                   <p className="font-medium text-sm">{d.name}</p>
                                   <p className="text-xs text-muted-foreground">{d.type}</p>
                               </div>
                           </li>
                       ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
