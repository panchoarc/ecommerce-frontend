import type { ComponentType } from "react";

import AdminLayout from "@/features/admin/layouts/AdminLayout";
import UserLayout from "@/features/user/layouts/UserLayout";
import BaseLayout from "@/shared/ui/BaseLayout";

import ProductDetails from "@/features/products/pages/ProductDetails";
import ProductsHome from "@/features/products/pages/ProductsHome";

import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Callback from "@/features/auth/pages/Callback";
import SecurityPage from "@/features/settings/pages/Security";

import UserHome from "@/features/user/pages/UserHome";
import Cart from "@/features/cart/pages/Cart";

import { adminRoutes } from "@/features/admin/routes";
import { userRoutes } from "@/features/user/routes";

export type AppRoute = {
  path: string;
  component: ComponentType;
  protected?: boolean;
  allowedRoles?: string[];
  hasSidebar?: boolean;
};

export type LayoutComponent = ComponentType<{
  children?: React.ReactNode;
  hasSidebar?: boolean;
}>;

export const publicRoutes: AppRoute[] = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/callback", component: Callback },
  { path: "/security", component: SecurityPage },
  { path: "/", component: UserHome },
  { path: "/products", component: ProductsHome },
  { path: "/products/:id", component: ProductDetails },
  { path: "/cart", component: Cart },
];

export const userOnlyRoutes = userRoutes;
export const adminOnlyRoutes = adminRoutes;

export const layouts: Record<string, LayoutComponent> = {
  admin: AdminLayout,
  user: UserLayout,
  guest: BaseLayout,
};
