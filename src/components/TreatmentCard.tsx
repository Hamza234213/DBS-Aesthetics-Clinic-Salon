import Link from "next/link";
import Image from "next/image";

interface TreatmentCardProps {
  title: string;
  description: string;
  duration?: string;
  href?: string;
  image?: string;
}

export function TreatmentCard({ title, description, duration, href = "/", image = "/gallery-1.svg" }: TreatmentCardProps) {
  return (
    <Link 
      href={href} 
      className="group relative overflow-hidden rounded-4xl transition-all duration-500 hover:scale-[1.03] active:scale-95"
    >
      {/* Jet Black Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Metallic Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9ac6a]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Gold Border with Gradient */}
      <div className="absolute inset-0 rounded-4xl p-[1px] bg-gradient-to-br from-[#c9ac6a]/20 via-[#c9ac6a]/10 to-transparent group-hover:from-[#c9ac6a]/50 group-hover:via-[#c9ac6a]/30 group-hover:to-transparent transition-all duration-500">
        <div className="absolute inset-[1px] rounded-4xl bg-[#0a0a0a] group-hover:bg-[#0a0a0a]/95 transition-all duration-500" />
      </div>
      
      {/* Gold Glow Effect on Hover */}
      <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-[#c9ac6a]/5 via-[#c9ac6a]/10 to-[#c9ac6a]/5 blur-2xl" />
      
      {/* Gold Corner Accents */}
      <div className="absolute top-3 right-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[#c9ac6a]/40" />
      </div>
      <div className="absolute bottom-3 left-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#c9ac6a]/40" />
      </div>
      
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition duration-700 group-hover:scale-105" 
        />
        
        {/* Gradient Overlay on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 via-30% to-transparent" />
        
        {/* Gold Shimmer on Image */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-[#c9ac6a]/10 via-transparent to-transparent" />
        
        {/* Gold Badge - Premium Care */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9ac6a]/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9ac6a] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9ac6a] font-[Oswald]">
              Premium
            </span>
          </div>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1.5 rounded-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9ac6a]/20">
            <span className="text-[10px] text-[#f7f2e9]/60 tracking-wide">
              ⏱ {duration}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Title with Gold Accent */}
        <div className="flex items-center gap-2 mb-2">
          <span className="h-px w-4 bg-gradient-to-r from-[#c9ac6a]/60 to-transparent" />
          <h3 className="text-lg font-semibold text-[#f7f2e9] font-[Patrick] transition-colors duration-300 group-hover:text-[#c9ac6a]">
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-sm leading-7 text-[#f7f2e9]/50 transition-colors duration-300 group-hover:text-[#f7f2e9]/70">
          {description}
        </p>
        
        {/* Gold Divider */}
        <div className="mt-4 h-px bg-gradient-to-r from-[#c9ac6a]/20 via-[#c9ac6a]/40 to-[#c9ac6a]/20" />
        
        {/* Learn More Link */}
        <div className="mt-4 flex items-center gap-2 text-xs text-[#c9ac6a]/40 transition-all duration-300 group-hover:gap-3 group-hover:text-[#c9ac6a]">
          <span className="font-[Oswald] tracking-wider">Learn More</span>
          <svg 
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}