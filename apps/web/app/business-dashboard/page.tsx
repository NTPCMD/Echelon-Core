import { OverviewDashboard } from "../../components/dashboard/overview";
import { requireBusinessContext } from "../../lib/auth-context";

export default async function BusinessDashboardPage() {
  await requireBusinessContext("/business-dashboard");
  return <OverviewDashboard />;
}
