
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, BrainCircuit } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/leados', label: 'LeadOS' },
  { href: '/agentos', label: 'AgentOS' },
  { href: '/legalos', label: 'LegalOS' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/pricing', label: 'Pricing' },
];

const NavLink = ({ href, label, onClick }: { href: string; label: string, onClick?: () => void }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          'relative text-sm font-medium text-foreground/80 transition-all duration-200 hover:text-primary hover:scale-110 transform',
          isActive && 'text-primary'
        )}
      >
        {label}
        {isActive && (
          <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary transition-all" />
        )}
      </Link>
    );
  };

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-header-in shadow-lg">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium ml-10">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} onClick={() => {}} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button className="hidden sm:inline-flex gradient-background text-primary-foreground hover:opacity-90" asChild>
            <Link href="/quote">Get Started</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                <div className="px-4">
                  <Logo />
                </div>
                <nav className="grid gap-2 p-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
