import { PremiumStaffPage } from "../../../components/dashboard/staff";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/staff");
  return <PremiumStaffPage />;
}
