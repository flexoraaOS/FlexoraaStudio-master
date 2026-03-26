
export default function TermsOfServicePage() {
  return (
    <div className="animated-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold font-headline mb-4 text-foreground">Terms of Service for Flexoraa</h1>
        <p className="text-muted-foreground mb-8">Last Updated: August 13, 2025</p>

        <div className="space-y-8 text-muted-foreground prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">1. Agreement to Terms</h2>
            <p>This Terms of Service ("Terms") is a legally binding agreement made between you, whether personally or on behalf of an entity ("Client"), and Flexoraa (Sole Proprietorship), based in Kolkata, West Bengal, India ("we," "us," or "our"), concerning your access to and use of the Flexoraa Intelligence OS platform and its associated services (the "Service"). These Terms include and incorporate by reference our Privacy Policy and, where applicable, our Data Processing Addendum (DPA).</p>
            <p>By registering for, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by all of these Terms. If you do not agree with all of these terms, you are expressly prohibited from using the Service and must discontinue use immediately.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">2. The Service</h2>
            <p>Flexoraa provides an AI-powered Software-as-a-Service (SaaS) platform for lead automation. We reserve the right to modify the Service at any time. We provide the Service "as-is" and make no guarantee of uptime or feature continuity. Certain features may be provided on a beta or experimental basis ("Beta Features") and may be modified, removed, or discontinued at any time without notice and without liability.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">3. User Accounts and Registration</h2>
            <p>You must be at least 18 years of age and have the legal capacity to enter into a binding contract. You are responsible for all activities that occur under your account and must keep your account credentials secure. You agree to notify us immediately of any unauthorized use of your account.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">4. Client Responsibilities and Data</h2>
            <h3 className="text-xl font-semibold font-headline">4.1. Client Data Ownership & Responsibility</h3>
            <p>You retain all ownership rights to the data you upload to the Service ("Client Data"). You represent and warrant that you have obtained all required consents from your leads to contact them via WhatsApp, including any mandatory opt-ins under applicable laws. You are solely responsible for the accuracy, legality, and quality of your Client Data.</p>
            <h3 className="text-xl font-semibold font-headline">4.2. Third-Party Platform Compliance</h3>
            <p>Flexoraa is not liable for the suspension or banning of any WhatsApp number used via the Service. You are solely responsible for your compliance with all applicable terms, policies, and guidelines of third-party platforms, including those of WhatsApp and Meta.</p>
            <h3 className="text-xl font-semibold font-headline">4.3. Sensitive Data</h3>
            <p>You agree not to upload any sensitive personal data (e.g., health data, financial credentials) unless explicitly agreed in a separate written agreement with Flexoraa.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">5. Acceptable Use and Restrictions</h2>
            <p>You agree not to misuse the Service. You specifically agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Use the Service for any illegal purpose, including sending spam or violating data protection laws.</li>
                <li>Reverse engineer or otherwise attempt to discover the source code of the Service.</li>
                <li>Use automated bots or scripts to interfere with the platform’s intended operation.</li>
                <li>Upload or transmit any malicious code.</li>
                <li>Use the Service to process or transmit any data that infringes on the intellectual property rights of others.</li>
                <li>Resell or sublicense the Service without our express written permission.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">6. Fees, Payment, and Term</h2>
            <h3 className="text-xl font-semibold font-headline">6.1. Subscription and Billing</h3>
            <p>The Service is offered on a subscription basis. Subscriptions automatically renew unless cancelled before the end of the current billing cycle. You authorize us and our third-party payment processors (e.g., Stripe, Razorpay) to charge your selected payment method.</p>
            <h3 className="text-xl font-semibold font-headline">6.2. Refund Policy</h3>
            <p>All subscription payments are final and non-refundable unless expressly required by Indian law.</p>
            <h3 className="text-xl font-semibold font-headline">6.3. Overdue Payments</h3>
            <p>We reserve the right to suspend or terminate your access to the Service if payment is overdue. Your data may become inaccessible during such suspension.</p>
            <h3 className="text-xl font-semibold font-headline">6.4. Data Retention Upon Termination</h3>
            <p>Upon account termination, your Client Data will be retained for up to 30 days for potential reactivation, after which it may be permanently and irretrievably deleted from our live systems.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">7. Service Levels and Support</h2>
            <p>Flexoraa will use commercially reasonable efforts to make the Service available. While we do not guarantee a specific uptime, we strive to maintain a 98% availability rate, excluding planned maintenance or events covered under Force Majeure.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">8. Intellectual Property Rights</h2>
            <p>Flexoraa owns all rights, title, and interest in and to the Service, including all underlying software, AI models, and branding. You own your Client Data. Nothing in these Terms grants Flexoraa ownership over your Client Data. All suggestions, enhancement requests, or feedback submitted by you may be used by Flexoraa without obligation or compensation.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">9. Disclaimer of Warranties</h2>
            <p>THE SERVICE AND ANY BETA FEATURES ARE PROVIDED "AS-IS" AND "AS-AVAILABLE." WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <h3 className="text-xl font-semibold font-headline">9.1. AI Output Disclaimer</h3>
            <p>Flexoraa does not warrant the accuracy or reliability of AI-generated outputs. Lead qualification is informational only and not a guarantee of customer intent or conversion. All AI outputs should be independently verified by you.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">10. Limitation of Liability</h2>
            <p>TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FLEXORAA BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY TO YOU WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">11. Indemnification</h2>
            <p>You agree to indemnify and hold us harmless from any loss, damage, or claim (including attorneys’ fees) arising from your use of the Service, your breach of these Terms, or your violation of any law or the rights of a third party.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">12. Governing Law and Dispute Resolution</h2>
            <p>These Terms are governed by the laws of India. Before initiating court proceedings, the parties agree to first attempt to resolve any dispute through good faith mediation or arbitration. Failing resolution, the parties agree to submit to the exclusive jurisdiction of the courts located in Kolkata, West Bengal, India.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">13. Modification to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be posted on this page and are effective immediately unless stated otherwise. We will make reasonable efforts to notify you of material changes. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">14. General Provisions</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Entire Agreement:</strong> These Terms, along with our Privacy Policy and DPA (if applicable), constitute the entire agreement between you and us.</li>
                <li><strong>Severability:</strong> If any provision of these Terms is determined to be unlawful or unenforceable, that provision is deemed severable and does not affect the validity of any remaining provisions.</li>
                <li><strong>No Waiver:</strong> Our failure to enforce any right or provision under these Terms shall not constitute a waiver of such right or provision.</li>
                <li><strong>Force Majeure:</strong> Flexoraa shall not be liable for any delay or failure to perform resulting from causes beyond its reasonable control, including acts of God, cyberattacks, internet outages, or governmental restrictions.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">15. Contact Us</h2>
            <p>Flexoraa (Sole Proprietorship)<br/>Kolkata, West Bengal, India<br/>legal@flexoraa.com</p>
            <p className="italic text-sm">Reminder: This is a production-grade draft. It is strongly recommended to have this document reviewed and approved by a qualified legal professional to ensure full legal compliance before publishing.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
