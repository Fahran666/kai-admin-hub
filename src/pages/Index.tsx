import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, Shield, BarChart, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-primary-foreground">
          <div className="mb-6 flex justify-center">
            <Train className="h-20 w-20 text-secondary" />
          </div>
          <h1 className="mb-4 text-5xl font-bold">
            KAI Admin Dashboard
          </h1>
          <p className="mb-8 text-xl opacity-90">
            Sistem Manajemen Kereta Api Indonesia
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/admin/login")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Shield className="mr-2 h-5 w-5" />
            Login sebagai Admin
          </Button>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <Card className="border-none bg-card/95 backdrop-blur">
            <CardHeader>
              <Train className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Monitoring Real-time</CardTitle>
              <CardDescription>
                Pantau status dan lokasi kereta secara langsung
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none bg-card/95 backdrop-blur">
            <CardHeader>
              <Users className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Manajemen Tiket</CardTitle>
              <CardDescription>
                Kelola refund dan konfirmasi tiket dengan mudah
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none bg-card/95 backdrop-blur">
            <CardHeader>
              <BarChart className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Analisis Lengkap</CardTitle>
              <CardDescription>
                Statistik dan laporan bisnis yang komprehensif
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 text-center text-primary-foreground/70">
        <p>© 2024 PT Kereta Api Indonesia. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
