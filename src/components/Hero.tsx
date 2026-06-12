"use client";

import { motion } from "framer-motion";
import { ArrowRight, Laptop, Film, Palette, PenTool } from "lucide-react";

export default function Hero() {
  const categories = [
    { name: "Reel Making", icon: Film, emoji: "🎬" },
    { name: "Hackathon", icon: Laptop, emoji: "💻" },
    { name: "Creative & Design", icon: Palette, emoji: "🎨" },
    { name: "Blog Writing", icon: PenTool, emoji: "✍️" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white">
      <div className="grid-bg" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-orange-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-orange-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-badge mb-6"
        >
          National-Level Innovation Challenge
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight mb-4 text-slate-900"
        >
          MYRA'S INNOVATION <br />
          <span className="text-orange-600">CHALLENGE 2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl sm:text-2xl font-medium tracking-wide text-slate-700 max-w-2xl mx-auto mb-6"
        >
          &ldquo;Where Creativity Meets Technology&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join one of India&apos;s most exciting innovation and talent competitions designed for creators, innovators, designers, writers, and problem-solvers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white btn-primary hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            Register Now
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white btn-primary hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
          >
            Learn More
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <a
                href="#categories"
                key={idx}
                className="group p-5 rounded-2xl glass hover:shadow-lg hover:border-orange-200 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 p-2 flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{cat.emoji}</span>
                    <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Explore challenge &rarr;</p>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
