import type { ReactNode } from "react";
import { DocsDivider } from "@/components/docs-divider";
import { PlaygroundVariantHeading } from "@/components/playground-variant-heading";
import { PLAYGROUND_SHOWCASE } from "@/lib/playground-layout";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

function ControlLabel({
  htmlFor,
  children,
  disabled,
}: {
  htmlFor: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-normal leading-[1.5] select-none"
      style={{ color: disabled ? "var(--gray-300)" : "var(--black)" }}
    >
      {children}
    </label>
  );
}

function ControlRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-6">
      <span
        className="w-28 shrink-0 text-sm"
        style={{ color: "var(--gray-300)" }}
      >
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

function ControlOption({
  id,
  label,
  disabled,
  children,
}: {
  id: string;
  label: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      {children}
      <ControlLabel htmlFor={id} disabled={disabled}>
        {label}
      </ControlLabel>
    </div>
  );
}

export function DayoneSelectionControlsShowcase() {
  return (
    <div className={PLAYGROUND_SHOWCASE}>
      <div>
        <PlaygroundVariantHeading>Checkbox</PlaygroundVariantHeading>
        <div className="space-y-4">
          <ControlRow label="Default">
            <ControlOption id="cb-unchecked" label="Unchecked">
              <Checkbox id="cb-unchecked" />
            </ControlOption>
            <ControlOption id="cb-checked" label="Checked">
              <Checkbox id="cb-checked" defaultChecked />
            </ControlOption>
          </ControlRow>
          <ControlRow label="Disabled">
            <ControlOption id="cb-dis-unchecked" label="Unchecked" disabled>
              <Checkbox id="cb-dis-unchecked" disabled />
            </ControlOption>
            <ControlOption id="cb-dis-checked" label="Checked" disabled>
              <Checkbox id="cb-dis-checked" defaultChecked disabled />
            </ControlOption>
          </ControlRow>
        </div>
      </div>

      <DocsDivider />

      <div>
        <PlaygroundVariantHeading>Radio</PlaygroundVariantHeading>
        <div className="space-y-4">
          <ControlRow label="Default">
            <RadioGroup defaultValue="radio-1" className="flex flex-row flex-wrap gap-6">
              <ControlOption id="radio-1" label="Option 1">
                <RadioGroupItem value="radio-1" id="radio-1" />
              </ControlOption>
              <ControlOption id="radio-2" label="Option 2">
                <RadioGroupItem value="radio-2" id="radio-2" />
              </ControlOption>
              <ControlOption id="radio-3" label="Option 3">
                <RadioGroupItem value="radio-3" id="radio-3" />
              </ControlOption>
            </RadioGroup>
          </ControlRow>
          <ControlRow label="Disabled">
            <RadioGroup
              defaultValue="radio-dis-1"
              className="flex flex-row flex-wrap gap-6"
            >
              <ControlOption id="radio-dis-1" label="Selected" disabled>
                <RadioGroupItem value="radio-dis-1" id="radio-dis-1" disabled />
              </ControlOption>
              <ControlOption id="radio-dis-2" label="Option" disabled>
                <RadioGroupItem value="radio-dis-2" id="radio-dis-2" disabled />
              </ControlOption>
            </RadioGroup>
          </ControlRow>
        </div>
      </div>

      <DocsDivider />

      <div>
        <PlaygroundVariantHeading>Switch</PlaygroundVariantHeading>
        <div className="space-y-4">
          <ControlRow label="Default">
            <ControlOption id="sw-off" label="Off">
              <Switch id="sw-off" />
            </ControlOption>
            <ControlOption id="sw-on" label="On">
              <Switch id="sw-on" defaultChecked />
            </ControlOption>
          </ControlRow>
          <ControlRow label="Disabled">
            <ControlOption id="sw-dis-off" label="Off" disabled>
              <Switch id="sw-dis-off" disabled />
            </ControlOption>
            <ControlOption id="sw-dis-on" label="On" disabled>
              <Switch id="sw-dis-on" defaultChecked disabled />
            </ControlOption>
          </ControlRow>
        </div>
      </div>
      <DocsDivider />
    </div>
  );
}
