
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'CA', name: 'Canada' },
    { code: 'SG', name: 'Singapore' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'BR', name: 'Brazil' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'CH', name: 'Switzerland' },
];

const indianStates = [
    { code: "AN", name: "Andaman and Nicobar Islands" },
    { code: "AP", name: "Andhra Pradesh" },
    { code: "AR", name: "Arunachal Pradesh" },
    { code: "AS", name: "Assam" },
    { code: "BR", name: "Bihar" },
    { code: "CG", name: "Chandigarh" },
    { code: "CH", name: "Chhattisgarh" },
    { code: "DH", name: "Dadra and Nagar Haveli and Daman and Diu" },
    { code: "DL", name: "Delhi" },
    { code: "GA", name: "Goa" },
    { code: "GJ", name: "Gujarat" },
    { code: "HR", name: "Haryana" },
    { code: "HP", name: "Himachal Pradesh" },
    { code: "JK", name: "Jammu and Kashmir" },
    { code: "JH", name: "Jharkhand" },
    { code: "KA", name: "Karnataka" },
    { code: "KL", name: "Kerala" },
    { code: "LD", name: "Lakshadweep" },
    { code: "MP", name: "Madhya Pradesh" },
    { code: "MH", name: "Maharashtra" },
    { code: "MN", name: "Manipur" },
    { code: "ML", name: "Meghalaya" },
    { code: "MZ", name: "Mizoram" },
    { code: "NL", name: "Nagaland" },
    { code: "OR", name: "Odisha" },
    { code: "PY", name: "Puducherry" },
    { code: "PB", name: "Punjab" },
    { code: "RJ", name: "Rajasthan" },
    { code: "SK", name: "Sikkim" },
    { code: "TN", name: "Tamil Nadu" },
    { code: "TS", name: "Telangana" },
    { code: "TR", name: "Tripura" },
    { code: "UK", name: "Uttarakhand" },
    { code: "UP", name: "Uttar Pradesh" },
    { code: "WB", name: "West Bengal" }
];


const industries = [
    'E-commerce',
    'SaaS',
    'Real Estate',
    'Healthcare',
    'Education',
    'Financial Services',
    'Other'
];

export function CompanyDetailsForm() {
    const { toast } = useToast();
    const [industry, setIndustry] = useState('');
    const [otherIndustry, setOtherIndustry] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleSave = () => {
        toast({
            title: "Company Details Saved",
            description: "Your company information has been updated.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Manage your company's legal and billing information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" placeholder="Your Company Inc."/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="company-type">Company Type</Label>
                        <Select>
                            <SelectTrigger id="company-type">
                                <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pvt-ltd">Private Limited</SelectItem>
                                <SelectItem value="llp">LLP</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                                <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger id="country">
                                <SelectValue placeholder="Select country..." />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map(c => (
                                    <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Select disabled={selectedCountry !== 'IN'}>
                            <SelectTrigger id="state">
                                <SelectValue placeholder={selectedCountry === 'IN' ? "Select state..." : "N/A for selected country"} />
                            </SelectTrigger>
                            {selectedCountry === 'IN' && (
                                <SelectContent>
                                    {indianStates.map(s => (
                                        <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            )}
                        </Select>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="gst-number">GST Number</Label>
                        <Input id="gst-number" placeholder="e.g., 22AAAAA0000A1Z5"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gst-rate">Default GST Rate</Label>
                        <Select>
                            <SelectTrigger id="gst-rate">
                                <SelectValue placeholder="Select GST rate..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">0%</SelectItem>
                                <SelectItem value="5">5%</SelectItem>
                                <SelectItem value="12">12%</SelectItem>
                                <SelectItem value="18">18%</SelectItem>
                                <SelectItem value="28">28%</SelectItem>
                                <SelectItem value="exempt">Exempt</SelectItem>
                                <SelectItem value="non-gst">Non-GST</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="industry-select">Industry / Sector</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry-select">
                            <SelectValue placeholder="Select an industry..." />
                        </SelectTrigger>
                        <SelectContent>
                            {industries.map(ind => (
                                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {industry === 'Other' && (
                    <div className="space-y-2 animate-in fade-in-50">
                        <Label htmlFor="other-industry">Please specify your industry</Label>
                        <Input 
                            id="other-industry" 
                            placeholder="e.g., Boutique Marketing Agency"
                            value={otherIndustry}
                            onChange={(e) => setOtherIndustry(e.target.value)}
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button onClick={handleSave}><Save className="mr-2 h-4 w-4"/>Save Company Details</Button>
            </CardFooter>
        </Card>
    )
}
