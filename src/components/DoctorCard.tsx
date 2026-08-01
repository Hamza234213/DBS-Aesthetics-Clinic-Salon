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
      <div className="page-card rounded-[2rem] p-8 md:p-12 text-center">
        
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
    className="
      inline-block
      cursor-pointer
      rounded-full
      px-8
      py-3.5
      text-sm
      font-medium
      uppercase
      tracking-wider
      text-[#232323]

      bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)]

      shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_15px_rgba(201,172,106,0.25)]

      transition-all
      duration-300

      hover:brightness-110
      hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_6px_20px_rgba(201,172,106,0.4)]
    "
  >
    Book a Consultation
  </a>
</div>
      </div>
    </div>
  );
}