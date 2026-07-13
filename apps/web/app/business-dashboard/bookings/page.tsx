import { PremiumBookingsPage } from "../../../components/dashboard/bookings";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/bookings");
  return <PremiumBookingsPage />;
}
