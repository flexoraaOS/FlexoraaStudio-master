
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, UploadCloud, Bot, MessageSquare, Flame, CalendarCheck, BarChart2, Wallet, TrendingUp, TrendingDown, ShieldCheck, Search, Filter, Lock, Download, Users, Trophy, GitBranch, GitPullRequest, Phone, KanbanSquare, Languages, Zap, CheckCircle, Share2, ReplyAll, Sigma, ListChecks } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedStat } from '@/components/ui/animated-stat';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- Data ---

const heroStats = [
  { value: 99, suffix: '%', label: 'Spam Eliminated' },
  { value: 43, suffix: '%', label: 'Higher Conversion' },
  { value: 10, suffix: 'x', label: 'ROI Potential' },
];

const leadosBenefits = [
  {
    icon: <ShieldCheck className="h-10 w-10" />,
    title: "Spam-Proof Your Pipeline",
    description: "Our AI pings every number with advanced verification tech, instantly filtering out fake, inactive, or switched-off leads. Stop wasting time and money on dead ends.",
    stat: { target: 99, suffix: "%", label: "Spam Lead Elimination", trend: "up" as const }
  },
  {
    icon: <Flame className="h-10 w-10" />,
    title: "Automated Lead Qualification",
    description: "The AI engages leads on WhatsApp and intelligently categorizes them as HOT, WARM, or COLD based on their real-time responses and intent. Your team knows exactly who to prioritize.",
    stat: { target: 43, suffix: "%", label: "Higher Conversion Rate", trend: "up" as const }
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: "Dynamic Lead Scoring Engine",
    description: "Each lead gets a dynamic score based on interest, behavior, and campaign source. Your SDRs know who to chase first, maximizing their impact and closing speed.",
    stat: { target: 80, suffix: "%", label: "Faster Lead Prioritization", trend: "up" as const }
  },
  {
    icon: <Bot className="h-10 w-10" />,
    title: "AI-Generated Smart Replies",
    description: "Save hours with AI that drafts smart, conversion-optimized WhatsApp messages in your brand's tone. Eliminate writer's block and maintain consistent quality.",
    stat: { target: 95, suffix: "%", label: "Less Time on Follow-ups", trend: "down" as const }
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
  {
    icon: <CalendarCheck className="h-10 w-10" />,
    title: "Automated Follow-Up Calendar",
    description: "Never miss a follow-up again. LeadOS provides auto-reminders and scheduling built right into your SDR's WhatsApp workflow, ensuring no lead falls through the cracks.",
    stat: { target: 100, suffix: "%", label: "Follow-up Rate Maintained", trend: "up" as const }
  },
  {
    icon: <GitPullRequest className="h-10 w-10" />,
    title: "Full Lead Timeline & Logs",
    description: "Track the full journey of every lead with a detailed timeline, including every WhatsApp interaction. Complete visibility builds trust and speeds up closing.",
    stat: { target: 360, suffix: "°", label: "Complete Lead Visibility", isTime: true }
  },
  {
    icon: <KanbanSquare className="h-10 w-10" />,
    title: "Drag-and-Drop Pipeline",
    description: "Visually manage your sales process by moving leads between stages like Trello or HubSpot. A simple, satisfying, and highly efficient SDR experience.",
    stat: { target: 50, suffix: "%", label: "Increase in SDR Efficiency", trend: "up" as const }
  },
  {
    icon: <Phone className="h-10 w-10" />,
    title: "One-Click Engagement",
    description: "Call or message a lead directly from the dashboard with a single click. No more switching screens, copy-pasting numbers, or manual dialing. Pure speed.",
    stat: { target: 70, suffix: "%", label: "Reduction in Mundane Tasks", trend: "down" as const }
  },
  {
    icon: <Filter className="h-10 w-10" />,
    title: "Drop-Off Analysis",
    description: "Pinpoint exactly where and why leads are slipping away from your funnel. Fix leaks with actionable data, not assumptions, and improve your process.",
    stat: { target: 25, suffix: "%", label: "Reduction in Lead Drop-off", trend: "down" as const }
  },
  {
    icon: <Search className="h-10 w-10" />,
    title: "Campaign Intelligence Panel",
    description: "Discover which campaign, keyword, or landing page is delivering your best leads. Optimize your ad spend and stop wasting money on bad traffic.",
    stat: { target: 450, suffix: "+%", label: "Return on Investment", trend: "up" as const }
  },
  {
    icon: <Lock className="h-10 w-10" />,
    title: "Lead Privacy & Access Control",
    description: "Your data is yours. With end-to-end encryption and role-based permissions, you control who sees what.",
    stat: { target: 100, suffix: "%", label: "Data Security" }
  },
  {
    icon: <Download className="h-10 w-10" />,
    title: "One-Click Data Export",
    description: "Export filtered lead lists to CSV or Excel anytime. You have full ownership of your data—no lock-in, ever. Your data is always yours.",
    stat: { target: 1, suffix: "-Click", label: "Data Portability", isTime: true }
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Role-Based Dashboards",
    description: "Managers get a high-level view of funnel reports, ROI, and team performance. SDRs get a streamlined toolkit designed for high-speed conversion and lead handling.",
    stat: { target: 2, suffix: "X", label: "Faster Decision Making", trend: "up" as const }
  },
  {
    icon: <Wallet className="h-10 w-10" />,
    title: "Built-in ROI Calculator",
    description: "See your return on investment in real-time, calculated per campaign, per SDR, or for the entire operation. Make data-driven decisions with confidence.",
    stat: { target: 90, suffix: "%", label: "SDR Cost Reduction", trend: "down" as const }
  },
];

const workflowSteps = [
  { icon: <UploadCloud />, title: "1. Upload Data", description: "CSV import or CRM integration" },
  { icon: <ShieldCheck />, title: "2. AI-Based Lead Verification", description: "Ping-back or missed call tech filters out fake/inactive numbers" },
  { icon: <Share2 />, title: "3. AI WhatsApp Outreach", description: "Message sent via Flexoraa or client's WABA" },
  { icon: <ReplyAll />, title: "4. AI-Powered Replies", description: "Auto handling of replies using brand tone + sales psychology" },
  { icon: <Sigma />, title: "5. Lead Scoring Engine", description: "Scored dynamically into Hot, Warm, Cold" },
  { icon: <CalendarCheck />, title: "6. Follow-Up Calendar", description: "Auto reminders and WhatsApp follow-up logic" },
  { icon: <ListChecks />, title: "7. Lead Timeline + Logs", description: "Complete chat history for trust + traceability" },
  { icon: <KanbanSquare />, title: "8. Pipeline Movement", description: "Drag-and-drop lead stage updates by SDR" },
  { icon: <BarChart2 />, title: "9. Dashboard + Export + Reporting", description: "Filter leads, export, view ROI, access campaign insights" },
];

const faqs = [
  { question: "How does the AI verify leads?", answer: "LeadOS uses a combination of ping-back technology and number validation checks to confirm if a phone number is active and reachable on WhatsApp. This multi-step process effectively filters out inactive or invalid contacts before you spend any money on outreach." },
  { question: "Can I customize the lead scoring rules?", answer: "Yes, on our Pro and Enterprise plans. While our default model is trained on millions of interactions, you can work with our team to adjust the scoring logic based on keywords, industries, or specific user behaviors that are unique to your business." },
  { question: "Is my lead data secure?", answer: "Absolutely. Data security is our top priority. All data is encrypted in transit and at rest. With our Lead Privacy & Access Control features, you have granular control over which team members can see specific lead lists, ensuring confidentiality and preventing data leakage." },
  { question: "How does the drag-and-drop pipeline work?", answer: "It works just like a physical whiteboard or a tool like Trello. Leads appear as cards in different columns representing stages (e.g., 'New,' 'Contacted,' 'Closed'). Your SDRs can simply click and drag a lead from one column to the next to update their status, which automatically updates all related analytics." },
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

export default function LeadOSPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { threshold: 0.3 });

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-36 animated-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.15),transparent_60%)]" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" /> AI-Powered Lead Automation
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter max-w-4xl mx-auto leading-[1.1]">
            Your Leads. <span className="gradient-text">Verified.</span> Qualified. <span className="gradient-text">Converted.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            LeadOS automates lead engagement from first contact to qualified appointment. Upload leads, and our AI does the rest — 24/7.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gradient-background text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95" asChild>
              <Link href="/login">Start Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
          <div ref={statsRef} className="mt-16 grid grid-cols-3 max-w-lg mx-auto gap-8">
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
          <div>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">LeadOS – Verified Leads. Real Intent. Real Results.</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-lg">
                Built for founders, marketers, and closers who are tired of fake leads and wasted follow-ups.
              </p>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {leadosBenefits.map((benefit, index) => (
                  <StatNode
                    key={index}
                    icon={benefit.icon}
                    target={benefit.stat.target}
                    suffix={benefit.stat.suffix || ''}
                    label={benefit.stat.label}
                    title={benefit.title}
                    description={benefit.description}
                    isTime={benefit.stat.isTime}
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
          <h2 className="text-3xl md:text-4xl font-bold font-headline">LeadOS: From Raw Data to Revenue (9 Core Stages)</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            From raw data to booked appointments, see how LeadOS transforms your sales process with intelligent automation.
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
              <span className="text-sm font-medium">Trusted by 500+ businesses across India</span>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-muted-foreground text-sm flex-wrap">
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> SOC 2 Compliant</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> GDPR Ready</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> 99.9% Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-24 animated-background">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted-foreground text-lg">Find answers to common questions about LeadOS.</p>
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
              <h2 className="text-2xl md:text-4xl font-bold font-headline text-primary-foreground">Ready to Supercharge Your Sales?</h2>
              <p className="mt-3 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Get started with LeadOS today and turn more prospects into profits.
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
