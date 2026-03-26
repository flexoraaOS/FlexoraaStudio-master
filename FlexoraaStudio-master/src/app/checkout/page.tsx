
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function CheckoutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen animated-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
          <CardTitle className="text-3xl font-bold font-headline">Checkout</CardTitle>
          <CardDescription>You are being redirected to our secure payment partner.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <div className="flex justify-center items-center flex-col space-y-4 p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Please wait while we connect you to Razorpay...</p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <p className="text-xs text-muted-foreground text-center">If you are not redirected automatically, <Link href="#" className="underline hover:text-primary">click here</Link>.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
