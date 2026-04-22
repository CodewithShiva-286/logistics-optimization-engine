import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, Truck, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { FloatingInput } from "@/components/floating-input";
import { GlassPanel } from "@/components/glass-panel";
import { LiquidButton } from "@/components/liquid-button";
import { useSession } from "@/components/session-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AuthPage({ mode = "login" }) {
  const navigate = useNavigate();
  const { login, signup } = useSession();
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageMeta = useMemo(
    () =>
      mode === "signup"
        ? {
            eyebrow: "CargoFlux Access",
            title: "Create your command center",
            copy:
              "Set up a real session-backed workspace for shippers and drivers, then connect that identity to requests and route data.",
            action: "Create Account",
          }
        : {
            eyebrow: "CargoFlux Access",
            title: "Enter the logistics control layer",
            copy:
              "Use a real form, persist your session locally, and land in the dashboard that matches your saved role.",
            action: "Continue",
          },
    [mode],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role,
      };

      const nextSession = await (
        mode === "signup"
          ? signup(payload)
          : login({
              email: payload.email,
              password: payload.password,
              role,
            })
      );

      navigate(nextSession.role === "driver" ? "/app/driver" : "/app/user");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-4 py-6 md:px-6"
    >
      <div className="grid w-full gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassPanel hover={false} className="relative min-h-[740px] overflow-hidden p-6 md:p-8">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="max-w-xl">
              <Badge variant="accent">{pageMeta.eyebrow}</Badge>
              <h1 className="mt-5 max-w-lg text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {pageMeta.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/58 md:text-lg">
                {pageMeta.copy}
              </p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/34">Session</p>
                  <p className="mt-3 text-lg font-medium text-white">Mongo-backed account login</p>
                  <p className="mt-2 text-sm leading-6 text-white/48">
                    Sign up and login now call real backend auth endpoints, while the active user
                    object is cached only for the current browser session so refreshes work without
                    leaving a long-lived local login behind.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/34">Backend Link</p>
                  <p className="mt-3 text-lg font-medium text-white">Real Mongo user ids</p>
                  <p className="mt-2 text-sm leading-6 text-white/48">
                    Requests, routes, and matches now use the `_id` returned by MongoDB, so each
                    record points to a stored user instead of a generated frontend placeholder.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/34">Workspaces</p>
                  <p className="mt-3 text-lg font-medium text-white">User and driver roles</p>
                  <p className="mt-2 text-sm leading-6 text-white/48">
                    The selected role controls which dashboard you see and which backend flow is
                    enabled next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel hover={false} className="mx-auto flex w-full max-w-[540px] items-center p-6 md:p-8">
          <div className="w-full">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/32">Authentication</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {mode === "signup" ? "Sign up" : "Log in"}
                </h2>
              </div>
              <Link
                to={mode === "signup" ? "/login" : "/signup"}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/72 transition hover:bg-white/[0.07] hover:text-white"
              >
                {mode === "signup" ? "Have an account?" : "Create account"}
              </Link>
            </div>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" ? (
                <FloatingInput
                  label="Full name"
                  value={form.name}
                  icon={UserRound}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                />
              ) : null}
              <FloatingInput
                type="email"
                label="Work email"
                value={form.email}
                icon={Mail}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
              <FloatingInput
                type="password"
                label="Password"
                value={form.password}
                icon={LockKeyhole}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
              />
              <div className="pt-2">
                <p className="mb-3 text-sm text-white/50">Choose role</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { key: "user", label: "User", copy: "Manage demand, requests, and matches." },
                    { key: "driver", label: "Driver", copy: "Track routes, capacity, and load offers." },
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setRole(option.key)}
                      className={cn(
                        "rounded-[22px] border p-4 text-left transition-all duration-300",
                        role === option.key
                          ? "border-sky-300/30 bg-[linear-gradient(135deg,rgba(83,168,255,0.14),rgba(123,97,255,0.16))]"
                          : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-white/84">
                          {option.key === "driver" ? <Truck className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="text-base font-medium text-white">{option.label}</div>
                          <div className="mt-1 text-sm text-white/46">{option.copy}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {error ? (
                <div className="rounded-[20px] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}
              <LiquidButton type="submit" icon={ArrowRight} className="mt-2 w-full" disabled={isSubmitting}>
                {isSubmitting ? "Working..." : pageMeta.action}
              </LiquidButton>
            </form>
            <p className="mt-5 text-sm text-white/44">
              {mode === "signup"
                ? "Sign up creates a MongoDB user and starts a local session."
                : "Log in checks your MongoDB user and restores the local session."}
            </p>
          </div>
        </GlassPanel>
      </div>
    </motion.main>
  );
}
