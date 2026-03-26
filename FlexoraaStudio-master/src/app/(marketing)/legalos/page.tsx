
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Bot, Scale, BookText, FileCheck, CalendarClock, MessageCircle, DollarSign, Microscope, Pilcrow, RedoDot } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const legalosBenefits = [
    {
        icon: <BookText className="h-10 w-10" />,
        title: "Research & Precedent Finder",
        description: "Answer queries with verified judgments, statutes, or regulations, complete with citations. If no authority exists, it clearly states it.",
    },
    {
        icon: <Pilcrow className="h-10 w-10" />,
        title: "Drafting & Document Generation",
        description: "Create contracts, petitions, notices, and briefs in a professional legal style, with tracked clauses and risk notes.",
    },
    {
        icon: <RedoDot className="h-10 w-10" />,
        title: "Contract Review & Redlining",
        description: "Compare documents against a clause playbook, highlighting risks and suggesting fallback clauses with legal justification.",
    },
    {
        icon: <CalendarClock className="h-10 w-10" />,
        title: "Case Preparation & Timeline Builder",
        description: "Extract facts and events from documents to build chronological timelines with linked evidence for seamless case preparation.",
    },
    {
        icon: <MessageCircle className="h-10 w-10" />,
        title: "Client Communication Assistant",
        description: "Generate clear, compliant client updates that always require lawyer approval before being sent, ensuring professionalism.",
    },
    {
        icon: <DollarSign className="h-10 w-10" />,
        title: "Billing & Activity Tracker",
        description: "Automatically suggests time entries based on actions performed within the system, providing clear justifications for each entry.",
    },
];

const workflowSteps = [
    { icon: <Microscope />, title: "1. Research & Analysis", description: "Start with AI-powered research to find verified precedents and statutes instantly." },
    { icon: <FileCheck />, title: "2. Document Drafting & Review", description: "Generate or review legal documents, with AI highlighting risks and suggesting clauses." },
    { icon: <CalendarClock />, title: "3. Case & Timeline Building", description: "Organize facts and evidence into a clear, chronological timeline for case preparation." },
    { icon: <MessageCircle />, title: "4. Client Communication", description: "Draft compliant client updates for lawyer review and approval, maintaining clear communication." },
    { icon: <DollarSign />, title: "5. Billing & Justification", description: "Track all activities and auto-generate detailed time entries with justifications for accurate billing." },
];

const faqs = [
    {
        question: "How does LegalOS ensure confidentiality?",
        answer: "Confidentiality is our top priority. All data is processed within a secure, isolated workspace. LegalOS is designed to never expose private or privileged information, adhering to strict data protection protocols."
    },
    {
        question: "Can LegalOS provide legal advice?",
        answer: "No. LegalOS is a legal intelligence tool, not a lawyer. It does not provide legal advice. All outputs are framed as 'for lawyer review' and are intended to assist, not replace, a qualified legal professional's judgment."
    },
    {
        question: "How does the research feature work?",
        answer: "Our research and precedent finder uses a verified database of judgments, statutes, and regulations. Every piece of information it provides comes with a full citation. If it cannot find sufficient authority, it will clearly state so, preventing hallucinations."
    },
    {
        question: "Is the document drafting tool customizable?",
        answer: "Yes. While LegalOS can generate standard legal documents, it can also be trained on your firm’s specific clause playbooks and templates to ensure all generated documents align with your firm's style and risk tolerance."
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

const BenefitNode = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <div ref={ref} className={cn("transition-opacity duration-500", isInView ? "opacity-100" : "opacity-0")}>
      <div className="flex flex-col items-start text-left h-full p-6 bg-card border rounded-lg shadow-sm hover:shadow-primary/10">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="font-headline text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
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

export default function LegalOSPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            <span className="gradient-text">LegalOS:</span> Your AI Legal Co-Pilot
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            A secure legal intelligence system for lawyers, law firms, and in-house legal teams. Empowering legal professionals with research, drafting, and workflow automation.
          </p>
          <div className="mt-8">
            <Button size="lg" className="gradient-background text-primary-foreground transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95" asChild>
              <Link href="/contact-sales">Request a Demo <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-24 bg-black">
        <div className="container space-y-20">
            <div>
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Core Capabilities</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-lg">
                        LegalOS is designed to augment, not replace, legal expertise.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {legalosBenefits.map((benefit, index) => (
                            <BenefitNode 
                                key={index}
                                icon={benefit.icon}
                                title={benefit.title}
                                description={benefit.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* How it works Section */}
       <section className="py-20 md:py-24 overflow-hidden">
          <div className="container text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">The LegalOS Workflow</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                From research to billing, LegalOS provides a seamless, integrated process.
            </p>
          </div>
          <VerticalWorkflow />
        </section>

         {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-24 bg-black">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                    <p className="mt-2 text-muted-foreground text-lg">Find answers to common questions about LegalOS.</p>
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
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary-foreground">Empower Your Legal Practice</h2>
              <p className="mt-2 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Discover how LegalOS can enhance your firm's efficiency and precision.
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
