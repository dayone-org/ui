"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Search,
  Users,
  CalendarDays,
  Video,
  ExternalLink,
  Lightbulb,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tag = "KI & Tools" | "Design Praxis" | "Austausch" | "Workshop";

type Session = {
  id: string;
  date: string;
  isoDate: string;
  topic: string;
  topicShort: string;
  presenters: string[];
  participants: number | null;
  tags: Tag[];
  recording?: string;
};

type BacklogItem = {
  id: string;
  topic: string;
  detail: string;
  person: string;
  duration: string;
  completed: boolean;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SESSIONS: Session[] = [
  {
    id: "10",
    date: "11.06.2026",
    isoDate: "2026-06-11",
    topic:
      "KI Challenges (neue Rubrik) · Bean: Mini tools mit AI zur visuellen Gestaltung · Jasmin stellt Figma AI Agent vor und die Zusammenarbeit zwischen Figma Make & Claude",
    topicShort: "KI Challenges & Mini Tools mit AI",
    presenters: ["Bean", "Jasmin"],
    participants: null,
    tags: ["KI & Tools"],
  },
  {
    id: "9",
    date: "20.05.2026",
    isoDate: "2026-05-20",
    topic: "Lia zeigt uns wie man mit Claude promptet",
    topicShort: "Prompten mit Claude",
    presenters: ["Lia"],
    participants: 13,
    tags: ["KI & Tools"],
  },
  {
    id: "8",
    date: "29.04.2026",
    isoDate: "2026-04-29",
    topic: "Austausch nach der Quartalszahlenpräsentation",
    topicShort: "Austausch Quartalszahlen",
    presenters: ["Vicy"],
    participants: 10,
    tags: ["Austausch"],
  },
  {
    id: "7",
    date: "01.04.2026",
    isoDate: "2026-04-01",
    topic: "Design in Zeiten von AI – Teil 2",
    topicShort: "Design & AI – Teil 2",
    presenters: ["Felix"],
    participants: 10,
    tags: ["KI & Tools", "Workshop"],
  },
  {
    id: "6",
    date: "18.03.2026",
    isoDate: "2026-03-18",
    topic: "Design in Zeiten von AI: Workshop-Format (min. 45–60 Minuten)",
    topicShort: "Design & AI – Workshop",
    presenters: ["Felix"],
    participants: 14,
    tags: ["KI & Tools", "Workshop"],
  },
  {
    id: "5",
    date: "25.02.2026",
    isoDate: "2026-02-25",
    topic: "KI-Nutzung für UX bei der Berlinale",
    topicShort: "KI für UX bei der Berlinale",
    presenters: ["Jasmin"],
    participants: 7,
    tags: ["KI & Tools"],
  },
  {
    id: "4",
    date: "11.02.2026",
    isoDate: "2026-02-11",
    topic:
      "Experimentelles Arbeiten im Growth Design · Hypothesen entlang der Customer Experience entwickeln, testen und bewerten",
    topicShort: "Experimentelles Arbeiten im Growth Design",
    presenters: ["Anina", "Helena", "Kaja"],
    participants: 5,
    tags: ["Design Praxis", "Workshop"],
  },
  {
    id: "3",
    date: "21.01.2026",
    isoDate: "2026-01-21",
    topic:
      "Wie wir unter Druck kreativ bleiben, wo holen wir uns Inspiration und wie bringen wir unsere Designs von solide zu exzellent",
    topicShort: "Kreativität unter Druck",
    presenters: ["Vicy"],
    participants: 7,
    tags: ["Design Praxis"],
  },
  {
    id: "2",
    date: "03.12.2025",
    isoDate: "2025-12-03",
    topic:
      "Working Session User Story Writer (45–60 Min) · Custom GPTs bei KIND (30 Min)",
    topicShort: "User Story Writer & Custom GPTs",
    presenters: ["Theodamius", "Clemens"],
    participants: null,
    tags: ["KI & Tools"],
  },
  {
    id: "1",
    date: "19.11.2025",
    isoDate: "2025-11-19",
    topic:
      "Entwicklung einer Schichtplanungs-WebApp per Vibecoding mit ChatGPT, Figma Make, Supabase und VSCode",
    topicShort: "Vibecoding: Schichtplanungs-WebApp",
    presenters: ["Kaja", "Chris M."],
    participants: null,
    tags: ["KI & Tools"],
    recording:
      "https://teams.microsoft.com/l/meetingrecap?driveId=b%218y4Eq9uaj0K5CbJHgaT2mNLfUlYZ2vdMsSahuI2WnFVH-ailMRTDSIOQbHGmhKG2",
  },
];

const BACKLOG_OPEN: BacklogItem[] = [
  {
    id: "b1",
    topic: "Designsysteme",
    detail: "Gibt es Designsysteme auf die du immer zurückgreifst?",
    person: "",
    duration: "",
    completed: false,
  },
  {
    id: "b2",
    topic: "Alltägliche Ressourcen",
    detail:
      "Welche Ressourcen außerhalb DAYONEs nutzt du tagtäglich um effektiver zu arbeiten?",
    person: "",
    duration: "",
    completed: false,
  },
  {
    id: "b3",
    topic: "Trends",
    detail:
      "Welchen Design-Trend hast du zuletzt entdeckt, mitgemacht oder findest du völlig überflüssig?",
    person: "",
    duration: "",
    completed: false,
  },
  {
    id: "b4",
    topic: "Artikel / Buch",
    detail: "Was hast du als letztes gelesen?",
    person: "",
    duration: "",
    completed: false,
  },
  {
    id: "b5",
    topic: "Kreativität im privaten Alltag",
    detail:
      "Welche alltäglichen Dinge praktizierst du oder interessieren dich aktuell im Designkontext?",
    person: "",
    duration: "",
    completed: false,
  },
  {
    id: "b6",
    topic: "Variablen in Figma Prototypen",
    detail: "",
    person: "Theo",
    duration: "45–60 Min.",
    completed: false,
  },
  {
    id: "b7",
    topic: "Jobs-To-Be-Done mit KI",
    detail: "",
    person: "Theo",
    duration: "20 Min.",
    completed: false,
  },
  {
    id: "b8",
    topic: "Articulated Book Club Themen",
    detail: "",
    person: "",
    duration: "",
    completed: false,
  },
  {
    id: "b9",
    topic: "Delta: Design Prozess (Vergleich mit Juni Workshop)",
    detail: "",
    person: "",
    duration: "",
    completed: false,
  },
];

const BACKLOG_DONE: BacklogItem[] = [
  {
    id: "d1",
    topic: "Most used Shortcuts",
    detail:
      "Welche Shortcuts benutzt du am häufigsten? Welche waren für dich als Designer:in ein Lifechanger?",
    person: "",
    duration: "",
    completed: true,
  },
  {
    id: "d2",
    topic: "Plugins bei Figma",
    detail: "Welche Plugins nutzt du tagtäglich? Welche waren ein Lifechanger?",
    person: "",
    duration: "",
    completed: true,
  },
  {
    id: "d3",
    topic: "Lieblingswebseiten",
    detail: "",
    person: "",
    duration: "",
    completed: true,
  },
  {
    id: "d4",
    topic: "New Figma AI Tools",
    detail: "Diskussion und Praxis-Beispiele für die neuen Figma AI Tools",
    person: "",
    duration: "45 Min.",
    completed: true,
  },
  {
    id: "d5",
    topic: "Design vertreten vs. Feedback annehmen",
    detail:
      "Wie geht man mit Feedback um und wie vertritt man Design oder Best-Practices in schwierigen Situationen?",
    person: "",
    duration: "45 Min.",
    completed: true,
  },
];

const AI_TIPS = [
  {
    category: "Arbeiten mit Prompts",
    items: [
      "Prompts klar strukturieren mit Markern wie <Context>, <Task> und <Rules>",
      "Stichpunkte statt Fließtext: erst grob eingeben, dann Schritt für Schritt verfeinern",
      "Prompts von der KI verbessern lassen oder neue Formulierungen generieren",
      "Gleichen Prompt in mehreren LLMs testen für verschiedene Perspektiven",
      "Prompt Library pflegen — eine Sammlung funktionierender Prompts spart Zeit",
      'Natürlich schreiben lassen: kurze Sätze, kein Fachjargon, „wie beim Kaffee erklären"',
    ],
  },
  {
    category: "Recherche & Inspiration",
    items: [
      "Schnelle Industrie- und Produktrecherche: Fakten, Trends und Marktübersichten aufbereiten lassen",
      "User Personas & Jobs-to-be-Done: erste Skizzen entwickeln lassen, um Diskussionen anzustoßen",
      "UI-Muster und Best Practices suchen: Inspiration aus bestehenden Produkten einfordern",
      "Perspektivwechsel nutzen: Ideen bewusst aus anderen Nutzungskontexten beleuchten",
      "Fragen ins Briefing einbauen: KI soll Lücken im Verständnis identifizieren",
    ],
  },
  {
    category: "Design & Prototyping",
    items: [
      "Rapid Prototyping: erste Entwürfe schnell generieren lassen, um Konzepte früh zu testen",
      "Adobe Firefly: Mockups mit realistischem Hintergrund im passenden Kontext",
      "Figma AI: Hintergrund entfernen oder Bilder in höherer Auflösung",
      "LOVART: für schnelle Brainstormings zu Designkonzepten",
      "Edge-Cases simulieren: KI nach Extremsituationen fragen",
    ],
  },
  {
    category: "Produktivität & Dokumentation",
    items: [
      "Format- und Tabellenarbeit abgeben: Strukturierungen von KI erledigen lassen",
      "Meeting-Protokolle: Rohnotizen in klare Protokolle verwandeln (DSGVO beachten)",
      "Granola: Tool, das Meeting Notes automatisch in saubere Dokumente verwandelt",
      "Notion smarter nutzen: GPT für Notion-Formeln einsetzen",
      "Custom GPTs: eigene GPTs für spezielle Aufgaben erstellen",
    ],
  },
];

const OKRS = [
  {
    objective: "Kollektive Designpraxis stärken durch regelmäßigen, wirkungsorientierten Austausch",
    krs: [
      { label: "Teilnahme > 80 % aller Designer:innen", value: 80 },
      { label: "> 66 % leisten aktiven Beitrag in mind. einer Session", value: 66 },
      { label: "> 80 % empfinden Austausch als mehrwertstiftend", value: 80 },
    ],
  },
  {
    objective: "Rolle im Synthetic Studio schärfen – Kompetenzaufbau in Technologie & Haltung",
    krs: [
      { label: "Mindestens 50 % der DK-Veranstaltungen mit Synthetic Studio Input", value: 50 },
      { label: "In mind. 3 Teams werden erlernte Elemente bewusst angewendet", value: 33 },
      { label: "≥ 80 % fühlen sich besser aufgestellt gegenüber Synthetic Studio", value: 80 },
    ],
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

const PRESENTER_COLORS: Record<string, string> = {
  Bean: "#D4E4F7",
  Lia: "#F7E4D4",
  Vicy: "#D4F7E4",
  Felix: "#E4D4F7",
  Jasmin: "#F7D4E4",
  Anina: "#F7F4D4",
  Helena: "#D4F7F4",
  Kaja: "#F4D4F7",
  "Chris M.": "#D4D4F7",
  Theodamius: "#F7D4D4",
  Clemens: "#D4F7D4",
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function TagBadge({ tag }: { tag: Tag }) {
  const styles: Record<Tag, string> = {
    "KI & Tools":
      "bg-[#E8F2FC] text-[#1074C4] border-[#C4DDF5]",
    "Design Praxis":
      "bg-[#F5F0E8] text-[#8B6914] border-[#E8D9B8]",
    Austausch:
      "bg-[#F0F0F0] text-[#5A5A5A] border-[#DCDCDC]",
    Workshop:
      "bg-[#1A1A1A] text-white border-transparent",
  };
  return (
    <Badge
      className={`text-[10px] font-medium border ${styles[tag]}`}
      style={{ backgroundColor: undefined }}
    >
      {tag}
    </Badge>
  );
}

function PresenterAvatar({ name }: { name: string }) {
  return (
    <Avatar>
      <AvatarFallback
        className="font-semibold"
        style={{
          backgroundColor: PRESENTER_COLORS[name] ?? "#F0F0F0",
          color: "#1A1A1A",
        }}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-5 py-4"
      style={{ border: "1px solid var(--gray-100)" }}
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: "var(--gray-50, #F7F7F7)", color: "var(--gray-400)" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs" style={{ color: "var(--gray-400)" }}>
          {label}
        </p>
        <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Sessions Tab ─────────────────────────────────────────────────────────────

const SESSIONS_PER_PAGE = 6;

function SessionsTab({ onSuggest }: { onSuggest: () => void }) {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("alle");
  const [page, setPage] = useState(1);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const filtered = useMemo(() => {
    return SESSIONS.filter((s) => {
      const matchSearch =
        search === "" ||
        s.topic.toLowerCase().includes(search.toLowerCase()) ||
        s.presenters.some((p) =>
          p.toLowerCase().includes(search.toLowerCase())
        );
      const matchTag =
        tagFilter === "alle" || s.tags.includes(tagFilter as Tag);
      return matchSearch && matchTag;
    });
  }, [search, tagFilter]);

  const totalPages = Math.ceil(filtered.length / SESSIONS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * SESSIONS_PER_PAGE,
    page * SESSIONS_PER_PAGE
  );

  return (
    <>
      {/* Filters */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5"
            style={{ color: "var(--gray-400)" }}
          />
          <Input
            placeholder="Thema oder Person suchen…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-8 text-sm"
          />
        </div>
        <Select
          value={tagFilter}
          onValueChange={(v) => {
            setTagFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40 text-sm">
            <SelectValue placeholder="Alle Tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle Tags</SelectItem>
            <SelectItem value="KI & Tools">KI & Tools</SelectItem>
            <SelectItem value="Design Praxis">Design Praxis</SelectItem>
            <SelectItem value="Austausch">Austausch</SelectItem>
            <SelectItem value="Workshop">Workshop</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" className="ml-auto" onClick={onSuggest}>
          Thema vorschlagen
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: "var(--gray-100)" }}>
              <TableHead className="pl-5 text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                Datum
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                Thema
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                Presenter
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-center" style={{ color: "var(--gray-400)" }}>
                Teiln.
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                Tags
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center text-sm" style={{ color: "var(--gray-400)" }}>
                  Keine Sessions gefunden
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((session) => (
                <TableRow
                  key={session.id}
                  className="cursor-pointer"
                  style={{ borderColor: "var(--gray-100)" }}
                  onClick={() => setSelectedSession(session)}
                >
                  <TableCell className="pl-5 py-4 text-sm tabular-nums" style={{ color: "var(--gray-400)" }}>
                    {session.date}
                  </TableCell>
                  <TableCell className="py-4 max-w-xs">
                    <span className="text-sm font-medium line-clamp-1" style={{ color: "var(--black)" }}>
                      {session.topicShort}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <AvatarGroup>
                        {session.presenters.slice(0, 3).map((p) => (
                          <HoverCard key={p} openDelay={200}>
                            <HoverCardTrigger asChild>
                              <div onClick={(e) => e.stopPropagation()}>
                                <PresenterAvatar name={p} />
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-48 p-3" side="top">
                              <div className="flex items-center gap-2.5">
                                <PresenterAvatar name={p} />
                                <div>
                                  <p className="text-sm font-semibold" style={{ color: "var(--black)" }}>
                                    {p}
                                  </p>
                                  <p className="text-xs" style={{ color: "var(--gray-400)" }}>
                                    {SESSIONS.filter((s) =>
                                      s.presenters.includes(p)
                                    ).length}{" "}
                                    Session{SESSIONS.filter((s) => s.presenters.includes(p)).length !== 1 ? "s" : ""} präsentiert
                                  </p>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        ))}
                      </AvatarGroup>
                      <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                        {session.presenters.length > 1
                          ? session.presenters[0] + ` +${session.presenters.length - 1}`
                          : session.presenters[0]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    {session.participants != null ? (
                      <span className="text-sm tabular-nums" style={{ color: "var(--black)" }}>
                        {session.participants}
                      </span>
                    ) : (
                      <span className="text-sm" style={{ color: "var(--gray-200)" }}>–</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {session.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 pr-4" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="size-7">
                          <MoreHorizontal className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedSession(session)}>
                          Details ansehen
                        </DropdownMenuItem>
                        {session.recording && (
                          <DropdownMenuItem asChild>
                            <a href={session.recording} target="_blank" rel="noreferrer">
                              <Video className="size-3.5" />
                              Aufzeichnung öffnen
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard?.writeText(session.topic);
                            toast("Thema kopiert");
                          }}
                        >
                          Thema kopieren
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }}
                  aria-disabled={page === 1}
                  text="Zurück"
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={(e) => { e.preventDefault(); setPage(p); }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)); }}
                  aria-disabled={page === totalPages}
                  text="Weiter"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Session Detail Drawer */}
      <Drawer open={selectedSession !== null} onOpenChange={(o) => !o && setSelectedSession(null)}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg overflow-y-auto">
            <DrawerHeader className="px-6 pt-8 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium tabular-nums" style={{ color: "var(--gray-400)" }}>
                  {selectedSession?.date}
                </span>
                {selectedSession?.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
              <DrawerTitle className="text-xl font-semibold leading-snug" style={{ color: "var(--black)" }}>
                {selectedSession?.topic}
              </DrawerTitle>
            </DrawerHeader>

            <div className="px-6 pb-2 space-y-5">
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-xs mb-1.5" style={{ color: "var(--gray-400)" }}>Presenter</p>
                  <div className="flex items-center gap-2">
                    <AvatarGroup>
                      {selectedSession?.presenters.map((p) => (
                        <PresenterAvatar key={p} name={p} />
                      ))}
                    </AvatarGroup>
                    <span className="text-sm" style={{ color: "var(--black)" }}>
                      {selectedSession?.presenters.join(", ")}
                    </span>
                  </div>
                </div>
                {selectedSession?.participants != null && (
                  <div>
                    <p className="text-xs mb-1.5" style={{ color: "var(--gray-400)" }}>Teilnehmende</p>
                    <div className="flex items-center gap-1.5">
                      <Users className="size-3.5" style={{ color: "var(--gray-400)" }} />
                      <span className="text-sm font-semibold" style={{ color: "var(--black)" }}>
                        {selectedSession.participants}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {selectedSession?.recording && (
                <a
                  href={selectedSession.recording}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ backgroundColor: "var(--gray-50, #F7F7F7)", color: "var(--black)", border: "1px solid var(--gray-100)" }}
                >
                  <Video className="size-4" />
                  Aufzeichnung ansehen
                  <ExternalLink className="size-3 ml-auto" style={{ color: "var(--gray-400)" }} />
                </a>
              )}
            </div>

            <DrawerFooter className="px-6 py-6">
              <DrawerClose asChild>
                <Button variant="outline">Schließen</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// ─── Backlog Tab ───────────────────────────────────────────────────────────────

function BacklogTab({ onSuggest }: { onSuggest: () => void }) {
  const [items, setItems] = useState(BACKLOG_OPEN);

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    toast("Status aktualisiert");
  }

  return (
    <div className="space-y-10">
      {/* Open topics */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "var(--black)" }}>
              Offene Themen
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--gray-400)" }}>
              Jedes Thema sollte in max. 10 Min. mit der Gruppe besprochen werden können
            </p>
          </div>
          <Button size="sm" onClick={onSuggest}>+ Thema vorschlagen</Button>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--gray-100)" }}>
                <TableHead className="pl-5 w-8" />
                <TableHead className="text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                  Thema
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                  Details
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                  Person
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider" style={{ color: "var(--gray-400)" }}>
                  Zeit
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  style={{ borderColor: "var(--gray-100)" }}
                  className={item.completed ? "opacity-50" : ""}
                >
                  <TableCell className="pl-5 py-4">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggle(item.id)}
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`text-sm font-medium ${item.completed ? "line-through" : ""}`}
                      style={{ color: "var(--black)" }}
                    >
                      {item.topic}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 max-w-xs">
                    <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                      {item.detail || "–"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    {item.person ? (
                      <div className="flex items-center gap-1.5">
                        <PresenterAvatar name={item.person} />
                        <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                          {item.person}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: "var(--gray-200)" }}>–</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                      {item.duration || "–"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Completed topics */}
      <div>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--black)" }}>
          Abgeschlossene Themen
        </h3>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
          <Table>
            <TableBody>
              {BACKLOG_DONE.map((item) => (
                <TableRow
                  key={item.id}
                  className="opacity-50"
                  style={{ borderColor: "var(--gray-100)" }}
                >
                  <TableCell className="pl-5 py-3 w-8">
                    <Checkbox checked disabled />
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm line-through" style={{ color: "var(--black)" }}>
                      {item.topic}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 max-w-xs">
                    <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                      {item.detail || "–"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                      {item.duration || "–"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// ─── Ressourcen Tab ────────────────────────────────────────────────────────────

function RessourcenTab() {
  return (
    <div className="space-y-10 max-w-3xl">
      {/* OKRs */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="size-4" style={{ color: "var(--gray-400)" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--black)" }}>
            OKRs 2026
          </h3>
        </div>
        <div className="space-y-8">
          {OKRS.map((okr, i) => (
            <div key={i}>
              <p className="text-sm mb-4" style={{ color: "var(--black)" }}>
                <span className="font-semibold" style={{ color: "var(--gray-400)" }}>
                  Objective {i + 1}:{" "}
                </span>
                {okr.objective}
              </p>
              <div className="space-y-3">
                {okr.krs.map((kr, j) => (
                  <div key={j}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs" style={{ color: "var(--gray-400)" }}>
                        {kr.label}
                      </span>
                      <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--black)" }}>
                        {kr.value}%
                      </span>
                    </div>
                    <Progress value={kr.value} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tips */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Lightbulb className="size-4" style={{ color: "var(--gray-400)" }} />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "var(--black)" }}>
              AI Tipps & Tricks
            </h3>
            <p className="text-xs" style={{ color: "var(--gray-400)" }}>
              Gesammelt aus der PDC vom 20. August 2025
            </p>
          </div>
        </div>
        <Accordion type="multiple" className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--gray-100)" }}>
          {AI_TIPS.map((section, i) => (
            <AccordionItem key={i} value={`ai-${i}`} className="px-5" style={{ borderColor: "var(--gray-100)" }}>
              <AccordionTrigger className="text-sm font-medium py-4 hover:no-underline" style={{ color: "var(--black)" }}>
                {section.category}
                <Badge className="ml-auto mr-3 text-[10px]" variant="outline">
                  {section.items.length}
                </Badge>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="space-y-2">
                  {section.items.map((tip, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--gray-500, #4A4A4A)" }}>
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current opacity-40" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Surveys */}
      <div>
        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--black)" }}>
          Umfragen
        </h3>
        <div className="space-y-2">
          {[
            { label: "PDC Umfrage Mai 2026", sub: "Design Impact & Synthetic Studio", href: "https://app.notion.com/p/34259674eb5880daadcdd79e2e5cd013" },
            { label: "PDC Umfrage Nov 2025", sub: "Halbjahresrückblick", href: "https://app.notion.com/p/2a059674eb5880f7b9e3fdca4716cb54" },
          ].map((survey) => (
            <a
              key={survey.label}
              href={survey.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl px-5 py-4 transition-colors hover:opacity-80"
              style={{ border: "1px solid var(--gray-100)", color: "var(--black)" }}
            >
              <div>
                <p className="text-sm font-medium">{survey.label}</p>
                <p className="text-xs" style={{ color: "var(--gray-400)" }}>{survey.sub}</p>
              </div>
              <ExternalLink className="size-3.5 shrink-0" style={{ color: "var(--gray-400)" }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Suggest Drawer ────────────────────────────────────────────────────────────

function SuggestDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");

  function submit() {
    if (!title.trim()) return;
    toast("Thema eingereicht!", {
      description: `„${title}" wurde dem Backlog hinzugefügt.`,
    });
    setTitle("");
    setDetail("");
    setDuration("");
    setName("");
    onOpenChange(false);
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent>
        <div className="flex h-full flex-col">
          <DrawerHeader className="px-6 pt-8 pb-4">
            <DrawerTitle className="text-xl font-semibold" style={{ color: "var(--black)" }}>
              Thema vorschlagen
            </DrawerTitle>
            <DrawerDescription className="text-sm mt-1" style={{ color: "var(--gray-400)" }}>
              Dein Thema wird im Backlog gespeichert und beim nächsten PDC-Termin berücksichtigt.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "var(--gray-400)" }}>
                Thema / Titel *
              </label>
              <Input
                placeholder="z.B. Designsysteme im Vergleich"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "var(--gray-400)" }}>
                Vortragsart / Details
              </label>
              <Textarea
                placeholder="Beschreibe kurz, was du zeigen oder besprechen möchtest…"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "var(--gray-400)" }}>
                Zeitbedarf
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Wie lange benötigst du?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Min.</SelectItem>
                  <SelectItem value="20">20 Min.</SelectItem>
                  <SelectItem value="30">30 Min.</SelectItem>
                  <SelectItem value="45">45–60 Min.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "var(--gray-400)" }}>
                Dein Name
              </label>
              <Input
                placeholder="Wer präsentiert?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <DrawerFooter className="px-6 py-6 gap-3">
            <Button onClick={submit} disabled={!title.trim()}>
              Einreichen <ArrowRight className="size-4" />
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Abbrechen</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SESSIONS_WITH_PARTICIPANTS = SESSIONS.filter((s) => s.participants != null);
const AVG_PARTICIPANTS = Math.round(
  SESSIONS_WITH_PARTICIPANTS.reduce((acc, s) => acc + (s.participants ?? 0), 0) /
    SESSIONS_WITH_PARTICIPANTS.length
);

export default function PDCHubPage() {
  const [suggestOpen, setSuggestOpen] = useState(false);

  return (
    <main className="min-h-screen pb-24" style={{ backgroundColor: "var(--white)" }}>
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        {/* Page header */}
        <div className="pt-14 pb-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1
                  className="text-3xl font-bold tracking-tight"
                  style={{ color: "var(--black)" }}
                >
                  PDC Hub
                </h1>
                <Badge variant="outline" className="text-xs">
                  intern
                </Badge>
              </div>
              <p className="text-sm" style={{ color: "var(--gray-400)" }}>
                Product Design Community · alle 3 Wochen · DAYONE
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <StatCard
              icon={<CalendarDays className="size-4" />}
              label="Sessions gesamt"
              value={`${SESSIONS.length}`}
            />
            <StatCard
              icon={<Users className="size-4" />}
              label="Ø Teilnehmende"
              value={`${AVG_PARTICIPANTS} Personen`}
            />
            <StatCard
              icon={<Lightbulb className="size-4" />}
              label="Backlog Themen"
              value={`${BACKLOG_OPEN.length} offen`}
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="sessions" className="flex-col">
          <TabsList variant="text" className="mb-8">
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="backlog">Themen-Backlog</TabsTrigger>
            <TabsTrigger value="ressourcen">Ressourcen</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <SessionsTab onSuggest={() => setSuggestOpen(true)} />
          </TabsContent>
          <TabsContent value="backlog">
            <BacklogTab onSuggest={() => setSuggestOpen(true)} />
          </TabsContent>
          <TabsContent value="ressourcen">
            <RessourcenTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Suggest Drawer */}
      <SuggestDrawer open={suggestOpen} onOpenChange={setSuggestOpen} />
    </main>
  );
}
