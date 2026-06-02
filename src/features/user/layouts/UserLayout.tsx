import UserSidebar from "@/features/user/components/UserSidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { FC } from "react";
import UserHeader from "@/features/user/layouts/UserHeader";
import { LayoutProps } from "@/config/routes";

const UserLayout: FC<LayoutProps> = ({ children, hasSidebar }) => {
  return (
    <SidebarProvider>
      <div className="w-full h-screen flex flex-col">
        <UserHeader />

        <div className="flex flex-1 min-h-0">
          {/* Mostrar el sidebar solo si la ruta lo requiere */}
          {hasSidebar && <UserSidebar />}
          {hasSidebar && <SidebarTrigger />}
          <main className="size-full overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
