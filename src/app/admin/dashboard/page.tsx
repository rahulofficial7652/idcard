import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { OverviewBarChart } from "@/components/dashboard/Charts";
import { Users, FileText, CreditCard, CheckCircle } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  // Fetch stats
  const orgId = session.user.organizationId;
  const whereOrg = orgId ? { organizationId: orgId } : {};

  const [userCount, schemaCount, templateCount, recordCount] = await Promise.all([
    prisma.user.count({ where: whereOrg }),
    prisma.fieldSchema.count({ where: whereOrg }),
    prisma.template.count({ where: whereOrg }),
    prisma.record.count({ where: whereOrg }),
  ]);

  // Mock data for charts
  const recordActivity = [
    { name: "Mon", total: 12 },
    { name: "Tue", total: 18 },
    { name: "Wed", total: 15 },
    { name: "Thu", total: 25 },
    { name: "Fri", total: 32 },
    { name: "Sat", total: 10 },
    { name: "Sun", total: 5 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name}. Here's what's happening in your organization.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value={userCount.toString()}
          icon={Users}
          description="Active team members"
        />
        <StatsCard
          title="ID Templates"
          value={templateCount.toString()}
          icon={FileText}
          description="Available templates"
        />
        <StatsCard
          title="Cards Issued"
          value={recordCount.toString()}
          icon={CreditCard}
          description="Total ID cards generated"
          trend={{ value: 12, label: "this week", positive: true }}
        />
        <StatsCard
          title="Active Schemas"
          value={schemaCount.toString()}
          icon={CheckCircle}
          description="Data structures"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <OverviewBarChart 
          title="Cards Issued This Week" 
          data={recordActivity} 
          className="col-span-1" 
        />
        {/* Add another chart or widget here */}
      </div>
    </div>
  );
}
