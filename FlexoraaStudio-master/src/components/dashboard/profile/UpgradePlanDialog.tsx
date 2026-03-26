
'use client';

import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check, ArrowRight, Minus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const pricingTiers = [
    {
        name: "Starter Plan",
        price: "₹7,999",
        pricePeriod: "/ month",
        description: "For getting started.",
        features: [
            "10,000 Lead Verifications",
            "AI-Based Lead Qualification",
            "Basic SDR Cost Simulator",
        ],
        cta: "Downgrade",
        current: false,
        downgrade: true,
    },
    {
        name: "Growth Plan",
        price: "₹14,999",
        pricePeriod: "/ month",
        description: "For mid-size teams.",
        features: [
            "25,000 Lead Verifications",
            "Dynamic Lead Scoring",
            "Real-Time ROI Dashboard",
        ],
        cta: "Downgrade",
        current: false,
        downgrade: true,
    },
    {
        name: "Pro Plan",
        price: "₹26,999",
        pricePeriod: "/ month",
        description: "For high-velocity teams.",
        features: [
            "50,000 Lead Verifications",
            "AI-Generated WhatsApp Replies",
            "Automated Appointment Booking",
            "SDR Leaderboard & Gamification",
            "Native CRM Integrations"
        ],
        cta: "Current Plan",
        current: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        pricePeriod: "",
        description: "For large-scale operations.",
        features: [
             "Unlimited Verifications",
             "Custom Lead Volume & Integrations",
             "Dedicated Onboarding & Support",
             "Full API Access",
             "Bespoke AI Model Training"
        ],
        cta: "Contact Sales",
        href: "/contact-sales",
        popular: true,
    },
]

export function UpgradePlanDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-5xl">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Upgrade Your Plan</DialogTitle>
                    <DialogDescription>
                        Unlock more power and features to scale your business.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-4 gap-4 py-6">
                   {pricingTiers.map((tier) => (
                    <Card key={tier.name} className={cn("flex flex-col", tier.popular ? "border-primary shadow-lg shadow-primary/10" : "", tier.current ? "ring-2 ring-primary" : "")}>
                        <CardHeader className="pb-4">
                            <CardTitle className="font-headline text-xl">{tier.name}</CardTitle>
                            <CardDescription>{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 flex-grow">
                            <div className="text-4xl font-bold font-headline">
                                {tier.price}
                                {tier.pricePeriod && <span className="text-lg font-normal text-muted-foreground">{tier.pricePeriod}</span>}
                            </div>
                            <ul className="space-y-3">
                                {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    {tier.downgrade ? <Minus className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0 mt-1" /> : <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-1" />}
                                    <span className={cn("text-sm", tier.downgrade ? "text-muted-foreground" : "text-foreground")}>{feature}</span>
                                </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                className="w-full" 
                                asChild={!!tier.href}
                                variant={tier.current || tier.downgrade ? 'outline' : 'default'}
                                disabled={tier.current || tier.downgrade}
                            >
                                {tier.href ? (
                                    <Link href={tier.href}>
                                        {tier.cta} <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                ) : (
                                    <span>{tier.cta}</span>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
                 <DialogFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">
                        For questions about plans and billing, please <Link href="/contact-sales" className="underline hover:text-primary">contact our sales team</Link>.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
