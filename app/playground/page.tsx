"use client";

import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
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
import { DayoneButtonsShowcase } from "@/components/dayone-buttons";
import { DayoneSelectionControlsShowcase } from "@/components/dayone-selection-controls";
import { DayoneInputsShowcase } from "@/components/dayone-inputs-showcase";
import { DayoneTypographyShowcase } from "@/components/dayone-typography-showcase";
import { DocsDivider } from "@/components/docs-divider";
import { PlaygroundSection } from "@/components/playground-section";
import { PlaygroundVariantHeading } from "@/components/playground-variant-heading";
import { PLAYGROUND_SHOWCASE } from "@/lib/playground-layout";

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
      <main className="py-12 lg:py-16">
          <PlaygroundSection id="typography" title="Typography">
            <DayoneTypographyShowcase />
          </PlaygroundSection>

          <PlaygroundSection id="colors" title="Colors">
            <div className={PLAYGROUND_SHOWCASE}>
              <div>
                <PlaygroundVariantHeading className="mb-5">Grays</PlaygroundVariantHeading>
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
              <DocsDivider />
              <div>
                <PlaygroundVariantHeading className="mb-5">Sand</PlaygroundVariantHeading>
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
              <DocsDivider />
              <div>
                <PlaygroundVariantHeading className="mb-5">Red</PlaygroundVariantHeading>
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
              <DocsDivider />
              <div>
                <PlaygroundVariantHeading className="mb-5">Blue</PlaygroundVariantHeading>
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
              <DocsDivider />
            </div>
          </PlaygroundSection>

          <PlaygroundSection id="buttons" title="Buttons">
            <DayoneButtonsShowcase />
          </PlaygroundSection>

          <PlaygroundSection id="inputs-forms" title="Inputs & Forms">
            <DayoneInputsShowcase />
          </PlaygroundSection>

          <PlaygroundSection id="selection-controls" title="Selection Controls">
            <DayoneSelectionControlsShowcase />
          </PlaygroundSection>

          <PlaygroundSection id="navigation" title="Navigation">
            <div className={PLAYGROUND_SHOWCASE}>
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
              <DocsDivider />
              <div>
                <PlaygroundVariantHeading>Pagination</PlaygroundVariantHeading>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} text="Zurück" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => e.preventDefault()} isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => e.preventDefault()}>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => e.preventDefault()}>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => e.preventDefault()} text="Weiter" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </PlaygroundSection>

          <PlaygroundSection id="overlays" title="Overlays">
            <div className={PLAYGROUND_SHOWCASE}>

              <div>
                <PlaygroundVariantHeading>Dialog</PlaygroundVariantHeading>
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

              <DocsDivider />

              <div>
                <PlaygroundVariantHeading>Tooltip</PlaygroundVariantHeading>
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

              <DocsDivider />

              <div>
                <PlaygroundVariantHeading>Sheet</PlaygroundVariantHeading>
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
              <DocsDivider />
            </div>
          </PlaygroundSection>


          <PlaygroundSection id="feedback" title="Feedback">
            <div className={`${PLAYGROUND_SHOWCASE} space-y-4`}>
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
              <DocsDivider />
            </div>
          </PlaygroundSection>

          <PlaygroundSection id="data-display" title="Data Display">
            <div className={PLAYGROUND_SHOWCASE}>
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
              <DocsDivider />
            </div>
          </PlaygroundSection>

          <PlaygroundSection id="layout" title="Layout">
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
              <div className={PLAYGROUND_SHOWCASE}>
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
                <DocsDivider />
              </div>
            </div>
          </PlaygroundSection>

          <PlaygroundSection id="misc" title="Misc">
            <div className={`${PLAYGROUND_SHOWCASE} space-y-6`}>
              <Row label="Avatar">
                <div className="flex items-center -space-x-2">
                  {[
                    { initials: "VI", bg: "var(--black)", fg: "var(--white)" },
                    { initials: "BD", bg: "var(--sand-medium)", fg: "var(--black)" },
                    { initials: "AK", bg: "var(--blue-light)", fg: "var(--black)" },
                    { initials: "LR", bg: "var(--red-light)", fg: "var(--black)" },
                    { initials: "TM", bg: "var(--sand-dark)", fg: "var(--black)" },
                  ].map(({ initials, bg, fg }) => (
                    <Avatar key={initials} className="size-10 after:hidden ring-2 ring-background">
                      <AvatarFallback className="text-xs font-semibold" style={{ backgroundColor: bg, color: fg }}>{initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div
                    className="flex size-10 items-center justify-center rounded-full ring-2 ring-background text-xs font-semibold"
                    style={{ backgroundColor: "transparent", color: "var(--gray-400)", border: "1px solid var(--gray-100)" }}
                  >
                    +4
                  </div>
                </div>
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
                  <DocsDivider />
                  <Separator style={{ backgroundColor: "var(--black)" }} />
                </div>
              </Row>
              <DocsDivider />
            </div>
          </PlaygroundSection>

      </main>
    </TooltipProvider>
  );
}