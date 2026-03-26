
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Rocket, BrainCircuit, BarChart, MessagesSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
    { name: "Alex Grant", role: "CEO & AI Visionary", imageHint: "male leader" },
    { name: "Dr. Lena Petrova", role: "Chief Scientist (AI Research)", imageHint: "female scientist" },
    { name: "Marco Diaz", role: "Head of Engineering", imageHint: "male engineer" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            About <span className="gradient-text whitespace-nowrap">Flexoraa Execution OS</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            We are building the world's first Execution OS, an AI workforce designed to automate 70% of your company's tasks so your team can focus on what matters.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container max-w-4xl mx-auto space-y-12">
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Flexoraa is building a full-stack AI ecosystem designed to eliminate human error, slash operational costs, and automate growth — without the bloat or overhead of traditional systems.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 md:pl-6 py-2 my-6 italic text-foreground text-xl font-medium">
                What if your entire lead engine and customer ops could run on intelligent agents that never sleep, never forget, and always perform?
              </blockquote>
              <p>
                We're executing that idea — fast.
              </p>
            </div>

            <hr className="border-border/40" />

            {/* Founder Section */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
                <div className="md:col-span-1">
                    <Image
                        src="https://picsum.photos/seed/founder/400/400"
                        alt="Aaryaman Jaiswal, Founder of Flexoraa"
                        width={400}
                        height={400}
                        className="rounded-lg shadow-2xl object-cover aspect-square"
                        data-ai-hint="male founder portrait"
                    />
                </div>
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline">A Note from Our Founder</h2>
                    <div className="text-lg text-muted-foreground space-y-4">
                        <p className="font-semibold text-foreground">Aaryaman Jaiswal</p>
                        <blockquote className="border-l-4 border-accent pl-4 italic">
                            "Building Flexoraa stems from a simple belief: human potential is wasted on repetitive tasks. We designed our Execution OS to be an AI partner that handles the 70% of operational work that holds businesses back, freeing teams to focus on strategy, creativity, and growth. This isn't just about automation; it's about empowerment."
                        </blockquote>
                        <p>
                           <strong className="text-foreground">Our Vision:</strong> To create a future where every business, regardless of size, can leverage a powerful, interconnected AI workforce to achieve unprecedented efficiency and scale. We're not just building tools; we're building the operating system for the next generation of business.
                        </p>
                    </div>
                </div>
            </div>

            <hr className="border-border/40" />

            <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold font-headline">The First Wave: LeadOS + AgentOS</h2>
                <p className="text-lg text-muted-foreground">We launched with two cutting-edge AI models:</p>
                <ul className="space-y-4 text-muted-foreground list-disc list-inside">
                    <li><strong className="text-foreground">LeadOS:</strong> Filters out junk leads using a number verification system, then sends WhatsApp messages to qualify each lead into Hot, Warm, or Cold buckets. Clean, real-time, cost-effective. If a lead is not interested, the AI will automatically try to convert them smartly.</li>
                    <li><strong className="text-foreground">AgentOS:</strong> Your digital SDR. It can handle unlimited queries and conversations. AgentOS engages, books meetings, sends alerts, convinces via conversation, and syncs seamlessly with your sales team. Think of it as your always-on growth assistant.</li>
                </ul>
                <p className="text-lg text-muted-foreground">
                    Together, they form the first plug-and-play lead automation stack—cutting your cost per conversion, reducing wasted team hours, and giving you total visibility over your pipeline.
                </p>
            </div>
            
            <hr className="border-border/40" />

            <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold font-headline">The Bigger Mission: An AI Army for Your Business</h2>
                <p className="text-lg text-muted-foreground">LeadOS and AgentOS are just the beginning.</p>
                <p className="text-lg text-muted-foreground">
                    We are building 10+ powerful AI models under Flexoraa Intelligence OS, each engineered to automate a specific department — from lead generation to operations — all working together to reduce human error, cut costs, and scale faster.
                </p>
                 <blockquote className="border-l-4 border-accent pl-4 md:pl-6 py-2 my-6 italic text-foreground text-xl font-medium">
                    All Flexoraa Agents will talk to each other — sharing data, learning patterns, and optimizing in real time. No silos. No disconnects. Just one intelligent system that works for your team, not the other way around.
                </blockquote>
            </div>

            <hr className="border-border/40" />

            <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold font-headline">Why We're Doing This</h2>
                <p className="text-lg text-muted-foreground">
                    Most businesses run on outdated tools, bloated CRMs, and teams stretched thin trying to "manage" leads. We’re here to end that chaos.
                </p>
                <p className="text-lg font-semibold text-foreground">
                    Flexoraa Execution OS gives you control, speed, and precision. Less cost. Less error. More qualified action.
                </p>
                <p className="text-lg text-muted-foreground">
                    Whether you're a sales-heavy startup or an enterprise drowning in data, we are the AI operating system your business needed — and never had.
                </p>
            </div>

        </div>
      </section>

       {/* CTA Banner Section */}
       <section className="py-16 md:py-20">
          <div className="container">
            <div className="rounded-lg gradient-background p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary-foreground">Join the Automation Revolution</h2>
              <p className="mt-2 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Step into the future with Flexoraa Execution OS. Let's build smarter businesses, together.
              </p>
              <div className="mt-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
