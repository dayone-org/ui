"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const SearchBar = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className="flex items-center gap-2 pb-1.5"
      style={{ borderBottom: "1px solid var(--gray-100)" }}
    >
      <Search className="size-3 shrink-0" style={{ color: "var(--gray-400)" }} />
      <input
        ref={ref}
        type="text"
        className={cn(
          "flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--gray-300)]",
          className
        )}
        style={{ color: "var(--black)" }}
        {...props}
      />
    </div>
  )
})
SearchBar.displayName = "SearchBar"

export { SearchBar }
