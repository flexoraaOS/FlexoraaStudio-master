
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackPage() {
  return (
    <div>
      <section className="py-20 md:py-28 animated-background">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            Share Your <span className="gradient-text">Feedback</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            We value your opinion. Let us know how we can improve Flexoraa Intelligence OS.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-black">
        <div className="container max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Feedback Form</CardTitle>
              <CardDescription>Your insights help us build a better platform for everyone.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="name@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea id="feedback" placeholder="Tell us what you think..." rows={8} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full gradient-background text-primary-foreground hover:opacity-90">
                Submit Feedback
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
