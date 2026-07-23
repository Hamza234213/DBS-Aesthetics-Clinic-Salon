import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface DoctorCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  experience?: string;
}

export function DoctorCard({ 
  name, 
  role, 
  bio, 
  image, 
  experience = "15+ Years"
}: DoctorCardProps) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="rounded-4xl border border-[#c9ac6a]/20 bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.3)] text-center">
        
        {/* Image */}
        <div className="relative mx-auto h-38 w-38 md:h-46 md:w-46">
          <div className="absolute -inset-2 rounded-full border-2 border-[#c9ac6a]/20 animate-pulse" />
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#c9ac6a]/30 shadow-[0_0_60px_rgba(201,172,106,0.15)]">
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

       

        {/* Name */}
        <h2 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-[#f7f2e9]">
          {name}
        </h2>
        
        {/* Role */}
        <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[#c9ac6a] font-medium">
          {role}
        </p>

        {/* Experience */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <FaStar className="text-[#c9ac6a] text-sm" />
          <span className="text-sm text-[#f7f2e9]/70">{experience} Experience</span>
        </div>

        {/* Bio */}
        <div className="mt-6 max-w-2xl mx-auto">
          <p className="text-base md:text-lg leading-8 text-[#f7f2e9]/80">
            {bio}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <a 
            href="/book-appointment"
            className="inline-block bg-[#c9ac6a] cursor-pointer text-[#232323] px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-[#d8ba7b] transition-all duration-300 shadow-lg shadow-[#c9ac6a]/20 hover:shadow-[#c9ac6a]/40"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}