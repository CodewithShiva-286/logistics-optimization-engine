import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[-10%] top-[-8%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(83,168,255,0.24),transparent_65%)] blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.18),transparent_62%)] blur-3xl"
        animate={{ x: [0, -48, 0], y: [0, -24, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-18%] left-[24%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(123,97,255,0.18),transparent_65%)] blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="glass-grid absolute inset-0 opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(11,15,26,0.88)_100%)]" />
    </div>
  );
}
