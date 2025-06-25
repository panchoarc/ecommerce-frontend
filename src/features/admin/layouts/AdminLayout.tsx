import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminHeader from "@/features/admin/layouts/AdminHeader";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { FC, ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  hasSidebar: boolean;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children, hasSidebar }) => {
  return (
    <div className="size-full h-screen overflow-y-auto">
      <AdminHeader />
      <SidebarProvider>
        <div className="flex w-full">
          {/* Ajusta según la altura del header */}
          {hasSidebar && <AdminSidebar />}
          <SidebarTrigger />
          <main className="size-full">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
