import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

  const styles =
    variant === "primary"
      ? "bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)] text-[#232323] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)] hover:brightness-110 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(201,172,106,0.4)]"
      : "border border-[#c9ac6a] bg-[linear-gradient(135deg,rgba(143,107,46,0.15),rgba(244,217,138,0.08),rgba(143,107,46,0.15))] text-[#f7f2e9] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-[linear-gradient(135deg,#8f6b2e,#c9a55c,#f4d98a,#b8893f)] hover:text-[#232323] hover:shadow-[0_6px_20px_rgba(201,172,106,0.35)]";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}