import { PremiumServicesPage } from "../../../components/dashboard/services";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/services");
  return <PremiumServicesPage />;
}
