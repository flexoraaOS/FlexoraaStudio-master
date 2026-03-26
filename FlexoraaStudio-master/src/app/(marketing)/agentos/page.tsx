
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, MessageCircle, Mail, Instagram, Facebook, Link as LinkIcon, Bot, BrainCircuit, Users, CalendarCheck, Workflow, Search, Hand, Wallet, Zap, TrendingUp, Clock, TrendingDown, Tag, Lock, UserCheck, Bell, BarChart2, Flame, GitBranch, Share2, ReplyAll, Sigma, ListChecks, KanbanSquare, BarChart3, TrendingUpIcon, Languages, Milestone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedStat } from '@/components/ui/animated-stat';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const TrelloIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <rect x="7" y="7" width="3" height="9"></rect>
        <rect x="14" y="7" width="3" height="5"></rect>
    </svg>
)

const agentosBenefits = [
    {
        icon: <UserCheck className="h-10 w-10" />,
        title: "Unified Omnichannel Inbox",
        description: "Pull DMs, messages, and comments from Instagram, Facebook, and WhatsApp into one powerful dashboard. No more switching between platforms.",
        stat: { target: 3, suffix: "x", label: "Faster Response Time", trend: "up" }
    },
    {
        icon: <BrainCircuit className="h-10 w-10" />,
        title: "Conversational AI That Sells",
        description: "Our AI uses psychological triggers, persuasive language, and smart intent detection to guide leads to book—just like your top closer.",
        stat: { target: 40, suffix: "%", label: "Increase in Lead Conversion", trend: "up" }
    },
    {
        icon: <Workflow className="h-10 w-10" />,
        title: "Intelligent Lead Routing",
        description: "Automatically assign leads to the right SDRs based on platform, product, or lead temperature. Full control, zero chaos.",
        stat: { target: 98, suffix: "%", label: "Lead Assignment Accuracy", trend: "up" }
    },
    {
        icon: <LinkIcon className="h-10 w-10" />,
        title: "Automated Appointment Booking",
        description: "Once the AI qualifies a lead, AgentOS sends a branded calendar link to lock in the next step. Stop chasing, start closing.",
        stat: { target: 75, suffix: "%", label: "Reduction in Scheduling Time", trend: "down" }
    },
    {
        icon: <Bell className="h-10 w-10" />,
        title: "Perfectly-Timed SDR Alerts",
        description: "On the appointment date, your SDRs get a notification with all lead context, ensuring every call feels personal and timely.",
        stat: { target: 100, suffix: "%", label: "Timely Follow-up Rate" }
    },
    {
        icon: <TrendingUp className="h-10 w-10" />,
        title: "Weekly Growth Insights",
        description: "Businesses receive a concise weekly performance insight report, highlighting lead trends, hot prospects, and engagement improvements.",
        stat: { target: 25, suffix: "%", label: "Increase in Strategy Effectiveness", trend: "up" }
    },
    {
        icon: <MessageCircle className="h-10 w-10" />,
        title: "Social Listening & Engagement",
        description: "AgentOS monitors mentions, tags, comments, and UGC on Instagram and Facebook. Reply instantly or flag hot conversations.",
        stat: { target: 50, suffix: "%", label: "Increase in Social Engagement", trend: "up" }
    },
    {
        icon: <BarChart2 className="h-10 w-10" />,
        title: "Actionable Performance Analytics",
        description: "See which posts are driving inquiries, which stories generate clicks, and what time your audience is most active to inform your sales strategy.",
        stat: { target: 20, suffix: "%", label: "More Data-Driven Decisions", trend: "up" }
    },
    {
        icon: <Tag className="h-10 w-10" />,
        title: "Custom Lead Management",
        description: "Hot, Warm, Cold, Interested, Ghosted. Add custom statuses, notes, and tags to build your own lead flow and stay organized.",
        stat: { target: 100, suffix: "%", label: "Pipeline Customization" }
    },
    {
        icon: <Lock className="h-10 w-10" />,
        title: "Zero Lead Leakage",
        description: "Every message, comment, and DM is tracked, engaged, and followed up with. Never miss a potential customer again.",
        stat: { target: 100, suffix: "%", label: "Lead Capture Rate" }
    },
    {
        icon: <GitBranch className="h-10 w-10" />,
        title: "Dynamic, Adaptive Messaging Flows",
        description: "Our AI learns from every interaction to adapt future conversations and tone, constantly improving its strategy like an experienced sales rep.",
        stat: { target: 15, suffix: "%", label: "Higher Engagement Over Time", trend: "up" }
    },
    {
        icon: <Languages className="h-10 w-10" />,
        title: "True Multilingual & Multicultural AI Engagement",
        description: "Our AI speaks your customers' language—literally. It understands cultural nuances and communicates in 95+ languages, ensuring your message always hits home.",
        stat: { target: 95, suffix: "+", label: "Languages Supported", trend: "up" }
    }
];

const workflowSteps = [
    { icon: <GitBranch />, title: "OmniLink Hub", description: "Every inbound message, lead, and DM is instantly captured and centralized." },
    { icon: <Bot />, title: "EngageIQ Conversations", description: "AI-powered chats adapt to each lead’s tone and urgency, keeping interest alive 24/7." },
    { icon: <Workflow />, title: "Smart Route Logic", description: "Directs leads to the right closer or automation flow for maximum speed and precision." },
    { icon: <CalendarCheck />, title: "AutoLink Scheduler", description: "High-intent leads receive instant booking options, locking appointments without manual follow-up." },
    { icon: <Users />, title: "SDR Assist Alerts", description: "Your sales team is notified at the optimal time — with key context in one view." },
    { icon: <BarChart3 />, title: "Signal Map Engine", description: "Identifies where your campaigns and content are creating the most momentum." },
    { icon: <TrendingUpIcon />, title: "Insight Pulse", description: "Weekly growth reports with trends, top opportunities, and action recommendations." },
    { icon: <Search />, title: "Engagement Sentinel", description: "Monitors your brand presence and joins high-value conversations in real time." },
    { icon: <Milestone />, title: "Dynamic Flow Architect", description: "Learns from every interaction to keep refining lead journeys for higher conversions." },
    { icon: <Languages />, title: "Global Voice", description: "Engages leads in multiple languages, expanding your market reach instantly." }
];


const faqs = [
    {
        question: "Which channels does AgentOS support?",
        answer: "AgentOS integrates with WhatsApp (for inbound messages), Instagram DMs, Facebook Messenger, and Gmail. This allows you to manage all your customer conversations from a single, unified inbox."
    },
    {
        question: "How 'smart' is the conversational AI?",
        answer: "Our AI goes beyond simple keyword matching. It understands context, sentiment, and user intent. It's trained on psychological sales frameworks (like FAB and PAS) to not only answer questions but also to persuade, handle objections, and guide conversations toward a booking or sale."
    },
    {
        question: "Can I use my own branding on reports?",
        answer: "Yes! Our white-labeled weekly reports can be customized with your logo and branding. It's a great way to provide value to your clients or stakeholders with professional, data-driven insights."
    },
    {
        question: "What happens if the AI can't answer a question?",
        answer: "AgentOS has a seamless human handoff process. If it encounters a query it cannot handle or identifies a high-value lead, it can automatically flag the conversation and assign it to a human agent on your team. The agent receives the full context of the AI's conversation, so there's no awkward repetition for the customer."
    }
]

const useInView = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);
    return isInView;
};

const StatNode = ({ icon, target, suffix, label, title, description, isTime = false, trend }: { icon: React.ReactNode, target: number, suffix: string, label: string, title: string, description: string, isTime?: boolean, trend?: 'up' | 'down' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <div ref={ref} className="stat-node">
      <div className="stat-node-content flex flex-col items-start text-left h-full">
        <div className="stat-node-icon mb-auto">{icon}</div>
        <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 h-24">{description}</p>
        </div>
        <div className="mt-auto w-full text-left">
          <div className="flex items-baseline gap-2">
            {isInView && (
              isTime ? (
                <p className="text-4xl lg:text-5xl font-bold text-foreground font-headline">{target}{suffix}</p>
              ) : (
                <AnimatedStat
                  target={target}
                  suffix={suffix}
                  className="text-4xl lg:text-5xl font-bold text-foreground font-headline"
                />
              )
            )}
            {trend === 'up' && <TrendingUp className="h-6 w-6 text-green-500" />}
            {trend === 'down' && <TrendingDown className="h-6 w-6 text-red-500" />}
          </div>
          <p className="stat-node-label text-left">{label}</p>
        </div>
      </div>
    </div>
  );
};

const VerticalWorkflow = () => {
    return (
        <div className="relative max-w-2xl mx-auto px-4">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border/20">
                 <div className="sticky top-1/2 -translate-y-1/2 h-20 w-full">
                     <div className="absolute top-0 w-0.5 h-full bg-accent animate-line-draw"></div>
                </div>
            </div>
            <div className="space-y-16 relative">
                {workflowSteps.map((step, index) => <WorkflowNode key={index} {...step} index={index} />)}
            </div>
        </div>
    )
}

const WorkflowNode = ({ icon, title, description, index }: { icon: React.ReactNode, title: string, description: string, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { threshold: 0.5 });
    
    return (
        <div ref={ref} className={cn(
            "flex items-start gap-4 md:gap-8 transition-opacity duration-700 ease-out",
            isInView ? "opacity-100" : "opacity-0",
        )}>
             <div className="w-1/2 md:hidden"></div>
             <div className={cn("w-1/2 md:w-full", index % 2 === 0 ? "md:text-left" : "md:text-right")}>
                 <div className="p-4 md:p-6 rounded-lg bg-card border shadow-lg hover:shadow-primary/20 transition-shadow">
                    <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 text-primary">{title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{description}</p>
                </div>
            </div>
            <div className="relative w-12 h-12 flex-shrink-0">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping-slow"></div>
                <div className="relative w-full h-full bg-background rounded-full border-2 border-primary flex items-center justify-center text-primary">
                    {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
                </div>
            </div>
            <div className="w-1/2 hidden md:block"></div>
        </div>
    )
}


export default function AgentOSPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28 animated-background">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            <span className="gradient-text">AgentOS:</span> Your Multichannel AI Agent
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Engage customers across WhatsApp, Instagram, and Facebook with a single, intelligent AI workforce.
          </p>
          <div className="mt-8">
            <Button size="lg" className="gradient-background text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95" asChild>
              <Link href="/pricing">View Pricing <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-24 bg-black">
        <div className="container space-y-20">
            <div className="pt-12">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">AgentOS – AI That Handles Your DMs, 24/7</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-lg">
                        Built for businesses who get DMs but lose deals due to slow or missed responses.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {agentosBenefits.map((benefit, index) => (
                            <StatNode 
                                key={index}
                                icon={benefit.icon}
                                target={benefit.stat.target} 
                                suffix={benefit.stat.suffix || ''} 
                                label={benefit.stat.label}
                                title={benefit.title}
                                description={benefit.description}
                                isTime={false}
                                trend={benefit.stat.trend as 'up' | 'down' | undefined}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* How it works Section */}
       <section className="py-20 md:py-24 animated-background overflow-hidden">
          <div className="container text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">AgentOS: The 10 Core Engines of Your Automated Workforce</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                From initial contact to closed deal, see how AgentOS intelligently handles every step of the process.
            </p>
          </div>
          <VerticalWorkflow />
        </section>

         {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-24 bg-black">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                    <p className="mt-2 text-muted-foreground text-lg">Find answers to common questions about AgentOS.</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                         <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

        {/* CTA Banner Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="rounded-lg gradient-background p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary-foreground">Ready to Revolutionize Your Business?</h2>
              <p className="mt-2 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Join the future of automation. Get started with AgentOS today and see the difference.
              </p>
              <div className="mt-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
