import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
  useSidebar,
} from "@/shared/ui/sidebar";

import {
  FerrisWheelIcon,
  Home,
  ListCheck,
  Package,
  ShipWheel,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/shared/ui/button";

const items = [
  {
    title: "Home",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: ListCheck,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: FerrisWheelIcon,
  },
  {
    title: "Permissions",
    url: "/admin/permissions",
    icon: ShipWheel,
  },
];

const AdminSidebar = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          {open && <span className="font-semibold">Admin Panel</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-black" asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-lg font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
