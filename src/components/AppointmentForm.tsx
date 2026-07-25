"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clinicInfo } from "@/data/clinic";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 18 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="rounded-[2.25rem] border hover:border-[#c9ac6a] transition-all duration-300 focus:border-[#c9ac6a] border-[#c9ac6a]/20 bg-[#1f1f1f] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
    >
      {submitted ? (
        <div className="rounded-[1.75rem] border  border-[#c9ac6a]/30 bg-[#232323] p-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#c9ac6a]">Booking request received</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#f7f2e9]">Thank you for contacting DBS.</h2>
          <p className="mt-4 text-lg leading-8 text-[#f7f2e9]/70">Our team will confirm your preferred date and treatment shortly. For urgent assistance, please reach us on WhatsApp.</p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block">Patient Name</span>
              <input 
                required 
                className="w-full rounded-full border border-[#c9ac6a]/20 bg-[#232323] px-4 py-3 text-[#f7f2e9] outline-none focus:border-[#c9ac6a] transition-colors duration-300 placeholder:text-[#f7f2e9]/30" 
                placeholder="Enter your full name"
              />
            </label>
            <label className="block text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block">Phone Number</span>
              <input 
                required 
                className="w-full rounded-full border border-[#c9ac6a]/20 bg-[#232323] px-4 py-3 text-[#f7f2e9] outline-none focus:border-[#c9ac6a] transition-colors duration-300 placeholder:text-[#f7f2e9]/30" 
                placeholder="03XX-XXXXXXX"
              />
            </label>
          </div>
          
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block flex items-center gap-2">
               
                Preferred Date
              </span>
              <div className="relative">
                <input 
                  type="date" 
                  required 
                  className="w-full rounded-full border border-[#c9ac6a]/20 bg-[#232323] px-4 py-3 text-[#f7f2e9] outline-none focus:border-[#c9ac6a] transition-colors duration-300 [color-scheme:dark]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </label>
            <label className="block text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block flex items-center gap-2">
               
                Preferred Time
              </span>
              <div className="relative">
                <input 
                  type="time" 
                  required 
                  className="w-full rounded-full border border-[#c9ac6a]/20 bg-[#232323] px-4 py-3 text-[#f7f2e9] outline-none focus:border-[#c9ac6a] transition-colors duration-300 [color-scheme:dark]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </label>
          </div>

          <label className="block text-sm text-[#f7f2e9]/70">
            <span className="mb-2 block">Preferred Treatment</span>
            <input 
              className="w-full rounded-full border border-[#c9ac6a]/20 bg-[#232323] px-4 py-3 text-[#f7f2e9] outline-none focus:border-[#c9ac6a] transition-colors duration-300 placeholder:text-[#f7f2e9]/30" 
              placeholder="HydraFacial, Laser Hair Removal, Hair Styling..." 
            />
          </label>

          <label className="block text-sm text-[#f7f2e9]/70">
            <span className="mb-2 block">Additional Notes</span>
            <textarea 
              rows={4} 
              className="w-full rounded-[1.25rem] border border-[#c9ac6a]/20 bg-[#232323] px-4 py-3 text-[#f7f2e9] outline-none focus:border-[#c9ac6a] transition-colors duration-300 resize-none placeholder:text-[#f7f2e9]/30" 
              placeholder="Any specific requests or questions..."
            />
          </label>

          <button 
            type="submit" 
            className="w-full rounded-full bg-[#c9ac6a] px-6 py-3 font-semibold text-[#232323] transition hover:bg-[#d8ba7b] hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit Request
          </button>
          
          <p className="text-center text-sm text-[#f7f2e9]/60">
            Call {clinicInfo.landline} or WhatsApp {clinicInfo.whatsapp}
          </p>
        </form>
      )}
    </motion.div>
  );
}
