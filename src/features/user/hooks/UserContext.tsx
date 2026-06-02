import {
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import UserService from "../services/UserService";

interface UserContextType {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
  } | null;
  loading: boolean;
  roles: string[];
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { token, isLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    UserService.getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, [token]);

  const roles = profile?.roles ?? [];

  const hasRole = (role: string) => roles.includes(role);

  const hasAnyRole = (r: string[]) => r.some((role) => roles.includes(role));

  return (
    <UserContext.Provider
      value={{
        profile,
        loading: loading || isLoading,
        roles,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
