
'use client';

import React from 'react';
import { Logo } from "@/components/ui/logo";

export default function QuotePage() {
  return (
    <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
        <div className="flex-grow flex flex-col items-center justify-center">
            <div className="mb-8">
                <Logo />
            </div>

            <blockquote className="text-3xl font-bold font-headline tracking-tight max-w-sm mx-auto leading-tight">
              When your name becomes the solution, <span className="gradient-text">you've already won.</span> Keep working on yourself.
            </blockquote>
        </div>
    </div>
  );
}
