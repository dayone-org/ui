import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type DayoneLogoProps = {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
};

export function DayoneLogo({
  variant = "dark",
  className,
  href = "/",
}: DayoneLogoProps) {
  const src =
    variant === "light" ? "/dayone-logo-light.svg" : "/dayone-logo.svg";

  const image = (
    <Image
      src={src}
      alt="DAYONE"
      width={138}
      height={25}
      priority
      className={cn("h-6 w-auto sm:h-7", className)}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center">
      {image}
    </Link>
  );
}
