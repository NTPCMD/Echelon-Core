import { CustomerSettings } from "../../components/marketing/customer-settings";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";

export default async function SettingsPage() {
  await requireConsumerContext("/settings");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1120px]">
          <CustomerSettings />
        </div>
      </main>
    </MarketingShell>
  );
}
