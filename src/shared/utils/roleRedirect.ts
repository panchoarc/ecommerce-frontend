export const getDefaultRouteByRole = (role: string): string => {
  const redirects: Record<string, string> = {
    admin: "/dashboard",
    user: "/dashboard",
    guest: "login",
  };

  return redirects[role];
};
