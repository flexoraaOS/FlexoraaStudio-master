
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactPopup } from "./ContactPopup";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-black">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              AI-Powered Business Automation Suite
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-headline text-sm font-medium text-foreground">Products</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/leados" className="text-sm text-muted-foreground hover:text-foreground">LeadOS</Link></li>
              <li><Link href="/agentos" className="text-sm text-muted-foreground hover:text-foreground">AgentOS</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-sm font-medium text-foreground">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><ContactPopup /></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-sm font-medium text-foreground">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Flexoraa. All rights reserved.</p>
          <p className="mt-1">Flexoraa Intelligence OS™ is a flagship product of Flexoraa®.</p>
        </div>
      </div>
    </footer>
  );
}
