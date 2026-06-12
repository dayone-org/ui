const BASE_FONT_SIZE = 16;

export type TypographyToken = {
  label: string;
  role?: string;
  sample: string;
  fontSizePx: number;
  fontSizeVar: string;
  lineHeightRatio: number;
  lineHeightVar: string;
  trackingPx: number;
  trackingVar: string;
  fontWeight: number;
  weightLabel: "Regular" | "SemiBold";
};

function pxToRem(px: number) {
  const rem = px / BASE_FONT_SIZE;
  return Number.isInteger(rem) ? String(rem) : rem.toFixed(3).replace(/\.?0+$/, "");
}

export function formatTypographySpec(token: TypographyToken) {
  const lineHeightPx = Math.round(token.fontSizePx * token.lineHeightRatio * 10) / 10;
  const trackingLabel =
    token.trackingPx === 0
      ? "0"
      : `${token.trackingPx}px`;

  return `Font size: ${token.fontSizePx}px / ${pxToRem(token.fontSizePx)}rem | Line height: ${lineHeightPx}px / ${pxToRem(lineHeightPx)}rem | Tracking: ${trackingLabel}`;
}

export const DISPLAY_TYPOGRAPHY: TypographyToken[] = [
  {
    label: "Display 3XL",
    role: "H1",
    sample: "Display 3XL — H1",
    fontSizePx: 48,
    fontSizeVar: "--text-display-3xl",
    lineHeightRatio: 1.2,
    lineHeightVar: "--leading-display",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 600,
    weightLabel: "SemiBold",
  },
  {
    label: "Display 2XL",
    sample: "Display 2XL — Regular",
    fontSizePx: 40,
    fontSizeVar: "--text-display-2xl",
    lineHeightRatio: 1.2,
    lineHeightVar: "--leading-display",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 400,
    weightLabel: "Regular",
  },
  {
    label: "Display XL",
    sample: "Display XL — SemiBold",
    fontSizePx: 32,
    fontSizeVar: "--text-display-xl",
    lineHeightRatio: 1.2,
    lineHeightVar: "--leading-display",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 600,
    weightLabel: "SemiBold",
  },
  {
    label: "Display LG",
    sample: "Display LG — SemiBold",
    fontSizePx: 28,
    fontSizeVar: "--text-display-lg",
    lineHeightRatio: 1.2,
    lineHeightVar: "--leading-display",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 600,
    weightLabel: "SemiBold",
  },
  {
    label: "Display MD",
    sample: "Display MD — SemiBold",
    fontSizePx: 24,
    fontSizeVar: "--text-display-md",
    lineHeightRatio: 1.2,
    lineHeightVar: "--leading-display",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 600,
    weightLabel: "SemiBold",
  },
  {
    label: "Display SM",
    sample: "Display SM — SemiBold",
    fontSizePx: 20,
    fontSizeVar: "--text-display-sm",
    lineHeightRatio: 1.2,
    lineHeightVar: "--leading-display",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 600,
    weightLabel: "SemiBold",
  },
];

export const BODY_TYPOGRAPHY: TypographyToken[] = [
  {
    label: "Body LG",
    sample: "Body LG — Regular. Für Intro-Texte und Leads.",
    fontSizePx: 18,
    fontSizeVar: "--text-body-lg",
    lineHeightRatio: 1.5,
    lineHeightVar: "--leading-body",
    trackingPx: 0.36,
    trackingVar: "--tracking-body-lg",
    fontWeight: 400,
    weightLabel: "Regular",
  },
  {
    label: "Body MD",
    sample: "Body MD — Regular. Standard Fließtext.",
    fontSizePx: 16,
    fontSizeVar: "--text-body-md",
    lineHeightRatio: 1.5,
    lineHeightVar: "--leading-body",
    trackingPx: 0.32,
    trackingVar: "--tracking-body-md",
    fontWeight: 400,
    weightLabel: "Regular",
  },
  {
    label: "Body SM",
    sample: "Body SM — Regular. Labels und Captions.",
    fontSizePx: 14,
    fontSizeVar: "--text-body-sm",
    lineHeightRatio: 1.5,
    lineHeightVar: "--leading-body",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 400,
    weightLabel: "Regular",
  },
  {
    label: "Body XS",
    sample: "Body XS — Regular. Kleingedrucktes.",
    fontSizePx: 12,
    fontSizeVar: "--text-body-xs",
    lineHeightRatio: 1.5,
    lineHeightVar: "--leading-body",
    trackingPx: 0,
    trackingVar: "--tracking-display",
    fontWeight: 400,
    weightLabel: "Regular",
  },
];
