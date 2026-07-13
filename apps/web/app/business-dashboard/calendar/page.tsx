import { PremiumCalendarPage } from "../../../components/dashboard/calendar";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/calendar");
  return <PremiumCalendarPage />;
}
