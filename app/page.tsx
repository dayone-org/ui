"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteStamp } from "@/components/site-stamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
import { ArrowRight, Bold, Italic, Underline, Search, Bell, Check, Moon, Sun, Sparkles, BarChart3 } from "lucide-react";
import { DOCS_PAGE_PADDING } from "@/lib/docs-layout";
import { de } from "date-fns/locale";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Jan", value: 32 },
  { name: "Feb", value: 58 },
  { name: "Mär", value: 45 },
  { name: "Apr", value: 72 },
  { name: "Mai", value: 61 },
  { name: "Jun", value: 88 },
];

function BentoCell({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={`rounded-2xl p-5 overflow-hidden select-none pointer-events-none animate-in fade-in slide-in-from-bottom-3 ${className}`}
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

function AnimatedProgress({ value, delay = 0 }: { value: number; delay?: number }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setCurrent(value), delay + 200);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--gray-100)" }}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${current}%`,
          backgroundColor: "var(--black)",
          transition: "width 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
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

function ShowcaseGrid() {
  const [date] = useState<Date | undefined>(new Date(2026, 5, 18));

  return (
    <div className="w-full grid grid-cols-12 gap-4">

      {/* Row 1 */}

      {/* Buttons — col 1–4 */}
      <BentoCell className="col-span-4" delay={0}>
        <CellLabel>Button</CellLabel>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="outline">Secondary</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="default">
              Primary <ArrowRight className="size-3.5" />
            </Button>
            <Button size="default" variant="outline">Secondary</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="lg">
              Primary <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline">Secondary</Button>
          </div>
        </div>
      </BentoCell>

      {/* Calendar — col 5–8 */}
      <BentoCell className="col-span-4 flex flex-col items-center justify-center" delay={80}>
        <CellLabel>Calendar</CellLabel>
        <Calendar
          mode="single"
          selected={date}
          locale={de}
          weekStartsOn={1}
          formatters={{ formatWeekdayName: (d) => ["SO","MO","DI","MI","DO","FR","SA"][d.getDay()] }}
          className="rounded-xl [--cell-size:--spacing(8)] scale-90 origin-top"
          style={{ border: "1px solid var(--gray-100)" }}
        />
      </BentoCell>

      {/* Chart — col 9–12 */}
      <BentoCell className="col-span-4" delay={160}>
        <CellLabel>Chart</CellLabel>
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--black)" }}>Monatliche Aufrufe</p>
        <p className="text-xs mb-4" style={{ color: "var(--gray-300)" }}>Jan – Jun 2026</p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={chartData} barSize={16}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--gray-300)" }} />
            <Bar dataKey="value" fill="var(--black)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </BentoCell>

      {/* Row 2 */}

      {/* Form / Inputs — col 1–3 */}
      <BentoCell className="col-span-3" delay={120}>
        <CellLabel>Input</CellLabel>
        <div className="space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5" style={{ color: "var(--gray-300)" }} />
            <Input className="pl-8 text-sm" placeholder="Suchen…" readOnly />
          </div>
          <Input className="text-sm" placeholder="Name" readOnly />
          <Input className="text-sm" placeholder="E-Mail-Adresse" readOnly />
          <Button className="w-full mt-1" size="sm">Absenden</Button>
        </div>
      </BentoCell>

      {/* Progress / Stats — col 4–6 */}
      <BentoCell className="col-span-3" delay={200}>
        <CellLabel>Progress</CellLabel>
        <div className="space-y-4">
          {[
            { label: "Design Tokens", value: 92 },
            { label: "Komponenten", value: 78 },
            { label: "Dokumentation", value: 60 },
            { label: "Tests", value: 41 },
          ].map(({ label, value }, i) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs" style={{ color: "var(--gray-400)" }}>{label}</span>
                <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--black)" }}>{value}%</span>
              </div>
              <AnimatedProgress value={value} delay={i * 150} />
            </div>
          ))}
        </div>
      </BentoCell>

      {/* Toggle / Switch / Slider — col 7–9 */}
      <BentoCell className="col-span-3" delay={280}>
        <CellLabel>Controls</CellLabel>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Dark mode</span>
            <div className="flex items-center gap-1.5">
              <Sun className="size-3.5" style={{ color: "var(--gray-300)" }} />
              <Switch defaultChecked={false} />
              <Moon className="size-3.5" style={{ color: "var(--gray-300)" }} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Benachrichtigungen</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--gray-400)" }}>Auto-Speichern</span>
            <Switch defaultChecked />
          </div>
          <Separator style={{ backgroundColor: "var(--gray-100)" }} />
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs" style={{ color: "var(--gray-400)" }}>Lautstärke</span>
              <span className="text-xs font-semibold" style={{ color: "var(--black)" }}>72%</span>
            </div>
            <Slider defaultValue={[72]} max={100} step={1} />
          </div>
          <div className="flex items-center gap-1">
            <Toggle aria-label="Fett" size="sm"><Bold className="size-3.5" /></Toggle>
            <Toggle aria-label="Kursiv" size="sm"><Italic className="size-3.5" /></Toggle>
            <Toggle aria-label="Unterstrichen" size="sm" defaultPressed><Underline className="size-3.5" /></Toggle>
          </div>
        </div>
      </BentoCell>

      {/* Notifications card — col 10–12 */}
      <BentoCell className="col-span-3" delay={360}>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-medium" style={{ color: "var(--gray-300)" }}>Notification</p>
          <div className="relative ml-auto">
            <Bell className="size-4" style={{ color: "var(--gray-400)" }} />
            <span className="absolute -top-1 -right-1 size-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--red-medium)" }} />
          </div>
        </div>
        <div className="space-y-2">
          {[
            { icon: <Sparkles className="size-4" />, title: "Neue Komponente", desc: "Button wurde aktualisiert.", time: "Jetzt", delay: 500 },
            { icon: <Check className="size-4" />, title: "Build erfolgreich", desc: "Vercel deployment fertig.", time: "2 Min.", delay: 650 },
            { icon: <Bell className="size-4" />, title: "Update verfügbar", desc: "shadcn/ui 3.0 ist live.", time: "1 Std.", delay: 800 },
          ].map(({ icon, title, desc, time, delay }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-xl p-3 animate-in fade-in slide-in-from-right-3"
              style={{
                backgroundColor: "var(--gray-100)",
                animationDuration: "0.4s",
                animationDelay: `${delay}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="mt-0.5 shrink-0" style={{ color: "var(--black)" }}>{icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{ color: "var(--black)" }}>{title}</p>
                <p className="text-xs truncate" style={{ color: "var(--gray-400)" }}>{desc}</p>
              </div>
              <span className="text-[10px] shrink-0" style={{ color: "var(--gray-300)" }}>{time}</span>
            </div>
          ))}
        </div>
      </BentoCell>

      {/* Row 3 */}

      {/* Accordion — col 1–4 */}
      <BentoCell className="col-span-4" delay={240}>
        <CellLabel>Accordion</CellLabel>
        <Accordion type="single" defaultValue="1" className="w-full">
          {[
            { id: "1", q: "Was ist DAYONE UI?", a: "Eine Komponenten-Bibliothek für alle DAYONE-Projekte, gebaut auf shadcn/ui." },
            { id: "2", q: "Welche Technologien?", a: "Next.js, Tailwind CSS v4, Radix UI und Recharts." },
            { id: "3", q: "Open Source?", a: "Ja – der Code ist öffentlich zugänglich und erweiterbar." },
          ].map(({ id, q, a }) => (
            <AccordionItem key={id} value={id} style={{ borderColor: "var(--gray-100)" }}>
              <AccordionTrigger className="text-sm font-medium hover:no-underline" style={{ color: "var(--black)" }}>
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm" style={{ color: "var(--gray-400)" }}>
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </BentoCell>

      {/* Badges + Avatars — col 5–8 */}
      <BentoCell className="col-span-4" delay={320}>
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

      {/* Tabs + Checkbox — col 9–12 */}
      <BentoCell className="col-span-4" delay={400}>
        <CellLabel>Tabs & Checkbox</CellLabel>
        <Tabs defaultValue="design" className="w-full mb-4">
          <TabsList variant="text">
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="dev">Entwicklung</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-3">
          {[
            { id: "c1", label: "Farbsystem definieren", checked: true },
            { id: "c2", label: "Typografie festlegen", checked: true },
            { id: "c3", label: "Komponenten bauen", checked: true },
            { id: "c4", label: "Dokumentation schreiben", checked: false },
            { id: "c5", label: "Beispiele hinzufügen", checked: false },
          ].map(({ id, label, checked }) => (
            <div key={id} className="flex items-center gap-3">
              <Checkbox id={id} defaultChecked={checked} />
              <label htmlFor={id} className={`text-sm ${checked ? "line-through" : ""}`} style={{ color: checked ? "var(--gray-300)" : "var(--black)" }}>
                {label}
              </label>
            </div>
          ))}
        </div>
      </BentoCell>

      {/* Row 4 */}

      {/* Table — col 1–8 */}
      <BentoCell className="col-span-8" delay={360}>
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
            {[
              { name: "Button", cat: "Grundelemente", version: "2.1", status: "Stabil", bg: "var(--black)", fg: "var(--white)" },
              { name: "Input", cat: "Formulare", version: "2.0", status: "Stabil", bg: "var(--black)", fg: "var(--white)" },
              { name: "Calendar", cat: "Datendarstellung", version: "1.4", status: "Beta", bg: "var(--blue-highlight)", fg: "var(--white)" },
              { name: "Drawer", cat: "Overlays", version: "1.2", status: "Beta", bg: "var(--blue-highlight)", fg: "var(--white)" },
              { name: "Chart", cat: "Datendarstellung", version: "0.9", status: "Alpha", bg: "var(--gray-100)", fg: "var(--gray-400)" },
            ].map((row) => (
              <tr key={row.name} style={{ borderBottom: "1px solid var(--gray-100)" }}>
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

      {/* Card — col 9–12 */}
      <BentoCell className="col-span-4" delay={440}>
        <CellLabel>Card</CellLabel>
        <Card style={{ borderColor: "var(--gray-100)" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <BarChart3 className="size-5" style={{ color: "var(--black)" }} />
              <Badge variant="outline" className="text-[10px]">+12%</Badge>
            </div>
            <CardTitle className="text-base font-semibold mt-2" style={{ color: "var(--black)" }}>
              50+ Komponenten
            </CardTitle>
            <CardDescription style={{ color: "var(--gray-400)", fontSize: "12px" }}>
              Zugänglich, typsicher und anpassbar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatedProgress value={82} delay={600} />
            <p className="text-xs mt-2" style={{ color: "var(--gray-300)" }}>82% der Kern-Komponenten fertig</p>
          </CardContent>
        </Card>
      </BentoCell>

    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <SiteHeader active="home" />

      <main className={`flex flex-1 flex-col items-center gap-16 px-8 py-16 ${DOCS_PAGE_PADDING}`}>

        {/* Hero */}
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

          <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
            <Button asChild size="lg">
              <Link href="/komponenten">Komponenten <ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/how-to-use">How to use</Link>
            </Button>
          </div>
        </div>

        {/* Full-width bento showcase */}
        <ShowcaseGrid />

      </main>

      <div className={`pointer-events-none absolute bottom-8 ${DOCS_PAGE_PADDING} right-0 left-0 flex justify-end`}>
        <SiteStamp />
      </div>
    </div>
  );
}
