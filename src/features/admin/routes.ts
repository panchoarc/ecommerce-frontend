import Settings from "@/features/admin/pages/Settings";
import Products from "@/features/admin/pages/ProductsHome";
import Categories from "@/features/admin/pages/CategoriesHome";
import CreateCategory from "@/features/admin/pages/CreateCategory";
import EditCategory from "@/features/admin/pages/EditCategory";
import CreateProduct from "@/features/admin/pages/CreateProduct";
import EditProduct from "@/features/admin/pages/EditProduct";
import Permissions from "@/features/admin/pages/PermissionsHome";

import AdminDashboard from "@/features/admin/pages/Dashboard";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/settings",
    component: Settings,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/permissions",
    component: Permissions,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/products",
    component: Products,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/products/create",
    component: CreateProduct,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/products/edit/:id",
    component: EditProduct,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/categories",
    component: Categories,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/categories/create",
    component: CreateCategory,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/categories/edit/:id",
    component: EditCategory,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["admin"],
  },
];
