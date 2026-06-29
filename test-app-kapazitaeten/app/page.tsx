"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Download,
  Search,
  Users,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Team = "Alle" | "Strategy" | "Design" | "Engineering" | "Operations";

type Person = {
  name: string;
  role: string;
  team: Exclude<Team, "Alle">;
  capacity: number;
  booked: number;
  focus: string;
  project: string;
};

const people: Person[] = [
  {
    name: "Victoria",
    role: "Design Lead",
    team: "Design",
    capacity: 4.5,
    booked: 4.2,
    focus: "PDC Hub",
    project: "Produktdesign",
  },
  {
    name: "Bean",
    role: "Engineering",
    team: "Engineering",
    capacity: 5,
    booked: 5.4,
    focus: "Component Library",
    project: "Internal Apps",
  },
  {
    name: "Laura",
    role: "Strategy",
    team: "Strategy",
    capacity: 4,
    booked: 3.1,
    focus: "Roadmap Sprint",
    project: "DAYONE Ops",
  },
  {
    name: "Anton",
    role: "Product Engineer",
    team: "Engineering",
    capacity: 4,
    booked: 2.7,
    focus: "Atlas Sync",
    project: "Automation",
  },
  {
    name: "Mira",
    role: "Project Ops",
    team: "Operations",
    capacity: 3.5,
    booked: 3.8,
    focus: "Staffing",
    project: "Delivery",
  },
  {
    name: "Kim",
    role: "UX Designer",
    team: "Design",
    capacity: 3,
    booked: 2.1,
    focus: "Research Pack",
    project: "Customer Context",
  },
];

const weeks = ["KW 28", "KW 29", "KW 30", "KW 31"];
const teams: Team[] = ["Alle", "Strategy", "Design", "Engineering", "Operations"];

function utilization(booked: number, capacity: number, buffer: number) {
  return Math.round((booked / Math.max(capacity - buffer, 0.5)) * 100);
}

function statusFor(value: number) {
  if (value >= 105) {
    return "Überplant";
  }

  if (value >= 90) {
    return "Eng";
  }

  return "Planbar";
}

function statusVariant(value: number): "default" | "secondary" | "destructive" {
  if (value >= 105) {
    return "destructive";
  }

  if (value >= 90) {
    return "default";
  }

  return "secondary";
}

export default function Home() {
  const [team, setTeam] = useState<Team>("Alle");
  const [week, setWeek] = useState("KW 29");
  const [query, setQuery] = useState("");
  const [onlyRisks, setOnlyRisks] = useState(false);
  const [buffer, setBuffer] = useState([0.5]);

  const filteredPeople = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return people.filter((person) => {
      const personUtilization = utilization(
        person.booked,
        person.capacity,
        buffer[0]
      );
      const matchesTeam = team === "Alle" || person.team === team;
      const matchesQuery =
        !normalizedQuery ||
        [person.name, person.role, person.focus, person.project]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesRisk = !onlyRisks || personUtilization >= 90;

      return matchesTeam && matchesQuery && matchesRisk;
    });
  }, [buffer, onlyRisks, query, team]);

  const totals = useMemo(() => {
    const capacity = filteredPeople.reduce((sum, person) => sum + person.capacity, 0);
    const booked = filteredPeople.reduce((sum, person) => sum + person.booked, 0);
    const adjustedCapacity = Math.max(capacity - filteredPeople.length * buffer[0], 0.5);
    const utilizationValue = Math.round((booked / adjustedCapacity) * 100);
    const open = Math.max(adjustedCapacity - booked, 0);
    const risks = filteredPeople.filter(
      (person) => utilization(person.booked, person.capacity, buffer[0]) >= 90
    ).length;

    return { capacity, booked, open, risks, utilization: utilizationValue };
  }, [buffer, filteredPeople]);

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays aria-hidden="true" className="size-4" />
              <span>{week} · Interne Planung</span>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
                Interne Kapazitäten Planung für DAYONE
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                Team-Auslastung, Engpässe und offene Kapazität für interne Apps,
                Delivery und Produktinitiativen.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline">
              <Download data-icon="inline-start" />
              Export
            </Button>
            <Button>
              <ArrowUpRight data-icon="inline-start" />
              Planung freigeben
            </Button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Verplante Tage</CardDescription>
              <CardTitle>{totals.booked.toFixed(1)} PT</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={Math.min(totals.utilization, 100)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Verfügbare Kapazität</CardDescription>
              <CardTitle>{totals.open.toFixed(1)} PT</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Nach Fokus- und Review-Puffer
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Auslastung</CardDescription>
              <CardTitle>{totals.utilization}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={statusVariant(totals.utilization)}>
                {statusFor(totals.utilization)}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Risiken</CardDescription>
              <CardTitle>{totals.risks}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
              <CircleAlert aria-hidden="true" className="size-4" />
              <span>Personen über 90%</span>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Tabs defaultValue="planung" className="min-w-0 flex-col gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <TabsList>
                <TabsTrigger value="planung">Planung</TabsTrigger>
                <TabsTrigger value="engpaesse">Engpässe</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="relative">
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    className="w-full pl-9 md:w-72"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Person, Projekt oder Fokus"
                  />
                </div>
                <Select value={team} onValueChange={(value) => setTeam(value as Team)}>
                  <SelectTrigger className="w-full md:w-44">
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {teams.map((teamOption) => (
                        <SelectItem key={teamOption} value={teamOption}>
                          {teamOption}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="planung">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <CardTitle>Kapazitätsplan</CardTitle>
                      <CardDescription>
                        Planbare Personentage je Person, Fokus und Initiative.
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{filteredPeople.length} Einträge</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Person</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Fokus</TableHead>
                        <TableHead className="text-right">Gebucht</TableHead>
                        <TableHead className="text-right">Kapazität</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPeople.map((person) => {
                        const personUtilization = utilization(
                          person.booked,
                          person.capacity,
                          buffer[0]
                        );

                        return (
                          <TableRow key={person.name}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{person.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {person.role}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{person.team}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{person.focus}</span>
                                <span className="text-xs text-muted-foreground">
                                  {person.project}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              {person.booked.toFixed(1)} PT
                            </TableCell>
                            <TableCell className="text-right">
                              {person.capacity.toFixed(1)} PT
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge variant={statusVariant(personUtilization)}>
                                  {statusFor(personUtilization)}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {personUtilization}%
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engpaesse">
              <div className="grid gap-3 md:grid-cols-2">
                {filteredPeople
                  .filter(
                    (person) =>
                      utilization(person.booked, person.capacity, buffer[0]) >= 90
                  )
                  .map((person) => {
                    const personUtilization = utilization(
                      person.booked,
                      person.capacity,
                      buffer[0]
                    );

                    return (
                      <Alert key={person.name}>
                        <CircleAlert aria-hidden="true" />
                        <AlertTitle>
                          {person.name}: {statusFor(personUtilization)}
                        </AlertTitle>
                        <AlertDescription>
                          {person.focus} liegt bei {personUtilization}% Auslastung.
                        </AlertDescription>
                      </Alert>
                    );
                  })}
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="grid gap-3 md:grid-cols-2">
                {teams
                  .filter((teamOption) => teamOption !== "Alle")
                  .map((teamOption) => {
                    const members = people.filter((person) => person.team === teamOption);
                    const booked = members.reduce((sum, person) => sum + person.booked, 0);
                    const capacity = members.reduce(
                      (sum, person) => sum + person.capacity,
                      0
                    );
                    const value = Math.round((booked / capacity) * 100);

                    return (
                      <Card key={teamOption}>
                        <CardHeader>
                          <CardDescription>{members.length} Personen</CardDescription>
                          <CardTitle>{teamOption}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                          <Progress value={Math.min(value, 100)} />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Auslastung</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </TabsContent>
          </Tabs>

          <aside className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Planungsfilter</CardTitle>
                <CardDescription>Woche, Puffer und Risikosicht.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Planungswoche</FieldLabel>
                    <Select value={week} onValueChange={setWeek}>
                      <SelectTrigger>
                        <SelectValue placeholder="Woche" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {weeks.map((weekOption) => (
                            <SelectItem key={weekOption} value={weekOption}>
                              {weekOption}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Fokus-Puffer</FieldLabel>
                    <Slider
                      value={buffer}
                      min={0}
                      max={1.5}
                      step={0.25}
                      onValueChange={setBuffer}
                    />
                    <FieldDescription>
                      {buffer[0].toFixed(2)} PT pro Person reserviert
                    </FieldDescription>
                  </Field>

                  <Field orientation="horizontal">
                    <Checkbox
                      id="only-risks"
                      checked={onlyRisks}
                      onCheckedChange={(checked) => setOnlyRisks(checked === true)}
                    />
                    <div className="flex flex-col gap-1">
                      <FieldLabel htmlFor="only-risks">Nur Engpässe</FieldLabel>
                      <FieldDescription>
                        Filtert Personen ab 90% Auslastung.
                      </FieldDescription>
                    </div>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Freigabe</CardTitle>
                <CardDescription>Stand für {week}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 aria-hidden="true" className="size-5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Ressourcen geprüft</span>
                    <span className="text-xs text-muted-foreground">
                      {filteredPeople.length} Einträge im aktuellen Filter
                    </span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Users aria-hidden="true" className="size-5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Teamabgleich offen</span>
                    <span className="text-xs text-muted-foreground">
                      Design und Engineering synchronisieren
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
