
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const safeValue = value ?? 0;
  let colorClass = 'bg-primary';

  // Overriding color logic for onboarding progress
  if (props['aria-label'] !== 'Onboarding progress') {
    if (safeValue < 75) colorClass = 'bg-yellow-500';
    if (safeValue < 40) colorClass = 'bg-red-500';
  } else {
    colorClass = 'bg-green-500' // Always green for onboarding
  }


  return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 transition-all duration-500 ease-in-out", colorClass)}
          style={{ 
            transform: `translateX(-${100 - (value || 0)}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
