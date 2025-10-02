import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Bell, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Pengaturan tersimpan", {
      description: "Perubahan telah berhasil disimpan.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pengaturan</h1>
          <p className="text-muted-foreground">
            Kelola preferensi dan konfigurasi sistem
          </p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Profil Admin
            </CardTitle>
            <CardDescription>
              Informasi akun dan keamanan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" defaultValue="Admin KAI" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@kai.id" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Ubah Password</Label>
              <Input id="password" type="password" placeholder="Kosongkan jika tidak ingin mengubah" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifikasi
            </CardTitle>
            <CardDescription>
              Atur preferensi notifikasi sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Email</Label>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi via email untuk event penting
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Refund</Label>
                <p className="text-sm text-muted-foreground">
                  Alert ketika ada pengajuan refund baru
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Delay</Label>
                <p className="text-sm text-muted-foreground">
                  Alert ketika kereta mengalami keterlambatan
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Tiket</Label>
                <p className="text-sm text-muted-foreground">
                  Alert untuk tiket yang butuh konfirmasi
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Konfigurasi Email
            </CardTitle>
            <CardDescription>
              Pengaturan untuk notifikasi email otomatis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" defaultValue="smtp.kai.id" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender-email">Sender Email</Label>
              <Input id="sender-email" type="email" defaultValue="noreply@kai.id" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
