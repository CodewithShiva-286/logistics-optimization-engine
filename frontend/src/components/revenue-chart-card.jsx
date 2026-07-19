import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassPanel } from "@/components/glass-panel";

export function RevenueChartCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="h-full p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="section-title">Revenue Trends</h2>
            <p className="section-copy mt-1">Animated freight mix across transport modes.</p>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="air">Air</TabsTrigger>
              <TabsTrigger value="road">Road</TabsTrigger>
              <TabsTrigger value="sea">Sea</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-6 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tickLine={false} axisLine={false} />
              <YAxis
                stroke="rgba(255,255,255,0.22)"
                tickFormatter={(value) => `$${value / 1000}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                contentStyle={{
                  background: "rgba(12,17,31,0.92)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="air" fill="#5e8fff" radius={[10, 10, 0, 0]} animationDuration={1200} />
              <Bar dataKey="road" fill="#ff8736" radius={[10, 10, 0, 0]} animationDuration={1400} />
              <Bar dataKey="sea" fill="#3ce5d3" radius={[10, 10, 0, 0]} animationDuration={1600} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
