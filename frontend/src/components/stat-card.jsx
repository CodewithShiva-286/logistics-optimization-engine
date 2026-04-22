import {
  Clock3,
  Gauge,
  Package,
  Route,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/animated-counter";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/glass-panel";

const iconMap = {
  truck: Truck,
  clock: Clock3,
  package: Package,
  wallet: Wallet,
  route: Route,
  gauge: Gauge,
  shield: ShieldCheck,
};

export function StatCard({ stat, index = 0 }) {
  const Icon = iconMap[stat.icon] || Package;
  const badgeVariant =
    stat.deltaVariant ||
    (stat.delta?.startsWith("+")
      ? "success"
      : stat.delta?.startsWith("-")
        ? "warning"
        : "accent");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className={`p-5 ${stat.glow}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/82">
            <Icon className="h-4 w-4" />
          </div>
          <Badge variant={badgeVariant}>{stat.delta}</Badge>
        </div>
        <div className="mt-9">
          <p className="text-3xl font-semibold tracking-tight text-white">
            <AnimatedCounter
              value={stat.value}
              currency={stat.currency}
              suffix={stat.suffix || ""}
            />
          </p>
          <p className="mt-2 text-sm text-white/52">{stat.title}</p>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
