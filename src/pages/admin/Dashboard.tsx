import { AdminLayout } from "@/components/AdminLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, FileText, CheckCircle, Users, TrendingUp, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const weeklyData = [
  { day: "Sen", perjalanan: 45, refund: 8 },
  { day: "Sel", perjalanan: 52, refund: 12 },
  { day: "Rab", perjalanan: 48, refund: 6 },
  { day: "Kam", perjalanan: 61, refund: 9 },
  { day: "Jum", perjalanan: 55, refund: 14 },
  { day: "Sab", perjalanan: 67, refund: 7 },
  { day: "Min", perjalanan: 58, refund: 10 },
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Admin KAI</h1>
          <p className="text-muted-foreground">Monitoring sistem kereta api Indonesia</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Kereta Aktif"
            value={24}
            icon={Train}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Refund Pending"
            value={18}
            icon={FileText}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Tiket Dikonfirmasi"
            value={342}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="User Aktif"
            value="1.2K"
            icon={Users}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Perjalanan Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Perjalanan Mingguan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="perjalanan"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Refund Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                Refund Mingguan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="refund"
                    fill="hsl(var(--secondary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Refund disetujui",
                  detail: "Tiket #TK-20241002-001",
                  time: "5 menit lalu",
                },
                {
                  action: "Kereta tiba",
                  detail: "Argo Bromo Anggrek (KA-001)",
                  time: "15 menit lalu",
                },
                {
                  action: "Tiket dikonfirmasi",
                  detail: "Booking #BK-20241002-045",
                  time: "30 menit lalu",
                },
                {
                  action: "Delay terdeteksi",
                  detail: "Bima Express (KA-012) - 20 menit",
                  time: "1 jam lalu",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
