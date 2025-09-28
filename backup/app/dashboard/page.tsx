import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { apiClientServer } from "@/lib/api-client-server";

async function getDashboardData() {
  try {
    const [
      user,
      profile,
      enrollments,
      commissions,
      transactions,
      blogPosts,
      topEarners,
      monthlyCommissions,
      directReferrals,
    ] = await Promise.all([
      apiClientServer.get("/auth/me"),
      apiClientServer.get("/users/profile"),
      apiClientServer.get("/users/enrollments"),
      apiClientServer.get("/commissions"),
      apiClientServer.get("/transactions"),
      apiClientServer.get("/blog"),
      apiClientServer.get("/commissions/top-earners"),
      apiClientServer.get("/commissions/monthly"),
      apiClientServer.get("/users/direct-referrals"),
    ]);

    return {
      user,
      profile,
      enrollments,
      commissions,
      transactions,
      blogPosts,
      topEarners,
      monthlyCommissions,
      directReferrals,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    redirect("/auth/login");
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return <DashboardContent {...data} />;
}