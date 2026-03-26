
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Bot, CheckCircle, MessagesSquare, BarChart, Zap, ShieldCheck, Flame, BarChart2, Globe, Wallet, Languages, ZapIcon, Briefcase, UploadCloud, GitPullRequest, KanbanSquare, Phone, BarChart3, Filter, Database, Lock, Download, Users, Trophy, Sparkles, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from '@/lib/utils';
import { AnimatedStat } from '@/components/ui/animated-stat';


const useInView = (ref: React.RefObject<Element>, options?: IntersectionObserverInit) => {
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
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

const aboutFeatures = [
  {
    icon: ShieldCheck,
    title: "End-to-End Lead Automation",
    description: "From AI-powered verification and qualification on WhatsApp to a gamified SDR leaderboard, LeadOS manages your entire sales funnel.",
    imageSrc: "https://picsum.photos/600/400",
    imageHint: "sales funnel"
  },
  {
    icon: MessagesSquare,
    title: "Omnichannel Conversational AI",
    description: "AgentOS unifies your Instagram, Facebook, and WhatsApp DMs into one smart inbox where an AI that sells engages leads 24/7.",
    imageSrc: "https://picsum.photos/600/400",
    imageHint: "social media icons"
  },
  {
    icon: BarChart2,
    title: "Deep Performance Analytics",
    description: "Gain actionable insights with built-in ROI calculators, campaign intelligence panels, and revenue forecasting dashboards.",
    imageSrc: "https://picsum.photos/600/400",
    imageHint: "dashboard analytics"
  }
];


const flags = [
  { code: 'in', name: 'India' },
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ae', name: 'UAE' },
  { code: 'ca', name: 'Canada' },
  { code: 'sg', name: 'Singapore' },
  { code: 'sa', name: 'Saudi Arabia' },
  { code: 'de', name: 'Germany' },
  { code: 'id', name: 'Indonesia' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'br', name: 'Brazil' },
  { code: 'au', name: 'Australia' },
  { code: 'fr', name: 'France' },
  { code: 'it', name: 'Italy' },
  { code: 'my', name: 'Malaysia' },
  { code: 'za', name: 'South Africa' },
  { code: 'eg', name: 'Egypt' },
  { code: 'tr', name: 'Turkey' },
  { code: 'mx', name: 'Mexico' },
  { code: 'ng', name: 'Nigeria' },
  { code: 'pk', name: 'Pakistan' },
  { code: 'bd', name: 'Bangladesh' },
  { code: 'ke', name: 'Kenya' },
  { code: 'es', name: 'Spain' },
  { code: 'ph', name: 'Philippines' },
];

const FlagMarquee = () => {
    return (
         <div className="flex space-x-6">
            {[...flags, ...flags].map((flag, index) => (
                <Image
                    key={`${flag.code}-${index}`}
                    src={`https://flagcdn.com/h40/${flag.code}.png`}
                    alt={`${flag.name} flag`}
                    width={50}
                    height={30}
                    className="h-8 w-auto rounded-md object-contain shadow-lg transition-transform duration-200 hover:scale-110"
                />
            ))}
        </div>
    )
}

const GlobalIntelligenceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section ref={ref} className="bg-background text-foreground py-20 md:py-24 overflow-hidden">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              Trusted by Sales Teams in <span className="text-accent"><AnimatedStat target={25} suffix="+" /></span> Countries
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              From India to the USA, Flexoraa OS is the go-to system for growth-focused brands.
            </p>
            <div className="relative">
                <div className="animate-marquee whitespace-nowrap">
                   <FlagMarquee />
                </div>
                 <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-background to-transparent" />
                 <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-background to-transparent" />
            </div>
        </div>
    </section>
  );
};


export default function Home() {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
              setActiveFeatureIndex(index);
            }
          });
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );

      const currentFeatureRefs = featureRefs.current;
      currentFeatureRefs.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => {
        currentFeatureRefs.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      };
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center animated-background">
          <div className="container text-center py-20">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              Flexoraa <span className="gradient-text whitespace-nowrap">Intelligence OS</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Our AI workforce automates 70% of your company's tasks, freeing your team to focus on high-impact work.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="gradient-background text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95" asChild>
                <Link href="/leados">Explore LeadOS <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95" asChild>
                <Link href="/agentos">Discover AgentOS</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-24 bg-black">
          <div className="container grid md:grid-cols-2 gap-12 md:gap-20 items-start max-w-6xl mx-auto">
             <div className="md:sticky top-24">
                <h2 className="text-3xl font-bold font-headline mb-4">What is Flexoraa Execution OS?</h2>
                 <p className="text-muted-foreground mb-8 text-lg">
                    Flexoraa is an Execution OS—a suite of AI agents designed to automate up to 70% of your company's manual tasks. Instead of juggling multiple tools, our specialized AI models handle entire departmental functions.
                    <br/><br/>
                    <strong>LeadOS</strong> automates your entire sales funnel—from verifying leads to qualifying them on WhatsApp.
                    <strong>AgentOS</strong> unifies customer conversations into a single inbox where a persuasive AI not only answers questions but actively sells and books appointments.
                </p>
              <div className="relative aspect-video">
                 {aboutFeatures.map((feature, index) => (
                    <Image
                        key={feature.title}
                        src={feature.imageSrc}
                        alt={feature.title}
                        width={600}
                        height={400}
                        className={cn(
                            "rounded-lg shadow-2xl transition-opacity duration-500 ease-in-out object-cover absolute inset-0",
                            activeFeatureIndex === index ? "opacity-100" : "opacity-0"
                        )}
                        data-ai-hint={feature.imageHint}
                    />
                 ))}
              </div>
            </div>
            <div className="space-y-24 md:space-y-48 mt-8 md:mt-0">
              {aboutFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={(el) => (featureRefs.current[index] = el)}
                  data-index={index}
                  className={cn(
                      "transition-opacity duration-500",
                      activeFeatureIndex === index ? "opacity-100" : "opacity-40"
                  )}
                >
                  <div className="flex gap-4 items-center mb-4">
                      <div className="p-3 rounded-md bg-accent/10 flex-shrink-0">
                          <feature.icon className="h-6 w-6 text-accent"/>
                      </div>
                      <h3 className="font-headline text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* AI Suite Models Section */}
        <section id="features" className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Our AI Suite</h2>
              <p className="mt-2 text-muted-foreground text-lg">Two powerful solutions to cover all your automation needs.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-md bg-accent/10"><BarChart className="h-8 w-8 text-accent" /></div>
                    <CardTitle className="font-headline text-2xl">LeadOS</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The ultimate sales development representative. LeadOS verifies, engages, and scores leads via WhatsApp, booking appointments directly into your calendar.
                  </p>
                   <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> AI Lead Verification & Scoring</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> Automated WhatsApp Engagement</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> Gamified SDR Performance Dashboards</li>
                   </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="p-0 h-auto text-accent">
                    <Link href="/leados">Learn more about LeadOS <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-md bg-accent/10"><MessagesSquare className="h-8 w-8 text-accent" /></div>
                    <CardTitle className="font-headline text-2xl">AgentOS</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your multi-channel AI agent. AgentOS connects to WhatsApp, Instagram, and Facebook to provide instant, intelligent responses and support.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> Unified Omnichannel Inbox</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> Conversational AI That Sells</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-accent" /> Automated Appointment Booking</li>
                   </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="p-0 h-auto text-accent">
                    <Link href="/agentos">Learn more about AgentOS <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24 bg-black">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Feedback from Our Customers</h2>
              <p className="mt-2 text-muted-foreground text-lg">See how Flexoraa Intelligence OS is transforming companies.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <p>"LeadOS increased our qualified leads by 300% in the first quarter. It's a game-changer for our sales team."</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-semibold">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">CEO, Tech Innovators</p>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p>"The ability of AgentOS to handle customer queries across multiple platforms is incredible. Our support costs are down 40%."</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-sm text-muted-foreground">Head of Operations, MarketFinders</p>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p>"Flexoraa's automation is seamless. We're closing deals faster and our customers are happier. I can't recommend it enough."</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-semibold">Sarah Adams</p>
                    <p className="text-sm text-muted-foreground">Founder, Creative Solutions</p>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="pt-6">
                   <p>"The AI-driven lead scoring is scarily accurate. It has completely changed how we prioritize our sales efforts."</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-semibold">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">Sales Director, Growth Co.</p>
                  </div>
                </CardFooter>
              </Card>
               <Card>
                <CardContent className="pt-6">
                   <p>"We've reduced our SDR costs by over 50% without a drop in performance. LeadOS is the real deal."</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-semibold">David Chen</p>
                    <p className="text-sm text-muted-foreground">CFO, Enterprise Solutions</p>
                  </div>
                </CardFooter>
              </Card>
               <Card>
                <CardContent className="pt-6">
                   <p>"The best part is the human handoff. The AI handles 90% of the conversation, and our team steps in at the perfect moment to close."</p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-semibold">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Customer Success Manager, SaaSify</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <GlobalIntelligenceSection />

        {/* CTA Banner Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="rounded-lg gradient-background p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary-foreground">Ready to Revolutionize Your Business?</h2>
              <p className="mt-2 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Join the future of automation. Get started with Flexoraa Intelligence OS today and see the difference.
              </p>
              <div className="mt-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/quote">Request a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
