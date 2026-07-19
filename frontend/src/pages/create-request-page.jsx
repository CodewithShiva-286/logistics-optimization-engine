import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Link2, MapPin, Package, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useSession } from "@/components/session-provider";
import { FloatingInput } from "@/components/floating-input";
import { GlassPanel } from "@/components/glass-panel";
import { LiquidButton } from "@/components/liquid-button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export function CreateRequestPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [form, setForm] = useState({
    pickupCity: "",
    dropCity: "",
    pickupLocation: "",
    dropLocation: "",
    weight: "",
    date: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      await api.createRequest({
        userId: session._id,
        pickupCity: form.pickupCity.trim(),
        dropCity: form.dropCity.trim(),
        pickupLocation: form.pickupLocation.trim(),
        dropLocation: form.dropLocation.trim(),
        weight: Number(form.weight),
        date: form.date,
      });
      navigate("/app/user");
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
          <Badge variant="accent">Create Shipment</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">
            Add a new request
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/58">
            Create a shipment request using the backend request API. Once saved, it
            appears on your dashboard and can be matched against driver routes.
          </p>
          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm text-white/42">Logged in as</p>
              <p className="mt-2 text-xl font-medium text-white">{session.name}</p>
              <p className="mt-1 text-sm text-white/46">{session.email}</p>
            </div>
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-sm text-white/42">User ID</p>
              <p className="mt-2 break-all text-sm text-white/72">{session._id}</p>
            </div>
          </div>
        </GlassPanel>
        <GlassPanel hover={false} className="p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/32">Request Form</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Shipment details
              </h2>
            </div>
            <Link
              to="/app/user"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/72 transition hover:bg-white/[0.07] hover:text-white"
            >
              Back
            </Link>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <FloatingInput
              label="Pickup City"
              icon={MapPin}
              value={form.pickupCity}
              onChange={(event) =>
                setForm((current) => ({ ...current, pickupCity: event.target.value }))
              }
            />
            <FloatingInput
              label="Drop City"
              icon={MapPin}
              value={form.dropCity}
              onChange={(event) =>
                setForm((current) => ({ ...current, dropCity: event.target.value }))
              }
            />
            <FloatingInput
              type="url"
              label="Pickup Location"
              icon={Link2}
              value={form.pickupLocation}
              onChange={(event) =>
                setForm((current) => ({ ...current, pickupLocation: event.target.value }))
              }
            />
            <FloatingInput
              type="url"
              label="Drop Location"
              icon={Link2}
              value={form.dropLocation}
              onChange={(event) =>
                setForm((current) => ({ ...current, dropLocation: event.target.value }))
              }
            />
            <FloatingInput
              type="number"
              min="0"
              step="0.1"
              label="Weight"
              icon={Package}
              value={form.weight}
              onChange={(event) => setForm((current) => ({ ...current, weight: event.target.value }))}
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
              {isSaving ? "Saving..." : "Create Shipment"}
            </LiquidButton>
          </form>
        </GlassPanel>
      </div>
    </motion.main>
  );
}
