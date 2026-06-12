"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, Users, Zap } from "lucide-react";

export default function About() {
  const highlights = [
    {
      title: "Showcase Innovation",
      description: "Tackle real-world challenges with technical problem-solving and coding prowess.",
      icon: Lightbulb,
    },
    {
      title: "Express Creativity",
      description: "Push boundaries in media creation, graphics, design layouts, and compelling content writing.",
      icon: Zap,
    },
    {
      title: "Expand Networks",
      description: "Connect with talented professionals, students, and technology leaders across India.",
      icon: Users,
    },
    {
      title: "Unlock Growth",
      description: "Gain certificates, premium rewards, and high-impact resume/portfolio enhancement.",
      icon: Target,
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-slate-900 mb-6"
          >
            About MYRA'S INNOVATION CHALLENGE 2026
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            MYRA'S INNOVATION CHALLENGE 2026 is a national-level competition bringing together creators, innovators, designers, writers, and technology enthusiasts on a single platform.
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
                className="glass p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[#f47621]/20"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#f47621]/10 text-[#f47621]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
