import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
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
import { Search, Filter, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const trainsData = [
  {
    id: "KA-001",
    name: "Argo Bromo Anggrek",
    route: "Jakarta - Surabaya",
    lastStation: "Semarang Tawang",
    eta: "14:30",
    delay: 0,
    status: "on-time" as const,
  },
  {
    id: "KA-002",
    name: "Bima Express",
    route: "Jakarta - Surabaya",
    lastStation: "Cirebon",
    eta: "15:45",
    delay: 20,
    status: "delayed" as const,
  },
  {
    id: "KA-003",
    name: "Argo Parahyangan",
    route: "Jakarta - Bandung",
    lastStation: "Bandung",
    eta: "12:00",
    delay: 0,
    status: "arrived" as const,
  },
  {
    id: "KA-004",
    name: "Gajayana",
    route: "Jakarta - Malang",
    lastStation: "Surabaya Gubeng",
    eta: "18:20",
    delay: 10,
    status: "delayed" as const,
  },
  {
    id: "KA-005",
    name: "Turangga",
    route: "Jakarta - Surabaya",
    lastStation: "Tegal",
    eta: "16:15",
    delay: 0,
    status: "on-time" as const,
  },
];

const Trains = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTrains = trainsData.filter((train) => {
    const matchesSearch =
      train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.route.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || train.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monitoring Kereta</h1>
          <p className="text-muted-foreground">
            Pantau status dan posisi kereta secara real-time
          </p>
        </div>

        {/* Filters Card */}
        <Card>
          <CardHeader>
            <CardTitle>Filter & Pencarian</CardTitle>
            <CardDescription>Cari kereta berdasarkan nama, nomor, atau rute</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari kereta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="on-time">On Time</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="arrived">Arrived</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Card */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. KA</TableHead>
                    <TableHead>Nama Kereta</TableHead>
                    <TableHead>Rute</TableHead>
                    <TableHead>Stasiun Terakhir</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Delay</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrains.length > 0 ? (
                    filteredTrains.map((train) => (
                      <TableRow key={train.id}>
                        <TableCell className="font-medium">{train.id}</TableCell>
                        <TableCell>{train.name}</TableCell>
                        <TableCell>{train.route}</TableCell>
                        <TableCell>{train.lastStation}</TableCell>
                        <TableCell>{train.eta}</TableCell>
                        <TableCell>
                          {train.delay > 0 ? (
                            <span className="text-warning">+{train.delay} min</span>
                          ) : (
                            <span className="text-success">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={train.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        Tidak ada data kereta yang sesuai
                      </TableCell>
                    </TableRow>
                  )}
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
                <p className="text-sm text-muted-foreground">Total Kereta</p>
                <p className="text-3xl font-bold text-foreground">{trainsData.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">On Time</p>
                <p className="text-3xl font-bold text-success">
                  {trainsData.filter((t) => t.status === "on-time").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Delayed</p>
                <p className="text-3xl font-bold text-warning">
                  {trainsData.filter((t) => t.status === "delayed").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Trains;
