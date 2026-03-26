
'use client';

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Wallet, Zap, FileInput, MessageSquare } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BuyCreditsDialog } from '@/components/dashboard/profile/BuyCreditsDialog';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Sector } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

const usageData = {
    totalCredits: 50000,
    usedCredits: 12500,
    breakdown: [
        { name: 'Lead Verification', value: 8000, fill: 'hsl(var(--chart-1))', icon: <Zap className="h-5 w-5" /> },
        { name: 'AI Messages', value: 3500, fill: 'hsl(var(--chart-2))', icon: <MessageSquare className="h-5 w-5" /> },
        { name: 'Data Processing', value: 1000, fill: 'hsl(var(--chart-4))', icon: <FileInput className="h-5 w-5" /> },
    ]
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy - 8} dy={8} textAnchor="middle" fill={fill} className="text-base font-bold">
        {payload.name}
      </text>
       <text x={cx} y={cy + 12} dy={8} textAnchor="middle" fill="hsl(var(--foreground))" className="text-sm font-semibold">
        {payload.value.toLocaleString()}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-300"
        style={{ filter: `drop-shadow(0 0 6px ${fill})`}}
      />
    </g>
  );
};


export function CreditUsageDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const onPieEnter = React.useCallback((_: any, index: number) => {
        setActiveIndex(index);
    }, []);

    const usedPercentage = (usageData.usedCredits / usageData.totalCredits) * 100;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl flex items-center gap-2"><Wallet />Credit Usage</DialogTitle>
                    <DialogDescription>
                        A breakdown of your credit consumption for the current billing cycle.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-medium text-muted-foreground">Overall Usage</span>
                            <span className="font-bold text-lg">{usageData.usedCredits.toLocaleString()} / {usageData.totalCredits.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">Credits</span></span>
                        </div>
                        <Progress value={usedPercentage} />
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-center">Usage by Service</h4>
                        <div className="h-52">
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--secondary))' }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--background) / 0.8)', backdropFilter: 'blur(4px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                                    />
                                    <Pie
                                        data={usageData.breakdown}
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
                                        {usageData.breakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} className="outline-none"/>
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                         <div className="grid grid-cols-1 gap-3">
                            {usageData.breakdown.map((item) => (
                                <Card key={item.name} className="bg-secondary/50">
                                    <CardContent className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md" style={{ backgroundColor: `${item.fill}20`, color: item.fill }}>
                                                {item.icon}
                                            </div>
                                            <span className="font-medium text-sm">{item.name}</span>
                                        </div>
                                        <span className="font-semibold">{item.value.toLocaleString()} credits</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <BuyCreditsDialog>
                        <Button className="w-full gradient-background text-primary-foreground">
                            <Zap className="mr-2 h-4 w-4" /> Buy More Credits
                        </Button>
                    </BuyCreditsDialog>
                </div>
            </DialogContent>
        </Dialog>
    );
}
