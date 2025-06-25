import { SidebarProvider } from "@/shared/ui/sidebar";
import { ReactNode } from "react";

interface BasicLayoutProps {
  children: ReactNode;
}

const ProductsLayout = ({ children }: BasicLayoutProps) => {
  return (
    <div className="flex flex-col bg-gray-100">
      <SidebarProvider>
        <main className="flex-grow h-screen">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default ProductsLayout;
