
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, TrendingUp, BarChart, AlertTriangle, MessageCircle } from "lucide-react";
import Link from 'next/link';

const intelligencePortals = [
    {
        title: "Campaign Intelligence",
        subtitle: "Revenue, ROI, and funnel leaks",
        stat: "0 ROI",
        icon: <BarChart className="h-8 w-8 text-primary"/>,
        href: "/dashboard/intelligence-hub/campaign"
    },
    {
        title: "SDR Intelligence",
        subtitle: "Human performance & efficiency",
        stat: "Top SDR: N/A",
        icon: <TrendingUp className="h-8 w-8 text-primary"/>,
        href: "/dashboard/intelligence-hub/sdr"
    },
    {
        title: "Channel Intelligence",
        subtitle: "Compare platform performance",
        stat: "N/A",
        icon: <MessageCircle className="h-8 w-8 text-primary"/>,
        href: "/dashboard/intelligence-hub/channel"
    },
    {
        title: "Market & Demand Intelligence",
        subtitle: "Objections, intent, and momentum",
        stat: "No Data",
        icon: <BrainCircuit className="h-8 w-8 text-primary"/>,
        href: "/dashboard/intelligence-hub/market"
    },
     {
        title: "Risk & Alerts",
        subtitle: "What needs attention now",
        stat: "0 Active Risks",
        icon: <AlertTriangle className="h-8 w-8 text-destructive"/>,
        href: "#"
    }
];

export default function IntelligenceHubPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Intelligence Hub</h1>
        <p className="text-muted-foreground mt-1">
            Select an intelligence vertical to begin your deep-dive analysis.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {intelligencePortals.map((portal) => (
          <Link key={portal.title} href={portal.href}>
            <Card className="h-full flex flex-col group transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold">{portal.title}</CardTitle>
                    {portal.icon}
                </div>
                <CardDescription>{portal.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <p className="text-sm font-medium text-muted-foreground">Key Stat</p>
                <p className="text-2xl font-bold font-headline">{portal.stat}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
