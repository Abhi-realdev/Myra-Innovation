"use client";

import { motion } from "framer-motion";
import { Award, ShieldAlert, Monitor, Smartphone, Watch, AwardIcon, CheckCircle, Gift } from "lucide-react";

export default function Prizes() {
  const primaryPrizes = [
    {
      place: "First Prize",
      reward: "MacBook Air",
      trophy: "Winner Trophy",
      cert: "Certificate of Excellence",
      color: "from-yellow-500/10 via-amber-500/5 to-transparent",
      borderColor: "border-yellow-500/40 dark:border-yellow-500/20",
      badgeColor: "bg-yellow-500 text-slate-950",
      icon: Monitor,
      glow: "shadow-yellow-500/5",
      rewardList: ["MacBook M3 (13-inch, 8GB/256GB)", "Golden Champion Trophy", "National Certificate of Excellence"],
    },
    {
      place: "Second Prize",
      reward: "iPhone 15",
      trophy: "Runner-Up Trophy",
      cert: "Certificate of Excellence",
      color: "from-slate-400/10 via-slate-500/5 to-transparent",
      borderColor: "border-slate-400/40 dark:border-slate-400/20",
      badgeColor: "bg-slate-400 text-slate-950",
      icon: Smartphone,
      glow: "shadow-slate-400/5",
      rewardList: ["iPhone 15 (128GB, Latest Color)", "Silver Runner-Up Trophy", "National Certificate of Excellence"],
    },
    {
      place: "Third Prize",
      reward: "Smart Watch",
      trophy: "Achievement Trophy",
      cert: "Certificate of Excellence",
      color: "from-amber-700/10 via-amber-800/5 to-transparent",
      borderColor: "border-amber-700/40 dark:border-amber-700/20",
      badgeColor: "bg-amber-700 text-white",
      icon: Watch,
      glow: "shadow-amber-700/5",
      rewardList: ["Premium Noise-Cancelling Smartwatch", "Bronze Achievement Trophy", "National Certificate of Excellence"],
    },
  ];

  const benefits = [
    "Certificate of Participation for Every Participant",
    "National-Level Recognition by Industry Experts",
    "High-Impact Portfolio Enhancement for Job/College",
    "Valuable Networking Opportunities with Tech Leaders",
  ];

  return (
    <section id="prizes" className="py-20 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
      {/* Background decorations */}
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Rewards & Recognition</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-blue-950 dark:text-white mb-4">
            Prizes Worth Thousands
          </h2>
          <p className="text-blue-900/70 dark:text-slate-400">
            Compete, showcase your skills, and earn your spot on the national leaderboard to claim premium products and trophies.
          </p>
        </div>

        {/* Major Prizes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {primaryPrizes.map((prize, idx) => {
            const PrizeIcon = prize.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass rounded-3xl border ${prize.borderColor} overflow-hidden shadow-xl ${prize.glow} flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 relative`}
              >
                {/* Decorative background gradient matching rank color */}
                <div className={`absolute inset-0 bg-gradient-to-b ${prize.color} pointer-events-none`} />

                <div className="p-6 sm:p-8 relative z-10">
                  {/* Top Badge */}
                  <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest ${prize.badgeColor} mb-6`}>
                    {prize.place}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/80 flex items-center justify-center mb-6 shadow-md">
                    <PrizeIcon className="w-7 h-7 text-slate-800 dark:text-slate-200" />
                  </div>

                  {/* Reward Details */}
                  <h3 className="text-2xl font-sans font-bold text-blue-950 dark:text-white mb-4">
                    {prize.reward}
                  </h3>
                  
                  {/* Bullet points */}
                  <ul className="space-y-3">
                    {prize.rewardList.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-blue-900/80 dark:text-slate-400">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Border Footer Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits Grid Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/60 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-transparent blur-md" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2 text-left">
              <h3 className="text-xl font-bold text-blue-950 dark:text-white">Additional Participation Benefits</h3>
              <p className="text-sm text-blue-800/60 dark:text-slate-400 leading-relaxed">
                Even if you don't make the top 3, MYRA provides extensive tools for your professional growth.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2.5 items-center bg-white/40 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200/20 dark:border-slate-800/40">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-blue-950 dark:text-slate-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
