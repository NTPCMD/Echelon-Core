import { DashboardShell } from "../../components/dashboard/shell";
import { clerkEnabled } from "../../lib/clerk";

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell authEnabled={clerkEnabled}>{children}</DashboardShell>;
}
