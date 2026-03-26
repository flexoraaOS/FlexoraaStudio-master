
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSalesPage() {
  return (
    <div>
      <section className="py-20 md:py-28 animated-background">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            Enterprise <span className="gradient-text">Solutions</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Tell us about your needs, and our team will get in touch to build a custom plan for your business.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-black">
        <div className="container max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Contact Sales</CardTitle>
              <CardDescription>Fill out the form below to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Your company's name" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <Label htmlFor="email">Work Email Address</Label>
                  <Input id="email" type="email" placeholder="name@yourcompany.com" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="volume">Expected Monthly Volume</Label>
                  <Select>
                    <SelectTrigger id="volume">
                        <SelectValue placeholder="Select expected conversation/lead volume" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="15k-50k">15,000 - 50,000</SelectItem>
                        <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                        <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                        <SelectItem value="500k+">500,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest">Interested In</Label>
                  <Select>
                    <SelectTrigger id="interest">
                        <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="leados">LeadOS</SelectItem>
                        <SelectItem value="agentos">AgentOS</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Your Requirements</Label>
                <Textarea id="requirements" placeholder="Tell us about your specific needs, such as custom integrations, specific AI models, support requirements, etc." rows={8} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full gradient-background text-primary-foreground hover:opacity-90">
                Submit Inquiry
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
