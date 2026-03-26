import { LeadScoringClient } from "./LeadScoringClient";

export default function LeadScoringPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">WhatsApp AI Lead Scoring</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Upload your customer conversations in CSV format. Our AI will analyze the text and assign a lead status (HOT, WARM, or COLD) to each customer.
        </p>
      </div>
      <LeadScoringClient />
    </div>
  );
}
