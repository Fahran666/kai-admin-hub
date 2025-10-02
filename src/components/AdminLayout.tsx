import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};
