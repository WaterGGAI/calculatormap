import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]",
  secondary: "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-muted)]",
  ghost: "border-transparent bg-transparent text-[var(--ink)] hover:bg-[var(--surface-muted)]",
  danger: "border-transparent bg-[var(--alert)] text-white hover:bg-[#8f1b12]"
};

const baseClass =
  "inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={cn(baseClass, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className={cn(baseClass, variants[variant], className)} href={href} {...props}>
      {children}
    </Link>
  );
}
