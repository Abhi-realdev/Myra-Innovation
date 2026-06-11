"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Laptop, Palette, PenTool, Flame, Heart, Share2, Terminal, Code, Cpu, Layers, Brush, Pen, FileText, CheckCircle2 } from "lucide-react";

export type EventCategoryType = "reel" | "hackathon" | "design" | "blog";

interface CategoriesProps {
  selectedCategory: EventCategoryType;
  onSelectCategory: (category: EventCategoryType) => void;
}

export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  const tabs = [
    { id: "reel" as EventCategoryType, name: "Reel Making", icon: Film, color: "text-pink-500", border: "border-pink-500/30" },
    { id: "hackathon" as EventCategoryType, name: "Hackathon", icon: Laptop, color: "text-emerald-500", border: "border-emerald-500/30" },
    { id: "design" as EventCategoryType, name: "Creative & Design", icon: Palette, color: "text-cyan-500", border: "border-cyan-500/30" },
    { id: "blog" as EventCategoryType, name: "Blog Writing", icon: PenTool, color: "text-amber-500", border: "border-amber-500/30" },
  ];

  // Auto-scrolling logs for Code Background
  const [codeLines, setCodeLines] = useState<string[]>([
    "import { Innovation } from 'myra-challenge';",
    "const creator = new Creator({ name: 'Innovator' });",
    "creator.compileIdea({ creativity: true, tech: true });",
    "// Compiling challenges...",
    "Status: 200 OK. Ready to deploy.",
  ]);

  useEffect(() => {
    if (selectedCategory === "hackathon") {
      const interval = setInterval(() => {
        setCodeLines((prev) => {
          const commands = [
            `const challenge = await MYRA.getEvent("Hackathon");`,
            `console.log("Analyzing solutions...");`,
            `deployToProd({ serverless: true, db: "Google Sheets" });`,
            `// Fetching submission ID: ${Math.floor(100000 + Math.random() * 900000)}`,
            `npm run test --pass`,
            `Authorization: Bearer ADMIN_JWT_SECRET`,
            `System health: 100% OK`,
          ];
          const randomCmd = commands[Math.floor(Math.random() * commands.length)];
          return [...prev.slice(1), randomCmd];
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [selectedCategory]);

  return (
    <section id="categories" className="py-20 relative overflow-hidden transition-all duration-500">
      {/* Dynamic Background Blur Glow matching selected category */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-1000 ${
        selectedCategory === "reel" ? "bg-pink-500" :
        selectedCategory === "hackathon" ? "bg-emerald-500" :
        selectedCategory === "design" ? "bg-cyan-500" : "bg-amber-500"
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-blue-950 dark:text-white mb-4">
            Event Categories
          </h2>
          <p className="text-blue-900/70 dark:text-slate-400">
            Click on a category tab below to explore the details, submission guidelines, and visual environment of each challenge.
          </p>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap md:flex-nowrap p-1.5 rounded-2xl glass border border-slate-200/50 dark:border-slate-800/50 max-w-full overflow-x-auto gap-1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-blue-950 dark:bg-white text-white dark:text-slate-950 shadow-lg"
                      : "text-blue-950/70 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white"
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? "" : tab.color}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card Displays */}
        <div className="min-h-[460px] relative">
          <AnimatePresence mode="wait">
            {selectedCategory === "reel" && (
              <motion.div
                key="reel"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
                    🎬 Content Creation
                  </div>
                  <h3 className="text-3xl font-sans font-extrabold text-blue-950 dark:text-white">
                    Reel Making Challenge
                  </h3>
                  <p className="text-base text-blue-900/75 dark:text-slate-400 leading-relaxed">
                    Unleash your storytelling, editing, and content creation skills. Craft high-impact short videos and reels that capture attention, inspire audiences, and trend across social platforms. We are looking for creators who can blend information, visual aesthetics, and innovation.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-950 dark:text-slate-200">Guidelines & Deliverables:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-900/75 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                        <span>Max length: 60 seconds</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                        <span>Format: MP4 / MOV (Vertical 9:16)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                        <span>Topics: Innovation, AI, Student Life, Tech</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                        <span>Original edits & clips only</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#register"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold tracking-wide transition-all shadow-lg shadow-pink-500/20"
                    >
                      Enter Reel Making
                    </a>
                  </div>
                </div>

                {/* Interactive Visual Graphic */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-64 h-[400px] rounded-[36px] border-[8px] border-slate-900 dark:border-slate-800 bg-black shadow-2xl overflow-hidden flex flex-col justify-between p-4">
                    {/* Top Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-20" />
                    
                    {/* Simulated Player View */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 via-pink-900/40 to-black z-0" />
                    
                    {/* Top Icons */}
                    <div className="relative z-10 flex justify-between items-center text-white text-xs mt-2 font-semibold px-2">
                      <span>Live Mode</span>
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    </div>

                    {/* Middle Video Mock Visual */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-44 text-white text-center mt-12">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md mb-2 shadow-lg animate-float">
                        <Film className="w-6 h-6 text-pink-400" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Preview Clip</span>
                      <span className="text-sm font-bold text-white mt-1">"How AI Changes Writing"</span>
                    </div>

                    {/* Floating Reactions */}
                    <div className="relative z-10 flex flex-col gap-3 items-end text-white text-xs self-end pr-2 mb-4">
                      <div className="flex flex-col items-center hover:scale-110 transition-transform cursor-pointer">
                        <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm"><Heart className="w-4.5 h-4.5 text-red-500 fill-red-500" /></div>
                        <span className="scale-90 font-semibold mt-0.5">2.4k</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm"><Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500" /></div>
                        <span className="scale-90 font-semibold mt-0.5">850</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm"><Share2 className="w-4.5 h-4.5 text-blue-400" /></div>
                        <span className="scale-90 font-semibold mt-0.5">Share</span>
                      </div>
                    </div>

                    {/* User Profile Info bottom */}
                    <div className="relative z-10 text-white p-2 text-left bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                      <p className="font-bold text-sm">@myra_innovator</p>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">Creating the future of tech and style in 60s! #Innovation2026</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedCategory === "hackathon" && (
              <motion.div
                key="hackathon"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider">
                    💻 Code & Innovate
                  </div>
                  <h3 className="text-3xl font-sans font-extrabold text-blue-950 dark:text-white">
                    Innovate-a-Thon (Hackathon)
                  </h3>
                  <p className="text-base text-blue-900/75 dark:text-slate-400 leading-relaxed">
                    Build tangible digital solutions. Bring your team, conceptualize architectures, write robust software, and compile working systems. Whether it is Web Apps, AI integrations, Mobile apps, or Developer APIs - we seek programmers tackling real-world problem statements.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-950 dark:text-slate-200">Guidelines & Deliverables:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-900/75 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Team Size: Individual or up to 4</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>GitHub repository link submission</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Live hosted URL or video demo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Original code written during challenge</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#register"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Enter Hackathon
                    </a>
                  </div>
                </div>

                {/* Animated Code Terminal Visual */}
                <div className="lg:col-span-5 flex justify-center w-full">
                  <div className="w-full max-w-md h-[360px] rounded-2xl bg-slate-950 border border-emerald-500/30 shadow-2xl p-4 font-mono text-xs flex flex-col justify-between overflow-hidden relative">
                    {/* Header pane buttons */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-slate-500 text-[10px] select-none">myra_dev_server.sh</span>
                      <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                    </div>

                    {/* Scrolling terminal code lines */}
                    <div className="flex-1 space-y-2.5 overflow-y-auto pr-2">
                      {codeLines.map((line, idx) => (
                        <motion.div
                          key={idx + line}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`${
                            line.startsWith("Status")
                              ? "text-emerald-400 font-bold"
                              : line.startsWith("//")
                              ? "text-slate-500"
                              : "text-slate-300"
                          }`}
                        >
                          <span className="text-slate-600 select-none mr-2">{`$`}</span>
                          {line}
                        </motion.div>
                      ))}
                    </div>

                    {/* Console footer cursor */}
                    <div className="mt-4 pt-2 border-t border-slate-900/60 flex items-center gap-1.5 text-emerald-400">
                      <Code className="w-3.5 h-3.5 animate-pulse" />
                      <span className="font-semibold select-none">myra-compiler:</span>
                      <span className="animate-pulse font-bold">_</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedCategory === "design" && (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-550 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    🎨 Visuals & Identity
                  </div>
                  <h3 className="text-3xl font-sans font-extrabold text-blue-950 dark:text-white">
                    Creative & Design Environment
                  </h3>
                  <p className="text-base text-blue-900/75 dark:text-slate-400 leading-relaxed">
                    Craft immersive interfaces, branding packages, vector art, or structural layouts. This category is for visual architects, graphics artists, and UI/UX masterminds. Present a complete aesthetic design system, interactive Figma mockup, or high-fidelity promotional asset pack.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-950 dark:text-slate-200">Guidelines & Deliverables:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-900/75 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>Deliverable: PDF, Figma Link, or PNG zip</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>Include: Source files (PSD, FIG, AI)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>Preferred size: 300 DPI high-definition</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>Include moodboard & typography justification</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#register"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-550 text-white font-bold tracking-wide transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Enter Creative & Design
                    </a>
                  </div>
                </div>

                {/* Animated UI/UX Wireframe Canvas Graphic */}
                <div className="lg:col-span-5 flex justify-center w-full">
                  <div className="w-full max-w-md h-[360px] rounded-2xl glass border border-cyan-500/20 dark:border-cyan-500/10 shadow-2xl relative overflow-hidden flex flex-col p-4 bg-white/40 dark:bg-slate-950/40">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200/50 dark:border-slate-800/50 mb-4">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-500" />
                        Figma Mockup Canvas
                      </span>
                      <span className="text-[10px] text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full font-semibold">100% Zoom</span>
                    </div>

                    {/* Canvas Area with floating layers */}
                    <div className="flex-1 grid grid-cols-12 gap-3 relative">
                      {/* Grid background inside canvas */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                      {/* Design Frame 1 */}
                      <div className="col-span-7 rounded-xl border border-cyan-500/30 bg-white/90 dark:bg-slate-900/95 p-3 flex flex-col justify-between shadow-lg relative animate-float">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Banner Frame</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        </div>
                        <div className="w-full h-10 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse-slow mb-2" />
                        <div className="space-y-1.5">
                          <div className="h-2 w-11/12 rounded bg-slate-200 dark:bg-slate-800" />
                          <div className="h-1.5 w-8/12 rounded bg-slate-200 dark:bg-slate-800" />
                        </div>
                      </div>

                      {/* Design Sidebar Elements */}
                      <div className="col-span-5 flex flex-col gap-2.5 z-10">
                        <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 p-2.5 shadow-md flex items-center gap-2 animate-float-delayed">
                          <Brush className="w-4 h-4 text-pink-500" />
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold text-slate-800 dark:text-white">Color Splash</p>
                            <div className="flex gap-1">
                              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 p-2.5 shadow-md flex flex-col justify-between h-20">
                          <span className="text-[8px] font-bold text-slate-400">Node Coordinate</span>
                          <div className="space-y-1">
                            <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 block">X: 1920px</span>
                            <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 block">Y: 1080px</span>
                          </div>
                        </div>
                      </div>

                      {/* Floating Vector Cursor Pen */}
                      <div className="absolute top-1/2 left-1/3 flex flex-col items-center z-20 pointer-events-none hover:scale-105 transition-transform">
                        <svg className="w-5 h-5 text-cyan-500 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4.5 3L3 4.5 10 11.5 12.5 9z" />
                          <circle cx="12" cy="12" r="2" fill="white" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span className="text-[8px] text-white bg-slate-900 px-1.5 py-0.5 rounded shadow mt-1">Cursor_Pen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedCategory === "blog" && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                    ✍️ Editorial & Content
                  </div>
                  <h3 className="text-3xl font-sans font-extrabold text-blue-950 dark:text-white">
                    Editorial Blog Writing
                  </h3>
                  <p className="text-base text-blue-900/75 dark:text-slate-400 leading-relaxed">
                    Shape opinion, report insight, or educate audiences. Write engaging articles, tech blogs, case studies, or editorial reviews that highlight innovation, industry disruptions, or student challenges. We seek writers with unique arguments, clear structures, and excellent flow.
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-950 dark:text-slate-200">Guidelines & Deliverables:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-900/75 dark:text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Word count: 500 - 1500 words</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Submit: PDF, Doc link, or Medium blog URL</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Language: English (Professional, clear)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>SEO-friendly formatting (h2, lists, bold)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#register"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold tracking-wide transition-all shadow-lg shadow-amber-500/20"
                    >
                      Enter Blog Writing
                    </a>
                  </div>
                </div>

                {/* Editorial Writing Desk Graphic */}
                <div className="lg:col-span-5 flex justify-center w-full">
                  <div className="w-full max-w-md h-[360px] rounded-2xl bg-[#faf9f6] dark:bg-[#121110] border border-amber-500/20 dark:border-amber-500/10 shadow-2xl p-6 font-serif relative overflow-hidden flex flex-col justify-between">
                    <div className="border-b border-amber-900/10 dark:border-amber-100/10 pb-3 mb-4 flex justify-between items-center">
                      <span className="text-[11px] font-sans font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest">
                        MYRA Literary Review
                      </span>
                      <Pen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-500" />
                    </div>

                    {/* Mock Blog Post Paragraphs */}
                    <div className="flex-1 space-y-3 font-serif">
                      <h4 className="text-lg font-bold text-amber-950 dark:text-amber-100 leading-tight">
                        The Intersection of Code and Canvas
                      </h4>
                      <p className="text-xs text-amber-900/80 dark:text-amber-200 leading-relaxed text-justify indent-4">
                        In an era dominated by algorithmic decision-making, the line dividing technical precision and graphic expression has all but evaporated. Modern developers are, in truth, designers of logic; graphic architects are, in fact, sculptors of user attention.
                      </p>
                      <p className="text-xs text-amber-900/80 dark:text-amber-200 leading-relaxed text-justify line-clamp-3">
                        As we stand on the precipice of the 2026 Innovation Challenge, we look closely at how the next generation of creators will resolve this convergence. The challenges demand not just technical capability, but rhetorical elegance...
                      </p>
                    </div>

                    {/* Article metadata footer */}
                    <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-amber-100/10 flex justify-between items-center text-[10px] font-sans text-amber-700 dark:text-amber-400">
                      <span>Article by Team MYRA</span>
                      <span>Word Count: 750</span>
                    </div>

                    {/* Ambient ink drops or alpha letters float */}
                    <div className="absolute -bottom-8 -right-6 text-7xl font-sans font-extrabold text-amber-500/5 select-none pointer-events-none">
                      W
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
