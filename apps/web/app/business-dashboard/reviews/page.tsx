import { PremiumReviewsPage } from "../../../components/dashboard/reviews";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/reviews");
  return <PremiumReviewsPage />;
}
