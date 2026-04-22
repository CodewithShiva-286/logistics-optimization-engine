import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Save, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useSession } from "@/components/session-provider";
import { FloatingInput } from "@/components/floating-input";
import { GlassPanel } from "@/components/glass-panel";
import { LiquidButton } from "@/components/liquid-button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export function CreateRoutePage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [form, setForm] = useState({
    from: "",
    to: "",
    capacity: "",
    date: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      await api.createDriverRoute({
        driverId: session._id,
        from: form.from.trim(),
        to: form.to.trim(),
        capacity: Number(form.capacity),
        date: form.date,
      });
      navigate("/app/driver");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1320px] items-center px-4 py-6 md:px-6"
    >
      <div className="grid w-full gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel hover={false} className="p-6 md:p-8">
          <Badge variant="warning">Add Availability</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">
            Publish a driver route
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/58">
            Save an available route to the backend so matching can compare shipment
            requests against your current lane and capacity.
          </p>
          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm text-white/42">Driver</p>
              <p className="mt-2 text-xl font-medium text-white">{session.name}</p>
              <p className="mt-1 text-sm text-white/46">{session.email}</p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm text-white/42">Driver ID</p>
              <p className="mt-2 break-all text-sm text-white/72">{session._id}</p>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel hover={false} className="p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/32">Route Form</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Availability details
              </h2>
            </div>
            <Link
              to="/app/driver"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/72 transition hover:bg-white/[0.07] hover:text-white"
            >
              Back
            </Link>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <FloatingInput
              label="From"
              icon={MapPin}
              value={form.from}
              onChange={(event) => setForm((current) => ({ ...current, from: event.target.value }))}
            />
            <FloatingInput
              label="To"
              icon={MapPin}
              value={form.to}
              onChange={(event) => setForm((current) => ({ ...current, to: event.target.value }))}
            />
            <FloatingInput
              type="number"
              min="0"
              step="0.1"
              label="Capacity"
              icon={Truck}
              value={form.capacity}
              onChange={(event) =>
                setForm((current) => ({ ...current, capacity: event.target.value }))
              }
            />
            <FloatingInput
              type="date"
              label="Date"
              icon={CalendarDays}
              value={form.date}
              onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            />
            {error ? (
              <div className="rounded-[20px] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}
            <LiquidButton type="submit" icon={Save} className="mt-2 w-full" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Route"}
            </LiquidButton>
          </form>
        </GlassPanel>
      </div>
    </motion.main>
  );
}
