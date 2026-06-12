"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Check, ArrowLeft, Ticket, Calendar, Mail } from "lucide-react";

interface SuccessPageProps {
  registrationId: string;
  category: string;
  name: string;
  onGoBack: () => void;
}

export default function SuccessPage({ registrationId, category, name, onGoBack }: SuccessPageProps) {
  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#f47621", "#e66a1b", "#ffffff"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#f47621", "#e66a1b", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const formatCategory = (cat: string) => {
    if (cat === "reel") return "Reel Making Challenge";
    if (cat === "hackathon") return "Innovate-a-Thon (Hackathon)";
    if (cat === "design") return "Creative & Design";
    if (cat === "blog") return "Blog Writing";
    return cat;
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden bg-[#f47621]/20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#f47621]/20 text-[#f47621] flex items-center justify-center mb-6 border border-[#f47621]/30 shadow-lg">
          <Check className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-sans font-extrabold text-slate-900 mb-4">Registration Successful!</h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-10">
          Congratulations! Your registration for MYRA'S INNOVATION CHALLENGE 2026 has been submitted successfully.
        </p>

        <div className="glass-premium rounded-3xl border border-[#f47621]/20 shadow-xl relative overflow-hidden text-left mb-8 max-w-md mx-auto">
          <div className="bg-[#f47621] p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Ticket className="w-5 h-5" />
              <span className="font-bold tracking-widest text-xs uppercase">Official Entry Pass</span>
            </div>
            <span className="font-extrabold text-[10px] bg-white/20 px-2 py-0.5 rounded-full">MYRA'S 2026</span>
          </div>

          <div className="p-6 space-y-6 bg-white">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Participant Name</span>
              <span className="text-lg font-bold text-slate-900">{name}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Selected Challenge</span>
              <span className="text-sm font-semibold text-slate-700">{formatCategory(category)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Registration ID</span>
                <span className="font-mono font-bold text-sm text-[#f47621] tracking-wider">{registrationId}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Event Date</span>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#f47621]" />
                  Jan 15-18, 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#f47621]/10 border border-[#f47621]/20 text-slate-700 text-xs flex items-center gap-2.5 text-left mb-10">
          <Mail className="w-5 h-5 shrink-0 text-[#f47621]" />
          <div>
            <span className="font-bold block text-slate-900">Automatic Confirmation Sent</span>
            <span className="text-slate-600">
              A verification email containing your pass details has been dispatched to your inbox. Please check your promotions or spam folder if not found.
            </span>
          </div>
        </div>

        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-outline font-bold text-sm transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Event Homepage
        </button>
      </div>
    </section>
  );
}
