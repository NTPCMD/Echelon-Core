import type { Metadata } from "next";
import { LegalPage, LegalSection } from "../../components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy — Echelon",
  description: "How Echelon handles information across its customer and business experiences.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      description="We design Echelon around useful context, clear control and responsible handling of information."
      updated="12 July 2026"
    >
      <LegalSection title="Information we collect">
        <p>We collect information you provide directly, including account details, contact information, booking information, business profiles, messages and support enquiries.</p>
        <p>We may also collect technical and usage information needed to operate, secure and improve Echelon, such as device information, log data and interactions with product features.</p>
      </LegalSection>
      <LegalSection title="How we use information">
        <p>We use information to provide the platform, understand requests, surface relevant results, complete bookings, support businesses, prevent misuse and improve the Echelon experience.</p>
        <p>Where AI features are used, information may be processed to interpret intent or generate assistance. Echelon is designed to keep these experiences contextual and controllable.</p>
      </LegalSection>
      <LegalSection title="Sharing and service providers">
        <p>We share information with businesses when needed to complete a requested action, and with trusted service providers that support hosting, authentication, payments, communications, analytics and security.</p>
        <p>We do not sell personal information. We only disclose information where required to provide the service, protect users, comply with law or complete a transaction you requested.</p>
      </LegalSection>
      <LegalSection title="Data choices and control">
        <p>You may request access, correction or deletion of eligible personal information. Product settings may also let you manage notifications, connected services and other preferences.</p>
        <p>Some information must be retained for security, legal, financial or operational reasons.</p>
      </LegalSection>
      <LegalSection title="Security and retention">
        <p>We use administrative, technical and organisational safeguards appropriate to the nature of the information we handle. No system can guarantee absolute security, but we design for least privilege, monitoring and responsible access.</p>
        <p>Information is retained only as long as reasonably needed for the purposes described here or as required by law.</p>
      </LegalSection>
      <LegalSection title="Contact">
        <p>Questions about privacy can be sent to privacy@echelonapp.net or through the Echelon contact page.</p>
      </LegalSection>
    </LegalPage>
  );
}
