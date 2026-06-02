import { LayoutProps } from "@/config/routes";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminHeader from "@/features/admin/layouts/AdminHeader";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { FC } from "react";

const AdminLayout: FC<LayoutProps> = ({ children, hasSidebar }) => {
  return (
    <SidebarProvider>
      <div className="w-full h-screen flex flex-col">
        <AdminHeader />
        <div className="flex flex-1 min-h-0">
          {hasSidebar && <AdminSidebar />}

          <main className="w-full m-4 p-4 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
