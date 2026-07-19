import { useEffect, useState } from "react";

export function AnimatedCounter({ value, prefix = "", suffix = "", currency = false }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const formatted = currency
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: value > 100000 ? "compact" : "standard",
        maximumFractionDigits: value > 100000 ? 1 : 0,
      }).format(displayValue)
    : new Intl.NumberFormat("en-US", {
        notation: value > 999 ? "compact" : "standard",
        maximumFractionDigits: 1,
      }).format(displayValue);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
