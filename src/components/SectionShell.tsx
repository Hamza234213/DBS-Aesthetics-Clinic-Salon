interface SectionShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  align?: "left" | "center";
}

export function SectionShell({ eyebrow, title, description, children, align = "left" }: SectionShellProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-4 py-20 sm:px-6 lg:px-8">
      <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
        {eyebrow ? <p className="mb-3 text-sm uppercase tracking-[0.35em]  font-[Oswald] text-[#c9ac6a]">{eyebrow}</p> : null}
        <h2 className="text-3xl font-semibold tracking-tight font- text-[#f7f2e9] sm:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">{description}</p> : null}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}
