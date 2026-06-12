"use client";

import type { ReactNode } from "react";
import { DocsDivider } from "@/components/docs-divider";
import { DayoneField, DayoneInput, DayoneTextarea } from "@/components/dayone-field";
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
        <div className="space-y-4">
          <StateRow label="Default">
            <DayoneField label="Vorname" id="input-default">
              <DayoneInput id="input-default" placeholder="Dein Vorname" />
            </DayoneField>
          </StateRow>

          <StateRow label="Filled">
            <DayoneField label="Vorname" id="input-filled">
              <DayoneInput
                id="input-filled"
                defaultValue="Victoria"
                placeholder="Dein Vorname"
              />
            </DayoneField>
          </StateRow>

          <StateRow label="Disabled">
            <DayoneField label="Vorname" id="input-disabled" disabled>
              <DayoneInput
                id="input-disabled"
                disabled
                placeholder="Dein Vorname"
              />
            </DayoneField>
          </StateRow>

          <StateRow label="Helper Text">
            <DayoneField
              label="Vorname"
              id="input-helper"
              helper="Helper Text"
            >
              <DayoneInput id="input-helper" placeholder="Dein Vorname" />
            </DayoneField>
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
          <DayoneField label="Name" id="form-name">
            <DayoneInput
              id="form-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Victoria Itter"
            />
          </DayoneField>

          <DayoneField label="E-Mail" id="form-email">
            <DayoneInput
              id="form-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="victoria@dayone.de"
            />
          </DayoneField>

          <div className="md:col-span-2">
            <DayoneField label="Nachricht" id="form-message">
              <DayoneTextarea
                id="form-message"
                name="message"
                placeholder="Deine Nachricht..."
                rows={4}
              />
            </DayoneField>
          </div>

          <DayoneField label="Disabled" id="form-disabled" disabled>
            <DayoneInput
              id="form-disabled"
              disabled
              placeholder="Nicht bearbeitbar"
            />
          </DayoneField>
        </form>
      </div>
      <DocsDivider />
    </div>
  );
}
