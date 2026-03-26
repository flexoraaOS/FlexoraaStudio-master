
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const leadosPricingTiers = [
    {
        name: "Starter Plan",
        price: "₹7,999",
        pricePeriod: "/ month",
        description: "Ideal for lean sales teams. WhatsApp API Cost: ₹0.78 per valid lead (paid directly to Meta).",
        verifications: "10,000 Lead Verifications",
        features: [
            "Clients must provide their own WhatsApp API for automation",
            "AI-Based Lead Qualification (Hot/Warm/Cold)",
            "Ping-back Number Verification",
            "Automated WhatsApp First Touch",
            "Daily Funnel & Lead Summary Reports (CSV)",
            "Basic SDR Cost Simulator",
            "Single Batch Data Upload (Monthly)",
            "7-Day Data Retention"
        ],
        cta: "Choose Starter",
        href: "/login"
    },
    {
        name: "Growth Plan",
        price: "₹14,999",
        pricePeriod: "/ month",
        description: "For mid-size teams. WhatsApp API Cost: ₹0.78 per valid lead (paid directly to Meta).",
        verifications: "25,000 Lead Verifications",
        features: [
            "Everything in Starter, plus:",
            "Dynamic Lead Scoring Engine",
            "Multi-Stage WhatsApp Follow-Up Sequences",
            "Real-Time ROI & Cost-per-Sale Dashboard",
            "Campaign Intelligence Panel",
            "Drag-and-Drop Visual Pipeline",
            "30-Day Data Retention",
            "3 Admin & SDR User Licenses"
        ],
        popular: true,
        cta: "Choose Growth",
        href: "/login"
    },
    {
        name: "Pro Plan",
        price: "₹26,999",
        pricePeriod: "/ month",
        description: "For high-velocity teams. WhatsApp API Cost: ₹0.78 per valid lead (paid directly to Meta).",
        verifications: "50,000 Lead Verifications",
        features: [
            "Everything in Growth, plus:",
            "AI-Generated WhatsApp Replies",
            "Automated Appointment Booking Agent",
            "SDR Leaderboard & Gamification",
            "Revenue Forecasting Dashboard",
            "Native CRM Integrations (Zoho, HubSpot)",
            "Lead Privacy & Access Controls",
            "60-Day Data Retention",
            "5 Admin & SDR User Licenses"
        ],
        cta: "Choose Pro",
        href: "/login"
    },
    {
        name: "Enterprise",
        price: "Custom",
        pricePeriod: "",
        description: "For large-scale operations with custom needs.",
        verifications: "Unlimited Verifications",
        features: [
             "Everything in Pro, plus:",
             "Custom Lead Volume & Integrations",
             "Dedicated Onboarding & Support",
             "Full API Access",
             "Bespoke AI Model Training"
        ],
        cta: "Contact Sales",
        href: "/contact-sales"
    },
]

const agentosPricingTiers = [
    {
        name: "Demo Plan",
        price: "₹0",
        conversations: "50 Conversations Free",
        description: "Valid for 7 Days",
        features: [
            "Channels: Instagram, Facebook, Gmail",
            "AI Smart Tagging (Hot, Warm, Cold)",
            "Unified Inbox (Preview)",
            "Basic AI Auto-Responses",
        ],
        exclusions: ["WhatsApp not included", "No API Access or Human Handover"],
        cta: "Start Free Demo",
        href: "/login"
    },
    {
        name: "Starter Plan",
        price: "₹4,999",
        conversations: "2,000 Conversations",
        description: "WhatsApp API Cost: ₹0.78 x 2,000 = ₹1,560 (paid to Meta directly)",
        features: [
            "All Channels: WhatsApp, IG, FB, Gmail",
            "Unified Chat Inbox",
            "AI Smart Tagging",
            "Human Handover to SDRs",
            "Basic Analytics Dashboard",
            "7-Day Support Access"
        ],
        popular: true,
        cta: "Choose Starter",
        href: "/login"
    },
    {
        name: "Growth Plan",
        price: "₹9,999",
        conversations: "5,000 Conversations",
        description: "WhatsApp API Cost: ₹0.78 x 5,000 = ₹3,900 (paid to Meta directly)",
        features: [
            "Everything in Starter, plus:",
            "Conversational AI That Sells",
            "Automated Appointment Booking Links",
            "Intelligent Lead Routing",
            "White-Labeled Weekly Reports",
            "Priority Support"
        ],
        cta: "Choose Growth",
        href: "/login"
    },
    {
        name: "Pro Plan",
        price: "₹18,999",
        conversations: "10,000 Conversations",
        description: "WhatsApp API Cost: ₹0.78 x 10,000 = ₹7,800 (paid to Meta directly)",
        features: [
            "Everything in Growth, plus:",
            "Advanced Social Listening (Tags, Mentions)",
            "Real-Time Performance Analytics",
            "Custom Lead Statuses & Tags",
            "Role-Based Access for Teams",
            "API Integration Support",
        ],
        cta: "Choose Pro",
        href: "/login"
    },
    {
        name: "Enterprise Plan",
        price: "Custom Pricing",
        conversations: "15K – 100K+ Conversations",
        description: "For Teams With High Volume or Special Needs",
        features: [
            "Everything in Pro, plus:",
            "Fully Tailored Conversation Plans",
            "Custom CRM Integrations",
            "Dedicated Account Manager & SLA",
            "Bespoke AI Persuasion Models",
            "WhatsApp Green Tick Setup"
        ],
        cta: "Contact Sales",
        href: "/contact-sales"
    }
]


const trialPlan = {
    name: "Onboarding Trial",
    price: "₹1,000",
    pricePeriod: "/ One-Time",
    description: "Risk-free trial designed for validation before scaling.",
    verifications: "600 Lead Verifications",
    features: [
        "Full Access to AI Filtering & Scoring Systems",
        "Performance Report with Sales Cost Projections",
        "Integrated Call Verification + Outreach Trigger",
        "One-Time Lead Upload & Analysis",
        "SDR Cost-to-Conversion Calculator",
        "Ideal for institutional buyers & proof-of-concept teams"
    ],
    cta: "Start Trial",
    href: "/login"
};


const faqs = [
    {
        question: "Is there a free trial available?",
        answer: "We do not offer a traditional free trial. Instead, we provide a comprehensive demo and a discounted first month for new clients to experience the full power of Flexoraa Intelligence OS with dedicated onboarding support."
    },
    {
        question: "Can I change my plan later on?",
        answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle. Our goal is to provide a flexible solution that grows with your business."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers for annual plans. All payments are processed securely through our payment partner, Razorpay."
    },
    {
        question: "How does the 'Custom' Enterprise plan work?",
        answer: "Our Enterprise plan is designed for large-scale operations with unique requirements. It includes custom lead and conversation volumes, API access, bespoke integrations, and a dedicated account manager. Please contact our sales team to discuss your specific needs and receive a tailored quote."
    },
     {
        question: "What counts as a 'conversation' in AgentOS?",
        answer: "A conversation is defined as a continuous interaction with a single user on a specific channel within a 24-hour period. A new conversation begins if the user re-initiates contact after 24 hours of inactivity."
    }
]


export default function PricingPage() {
  return (
    <div>
        {/* Hero Section */}
        <section className="py-20 md:py-28 animated-background">
            <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
                Flexible Pricing for Every <span className="gradient-text">Business</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                Choose the right plan for your team. Start with our powerful AI models and scale as you grow.
            </p>
            </div>
        </section>

        {/* LeadOS Pricing */}
        <section id="leados-pricing" className="py-20 md:py-24 bg-black">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Flexoraa LeadOS Pricing Tiers</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">AI-Powered Lead Qualification & Prioritization Engine for Sales-Driven Teams. Maximize conversions. Minimize SDR inefficiencies. Optimize every outreach.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
                    {leadosPricingTiers.map((tier) => (
                    <Card key={tier.name} className={cn("transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-2 flex flex-col", tier.popular ? "border-accent shadow-accent/20 shadow-lg" : "")}>
                        <CardHeader className="pb-4">
                            <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                            <p className="font-semibold text-accent">{tier.verifications}</p>
                            <CardDescription>{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 flex-grow">
                        <div className="text-4xl font-bold font-headline">
                            {tier.price}
                            {tier.pricePeriod && <span className="text-lg font-normal text-muted-foreground">{tier.pricePeriod}</span>}
                        </div>
                        <ul className="space-y-3">
                            {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <Check className="h-4 w-4 mr-2 text-accent flex-shrink-0 mt-1" />
                                <span className="text-muted-foreground text-sm">{feature}</span>
                            </li>
                            ))}
                        </ul>
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full gradient-background text-primary-foreground hover:opacity-90" asChild>
                            <Link href={tier.href}>{tier.cta}</Link>
                        </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
                 <div className="flex justify-center mt-12">
                    <div className="w-full max-w-md">
                        <Card className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-1 flex flex-col border-dashed border-2">
                             <CardHeader className="pb-4 text-center">
                                <CardTitle className="font-headline text-2xl">{trialPlan.name}</CardTitle>
                                <p className="font-semibold text-accent">{trialPlan.verifications}</p>
                                <CardDescription>{trialPlan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 flex-grow">
                                <div className="text-center text-4xl font-bold font-headline">
                                    {trialPlan.price}
                                    {trialPlan.pricePeriod && <span className="text-lg font-normal text-muted-foreground">{trialPlan.pricePeriod}</span>}
                                </div>
                                <ul className="space-y-3">
                                    {trialPlan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-4 w-4 mr-2 text-accent flex-shrink-0 mt-1" />
                                        <span className="text-muted-foreground text-sm">{feature}</span>
                                    </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full gradient-background text-primary-foreground hover:opacity-90" asChild>
                                    <Link href={trialPlan.href}>{trialPlan.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        {/* AgentOS Pricing */}
        <section id="agentos-pricing" className="py-20 md:py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">AgentOS: Multi-Channel AI Conversation Engine</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">AI-powered system that manages conversations across WhatsApp, Instagram, Facebook Messenger, and Gmail — qualifying leads, tagging them as Hot/Warm/Cold, and syncing all chats to your premium sales dashboard.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 items-stretch">
                    {agentosPricingTiers.map((tier) => (
                    <Card key={tier.name} className={cn("transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-2 flex flex-col", tier.popular ? "border-accent shadow-accent/20 shadow-lg" : "")}>
                        <CardHeader className="pb-4">
                            <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                             <p className="font-semibold text-accent">{tier.conversations}</p>
                            <CardDescription>{tier.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 flex-grow">
                            <div className="text-4xl font-bold font-headline">
                                {tier.price}
                                {tier.price.startsWith("₹") && tier.name !== "Demo Plan" && <span className="text-lg font-normal text-muted-foreground">/ month</span>}
                            </div>
                            <ul className="space-y-3">
                                {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <Check className="h-4 w-4 mr-2 text-accent flex-shrink-0 mt-1" />
                                    <span className="text-muted-foreground text-sm">{feature}</span>
                                </li>
                                ))}
                            </ul>
                            {tier.exclusions && (
                                <ul className="space-y-2 pt-2 border-t mt-4">
                                {tier.exclusions.map((exclusion) => (
                                <li key={exclusion} className="flex items-center text-sm">
                                    <Info className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                                    <span className="text-muted-foreground">{exclusion}</span>
                                </li>
                                ))}
                            </ul>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full gradient-background text-primary-foreground hover:opacity-90" asChild>
                                <Link href={tier.href}>{tier.cta}</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
            </div>
        </section>

         {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-24 bg-black">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                    <p className="mt-2 text-muted-foreground text-lg">Find answers to common questions about our plans and services.</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                         <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

        {/* CTA Banner Section */}
        <section className="py-16 md:py-20 animated-background">
          <div className="container">
            <div className="rounded-lg gradient-background p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary-foreground">Ready to Revolutionize Your Business?</h2>
              <p className="mt-2 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Join the future of automation. Get started with Flexoraa Intelligence OS today and see the difference.
              </p>
              <div className="mt-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/login">Request a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
