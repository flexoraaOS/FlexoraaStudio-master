
'use client';

import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Sparkles, Send, Loader2, BrainCircuit, BarChart, FileText } from "lucide-react";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export const AiChatAnalysis = () => {
    const pathname = usePathname();
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai' | 'thinking', content: React.ReactNode }>>([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    const handleSendMessage = (content: string) => {
        if (!content.trim()) return;

        const newUserMessage = { type: 'user' as const, content };
        setMessages(prev => [...prev, newUserMessage, { type: 'thinking', content: '' }]);
        setInput('');

        // Simulate AI response based on prompt
        setTimeout(() => {
            let aiResponse = "I'm not sure how to answer that. Try asking about a specific lead, campaign performance, or revenue forecasts.";
            const lowerContent = content.toLowerCase();

            // Manager Copilot Keywords
            if (lowerContent.includes("revenue") || lowerContent.includes("campaign") || lowerContent.includes("performance") || lowerContent.includes("rate") || lowerContent.includes("forecast")) {
                if (lowerContent.includes("revenue by sdr")) {
                  aiResponse = "For this week:\n• Samantha Ray: $8,250 (↑5%)\n• Alex Green: $6,100 (↓2%)\n• Ben Carter: $4,500 (↑8%)"
                } else if (lowerContent.includes("highest-quality leads") || lowerContent.includes("best campaign")) {
                  aiResponse = "The 'Q3-2024 Promo' campaign is generating the highest quality leads with an average score of 92, resulting in a 25% higher booking rate."
                } else if (lowerContent.includes("closing rate")) {
                  aiResponse = "This month's closing rate is 14.8%, which is a 2.1% increase compared to last month. Keep up the great work!"
                } else if (lowerContent.includes("forecast revenue")) {
                   aiResponse = "Based on the current pipeline and close rates, we forecast $68,500 in revenue for the next 30 days."
                }
            } 
            // SDR Assistant Keywords
            else if (lowerContent.includes("lead") || lowerContent.includes("script") || lowerContent.includes("interactions") || lowerContent.includes("call")) {
                 if (lowerContent.includes("summarize")) {
                  aiResponse = "This lead is highly interested in your enterprise plan. They've asked for a detailed feature comparison with Competitor X and are keen on custom integration possibilities. Their budget is flexible for the right solution."
                } else if (lowerContent.includes("script")) {
                  aiResponse = "Sure, here's a script for this lead: 'Hi [Lead Name], this is [Your Name] from Flexoraa. I saw you were interested in our enterprise plan and wanted to quickly follow up on the feature comparison you asked about. Is now a good time to chat for 2 minutes?'"
                } else if (lowerContent.includes("interactions")) {
                  aiResponse = "Last 3 interactions:\n1. Clicked on 'Enterprise Plan' email link (2 hours ago)\n2. Visited pricing page (1 hour ago)\n3. Watched 80% of demo video (30 minutes ago)"
                } else if (lowerContent.includes("best time")) {
                   aiResponse = "Based on their activity, the best time to call would be between 2:00 PM and 4:00 PM today."
                }
            }
            
            setMessages(prev => [...prev.filter(m => m.type !== 'thinking'), { type: 'ai' as const, content: aiResponse }]);
        }, 1500);
    };

    const handlePromptClick = (prompt: string) => {
        setMessages([]); // Clear previous conversation
        handleSendMessage(prompt);
    }
    
     React.useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const sdrPrompts = [
        { icon: <FileText className="h-5 w-5 text-primary" />, title: "Summarize Lead", prompt: "Summarize this lead’s intent." },
        { icon: <BarChart className="h-5 w-5 text-primary" />, title: "Analyze Interactions", prompt: "What are the last 3 interactions for this lead?" },
    ];

     const managerPrompts = [
        { icon: <BrainCircuit className="h-5 w-5 text-primary" />, title: "Campaign Engagement", prompt: "Which campaign has the best engagement?" },
        { icon: <BarChart className="h-5 w-5 text-primary" />, title: "Platform Performance", prompt: "Compare performance of IG vs FB." },
    ];

    const isSdrDashboard = pathname.includes('sdr');
    const promptsToShow = isSdrDashboard ? sdrPrompts : managerPrompts;
    const placeholderText = isSdrDashboard 
        ? "Ask for a script or lead summary..."
        : "Ask about a campaign or forecast revenue...";


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Card className="flex flex-col h-full cursor-pointer transition-all duration-300 group overflow-hidden relative border-primary/20 hover:border-primary/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-subtle"></div>
                     <div className="absolute inset-0 bg-[url(/grid.svg)] bg-repeat [mask-image:linear-gradient(to_bottom,white_10%,transparent_80%)] opacity-20"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                           {isSdrDashboard ? "SDR Assistant" : "Manager Copilot"}
                        </CardTitle>
                        <CardDescription>Your AI-powered strategic assistant.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end space-y-4 relative z-10">
                         <div className="bg-background/50 p-3 rounded-lg text-sm border">
                            <p className="font-medium mb-2">Click to start chatting...</p>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0 h-[70vh] flex flex-col">
                 <DialogHeader className="p-4 border-b bg-secondary/50">
                    <DialogTitle className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border-2 border-primary/50">
                            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="glowing orb" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                            <span className="font-headline font-bold text-lg">{isSdrDashboard ? "SDR Assistant" : "Manager Copilot"}</span>
                            <p className="text-sm font-normal text-green-400 flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Online
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div ref={scrollAreaRef} className="flex-1 space-y-6 overflow-y-auto p-4">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <Bot className="h-12 w-12 mb-4 text-primary/50"/>
                             <p className="font-semibold text-lg text-foreground">Ask for execution support or strategic analysis.</p>
                             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-left w-full">
                                {promptsToShow.map((prompt, i) => (
                                    <button key={i} onClick={() => handlePromptClick(prompt.prompt)} className="p-3 border rounded-lg hover:bg-secondary transition-colors text-left flex items-start gap-3">
                                        <div className="p-2 bg-primary/10 rounded-md mt-1">{prompt.icon}</div>
                                        <div>
                                            <p className="font-semibold text-sm text-foreground">{prompt.title}</p>
                                            <p className="text-xs text-muted-foreground">{prompt.prompt}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div key={index} className={cn("flex items-start gap-3", message.type === 'user' ? 'justify-end' : '')}>
                                {message.type === 'ai' && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="glowing orb" />
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                )}
                                {message.type === 'thinking' && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="glowing orb" />
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "p-3 rounded-lg max-w-sm",
                                    message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary',
                                    message.type === 'thinking' && 'bg-secondary'
                                )}>
                                    {message.type === 'thinking' ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                        </div>
                                    ) : (
                                        <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">{message.content}</div>
                                    )}
                                </div>
                                {message.type === 'user' && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="p-4 border-t">
                    <div className="relative">
                        <Input
                            placeholder={placeholderText}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendMessage(input);
                            }}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => handleSendMessage(input)}
                            disabled={!input.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

    