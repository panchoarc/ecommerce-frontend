// config/routes.ts

import AdminLayout from "@/features/admin/layouts/AdminLayout";
import UserLayout from "@/features/user/layouts/UserLayout";
import BaseLayout from "@/shared/ui/BaseLayout";

import ProductDetails from "@/features/products/pages/ProductDetails";
import ProductsHome from "@/features/products/pages/ProductsHome";

import AdminDashboard from "@/features/admin/pages/Dashboard";
import AdminSettings from "@/features/admin/pages/Settings";
import AdminProducts from "@/features/admin/pages/ProductsHome";
import AdminCategories from "@/features/admin/pages/CategoriesHome";
import AdminCreateCategory from "@/features/admin/pages/CreateCategory";
import AdminEditCategory from "@/features/admin/pages/EditCategory";
import AdminCreateProduct from "@/features/admin/pages/CreateProduct";
import AdminEditProduct from "@/features/admin/pages/EditProduct";

import Cart from "@/features/cart/pages/Cart";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

import UserDashboard from "@/features/user/pages/UserDashboard";
import UserAddress from "@/features/address/pages/UserAddress";
import CreateAddress from "@/features/address/pages/CreateAddress";
import EditAddress from "@/features/address/pages/EditAddress";
import { ReactNode } from "react";
import UserHome from "@/features/user/pages/UserHome";
import MyOrdersHome from "@/features/order/pages/MyOrdersHome";
import MyOrderDetails from "@/features/order/pages/MyOrdersDetails";
import CreateReview from "@/features/review/pages/CreateReview";
import Checkout from "@/features/checkout/pages/Checkout";

// Definir las props comunes para los componentes
interface RouteProps {
  [key: string]: ReactNode; // Si hay más props específicas, se pueden agregar aquí
}

interface Route {
  path: string;
  component: React.ComponentType<RouteProps>;
  protected?: boolean;
}

const commonRoutes: Route[] = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];
interface Route {
  path: string;
  component: React.ComponentType<RouteProps>;
  protected?: boolean;
  hasSidebar?: boolean;
}

interface RouteWithSidebar extends Route {
  hasSidebar?: boolean;
}

const adminRoutes: Route[] = [
  {
    path: "/dashboard",
    component: AdminDashboard,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/settings",
    component: AdminSettings,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/products",
    component: AdminProducts,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/categories",
    component: AdminCategories,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/categories/create",
    component: AdminCreateCategory,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/categories/edit/:id",
    component: AdminEditCategory,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/products/create",
    component: AdminCreateProduct,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/products/edit/:id",
    component: AdminEditProduct,
    protected: true,
    hasSidebar: true,
  },
];

const userRoutes: RouteWithSidebar[] = [
  { path: "/", component: UserHome, hasSidebar: false },
  { path: "/dashboard", component: UserDashboard, hasSidebar: true },
  { path: "/products", component: ProductsHome, hasSidebar: false },
  { path: "/products/:id", component: ProductDetails, hasSidebar: false },
  { path: "/cart", component: Cart, protected: true, hasSidebar: false },
  {
    path: "/checkout",
    component: Checkout,
    protected: true,
    hasSidebar: true,
  }, // No sidebar aquí
  {
    path: "/my-address",
    component: UserAddress,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/my-address/create",
    component: CreateAddress,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/my-address/edit/:id",
    component: EditAddress,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/my-orders",
    component: MyOrdersHome,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/my-orders/:id",
    component: MyOrderDetails,
    protected: true,
    hasSidebar: true,
  },
  {
    path: "/reviews/:id",
    component: CreateReview,
    protected: true,
    hasSidebar: true,
  },
];

const guestRoutes: Route[] = [
  { path: "/", component: UserHome },
  { path: "/products", component: ProductsHome, hasSidebar: false },
  { path: "/products/:id", component: ProductDetails },
  { path: "/cart", component: Cart },
];

const routes = {
  common: [...commonRoutes],
  admin: [...adminRoutes, ...commonRoutes],
  user: [...userRoutes, ...commonRoutes],
  guest: [...guestRoutes, ...commonRoutes],
};

// Tipo de layouts, que también es más específico
interface Layouts {
  admin: React.ComponentType<RouteProps>;
  user: React.ComponentType<RouteProps>;
  guest: React.ComponentType<RouteProps>;
}

const layouts: Layouts = {
  admin: AdminLayout,
  user: UserLayout,
  guest: BaseLayout,
};

export { routes, layouts };
