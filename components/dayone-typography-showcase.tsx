import { DocsDivider } from "@/components/docs-divider";
import {
  BODY_TYPOGRAPHY,
  DISPLAY_TYPOGRAPHY,
  formatTypographySpec,
  type TypographyToken,
} from "@/lib/typography-scale";

function TypographySample({ token }: { token: TypographyToken }) {
  return (
    <div className="space-y-2">
      <p
        style={{
          fontSize: `var(${token.fontSizeVar})`,
          lineHeight: `var(${token.lineHeightVar})`,
          letterSpacing:
            token.trackingPx > 0 ? `var(${token.trackingVar})` : "var(--tracking-display)",
          fontWeight: token.fontWeight,
          color: "var(--black)",
        }}
      >
        {token.sample}
      </p>
      <p
        className="text-sm font-normal"
        style={{ color: "var(--gray-400)" }}
      >
        {formatTypographySpec(token)}
      </p>
      <p
        className="font-mono text-[11px]"
        style={{ color: "var(--gray-300)" }}
      >
        {token.fontSizeVar} · {token.lineHeightVar} · {token.trackingVar} ·{" "}
        {token.weightLabel}
      </p>
    </div>
  );
}

export function DayoneTypographyShowcase() {
  return (
    <div className="space-y-10">
      {DISPLAY_TYPOGRAPHY.map((token) => (
        <TypographySample key={token.label} token={token} />
      ))}
      <DocsDivider />
      {BODY_TYPOGRAPHY.map((token) => (
        <TypographySample key={token.label} token={token} />
      ))}
    </div>
  );
}
