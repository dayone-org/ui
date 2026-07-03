"use client"

import * as React from "react"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { CalendarDays } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const WEEKDAYS = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"]

function formatRange(range: DateRange): string {
  const { from, to } = range
  if (!from) return ""
  if (!to || from.getTime() === to.getTime()) {
    return format(from, "d. MMMM yyyy", { locale: de })
  }
  const sameYear = from.getFullYear() === to.getFullYear()
  const sameMonth = sameYear && from.getMonth() === to.getMonth()
  if (sameMonth) {
    return `${format(from, "d.", { locale: de })} – ${format(to, "d. MMMM yyyy", { locale: de })}`
  }
  if (sameYear) {
    return `${format(from, "d. MMMM", { locale: de })} – ${format(to, "d. MMMM yyyy", { locale: de })}`
  }
  return `${format(from, "d. MMMM yyyy", { locale: de })} – ${format(to, "d. MMMM yyyy", { locale: de })}`
}

function DatePickerTrigger({
  className,
  children,
  hasValue,
  ...props
}: React.ComponentProps<"button"> & { hasValue: boolean }) {
  return (
    <button
      type="button"
      data-slot="date-picker-trigger"
      className={cn(
        "flex h-10 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-4 text-sm transition-colors outline-none",
        hasValue ? "text-foreground" : "text-muted-foreground",
        "focus-visible:border-ring data-[state=open]:border-ring",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}

const calendarProps = {
  locale: de,
  weekStartsOn: 1 as const,
  formatters: {
    formatWeekdayName: (d: Date) => WEEKDAYS[d.getDay()],
  },
  className: "w-full [--cell-size:--spacing(7)]",
  classNames: { week: "mt-1 flex w-full" },
}

function DatePicker({
  date: dateProp,
  defaultDate,
  onDateChange,
  placeholder = "Datum wählen",
  disabled,
  className,
}: {
  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<Date | undefined>(defaultDate)
  const date = dateProp ?? internal

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <DatePickerTrigger hasValue={!!date} disabled={disabled} className={className}>
          {date ? format(date, "d. MMMM yyyy", { locale: de }) : placeholder}
        </DatePickerTrigger>
      </PopoverTrigger>
      <PopoverContent className="w-[268px]" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(d) => {
            setInternal(d)
            onDateChange?.(d)
            setOpen(false)
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

function DateRangePicker({
  range: rangeProp,
  defaultRange,
  onRangeChange,
  placeholder = "Zeitraum wählen",
  disabled,
  className,
}: {
  range?: DateRange
  defaultRange?: DateRange
  onRangeChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<DateRange | undefined>(defaultRange)
  const range = rangeProp ?? internal

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <DatePickerTrigger hasValue={!!range?.from} disabled={disabled} className={className}>
          {range?.from ? formatRange(range) : placeholder}
        </DatePickerTrigger>
      </PopoverTrigger>
      <PopoverContent className="w-[268px]" align="start">
        <Calendar
          mode="range"
          selected={range}
          defaultMonth={range?.from}
          onSelect={(r) => {
            setInternal(r)
            onRangeChange?.(r)
          }}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
