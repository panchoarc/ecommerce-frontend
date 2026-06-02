import { WebStorageStateStore } from "oidc-client-ts";

export const oidcConfig = {
  authority: import.meta.env.VITE_KEYCLOAK_URL,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: globalThis.location.origin,
  post_logout_redirect_uri: import.meta.env.VITE_FRONTEND_URL,
  automaticSilentRenew: true,
  silent_redirect_uri: `${globalThis.location.origin}/silent-renew.html`,
  usePkce: true,
  loadUserInfo: true,
  monitorSession: true,
  response_type: "code",
  scope: "openid profile email offline_access",
  userStore: new WebStorageStateStore({
    store: globalThis.sessionStorage,
  }),
};
