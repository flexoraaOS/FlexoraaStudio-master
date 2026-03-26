
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type VerifiedLead = {
  id: string;
  name: string;
  phone: string;
  status: 'Verified' | 'Invalid' | 'Pending';
  verifiedOn: string;
};

const verifiedLeadsData: VerifiedLead[] = [];

export default function VerifiedLeadsPage() {

    const [leads, setLeads] = React.useState<VerifiedLead[]>(verifiedLeadsData);
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof VerifiedLead; direction: 'ascending' | 'descending' } | null>(null);

    const sortedLeads = React.useMemo(() => {
        let sortableItems = [...leads];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [leads, sortConfig]);

    const requestSort = (key: keyof VerifiedLead) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Verified Leads</h1>
        <p className="text-muted-foreground mt-1">
          A list of all leads that have been processed by the AI verification system.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>
            Review the verification status of all uploaded leads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('name')}>
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('phone')}>
                          Phone Number
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('status')}>
                          Verification Status
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead>
                      <Button variant="ghost" onClick={() => requestSort('verifiedOn')}>
                          Verified On
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                  </TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-secondary/50">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="font-medium">{lead.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          lead.status === 'Verified' ? 'text-green-400 border-green-400/50' :
                          lead.status === 'Invalid' ? 'text-red-400 border-red-400/50' :
                          'text-yellow-400 border-yellow-400/50'
                        }
                      >
                        {lead.status === 'Verified' && <CheckCircle className="mr-2 h-3.5 w-3.5" />}
                        {lead.status === 'Invalid' && <XCircle className="mr-2 h-3.5 w-3.5" />}
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.verifiedOn}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Re-verify</DropdownMenuItem>
                          <DropdownMenuItem>Exclude from Campaigns</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
