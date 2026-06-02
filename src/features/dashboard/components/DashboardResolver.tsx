import { useUser } from "@/features/user/hooks/UserContext";
import AdminDashboard from "@/features/admin/pages/Dashboard";
import UserDashboard from "@/features/user/pages/UserDashboard";
import { Navigate } from "react-router";

const DashboardResolver = () => {
  const { roles } = useUser();

  if (roles.includes("admin")) return <AdminDashboard />;
  if (roles.includes("user")) return <UserDashboard />;

  return <Navigate to="/" replace />;
};

export default DashboardResolver;
