import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-input bg-transparent px-4 text-sm text-foreground transition-colors outline-none",
        "placeholder:text-muted-foreground",
        "focus:border-ring focus:ring-0",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
