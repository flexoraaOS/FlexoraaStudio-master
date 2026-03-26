
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-in slide-in-from-bottom-8 duration-500">
      <div className="glass-card container mx-auto flex items-center justify-between gap-4 p-3 md:p-4">
        <div className="flex items-center gap-3">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your experience. By continuing, you agree to our{' '}
              <Link href="/privacy-policy" className="underline hover:text-primary">
                Privacy Policy
              </Link>.
            </p>
        </div>
        <div className="flex-shrink-0 flex gap-2">
            <Button size="sm" onClick={handleAccept}>Accept</Button>
            <Button size="sm" onClick={handleDecline} variant="secondary">Decline</Button>
        </div>
      </div>
    </div>
  );
}
