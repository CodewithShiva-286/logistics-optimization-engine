import { motion } from "framer-motion";

import { GlassPanel } from "@/components/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LiquidButton } from "@/components/liquid-button";

function openLocation(url) {
  if (!url) {
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function ActiveRoutesCard({ items, loading = false, error = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="h-full p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="section-title">Active Routes</h2>
            <p className="section-copy mt-1">Routes loaded from the driver listings API.</p>
          </div>
          <Badge variant="accent">{items.length} live</Badge>
        </div>
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              Loading routes...
            </div>
          ) : null}
          {error ? (
            <div className="rounded-[22px] border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          {!loading && !error && items.length === 0 ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              No routes yet. Use New Availability to save your first route.
            </div>
          ) : null}
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/30">{item._id}</p>
                  <p className="mt-2 text-lg font-medium text-white">
                    {item.from} to {item.to}
                  </p>
                </div>
                <Badge variant="success">{item.capacity} capacity</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/50">
                <span>Driver {item.driverId}</span>
                <span>{formatDate(item.date)}</span>
              </div>
              <Progress
                value={Math.min((Number(item.capacity) / 100) * 100, 100)}
                className="mt-4"
                indicatorClassName="bg-[linear-gradient(90deg,#ff8a3d,#ff4d5f)]"
              />
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/28">
                Capacity {item.capacity}
              </div>
              {item.acceptedShipments?.length ? (
                <div className="mt-5 space-y-3 border-t border-white/8 pt-4">
                  {item.acceptedShipments.map((shipment) => (
                    <div
                      key={shipment._id}
                      className="rounded-[18px] border border-white/8 bg-white/[0.025] p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-white/30">
                            Accepted Shipment
                          </p>
                          <p className="mt-2 text-sm font-medium text-white">
                            {shipment.pickupCity} to {shipment.dropCity}
                          </p>
                        </div>
                        <Badge variant="success">Matched</Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/46">
                        <span>{shipment.weight} units</span>
                        <span>{formatDate(shipment.date)}</span>
                        <span>{shipment._id}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <LiquidButton
                          variant="secondary"
                          className="h-9 min-w-[126px] px-4 text-xs"
                          onClick={() => openLocation(shipment.pickupLocation)}
                          disabled={!shipment.pickupLocation}
                        >
                          Pickup Location
                        </LiquidButton>
                        <LiquidButton
                          variant="secondary"
                          className="h-9 min-w-[118px] px-4 text-xs"
                          onClick={() => openLocation(shipment.dropLocation)}
                          disabled={!shipment.dropLocation}
                        >
                          Drop Location
                        </LiquidButton>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}

export function MatchQueueCard({
  items,
  loading = false,
  error = "",
  actionLoadingId = "",
  onAccept,
  onReject,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="h-full p-5">
        <div>
          <h2 className="section-title">Match Requests</h2>
          <p className="section-copy mt-1">Matches derived from real request-to-route comparisons.</p>
        </div>
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              Finding request opportunities...
            </div>
          ) : null}
          {error ? (
            <div className="rounded-[22px] border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          {!loading && !error && items.length === 0 ? (
            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5 text-sm text-white/56">
              No compatible shipment requests were found for your saved routes.
            </div>
          ) : null}
          {items.map((item) => (
            <div
              key={item.request._id}
              className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-white">{item.request._id}</span>
                <Badge variant={item.decision === "accepted" ? "success" : item.decision === "rejected" ? "warning" : "accent"}>
                  {item.decision || `${item.matchingRoutes.length} match${item.matchingRoutes.length === 1 ? "" : "es"}`}
                </Badge>
              </div>
              <div className="mt-4 text-lg font-medium text-white">
                {item.request.pickupCity} to {item.request.dropCity}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/48">
                <span>{item.request.weight} units</span>
                <span>{formatDate(item.request.date)}</span>
                <span>Route {item.matchingRoutes[0]?._id}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <LiquidButton
                  variant="secondary"
                  className="min-w-[156px]"
                  onClick={() => openLocation(item.request.pickupLocation)}
                  disabled={!item.request.pickupLocation}
                >
                  Open Pickup Location
                </LiquidButton>
                <LiquidButton
                  variant="secondary"
                  className="min-w-[148px]"
                  onClick={() => openLocation(item.request.dropLocation)}
                  disabled={!item.request.dropLocation}
                >
                  Open Drop Location
                </LiquidButton>
                <LiquidButton
                  className="min-w-[132px]"
                  onClick={() => onAccept?.(item)}
                  disabled={Boolean(item.decision) || actionLoadingId === item.request._id}
                >
                  {actionLoadingId === item.request._id ? "Saving..." : "Accept Match"}
                </LiquidButton>
                <LiquidButton
                  variant="secondary"
                  className="min-w-[132px]"
                  onClick={() => onReject?.(item)}
                  disabled={Boolean(item.decision) || actionLoadingId === item.request._id}
                >
                  Reject
                </LiquidButton>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
