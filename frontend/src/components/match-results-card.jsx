import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/glass-panel";

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function MatchResultsCard({
  items,
  loading = false,
  error = "",
  request,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.58, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="h-full p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Match Results</h2>
            <p className="section-copy mt-1">
              {request
                ? `Available driver routes for ${request.pickupCity} to ${request.dropCity}.`
                : "Select a shipment and run Find Matches."}
            </p>
          </div>
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
        </div>
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              Searching for matching driver routes...
            </div>
          ) : null}
          {error ? (
            <div className="rounded-[22px] border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          {!loading && !error && request && items.length === 0 ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              No driver routes matched this request.
            </div>
          ) : null}
          {!loading && !error && !request ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              Match results appear here once you choose a request.
            </div>
          ) : null}
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-white">{item._id}</span>
                <Badge variant="success">Capacity {item.capacity}</Badge>
              </div>
              <div className="mt-4 flex items-center gap-3 text-lg font-medium tracking-tight text-white">
                <span>{item.from}</span>
                <ArrowRight className="h-4 w-4 text-white/42" />
                <span>{item.to}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/48">
                <span>Driver {item.driverId}</span>
                <span>{formatDate(item.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
