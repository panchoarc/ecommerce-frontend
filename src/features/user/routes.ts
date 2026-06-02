import UserDashboard from "@/features/user/pages/UserDashboard";
import UserAddress from "@/features/address/pages/UserAddress";
import CreateAddress from "@/features/address/pages/CreateAddress";
import EditAddress from "@/features/address/pages/EditAddress";

import UserHome from "@/features/user/pages/UserHome";
import MyOrdersHome from "@/features/order/pages/MyOrdersHome";
import MyOrderDetails from "@/features/order/pages/MyOrdersDetails";
import CreateReview from "@/features/review/pages/CreateReview";
import Checkout from "@/features/checkout/pages/Checkout";
import UserSecurity from "@/features/settings/pages/Security";
import UserSessions from "@/features/sessions/pages/SessionsPage";

import Cart from "@/features/cart/pages/Cart";

export const userRoutes = [
  { path: "/", component: UserHome, hasSidebar: false },
  { path: "/dashboard", component: UserDashboard, hasSidebar: true },
  { path: "/cart", component: Cart, protected: true, hasSidebar: false },
  {
    path: "/checkout",
    component: Checkout,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  },
  {
    path: "/my-address",
    component: UserAddress,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  },
  {
    path: "/my-address/create",
    component: CreateAddress,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  },
  {
    path: "/my-address/edit/:id",
    component: EditAddress,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  },
  {
    path: "/my-orders",
    component: MyOrdersHome,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  },
  {
    path: "/my-orders/:id",
    component: MyOrderDetails,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  },
  {
    path: "/reviews/:id",
    component: CreateReview,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  },
  {
    path: "/settings",
    component: UserSecurity,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  }
  ,{
    path: "/sessions",
    component: UserSessions,
    protected: true,
    hasSidebar: true,
    allowedRoles: ["user"],
  }
];
