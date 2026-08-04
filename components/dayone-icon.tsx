import { cn } from "@/lib/utils";

type DayoneIconProps = {
  slug: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function DayoneIcon({ slug, size = 24, className, style }: DayoneIconProps) {
  const maskImage = `url(/icons/${slug}.svg)`;

  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-foreground", className)}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: maskImage,
        maskImage,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}
