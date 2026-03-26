
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail, Instagram, Facebook, Bot, BrainCircuit, Users, CalendarCheck, Workflow, Search, Tag, Lock, UserCheck, Bell, BarChart2, BarChart3, GitBranch, Languages, Sparkles, CheckCircle, Trophy, TrendingUp, TrendingDown, Milestone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedStat } from '@/components/ui/animated-stat';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// --- Data ---

const heroStats = [
  { value: 3, suffix: 'x', label: 'Faster Response' },
  { value: 40, suffix: '%', label: 'More Conversions' },
  { value: 100, suffix: '%', label: 'Lead Capture' },
];

const channels = [
  { icon: <MessageCircle className="h-5 w-5" />, name: "WhatsApp", color: "text-green-400 bg-green-500/10 border-green-500/20" },
  { icon: <Instagram className="h-5 w-5" />, name: "Instagram", color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  { icon: <Facebook className="h-5 w-5" />, name: "Facebook", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { icon: <Mail className="h-5 w-5" />, name: "Gmail", color: "text-red-400 bg-red-500/10 border-red-500/20" },
];

const agentosBenefits = [
  {
    icon: <UserCheck className="h-10 w-10" />,
    title: "Unified Omnichannel Inbox",
    description: "Pull DMs, messages, and comments from Instagram, Facebook, and WhatsApp into one powerful dashboard. No more switching between platforms.",
    stat: { target: 3, suffix: "x", label: "Faster Response Time", trend: "up" as const }
  },
  {
    icon: <BrainCircuit className="h-10 w-10" />,
    title: "Conversational AI That Sells",
    description: "Our AI uses psychological triggers, persuasive language, and smart intent detection to guide leads to book—just like your top closer.",
    stat: { target: 40, suffix: "%", label: "Increase in Lead Conversion", trend: "up" as const }
  },
  {
    icon: <Workflow className="h-10 w-10" />,
    title: "Intelligent Lead Routing",
    description: "Automatically assign leads to the right SDRs based on platform, product, or lead temperature. Full control, zero chaos.",
    stat: { target: 98, suffix: "%", label: "Lead Assignment Accuracy", trend: "up" as const }
  },
  {
    icon: <CalendarCheck className="h-10 w-10" />,
    title: "Automated Appointment Booking",
    description: "Once the AI qualifies a lead, AgentOS sends a branded calendar link to lock in the next step. Stop chasing, start closing.",
    stat: { target: 75, suffix: "%", label: "Reduction in Scheduling Time", trend: "down" as const }
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
    stat: { target: 25, suffix: "%", label: "Increase in Strategy Effectiveness", trend: "up" as const }
  },
  {
    icon: <MessageCircle className="h-10 w-10" />,
    title: "Social Listening & Engagement",
    description: "AgentOS monitors mentions, tags, comments, and UGC on Instagram and Facebook. Reply instantly or flag hot conversations.",
    stat: { target: 50, suffix: "%", label: "Increase in Social Engagement", trend: "up" as const }
  },
  {
    icon: <BarChart2 className="h-10 w-10" />,
    title: "Actionable Performance Analytics",
    description: "See which posts are driving inquiries, which stories generate clicks, and what time your audience is most active to inform your sales strategy.",
    stat: { target: 20, suffix: "%", label: "More Data-Driven Decisions", trend: "up" as const }
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
    stat: { target: 15, suffix: "%", label: "Higher Engagement Over Time", trend: "up" as const }
  },
  {
    icon: <Languages className="h-10 w-10" />,
    title: "True Multilingual & Multicultural AI Engagement",
    description: "Our AI speaks your customers' language—literally. It understands cultural nuances and communicates in 95+ languages, ensuring your message always hits home.",
    stat: { target: 95, suffix: "+", label: "Languages Supported", trend: "up" as const }
  },
];

const workflowSteps = [
  { icon: <GitBranch />, title: "OmniLink Hub", description: "Every inbound message, lead, and DM is instantly captured and centralized." },
  { icon: <Bot />, title: "EngageIQ Conversations", description: "AI-powered chats adapt to each lead's tone and urgency, keeping interest alive 24/7." },
  { icon: <Workflow />, title: "Smart Route Logic", description: "Directs leads to the right closer or automation flow for maximum speed and precision." },
  { icon: <CalendarCheck />, title: "AutoLink Scheduler", description: "High-intent leads receive instant booking options, locking appointments without manual follow-up." },
  { icon: <Users />, title: "SDR Assist Alerts", description: "Your sales team is notified at the optimal time — with key context in one view." },
  { icon: <BarChart3 />, title: "Signal Map Engine", description: "Identifies where your campaigns and content are creating the most momentum." },
  { icon: <TrendingUp />, title: "Insight Pulse", description: "Weekly growth reports with trends, top opportunities, and action recommendations." },
  { icon: <Search />, title: "Engagement Sentinel", description: "Monitors your brand presence and joins high-value conversations in real time." },
  { icon: <Milestone />, title: "Dynamic Flow Architect", description: "Learns from every interaction to keep refining lead journeys for higher conversions." },
  { icon: <Languages />, title: "Global Voice", description: "Engages leads in multiple languages, expanding your market reach instantly." },
];

const faqs = [
  { question: "Which channels does AgentOS support?", answer: "AgentOS integrates with WhatsApp (for inbound messages), Instagram DMs, Facebook Messenger, and Gmail. This allows you to manage all your customer conversations from a single, unified inbox." },
  { question: "How 'smart' is the conversational AI?", answer: "Our AI goes beyond simple keyword matching. It understands context, sentiment, and user intent. It's trained on psychological sales frameworks (like FAB and PAS) to not only answer questions but also to persuade, handle objections, and guide conversations toward a booking or sale." },
  { question: "Can I use my own branding on reports?", answer: "Yes! Our white-labeled weekly reports can be customized with your logo and branding. It's a great way to provide value to your clients or stakeholders with professional, data-driven insights." },
  { question: "What happens if the AI can't answer a question?", answer: "AgentOS has a seamless human handoff process. If it encounters a query it cannot handle or identifies a high-value lead, it can automatically flag the conversation and assign it to a human agent on your team. The agent receives the full context of the AI's conversation, so there's no awkward repetition for the customer." },
];

// --- Hooks ---

const useInView = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, options);
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [ref, options]);
  return isInView;
};

// --- Components ---

const StatNode = ({ icon, target, suffix, label, title, description, isTime = false, trend }: { icon: React.ReactNode; target: number; suffix: string; label: string; title: string; description: string; isTime?: boolean; trend?: 'up' | 'down' }) => {
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
                <AnimatedStat target={target} suffix={suffix} className="text-4xl lg:text-5xl font-bold text-foreground font-headline" />
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

const VerticalWorkflow = () => (
  <div className="relative max-w-2xl mx-auto px-4">
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border/20">
      <div className="sticky top-1/2 -translate-y-1/2 h-20 w-full">
        <div className="absolute top-0 w-0.5 h-full bg-accent animate-line-draw" />
      </div>
    </div>
    <div className="space-y-16 relative">
      {workflowSteps.map((step, index) => <WorkflowNode key={index} {...step} index={index} />)}
    </div>
  </div>
);

const WorkflowNode = ({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.5 });

  return (
    <div ref={ref} className={cn("flex items-start gap-4 md:gap-8 transition-opacity duration-700 ease-out", isInView ? "opacity-100" : "opacity-0")}>
      <div className="w-1/2 md:hidden" />
      <div className={cn("w-1/2 md:w-full", index % 2 === 0 ? "md:text-left" : "md:text-right")}>
        <div className="p-4 md:p-6 rounded-lg bg-card border shadow-lg hover:shadow-primary/20 transition-shadow">
          <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 text-primary">{title}</h3>
          <p className="text-muted-foreground text-sm md:text-base">{description}</p>
        </div>
      </div>
      <div className="relative w-12 h-12 flex-shrink-0">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping-slow" />
        <div className="relative w-full h-full bg-background rounded-full border-2 border-primary flex items-center justify-center text-primary">
          {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
        </div>
      </div>
      <div className="w-1/2 hidden md:block" />
    </div>
  );
};

export default function AgentOSPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { threshold: 0.3 });

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-36 animated-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-400 text-sm font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Multichannel AI Sales Agent
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter max-w-4xl mx-auto leading-[1.1]">
            One AI. <span className="gradient-text">Every Channel.</span> Zero Missed Leads.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            AgentOS engages customers across WhatsApp, Instagram, Facebook & Gmail with a single intelligent AI workforce that never sleeps.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-background text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95" asChild>
              <Link href="/login">Start Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
            {channels.map((ch, i) => (
              <div key={i} className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-transform hover:scale-105", ch.color)}>
                {ch.icon} {ch.name}
              </div>
            ))}
          </div>
          <div ref={statsRef} className="mt-12 grid grid-cols-3 max-w-lg mx-auto gap-8">
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                  {statsInView && <AnimatedStat target={stat.value} suffix={stat.suffix} className="text-3xl md:text-4xl font-bold font-headline" />}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section — Original StatNode Design */}
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
                    trend={benefit.stat.trend}
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

      {/* Social Proof */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium">Powering AI sales agents for 500+ businesses</span>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-muted-foreground text-sm flex-wrap">
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> 4 Channels Unified</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> 24/7 AI Coverage</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> Seamless Handoff</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-24 animated-background">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted-foreground text-lg">Find answers to common questions about AgentOS.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="relative rounded-2xl gradient-background p-8 md:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold font-headline text-primary-foreground">Ready to Revolutionize Your Business?</h2>
              <p className="mt-3 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Join the future of automation. Get started with AgentOS today and see the difference.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/login">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link href="/contact-sales">Talk to Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
