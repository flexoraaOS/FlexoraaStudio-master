
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, MessageSquare, Bot, CalendarCheck, Wifi, Power, Instagram, Facebook, Mail, Search, Users, TrendingUp, CheckCircle, Clock, ArrowUpDown, Calendar as CalendarIcon, Radar, Hand, ThumbsUp, MousePointerClick, RefreshCw, Send, Loader2, Target, Filter, FileText, Wand2, Star, Check, Flame, Trophy, TrendingDown, User, GitCompareArrows, Heart, MessageSquareReply, AtSign, ThumbsDown, GitCommitVertical, Image as ImageIcon, MessageCircleQuestion, Lightbulb, UserX, BrainCircuit, PieChart as PieChartIcon } from "lucide-react";
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export interface Conversation {
    id: string;
    customer: string;
    avatar: string;
    subject: string;
    lastMessage: string;
    channel: 'Instagram' | 'Facebook' | 'WhatsApp' | 'Gmail';
    status: 'Needs Attention' | 'AI Handled' | 'Resolved';
    timestamp: string;
    tags: { text: string; type: 'info' | 'success' | 'warning' | 'default' }[];
    thread: { type: 'user' | 'ai' | 'sdr'; content: string }[];
    fromEmail: string;
    toEmail: string;
    timeWaiting: string;
    engagementScore: number;
    isEscalated?: boolean;
    escalationReason?: string;
    sdr?: string;
}

const getTagStyles = (type: string) => {
    switch (type) {
        case 'success': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'warning': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        case 'info': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        default: return 'bg-secondary text-secondary-foreground';
    }
}

const channelIcons: { [key: string]: JSX.Element } = {
    WhatsApp: <MessageSquare className="h-5 w-5 text-green-500" />,
    Instagram: <Instagram className="h-5 w-5 text-pink-500" />,
    Facebook: <Facebook className="h-5 w-5 text-blue-600" />,
    Gmail: <Mail className="h-5 w-5 text-red-500" />,
};

interface UnifiedInboxProps {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onSelectConversation: (id: string | null) => void;
    onUpdateConversation: (conversation: Conversation) => void;
}

export const UnifiedInbox = ({ conversations, selectedConversation, onSelectConversation, onUpdateConversation }: UnifiedInboxProps) => {
    const { toast } = useToast();
    const [replyContent, setReplyContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [channelFilter, setChannelFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    
    const filteredConversations = useMemo(() => {
        return conversations.filter(convo => {
            const channelMatch = channelFilter === 'All' || convo.channel === channelFilter;
            let statusMatch = statusFilter === 'All' || convo.status === statusFilter;
            if (statusFilter === 'Escalated') {
                statusMatch = convo.isEscalated === true;
            }
            return channelMatch && statusMatch;
        });
    }, [conversations, channelFilter, statusFilter]);

    const messages = selectedConversation ? selectedConversation.thread : [];

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [selectedConversation, messages]);

    const handleSendReply = () => {
        if (!replyContent || !selectedConversation) return;
        setIsSending(true);
        setTimeout(() => {
            const newReply = { type: 'sdr' as const, content: replyContent };
            const updatedConversation = { ...selectedConversation, thread: [...selectedConversation.thread, newReply], status: 'Resolved' as const };
            onUpdateConversation(updatedConversation);
            toast({
                title: "Reply Sent!",
                description: `Your message to ${selectedConversation.customer} has been sent.`,
            });
            setReplyContent('');
            setIsSending(false);
        }, 1000);
    };

    const handleUpdateStatus = (id: string, status: 'Deal Closed' | 'Lost') => {
        const conversation = conversations.find(c => c.id === id);
        if (conversation) {
            onUpdateConversation({ ...conversation, status: 'Resolved' });
        }
        toast({
            title: "Conversation Updated",
            description: `Conversation status updated to ${status}.`
        })
    }

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>Unified Inbox</CardTitle>
                </div>
            </CardHeader>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden min-h-[70vh]">
                {/* Left Panel */}
                <div className="md:col-span-4 lg:col-span-4 border-r flex flex-col">
                    <div className="p-3 border-b space-y-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search conversations..." className="pl-9 bg-background h-9" />
                        </div>
                        <div className="flex gap-2">
                            <Select value={channelFilter} onValueChange={setChannelFilter}>
                                <SelectTrigger className="w-full h-8 text-xs"><SelectValue placeholder="Filter Channel..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Channels</SelectItem>
                                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                                    <SelectItem value="Instagram">Instagram</SelectItem>
                                    <SelectItem value="Facebook">Facebook</SelectItem>
                                    <SelectItem value="Gmail">Gmail</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full h-8 text-xs"><SelectValue placeholder="Filter Status..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Statuses</SelectItem>
                                    <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                                    <SelectItem value="AI Handled">AI Handled</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                    <SelectItem value="Escalated">Escalated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {filteredConversations.map((convo) => (
                                <button
                                    key={convo.id}
                                    className={cn(
                                        "w-full text-left p-2.5 rounded-lg border border-transparent transition-colors",
                                        selectedConversation?.id === convo.id
                                            ? "bg-secondary border-primary/20"
                                            : "hover:bg-secondary/50",
                                        convo.isEscalated && "border-red-500/30 hover:border-red-500/50"
                                    )}
                                    onClick={() => onSelectConversation(convo.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">{convo.avatar}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold text-sm">{convo.customer}</p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{convo.timestamp}</p>
                                    </div>
                                    <h3 className="font-medium text-sm mt-2 truncate">{convo.subject}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 truncate">{convo.lastMessage}</p>
                                    <div className="mt-2 flex gap-1.5 flex-wrap">
                                        {convo.isEscalated && <Badge variant="destructive">Escalated</Badge>}
                                        {convo.tags.map(tag => (
                                            <Badge key={tag.text} variant="outline" className={cn("text-xs px-1.5 py-0.5", getTagStyles(tag.type))}>
                                                {tag.text}
                                            </Badge>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Center Panel */}
                <div className="md:col-span-8 lg:col-span-8 flex flex-col bg-muted/20">
                    {selectedConversation ? (
                        <>
                            <div className="p-3 border-b flex items-center justify-between flex-wrap gap-2 bg-background">
                                <h2 className="text-base font-bold flex items-center gap-2">
                                    {channelIcons[selectedConversation.channel]}
                                    {selectedConversation.customer}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm"><Check className="mr-2 h-4 w-4" /> Resolve</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => handleUpdateStatus(selectedConversation.id, 'Deal Closed')}>
                                                <Star className="mr-2 h-4 w-4 text-green-400" /> Mark as Deal Closed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleUpdateStatus(selectedConversation.id, 'Lost')}>
                                                <Hand className="mr-2 h-4 w-4 text-red-400" /> Mark as Lost
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                                            <DropdownMenuItem>Assign to team member</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Mark as spam</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 md:p-6">
                                <div className="space-y-6">
                                     {selectedConversation.isEscalated && (
                                        <Card className="bg-red-500/10 border-red-500/20">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base text-red-400 flex items-center gap-2"><AlertTriangle/> Escalated by {selectedConversation.sdr}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-red-400/80">{selectedConversation.escalationReason}</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                    {messages.map((msg, index) => (
                                        <div key={index} className={cn("flex items-end gap-2", msg.type === 'sdr' ? 'justify-end' : 'justify-start')}>
                                            {(msg.type === 'user' || msg.type === 'ai') && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{msg.type === 'user' ? selectedConversation.avatar : 'AI'}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn(
                                                "p-3 rounded-lg max-w-md",
                                                msg.type === 'user' && 'bg-background shadow-sm',
                                                msg.type === 'ai' && 'bg-blue-500/10 text-blue-900 dark:text-blue-200 border border-blue-500/20',
                                                msg.type === 'sdr' && 'bg-primary text-primary-foreground',
                                            )}>
                                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                            </div>
                                            {msg.type === 'sdr' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>You</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="p-4 border-t bg-background space-y-3">
                                <Textarea
                                    placeholder={`Reply to ${selectedConversation.customer}...`}
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    className="bg-secondary"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendReply();
                                        }
                                    }}
                                />
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="sm"><FileText className="mr-2 h-4 w-4" /> Templates</Button>
                                        <Button variant="ghost" size="sm"><Wand2 className="mr-2 h-4 w-4" /> AI Suggest</Button>
                                    </div>
                                    <Button
                                        onClick={handleSendReply}
                                        disabled={isSending || !replyContent}
                                    >
                                        {isSending ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="mr-2 h-4 w-4" />
                                        )}
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p>Select a conversation to view</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
