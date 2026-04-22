import { createContext, useContext, useMemo, useState } from "react";

import { api } from "@/lib/api";
import { STORAGE_KEYS, clearStorage, readStorage, writeStorage } from "@/lib/session";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(() => readStorage(STORAGE_KEYS.session, null));

  const login = async ({ email, password, role }) => {
    const user = await api.login({ email, password, role });
    writeStorage(STORAGE_KEYS.session, user);
    setSession(user);
    return user;
  };

  const signup = async ({ name, email, password, role }) => {
    const user = await api.signup({ name, email, password, role });
    writeStorage(STORAGE_KEYS.session, user);
    setSession(user);
    return user;
  };

  const logout = () => {
    clearStorage(STORAGE_KEYS.session);
    setSession(null);
  };

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      signup,
      logout,
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider.");
  }
  return context;
}
