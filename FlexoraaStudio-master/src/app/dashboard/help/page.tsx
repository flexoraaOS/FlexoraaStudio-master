
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Search, Bot, Sparkles, Send } from "lucide-react";

const faqs = [
    {
        question: "How do I connect my WhatsApp Business Account?",
        answer: "You can connect your WABA from the onboarding screen or dashboard settings. We recommend using the 'Connect with Meta' button for a seamless OAuth2 connection. Alternatively, you can manually enter your Business Manager ID, WABA ID, Phone Number ID, and Permanent Access Token found in your Meta Business Suite."
    },
    {
        question: "What is the difference between LeadOS and AgentOS?",
        answer: "LeadOS is a specialized AI for sales outreach. It focuses on verifying, qualifying, and scoring leads via WhatsApp to fill your sales pipeline. AgentOS is a multi-channel AI for customer engagement. It unifies conversations from WhatsApp, Instagram, Facebook, and Gmail into a single inbox to provide support and sell."
    },
    {
        question: "How does the AI lead scoring work?",
        answer: "Our AI analyzes the content and sentiment of lead conversations. It looks for keywords indicating intent, urgency, and budget. Based on these factors, it assigns a score (Hot, Warm, or Cold) to help your sales team prioritize who to talk to first."
    },
    {
        question: "Is my customer data secure?",
        answer: "Yes. Data security is our top priority. All data is encrypted in transit and at rest. We use official APIs from platforms like Meta and Google, and you have full control over your data, including the ability to export it or disconnect services at any time. For more details, please see our Privacy Policy."
    },
    {
        question: "Can I customize the AI's responses?",
        answer: "Yes. In the 'AI Persona & Knowledge Base' section of your dashboard, you can provide specific information about your business, define the AI's tone, and upload documents for it to learn from. This ensures the AI's responses are aligned with your brand voice."
    }
];

export default function HelpPage() {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section>
                <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
                    How can we <span className="gradient-text">help you?</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Find answers instantly. Search our knowledge base or ask our AI assistant.
                </p>
                 <div className="mt-8 max-w-lg mx-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search for answers..." className="pl-10 h-12 text-lg" />
                    </div>
                </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pt-8">
                <div className="container max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold font-headline mb-8">Frequently Asked Questions</h2>
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

                    <div className="lg:col-span-1 space-y-8">
                        <Card className="overflow-hidden">
                             <CardHeader className="bg-secondary/50">
                                <CardTitle className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                                        <AvatarFallback className="bg-primary/20 text-primary">
                                            <Bot className="h-6 w-6"/>
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span>AI Help Assistant</span>
                                        <p className="text-xs font-normal text-green-400 flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            Online
                                        </p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4 flex flex-col h-[30rem]">
                                <div className="flex-grow p-4 bg-secondary rounded-lg text-sm text-muted-foreground flex items-center justify-center text-center">
                                    Your conversation with the AI assistant will appear here.
                                </div>
                                <div className="relative">
                                    <Input placeholder="Ask a question..." className="pr-12"/>
                                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                        <Send className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Contact Support</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground text-sm">
                                    Can't find what you're looking for? Our team is here to help.
                                </p>
                                <div className="space-y-2">
                                    <a href="mailto:support@flexoraaa.com" className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors">
                                        <Mail className="h-5 w-5 text-primary"/>
                                        <span className="text-sm font-medium">support@flexoraaa.com</span>
                                    </a>
                                     <a href="https://wa.me/919123624068" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary transition-colors">
                                        <MessageSquare className="h-5 w-5 text-primary"/>
                                        <span className="text-sm font-medium">Contact on WhatsApp</span>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
