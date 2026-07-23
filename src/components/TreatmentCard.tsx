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
    <Link href={href} className="group overflow-hidden rounded-4xl border border-[#c9ac6a]/20 bg-[#202020] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="relative h-56 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-transparent" />
      </div>
      <div className="p-7">
        <p className="text-sm uppercase tracking-[0.25em] text-[#c9ac6a]">Premium care</p>
        <h3 className="mt-3 text-2xl font-semibold text-[#f7f2e9]">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-[#f7f2e9]/70">{description}</p>
        {duration ? <p className="mt-6 text-sm font-medium text-[#c9ac6a]">Duration: {duration}</p> : null}
      </div>
    </Link>
  );
}
