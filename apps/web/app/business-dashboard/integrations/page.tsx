import { PremiumIntegrationsPage } from "../../../components/dashboard/integrations";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/integrations");
  return <PremiumIntegrationsPage />;
}
