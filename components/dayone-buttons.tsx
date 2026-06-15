import type { CSSProperties } from "react";
import { DocsDivider } from "@/components/docs-divider";
import { PlaygroundVariantHeading } from "@/components/playground-variant-heading";
import { PLAYGROUND_SHOWCASE } from "@/lib/playground-layout";

/** Figma / DAYONE arrow glyph (Roobert), not a custom icon */
function Arrow() {
  return (
    <span className="dayone-btn__arrow" aria-hidden>
      &#8594;
    </span>
  );
}

function CtaLabel() {
  return <span className="dayone-btn__label">Button CTA</span>;
}

function CtaInner({ showLabel = true }: { showLabel?: boolean }) {
  if (!showLabel) {
    return (
      <span className="dayone-btn__inner">
        <Arrow />
      </span>
    );
  }

  return (
    <span className="dayone-btn__inner">
      <Arrow />
      <CtaLabel />
      <Arrow />
    </span>
  );
}

type StateName = "Default" | "Hover" | "Focused" | "Disabled";

const STATE_LABELS: StateName[] = ["Default", "Focused", "Disabled"];

type CtaStyle = {
  backgroundColor: string;
  color: string;
  border: string;
};

function ctaBase(style: CtaStyle): CSSProperties {
  return {
    ...style,
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-sans), sans-serif",
  };
}

const BTN_FONT_SM = 14;
const BTN_FONT_LG = 16;

const CTA_MD_HEIGHT = 48;
const CTA_MD_WIDTH = 162;
const CTA_LG_HEIGHT = 56;
const CTA_ICON_SM_SIZE = 44;
const CTA_ICON_LG_SIZE = 56;
const CTA_PADDING_X = 18;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ctaMd(style: CtaStyle): CSSProperties {
  return {
    ...ctaBase(style),
    width: CTA_MD_WIDTH,
    minWidth: CTA_MD_WIDTH,
    maxWidth: CTA_MD_WIDTH,
    height: CTA_MD_HEIGHT,
    minHeight: CTA_MD_HEIGHT,
    maxHeight: CTA_MD_HEIGHT,
    padding: `0 ${CTA_PADDING_X}px`,
    fontSize: BTN_FONT_SM,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ctaLg(style: CtaStyle): CSSProperties {
  return {
    ...ctaBase(style),
    height: CTA_LG_HEIGHT,
    padding: `0 ${CTA_PADDING_X}px`,
    fontSize: BTN_FONT_LG,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ctaIconSm(style: CtaStyle): CSSProperties {
  return {
    ...ctaBase(style),
    width: CTA_ICON_SM_SIZE,
    height: CTA_ICON_SM_SIZE,
    minWidth: CTA_ICON_SM_SIZE,
    fontSize: BTN_FONT_SM,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ctaIconLg(style: CtaStyle): CSSProperties {
  return {
    ...ctaBase(style),
    width: CTA_ICON_LG_SIZE,
    height: CTA_ICON_LG_SIZE,
    minWidth: CTA_ICON_LG_SIZE,
    fontSize: BTN_FONT_LG,
  };
}

const PRIMARY_STYLES: Record<StateName, CtaStyle> = {
  Default: {
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    border: "2px solid #1A1A1A",
  },
  Hover: {
    backgroundColor: "#9E9A94",
    color: "#FFFFFF",
    border: "2px solid #9E9A94",
  },
  Focused: {
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    border: "2px solid #9E9A94",
  },
  Disabled: {
    backgroundColor: "#EDE7DD",
    color: "#FFFFFF",
    border: "2px solid #EDE7DD",
  },
};

const SECONDARY_STYLES: Record<StateName, CtaStyle> = {
  Default: {
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
    border: "2px solid #FFFFFF",
  },
  Hover: {
    backgroundColor: "#9E9A94",
    color: "#FFFFFF",
    border: "2px solid #9E9A94",
  },
  Focused: {
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
    border: "2px solid #9E9A94",
  },
  Disabled: {
    backgroundColor: "#FFFFFF",
    color: "#EDE7DD",
    border: "2px solid #FFFFFF",
  },
};

/** Appearance-only style — NO size properties, those come from the CSS class */
function appearanceStyle(style: CtaStyle): CSSProperties {
  return {
    backgroundColor: style.backgroundColor,
    color: style.color,
    border: style.border,
  };
}

// Y axis = state (Default, Focused, Disabled)
// X axis = size  (Small, Medium, Large)
function CtaVariantBlock({
  title,
  variant,
  styles,
}: {
  title: string;
  variant: "primary" | "secondary";
  styles: Record<StateName, CtaStyle>;
}) {
  const STATE_ROWS = [
    { key: "Default" as const,  label: "Default"  },
    { key: "Focused" as const,  label: "Focused"  },
    { key: "Disabled" as const, label: "Disabled" },
  ];
  const SIZES = ["sm", "md", "lg"] as const;

  return (
    <div>
      <PlaygroundVariantHeading>{title}</PlaygroundVariantHeading>
      <div className="space-y-4">
        {STATE_ROWS.map(({ key, label }) => {
          const isInteractive = key === "Default";
          return (
            <div key={key} className="flex items-center gap-6">
              <span className="w-16 shrink-0 text-sm" style={{ color: "var(--gray-300)" }}>
                {label}
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    {...(!isInteractive && { tabIndex: -1, "aria-hidden": true as const })}
                    className={`dayone-btn dayone-btn--${variant} ${isInteractive ? "dayone-btn--interactive" : "dayone-btn--static"} dayone-btn--${size}`}
                    style={!isInteractive ? appearanceStyle(styles[key]) : undefined}
                  >
                    <CtaInner />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type LinkStyle = {
  color: string;
  borderBottom: string;
  backgroundColor?: string;
};

function linkStateStyle(style: LinkStyle): CSSProperties {
  return {
    background: style.backgroundColor ?? "transparent",
    color: style.color,
    borderBottom: style.borderBottom,
    fontSize: BTN_FONT_SM,
  };
}

const LINK_STYLES: Record<StateName, LinkStyle> = {
  Default: { color: "#1A1A1A", borderBottom: "2px solid #1A1A1A" },
  Hover: { color: "#9E9A94", borderBottom: "2px solid #9E9A94" },
  Focused: {
    color: "#1A1A1A",
    borderBottom: "2px solid #1A1A1A",
    backgroundColor: "#EDE7DD",
  },
  Disabled: { color: "#EDE7DD", borderBottom: "2px solid transparent" },
};

const INLINE_STYLES: Record<StateName, LinkStyle> = {
  Default: { color: "#1A1A1A", borderBottom: "2px solid #1A1A1A" },
  Hover: {
    color: "#FFFFFF",
    borderBottom: "2px solid #1A1A1A",
    backgroundColor: "#1A1A1A",
  },
  Focused: {
    color: "#FFFFFF",
    borderBottom: "2px solid #1A1A1A",
    backgroundColor: "#1A1A1A",
  },
  Disabled: { color: "#EDE7DD", borderBottom: "2px solid transparent" },
};

function LinkVariantBlock({
  title,
  variant,
  styles,
}: {
  title: string;
  variant: "link" | "inline-link";
  styles: Record<StateName, LinkStyle>;
}) {
  return (
    <div>
      <PlaygroundVariantHeading>{title}</PlaygroundVariantHeading>
      <div className="space-y-4">
        {STATE_LABELS.map((state) => {
          const isInteractive = state === "Default";
          const base = `dayone-btn dayone-btn--${variant}`;
          const classes = isInteractive
            ? `${base} dayone-btn--interactive`
            : `${base} dayone-btn--static`;

          return (
            <div key={state} className="flex items-center gap-6">
              <span
                className="w-20 shrink-0 text-sm"
                style={{ color: "var(--gray-300)" }}
              >
                {state}
              </span>
              {isInteractive ? (
                <button type="button" className={classes}>
                  <span className="dayone-btn__inner">
                    {variant === "link" ? (
                      <>
                        <CtaLabel />
                        <Arrow />
                      </>
                    ) : (
                      <CtaLabel />
                    )}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden
                  className={classes}
                  style={linkStateStyle(styles[state])}
                >
                  <span className="dayone-btn__inner">
                    {variant === "link" ? (
                      <>
                        <CtaLabel />
                        <Arrow />
                      </>
                    ) : (
                      <CtaLabel />
                    )}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DayoneButtonsContent() {
  return (
    <div className="space-y-14">
      <CtaVariantBlock title="Primary" variant="primary" styles={PRIMARY_STYLES} />
      <CtaVariantBlock title="Secondary" variant="secondary" styles={SECONDARY_STYLES} />
      <LinkVariantBlock title="Link" variant="link" styles={LINK_STYLES} />
      <LinkVariantBlock title="Inline-Link" variant="inline-link" styles={INLINE_STYLES} />
      <div>
        <PlaygroundVariantHeading className="mb-4">Mobile (width filled)</PlaygroundVariantHeading>
        <button type="button" className="dayone-btn dayone-btn--primary dayone-btn--interactive dayone-btn--mobile">
          <CtaInner />
        </button>
      </div>
    </div>
  );
}

export function DayoneButtonsShowcase() {
  return (
    <div className={PLAYGROUND_SHOWCASE}>
      <CtaVariantBlock
        title="Primary"
        variant="primary"
        styles={PRIMARY_STYLES}
      />
      <DocsDivider />
      <CtaVariantBlock
        title="Secondary"
        variant="secondary"
        styles={SECONDARY_STYLES}
      />
      <DocsDivider />
      <LinkVariantBlock title="Link" variant="link" styles={LINK_STYLES} />
      <DocsDivider />
      <LinkVariantBlock
        title="Inline-Link"
        variant="inline-link"
        styles={INLINE_STYLES}
      />
      <DocsDivider />
      <div>
        <PlaygroundVariantHeading className="mb-4">
          Mobile (375px)
        </PlaygroundVariantHeading>
        <button
          type="button"
          className="dayone-btn dayone-btn--primary dayone-btn--interactive dayone-btn--mobile"
        >
          <CtaInner />
        </button>
      </div>
      <DocsDivider />
    </div>
  );
}
