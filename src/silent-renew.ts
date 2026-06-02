import { UserManager } from "oidc-client-ts";
import { oidcConfig } from "./features/auth/config/OidcConfig";

new UserManager(oidcConfig).signinSilentCallback().catch(console.error);
