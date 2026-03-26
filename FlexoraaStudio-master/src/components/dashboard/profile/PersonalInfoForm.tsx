
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { User, Mail, Briefcase, Users as UsersIcon } from 'lucide-react';

export function PersonalInfoForm() {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://placehold.co/80x80.png" data-ai-hint="person" />
                        <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <CardTitle className="text-2xl font-headline">Admin User</CardTitle>
                        <CardDescription>Administrator</CardDescription>
                    </div>
                     <Button variant="outline">Change Avatar</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="full-name" className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4"/>Full Name</Label>
                        <Input id="full-name" defaultValue="Admin User" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4"/>Email Address</Label>
                        <Input id="email" type="email" defaultValue="admin@flexoraa.com" />
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4"/>Role</Label>
                        <Input id="role" defaultValue="Administrator" />
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="team" className="flex items-center gap-2 text-muted-foreground"><UsersIcon className="h-4 w-4"/>Team</Label>
                        <Input id="team" defaultValue="Flexoraa HQ" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
