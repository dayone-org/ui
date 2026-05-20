"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <div className="mb-8 flex items-center gap-4">
        <h2
          className="whitespace-nowrap text-xl font-semibold"
          style={{ color: "var(--black)" }}
        >
          {title}
        </h2>
        <div className="h-px flex-1" style={{ backgroundColor: "var(--gray-200)" }} />
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {label && <p className="text-xs mb-3 uppercase tracking-wider" style={{ color: "var(--gray-300)" }}>{label}</p>}
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default function PlaygroundPage() {
  const [sliderValue, setSliderValue] = useState([40]);

  return (
    <TooltipProvider>
      <main className="px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-14">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--sand-dark)" }}
          >
            Komponenten
          </p>
          <h1
            className="font-semibold"
            style={{
              fontSize: "var(--text-display-xl)",
              lineHeight: "var(--leading-display)",
              color: "var(--black)",
            }}
          >
            UI Playground
          </h1>
          <p
            className="mt-3 max-w-2xl"
            style={{
              fontSize: "var(--text-body-md)",
              lineHeight: "var(--leading-body)",
              color: "var(--gray-400)",
            }}
          >
            Visuelle Referenz aller Primitive — Tokens, Varianten und Zustände
            im DAYONE Designsystem.
          </p>
        </div>

          <Section id="typography" title="Typography">
            <div className="bg-white rounded-lg p-8 space-y-4">
              <p className="font-semibold" style={{ fontSize: "48px", lineHeight: "1.2", color: "var(--black)" }}>Display 3XL - SemiBold</p>
              <p className="font-normal" style={{ fontSize: "40px", lineHeight: "1.2", color: "var(--black)" }}>Display 2XL - Regular</p>
              <p className="font-semibold" style={{ fontSize: "32px", lineHeight: "1.2", color: "var(--black)" }}>Display XL - SemiBold</p>
              <p className="font-semibold" style={{ fontSize: "28px", lineHeight: "1.2", color: "var(--black)" }}>Display LG - SemiBold</p>
              <p className="font-semibold" style={{ fontSize: "24px", lineHeight: "1.2", color: "var(--black)" }}>Display MD - SemiBold</p>
              <p className="font-semibold" style={{ fontSize: "20px", lineHeight: "1.2", color: "var(--black)" }}>Display SM - SemiBold</p>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <p className="font-normal" style={{ fontSize: "18px", lineHeight: "1.5", color: "var(--black)", letterSpacing: "0.36px" }}>Body LG - Regular. Fuer Intro-Texte und Leads.</p>
              <p className="font-normal" style={{ fontSize: "16px", lineHeight: "1.5", color: "var(--gray-500)", letterSpacing: "0.32px" }}>Body MD - Regular. Standard Fliesstext.</p>
              <p className="font-normal" style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--gray-400)" }}>Body SM - Regular. Labels und Captions.</p>
              <p className="font-normal" style={{ fontSize: "12px", lineHeight: "1.5", color: "var(--gray-300)" }}>Body XS - Regular. Kleingedrucktes.</p>
            </div>
          </Section>

          <Section id="colors" title="Colors">
            <div className="bg-white rounded-lg p-8 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-wider mb-5" style={{ color: "var(--gray-400)" }}>Grays</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "$Black", token: "--black", hex: "#1A1A1A" },
                    { name: "$Gray500", token: "--gray-500", hex: "#333333" },
                    { name: "$Gray400", token: "--gray-400", hex: "#666666" },
                    { name: "$Gray300", token: "--gray-300", hex: "#999999" },
                    { name: "$Gray200", token: "--gray-200", hex: "#CCCCCC" },
                    { name: "$Gray100", token: "--gray-100", hex: "#F1F1F1" },
                    { name: "$White", token: "--white", hex: "#FFFFFF" },
                  ].map((color) => (
                    <div key={color.token} className="rounded-md overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
                      <div style={{ backgroundColor: color.hex }} className="h-20" />
                      <div className="px-3 py-3 space-y-1">
                        <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>{color.name}</p>
                        <p className="text-xs" style={{ color: "var(--gray-400)" }}>{color.hex}</p>
                        <p className="text-[11px] font-mono" style={{ color: "var(--gray-300)" }}>{color.token}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-5" style={{ color: "var(--gray-400)" }}>Sand</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "$SandDark", token: "--sand-dark", hex: "#9E9A94" },
                    { name: "$SandMedium", token: "--sand-medium", hex: "#EDE7DD" },
                    { name: "$SandLight", token: "--sand-light", hex: "#F7F3EB" },
                  ].map((color) => (
                    <div key={color.token} className="rounded-md overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
                      <div style={{ backgroundColor: color.hex }} className="h-20" />
                      <div className="px-3 py-3 space-y-1">
                        <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>{color.name}</p>
                        <p className="text-xs" style={{ color: "var(--gray-400)" }}>{color.hex}</p>
                        <p className="text-[11px] font-mono" style={{ color: "var(--gray-300)" }}>{color.token}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-5" style={{ color: "var(--gray-400)" }}>Red</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "$RedDark", token: "--red-dark", hex: "#CC443D" },
                    { name: "$RedMedium", token: "--red-medium", hex: "#FF544C" },
                    { name: "$RedLight", token: "--red-light", hex: "#FF8580" },
                  ].map((color) => (
                    <div key={color.token} className="rounded-md overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
                      <div style={{ backgroundColor: color.hex }} className="h-20" />
                      <div className="px-3 py-3 space-y-1">
                        <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>{color.name}</p>
                        <p className="text-xs" style={{ color: "var(--gray-400)" }}>{color.hex}</p>
                        <p className="text-[11px] font-mono" style={{ color: "var(--gray-300)" }}>{color.token}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-5" style={{ color: "var(--gray-400)" }}>Blue</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[{ name: "Blue Highlight", token: "--blue-highlight", hex: "#1487DD" }].map((color) => (
                    <div key={color.token} className="rounded-md overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
                      <div style={{ backgroundColor: color.hex }} className="h-20" />
                      <div className="px-3 py-3 space-y-1">
                        <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>{color.name}</p>
                        <p className="text-xs" style={{ color: "var(--gray-400)" }}>{color.hex}</p>
                        <p className="text-[11px] font-mono" style={{ color: "var(--gray-300)" }}>{color.token}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section id="buttons" title="Buttons">
            <div className="bg-white rounded-lg p-8 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Primary</p>
                <div className="space-y-4">
                  {[
                    { label: "Default", bg: "var(--black)", text: "var(--white)", border: "var(--black)" },
                    { label: "Hover", bg: "var(--sand-dark)", text: "var(--white)", border: "var(--sand-dark)" },
                    { label: "Focused", bg: "var(--black)", text: "var(--white)", border: "var(--sand-dark)", outline: true },
                    { label: "Disabled", bg: "var(--sand-medium)", text: "var(--white)", border: "var(--sand-medium)" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-6">
                      <span className="text-sm w-20 shrink-0" style={{ color: "var(--gray-300)" }}>{s.label}</span>
                      <button style={{ backgroundColor: s.bg, color: s.text, border: s.outline ? "2px solid " + s.border : "1px solid " + s.border }} className="flex items-center gap-2 px-[18px] py-[14px] rounded-md text-sm font-semibold" disabled={s.label === "Disabled"}>Button CTA <span>&#8594;</span></button>
                      <button style={{ backgroundColor: s.bg, color: s.text, border: s.outline ? "2px solid " + s.border : "1px solid " + s.border }} className="flex items-center gap-2 px-[28px] py-[16px] rounded-md text-base font-semibold" disabled={s.label === "Disabled"}>Button CTA <span>&#8594;</span></button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Secondary</p>
                <div className="space-y-4">
                  {[
                    { label: "Default", bg: "var(--white)", text: "var(--black)", border: "var(--white)" },
                    { label: "Hover", bg: "var(--sand-dark)", text: "var(--white)", border: "var(--sand-dark)" },
                    { label: "Focused", bg: "var(--white)", text: "var(--black)", border: "var(--sand-dark)", outline: true },
                    { label: "Disabled", bg: "var(--white)", text: "var(--sand-medium)", border: "var(--white)" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-6">
                      <span className="text-sm w-20 shrink-0" style={{ color: "var(--gray-300)" }}>{s.label}</span>
                      <button style={{ backgroundColor: s.bg, color: s.text, border: "2px solid " + s.border }} className="flex items-center gap-2 px-[18px] py-[14px] rounded-md text-sm font-semibold" disabled={s.label === "Disabled"}>Button CTA <span>&#8594;</span></button>
                      <button style={{ backgroundColor: s.bg, color: s.text, border: "2px solid " + s.border }} className="flex items-center gap-2 px-[28px] py-[16px] rounded-md text-base font-semibold" disabled={s.label === "Disabled"}>Button CTA <span>&#8594;</span></button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Link</p>
                <div className="space-y-4">
                  {[
                    { label: "Default", color: "var(--black)", borderColor: "var(--black)" },
                    { label: "Hover", color: "var(--sand-dark)", borderColor: "var(--sand-dark)" },
                    { label: "Focused", color: "var(--black)", borderColor: "var(--black)", bg: "var(--sand-medium)" },
                    { label: "Disabled", color: "var(--sand-medium)", borderColor: "transparent" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-6">
                      <span className="text-sm w-20 shrink-0" style={{ color: "var(--gray-300)" }}>{s.label}</span>
                      <button style={{ color: s.color, borderBottom: "2px solid " + s.borderColor, backgroundColor: s.bg || "transparent", paddingBottom: "8px" }} className="flex items-center gap-2 text-sm font-semibold" disabled={s.label === "Disabled"}>Button CTA <span>&#8594;</span></button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Inline-Link</p>
                <div className="space-y-4">
                  {[
                    { label: "Default", color: "var(--black)", borderColor: "var(--black)", bg: "transparent" },
                    { label: "Hover", color: "var(--white)", borderColor: "var(--black)", bg: "var(--black)" },
                    { label: "Focused", color: "var(--white)", borderColor: "var(--black)", bg: "var(--black)" },
                    { label: "Disabled", color: "var(--sand-medium)", borderColor: "transparent", bg: "transparent" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-6">
                      <span className="text-sm w-20 shrink-0" style={{ color: "var(--gray-300)" }}>{s.label}</span>
                      <button style={{ color: s.color, borderBottom: "2px solid " + s.borderColor, backgroundColor: s.bg, paddingBottom: "8px" }} className="text-sm font-semibold" disabled={s.label === "Disabled"}>Button CTA</button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "var(--gray-400)" }}>Mobile (full-width)</p>
                <button className="w-full px-5 py-[14px] rounded-md flex items-center justify-center gap-2 font-semibold text-base" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>Button CTA <span>&#8594;</span></button>
              </div>
            </div>
          </Section>

          <Section id="inputs-forms" title="Inputs & Forms">
            <div className="bg-white rounded-lg p-8 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>States</p>
                <div className="space-y-4">
                  {[
                    { label: "Default", state: "default" },
                    { label: "Filled", state: "filled" },
                    { label: "Hover", state: "hover" },
                    { label: "Focused", state: "focused" },
                    { label: "Disabled", state: "disabled" },
                    { label: "Helper Text", state: "helper" },
                  ].map(({ label, state }) => (
                    <div key={state} className="flex items-start gap-6">
                      <span className="text-sm w-24 shrink-0 pt-6" style={{ color: "var(--gray-400)" }}>{label}</span>
                      <div className="flex flex-col gap-1 w-64">
                        <p className="text-[12px] font-normal leading-[1.5]" style={{ color: state === "disabled" ? "var(--sand-dark)" : "var(--black)" }}>Vorname</p>
                        <div className="flex items-center px-3 py-[10px] rounded-sm" style={{ backgroundColor: "var(--sand-light)", border: state === "focused" ? "2px solid var(--black)" : "none", borderBottom: state !== "focused" ? "2px solid var(--sand-dark)" : undefined, opacity: state === "disabled" ? 0.3 : 1 }}>
                          <span className="text-[18px] font-semibold tracking-[0.54px]" style={{ color: state === "filled" ? "var(--black)" : "var(--sand-dark)" }}>
                            {state === "filled" ? "Victoria" : "Dein Vorname"}
                          </span>
                        </div>
                        {state === "helper" && (
                          <div className="flex items-center gap-2 pt-2">
                            <span className="text-sm" style={{ color: "var(--sand-dark)" }}>i</span>
                            <p className="text-[14px]" style={{ color: "var(--sand-dark)" }}>Helper Text</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator style={{ backgroundColor: "var(--gray-100)" }} />
              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Formular-Beispiel</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Name", placeholder: "Victoria Itter", type: "text" },
                    { label: "E-Mail", placeholder: "victoria@dayone.de", type: "email" },
                  ].map(({ label, placeholder, type }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <label className="text-[12px] font-normal" style={{ color: "var(--black)" }}>{label}</label>
                      <div className="flex items-center px-3 py-[10px]" style={{ backgroundColor: "var(--sand-light)", borderBottom: "2px solid var(--sand-dark)" }}>
                        <input type={type} placeholder={placeholder} className="bg-transparent text-[18px] font-semibold tracking-[0.54px] w-full outline-none" style={{ color: "var(--sand-dark)" }} />
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[12px] font-normal" style={{ color: "var(--black)" }}>Nachricht</label>
                    <div className="px-3 py-[10px]" style={{ backgroundColor: "var(--sand-light)", borderBottom: "2px solid var(--sand-dark)" }}>
                      <textarea placeholder="Deine Nachricht..." className="bg-transparent text-[18px] font-semibold tracking-[0.54px] w-full outline-none min-h-[80px] resize-none" style={{ color: "var(--sand-dark)" }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1" style={{ opacity: 0.3 }}>
                    <label className="text-[12px] font-normal" style={{ color: "var(--sand-dark)" }}>Disabled</label>
                    <div className="flex items-center px-3 py-[10px]" style={{ backgroundColor: "var(--sand-light)", borderBottom: "2px solid var(--sand-dark)" }}>
                      <input disabled placeholder="Nicht bearbeitbar" className="bg-transparent text-[18px] font-semibold tracking-[0.54px] w-full outline-none" style={{ color: "var(--sand-dark)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>


          
          <Section id="selection-controls" title="Selection Controls">
            <div className="bg-white rounded-lg p-8 space-y-8">

              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Checkbox</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox id="cb1" />
                    <label htmlFor="cb1" className="text-sm font-normal" style={{ color: "var(--black)" }}>Unchecked</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="cb2" defaultChecked />
                    <label htmlFor="cb2" className="text-sm font-normal" style={{ color: "var(--black)" }}>Checked</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="cb3" disabled />
                    <label htmlFor="cb3" className="text-sm font-normal" style={{ color: "var(--gray-300)" }}>Disabled unchecked</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="cb4" defaultChecked disabled />
                    <label htmlFor="cb4" className="text-sm font-normal" style={{ color: "var(--gray-300)" }}>Disabled checked</label>
                  </div>
                </div>
              </div>

              <Separator style={{ backgroundColor: "var(--gray-100)" }} />

              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Radio</p>
                <RadioGroup defaultValue="r1" className="space-y-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="r1" id="r1" />
                    <label htmlFor="r1" className="text-sm font-normal" style={{ color: "var(--black)" }}>Option 1</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="r2" id="r2" />
                    <label htmlFor="r2" className="text-sm font-normal" style={{ color: "var(--black)" }}>Option 2</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="r3" id="r3" disabled />
                    <label htmlFor="r3" className="text-sm font-normal" style={{ color: "var(--gray-300)" }}>Disabled</label>
                  </div>
                </RadioGroup>
              </div>

              <Separator style={{ backgroundColor: "var(--gray-100)" }} />

              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Switch</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Switch id="sw1" />
                    <label htmlFor="sw1" className="text-sm font-normal" style={{ color: "var(--black)" }}>Off</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="sw2" defaultChecked />
                    <label htmlFor="sw2" className="text-sm font-normal" style={{ color: "var(--black)" }}>On</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="sw3" disabled />
                    <label htmlFor="sw3" className="text-sm font-normal" style={{ color: "var(--gray-300)" }}>Disabled off</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="sw4" defaultChecked disabled />
                    <label htmlFor="sw4" className="text-sm font-normal" style={{ color: "var(--gray-300)" }}>Disabled on</label>
                  </div>
                </div>
              </div>

            </div>
          </Section>

        

          <Section id="navigation" title="Navigation">
            <div className="bg-white rounded-lg p-8">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6" style={{ backgroundColor: "var(--gray-100)" }}>
                  <TabsTrigger value="overview" className="data-[state=active]:text-white">Uebersicht</TabsTrigger>
                  <TabsTrigger value="details" className="data-[state=active]:text-white">Details</TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:text-white">Einstellungen</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><p style={{ color: "var(--gray-500)" }}>Uebersicht-Inhalt.</p></TabsContent>
                <TabsContent value="details"><p style={{ color: "var(--gray-500)" }}>Detail-Ansicht.</p></TabsContent>
                <TabsContent value="settings"><p style={{ color: "var(--gray-500)" }}>Einstellungen.</p></TabsContent>
              </Tabs>
            </div>
          </Section>

          <Section id="overlays" title="Overlays">
            <div className="bg-white rounded-lg p-8 space-y-8">

              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Dialog</p>
                <div className="flex flex-wrap gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
                        Dialog öffnen
                      </button>
                    </DialogTrigger>
                    <DialogContent style={{ backgroundColor: "var(--white)", borderColor: "var(--gray-200)" }}>
                      <DialogHeader>
                        <DialogTitle style={{ color: "var(--black)" }}>Titel des Dialogs</DialogTitle>
                        <DialogDescription style={{ color: "var(--gray-400)" }}>
                          Hier steht eine kurze Beschreibung was dieser Dialog tut oder welche Aktion bestätigt werden soll.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[12px] font-normal" style={{ color: "var(--black)" }}>Name</label>
                          <div className="flex items-center px-3 py-[10px]" style={{ backgroundColor: "var(--sand-light)", borderBottom: "2px solid var(--sand-dark)" }}>
                            <input placeholder="Victoria Itter" className="bg-transparent text-[18px] font-semibold w-full outline-none" style={{ color: "var(--sand-dark)" }} />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ border: "2px solid var(--white)", color: "var(--black)" }}>
                          Abbrechen
                        </button>
                        <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
                          Speichern
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ border: "2px solid var(--white)", color: "var(--black)" }}>
                        Destructive Dialog
                      </button>
                    </DialogTrigger>
                    <DialogContent style={{ backgroundColor: "var(--white)", borderColor: "var(--gray-200)" }}>
                      <DialogHeader>
                        <DialogTitle style={{ color: "var(--black)" }}>Wirklich löschen?</DialogTitle>
                        <DialogDescription style={{ color: "var(--gray-400)" }}>
                          Diese Aktion kann nicht rückgängig gemacht werden. Der Eintrag wird permanent gelöscht.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ border: "2px solid var(--white)", color: "var(--black)" }}>
                          Abbrechen
                        </button>
                        <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ backgroundColor: "var(--red-medium)", color: "var(--white)" }}>
                          Löschen
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Separator style={{ backgroundColor: "var(--gray-100)" }} />

              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Tooltip</p>
                <div className="flex flex-wrap gap-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
                          Hover mich
                        </button>
                      </TooltipTrigger>
                      <TooltipContent style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
                        <p>Das ist ein Tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ border: "2px solid var(--white)", color: "var(--black)" }}>
                          Auch ich
                        </button>
                      </TooltipTrigger>
                      <TooltipContent style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
                        <p>Noch ein Tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <Separator style={{ backgroundColor: "var(--gray-100)" }} />

              <div>
                <p className="text-xs uppercase tracking-wider mb-6" style={{ color: "var(--gray-400)" }}>Sheet</p>
                <div className="flex flex-wrap gap-4">
                  {(["right", "bottom"] as const).map((side) => (
                    <Sheet key={side}>
                      <SheetTrigger asChild>
                        <button className="px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
                          Sheet von {side === "right" ? "rechts" : "unten"}
                        </button>
                      </SheetTrigger>
                      <SheetContent side={side} style={{ backgroundColor: "var(--white)", borderColor: "var(--gray-200)" }}>
                        <SheetHeader>
                          <SheetTitle style={{ color: "var(--black)" }}>Sheet Titel</SheetTitle>
                          <SheetDescription style={{ color: "var(--gray-400)" }}>
                            Sheets eignen sich gut für Einstellungen oder zusätzliche Informationen.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-6 space-y-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-[12px] font-normal" style={{ color: "var(--black)" }}>Name</label>
                            <div className="flex items-center px-3 py-[10px]" style={{ backgroundColor: "var(--sand-light)", borderBottom: "2px solid var(--sand-dark)" }}>
                              <input placeholder="Victoria Itter" className="bg-transparent text-[18px] font-semibold w-full outline-none" style={{ color: "var(--sand-dark)" }} />
                            </div>
                          </div>
                        </div>
                        <SheetFooter>
                          <button className="w-full px-[18px] py-[14px] rounded-md text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
                            Speichern
                          </button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  ))}
                </div>
              </div>

            </div>
          </Section>


          <Section id="feedback" title="Feedback">
            <div className="bg-white rounded-lg p-8 space-y-4">
              <Row label="Badges">
                <Badge style={{ backgroundColor: "var(--black)", color: "var(--white)" }} className="rounded-full">Default</Badge>
                <Badge style={{ backgroundColor: "var(--sand-medium)", color: "var(--black)" }} className="rounded-full">Sand</Badge>
                <Badge style={{ backgroundColor: "var(--blue-highlight)", color: "var(--white)" }} className="rounded-full">Info</Badge>
                <Badge style={{ backgroundColor: "var(--red-medium)", color: "var(--white)" }} className="rounded-full">Error</Badge>
              </Row>
              <Alert className="rounded-md" style={{ borderColor: "var(--gray-200)" }}>
                <AlertTitle className="font-semibold" style={{ color: "var(--black)" }}>Hinweis</AlertTitle>
                <AlertDescription style={{ color: "var(--gray-400)" }}>Eine neutrale Benachrichtigung.</AlertDescription>
              </Alert>
              <Alert className="rounded-md" style={{ borderColor: "var(--red-medium)", backgroundColor: "#FFF5F5" }}>
                <AlertTitle className="font-semibold" style={{ color: "var(--red-medium)" }}>Fehler</AlertTitle>
                <AlertDescription style={{ color: "var(--gray-500)" }}>Etwas ist schiefgelaufen.</AlertDescription>
              </Alert>
              <Progress value={60} className="h-2" style={{ backgroundColor: "var(--gray-100)" }} />
            </div>
          </Section>

          <Section id="data-display" title="Data Display">
            <div className="bg-white rounded-lg p-8">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "var(--gray-100)" }}>
                    <TableHead className="font-semibold" style={{ color: "var(--black)" }}>Name</TableHead>
                    <TableHead className="font-semibold" style={{ color: "var(--black)" }}>Rolle</TableHead>
                    <TableHead className="font-semibold" style={{ color: "var(--black)" }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Victoria Itter", role: "Product Design", status: "Aktiv" },
                    { name: "Bean Duong", role: "Development", status: "Aktiv" },
                    { name: "Max Moldovan", role: "IT", status: "Abwesend" },
                  ].map((row) => (
                    <TableRow key={row.name} style={{ borderColor: "var(--gray-100)" }}>
                      <TableCell className="font-medium" style={{ color: "var(--black)" }}>{row.name}</TableCell>
                      <TableCell style={{ color: "var(--gray-400)" }}>{row.role}</TableCell>
                      <TableCell>
                        <Badge className="rounded-full text-xs" style={{ backgroundColor: row.status === "Aktiv" ? "var(--black)" : "var(--gray-100)", color: row.status === "Aktiv" ? "var(--white)" : "var(--gray-300)" }}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Section>

          <Section id="layout" title="Layout">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Design", "Development", "Strategy"].map((title) => (
                  <Card key={title} className="rounded-lg bg-white" style={{ borderColor: "var(--gray-200)" }}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold" style={{ color: "var(--black)" }}>{title}</CardTitle>
                      <CardDescription className="text-sm" style={{ color: "var(--gray-400)" }}>Beschreibung des Bereichs.</CardDescription>
                    </CardHeader>
                    <CardContent><p className="text-sm" style={{ color: "var(--gray-500)" }}>Inhalte zu {title}.</p></CardContent>
                    <CardFooter>
                      <button className="underline flex items-center gap-1 font-semibold text-sm" style={{ color: "var(--black)" }}>Mehr erfahren <span>&#8594;</span></button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="bg-white rounded-lg p-8">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" style={{ borderColor: "var(--gray-100)" }}>
                    <AccordionTrigger className="font-semibold hover:no-underline" style={{ color: "var(--black)" }}>Was ist shadcn/ui?</AccordionTrigger>
                    <AccordionContent style={{ color: "var(--gray-400)" }}>Eine Sammlung von Copy-Paste-Komponenten basierend auf Tailwind CSS.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" style={{ borderColor: "var(--gray-100)" }}>
                    <AccordionTrigger className="font-semibold hover:no-underline" style={{ color: "var(--black)" }}>Warum DAYONE Tokens?</AccordionTrigger>
                    <AccordionContent style={{ color: "var(--gray-400)" }}>Damit alle internen Tools sofort on-brand aussehen.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Section>

          <Section id="misc" title="Misc">
            <div className="bg-white rounded-lg p-8 space-y-6">
              <Row label="Avatar">
                <Avatar><AvatarFallback className="font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>VI</AvatarFallback></Avatar>
                <Avatar><AvatarFallback className="font-semibold" style={{ backgroundColor: "var(--sand-medium)", color: "var(--black)" }}>BD</AvatarFallback></Avatar>
                <Avatar><AvatarFallback className="font-semibold" style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-300)" }}>MM</AvatarFallback></Avatar>
              </Row>
              <Row label="Slider">
                <div className="w-full max-w-sm">
                  <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="w-full" />
                  <p className="text-sm mt-2" style={{ color: "var(--gray-300)" }}>{sliderValue[0]}%</p>
                </div>
              </Row>
              <Row label="Divider">
                <div className="w-full space-y-3">
                  <Separator style={{ backgroundColor: "var(--gray-200)" }} />
                  <Separator style={{ backgroundColor: "var(--gray-100)" }} />
                  <Separator style={{ backgroundColor: "var(--black)" }} />
                </div>
              </Row>
            </div>
          </Section>

      </main>
    </TooltipProvider>
  );
}