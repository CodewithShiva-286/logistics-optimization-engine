import { motion } from "framer-motion";

import { LiquidButton } from "@/components/liquid-button";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/glass-panel";
import { Separator } from "@/components/ui/separator";

function statusVariant(status) {
  if (status === "matched" || status === "completed") {
    return "success";
  }
  if (status === "pending") {
    return "warning";
  }
  return "accent";
}

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function RequestListCard({
  title,
  items,
  loading = false,
  error = "",
  activeRequestId = "",
  loadingRequestId = "",
  onFindMatches,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="h-full p-5">
        <div className="flex items-center justify-between">
          <h2 className="section-title">{title}</h2>
          <span className="h-2 w-2 rounded-full bg-white/70" />
        </div>
        <div className="mt-5 space-y-4">
          {loading ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              Loading requests...
            </div>
          ) : null}
          {error ? (
            <div className="rounded-[22px] border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          {!loading && !error && items.length === 0 ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              No shipments yet. Use the New Shipment button to create your first request.
            </div>
          ) : null}
          {items.map((item, index) => (
            <div key={item._id}>
              <div className="rounded-[22px] border border-white/8 bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.04]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/28">{item._id}</p>
                    <div className="mt-4 flex flex-col gap-2 text-white md:flex-row md:items-center md:gap-4">
                      <span className="text-xl font-medium tracking-tight">{item.pickupCity}</span>
                      <span className="text-sm text-white/40">to</span>
                      <span className="text-xl font-medium tracking-tight">{item.dropCity}</span>
                    </div>
                  </div>
                  <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/46">
                  <span>{item.weight} units</span>
                  <span>{formatDate(item.date)}</span>
                  <span>Created {formatDate(item.createdAt)}</span>
                  {item.status === "matched" ? (
                    <span className="text-emerald-300">Driver accepted your request</span>
                  ) : null}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <LiquidButton
                    variant={activeRequestId === item._id ? "primary" : "secondary"}
                    className="min-w-[148px]"
                    onClick={() => onFindMatches?.(item)}
                    disabled={loadingRequestId === item._id}
                  >
                    {loadingRequestId === item._id ? "Finding..." : "Find Matches"}
                  </LiquidButton>
                  {activeRequestId === item._id ? (
                    <Badge variant="accent">Results shown on the right</Badge>
                  ) : null}
                </div>
              </div>
              {index < items.length - 1 ? <Separator className="mt-4" /> : null}
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
