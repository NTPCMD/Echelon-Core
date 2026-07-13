import type { Metadata } from "next";
import { LegalPage, LegalSection } from "../../components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms — Echelon",
  description: "Terms governing access to and use of the Echelon platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms"
      description="These terms describe the responsibilities that keep Echelon useful, trusted and fair for customers and businesses."
      updated="12 July 2026"
    >
      <LegalSection title="Using Echelon">
        <p>You may use Echelon only in compliance with applicable law and these terms. You are responsible for information submitted through your account and for keeping access credentials secure.</p>
        <p>You must not interfere with the platform, attempt unauthorised access, misuse another person’s information or use Echelon to facilitate unlawful, misleading or harmful activity.</p>
      </LegalSection>
      <LegalSection title="Marketplace relationships">
        <p>Echelon helps customers discover and interact with independent businesses. Unless expressly stated otherwise, the business is responsible for the service it provides, including quality, availability, licences, pricing and fulfilment.</p>
        <p>Customers and businesses are responsible for reviewing the information relevant to a booking or transaction before confirming it.</p>
      </LegalSection>
      <LegalSection title="Bookings, changes and payments">
        <p>Booking, cancellation, refund and payment terms may vary by business and service. Applicable terms should be shown before confirmation and form part of the agreement between the customer and business.</p>
        <p>Where Echelon facilitates payments, additional payment-provider terms may apply.</p>
      </LegalSection>
      <LegalSection title="Business accounts">
        <p>Businesses must provide accurate profile, service, pricing and availability information. They are responsible for customer service, fulfilment and compliance with laws relevant to their operations.</p>
        <p>Business tools, integrations and analytics are provided to support operations and do not replace professional financial, legal or operational advice.</p>
      </LegalSection>
      <LegalSection title="Intellectual property">
        <p>Echelon and its product, design, software and brand materials are protected by intellectual property laws. These terms do not transfer ownership of Echelon intellectual property.</p>
        <p>You retain ownership of content you submit and grant Echelon the permissions reasonably needed to host, process and display it for the operation of the platform.</p>
      </LegalSection>
      <LegalSection title="Availability and liability">
        <p>We work to keep Echelon reliable and secure, but the platform may change, experience interruptions or contain errors. To the extent permitted by law, Echelon is provided without guarantees beyond those that cannot legally be excluded.</p>
        <p>Nothing in these terms limits rights or remedies that cannot be limited under applicable consumer law.</p>
      </LegalSection>
      <LegalSection title="Contact">
        <p>Questions about these terms can be sent to legal@echelonapp.net or through the Echelon contact page.</p>
      </LegalSection>
    </LegalPage>
  );
}
