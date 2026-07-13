import { PremiumAnalyticsPage } from "../../../components/dashboard/analytics";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/analytics");
  return <PremiumAnalyticsPage />;
}
