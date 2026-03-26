import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ComponentLoader = ({ height = "h-[300px]", lines = 3 }: { height?: string, lines?: number }) => {
  return (
    <div className={`w-full ${height} flex flex-col justify-center gap-4`}>
       <Skeleton className="h-8 w-1/3 mb-4 rounded-md" />
       {Array.from({ length: lines }).map((_, i) => (
           <Skeleton key={i} className="h-4 w-full rounded-md" />
       ))}
    </div>
  );
};

export const CardLoader = () => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-1/4 mb-2" />
                <Skeleton className="h-3 w-3/4" />
            </CardContent>
        </Card>
    );
};
