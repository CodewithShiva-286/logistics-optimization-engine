import { Navigate, useLocation } from "react-router-dom";

import { useSession } from "@/components/session-provider";

export function ProtectedRoute({ children, role }) {
  const { session } = useSession();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role && session.role !== role) {
    return <Navigate to={session.role === "driver" ? "/app/driver" : "/app/user"} replace />;
  }

  return children;
}

export function PublicOnlyRoute({ children }) {
  const { session } = useSession();

  if (session) {
    return <Navigate to={session.role === "driver" ? "/app/driver" : "/app/user"} replace />;
  }

  return children;
}
