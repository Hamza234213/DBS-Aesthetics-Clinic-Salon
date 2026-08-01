"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { allServices, clinicInfo } from "@/data/clinic";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  // Preferred treatment state
  const [preferred, setPreferred] = useState<string>("");

  // Dropdown state
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If a treatment is prefilled via query param, set it on client
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("treatment") || "";
      if (t) setPreferred(t);
    }
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const servicesByCategory = useMemo(() => {
    const map = new Map<string, string[]>();
    allServices.forEach((s) => {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s.name);
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return servicesByCategory;
    const filteredMap = new Map<string, string[]>();
    servicesByCategory.forEach((list, cat) => {
      const matches = list.filter((name) => name.toLowerCase().includes(q));
      if (matches.length) filteredMap.set(cat, matches);
    });
    return filteredMap;
  }, [query, servicesByCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-card rounded-[2.25rem] p-8"
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
                className="w-full rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-colors duration-300 placeholder:text-[#f7f2e9]/30"
                placeholder="Enter your full name"
              />
            </label>
            <label className="block text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block">Phone Number</span>

              <input
                required
                type="tel"
                inputMode="numeric"
                maxLength={12}
                placeholder="03XX-XXXXXXX"
                className="w-full rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-colors duration-300 placeholder:text-[#f7f2e9]/30"
                onInput={(e) => {
                  const input = e.currentTarget;

                  // Remove everything except numbers
                  let value = input.value.replace(/\D/g, "");

                  // Limit to 11 digits
                  value = value.slice(0, 11);

                  // Add "-" after first 4 digits
                  if (value.length > 4) {
                    value = `${value.slice(0, 4)}-${value.slice(4)}`;
                  }

                  input.value = value;
                }}
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block flex items-center gap-2">Preferred Date</span>
              <div className="relative">
                <input
                  type="date"
                  required
                  className="w-full rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-colors duration-300 [color-scheme:dark]"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </label>
            <label className="block text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block flex items-center gap-2">Preferred Time</span>
              <div className="relative">
                <input
                  type="time"
                  required
                  className="w-full rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-colors duration-300 [color-scheme:dark]"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </label>
          </div>

          <div className="block text-sm text-[#f7f2e9]/70">
            <span className="mb-2 block">Preferred Service</span>

            <div ref={containerRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                className="w-full text-left rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-all duration-300 flex items-center justify-between"
              >
                <span className="truncate">{preferred || "Select a premium service..."}</span>
                <svg className={`h-4 w-4 ml-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path d="M6 8l4 4 4-4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {open && (
                <div className="absolute left-0 right-0 mt-3 z-50 max-h-72 overflow-auto rounded-2xl border border-[#c9ac6a]/20 bg-[#0a0a0a]/95 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                  <div className="mb-3 flex items-center gap-3">
                    <input
                      className="flex-1 rounded-full bg-[#111] px-4 py-2 text-sm text-[#c9ac6a] outline-none placeholder:text-[#f7f2e9]/40"
                      placeholder="Search services..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="button" onClick={() => { setQuery(""); setOpen(false); }} className="text-sm text-[#c9ac6a]">Close</button>
                  </div>

                  <div className="space-y-4">
                    {Array.from(filtered.entries()).map(([cat, items]) => (
                      <div key={cat}>
                        <div className="mb-2 text-xs uppercase tracking-[0.25em] text-[#c9ac6a]  font-[Oswald]">{cat}</div>
                        <div className="grid gap-2">
                          {items.map((name) => (
                            <button
                              key={name}
                              type="button"
                              onClick={() => { setPreferred(name); setOpen(false); setQuery(""); }}
                              className="w-full text-left rounded-lg px-3 py-2 text-sm text-[#f7f2e9]/70 hover:bg-[#111] transition-colors duration-200"
                            >
                              {name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hidden input so server/form can pick it up if needed */}
            <input type="hidden" name="preferredTreatment" value={preferred} />
          </div>

          <label className="block text-sm text-[#f7f2e9]/70">
            <span className="mb-2 block">Additional Notes</span>
            <textarea
              rows={4}
              className="w-full rounded-[1.25rem] border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-colors duration-300 resize-none placeholder:text-[#f7f2e9]/30"
              placeholder="Any specific requests or questions..."
            />
          </label>

        <button
  type="submit"
  className="
    w-full
    rounded-full
    px-6
    py-3
    font-semibold
    text-[#232323]

    bg-[linear-gradient(135deg,#8f6b2e_0%,#c9a55c_20%,#f4d98a_40%,#b8893f_60%,#e0c16c_80%,#8f6b2e_100%)]

    shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_6px_20px_rgba(201,172,106,0.25)]

    transition-all
    duration-300

    hover:scale-[1.02]
    hover:brightness-110

    hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_25px_rgba(201,172,106,0.45)]

    active:scale-[0.98]
  "
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
