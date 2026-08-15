"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { allServices, clinicInfo } from "@/data/clinic";

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);

  // Preferred treatment state
  const [preferred, setPreferred] = useState<string>("");

  // Selected clinic state
  const [clinic, setClinic] = useState<string>("");
  const [clinicOpen, setClinicOpen] = useState(false);

  // Preferred date state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Preferred time state
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [timeOpen, setTimeOpen] = useState(false);

  // Time wheel state
  const [selectedHour, setSelectedHour] = useState("11");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  // Preferred service dropdown state
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Validation message for custom controls
  const [validationMessage, setValidationMessage] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const clinicContainerRef = useRef<HTMLDivElement | null>(null);
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);
  const timeContainerRef = useRef<HTMLDivElement | null>(null);

  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);
  const periodRef = useRef<HTMLDivElement | null>(null);

  // Clinic hours: 11:00 AM - 8:00 PM.
  const hours = useMemo(
    () => ["11", "12", "01", "02", "03", "04", "05", "06", "07", "08"],
    [],
  );

  // Five-minute increments for precise, mouse-wheel-friendly selection.
  const minutes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) =>
        String(index * 5).padStart(2, "0"),
      ),
    [],
  );

  const periods = useMemo(() => ["AM", "PM"], []);

  useEffect(() => {
    // If a treatment is prefilled via query param, set it on client
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("treatment") || "";
      if (t) setPreferred(t);
    }
  }, []);

  // Close custom dropdowns when clicking outside them.
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as Node;

      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }

      if (
        clinicContainerRef.current &&
        !clinicContainerRef.current.contains(target)
      ) {
        setClinicOpen(false);
      }

      if (
        calendarContainerRef.current &&
        !calendarContainerRef.current.contains(target)
      ) {
        setCalendarOpen(false);
      }

      if (
        timeContainerRef.current &&
        !timeContainerRef.current.contains(target)
      ) {
        setTimeOpen(false);
      }
    }

    document.addEventListener("pointerdown", onDoc);

    return () => {
      document.removeEventListener("pointerdown", onDoc);
    };
  }, []);

  // Keep the selected wheel values visually centered whenever the picker opens.
  useEffect(() => {
    if (!timeOpen) return;

    const scrollToSelected = () => {
      const hourIndex = hours.indexOf(selectedHour);
      const minuteIndex = minutes.indexOf(selectedMinute);
      const periodIndex = periods.indexOf(selectedPeriod);

      if (hourRef.current && hourIndex >= 0) {
        hourRef.current.scrollTop = hourIndex * 48;
      }

      if (minuteRef.current && minuteIndex >= 0) {
        minuteRef.current.scrollTop = minuteIndex * 48;
      }

      if (periodRef.current && periodIndex >= 0) {
        periodRef.current.scrollTop = periodIndex * 48;
      }
    };

    requestAnimationFrame(scrollToSelected);
  }, [timeOpen, hours, minutes, selectedHour, selectedMinute, selectedPeriod]);

  function to24Hour(hour: string, period: string) {
    let hour24 = Number(hour);

    if (period === "AM") {
      if (hour24 === 12) hour24 = 0;
    } else if (hour24 !== 12) {
      hour24 += 12;
    }

    return hour24;
  }

  function isTimeAllowed(hour: string, minute: string, period: string) {
    const totalMinutes = to24Hour(hour, period) * 60 + Number(minute);
    return totalMinutes >= 11 * 60 && totalMinutes <= 20 * 60;
  }

  function normalizeTime(hour: string, minute: string, period: string) {
    if (hour === "11") {
      period = "AM";
    } else {
      period = "PM";
    }

    if (hour === "08") {
      minute = "00";
    }

    return { hour, minute, period };
  }

  function updateSelectedTime(
    hour: string = selectedHour,
    minute: string = selectedMinute,
    period: string = selectedPeriod,
  ) {
    const normalized = normalizeTime(hour, minute, period);

    setSelectedHour(normalized.hour);
    setSelectedMinute(normalized.minute);
    setSelectedPeriod(normalized.period);
    setSelectedTime(
      `${normalized.hour}:${normalized.minute} ${normalized.period}`,
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedDate) {
      setValidationMessage("Please select a preferred date.");
      setCalendarOpen(true);
      setTimeOpen(false);
      setOpen(false);
      setClinicOpen(false);
      return;
    }

    if (!selectedTime) {
      setValidationMessage("Please select a preferred time.");
      setTimeOpen(true);
      setCalendarOpen(false);
      setOpen(false);
      setClinicOpen(false);
      return;
    }

    if (!preferred) {
      setValidationMessage("Please select a preferred service.");
      setOpen(true);
      setCalendarOpen(false);
      setTimeOpen(false);
      setClinicOpen(false);
      return;
    }

    if (!clinic) {
      setValidationMessage("Please select a clinic.");
      setClinicOpen(true);
      setOpen(false);
      setCalendarOpen(false);
      setTimeOpen(false);
      return;
    }

    setValidationMessage("");
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

  // Calendar helpers
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  const calendarDays = Array.from(
    { length: firstDayOfMonth + daysInMonth },
    (_, index) => {
      if (index < firstDayOfMonth) return null;
      return index - firstDayOfMonth + 1;
    },
  );

  function formatDate(date: Date | null) {
    if (!date) return "Select a date...";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatDateForForm(date: Date | null) {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function isSameDate(date: Date | null, day: number) {
    if (!date) return false;

    return (
      date.getDate() === day &&
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  }

  function isPastDate(day: number) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  }

  const today = new Date();

  const currentMonthIsToday =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-card w-full max-w-full min-w-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.25rem] p-4 sm:p-6 md:p-8"
    >
      {submitted ? (
        <div className="rounded-[1.5rem] sm:rounded-[1.75rem] border border-[#c9ac6a]/30 bg-[#232323] p-5 sm:p-8 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#c9ac6a]">
            Booking request received
          </p>

          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#f7f2e9]">
            Thank you for contacting DBS.
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-[#f7f2e9]/70">
            Our team will confirm your preferred date and treatment shortly. For
            urgent assistance, please reach us on WhatsApp.
          </p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block min-w-0 text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block">Patient Name</span>

              <input
                required
                className="w-full rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-colors duration-300 placeholder:text-[#f7f2e9]/30"
                placeholder="Enter your full name"
              />
            </label>

            <label className="block min-w-0 text-sm text-[#f7f2e9]/70">
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

                  let value = input.value.replace(/\D/g, "");
                  value = value.slice(0, 11);

                  if (value.length > 4) {
                    value = `${value.slice(0, 4)}-${value.slice(4)}`;
                  }

                  input.value = value;
                }}
              />
            </label>
          </div>

          {/* Preferred Date + Preferred Time */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Preferred Date */}
            <label className="block min-w-0 text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block">Preferred Date</span>

              <div ref={calendarContainerRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setCalendarOpen((s) => !s);
                    setTimeOpen(false);
                    setOpen(false);
                    setClinicOpen(false);
                    setValidationMessage("");
                  }}
                  className="w-full text-left rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-all duration-300 flex items-center justify-between"
                >
                  <span className="truncate">{formatDate(selectedDate)}</span>

                  <svg
                    className={`h-4 w-4 ml-4 shrink-0 transition-transform ${
                      calendarOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {calendarOpen && (
                  <div className="absolute left-0 right-0 mt-3 z-50 rounded-2xl border border-[#c9ac6a]/20 bg-[#0a0a0a]/98 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        disabled={currentMonthIsToday}
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() - 1,
                              1,
                            ),
                          )
                        }
                        className={`h-8 w-8 rounded-full text-[#c9ac6a] transition-colors ${
                          currentMonthIsToday
                            ? "opacity-20 cursor-not-allowed"
                            : "hover:bg-[#c9ac6a]/10"
                        }`}
                        aria-label="Previous month"
                      >
                        ‹
                      </button>

                      <span className="text-sm font-semibold text-[#f7f2e9]">
                        {monthNames[currentMonth.getMonth()]}{" "}
                        {currentMonth.getFullYear()}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentMonth(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1,
                              1,
                            ),
                          )
                        }
                        className="h-8 w-8 rounded-full text-[#c9ac6a] hover:bg-[#c9ac6a]/10 transition-colors"
                        aria-label="Next month"
                      >
                        ›
                      </button>
                    </div>

                    <div className="grid grid-cols-7 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div
                          key={day}
                          className="text-center text-[11px] text-[#c9ac6a]/70 py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => (
                        <div key={index} className="flex justify-center">
                          {day === null ? (
                            <div className="h-9 w-9" />
                          ) : (
                            <button
                              type="button"
                              disabled={isPastDate(day)}
                              onClick={() => {
                                const newDate = new Date(
                                  currentMonth.getFullYear(),
                                  currentMonth.getMonth(),
                                  day,
                                );

                                setSelectedDate(newDate);
                                setCalendarOpen(false);
                                setValidationMessage("");
                              }}
                              className={`h-9 w-9 rounded-full text-sm transition-all duration-200 ${
                                isSameDate(selectedDate, day)
                                  ? "bg-[#c9ac6a] text-[#17130b] font-semibold"
                                  : isPastDate(day)
                                    ? "text-[#f7f2e9]/20 cursor-not-allowed"
                                    : "text-[#f7f2e9]/70 hover:bg-[#c9ac6a]/15 hover:text-[#c9ac6a]"
                              }`}
                            >
                              {day}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date();

                        setSelectedDate(today);
                        setCurrentMonth(
                          new Date(today.getFullYear(), today.getMonth(), 1),
                        );
                        setCalendarOpen(false);
                        setValidationMessage("");
                      }}
                      className="w-full mt-4 pt-3 border-t border-[#c9ac6a]/10 text-xs text-[#c9ac6a] hover:text-[#f4d98a] transition-colors"
                    >
                      Today
                    </button>
                  </div>
                )}

                <input
                  type="hidden"
                  name="preferredDate"
                  value={formatDateForForm(selectedDate)}
                />
              </div>
            </label>

            {/* Preferred Time */}
            <label className="block min-w-0 text-sm text-[#f7f2e9]/70">
              <span className="mb-2 block">Preferred Time</span>

              <div ref={timeContainerRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setTimeOpen((s) => !s);
                    setCalendarOpen(false);
                    setOpen(false);
                    setClinicOpen(false);
                    setValidationMessage("");
                  }}
                  className="w-full text-left rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-all duration-300 flex items-center justify-between"
                >
                  <span className="truncate">
                    {selectedTime || "Select a time..."}
                  </span>

                  <svg
                    className={`h-4 w-4 ml-4 shrink-0 transition-transform ${
                      timeOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {timeOpen && (
                  <div className="absolute left-0 right-0 mt-3 z-50 rounded-2xl border border-[#c9ac6a]/20 bg-[#0a0a0a]/98 p-4 sm:p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                    <div className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-[#c9ac6a]/70">
                      Select Time
                    </div>

                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      {/* Hour wheel */}
                      <div className="relative w-[4.25rem] sm:w-20">
                        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-12 -translate-y-1/2 rounded-xl border border-[#c9ac6a]/30 bg-[#c9ac6a]/5" />
                        <div
                          ref={hourRef}
                          className="relative h-40 overflow-y-auto snap-y snap-mandatory scroll-smooth overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                          onScroll={(e) => {
                            const index = Math.round(
                              e.currentTarget.scrollTop / 48,
                            );
                            const value = hours[index];
                            if (value)
                              updateSelectedTime(
                                value,
                                selectedMinute,
                                selectedPeriod,
                              );
                          }}
                        >
                          <div className="h-14" />
                          {hours.map((hour) => (
                            <button
                              key={hour}
                              type="button"
                              onClick={() =>
                                updateSelectedTime(
                                  hour,
                                  selectedMinute,
                                  selectedPeriod,
                                )
                              }
                              className={`flex h-12 w-full snap-center items-center justify-center rounded-xl text-sm sm:text-base transition-all duration-200 ${
                                selectedHour === hour
                                  ? "font-semibold text-[#c9ac6a]"
                                  : "text-[#f7f2e9]/40 hover:text-[#f7f2e9]/70"
                              }`}
                            >
                              {hour}
                            </button>
                          ))}
                          <div className="h-14" />
                        </div>
                      </div>

                      <div className="flex h-40 items-center text-lg sm:text-xl font-semibold text-[#c9ac6a]">
                        :
                      </div>

                      {/* Minute wheel */}
                      <div className="relative w-[4.25rem] sm:w-20">
                        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-12 -translate-y-1/2 rounded-xl border border-[#c9ac6a]/30 bg-[#c9ac6a]/5" />
                        <div
                          ref={minuteRef}
                          className="relative h-40 overflow-y-auto snap-y snap-mandatory scroll-smooth overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                          onScroll={(e) => {
                            const index = Math.round(
                              e.currentTarget.scrollTop / 48,
                            );
                            const value = minutes[index];
                            if (value)
                              updateSelectedTime(
                                selectedHour,
                                value,
                                selectedPeriod,
                              );
                          }}
                        >
                          <div className="h-14" />
                          {minutes.map((minute) => {
                            const disabled =
                              selectedHour === "08" &&
                              selectedPeriod === "PM" &&
                              minute !== "00";
                            return (
                              <button
                                key={minute}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                  if (
                                    isTimeAllowed(
                                      selectedHour,
                                      minute,
                                      selectedPeriod,
                                    )
                                  ) {
                                    updateSelectedTime(
                                      selectedHour,
                                      minute,
                                      selectedPeriod,
                                    );
                                  }
                                }}
                                className={`flex h-12 w-full snap-center items-center justify-center rounded-xl text-sm sm:text-base transition-all duration-200 ${
                                  disabled
                                    ? "cursor-not-allowed text-[#f7f2e9]/10"
                                    : selectedMinute === minute
                                      ? "font-semibold text-[#c9ac6a]"
                                      : "text-[#f7f2e9]/40 hover:text-[#f7f2e9]/70"
                                }`}
                              >
                                {minute}
                              </button>
                            );
                          })}
                          <div className="h-14" />
                        </div>
                      </div>

                      {/* AM / PM wheel */}
                      <div className="relative w-[4.25rem] sm:w-20">
                        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-12 -translate-y-1/2 rounded-xl border border-[#c9ac6a]/30 bg-[#c9ac6a]/5" />
                        <div
                          ref={periodRef}
                          className="relative h-40 overflow-y-auto snap-y snap-mandatory scroll-smooth overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                          onScroll={(e) => {
                            const index = Math.round(
                              e.currentTarget.scrollTop / 48,
                            );
                            const value = periods[index];
                            if (value)
                              updateSelectedTime(
                                selectedHour,
                                selectedMinute,
                                value,
                              );
                          }}
                        >
                          <div className="h-14" />
                          {periods.map((period) => {
                            const disabled = !isTimeAllowed(
                              selectedHour,
                              selectedMinute,
                              period,
                            );
                            return (
                              <button
                                key={period}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                  if (
                                    isTimeAllowed(
                                      selectedHour,
                                      selectedMinute,
                                      period,
                                    )
                                  ) {
                                    updateSelectedTime(
                                      selectedHour,
                                      selectedMinute,
                                      period,
                                    );
                                  }
                                }}
                                className={`flex h-12 w-full snap-center items-center justify-center rounded-xl text-sm sm:text-base transition-all duration-200 ${
                                  disabled
                                    ? "cursor-not-allowed text-[#f7f2e9]/10"
                                    : selectedPeriod === period
                                      ? "font-semibold text-[#c9ac6a]"
                                      : "text-[#f7f2e9]/40 hover:text-[#f7f2e9]/70"
                                }`}
                              >
                                {period}
                              </button>
                            );
                          })}
                          <div className="h-14" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center text-[11px] text-[#f7f2e9]/35">
                      Clinic hours: 11:00 AM – 8:00 PM
                    </div>

                    <button
                      type="button"
                      disabled={
                        !isTimeAllowed(
                          selectedHour,
                          selectedMinute,
                          selectedPeriod,
                        )
                      }
                      onClick={() => {
                        if (
                          isTimeAllowed(
                            selectedHour,
                            selectedMinute,
                            selectedPeriod,
                          )
                        ) {
                          setSelectedTime(
                            `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
                          );
                          setTimeOpen(false);
                          setValidationMessage("");
                        }
                      }}
                      className="mt-4 w-full rounded-full border border-[#c9ac6a]/30 bg-[#c9ac6a]/10 py-2.5 text-sm font-medium text-[#c9ac6a] transition-all duration-300 hover:border-[#c9ac6a]/60 hover:bg-[#c9ac6a]/20 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Done
                    </button>
                  </div>
                )}

                <input
                  type="hidden"
                  name="preferredTime"
                  value={selectedTime}
                />
              </div>
            </label>
          </div>

          {/* Preferred Service */}
          <div className="block text-sm text-[#f7f2e9]/70">
            <span className="mb-2 block">Preferred Service</span>

            <div ref={containerRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setOpen((s) => !s);
                  setCalendarOpen(false);
                  setTimeOpen(false);
                  setClinicOpen(false);
                  setValidationMessage("");
                }}
                className="w-full text-left rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-all duration-300 flex items-center justify-between"
              >
                <span className="truncate">
                  {preferred || "Select a premium service..."}
                </span>

                <svg
                  className={`h-4 w-4 ml-4 shrink-0 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {open && (
                <div
                  className="
          absolute
          left-0
          right-0
          mt-3
          z-50

          max-h-[min(360px,calc(100vh-14rem))]

          overflow-hidden

          rounded-[1.5rem]

          border
          border-[#c9ac6a]/20

          bg-[#0a0a0a]/98

          shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        "
                >
                  <div
                    className="
            max-h-[min(360px,calc(100vh-14rem))]

            overflow-y-auto
            rounded-[1.5rem]

            p-4

            hide-scrollbar
          "
                  >
                    {/* Search + Close */}
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <input
                        className="
                min-w-0
                flex-1
                rounded-full
                bg-[#111]
                px-4
                py-2
                text-sm
                text-[#c9ac6a]
                outline-none

                placeholder:text-[#f7f2e9]/40
              "
                        placeholder="Search services..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setOpen(false);
                        }}
                        className="
                text-sm
                text-[#c9ac6a]
                transition-colors
                duration-200
                hover:text-[#f4d98a]
              "
                      >
                        Close
                      </button>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                      {Array.from(filtered.entries()).map(([cat, items]) => (
                        <div key={cat}>
                          <div
                            className="
                    mb-2
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#c9ac6a]
                    font-[Oswald]
                  "
                          >
                            {cat}
                          </div>

                          <div className="grid gap-2">
                            {items.map((name) => (
                              <button
                                key={name}
                                type="button"
                                onClick={() => {
                                  setPreferred(name);
                                  setOpen(false);
                                  setQuery("");
                                  setValidationMessage("");
                                }}
                                className="
                        w-full
                        text-left
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        text-[#f7f2e9]/70

                        transition-colors
                        duration-200

                        hover:bg-[#111]
                        hover:text-[#c9ac6a]
                      "
                              >
                                {name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {filtered.size === 0 && (
                        <p className="py-4 text-center text-sm text-[#f7f2e9]/40">
                          No services found.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Clinic Selection */}
          <div className="block text-sm text-[#f7f2e9]/70">
            <span className="mb-2 block">Select Clinic</span>

            <div ref={clinicContainerRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setClinicOpen((s) => !s);
                  setOpen(false);
                  setCalendarOpen(false);
                  setTimeOpen(false);
                  setValidationMessage("");
                }}
                className="w-full text-left rounded-full border border-[#c9ac6a]/20 bg-transparent px-4 py-3 text-[#c9ac6a] outline-none focus:border-[#c9ac6a] transition-all duration-300 flex items-center justify-between"
              >
                <span className="truncate">
                  {clinic || "Select a clinic..."}
                </span>

                <svg
                  className={`h-4 w-4 ml-4 shrink-0 transition-transform ${
                    clinicOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {clinicOpen && (
                <div className="absolute left-0 right-0 mt-3 z-50 rounded-2xl border border-[#c9ac6a]/20 bg-[#0a0a0a]/95 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                  <button
                    type="button"
                    onClick={() => {
                      setClinic("Khayaban-e-Saadi Branch");
                      setClinicOpen(false);
                      setValidationMessage("");
                    }}
                    className="w-full text-left rounded-lg px-3 py-2.5 text-sm text-[#f7f2e9]/70 hover:bg-[#111] hover:text-[#c9ac6a] transition-colors duration-200"
                  >
                    Khayaban-e-Saadi Branch
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setClinic("Khayaban-e-Badar Branch");
                      setClinicOpen(false);
                      setValidationMessage("");
                    }}
                    className="w-full text-left rounded-lg px-3 py-2.5 text-sm text-[#f7f2e9]/70 hover:bg-[#111] hover:text-[#c9ac6a] transition-colors duration-200"
                  >
                    Khayaban-e-Badar Branch
                  </button>
                </div>
              )}

              <input type="hidden" name="clinic" value={clinic} />
            </div>
          </div>

          {/* Hidden input so server/form can pick it up if needed */}
          <input type="hidden" name="preferredTreatment" value={preferred} />

          {validationMessage && (
            <p className="rounded-xl border border-[#c9ac6a]/20 bg-[#c9ac6a]/5 px-4 py-3 text-sm text-[#c9ac6a]">
              {validationMessage}
            </p>
          )}

          <label className="block min-w-0 text-sm text-[#f7f2e9]/70">
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
