import UserSidebar from "@/features/user/components/UserSidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { FC, ReactNode } from "react";
import UserHeader from "@/features/user/layouts/UserHeader";

interface UserLayoutProps {
  children: ReactNode;
  hasSidebar: boolean;
}

const UserLayout: FC<UserLayoutProps> = ({ children, hasSidebar }) => {
  return (
    <div className="size-full h-screen overflow-y-auto">
      <UserHeader />

      <SidebarProvider>
        <div className="flex w-full">
          {/* Mostrar el sidebar solo si la ruta lo requiere */}
          {hasSidebar && <UserSidebar />}
          {hasSidebar && <SidebarTrigger />}
          <main className="size-full overflow-y-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserLayout;
