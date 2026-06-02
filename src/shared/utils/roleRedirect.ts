export const getDefaultRouteByRole = (role: string): string => {
  switch (role) {
    case "ADMIN":
      return "/dashboard";
    case "USER":
      return "/dashboard";
    default:
      return "/"; // 👈 mejor que /login
  }
};
