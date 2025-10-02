import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X, Clock } from "lucide-react";
import { toast } from "sonner";

interface RefundRequest {
  id: string;
  ticketId: string;
  userName: string;
  trainName: string;
  amount: number;
  reason: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const initialRefunds: RefundRequest[] = [
  {
    id: "RF-001",
    ticketId: "TK-20241002-001",
    userName: "Ahmad Wijaya",
    trainName: "Argo Bromo Anggrek",
    amount: 450000,
    reason: "Kereta terlambat lebih dari 2 jam",
    date: "2024-10-02",
    status: "pending",
  },
  {
    id: "RF-002",
    ticketId: "TK-20241002-015",
    userName: "Siti Nurhaliza",
    trainName: "Bima Express",
    amount: 350000,
    reason: "Pembatalan perjalanan mendadak",
    date: "2024-10-02",
    status: "pending",
  },
  {
    id: "RF-003",
    ticketId: "TK-20241001-089",
    userName: "Budi Santoso",
    trainName: "Gajayana",
    amount: 500000,
    reason: "Kendala teknis kereta",
    date: "2024-10-01",
    status: "approved",
  },
  {
    id: "RF-004",
    ticketId: "TK-20241001-045",
    userName: "Dewi Lestari",
    trainName: "Turangga",
    amount: 300000,
    reason: "Salah booking",
    date: "2024-10-01",
    status: "rejected",
  },
];

const Refund = () => {
  const [refunds, setRefunds] = useState<RefundRequest[]>(initialRefunds);

  const handleApprove = (id: string) => {
    setRefunds((prev) =>
      prev.map((refund) =>
        refund.id === id ? { ...refund, status: "approved" as const } : refund
      )
    );
    toast.success("Refund disetujui", {
      description: `Refund ${id} telah disetujui dan dana akan diproses.`,
    });
  };

  const handleReject = (id: string) => {
    setRefunds((prev) =>
      prev.map((refund) =>
        refund.id === id ? { ...refund, status: "rejected" as const } : refund
      )
    );
    toast.error("Refund ditolak", {
      description: `Refund ${id} telah ditolak.`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const pendingCount = refunds.filter((r) => r.status === "pending").length;
  const approvedCount = refunds.filter((r) => r.status === "approved").length;
  const rejectedCount = refunds.filter((r) => r.status === "rejected").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Refund</h1>
          <p className="text-muted-foreground">
            Kelola pengajuan refund dari pelanggan
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-warning">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold text-success">{approvedCount}</p>
                </div>
                <Check className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-3xl font-bold text-destructive">{rejectedCount}</p>
                </div>
                <X className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refund Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Pengajuan Refund</CardTitle>
            <CardDescription>
              Review dan proses permintaan refund pelanggan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Refund</TableHead>
                    <TableHead>ID Tiket</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kereta</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Alasan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refunds.map((refund) => (
                    <TableRow key={refund.id}>
                      <TableCell className="font-medium">{refund.id}</TableCell>
                      <TableCell>{refund.ticketId}</TableCell>
                      <TableCell>{refund.userName}</TableCell>
                      <TableCell>{refund.trainName}</TableCell>
                      <TableCell>{formatCurrency(refund.amount)}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {refund.reason}
                      </TableCell>
                      <TableCell>{refund.date}</TableCell>
                      <TableCell>
                        <StatusBadge status={refund.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {refund.status === "pending" ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(refund.id)}
                              className="border-success text-success hover:bg-success hover:text-success-foreground"
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(refund.id)}
                              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <X className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Diproses
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Refund;
