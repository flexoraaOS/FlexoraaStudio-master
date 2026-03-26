
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';

export function ContactPopup() {
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // In a real app, you would handle form submission here (e.g., send an email or save to a database)
        console.log("Form submitted!");
        
        setOpen(false);

        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We'll get back to you shortly.",
        });
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Contact Us</DialogTitle>
          <DialogDescription>
            Have a question? Fill out the form below or email us directly at{' '}
            <a href="mailto:Contact@flexoraaa.com" className="text-primary hover:underline">
              Contact@flexoraaa.com
            </a>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name
                </Label>
                <Input id="name" placeholder="Your Name" className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                Email
                </Label>
                <Input id="email" type="email" placeholder="your.email@example.com" className="col-span-3" required/>
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="message" className="text-right pt-2">
                Message
                </Label>
                <Textarea id="message" placeholder="Your message..." className="col-span-3" rows={5} required/>
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" className="gradient-background text-primary-foreground">Send Message</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
