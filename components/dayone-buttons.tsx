"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaygroundVariantHeading } from "@/components/playground-variant-heading";
import { DocsDivider } from "@/components/docs-divider";
import { PLAYGROUND_SHOWCASE } from "@/lib/playground-layout";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";

const VARIANTS: { label: string; variant: ButtonVariant }[] = [
  { label: "Primary", variant: "default" },
  { label: "Secondary", variant: "outline" },
  { label: "Ghost", variant: "ghost" },
  { label: "Destructive", variant: "destructive" },
];

function SizeRow({ variant }: { variant: ButtonVariant }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant={variant}>Button</Button>
      <Button size="icon-sm" variant={variant}>
        <ArrowUpRight />
      </Button>
      <span className="mx-1" />
      <Button size="default" variant={variant}>Button</Button>
      <Button size="icon" variant={variant}>
        <ArrowUpRight />
      </Button>
      <span className="mx-1" />
      <Button size="lg" variant={variant}>Button</Button>
      <Button size="icon-lg" variant={variant}>
        <ArrowUpRight />
      </Button>
    </div>
  );
}

export function DayoneButtonsContent() {
  return (
    <div className="space-y-10">
      {VARIANTS.map(({ label, variant }) => (
        <div key={variant}>
          <PlaygroundVariantHeading>{label}</PlaygroundVariantHeading>
          <SizeRow variant={variant} />
        </div>
      ))}
    </div>
  );
}

export function DayoneButtonsShowcase() {
  return (
    <div className={PLAYGROUND_SHOWCASE}>
      {VARIANTS.map(({ label, variant }, i) => (
        <div key={variant}>
          <PlaygroundVariantHeading>{label}</PlaygroundVariantHeading>
          <SizeRow variant={variant} />
          {i < VARIANTS.length - 1 && <DocsDivider />}
        </div>
      ))}
    </div>
  );
}
