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
import { Check, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface TicketConfirmation {
  id: string;
  bookingId: string;
  userName: string;
  trainName: string;
  route: string;
  date: string;
  seatNumber: string;
  amount: number;
  paymentStatus: string;
  status: "pending" | "approved" | "rejected";
}

const initialTickets: TicketConfirmation[] = [
  {
    id: "CF-001",
    bookingId: "BK-20241002-045",
    userName: "Rina Kartika",
    trainName: "Argo Bromo Anggrek",
    route: "Jakarta - Surabaya",
    date: "2024-10-05",
    seatNumber: "A12",
    amount: 450000,
    paymentStatus: "verified",
    status: "pending",
  },
  {
    id: "CF-002",
    bookingId: "BK-20241002-056",
    userName: "Joko Widodo",
    trainName: "Bima Express",
    route: "Jakarta - Surabaya",
    date: "2024-10-06",
    seatNumber: "B05",
    amount: 350000,
    paymentStatus: "verified",
    status: "pending",
  },
  {
    id: "CF-003",
    bookingId: "BK-20241002-034",
    userName: "Sri Mulyani",
    trainName: "Gajayana",
    route: "Jakarta - Malang",
    date: "2024-10-04",
    seatNumber: "C08",
    amount: 500000,
    paymentStatus: "verified",
    status: "approved",
  },
];

const Confirmation = () => {
  const [tickets, setTickets] = useState<TicketConfirmation[]>(initialTickets);

  const handleConfirm = (id: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "approved" as const } : ticket
      )
    );
    toast.success("Tiket dikonfirmasi", {
      description: "Penumpang akan menerima notifikasi konfirmasi via email/SMS.",
    });
  };

  const handleCancel = (id: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "rejected" as const } : ticket
      )
    );
    toast.error("Tiket dibatalkan", {
      description: "Penumpang akan diberitahu tentang pembatalan ini.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const pendingCount = tickets.filter((t) => t.status === "pending").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Konfirmasi Tiket</h1>
          <p className="text-muted-foreground">
            Verifikasi dan konfirmasi pemesanan tiket
          </p>
        </div>

        {/* Alert Card */}
        {pendingCount > 0 && (
          <Card className="border-warning bg-warning/5">
            <CardContent className="flex items-center gap-3 pt-6">
              <AlertCircle className="h-5 w-5 text-warning" />
              <p className="text-sm font-medium text-foreground">
                Ada {pendingCount} tiket menunggu konfirmasi
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Tiket Pending</CardTitle>
            <CardDescription>
              Konfirmasi tiket yang sudah melakukan pembayaran
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Konfirmasi</TableHead>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Nama Penumpang</TableHead>
                    <TableHead>Kereta</TableHead>
                    <TableHead>Rute</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Kursi</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Pembayaran</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.bookingId}</TableCell>
                      <TableCell>{ticket.userName}</TableCell>
                      <TableCell>{ticket.trainName}</TableCell>
                      <TableCell>{ticket.route}</TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell>{ticket.seatNumber}</TableCell>
                      <TableCell>{formatCurrency(ticket.amount)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                          {ticket.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={ticket.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        {ticket.status === "pending" ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleConfirm(ticket.id)}
                              className="bg-success hover:bg-success/90"
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancel(ticket.id)}
                              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <X className="mr-1 h-4 w-4" />
                              Cancel
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

        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Tiket</p>
                <p className="text-3xl font-bold text-foreground">{tickets.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-warning">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Terkonfirmasi</p>
                <p className="text-3xl font-bold text-success">
                  {tickets.filter((t) => t.status === "approved").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Confirmation;
