import { Route, Routes } from "react-router";
import type { AppRoute, LayoutComponent } from "@/config/routes";
import {
  publicRoutes,
  userOnlyRoutes,
  adminOnlyRoutes,
  layouts,
} from "@/config/routes";
import ProtectedRoute from "@/shared/utils/ProtectedRoute";
import RoleGuard from "@/shared/utils/RoleGuard";
import { useAuth } from "@/features/auth/hooks/useAuth";

const RoleBasedRoutes = () => {
  const { roles } = useAuth();
  const role = roles?.[0]?.toLowerCase();

  const Layout: LayoutComponent = layouts[role ?? "guest"] ?? layouts.guest;

  const renderRoute = (route: AppRoute) => {
    const Page = route.component;

    const element = (
      <Layout hasSidebar={route.hasSidebar}>
        {route.protected ? (
          <ProtectedRoute>
            <RoleGuard allowedRoles={route.allowedRoles}>
              <Page />
            </RoleGuard>
          </ProtectedRoute>
        ) : (
          <Page />
        )}
      </Layout>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  };

  return (
    <Routes>
      {publicRoutes.map(renderRoute)}
      {userOnlyRoutes.map(renderRoute)}
      {adminOnlyRoutes.map(renderRoute)}
    </Routes>
  );
};

export default RoleBasedRoutes;
