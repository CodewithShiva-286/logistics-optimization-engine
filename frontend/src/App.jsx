import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AmbientBackground } from "@/components/ambient-background";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/protected-route";

const AuthPage = lazy(() =>
  import("@/pages/auth-page").then((module) => ({ default: module.AuthPage })),
);
const CreateRequestPage = lazy(() =>
  import("@/pages/create-request-page").then((module) => ({
    default: module.CreateRequestPage,
  })),
);
const CreateRoutePage = lazy(() =>
  import("@/pages/create-route-page").then((module) => ({
    default: module.CreateRoutePage,
  })),
);
const DriverDashboardPage = lazy(() =>
  import("@/pages/driver-dashboard").then((module) => ({
    default: module.DriverDashboardPage,
  })),
);
const UserDashboardPage = lazy(() =>
  import("@/pages/user-dashboard").then((module) => ({
    default: module.UserDashboardPage,
  })),
);

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AmbientBackground />
      <Suspense
        fallback={
          <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
            <div className="mirror-panel rounded-[28px] px-8 py-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(83,168,255,0.4),transparent_70%)]" />
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/42">Loading CargoFlux</p>
            </div>
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <AuthPage mode="login" />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicOnlyRoute>
                  <AuthPage mode="signup" />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/create-request"
              element={
                <ProtectedRoute role="user">
                  <CreateRequestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-route"
              element={
                <ProtectedRoute role="driver">
                  <CreateRoutePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/user"
              element={
                <ProtectedRoute role="user">
                  <UserDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/driver"
              element={
                <ProtectedRoute role="driver">
                  <DriverDashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
