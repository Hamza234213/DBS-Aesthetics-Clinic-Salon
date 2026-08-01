"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, alt }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let clientX: number;

    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else {
      clientX = e.touches[0].clientX;
    }

    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 md:h-96 lg:h-[500px] overflow-hidden rounded-[1.25rem] select-none cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (full image - always visible on right side) */}
      <div className="absolute inset-0">
       <Image
  src={afterImage}
  alt={`${alt} - After`}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority
  draggable={false}
/>
      </div>

      {/* Before Image (clipped by slider - always visible on left side) */}
      <div
  className="absolute inset-0 overflow-hidden"
  style={{
    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
    WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
  }}
>
  <Image
    src={beforeImage}
    alt={`${alt} - Before`}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
    priority
    draggable={false}
  />
</div>

      {/* Vertical Slider Line - this moves */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="
            w-8 h-8 md:w-10 md:h-10 
            rounded-full 
            bg-white 
            shadow-lg 
            flex items-center justify-center
            border-2 border-gray-200
            hover:scale-110 transition-transform
            active:scale-95
          ">
            {/* Double arrows */}
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels - stationary */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="
          px-3 py-1.5 
          bg-black/60 backdrop-blur-sm 
          text-white text-xs font-medium 
          rounded-full
          border border-white/10
        ">
          Before
        </span>
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <span className="
          px-3 py-1.5 
          bg-black/60 backdrop-blur-sm 
          text-white text-xs font-medium 
          rounded-full
          border border-white/10
        ">
          After
        </span>
      </div>
    </div>
  );
}