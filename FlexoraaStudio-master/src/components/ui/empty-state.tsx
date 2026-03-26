import React from 'react';
import { FileX, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}
export const EmptyState = ({ 
    title = "No Data Available", 
    description = "There is currently no data to display for this metric.",
    icon = <FileX className="h-10 w-10 text-muted-foreground/50 mb-4" />,
    action,
    className
}: EmptyStateProps & { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[250px] border border-dashed rounded-lg bg-background/50", className)}>
      {icon}
      <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && (
          <Button variant="outline" onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
};

export const ErrorState = ({ message = "Failed to load data.", onRetry }: { message?: string, onRetry?: () => void }) => {
    return (
         <div className="flex flex-col items-center justify-center p-8 text-center min-h-[200px] border border-destructive/20 bg-destructive/5 rounded-lg">
            <AlertCircle className="h-10 w-10 text-destructive/60 mb-4" />
            <h3 className="font-semibold text-lg text-foreground mb-1">Error</h3>
            <p className="text-sm text-destructive max-w-sm mb-4">{message}</p>
            {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try Again</Button>}
         </div>
    )
}
