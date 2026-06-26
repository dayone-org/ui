"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight, Bold, Italic, Underline, Search, Bell,
  Check, Moon, Sun, Sparkles, BarChart3, Zap, GitMerge, TrendingUp,
} from "lucide-react";
import { DOCS_PAGE_PADDING } from "@/lib/docs-layout";
import { de } from "date-fns/locale";

// ─── BentoCell ───────────────────────────────────────────────────────────────

function BentoCell({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`rounded-2xl p-5 overflow-hidden animate-in fade-in slide-in-from-bottom-3 ${className}`}
      style={{
        border: "1px solid var(--gray-100)",
        animationDuration: "0.5s",
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium mb-4" style={{ color: "var(--gray-300)" }}>
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
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--gray-100)" }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${w}%`, backgroundColor: "var(--black)", transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </div>
  );
}

// ─── Buttons ─────────────────────────────────────────────────────────────────

function ButtonsCell() {
  return (
    <BentoCell className="col-span-4 flex flex-col" delay={0}>
      <CellLabel>Button</CellLabel>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Secondary</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="default">Primary <ArrowRight className="size-3.5" /></Button>
          <Button size="default" variant="outline">Secondary</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg">Primary <ArrowRight className="size-4" /></Button>
          <Button size="lg" variant="outline">Secondary</Button>
        </div>
      </div>
    </BentoCell>
  );
}

// ─── Calendar ────────────────────────────────────────────────────────────────

function CalendarCell() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 18));
  return (
    <BentoCell className="col-span-4 flex flex-col items-center justify-center" delay={80}>
      <CellLabel>Calendar</CellLabel>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={de}
        weekStartsOn={1}
        formatters={{ formatWeekdayName: (d) => ["SO","MO","DI","MI","DO","FR","SA"][d.getDay()] }}
        className="rounded-xl [--cell-size:--spacing(8)] scale-90 origin-top"
        style={{ border: "1px solid var(--gray-100)" }}
      />
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
  const [visible, setVisible] = useState(true);
  const poolIdx = useRef(1);

  useEffect(() => {
    const id = setInterval(() => {
      // 1) fade out entire list
      setVisible(false);
      setTimeout(() => {
        // 2) swap items while invisible
        poolIdx.current = (poolIdx.current + 1) % NOTIF_POOL.length;
        const next: Notif = { id: notifId++, ...NOTIF_POOL[poolIdx.current] };
        setItems((prev) => [next, ...prev.slice(0, 2)]);
        // 3) fade back in
        setVisible(true);
      }, 500);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoCell className="col-span-3" delay={360}>
      <div className="flex items-center gap-2 mb-5">
        <p className="text-xs font-medium" style={{ color: "var(--gray-300)" }}>Notification</p>
        <div className="relative ml-auto">
          <Bell className="size-4" style={{ color: "var(--gray-400)" }} />
          <span className="absolute -top-1 -right-1 size-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--red-medium)" }} />
        </div>
      </div>
      <div
        className="space-y-2"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-xl p-3"
            style={{ backgroundColor: idx === 0 ? "var(--black)" : "var(--gray-100)" }}
          >
            <div className="mt-0.5 shrink-0" style={{ color: idx === 0 ? "var(--white)" : "var(--black)" }}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold" style={{ color: idx === 0 ? "var(--white)" : "var(--black)" }}>
                {item.title}
              </p>
              <p className="text-xs truncate" style={{ color: idx === 0 ? "rgba(255,255,255,0.6)" : "var(--gray-400)" }}>
                {item.desc}
              </p>
            </div>
            <span className="text-[10px] shrink-0 pt-0.5" style={{ color: idx === 0 ? "rgba(255,255,255,0.45)" : "var(--gray-300)" }}>
              {item.time}
            </span>
          </div>
        ))}
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
    <BentoCell className="col-span-4" delay={160}>
      <CellLabel>Chart</CellLabel>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "var(--black)" }}>
          {total.toLocaleString("de")}
        </span>
        <span
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: trend >= 0 ? "var(--black)" : "#e63946", transition: "color 0.5s ease" }}
        >
          <TrendingUp className="size-3" />
          {trend >= 0 ? "+" : ""}{trend}%
        </span>
        <span className="text-xs ml-auto" style={{ color: "#999" }}>Aufrufe Jan – Jun 2026</span>
      </div>
      {/* Pure-CSS bar chart — columns stretch to 160px so height-% resolves correctly */}
      <div className="flex flex-col gap-2">
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
            <div key={d.name} className="flex-1 text-center" style={{ fontSize: 10, color: "#999" }}>
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
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [under, setUnder] = useState(true);

  return (
    <BentoCell className="col-span-3" delay={280}>
      <CellLabel>Controls</CellLabel>
      <div className="space-y-4">
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
        <Separator style={{ backgroundColor: "var(--gray-100)" }} />
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Lautstärke</span>
            <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--black)" }}>{vol[0]}%</span>
          </div>
          <Slider value={vol} onValueChange={setVol} max={100} step={1} />
        </div>
        <div className="flex items-center gap-1">
          <Toggle pressed={bold} onPressedChange={setBold} aria-label="Fett" size="sm"><Bold className="size-3.5" /></Toggle>
          <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Kursiv" size="sm"><Italic className="size-3.5" /></Toggle>
          <Toggle pressed={under} onPressedChange={setUnder} aria-label="Unterstrichen" size="sm"><Underline className="size-3.5" /></Toggle>
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
    <BentoCell className="col-span-3" delay={200}>
      <CellLabel>Progress</CellLabel>
      <div className="space-y-5">
        {PROG_LABELS.map((label, i) => (
          <div key={label}>
            <div className="flex justify-between mb-2">
              <span className="text-xs" style={{ color: "var(--gray-400)" }}>{label}</span>
              <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--black)" }}>
                {Math.round(values[i])}%
              </span>
            </div>
            <SmoothBar value={values[i]} />
          </div>
        ))}
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
    <BentoCell className="col-span-3" delay={120}>
      <CellLabel>Input</CellLabel>
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 pointer-events-none" style={{ color: "var(--gray-300)" }} />
          <Input className="pl-8 text-sm" value={typed} readOnly placeholder="Suchen…" />
        </div>
        <Input className="text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input className="text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail-Adresse" type="email" />
        <Button size="sm">Absenden</Button>
      </div>
    </BentoCell>
  );
}

// ─── Table ───────────────────────────────────────────────────────────────────

function TableCell() {
  const [hovered, setHovered] = useState<string | null>(null);
  const ROWS = [
    { name: "Button", cat: "Grundelemente", version: "2.1", status: "Stabil", bg: "var(--black)", fg: "var(--white)" },
    { name: "Input", cat: "Formulare", version: "2.0", status: "Stabil", bg: "var(--black)", fg: "var(--white)" },
    { name: "Calendar", cat: "Datendarstellung", version: "1.4", status: "Beta", bg: "var(--blue-highlight)", fg: "var(--white)" },
    { name: "Drawer", cat: "Overlays", version: "1.2", status: "Beta", bg: "var(--blue-highlight)", fg: "var(--white)" },
    { name: "Chart", cat: "Datendarstellung", version: "0.9", status: "Alpha", bg: "var(--gray-100)", fg: "var(--gray-400)" },
  ];

  return (
    <BentoCell className="col-span-8" delay={420}>
      <CellLabel>Table</CellLabel>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--gray-100)" }}>
            {["Komponente", "Kategorie", "Version", "Status"].map((h) => (
              <th key={h} className="pb-3 pr-6 text-left text-xs font-semibold" style={{ color: "var(--gray-300)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr
              key={row.name}
              className="cursor-pointer"
              style={{
                borderBottom: "1px solid var(--gray-100)",
                backgroundColor: hovered === row.name ? "var(--gray-100)" : "transparent",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={() => setHovered(row.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <td className="py-3 pr-6 font-medium" style={{ color: "var(--black)" }}>{row.name}</td>
              <td className="py-3 pr-6" style={{ color: "var(--gray-400)" }}>{row.cat}</td>
              <td className="py-3 pr-6 font-mono text-xs" style={{ color: "var(--gray-400)" }}>{row.version}</td>
              <td className="py-3">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: row.bg, color: row.fg }}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BentoCell>
  );
}

// ─── Badges + Avatars ─────────────────────────────────────────────────────────

function BadgesCell() {
  return (
    <BentoCell className="col-span-4" delay={480}>
      <CellLabel>Badge & Avatar</CellLabel>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="rounded-full" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>Stabil</Badge>
          <Badge className="rounded-full" style={{ backgroundColor: "var(--blue-highlight)", color: "var(--white)" }}>Beta</Badge>
          <Badge className="rounded-full" style={{ backgroundColor: "var(--red-medium)", color: "var(--white)" }}>Fehler</Badge>
          <Badge className="rounded-full" style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-400)" }}>Inaktiv</Badge>
        </div>
        <Separator style={{ backgroundColor: "var(--gray-100)" }} />
        <div>
          <p className="text-xs mb-3" style={{ color: "var(--gray-300)" }}>Team DAYONE</p>
          <AvatarGroup>
            {[
              { init: "VI", bg: "var(--black)", fg: "var(--white)" },
              { init: "BD", bg: "var(--sand-medium)", fg: "var(--black)" },
              { init: "MM", bg: "var(--gray-100)", fg: "var(--gray-400)" },
              { init: "JK", bg: "var(--red-light)", fg: "var(--white)" },
            ].map(({ init, bg, fg }) => (
              <Avatar key={init} size="sm">
                <AvatarFallback className="text-[10px] font-semibold" style={{ backgroundColor: bg, color: fg }}>
                  {init}
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
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
          <AccordionItem key={id} value={id} style={{ borderColor: "var(--gray-100)" }}>
            <AccordionTrigger className="text-sm font-medium hover:no-underline" style={{ color: "var(--black)" }}>
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
  const [tab, setTab] = useState("design");
  const [checked, setChecked] = useState([true, true, true, false, false]);

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
      <CellLabel>Tabs & Checkbox</CellLabel>
      <Tabs value={tab} onValueChange={setTab} className="w-full mb-4">
        <TabsList variant="text">
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="dev">Entwicklung</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-y-3">
        {ITEMS.map((label, i) => (
          <div key={label} className="flex items-center gap-3 cursor-pointer" onClick={() => toggle(i)}>
            <Checkbox checked={checked[i]} onCheckedChange={() => toggle(i)} />
            <label
              className={`text-sm cursor-pointer select-none ${checked[i] ? "line-through" : ""}`}
              style={{ color: checked[i] ? "var(--gray-300)" : "var(--black)" }}
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
    <BentoCell className="col-span-4" delay={660}>
      <CellLabel>Card</CellLabel>
      <Card style={{ borderColor: "var(--gray-100)" }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <BarChart3 className="size-5" style={{ color: "var(--black)" }} />
            <Badge variant="outline" className="text-[10px]">+12%</Badge>
          </div>
          <CardTitle className="text-base font-semibold mt-2 tabular-nums" style={{ color: "var(--black)" }}>
            {count}+ Komponenten
          </CardTitle>
          <CardDescription style={{ color: "var(--gray-400)", fontSize: "12px" }}>
            Zugänglich, typsicher und anpassbar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-1.5 w-full rounded-full overflow-hidden mb-2" style={{ backgroundColor: "var(--gray-100)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, backgroundColor: "var(--black)", transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)" }}
            />
          </div>
          <p className="text-xs" style={{ color: "var(--gray-300)" }}>{progress}% der Kern-Komponenten fertig</p>
        </CardContent>
      </Card>
    </BentoCell>
  );
}

// ─── Grid ────────────────────────────────────────────────────────────────────

function ShowcaseGrid() {
  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {/* Row 1: 4 + 4 + 4 */}
      <ButtonsCell />
      <CalendarCell />
      <ChartCell />

      {/* Row 2: 3 + 3 + 3 + 3 */}
      <InputCell />
      <ProgressCell />
      <ControlsCell />
      <NotificationsCell />

      {/* Row 3: 4 + 4 + 4 */}
      <AccordionCell />
      <BadgesCell />
      <ChecklistCell />

      {/* Row 4: 8 + 4 */}
      <TableCell />
      <CardCell />
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
          <Badge variant="outline" className="rounded-full text-xs" style={{ color: "var(--gray-400)" }}>
            DAYONE UI Foundation
          </Badge>
          <h1
            className="font-semibold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.08, color: "var(--black)", letterSpacing: "-0.03em" }}
          >
            Komponenten für DAYONE
          </h1>
          <p className="max-w-md text-base leading-relaxed" style={{ color: "var(--gray-400)" }}>
            Zugängliche und anpassbare Komponenten, Tokens und Standards für alle DAYONE-Projekte.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/komponenten">Komponenten <ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/how-to-use">How to use</Link>
            </Button>
          </div>
        </div>

        <ShowcaseGrid />
      </main>

      <div className={`pointer-events-none absolute bottom-8 ${DOCS_PAGE_PADDING} right-0 left-0 flex justify-end`}>
        <SiteStamp />
      </div>
    </div>
  );
}
