"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, Fragment } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search, Bell,
  Check, Moon, Sun, Sparkles, BarChart3, Zap, GitMerge, TrendingUp,
} from "lucide-react";
import { DOCS_PAGE_PADDING } from "@/lib/docs-layout";
import { de } from "date-fns/locale";

// ─── BentoCell ───────────────────────────────────────────────────────────────

function BentoCell({
  children,
  className = "",
  delay = 0,
  style: styleProp,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl p-5 overflow-hidden animate-in fade-in slide-in-from-bottom-3 ${className}`}
      style={{
        border: "1px solid var(--border)",
        animationDuration: "0.5s",
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        ...styleProp,
      }}
    >
      {children}
    </div>
  );
}

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium mb-6" style={{ color: "var(--gray-300)" }}>
      {children}
    </p>
  );
}

// ─── Smooth Progress Bar ──────────────────────────────────────────────────────

function SmoothBar({ value }: { value: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 120);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--secondary)" }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${w}%`, backgroundColor: "var(--primary)", transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </div>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────────────────

function LoadingCell() {
  // Skeleton-Farbe wie in den Komponenten: Mix aus --gray-100 und --sand-medium
  const skeletonColor = "#E8E3DB";
  return (
    <BentoCell className="col-span-3 flex flex-col min-h-72" delay={0}>
      <CellLabel>Skeleton & Spinner</CellLabel>
      <div className="flex flex-col justify-center gap-8 flex-1">
        {/* Skeleton */}
        <div className="w-full space-y-3">
          <Skeleton className="h-5 w-3/4 rounded-md" style={{ backgroundColor: skeletonColor }} />
          <Skeleton className="h-5 w-full rounded-md" style={{ backgroundColor: skeletonColor }} />
          <Skeleton className="h-5 w-1/2 rounded-md" style={{ backgroundColor: skeletonColor }} />
        </div>
        {/* Spinner */}
        <div className="flex items-center gap-6">
          {[20, 28, 36].map((size) => (
            <div key={size} className="dayone-spinner" style={{ width: size, height: size }} />
          ))}
        </div>
      </div>
    </BentoCell>
  );
}

// ─── Calendar ────────────────────────────────────────────────────────────────

function CalendarCell() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 18));
  return (
    <BentoCell className="flex flex-col" delay={80}>
      <CellLabel>Calendar</CellLabel>
      <div className="flex justify-center">
      <div style={{ width: "268px" }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={de}
          weekStartsOn={1}
          formatters={{ formatWeekdayName: (d) => ["SO","MO","DI","MI","DO","FR","SA"][d.getDay()] }}
          className="rounded-xl w-full [--cell-size:--spacing(7)]"
          classNames={{ week: "mt-1 flex w-full" }}
          style={{ border: "1px solid var(--border)" }}
        />
      </div>
      </div>
    </BentoCell>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

type Notif = {
  id: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  time: string;
};

const NOTIF_POOL: Omit<Notif, "id">[] = [
  { icon: <Sparkles className="size-4" />, title: "Neue Komponente", desc: "Button wurde aktualisiert.", time: "Jetzt" },
  { icon: <Check className="size-4" />, title: "Build erfolgreich", desc: "Vercel deployment abgeschlossen.", time: "Jetzt" },
  { icon: <Zap className="size-4" />, title: "Update verfügbar", desc: "shadcn/ui 3.0 ist jetzt live.", time: "Jetzt" },
  { icon: <GitMerge className="size-4" />, title: "PR gemerged", desc: "feature/calendar wurde gemerged.", time: "Jetzt" },
  { icon: <Bell className="size-4" />, title: "Neue Nachricht", desc: "Victoria hat kommentiert.", time: "Jetzt" },
];

let notifId = 0;

const INITIAL_NOTIFS: Notif[] = [
  { id: notifId++, ...NOTIF_POOL[0], time: "3 Min." },
  { id: notifId++, ...NOTIF_POOL[2], time: "12 Min." },
  { id: notifId++, ...NOTIF_POOL[4], time: "1 Std." },
];

function NotificationsCell() {
  const [items, setItems] = useState<Notif[]>(INITIAL_NOTIFS);
  const [newestId, setNewestId] = useState<number | null>(null);
  const poolIdx = useRef(1);

  useEffect(() => {
    const id = setInterval(() => {
      poolIdx.current = (poolIdx.current + 1) % NOTIF_POOL.length;
      const next: Notif = { id: notifId++, ...NOTIF_POOL[poolIdx.current] };
      setNewestId(next.id);
      setItems((prev) => [next, ...prev.slice(0, 2)]);
      setTimeout(() => setNewestId(null), 700);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoCell className="col-span-3 flex flex-col" delay={360}>
      <div className="flex items-center gap-2 mb-5">
        <p className="text-xs font-medium" style={{ color: "var(--gray-300)" }}>Notification</p>
        <div className="relative ml-auto">
          <Bell className="size-4" style={{ color: "var(--gray-400)" }} />
          <span className="absolute -top-1 -right-1 size-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--red-medium)" }} />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 rounded-xl p-3 ${item.id === newestId ? "notif-enter" : ""}`}
              style={{
                backgroundColor: idx === 0 ? "var(--primary)" : "var(--secondary)",
                transition: "background-color 0.5s ease, color 0.5s ease",
              }}
            >
              <div className="mt-0.5 shrink-0" style={{ color: idx === 0 ? "var(--primary-foreground)" : "var(--foreground)", transition: "color 0.5s ease" }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{ color: idx === 0 ? "var(--primary-foreground)" : "var(--foreground)", transition: "color 0.5s ease" }}>
                  {item.title}
                </p>
                <p className="text-xs truncate" style={{ color: idx === 0 ? "rgba(255,255,255,0.6)" : "var(--gray-400)", transition: "color 0.5s ease" }}>
                  {item.desc}
                </p>
              </div>
              <span className="text-[10px] shrink-0 pt-0.5" style={{ color: idx === 0 ? "rgba(255,255,255,0.45)" : "var(--gray-300)", transition: "color 0.5s ease" }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BentoCell>
  );
}

// ─── Chart ───────────────────────────────────────────────────────────────────

const BASE_CHART = [
  { name: "Jan", value: 32 },
  { name: "Feb", value: 58 },
  { name: "Mär", value: 45 },
  { name: "Apr", value: 72 },
  { name: "Mai", value: 61 },
  { name: "Jun", value: 88 },
  { name: "Jul", value: 75 },
  { name: "Aug", value: 52 },
];

function ChartCell() {
  const [data, setData] = useState(BASE_CHART);
  const [total, setTotal] = useState(356);
  const [trend, setTrend] = useState(12.4);
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((d) => ({
          ...d,
          value: Math.max(12, Math.min(97, d.value + Math.round((Math.random() - 0.48) * 18))),
        }))
      );
      setTotal((prev) => Math.max(280, Math.min(430, prev + Math.round((Math.random() - 0.44) * 14))));
      setTrend((prev) => +Math.max(-6, Math.min(28, prev + (Math.random() - 0.44) * 2.2)).toFixed(1));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoCell className="flex flex-col" delay={160}>
      <CellLabel>Chart</CellLabel>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "var(--foreground)" }}>
          {total.toLocaleString("de")}
        </span>
        <span
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: trend >= 0 ? "var(--foreground)" : "var(--destructive)", transition: "color 0.5s ease" }}
        >
          <TrendingUp className="size-3" />
          {trend >= 0 ? "+" : ""}{trend}%
        </span>
        <span className="text-xs ml-auto" style={{ color: "#999" }}>Aufrufe Jan – Aug 2026</span>
      </div>
      {/* Pure-CSS bar chart — columns stretch to 160px so height-% resolves correctly */}
      <div className="mt-auto flex flex-col gap-2">
        <div className="flex gap-3" style={{ height: 160 }}>
          {data.map((d) => (
            <div key={d.name} className="flex-1 flex flex-col justify-end px-1.5">
              <div
                style={{
                  height: `${d.value}%`,
                  backgroundColor: "#1a1a1a",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 1s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {data.map((d) => (
            <div key={d.name} className="flex-1 text-center" style={{ fontSize: 12, color: "#999" }}>
              {d.name}
            </div>
          ))}
        </div>
      </div>
    </BentoCell>
  );
}

// ─── Controls ────────────────────────────────────────────────────────────────

function ControlsCell() {
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState(true);
  const [auto, setAuto] = useState(true);
  const [vol, setVol] = useState([72]);

  return (
    <BentoCell className="col-span-3 flex flex-col" delay={280}>
      <CellLabel>Controls</CellLabel>
      <div className="flex-1 flex flex-col justify-center">
      <div className="flex flex-col gap-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Dark mode</span>
            <div className="flex items-center gap-1.5">
              <Sun className="size-3.5" style={{ color: "var(--gray-300)" }} />
              <Switch checked={dark} onCheckedChange={setDark} />
              <Moon className="size-3.5" style={{ color: "var(--gray-300)" }} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Benachrichtigungen</span>
            <Switch checked={notifs} onCheckedChange={setNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Auto-Speichern</span>
            <Switch checked={auto} onCheckedChange={setAuto} />
          </div>
        </div>
        <Separator style={{ backgroundColor: "var(--border)" }} />
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Lautstärke</span>
            <span className="text-xs tabular-nums" style={{ color: "var(--gray-400)" }}>{vol[0]}%</span>
          </div>
          <Slider value={vol} onValueChange={setVol} max={100} step={1} />
        </div>
      </div>
      </div>
    </BentoCell>
  );
}

// ─── Progress ────────────────────────────────────────────────────────────────

const PROG_LABELS = ["Design Tokens", "Komponenten", "Dokumentation", "Tests"];
const PROG_TARGETS = [92, 78, 60, 41];

function ProgressCell() {
  const [values, setValues] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const t = setTimeout(() => setValues(PROG_TARGETS), 220);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const t = PROG_TARGETS[i];
          return Math.max(t - 14, Math.min(t + 5, v + (Math.random() - 0.42) * 6));
        })
      );
    }, 1900);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoCell className="col-span-3 flex flex-col" delay={200}>
      <CellLabel>Progress</CellLabel>
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {PROG_LABELS.map((label, i) => (
            <div key={label}>
              <div className="flex justify-between mb-2">
                <span className="text-xs" style={{ color: "var(--gray-400)" }}>{label}</span>
                <span className="text-xs tabular-nums" style={{ color: "var(--gray-400)" }}>
                  {Math.round(values[i])}%
                </span>
              </div>
              <SmoothBar value={values[i]} />
            </div>
          ))}
        </div>
      </div>
    </BentoCell>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────────

const SEARCH_TERMS = ["Button", "Calendar", "Input", "Accordion", "Dialog", "Tabs"];

function InputCell() {
  const [typed, setTyped] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const stateRef = useRef<{ term: number; char: number; deleting: boolean }>({ term: 0, char: 0, deleting: false });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function tick() {
      const s = stateRef.current;
      const term = SEARCH_TERMS[s.term];
      if (!s.deleting) {
        if (s.char < term.length) {
          s.char++;
          setTyped(term.slice(0, s.char));
          timeout = setTimeout(tick, 90);
        } else {
          timeout = setTimeout(() => { s.deleting = true; tick(); }, 1400);
        }
      } else {
        if (s.char > 0) {
          s.char--;
          setTyped(term.slice(0, s.char));
          timeout = setTimeout(tick, 55);
        } else {
          s.deleting = false;
          s.term = (s.term + 1) % SEARCH_TERMS.length;
          timeout = setTimeout(tick, 300);
        }
      }
    }
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <BentoCell className="flex flex-col" delay={120}>
      <CellLabel>Input</CellLabel>
      <div className="flex flex-1 flex-col space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none" style={{ color: "var(--gray-300)" }} />
          <Input className="pl-8 text-sm" value={typed} readOnly placeholder="Suchen…" />
        </div>
        <Input className="text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input className="text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail-Adresse" type="email" />
        <div className="flex gap-[10px]">
          <Select>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="entwicklung">Entwicklung</SelectItem>
              <SelectItem value="produkt">Produkt</SelectItem>
            </SelectContent>
          </Select>
          <InputGroup>
            <InputGroupInput type="number" placeholder="0,00" className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
            <InputGroupAddon align="inline-end">€</InputGroupAddon>
          </InputGroup>
        </div>
        <Button size="lg" className="mt-auto w-full">Absenden</Button>
      </div>
    </BentoCell>
  );
}

// ─── Tabs & Breadcrumb ───────────────────────────────────────────────────────

function NavCell() {
  const [tab, setTab] = useState("alle");
  const [active, setActive] = useState("breadcrumb");
  const [page, setPage] = useState(2);
  const tabItems = [
    { value: "alle", label: "Alle" },
    { value: "strategie", label: "Strategie" },
    { value: "design", label: "Design" },
    { value: "traktion", label: "Traktion" },
  ];
  const crumbs = [
    { key: "start", label: "Start" },
    { key: "komponenten", label: "Komponenten" },
    { key: "breadcrumb", label: "Breadcrumb" },
  ];
  return (
    <BentoCell className="col-span-4 flex flex-col min-h-72" delay={720}>
      <CellLabel>Tabs & Breadcrumb</CellLabel>
      <div className="flex flex-1 flex-col items-center justify-center gap-12">
        {/* Tabs — Line */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList variant="line" className="gap-6">
            {tabItems.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList className="gap-3">
            {crumbs.map((item, idx) => (
              <Fragment key={item.key}>
                {idx > 0 && <BreadcrumbSeparator style={{ color: "var(--gray-200)" }} />}
                <BreadcrumbItem>
                  {active === item.key ? (
                    <BreadcrumbPage style={{ color: "var(--foreground)", fontWeight: 600 }}>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <button
                        style={{ color: "var(--gray-400)", background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit" }}
                        onClick={() => setActive(item.key)}
                      >
                        {item.label}
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }} text="Zurück" />
            </PaginationItem>
            {[1, 2, 3].map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href="#" isActive={page === p} onClick={(e) => { e.preventDefault(); setPage(p); }}>{p}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(3, p + 1)); }} text="Weiter" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </BentoCell>
  );
}

// ─── Badges + Avatars ─────────────────────────────────────────────────────────

function BadgesCell() {
  return (
    <BentoCell className="col-span-4" delay={480}>
      <CellLabel>Badge & Avatar</CellLabel>
      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full px-[15px] py-[13px] text-[13px] font-medium" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", border: "none" }}>Default</Badge>
          <Badge className="rounded-full px-[15px] py-[13px] text-[13px] font-medium" style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", border: "none" }}>Secondary</Badge>
          <Badge className="rounded-full px-[15px] py-[13px] text-[13px] font-medium" style={{ backgroundColor: "transparent", color: "var(--foreground)", border: "1px solid var(--border)" }}>Ghost</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full px-[15px] py-[13px] text-[13px] font-medium" style={{ backgroundColor: "var(--blue-dark)", color: "var(--white)", border: "none" }}>Aktiv</Badge>
          <Badge className="rounded-full px-[15px] py-[13px] text-[13px] font-medium" style={{ backgroundColor: "var(--red-dark)", color: "var(--white)", border: "none" }}>Fehler</Badge>
          <Badge className="rounded-full px-[15px] py-[13px] text-[13px] font-medium" style={{ backgroundColor: "var(--accent)", color: "var(--muted-foreground)", border: "none" }}>Inaktiv</Badge>
        </div>
        <div className="py-3"><Separator style={{ backgroundColor: "var(--border)" }} /></div>
        <div>
          <p className="text-xs mb-3" style={{ color: "var(--gray-300)" }}>Team DAYONE</p>
          <div className="flex items-center -space-x-2">
            {[
              { initials: "VI", bg: "var(--primary)", fg: "var(--primary-foreground)" },
              { initials: "BD", bg: "var(--muted)", fg: "var(--foreground)" },
              { initials: "AK", bg: "var(--blue-light)", fg: "var(--foreground)" },
              { initials: "LR", bg: "var(--red-light)", fg: "var(--foreground)" },
              { initials: "TM", bg: "var(--sand-dark)", fg: "var(--foreground)" },
            ].map(({ initials, bg, fg }) => (
              <Avatar key={initials} className="size-10 after:hidden ring-2 ring-background">
                <AvatarFallback className="text-xs font-semibold" style={{ backgroundColor: bg, color: fg }}>{initials}</AvatarFallback>
              </Avatar>
            ))}
            <div
              className="flex size-10 items-center justify-center rounded-full ring-2 ring-background text-xs font-semibold"
              style={{ backgroundColor: "transparent", color: "var(--gray-400)", border: "1px solid var(--border)" }}
            >
              +4
            </div>
          </div>
        </div>
      </div>
    </BentoCell>
  );
}

// ─── Accordion ───────────────────────────────────────────────────────────────

function AccordionCell() {
  return (
    <BentoCell className="col-span-4" delay={540}>
      <CellLabel>Accordion</CellLabel>
      <Accordion type="single" collapsible defaultValue="1" className="w-full">
        {[
          { id: "1", q: "Was ist DAYONE UI?", a: "Eine Komponenten-Bibliothek für alle DAYONE-Projekte, gebaut auf shadcn/ui und Tailwind CSS." },
          { id: "2", q: "Welche Technologien?", a: "Next.js, Tailwind CSS v4, Radix UI und Recharts." },
          { id: "3", q: "Ist es Open Source?", a: "Ja – der Code ist öffentlich zugänglich und erweiterbar." },
        ].map(({ id, q, a }) => (
          <AccordionItem key={id} value={id} style={{ borderColor: "var(--divider)" }}>
            <AccordionTrigger className="text-sm font-medium hover:no-underline" style={{ color: "var(--foreground)" }}>
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-sm" style={{ color: "var(--gray-400)" }}>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </BentoCell>
  );
}

// ─── Checklist ───────────────────────────────────────────────────────────────

function ChecklistCell() {
  const [checked, setChecked] = useState([true, true, true, false, false]);
  const [radio, setRadio] = useState("design");

  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const ITEMS = [
    "Farbsystem definieren",
    "Typografie festlegen",
    "Komponenten bauen",
    "Dokumentation schreiben",
    "Beispiele hinzufügen",
  ];

  return (
    <BentoCell className="col-span-4" delay={600}>
      <CellLabel>Radio & Checkbox</CellLabel>
      <RadioGroup value={radio} onValueChange={setRadio} className="flex flex-row gap-8 mb-4">
        {["Design", "Entwicklung", "Docs"].map((opt) => (
          <div key={opt} className="flex items-center gap-2">
            <RadioGroupItem value={opt.toLowerCase()} id={`radio-${opt}`} />
            <label htmlFor={`radio-${opt}`} className="text-sm cursor-pointer select-none" style={{ color: "var(--foreground)" }}>{opt}</label>
          </div>
        ))}
      </RadioGroup>
      <div className="space-y-3">
        {ITEMS.map((label, i) => (
          <div key={label} className="flex items-center gap-3 cursor-pointer" onClick={() => toggle(i)}>
            <Checkbox checked={checked[i]} onCheckedChange={() => toggle(i)} />
            <label
              className={`text-sm cursor-pointer select-none ${checked[i] ? "line-through" : ""}`}
              style={{ color: checked[i] ? "var(--gray-300)" : "var(--foreground)" }}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </BentoCell>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

function CardCell() {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => { setCount(50); setProgress(82); }, 320);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c >= 55 ? 50 : c + 1)), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoCell className="col-span-8 flex flex-col" delay={660}>
      <CellLabel>Card</CellLabel>
      <div className="grid grid-cols-2 items-stretch gap-4">
        {/* Standard */}
        <div className="flex flex-col">
          <p className="text-[10px] font-medium mb-2" style={{ color: "var(--gray-300)" }}>Standard</p>
          <Card className="h-full justify-center gap-1 py-4" style={{ borderColor: "var(--border)" }}>
            <CardHeader>
              <CardTitle className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Nächstes Meeting</CardTitle>
              <CardDescription style={{ color: "var(--gray-400)", fontSize: "12px" }}>Heute · 14:00 Uhr · PDC Sync mit dem Design Team</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Metric */}
        <div className="flex flex-col">
          <p className="text-[10px] font-medium mb-2" style={{ color: "var(--gray-300)" }}>Metric</p>
          <Card className="h-full justify-center gap-1 py-4" style={{ borderColor: "var(--border)" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-medium" style={{ color: "var(--gray-400)" }}>Komponenten</CardTitle>
              <BarChart3 className="size-4" style={{ color: "var(--gray-400)" }} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold tabular-nums" style={{ color: "var(--foreground)" }}>{count}+</p>
                <span className="text-xs" style={{ color: "var(--gray-300)" }}>{progress}% fertig</span>
              </div>
              <div className="h-1.5 w-full rounded-full overflow-hidden mt-2" style={{ backgroundColor: "var(--secondary)" }}>
                <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: "var(--primary)", transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)" }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BentoCell>
  );
}

// ─── Grid ────────────────────────────────────────────────────────────────────

function ShowcaseGrid() {
  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {/* Row 1: 3.5 + 3 + 5.5 */}
      <div className="col-span-12 grid items-stretch gap-4" style={{ gridTemplateColumns: "7fr 6fr 11fr" }}>
        <InputCell />
        <CalendarCell />
        <ChartCell />
      </div>

      {/* Row 2: 3 + 3 + 3 + 3 */}
      <LoadingCell />
      <ProgressCell />
      <ControlsCell />
      <NotificationsCell />

      {/* Row 3: 4 + 4 + 4 */}
      <AccordionCell />
      <BadgesCell />
      <ChecklistCell />

      {/* Row 4: 8 + 4 */}
      <CardCell />
      <NavCell />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <SiteHeader active="home" />

      <main className={`flex flex-1 flex-col items-center gap-16 px-8 py-16 ${DOCS_PAGE_PADDING}`}>
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl">
          <Image src="/dayone-icon.svg" alt="DAYONE" width={36} height={36} />
          <h1
            className="font-semibold mt-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.08, color: "var(--foreground)", letterSpacing: "-0.03em" }}
          >
            Design System
          </h1>
          <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--gray-400)" }}>
            Das gemeinsame UI-Fundament für alle DAYONE-Projekte. Komponenten, Tokens und Standards für konsistente digitale Produkte.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Button asChild size="lg">
              <Link href="/komponenten">Komponenten</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/setup">Setup</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 w-full">
          <ShowcaseGrid />
        </div>
      </main>

      <div className={`pointer-events-none absolute bottom-8 ${DOCS_PAGE_PADDING} right-0 left-0 flex justify-end`}>
        <SiteStamp />
      </div>
    </div>
  );
}
