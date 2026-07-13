import { PremiumSettingsPage } from "../../../components/dashboard/settings";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/settings");
  return <PremiumSettingsPage />;
}
