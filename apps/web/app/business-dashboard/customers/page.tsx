import { PremiumCustomersPage } from "../../../components/dashboard/customers";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/customers");
  return <PremiumCustomersPage />;
}
