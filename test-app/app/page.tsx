import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayoneField, DayoneInput } from "@/components/dayone-field";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="flex flex-col gap-3">
          <Badge className="w-fit" variant="secondary">
            Local registry smoke test
          </Badge>
          <div className="flex flex-col gap-2">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal">
              DAYONE UI installed through shadcn
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              This page imports components from the generated test app, not from
              the library source folder.
            </p>
          </div>
        </section>

        <Tabs defaultValue="form" className="flex flex-col gap-4">
          <TabsList>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Component install check</CardTitle>
                <CardDescription>
                  Button, Card, Field, Input, Select, Combobox, Checkbox,
                  Switch, Alert, Progress, and DAYONE field wrapper are
                  rendered together.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="workspace">Workspace</FieldLabel>
                    <Input id="workspace" defaultValue="DAYONE Internal App" />
                    <FieldDescription>
                      Standard shadcn field composition.
                    </FieldDescription>
                  </Field>

                  <DayoneField
                    id="contact"
                    label="Primary contact"
                    helper="Custom DAYONE field wrapper from the registry."
                  >
                    <DayoneInput
                      id="contact"
                      placeholder="name@dayone.de"
                      defaultValue="team@dayone.de"
                    />
                  </DayoneField>

                  <Field>
                    <FieldLabel>App type</FieldLabel>
                    <Select defaultValue="operations">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an app type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Internal apps</SelectLabel>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="reporting">Reporting</SelectItem>
                          <SelectItem value="planning">Planning</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Component set</FieldLabel>
                    <Combobox defaultValue="Forms">
                      <ComboboxInput placeholder="Search components..." />
                      <ComboboxContent>
                        <ComboboxList>
                          <ComboboxItem value="Forms">Forms</ComboboxItem>
                          <ComboboxItem value="Navigation">Navigation</ComboboxItem>
                          <ComboboxItem value="Feedback">Feedback</ComboboxItem>
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    <FieldDescription>
                      Exercises the installed shadcn combobox implementation.
                    </FieldDescription>
                  </Field>

                  <Field orientation="horizontal">
                    <Checkbox id="tokens" defaultChecked />
                    <div className="flex flex-col gap-1">
                      <FieldLabel htmlFor="tokens">DAYONE tokens</FieldLabel>
                      <FieldDescription>
                        Global CSS and Roobert font files were installed.
                      </FieldDescription>
                    </div>
                  </Field>

                  <Field orientation="horizontal">
                    <Switch id="private-registry" defaultChecked />
                    <div className="flex flex-col gap-1">
                      <FieldLabel htmlFor="private-registry">
                        Private registry compatible
                      </FieldLabel>
                      <FieldDescription>
                        The built item can be served from an authenticated
                        registry namespace.
                      </FieldDescription>
                    </div>
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-3">
                <Button variant="outline">Secondary</Button>
                <Button>Primary action</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Registry smoke test</CardTitle>
                <CardDescription>
                  A quick visual check for tokens, typography, and common UI
                  states.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Alert>
                  <AlertTitle>Registry install succeeded</AlertTitle>
                  <AlertDescription>
                    The app builds with the installed component sources and
                    copied font assets.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span>Progress component</span>
                    <span className="text-muted-foreground">Demo value</span>
                  </div>
                  <Progress value={85} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
