"use client";

import type { ReactNode } from "react";
import { DocsDivider } from "@/components/docs-divider";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlaygroundVariantHeading } from "@/components/playground-variant-heading";
import { PLAYGROUND_SHOWCASE } from "@/lib/playground-layout";

function StateRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-6">
      <span
        className="w-24 shrink-0 pt-6 text-sm"
        style={{ color: "var(--gray-400)" }}
      >
        {label}
      </span>
      <div className="w-64">{children}</div>
    </div>
  );
}

export function DayoneInputsShowcase() {
  return (
    <div className={PLAYGROUND_SHOWCASE}>
      <div>
        <PlaygroundVariantHeading>States</PlaygroundVariantHeading>
        <div className="flex flex-col gap-4">
          <StateRow label="Default">
            <Field>
              <FieldLabel htmlFor="input-default">Vorname</FieldLabel>
              <Input id="input-default" placeholder="Dein Vorname" />
            </Field>
          </StateRow>

          <StateRow label="Filled">
            <Field>
              <FieldLabel htmlFor="input-filled">Vorname</FieldLabel>
              <Input
                id="input-filled"
                defaultValue="Victoria"
                placeholder="Dein Vorname"
              />
            </Field>
          </StateRow>

          <StateRow label="Disabled">
            <Field data-disabled>
              <FieldLabel htmlFor="input-disabled">Vorname</FieldLabel>
              <Input
                id="input-disabled"
                disabled
                placeholder="Dein Vorname"
              />
            </Field>
          </StateRow>

          <StateRow label="Helper Text">
            <Field>
              <FieldLabel htmlFor="input-helper">Vorname</FieldLabel>
              <Input id="input-helper" placeholder="Dein Vorname" />
              <FieldDescription>Helper Text</FieldDescription>
            </Field>
          </StateRow>
        </div>
      </div>

      <DocsDivider />

      <div>
        <PlaygroundVariantHeading>Formular-Beispiel</PlaygroundVariantHeading>
        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field>
            <FieldLabel htmlFor="form-name">Name</FieldLabel>
            <Input
              id="form-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Victoria Itter"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="form-email">E-Mail</FieldLabel>
            <Input
              id="form-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="victoria@dayone.de"
            />
          </Field>

          <div className="md:col-span-2">
            <Field>
              <FieldLabel htmlFor="form-message">Nachricht</FieldLabel>
              <Textarea
                id="form-message"
                name="message"
                placeholder="Deine Nachricht..."
                rows={4}
              />
            </Field>
          </div>

          <Field data-disabled>
            <FieldLabel htmlFor="form-disabled">Disabled</FieldLabel>
            <Input
              id="form-disabled"
              disabled
              placeholder="Nicht bearbeitbar"
            />
          </Field>
        </form>
      </div>
      <DocsDivider />
    </div>
  );
}
