interface SectionShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  align?: "left" | "center";
  withGoldAccent?: boolean;
  className?: string;
}

export function SectionShell({ 
  eyebrow, 
  title, 
  description, 
  children, 
  align = "left",
  withGoldAccent = false,
  className = ""
}: SectionShellProps) {
  return (
    <section className={`mx-auto flex w-full max-w-7xl flex-col px-4 py-12 sm:px-6 md:py-16 lg:px-8 ${className}`}>
      {/* Optional Metallic Gold Accent Line */}
      {withGoldAccent && (
        <div className="relative mb-8">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#c9ac6a]/5 blur-2xl" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#c9ac6a]/20" />
        </div>
      )}
      
      <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
        {/* Eyebrow with gold decorative lines */}
        {eyebrow ? (
          <div className={`flex items-center gap-4 mb-3 ${align === "center" ? "justify-center" : ""}`}>
            {align === "center" && (
              <>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9ac6a]/30" />
                <p className="text-xs uppercase tracking-[0.35em] font-serif text-[#c9ac6a] font-semibold">
                  {eyebrow}
                </p>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9ac6a]/30" />
              </>
            )}
            {align === "left" && (
              <>
                <span className="h-px w-8 bg-gradient-to-r from-[#c9ac6a]/40 to-transparent" />
                <p className="text-xs uppercase tracking-[0.35em] font-serif text-[#c9ac6a] font-semibold">
                  {eyebrow}
                </p>
              </>
            )}
          </div>
        ) : null}
        
        {/* Title with metallic gold gradient option */}
        <h2 className="text-3xl font-serif font-semibold tracking-tight sm:text-4xl text-[#f7f2e9]">
          {title.includes('✦') ? (
            // If title has ✦, split and style with gold gradient
            title.split('✦').map((part, i) => (
              <span key={i}>
                {i === 1 ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9ac6a] via-[#f4d98a] to-[#c9ac6a] bg-[length:200%_100%] animate-shimmer">
                    {part}
                  </span>
                ) : (
                  <span className="text-[#f7f2e9]">{part}</span>
                )}
                {i === 0 && <span className="text-[#c9ac6a] mx-1">✦</span>}
              </span>
            ))
          ) : (
            // Default title with optional gold highlight for specific words
            <span className="text-[#f7f2e9]">
              {title}
            </span>
          )}
        </h2>
        
        {/* Gold underline for title */}
        <div className={`mt-3 ${align === "center" ? "mx-auto" : ""} w-16 h-px bg-gradient-to-r from-[#c9ac6a]/40 via-[#c9ac6a]/60 to-[#c9ac6a]/40`} />
        
        {/* Description with gold accents */}
        {description ? (
          <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-[#f7f2e9]/70 font-light">
            {description}
          </p>
        ) : null}
      </div>
      
      {/* Gold divider before children */}
      <div className="relative mt-8 sm:mt-10">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#c9ac6a]/30 to-transparent" />
        <div className="relative z-10 flex justify-center">
          <span className="px-4 text-[#c9ac6a] text-xs">✦</span>
        </div>
      </div>
      
      <div className="mt-6 sm:mt-8">{children}</div>
    </section>
  );
}