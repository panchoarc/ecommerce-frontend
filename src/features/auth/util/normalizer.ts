import { jwtDecode } from "jwt-decode";

export type NormalizedUser = {
  id?: string;
  email?: string;
  name?: string;
  roles: string[];
};

export const normalizeUser = (user: any): NormalizedUser => {
  if (!user?.access_token) {
    return { roles: [] };
  }

  const token: any = jwtDecode(user.access_token);

  // 👉 KEYCLOAK
  const keycloakRoles =
    token.realm_access?.roles ?? token.resource_access?.account?.roles;

  /*   // 👉 OKTA (ejemplo típico)
  const oktaRoles = token.groups;

  // 👉 AUTH0 (ejemplo típico)
  const auth0Roles = token["https://myapp.com/roles"]; */

  return {
    id: token.sub,
    email: token.email,
    name: token.name,
    roles: keycloakRoles || [],
  };
};
