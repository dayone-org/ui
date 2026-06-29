"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const SearchBar = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2 border-b border-input pb-1.5">
      <Search className="size-3 shrink-0 text-muted-foreground" />
      <input
        ref={ref}
        type="text"
        className={cn(
          "flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  )
})
SearchBar.displayName = "SearchBar"

export { SearchBar }
