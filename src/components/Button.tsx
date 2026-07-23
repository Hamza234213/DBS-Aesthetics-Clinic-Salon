import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition duration-300";
  const styles = variant === "primary"
    ? "bg-[#c9ac6a] text-[#232323] hover:bg-[#d8ba7b]"
    : "border border-[#c9ac6a]/50 text-[#f7f2e9] hover:bg-[#c9ac6a] hover:text-[#232323]";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}
