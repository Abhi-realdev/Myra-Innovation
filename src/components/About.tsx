"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, Users, Zap } from "lucide-react";

export default function About() {
  const highlights = [
    {
      title: "Showcase Innovation",
      description: "Tackle real-world challenges with technical problem-solving and coding prowess.",
      icon: Lightbulb,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: "Express Creativity",
      description: "Push boundaries in media creation, graphics, design layouts, and compelling content writing.",
      icon: Zap,
      color: "text-pink-500 bg-pink-500/10",
    },
    {
      title: "Expand Networks",
      description: "Connect with talented professionals, students, and technology leaders across India.",
      icon: Users,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Unlock Growth",
      description: "Gain certificates, premium rewards, and high-impact resume/portfolio enhancement.",
      icon: Target,
      color: "text-cyan-500 bg-cyan-500/10",
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
      {/* Visual background decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-indigo-500/5 dark:bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-blue-950 dark:text-white mb-6"
          >
            About MYRA Innovation Challenge 2026
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-blue-900/80 dark:text-slate-300 leading-relaxed"
          >
            MYRA Innovation Challenge 2026 is a national-level competition bringing together creators, innovators, designers, writers, and technology enthusiasts on a single platform.
            Participants can showcase their skills, compete with talented individuals, gain recognition, and unlock opportunities for growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl hover:bg-white dark:hover:bg-slate-900/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-blue-100/60 dark:border-slate-800/40"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-blue-950 dark:text-slate-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-blue-900/70 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
