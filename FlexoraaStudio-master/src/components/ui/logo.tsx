import Link from 'next/link';
import { LogoImage } from './logo-image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-lg font-bold text-foreground focus:outline-none focus:ring-ring focus:ring-offset-background',
        className
      )}
    >
      <LogoImage />
      <span className="font-headline whitespace-nowrap">Flexoraa Intelligence OS</span>
    </Link>
  );
}
