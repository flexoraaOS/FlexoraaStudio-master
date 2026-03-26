
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Phone, MessageSquare, MoreHorizontal, Lock, Check } from 'lucide-react';

const hotLeads = [
    { id: 'LD004', name: 'Alice Johnson', phone: '+1 (555) 123-4567', score: 95, stage: 'Demo Booked', timeline: ['Created', 'Contacted', 'Demo Booked'] },
    { id: 'LD001', name: 'Bob Williams', phone: '+1 (555) 234-5678', score: 92, stage: 'Contacted', timeline: ['Created', 'Contacted'] },
    { id: 'LD008', name: 'Charlie Brown', phone: '+1 (555) 345-6789', score: 85, stage: 'Follow-up', timeline: ['Created', 'Contacted', 'Follow-up'] },
    { id: 'LD002', name: 'Diana Prince', phone: '+1 (555) 456-7890', score: 98, stage: 'Contacted', timeline: ['Created', 'Contacted'] },
    { id: 'LD015', name: 'Ethan Hunt', phone: '+1 (555) 567-8901', score: 88, stage: 'New', timeline: ['Created'] },
];

const LeadTable = ({ leads, onPushToManager }: { leads: any[], onPushToManager: () => void }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>AI Score</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {leads.map(lead => (
                <TableRow key={lead.id}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Progress value={lead.score} className="w-20 h-1.5" />
                            <span>{lead.score}</span>
                        </div>
                    </TableCell>
                    <TableCell><Badge>HOT</Badge></TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell className="flex gap-2">
                        <Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon"><MessageSquare className="h-4 w-4" /></Button>
                    </TableCell>
                    <TableCell>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="link" size="sm">View</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <ul className="space-y-2">
                                    {lead.timeline.map((item: string, i: number) => <li key={i} className="text-xs">{item}</li>)}
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                    <TableCell>{lead.stage}</TableCell>
                    <TableCell>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Add Note</DropdownMenuItem>
                                <DropdownMenuItem>Set Follow-up Reminder</DropdownMenuItem>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Push to Manager</DropdownMenuItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Escalate to Manager</DialogTitle>
                                            <DialogDescription>Provide a reason for escalating this lead.</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-2">
                                            <Label htmlFor="reason">Reason</Label>
                                            <Textarea id="reason" placeholder="e.g., Lead is asking for enterprise pricing..." />
                                        </div>
                                         <DialogFooter>
                                            <Button variant="outline">Cancel</Button>
                                            <Button onClick={onPushToManager}>Confirm Escalation</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);


export default function SdrLeadsPage() {
  const { toast } = useToast();
  const handlePushToManager = () => {
      toast({
          title: "Lead Escalated",
          description: "The lead has been pushed to your manager for review.",
      });
  };
  
  const handleRequestAccess = () => {
      toast({
          title: "Permission Request Sent",
          description: "Your manager has been notified. You'll receive an update once access is granted.",
      });
  };

  return (
    <div className="space-y-6">
      <Card>
          <CardHeader>
              <CardTitle>Leads Overview</CardTitle>
              <CardDescription>Manage your hot, warm, and cold leads.</CardDescription>
          </CardHeader>
          <CardContent>
              <Tabs defaultValue="hot" className="w-full">
                  <div className="flex items-center gap-4">
                      <TabsList>
                          <TabsTrigger value="hot">Hot Leads 🔥</TabsTrigger>
                          <TabsTrigger value="warm" disabled>Warm Leads</TabsTrigger>
                          <TabsTrigger value="cold" disabled>Cold Leads</TabsTrigger>
                      </TabsList>
                      <Button variant="secondary" size="sm" onClick={handleRequestAccess}>
                          <Lock className="mr-2 h-4 w-4" />
                          Request Access to Warm/Cold
                      </Button>
                  </div>
                  <TabsContent value="hot" className="mt-4">
                      <LeadTable leads={hotLeads} onPushToManager={handlePushToManager} />
                  </TabsContent>
              </Tabs>
          </CardContent>
      </Card>
    </div>
  );
}

