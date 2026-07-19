import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return <TabsPrimitive.Root className={cn("w-full", className)} {...props} />;
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-11 items-center gap-1 rounded-full border border-white/8 bg-white/[0.04] p-1",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-white/56 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-slate-950",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn("mt-6", className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
