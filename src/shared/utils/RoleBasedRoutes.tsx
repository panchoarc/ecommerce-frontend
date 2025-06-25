import { Route, Routes } from "react-router";
import { routes, layouts } from "@/config/routes";
import { useUser } from "@/features/user/hooks/UserContext";
import ProtectedRoute from "@/shared/utils/ProtectedRoute";

const RoleBasedRoutes: React.FC = () => {
  const { profile } = useUser();

  // Determinar el rol del usuario
  const role = profile?.roles?.[0] || "guest";

  // Obtener el Layout correspondiente al rol
  const Layout = layouts[role] || layouts.guest;

  // Obtener las rutas correspondientes al rol
  const roleRoutes = [...routes[role], ...routes.common];

  return (
    <Routes>
      {roleRoutes.map(
        ({
          path,
          component: Component,
          protected: isProtected,
          hasSidebar,
        }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout hasSidebar={hasSidebar}>
                {isProtected ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )}
              </Layout>
            }
          />
        )
      )}
    </Routes>
  );
};

export default RoleBasedRoutes;
