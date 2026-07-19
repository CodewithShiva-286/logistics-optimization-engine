import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { GlassPanel } from "@/components/glass-panel";
import { MatchResultsCard } from "@/components/match-results-card";
import { PerformanceCard } from "@/components/performance-card";
import { RequestListCard } from "@/components/request-list-card";
import { useSession } from "@/components/session-provider";
import { StatCard } from "@/components/stat-card";
import { api } from "@/lib/api";

function buildStats(requests) {
  const pending = requests.filter((request) => request.status === "pending").length;
  const matched = requests.filter((request) => request.status === "matched").length;
  const completed = requests.filter((request) => request.status === "completed").length;

  return [
    {
      title: "Total Requests",
      value: requests.length,
      delta: `${requests.length} records`,
      deltaVariant: "accent",
      icon: "truck",
      glow: "metric-glow-orange",
    },
    {
      title: "Pending Requests",
      value: pending,
      delta: pending ? `${pending} open` : "No backlog",
      deltaVariant: pending ? "warning" : "success",
      icon: "clock",
      glow: "metric-glow-blue",
    },
    {
      title: "Matched Requests",
      value: matched,
      delta: matched ? `${matched} confirmed` : "Awaiting match",
      deltaVariant: matched ? "success" : "accent",
      icon: "package",
      glow: "metric-glow-cyan",
    },
    {
      title: "Completed Requests",
      value: completed,
      delta: completed ? `${completed} finished` : "No completions yet",
      deltaVariant: completed ? "success" : "accent",
      icon: "wallet",
      glow: "metric-glow-purple",
    },
  ];
}

function buildInsightItems(requests) {
  const total = requests.length || 1;
  const pending = requests.filter((request) => request.status === "pending").length;
  const matched = requests.filter((request) => request.status === "matched").length;
  const completed = requests.filter((request) => request.status === "completed").length;

  return [
    {
      name: "Pending Share",
      value: Math.round((pending / total) * 100),
      copy: `${pending} request${pending === 1 ? "" : "s"} still waiting on a route match.`,
    },
    {
      name: "Matched Share",
      value: Math.round((matched / total) * 100),
      copy: `${matched} request${matched === 1 ? "" : "s"} have an accepted route assignment.`,
    },
    {
      name: "Completion Share",
      value: Math.round((completed / total) * 100),
      copy: `${completed} request${completed === 1 ? "" : "s"} have reached completed status.`,
    },
  ];
}

export function UserDashboardPage() {
  const navigate = useNavigate();
  const { session, logout } = useSession();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [matchResults, setMatchResults] = useState([]);
  const [matchLoadingId, setMatchLoadingId] = useState("");
  const [matchError, setMatchError] = useState("");

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await api.getUserRequests(session._id);
      setRequests(data);
      setSelectedRequest((current) =>
        current ? data.find((request) => request._id === current._id) || null : null,
      );
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }, [session._id]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleFindMatches = async (request) => {
    setSelectedRequest(request);
    setMatchResults([]);
    setMatchError("");
    setMatchLoadingId(request._id);

    try {
      const results = await api.findMatchesByRequest(request._id);
      setMatchResults(results);
    } catch (loadError) {
      setMatchError(loadError.message);
    } finally {
      setMatchLoadingId("");
    }
  };

  const stats = useMemo(() => buildStats(requests), [requests]);
  const insightItems = useMemo(() => buildInsightItems(requests), [requests]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1520px] gap-6 px-4 py-6 md:px-6"
    >
      <AppSidebar role="user" />
      <div className="flex-1 space-y-6">
        <DashboardHeader
          role="user"
          userName={session.name}
          title="Customer Dashboard"
          subtitle={`Welcome back, ${session.name}`}
          primaryLabel="New Shipment"
          secondaryLabel="Refresh"
          onPrimaryAction={() => navigate("/create-request")}
          onSecondaryAction={loadRequests}
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
        <div className="grid gap-6 xl:grid-cols-[1.05fr_1.1fr]">
          <section className="space-y-6">
            <RequestListCard
              title="Shipment Requests"
              items={requests}
              loading={isLoading}
              error={error}
              activeRequestId={selectedRequest?._id || ""}
              loadingRequestId={matchLoadingId}
              onFindMatches={handleFindMatches}
            />
          </section>
          <section className="space-y-6">
            <GlassPanel className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="section-title">Workspace Session</h2>
                  <p className="section-copy mt-1">Real session data tied to request ownership.</p>
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
                  <p className="text-sm text-white/44">User ID</p>
                  <p className="mt-2 break-all text-sm text-white/72">{session._id}</p>
                </div>
              </div>
            </GlassPanel>
            <PerformanceCard title="Request Status" items={insightItems} />
            <MatchResultsCard
              items={matchResults}
              request={selectedRequest}
              loading={Boolean(matchLoadingId)}
              error={matchError}
            />
          </section>
        </div>
      </div>
    </motion.main>
  );
}
