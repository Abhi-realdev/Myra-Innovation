"use client";

import { motion } from "framer-motion";
import { Award, Monitor, Smartphone, Watch, CheckCircle, Gift } from "lucide-react";

export default function Prizes() {
  const primaryPrizes = [
    {
      place: "First Prize",
      reward: "MacBook Air",
      icon: Monitor,
      rewardList: ["MacBook M3 (13-inch, 8GB/256GB)", "Golden Champion Trophy", "National Certificate of Excellence"],
    },
    {
      place: "Second Prize",
      reward: "iPhone 15",
      icon: Smartphone,
      rewardList: ["iPhone 15 (128GB, Latest Color)", "Silver Runner-Up Trophy", "National Certificate of Excellence"],
    },
    {
      place: "Third Prize",
      reward: "Smart Watch",
      icon: Watch,
      rewardList: ["Premium Smartwatch", "Bronze Achievement Trophy", "National Certificate of Excellence"],
    },
  ];

  const benefits = [
    "Certificate of Participation for Every Participant",
    "National-Level Recognition by Industry Experts",
    "High-Impact Portfolio Enhancement for Job/College",
    "Valuable Networking Opportunities with Tech Leaders",
  ];

  return (
    <section id="prizes" className="py-20 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-badge mb-4"
          >
            <Gift className="w-3.5 h-3.5" />
            Rewards & Recognition
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-slate-900 mb-4">
            Prizes Worth Thousands
          </h2>
          <p className="text-slate-600">
            Compete, showcase your skills, and earn your spot on the national leaderboard to claim premium products and trophies.
          </p>
        </div>

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
                className="glass rounded-3xl border border-orange-100 overflow-hidden shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 sm:p-8">
                  <span className="inline-block px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-orange-600 text-white mb-6">
                    {prize.place}
                  </span>

                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-6">
                    <PrizeIcon className="w-7 h-7 text-orange-600" />
                  </div>

                  <h3 className="text-2xl font-sans font-bold text-slate-900 mb-4">{prize.reward}</h3>

                  <ul className="space-y-3">
                    {prize.rewardList.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-1.5 w-full bg-orange-600" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl border border-orange-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2 text-left">
              <h3 className="text-xl font-bold text-slate-900">Additional Participation Benefits</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Even if you don&apos;t make the top 3, MYRA'S provides extensive tools for your professional growth.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex gap-2.5 items-center bg-orange-50/50 p-4 rounded-xl border border-orange-100"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
