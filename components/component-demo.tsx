"use client";

import React, { useState } from "react";
import { DayoneButtonsContent } from "@/components/dayone-buttons";
import { DayoneTypographyShowcase } from "@/components/dayone-typography-showcase";
import { PlaygroundVariantHeading } from "@/components/playground-variant-heading";
import { Bold, Italic, Underline, Search, ChevronRight, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
// Spinner import kept for potential future use
// import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Item, ItemGroup, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NativeSelect } from "@/components/ui/native-select";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

// ─── Grundelemente ──────────────────────────────────────────────────────────

const COLOR_GROUPS = [
  { label: "Grays", colors: [
    { name: "$Black", token: "--black", hex: "#1A1A1A" },
    { name: "$Gray500", token: "--gray-500", hex: "#333333" },
    { name: "$Gray400", token: "--gray-400", hex: "#666666" },
    { name: "$Gray300", token: "--gray-300", hex: "#999999" },
    { name: "$Gray200", token: "--gray-200", hex: "#CCCCCC" },
    { name: "$Gray100", token: "--gray-100", hex: "#F1F1F1" },
    { name: "$White", token: "--white", hex: "#FFFFFF" },
  ]},
  { label: "Sand", colors: [
    { name: "$SandDark", token: "--sand-dark", hex: "#9E9A94" },
    { name: "$SandMedium", token: "--sand-medium", hex: "#EDE7DD" },
    { name: "$SandLight", token: "--sand-light", hex: "#F7F3EB" },
  ]},
  { label: "Red", colors: [
    { name: "$RedDark", token: "--red-dark", hex: "#CC443D" },
    { name: "$RedMedium", token: "--red-medium", hex: "#FF544C" },
    { name: "$RedLight", token: "--red-light", hex: "#FF8580" },
  ]},
  { label: "Blue", colors: [
    { name: "Blue Highlight", token: "--blue-highlight", hex: "#1487DD" },
  ]},
];

function ColorsDemo() {
  return (
    <div className="space-y-8">
      {COLOR_GROUPS.map((group) => (
        <div key={group.label}>
          <PlaygroundVariantHeading className="mb-4">{group.label}</PlaygroundVariantHeading>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {group.colors.map((color) => (
              <div key={color.token} className="overflow-hidden rounded-md" style={{ border: "1px solid var(--gray-100)" }}>
                <div className="h-16" style={{ backgroundColor: color.hex, boxShadow: color.hex === "#FFFFFF" ? "inset 0 0 0 1px var(--gray-100)" : undefined }} />
                <div className="space-y-0.5 px-2.5 py-2.5">
                  <p className="text-xs font-semibold" style={{ color: "var(--black)" }}>{color.name}</p>
                  <p className="text-[10px]" style={{ color: "var(--gray-400)" }}>{color.hex}</p>
                  <p className="font-mono text-[10px]" style={{ color: "var(--gray-300)" }}>{color.token}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographyDemo() {
  return <DayoneTypographyShowcase />;
}

function ButtonDemo() {
  return <DayoneButtonsContent />;
}

function ButtonGroupDemo() {
  const [active, setActive] = useState("monat");
  const items = [{ key: "woche", label: "Woche" }, { key: "monat", label: "Monat" }, { key: "jahr", label: "Jahr" }];
  return (
    <ButtonGroup className="w-fit">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => setActive(item.key)}
          /* flex-1 inside a fixed container makes all buttons equal width */
          className="flex-1 rounded-md border px-6 py-3 text-sm font-medium transition-colors"
          style={{
            backgroundColor: active === item.key ? "var(--black)" : "var(--white)",
            color: active === item.key ? "var(--white)" : "var(--black)",
            borderColor: active === item.key ? "var(--black)" : "var(--gray-200)",
            /* min-width matches longest label so all cells are equal */
            minWidth: "5.5rem",
          }}
        >
          {item.label}
        </button>
      ))}
    </ButtonGroup>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {[
        { bg: "var(--black)", color: "var(--white)", label: "Default" },
        { bg: "var(--sand-medium)", color: "var(--black)", label: "Sand" },
        { bg: "var(--blue-highlight)", color: "var(--white)", label: "Info" },
        { bg: "var(--red-medium)", color: "var(--white)", label: "Fehler" },
        { bg: "var(--gray-100)", color: "var(--gray-400)", label: "Inaktiv" },
      ].map(({ bg, color, label }) => (
        <Badge
          key={label}
          className="rounded-full"
          style={{ backgroundColor: bg, color, padding: "0.375rem 0.875rem 0.5rem", fontSize: "0.75rem" }}
        >
          {label}
        </Badge>
      ))}
    </div>
  );
}

function SeparatorDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <p className="text-sm" style={{ color: "var(--black)" }}>Abschnitt A</p>
      <Separator style={{ backgroundColor: "var(--gray-100)", height: "1px", display: "block" }} />
      <p className="text-sm" style={{ color: "var(--black)" }}>Abschnitt B</p>
    </div>
  );
}

function SkeletonDemo() {
  // Mix between --gray-100 (#F1F1F1) and --sand-medium (#EDE7DD)
  const skeletonColor = "#E8E3DB";
  return (
    <div className="w-full max-w-xs space-y-3">
      <Skeleton className="h-5 w-3/4 rounded-md" style={{ backgroundColor: skeletonColor }} />
      <Skeleton className="h-5 w-full rounded-md" style={{ backgroundColor: skeletonColor }} />
      <Skeleton className="h-5 w-1/2 rounded-md" style={{ backgroundColor: skeletonColor }} />
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      {[20, 28, 36].map((size) => (
        <div key={size} className="dayone-spinner" style={{ width: size, height: size }} />
      ))}
    </div>
  );
}

function LoadingDemo() {
  return (
    <div className="space-y-8">
      <div>
        <PlaygroundVariantHeading>Skeleton</PlaygroundVariantHeading>
        <SkeletonDemo />
      </div>
      <div>
        <PlaygroundVariantHeading>Spinner</PlaygroundVariantHeading>
        <SpinnerDemo />
      </div>
    </div>
  );
}

function EmptyDemo() {
  return (
    <Empty style={{ border: "1px dashed var(--gray-200)", maxWidth: "280px" }}>
      <EmptyHeader>
        <EmptyTitle style={{ color: "var(--black)", fontSize: "var(--text-body-md)", fontWeight: 600 }}>
          Keine Einträge
        </EmptyTitle>
        <EmptyDescription style={{ color: "var(--gray-400)", fontSize: "var(--text-body-sm)" }}>
          Erstelle deinen ersten Eintrag, um hier loszulegen.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function KbdDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--gray-500)" }}>
        Befehlspalette öffnen
        <span className="flex items-center gap-1">
          <Kbd style={{ backgroundColor: "var(--gray-200)", color: "var(--black)" }}>⌘</Kbd>
          <Kbd style={{ backgroundColor: "var(--gray-200)", color: "var(--black)" }}>K</Kbd>
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--gray-500)" }}>
        Bestätigen
        <Kbd style={{ backgroundColor: "var(--gray-200)", color: "var(--black)" }}>Enter</Kbd>
      </div>
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--gray-500)" }}>
        Abbrechen
        <Kbd style={{ backgroundColor: "var(--gray-200)", color: "var(--black)" }}>Esc</Kbd>
      </div>
    </div>
  );
}

function LabelDemo() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="demo-label" style={{ color: "var(--black)", fontSize: "var(--text-body-sm)" }}>
        E-Mail-Adresse
      </Label>
      <Input
        id="demo-label"
        type="email"
        placeholder="name@dayone.de"
        className="max-w-xs"
        style={{ borderColor: "var(--gray-200)" }}
      />
    </div>
  );
}


function ItemDemo() {
  return (
    <ItemGroup className="max-w-xs">
      {[
        { title: "Victoria Itter", description: "Product Design" },
        { title: "Bean Duong", description: "Development" },
        { title: "Max Moldovan", description: "IT" },
      ].map((item) => (
        <Item key={item.title} variant="outline" className="gap-4">
          <Avatar className="size-11 shrink-0">
            <AvatarFallback style={{ backgroundColor: "var(--black)", color: "var(--white)", fontSize: "12px" }}>
              {item.title.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <ItemContent className="gap-0.5">
            <ItemTitle className="font-semibold" style={{ color: "var(--black)" }}>{item.title}</ItemTitle>
            <ItemDescription className="text-xs" style={{ color: "var(--gray-400)" }}>{item.description}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  );
}

// ─── Formulare ──────────────────────────────────────────────────────────────

function InputDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Input placeholder="Normales Eingabefeld" />
      <Input placeholder="Deaktiviert" disabled />
    </div>
  );
}

function TextareaDemo() {
  return (
    <Textarea
      placeholder="Schreibe hier deinen Text..."
      className="w-full max-w-xs resize-none"
      rows={4}
    />
  );
}

function SelectDemo() {
  return (
    <Select>
      <SelectTrigger
        className="w-52"
        style={{ borderColor: "#D4CEC7", padding: "0.75rem 1rem", height: "auto" }}
      >
        <SelectValue placeholder="Kategorie wählen" />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={4}>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="dev">Development</SelectItem>
        <SelectItem value="strategy">Strategy</SelectItem>
        <SelectItem value="it">IT</SelectItem>
      </SelectContent>
    </Select>
  );
}

function NativeSelectDemo() {
  return (
    <NativeSelect>
      <option value="">Bereich wählen</option>
      <option value="design">Design</option>
      <option value="dev">Development</option>
      <option value="strategy">Strategy</option>
      <option value="it">IT</option>
    </NativeSelect>
  );
}

function ComboboxDemo() {
  const [value, setValue] = useState<string | null>(null);
  const items = ["Rechnungen", "Bestellungen", "Projekte", "Kunden", "Berichte"];
  return (
    <div className="w-56">
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxInput placeholder="Suchen..." />
        <ComboboxContent>
          <ComboboxList>
            {items.map((item) => (
              <ComboboxItem key={item} value={item}>{item}</ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

function CtrlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <span className="w-20 shrink-0 text-sm" style={{ color: "var(--gray-300)" }}>{label}</span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}
function CtrlOption({ id, label, disabled, children }: { id: string; label: string; disabled?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {children}
      <label htmlFor={id} className="text-sm font-normal leading-[1.5] select-none cursor-pointer" style={{ color: disabled ? "var(--gray-300)" : "var(--black)" }}>{label}</label>
    </div>
  );
}

function CheckboxDemo() {
  return (
    <div className="space-y-8">
      <div>
        <PlaygroundVariantHeading>Checkbox</PlaygroundVariantHeading>
        <div className="space-y-4">
          <CtrlRow label="Default">
            <CtrlOption id="cb-u" label="Unchecked"><Checkbox id="cb-u" /></CtrlOption>
            <CtrlOption id="cb-c" label="Checked"><Checkbox id="cb-c" defaultChecked /></CtrlOption>
          </CtrlRow>
          <CtrlRow label="Disabled">
            <CtrlOption id="cb-du" label="Unchecked" disabled><Checkbox id="cb-du" disabled /></CtrlOption>
            <CtrlOption id="cb-dc" label="Checked" disabled><Checkbox id="cb-dc" defaultChecked disabled /></CtrlOption>
          </CtrlRow>
        </div>
      </div>
    </div>
  );
}

function RadioGroupDemo() {
  return (
    <div className="space-y-8">
      <div>
        <PlaygroundVariantHeading>Radio</PlaygroundVariantHeading>
        <div className="space-y-4">
          <CtrlRow label="Default">
            <RadioGroup defaultValue="r1" className="flex flex-row flex-wrap gap-6">
              <CtrlOption id="r1" label="Option 1"><RadioGroupItem value="r1" id="r1" /></CtrlOption>
              <CtrlOption id="r2" label="Option 2"><RadioGroupItem value="r2" id="r2" /></CtrlOption>
              <CtrlOption id="r3" label="Option 3"><RadioGroupItem value="r3" id="r3" /></CtrlOption>
            </RadioGroup>
          </CtrlRow>
          <CtrlRow label="Disabled">
            <RadioGroup defaultValue="rd1" className="flex flex-row flex-wrap gap-6">
              <CtrlOption id="rd1" label="Selected" disabled><RadioGroupItem value="rd1" id="rd1" disabled /></CtrlOption>
              <CtrlOption id="rd2" label="Option" disabled><RadioGroupItem value="rd2" id="rd2" disabled /></CtrlOption>
            </RadioGroup>
          </CtrlRow>
        </div>
      </div>
    </div>
  );
}

function ToggleDemo() {
  return (
    <div className="space-y-8">
      <div>
        <PlaygroundVariantHeading>Toggle</PlaygroundVariantHeading>
        <div className="flex gap-1">
          <Toggle aria-label="Fett"><Bold className="size-4" /></Toggle>
          <Toggle aria-label="Kursiv"><Italic className="size-4" /></Toggle>
          <Toggle aria-label="Unterstrichen"><Underline className="size-4" /></Toggle>
        </div>
      </div>
    </div>
  );
}

function ToggleGroupDemo() {
  return (
    <div className="space-y-8">
      <div>
        <PlaygroundVariantHeading>Toggle Group — Single</PlaygroundVariantHeading>
        <ToggleGroup type="single" defaultValue="monat">
          <ToggleGroupItem value="woche">Woche</ToggleGroupItem>
          <ToggleGroupItem value="monat">Monat</ToggleGroupItem>
          <ToggleGroupItem value="jahr">Jahr</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <PlaygroundVariantHeading>Toggle Group — Multiple</PlaygroundVariantHeading>
        <ToggleGroup type="multiple" defaultValue={["b", "u"]}>
          <ToggleGroupItem value="b" aria-label="Bold"><Bold className="size-4" /></ToggleGroupItem>
          <ToggleGroupItem value="i" aria-label="Italic"><Italic className="size-4" /></ToggleGroupItem>
          <ToggleGroupItem value="u" aria-label="Underline"><Underline className="size-4" /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

function SwitchDemo() {
  return (
    <div className="space-y-8">
      <div>
        <PlaygroundVariantHeading>Switch</PlaygroundVariantHeading>
        <div className="space-y-4">
          <CtrlRow label="Default">
            <CtrlOption id="sw-off" label="Off"><Switch id="sw-off" /></CtrlOption>
            <CtrlOption id="sw-on" label="On"><Switch id="sw-on" defaultChecked /></CtrlOption>
          </CtrlRow>
          <CtrlRow label="Disabled">
            <CtrlOption id="sw-doff" label="Off" disabled><Switch id="sw-doff" disabled /></CtrlOption>
            <CtrlOption id="sw-don" label="On" disabled><Switch id="sw-don" defaultChecked disabled /></CtrlOption>
          </CtrlRow>
        </div>
      </div>
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState([60]);
  return (
    <div className="w-full max-w-sm space-y-4">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <div className="flex justify-between text-xs" style={{ color: "var(--gray-400)" }}>
        <span>0</span>
        <span className="font-semibold" style={{ color: "var(--black)" }}>{value[0]}%</span>
        <span>100</span>
      </div>
    </div>
  );
}

function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function InputGroupDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <InputGroup style={{ borderColor: "#D4CEC7" }}>
        <InputGroupAddon align="inline-start">
          <Search className="size-4" style={{ color: "var(--gray-400)" }} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Suchen..." className="py-3 px-2" />
      </InputGroup>
      <InputGroup style={{ borderColor: "#D4CEC7" }}>
        <InputGroupInput placeholder="Betrag" className="py-3 px-4" />
        <InputGroupAddon align="inline-end">
          <span className="text-sm" style={{ color: "var(--gray-400)" }}>€</span>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function FieldDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <Field>
        <FieldLabel htmlFor="field-name">Vollständiger Name</FieldLabel>
        <Input id="field-name" placeholder="Victoria Itter" />
        <FieldDescription style={{ color: "var(--gray-400)", fontSize: "var(--text-body-sm)" }}>
          Dieser Name wird öffentlich angezeigt.
        </FieldDescription>
      </Field>
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────

function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList
        variant="line"
        className="w-full justify-start h-auto rounded-none bg-transparent p-0 gap-0"
        style={{ borderBottom: "1px solid var(--gray-100)" }}
      >
        {[
          { value: "overview", label: "Übersicht" },
          { value: "details", label: "Details" },
          { value: "settings", label: "Einstellungen" },
        ].map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="h-auto rounded-none px-0 mr-8 last:mr-0 pb-3 text-sm font-medium bg-transparent border-0 shadow-none data-active:bg-transparent data-active:shadow-none data-active:text-[var(--black)] hover:text-[var(--black)] transition-colors"
            style={{ color: undefined }}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="overview" className="mt-5">
        <p className="text-sm" style={{ color: "var(--gray-400)" }}>Überblick über alle wichtigen Informationen.</p>
      </TabsContent>
      <TabsContent value="details" className="mt-5">
        <p className="text-sm" style={{ color: "var(--gray-400)" }}>Detaillierte Ansicht und weitere Optionen.</p>
      </TabsContent>
      <TabsContent value="settings" className="mt-5">
        <p className="text-sm" style={{ color: "var(--gray-400)" }}>Konfiguration und Einstellungen.</p>
      </TabsContent>
    </Tabs>
  );
}

function BreadcrumbDemo() {
  const [active, setActive] = useState("breadcrumb");
  const items = [
    { key: "start", label: "Start" },
    { key: "komponenten", label: "Komponenten" },
    { key: "breadcrumb", label: "Breadcrumb" },
  ];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx) => (
          <React.Fragment key={item.key}>
            {idx > 0 && <BreadcrumbSeparator style={{ color: "var(--gray-200)" }} />}
            <BreadcrumbItem>
              {active === item.key ? (
                <BreadcrumbPage style={{ color: "var(--black)", fontWeight: 600 }}>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href="#"
                  style={{ color: "var(--gray-400)" }}
                  onClick={(e) => { e.preventDefault(); setActive(item.key); }}
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(2);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }}
            style={{ color: "var(--black)" }}
          />
        </PaginationItem>
        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={page === p}
              onClick={(e) => { e.preventDefault(); setPage(p); }}
              style={page === p ? { backgroundColor: "var(--black)", color: "var(--white)" } : { color: "var(--gray-400)" }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(3, p + 1)); }}
            style={{ color: "var(--black)" }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function NavigationMenuDemo() {
  const menus = [
    { label: "Produkte", items: ["App", "API", "Dashboard"] },
    { label: "Lösungen", items: ["Enterprise", "Startup", "Education"] },
    { label: "Über uns", items: ["Team", "Blog", "Karriere"] },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.label}>
            <NavigationMenuTrigger
              className="text-sm font-medium"
              style={{ color: "var(--black)", backgroundColor: "transparent" }}
            >
              {menu.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[180px] gap-0.5 p-2">
                {menu.items.map((item) => (
                  <li key={item}>
                    <NavigationMenuLink
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-[var(--gray-100)]"
                      style={{ color: "var(--black)" }}
                    >
                      {item}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MenubarDemo() {
  return (
    <Menubar style={{ borderColor: "var(--gray-200)" }}>
      <MenubarMenu>
        <MenubarTrigger style={{ color: "var(--black)" }}>Datei</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Neu</MenubarItem>
          <MenubarItem>Öffnen</MenubarItem>
          <MenubarItem>Speichern</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger style={{ color: "var(--black)" }}>Bearbeiten</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Rückgängig</MenubarItem>
          <MenubarItem>Wiederholen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger style={{ color: "var(--black)" }}>Ansicht</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Vollbild</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: "var(--black)", color: "var(--white)" }}
        >
          Aktionen <ChevronDown className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
        <DropdownMenuItem>Duplizieren</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem style={{ color: "var(--red-medium)" }}>Löschen</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="flex h-24 w-48 items-center justify-center rounded-lg text-sm"
          style={{ border: "2px dashed var(--gray-200)", color: "var(--gray-400)" }}
        >
          Rechtsklick hier
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Öffnen</ContextMenuItem>
        <ContextMenuItem>Kopieren</ContextMenuItem>
        <ContextMenuItem style={{ color: "var(--red-medium)" }}>Löschen</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function SidebarDemo() {
  return (
    <div
      className="flex h-40 w-full max-w-sm overflow-hidden rounded-lg"
      style={{ border: "1px solid var(--gray-200)" }}
    >
      <div className="w-44 shrink-0 space-y-1 p-3" style={{ backgroundColor: "var(--gray-100)", borderRight: "1px solid var(--gray-200)" }}>
        {[{ label: "Dashboard", active: false }, { label: "Komponenten", active: true }, { label: "Einstellungen", active: false }].map(({ label, active }) => (
          <div
            key={label}
            className="rounded-md px-3 py-1.5 text-sm"
            style={{
              backgroundColor: active ? "var(--black)" : "transparent",
              color: active ? "var(--white)" : "var(--gray-400)",
              fontWeight: active ? 600 : 400,
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-sm" style={{ color: "var(--gray-300)" }}>Inhalt</p>
      </div>
    </div>
  );
}

// ─── Overlays ───────────────────────────────────────────────────────────────

function DialogDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
            Dialog öffnen
          </button>
        </DialogTrigger>
        <DialogContent style={{ backgroundColor: "var(--white)" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "var(--black)" }}>Änderungen speichern?</DialogTitle>
            <DialogDescription style={{ color: "var(--gray-400)" }}>
              Deine Änderungen werden dauerhaft gespeichert.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button className="rounded-md px-4 py-2 text-sm" style={{ color: "var(--black)", border: "1px solid var(--gray-200)" }}>Abbrechen</button>
            </DialogClose>
            <DialogClose asChild>
              <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>Speichern</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--red-medium)", color: "var(--white)" }}>
          Löschen
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent style={{ backgroundColor: "var(--white)" }}>
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: "var(--black)" }}>Wirklich löschen?</AlertDialogTitle>
          <AlertDialogDescription style={{ color: "var(--gray-400)" }}>
            Diese Aktion kann nicht rückgängig gemacht werden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel style={{ color: "var(--black)", border: "1px solid var(--gray-200)", backgroundColor: "transparent" }}>Abbrechen</AlertDialogCancel>
          <AlertDialogAction style={{ backgroundColor: "var(--red-medium)", color: "var(--white)", border: "none" }}>Löschen</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
          Drawer öffnen
        </button>
      </DrawerTrigger>
      <DrawerContent style={{ backgroundColor: "var(--white)" }}>
        <DrawerHeader>
          <DrawerTitle style={{ color: "var(--black)" }}>Details</DrawerTitle>
          <DrawerDescription style={{ color: "var(--gray-400)" }}>
            Zusätzliche Informationen und Aktionen.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <button className="rounded-md px-4 py-2.5 text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
            Übernehmen
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
          Sheet öffnen
        </button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} style={{ backgroundColor: "var(--white)", borderColor: "var(--gray-200)" }}>
        <div className="flex justify-end p-4 pb-2">
          <SheetClose asChild>
            <button className="rounded-md px-3 py-1.5 text-sm" style={{ color: "var(--black)", border: "1px solid var(--gray-200)" }}>
              Schließen
            </button>
          </SheetClose>
        </div>
        <SheetHeader className="px-4 pb-4">
          <SheetTitle style={{ color: "var(--black)" }}>Einstellungen</SheetTitle>
          <SheetDescription style={{ color: "var(--gray-400)" }}>
            Passe deine Einstellungen hier an.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1" />
        <SheetFooter className="flex-row justify-end gap-2">
          <SheetClose asChild>
            <button className="rounded-md px-4 py-2 text-sm" style={{ color: "var(--black)", border: "1px solid var(--gray-200)" }}>Abbrechen</button>
          </SheetClose>
          <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>Speichern</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ border: "1px solid var(--gray-200)", color: "var(--black)" }}>
          Info anzeigen
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64" style={{ backgroundColor: "var(--white)", borderColor: "var(--gray-200)" }}>
        <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>DAYONE UI</p>
        <p className="mt-1 text-sm" style={{ color: "var(--gray-400)" }}>Designsystem für interne Tools. Gebaut auf shadcn/ui.</p>
      </PopoverContent>
    </Popover>
  );
}

function HoverCardDemo() {
  return (
    <HoverCard openDelay={0} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button className="text-sm font-semibold underline underline-offset-4" style={{ color: "var(--black)" }}>
          @victoria.itter
        </button>
      </HoverCardTrigger>
      <HoverCardContent style={{ backgroundColor: "var(--white)", borderColor: "var(--gray-200)" }}>
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback style={{ backgroundColor: "var(--black)", color: "var(--white)", fontSize: "12px" }}>VI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>Victoria Itter</p>
            <p className="text-xs" style={{ color: "var(--gray-400)" }}>Product Design · DAYONE</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function CommandDemo() {
  return (
    <Command className="rounded-lg" style={{ border: "1px solid var(--gray-200)", maxWidth: "280px" }}>
      <CommandInput placeholder="Suchen..." />
      <CommandList>
        <CommandEmpty style={{ color: "var(--gray-400)" }}>Kein Ergebnis</CommandEmpty>
        <CommandGroup heading="Komponenten">
          <CommandItem>Button</CommandItem>
          <CommandItem>Input</CommandItem>
          <CommandItem>Dialog</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-md px-4 py-2 text-sm font-semibold" style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
              Hover
            </button>
          </TooltipTrigger>
          <TooltipContent style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
            Das ist ein Tooltip
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="rounded-md px-4 py-2 text-sm" style={{ border: "1px solid var(--gray-200)", color: "var(--black)" }}>
              Und hier
            </button>
          </TooltipTrigger>
          <TooltipContent style={{ backgroundColor: "var(--black)", color: "var(--white)" }}>
            Noch ein Tooltip
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

// ─── Feedback ───────────────────────────────────────────────────────────────

function AlertDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Alert className="rounded-md" style={{ borderColor: "var(--gray-200)" }}>
        <AlertTitle className="font-semibold" style={{ color: "var(--black)" }}>Hinweis</AlertTitle>
        <AlertDescription style={{ color: "var(--gray-400)" }}>Deine Änderungen wurden gespeichert.</AlertDescription>
      </Alert>
      <Alert className="rounded-md" style={{ borderColor: "var(--red-medium)", backgroundColor: "#FFF5F5" }}>
        <AlertTitle className="font-semibold" style={{ color: "var(--red-medium)" }}>Fehler</AlertTitle>
        <AlertDescription style={{ color: "var(--gray-500)" }}>Etwas ist schiefgelaufen. Versuche es erneut.</AlertDescription>
      </Alert>
    </div>
  );
}

function ProgressDemo() {
  const [value] = useState(65);
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex justify-between text-xs" style={{ color: "var(--gray-400)" }}>
        <span>Fortschritt</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-2" style={{ backgroundColor: "var(--gray-200)" }} />
    </div>
  );
}

function SonnerDemo() {
  return (
    <button
      onClick={() => toast("Änderungen gespeichert", { description: "Dein Profil wurde erfolgreich aktualisiert." })}
      className="rounded-md px-4 py-2 text-sm font-semibold"
      style={{ backgroundColor: "var(--black)", color: "var(--white)" }}
    >
      Toast anzeigen
    </button>
  );
}

// ─── Datendarstellung ───────────────────────────────────────────────────────

function TableDemo() {
  const rows = [
    { name: "Victoria Itter", role: "Design", status: "Aktiv" },
    { name: "Bean Duong", role: "Development", status: "Aktiv" },
    { name: "Max Moldovan", role: "IT", status: "Abwesend" },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow style={{ borderColor: "var(--gray-100)" }}>
          <TableHead className="font-semibold" style={{ color: "var(--black)" }}>Name</TableHead>
          <TableHead className="font-semibold" style={{ color: "var(--black)" }}>Rolle</TableHead>
          <TableHead className="font-semibold" style={{ color: "var(--black)" }}>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
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
  );
}

function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {["Design", "Development", "Strategy"].map((item) => (
          <CarouselItem key={item}>
            <div className="flex h-24 items-center justify-center rounded-lg text-sm font-semibold" style={{ backgroundColor: "var(--white)", border: "1px solid var(--gray-200)", color: "var(--black)" }}>
              {item}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious style={{ color: "var(--black)", borderColor: "var(--gray-200)" }} />
      <CarouselNext style={{ color: "var(--black)", borderColor: "var(--gray-200)" }} />
    </Carousel>
  );
}

function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg"
      style={{ border: "1px solid var(--gray-200)", backgroundColor: "var(--white)" }}
    />
  );
}

const chartData = [
  { name: "Jan", value: 32 },
  { name: "Feb", value: 58 },
  { name: "Mär", value: 45 },
  { name: "Apr", value: 72 },
  { name: "Mai", value: 61 },
  { name: "Jun", value: 88 },
];

function ChartDemo() {
  return (
    <div className="w-full max-w-xs rounded-lg p-4" style={{ backgroundColor: "var(--white)", border: "1px solid var(--gray-200)" }}>
      <p className="mb-4 text-sm font-semibold" style={{ color: "var(--black)" }}>Monatliche Aufrufe</p>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={chartData} barSize={20}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--gray-300)" }} />
          <Bar dataKey="value" fill="var(--black)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="flex items-center -space-x-2">
      {[
        { initials: "VI", bg: "var(--black)", fg: "var(--white)" },
        { initials: "BD", bg: "var(--sand-medium)", fg: "var(--black)" },
        { initials: "MM", bg: "var(--gray-100)", fg: "var(--gray-400)" },
      ].map(({ initials, bg, fg }) => (
        <Avatar key={initials} className="size-10 ring-2 ring-white">
          <AvatarFallback className="text-xs font-semibold" style={{ backgroundColor: bg, color: fg }}>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <div
        className="flex size-10 items-center justify-center rounded-full ring-2 ring-white text-xs font-semibold"
        style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-500)" }}
      >
        +3
      </div>
    </div>
  );
}

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-xs">
      <AccordionItem value="1" style={{ borderColor: "var(--gray-100)" }}>
        <AccordionTrigger className="font-semibold hover:no-underline" style={{ color: "var(--black)" }}>
          Was ist DAYONE UI?
        </AccordionTrigger>
        <AccordionContent style={{ color: "var(--gray-400)" }}>
          Eine Komponenten-Bibliothek für interne DAYONE Tools.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2" style={{ borderColor: "var(--gray-100)" }}>
        <AccordionTrigger className="font-semibold hover:no-underline" style={{ color: "var(--black)" }}>
          Wie installiere ich es?
        </AccordionTrigger>
        <AccordionContent style={{ color: "var(--gray-400)" }}>
          Repository klonen und npm install ausführen.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-xs">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>Erweiterte Optionen</p>
        <CollapsibleTrigger asChild>
          <button className="rounded p-1" style={{ color: "var(--gray-400)" }}>
            <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-3 space-y-2">
        {["Option A", "Option B", "Option C"].map((opt) => (
          <p key={opt} className="text-sm" style={{ color: "var(--gray-400)" }}>{opt}</p>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────

function CardDemo() {
  return (
    <Card className="w-full max-w-xs rounded-lg" style={{ borderColor: "var(--gray-200)" }}>
      <CardHeader>
        <CardTitle className="text-base font-semibold" style={{ color: "var(--black)" }}>Projektübersicht</CardTitle>
        <CardDescription className="text-sm" style={{ color: "var(--gray-400)" }}>Stand: Juni 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm" style={{ color: "var(--gray-500)" }}>Alle laufenden Projekte im Überblick.</p>
      </CardContent>
      <CardFooter>
        <button className="flex items-center gap-1 text-sm font-semibold underline" style={{ color: "var(--black)" }}>
          Mehr anzeigen <ChevronRight className="size-3.5" />
        </button>
      </CardFooter>
    </Card>
  );
}

function AspectRatioDemo() {
  return (
    <div className="w-full max-w-xs">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg" style={{ backgroundColor: "var(--gray-200)" }}>
        <div className="flex h-full w-full items-center justify-center text-sm" style={{ color: "var(--gray-400)" }}>
          16 / 9
        </div>
      </AspectRatio>
    </div>
  );
}

function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-36 w-48 rounded-lg" style={{ border: "1px solid var(--gray-200)" }}>
      <div className="p-4 space-y-3">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="text-sm" style={{ color: "var(--gray-500)" }}>
            Eintrag {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  );
}

function ResizableDemo() {
  return (
    <ResizablePanelGroup className="w-full max-w-xs rounded-lg" style={{ border: "1px solid var(--gray-200)", height: "100px" }}>
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm" style={{ color: "var(--gray-400)" }}>
          Links
        </div>
      </ResizablePanel>
      <ResizableHandle style={{ backgroundColor: "var(--gray-200)" }} />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm" style={{ color: "var(--gray-400)" }}>
          Rechts
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

// ─── Registry ───────────────────────────────────────────────────────────────

const DEMOS: Record<string, () => React.ReactElement> = {
  typography: TypographyDemo,
  button: ButtonDemo,
  "button-group": ButtonGroupDemo,
  badge: BadgeDemo,
  colors: ColorsDemo,
  separator: SeparatorDemo,
  loading: LoadingDemo,
  skeleton: SkeletonDemo,
  spinner: SpinnerDemo,
  empty: EmptyDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  item: ItemDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  "native-select": NativeSelectDemo,
  combobox: ComboboxDemo,
  checkbox: CheckboxDemo,
  "radio-group": RadioGroupDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  "input-otp": InputOTPDemo,
  "input-group": InputGroupDemo,
  field: FieldDemo,
  tabs: TabsDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
  "navigation-menu": NavigationMenuDemo,
  menubar: MenubarDemo,
  "dropdown-menu": DropdownMenuDemo,
  "context-menu": ContextMenuDemo,
  sidebar: SidebarDemo,
  dialog: DialogDemo,
  "alert-dialog": AlertDialogDemo,
  drawer: DrawerDemo,
  sheet: SheetDemo,
  popover: PopoverDemo,
  "hover-card": HoverCardDemo,
  command: CommandDemo,
  tooltip: TooltipDemo,
  alert: AlertDemo,
  progress: ProgressDemo,
  sonner: SonnerDemo,
  table: TableDemo,
  carousel: CarouselDemo,
  calendar: CalendarDemo,
  chart: ChartDemo,
  avatar: AvatarDemo,
  accordion: AccordionDemo,
  collapsible: CollapsibleDemo,
  card: CardDemo,
  "aspect-ratio": AspectRatioDemo,
  "scroll-area": ScrollAreaDemo,
  resizable: ResizableDemo,
};

export function ComponentDemo({ slug }: { slug: string }) {
  const Demo = DEMOS[slug];
  if (!Demo) {
    return (
      <p className="text-sm" style={{ color: "var(--gray-400)" }}>
        Kein Demo verfügbar.
      </p>
    );
  }
  return <Demo />;
}
