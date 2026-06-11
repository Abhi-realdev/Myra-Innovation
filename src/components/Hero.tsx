"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Laptop, Film, Palette, PenTool, Award, Gift, ShieldAlert, Monitor, Smartphone, Watch, FileText } from "lucide-react";

export default function Hero() {
  const categories = [
    { name: "Reel Making", icon: Film, emoji: "🎬", color: "from-pink-500 to-rose-500" },
    { name: "Hackathon", icon: Laptop, emoji: "💻", color: "from-emerald-500 to-teal-500" },
    { name: "Creative & Design", icon: Palette, emoji: "🎨", color: "from-cyan-500 to-blue-500" },
    { name: "Blog Writing", icon: PenTool, emoji: "✍️", color: "from-amber-500 to-orange-500" },
  ];

  const prizes = [
    { title: "MacBook", rank: "1st Prize", icon: Monitor, color: "text-yellow-500 dark:text-yellow-400" },
    { title: "iPhone", rank: "2nd Prize", icon: Smartphone, color: "text-slate-400 dark:text-slate-300" },
    { title: "Smart Watch", rank: "3rd Prize", icon: Watch, color: "text-amber-700 dark:text-amber-600" },
    { title: "Certificate", rank: "All Participants", icon: FileText, color: "text-blue-500 dark:text-blue-400" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background visual effects */}
      <div className="grid-bg" />
      
      {/* Glow Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-3xl animate-float-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 dark:bg-cyan-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-cyan-400 uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>National-Level Innovation Challenge</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight mb-4"
        >
          MYRA INNOVATION <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 animate-pulse-slow">
            CHALLENGE 2026
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl sm:text-2xl font-medium tracking-wide text-blue-900 dark:text-slate-300 max-w-2xl mx-auto mb-6"
        >
          "Where Creativity Meets Technology"
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base sm:text-lg text-blue-950/70 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join one of India's most exciting innovation and talent competitions designed for creators, innovators, designers, writers, and problem-solvers.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/20 dark:shadow-purple-500/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Register Now
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-blue-900 dark:text-white glass border border-blue-200/60 dark:border-transparent hover:bg-blue-50/80 dark:hover:bg-slate-850/50 hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            Learn More
          </a>
        </motion.div>

        {/* Category Icons Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20"
        >
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <a
                href="#categories"
                key={idx}
                className="group p-5 rounded-2xl glass-premium hover:scale-105 hover:bg-white/10 dark:hover:bg-slate-900/10 transition-all duration-300 text-left border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} p-2 text-white flex items-center justify-center shadow-md mb-4 group-hover:rotate-6 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{cat.emoji}</span>
                    <h3 className="font-bold text-blue-950 dark:text-slate-100 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs text-blue-700/60 dark:text-slate-400 mt-1">Explore challenge &rarr;</p>
                </div>
              </a>
            );
          })}
        </motion.div>

        {/* Prize Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass max-w-5xl mx-auto p-6 md:p-8 rounded-3xl border border-yellow-500/20 dark:border-yellow-500/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle warm glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-yellow-500/5 blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <Award className="w-6 h-6 text-yellow-500 animate-bounce" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-blue-950 dark:text-yellow-400">
              🏆 Win Exciting Rewards
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {prizes.map((prize, idx) => {
              const Icon = prize.icon;
              return (
                <div key={idx} className="flex flex-col items-center p-4 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-slate-200/30 dark:border-slate-800/30">
                  <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-800/50 mb-3 ${prize.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider text-blue-700 dark:text-slate-400 uppercase">
                    {prize.rank}
                  </span>
                  <span className="font-extrabold text-lg sm:text-xl text-blue-950 dark:text-white mt-1">
                    {prize.title}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
