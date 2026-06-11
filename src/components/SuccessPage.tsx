"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Check, Sparkles, ArrowLeft, Ticket, Calendar, ShieldCheck, Mail } from "lucide-react";

interface SuccessPageProps {
  registrationId: string;
  category: string;
  name: string;
  onGoBack: () => void;
}

export default function SuccessPage({ registrationId, category, name, onGoBack }: SuccessPageProps) {
  useEffect(() => {
    // Confetti effect on load
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const formatCategory = (cat: string) => {
    if (cat === "reel") return "🎬 Reel Making Challenge";
    if (cat === "hackathon") return "💻 Innovate-a-Thon (Hackathon)";
    if (cat === "design") return "🎨 Creative & Design Environment";
    if (cat === "blog") return "✍️ Editorial Blog Writing";
    return cat;
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden bg-slate-50/30 dark:bg-slate-950/20">
      {/* Background glowing rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/15 text-green-500 flex items-center justify-center mb-6 border border-green-500/30 shadow-lg shadow-green-500/10 animate-bounce">
          <Check className="w-8 h-8" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-sans font-extrabold text-slate-900 dark:text-white mb-4">
          Registration Successful!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-10">
          Congratulations! Your registration for **MYRA Innovation Challenge 2026** has been submitted successfully.
        </p>

        {/* Premium Badge Ticket */}
        <div className="glass-premium rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl relative overflow-hidden text-left mb-8 max-w-md mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Ticket className="w-5 h-5 animate-pulse-slow" />
              <span className="font-bold tracking-widest text-xs uppercase">Official Entry Pass</span>
            </div>
            <span className="font-extrabold text-[10px] bg-white/20 px-2 py-0.5 rounded-full">MYRA 2026</span>
          </div>

          <div className="p-6 space-y-6 relative bg-white/40 dark:bg-slate-900/40">
            {/* Participant Name */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">Participant Name</span>
              <span className="text-lg font-bold text-slate-800 dark:text-white">{name}</span>
            </div>

            {/* Event Category */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">Selected Challenge</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{formatCategory(category)}</span>
            </div>

            {/* Registration ID & Date Row */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">Registration ID</span>
                <span className="font-mono font-bold text-sm text-blue-600 dark:text-cyan-400 tracking-wider">
                  {registrationId}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest block mb-1">Event Date</span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-500" />
                  Jan 15-18, 2026
                </span>
              </div>
            </div>

            {/* Barcode Mock Visual */}
            <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-col items-center justify-center">
              <div className="w-full h-10 bg-slate-950 flex gap-[2px] items-center justify-center px-4 rounded-lg select-none opacity-80">
                {[...Array(26)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white h-7 rounded-sm"
                    style={{ width: `${Math.random() > 0.5 ? 2 : 5}px` }}
                  />
                ))}
              </div>
              <span className="text-[8px] font-mono text-slate-500 mt-1 select-none">SCAN PASS FOR ENTRANCE</span>
            </div>
          </div>
        </div>

        {/* Email Notification Alert Banner */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-cyan-400 text-xs flex items-center gap-2.5 text-left mb-10">
          <Mail className="w-5 h-5 shrink-0 text-blue-500" />
          <div>
            <span className="font-bold block">Automatic Confirmation Sent</span>
            <span className="text-slate-500 dark:text-slate-400">A verification email containing your pass details has been dispatched to your inbox. Please check your promotions or spam folder if not found.</span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-slate-100 dark:hover:bg-slate-850 font-bold text-sm text-slate-700 dark:text-slate-300 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Event Homepage
        </button>
      </div>
    </section>
  );
}
