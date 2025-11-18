import { auth } from "@clerk/nextjs/server";
import Admin from "@/models/Admin";
import { connect } from "@/lib/db";

export default async function Dashboard() {
  const { userId }:any = auth();
  if (!userId) return <div>Unauthorized</div>;

  await connect();
  const admin = await Admin.findOne({ clerkId: userId });

  if (!admin || (admin.role !== "admin" && admin.role !== "superadmin")) {
    return <div>Unauthorized</div>;
  }

  return <div>ADMIN DASHBOARD</div>;
}
