"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <label className="inline-flex shrink-0 items-center gap-2">
      <Sun className="size-4" style={{ color: "var(--muted-foreground)" }} />
      <Switch
        size="sm"
        checked={mounted ? isDark : false}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label={isDark ? "Light Mode aktivieren" : "Dark Mode aktivieren"}
      />
      <Moon className="size-4" style={{ color: "var(--muted-foreground)" }} />
    </label>
  );
}
