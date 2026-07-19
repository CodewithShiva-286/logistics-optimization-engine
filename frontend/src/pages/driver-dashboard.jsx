import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { ActiveRoutesCard, MatchQueueCard } from "@/components/driver-ops-card";
import { GlassPanel } from "@/components/glass-panel";
import { PerformanceCard } from "@/components/performance-card";
import { useSession } from "@/components/session-provider";
import { StatCard } from "@/components/stat-card";
import { api } from "@/lib/api";

function buildStats(routes, opportunities, pendingRequests) {
  const totalCapacity = routes.reduce((sum, route) => sum + Number(route.capacity || 0), 0);
  const openOpportunities = opportunities.filter((item) => !item.decision).length;

  return [
    {
      title: "Saved Routes",
      value: routes.length,
      delta: `${routes.length} active`,
      deltaVariant: "accent",
      icon: "route",
      glow: "metric-glow-orange",
    },
    {
      title: "Total Capacity",
      value: totalCapacity,
      delta: totalCapacity ? `${totalCapacity} units` : "No capacity yet",
      deltaVariant: totalCapacity ? "success" : "warning",
      icon: "gauge",
      glow: "metric-glow-blue",
    },
    {
      title: "Open Opportunities",
      value: openOpportunities,
      delta: openOpportunities ? `${openOpportunities} matched` : "No matches yet",
      deltaVariant: openOpportunities ? "success" : "accent",
      icon: "shield",
      glow: "metric-glow-cyan",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      delta: pendingRequests ? `${pendingRequests} waiting` : "Queue is clear",
      deltaVariant: pendingRequests ? "warning" : "success",
      icon: "wallet",
      glow: "metric-glow-purple",
    },
  ];
}

function buildInsights(routes, opportunities) {
  const totalRoutes = routes.length || 1;
  const totalCapacity = routes.reduce((sum, route) => sum + Number(route.capacity || 0), 0);
  const avgCapacity = totalCapacity ? Math.round(totalCapacity / totalRoutes) : 0;
  const futureRoutes = routes.filter((route) => new Date(route.date) >= new Date()).length;

  return [
    {
      name: "Average Capacity",
      value: Math.min(avgCapacity, 100),
      copy: `${avgCapacity} capacity units on average across your saved routes.`,
    },
    {
      name: "Upcoming Routes",
      value: Math.min(Math.round((futureRoutes / totalRoutes) * 100), 100),
      copy: `${futureRoutes} route${futureRoutes === 1 ? "" : "s"} are scheduled today or later.`,
    },
    {
      name: "Match Coverage",
      value: Math.min(Math.round((opportunities.length / totalRoutes) * 100), 100),
      copy: `${opportunities.length} request${opportunities.length === 1 ? "" : "s"} match at least one of your lanes.`,
    },
  ];
}

export function DriverDashboardPage() {
  const navigate = useNavigate();
  const { session, logout } = useSession();
  const [routes, setRoutes] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [routeLoading, setRouteLoading] = useState(true);
  const [matchLoading, setMatchLoading] = useState(true);
  const [routeError, setRouteError] = useState("");
  const [matchError, setMatchError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [decisions, setDecisions] = useState({});
  const [pendingRequests, setPendingRequests] = useState(0);

  const routesWithAcceptedShipments = useMemo(
    () =>
      routes.map((route) => ({
        ...route,
        acceptedShipments: opportunities
          .filter(
            (item) =>
              item.decision === "accepted" &&
              item.matchingRoutes?.[0]?._id === route._id,
          )
          .map((item) => item.request),
      })),
    [routes, opportunities],
  );

  const loadDashboard = useCallback(async () => {
    setRouteLoading(true);
    setMatchLoading(true);
    setRouteError("");
    setMatchError("");

    try {
      const [allRoutes, allRequests] = await Promise.all([
        api.getAllDriverRoutes(),
        api.getAllRequests(),
      ]);
      const pendingOnly = allRequests.filter((request) => request.status === "pending");

      const ownRoutes = allRoutes.filter((route) => route.driverId === session._id);
      setRoutes(ownRoutes);
      setPendingRequests(pendingOnly.length);
      setRouteLoading(false);

      if (ownRoutes.length === 0) {
        setOpportunities([]);
        setMatchLoading(false);
        return;
      }

      const settled = await Promise.allSettled(
        pendingOnly.map(async (request) => {
          const results = await api.findMatchesByRequest(request._id);
          const matchingRoutes = results.filter((route) => route.driverId === session._id);

          if (!matchingRoutes.length) {
            return null;
          }

          return {
            request,
            matchingRoutes,
            decision: decisions[request._id] || "",
          };
        }),
      );

      const items = settled
        .filter((entry) => entry.status === "fulfilled" && entry.value)
        .map((entry) => entry.value);

      setOpportunities(items);
      if (settled.some((entry) => entry.status === "rejected")) {
        setMatchError("Some match opportunities could not be loaded.");
      }
    } catch (loadError) {
      setRouteError(loadError.message);
      setMatchError(loadError.message);
    } finally {
      setRouteLoading(false);
      setMatchLoading(false);
    }
  }, [decisions, session._id]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleMatchDecision = async (item, decision) => {
    setActionLoadingId(item.request._id);
    setMatchError("");

    try {
      const createdMatch = await api.createMatch({
        requestId: item.request._id,
        driverId: session._id,
      });

      if (decision === "accepted") {
        await api.acceptMatch(createdMatch._id);
      } else {
        await api.rejectMatch(createdMatch._id);
      }

      setDecisions((current) => ({
        ...current,
        [item.request._id]: decision,
      }));

      setOpportunities((current) =>
        current.map((entry) =>
          entry.request._id === item.request._id ? { ...entry, decision } : entry,
        ),
      );
    } catch (actionError) {
      setMatchError(actionError.message);
    } finally {
      setActionLoadingId("");
    }
  };

  const stats = useMemo(
    () => buildStats(routes, opportunities, pendingRequests),
    [routes, opportunities, pendingRequests],
  );
  const insights = useMemo(() => buildInsights(routes, opportunities), [routes, opportunities]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1520px] gap-6 px-4 py-6 md:px-6"
    >
      <AppSidebar role="driver" />
      <div className="flex-1 space-y-6">
        <DashboardHeader
          role="driver"
          userName={session.name}
          title="Driver Operations Dashboard"
          subtitle={`Welcome back, ${session.name}`}
          primaryLabel="New Availability"
          secondaryLabel="Refresh"
          onPrimaryAction={() => navigate("/create-route")}
          onSecondaryAction={loadDashboard}
          onLogout={() => {
            logout();
            navigate("/login");
          }}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
          <section className="space-y-6">
            <GlassPanel className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="section-title">Driver Session</h2>
                  <p className="section-copy mt-1">Saved availability tied to your persistent driver id.</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/68">
                  {session.role}
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm text-white/44">Name</p>
                  <p className="mt-2 text-lg font-medium text-white">{session.name}</p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm text-white/44">Email</p>
                  <p className="mt-2 text-lg font-medium text-white">{session.email}</p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 md:col-span-2">
                  <p className="text-sm text-white/44">Driver ID</p>
                  <p className="mt-2 break-all text-sm text-white/72">{session._id}</p>
                </div>
              </div>
            </GlassPanel>
            <ActiveRoutesCard
              items={routesWithAcceptedShipments}
              loading={routeLoading}
              error={routeError}
            />
          </section>
          <section className="space-y-6">
            <PerformanceCard title="Capacity Intelligence" items={insights} />
            <MatchQueueCard
              items={opportunities}
              loading={matchLoading}
              error={matchError}
              actionLoadingId={actionLoadingId}
              onAccept={(item) => handleMatchDecision(item, "accepted")}
              onReject={(item) => handleMatchDecision(item, "rejected")}
            />
          </section>
        </div>
      </div>
    </motion.main>
  );
}
