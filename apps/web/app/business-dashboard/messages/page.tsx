import { PremiumMessagesPage } from "../../../components/dashboard/messages";
import { requireBusinessContext } from "../../../lib/auth-context";

export default async function Page() {
  await requireBusinessContext("/business-dashboard/messages");
  return <PremiumMessagesPage />;
}
