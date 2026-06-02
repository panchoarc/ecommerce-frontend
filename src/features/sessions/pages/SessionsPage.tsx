import { useCallback, useEffect, useState } from "react";
import {
  Shield,
  Monitor,
  Smartphone,
  Globe,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

import UserSessionService from "../services/UserSessionService";

interface Session {
  id: string;
  ip: string;
  userAgent: string;
  lastActivity: string;
  current: boolean;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const getActiveSessions = useCallback(async () => {
    try {
      setLoading(true);

      const response =
        await UserSessionService.getUserSessionsActive();

      setSessions(response.data ?? []);
    } catch (error) {
      console.error("Error obteniendo sesiones:", error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getActiveSessions();
  }, [getActiveSessions]);

  const handleRevokeSession = async (sessionId: string) => {
    try {
      setRevokingId(sessionId);

      await UserSessionService.revokeSession(sessionId);

      setSessions((prev) =>
        prev.filter((session) => session.id !== sessionId)
      );
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    } finally {
      setRevokingId(null);
    }
  };

  const getDeviceIcon = (userAgent: string) => {
    const ua = userAgent.toLowerCase();

    if (
      ua.includes("android") ||
      ua.includes("iphone") ||
      ua.includes("mobile")
    ) {
      return <Smartphone size={18} />;
    }

    return <Monitor size={18} />;
  };

  const renderSessionsContent = () => {
    if (loading) {
      return <p>Cargando sesiones...</p>;
    }

    if (sessions.length === 0) {
      return (
        <p className="text-muted-foreground">
          No hay sesiones activas.
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-start justify-between rounded-lg border p-4"
          >
            <div className="flex gap-3">
              <div className="mt-1">
                {getDeviceIcon(session.userAgent)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="break-all font-medium">
                    {session.userAgent}
                  </span>

                  {session.current && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      Sesión actual
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe size={14} />
                  {session.ip}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  Última actividad:{" "}
                  {new Date(
                    session.lastActivity
                  ).toLocaleString("es-CL")}
                </div>
              </div>
            </div>

            {!session.current && (
              <Button
                variant="outline"
                size="sm"
                disabled={revokingId === session.id}
                onClick={() =>
                  handleRevokeSession(session.id)
                }
              >
                {revokingId === session.id
                  ? "Cerrando..."
                  : "Cerrar sesión"}
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={18} />
            Seguridad
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sesiones activas</CardTitle>
        </CardHeader>

        <CardContent>
          {renderSessionsContent()}
        </CardContent>
      </Card>
    </div>
  );
}