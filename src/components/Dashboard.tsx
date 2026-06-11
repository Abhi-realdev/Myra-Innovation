"use client";

import React, { useState, useEffect } from "react";
import { Search, Download, Calendar, Filter, User, FileText, Eye, ShieldAlert, KeyRound, Sparkles, X, PlusCircle, CheckCircle } from "lucide-react";

interface Participant {
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  gender: string;
  dob: string;
  organization: string;
  courseClass: string;
  city: string;
  state: string;
  country: string;
  category: string;
  timestamp: string;
  eventSpecificData: any;
  files: {
    resume?: { name: string; url: string } | null;
    portfolio?: { name: string; url: string } | null;
    support?: { name: string; url: string } | null;
  };
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [registrations, setRegistrations] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  // Seed mock data if localStorage is empty
  useEffect(() => {
    const loadData = () => {
      let dataRaw = localStorage.getItem("myra_registrations");
      let data: Participant[] = [];

      if (dataRaw) {
        data = JSON.parse(dataRaw);
      } else {
        // Seed 6 beautiful mock items for initial dashboard preview
        const mockData: Participant[] = [
          {
            registrationId: "MYRA-2026-92841",
            fullName: "Aarav Sharma",
            email: "aarav.sharma@iitd.ac.in",
            phone: "9876543210",
            whatsapp: "9876543210",
            gender: "Male",
            dob: "2003-04-12",
            organization: "IIT Delhi",
            courseClass: "B.Tech CSE, 3rd Year",
            city: "New Delhi",
            state: "Delhi",
            country: "India",
            category: "hackathon",
            timestamp: "2026-06-10T14:22:10.000Z",
            files: {
              resume: { name: "aarav_cv.pdf", url: "https://drive.google.com/mock-resume" },
              portfolio: { name: "aarav_github.pdf", url: "https://drive.google.com/mock-portfolio" },
            },
            eventSpecificData: {
              programmingLanguages: "TypeScript, Python, Rust",
              githubProfile: "https://github.com/aaravs",
              linkedinProfile: "https://linkedin.com/in/aaravs",
              technicalSkills: "Next.js, FastAPI, PostgreSQL",
              projectDescription: "Serverless e-commerce prototype with real-time analytics sync.",
              problemStatement: "Providing latency-optimized logistics updates in rural areas.",
            },
          },
          {
            registrationId: "MYRA-2026-48512",
            fullName: "Ananya Iyer",
            email: "ananya.iyer@designschool.edu",
            phone: "9123456780",
            whatsapp: "9123456780",
            gender: "Female",
            dob: "2004-09-22",
            organization: "National Institute of Design",
            courseClass: "Communication Design, 2nd Year",
            city: "Ahmedabad",
            state: "Gujarat",
            country: "India",
            category: "design",
            timestamp: "2026-06-11T09:12:45.000Z",
            files: {
              resume: { name: "ananya_resume.pdf", url: "https://drive.google.com/mock-resume" },
              portfolio: { name: "ananya_portfolio.zip", url: "https://drive.google.com/mock-portfolio" },
            },
            eventSpecificData: {
              designTools: "Figma, Illustrator, Blender",
              portfolioLink: "https://behance.net/ananyaiyer",
              bestWorkLink: "https://behance.net/work/figma-app-mockup",
              designDomain: "UI/UX",
              creativeStatement: "Minimalist layout designs inspired by modern architectural forms.",
            },
          },
          {
            registrationId: "MYRA-2026-10594",
            fullName: "Kabir Mehta",
            email: "kabir.mehta@gmail.com",
            phone: "9988776655",
            whatsapp: "9988776655",
            gender: "Male",
            dob: "2002-11-05",
            organization: "Freelance",
            courseClass: "Digital Marketer / Video Creator",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            category: "reel",
            timestamp: "2026-06-09T18:04:15.000Z",
            files: {
              resume: { name: "kabir_biodata.pdf", url: "https://drive.google.com/mock-resume" },
              portfolio: { name: "kabir_channel_analytics.pdf", url: "https://drive.google.com/mock-portfolio" },
            },
            eventSpecificData: {
              instagramLink: "https://instagram.com/kabirmedia",
              youtubeLink: "https://youtube.com/@kabir_vlogs",
              editingSoftware: "DaVinci Resolve, Premiere Pro",
              bestReelLink: "https://instagram.com/reel/C8a12bc",
              experience: "Intermediate",
              motivation: "I love translating complex technical updates into digestible visual snippets.",
            },
          },
          {
            registrationId: "MYRA-2026-38294",
            fullName: "Ishita Roy",
            email: "ishita.roy@presidency.edu",
            phone: "8899001122",
            whatsapp: "8899001122",
            gender: "Female",
            dob: "2003-01-30",
            organization: "Presidency University",
            courseClass: "English Honours, 3rd Year",
            city: "Kolkata",
            state: "West Bengal",
            country: "India",
            category: "blog",
            timestamp: "2026-06-10T11:45:00.000Z",
            files: {
              resume: { name: "ishita_resume.pdf", url: "https://drive.google.com/mock-resume" },
              portfolio: { name: "ishita_articles.pdf", url: "https://drive.google.com/mock-portfolio" },
            },
            eventSpecificData: {
              blogLinks: "https://medium.com/@ishita_reads",
              writingPlatform: "Medium",
              preferredTopics: "Technology & Society, AI Ethics",
              writingSample: "The modern machine writes - yet who claims the copyright of the soul?",
              motivation: "I write to untangle complex relationships between artificial intelligence and human agency.",
            },
          },
        ];
        data = mockData;
        localStorage.setItem("myra_registrations", JSON.stringify(mockData));
      }
      setRegistrations(data);
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin2026" || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid password credentials. Please try again.");
    }
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === "reel") return "🎬 Reel Making";
    if (cat === "hackathon") return "💻 Hackathon";
    if (cat === "design") return "🎨 Creative & Design";
    if (cat === "blog") return "✍️ Blog Writing";
    return cat;
  };

  const getCategoryBadgeColor = (cat: string) => {
    if (cat === "reel") return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20";
    if (cat === "hackathon") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
    if (cat === "design") return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20";
    if (cat === "blog") return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
    return "bg-slate-500/10 text-slate-600";
  };

  // Filtering calculations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesQuery =
      reg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.registrationId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEvent = eventFilter === "all" || reg.category === eventFilter;

    return matchesQuery && matchesEvent;
  });

  // Export CSV Function
  const exportCSV = () => {
    const headers = ["Registration ID", "Timestamp", "Name", "Email", "Phone", "WhatsApp", "Gender", "DoB", "Organization", "Class/Designation", "City", "State", "Category"];
    const rows = filteredRegistrations.map((reg) => [
      reg.registrationId,
      new Date(reg.timestamp).toLocaleString(),
      reg.fullName,
      reg.email,
      reg.phone,
      reg.whatsapp,
      reg.gender,
      reg.dob,
      reg.organization,
      reg.courseClass,
      reg.city,
      reg.state,
      reg.category,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MYRA_Registrations_${eventFilter}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics Count
  const counts = {
    total: registrations.length,
    reel: registrations.filter((r) => r.category === "reel").length,
    hackathon: registrations.filter((r) => r.category === "hackathon").length,
    design: registrations.filter((r) => r.category === "design").length,
    blog: registrations.filter((r) => r.category === "blog").length,
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="glass-premium p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl max-w-md w-full bg-white/70 dark:bg-slate-950/70 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-md border border-indigo-500/20">
            <KeyRound className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Security Access</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Enter the admin passphrase key to inspect registered candidates and export lists.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-800 dark:text-white"
            />
            {loginError && (
              <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5 justify-center">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold tracking-wide transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Verify Access Key</span>
            </button>
            <p className="text-[10px] text-slate-400">Hint: admin2026</p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <div>
            <h1 className="text-3xl font-sans font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Admin Portal
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review event registrations, inspect attachments, and filter submissions.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md flex items-center gap-2 hover:scale-[1.01] transition-transform"
            >
              <Download className="w-4 h-4" />
              Export Filtered CSV
            </button>
          </div>
        </div>

        {/* Stats Grid Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {/* Total */}
          <div className="glass p-5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40">
            <span className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase block">Total Registrations</span>
            <span className="text-3xl font-black text-slate-900 dark:text-white mt-1.5 block">{counts.total}</span>
          </div>
          {/* Reel */}
          <div className="glass p-5 rounded-2xl border border-pink-500/10 bg-pink-500/2 dark:bg-pink-500/2">
            <span className="text-[10px] font-bold tracking-widest text-pink-500 uppercase block">Reel Making</span>
            <span className="text-3xl font-black text-pink-600 dark:text-pink-400 mt-1.5 block">{counts.reel}</span>
          </div>
          {/* Hackathon */}
          <div className="glass p-5 rounded-2xl border border-emerald-500/10 bg-emerald-500/2 dark:bg-emerald-500/2">
            <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase block">Hackathon</span>
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1.5 block">{counts.hackathon}</span>
          </div>
          {/* Design */}
          <div className="glass p-5 rounded-2xl border border-cyan-500/10 bg-cyan-500/2 dark:bg-cyan-500/2">
            <span className="text-[10px] font-bold tracking-widest text-cyan-500 uppercase block">Creative & Design</span>
            <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mt-1.5 block">{counts.design}</span>
          </div>
          {/* Blog */}
          <div className="glass p-5 rounded-2xl border border-amber-500/10 bg-amber-500/2 dark:bg-amber-500/2">
            <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase block">Blog Writing</span>
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1.5 block">{counts.blog}</span>
          </div>
        </div>

        {/* Filter Toolbar controls */}
        <div className="glass p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, Name, Email or Organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4.5 h-4.5 text-slate-400" />
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full md:w-48 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-800 dark:text-white font-semibold"
            >
              <option value="all">All Categories</option>
              <option value="reel">🎬 Reel Making</option>
              <option value="hackathon">💻 Hackathon</option>
              <option value="design">🎨 Creative & Design</option>
              <option value="blog">✍️ Blog Writing</option>
            </select>
          </div>
        </div>

        {/* Submissions Data Table */}
        <div className="glass rounded-2xl border border-slate-200/50 dark:border-slate-800/80 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/30 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Files</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/80 text-sm">
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.registrationId} className="hover:bg-slate-100/20 dark:hover:bg-slate-900/10 transition-colors text-slate-700 dark:text-slate-300">
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400">
                        {reg.registrationId}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                        {reg.fullName}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {reg.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(reg.category)}`}>
                          {getCategoryLabel(reg.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium truncate max-w-[140px]">
                        {reg.organization}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {reg.files.resume && (
                            <a
                              href={reg.files.resume.url}
                              target="_blank"
                              rel="noreferrer"
                              title={`Resume: ${reg.files.resume.name}`}
                              className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/10 hover:bg-blue-500/20"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {reg.files.portfolio && (
                            <a
                              href={reg.files.portfolio.url}
                              target="_blank"
                              rel="noreferrer"
                              title={`Portfolio: ${reg.files.portfolio.name}`}
                              className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/10 hover:bg-purple-500/20"
                            >
                              <User className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedParticipant(reg)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      No matching registration records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Modal Overlay */}
        {selectedParticipant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="glass-premium w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 bg-white dark:bg-slate-950">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Candidate Registration Card</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{selectedParticipant.fullName}</h3>
                </div>
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Details Grid */}
              <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
                {/* 1. General Info */}
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs border-b border-slate-100 dark:border-slate-900 pb-1 mb-3">
                    General Information
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div>
                      <span className="text-xs text-slate-500 block">Registration ID:</span>
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-cyan-400">{selectedParticipant.registrationId}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Registered On:</span>
                      <span>{new Date(selectedParticipant.timestamp).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Email Address:</span>
                      <span>{selectedParticipant.email}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Gender / DOB:</span>
                      <span>{selectedParticipant.gender} (DOB: {selectedParticipant.dob})</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Phone / WhatsApp:</span>
                      <span>{selectedParticipant.phone} / {selectedParticipant.whatsapp}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Institution / Org:</span>
                      <span>{selectedParticipant.organization} ({selectedParticipant.courseClass})</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Location:</span>
                      <span>{selectedParticipant.city}, {selectedParticipant.state}, {selectedParticipant.country}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Challenge Category:</span>
                      <span className="font-bold">{getCategoryLabel(selectedParticipant.category)}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Event Specific Details */}
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs border-b border-slate-100 dark:border-slate-900 pb-1 mb-3">
                    Challenge Submission Responses
                  </h4>
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                    {Object.entries(selectedParticipant.eventSpecificData).map(([key, val]: any) => (
                      <div key={key}>
                        <span className="text-xs text-slate-500 block font-semibold uppercase tracking-wide">
                          {key.replace(/([A-Z])/g, " $1")}:
                        </span>
                        {val.startsWith("http") ? (
                          <a href={val} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline break-all text-xs font-semibold">
                            {val}
                          </a>
                        ) : (
                          <span className="text-xs">{val}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Files */}
                {Object.values(selectedParticipant.files).some((f) => f !== null) && (
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs border-b border-slate-100 dark:border-slate-900 pb-1 mb-3">
                      Uploaded Assets
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedParticipant.files.resume && (
                        <a
                          href={selectedParticipant.files.resume.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <FileText className="w-4.5 h-4.5 text-blue-500" />
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block font-bold">RESUME</span>
                            <span className="text-xs font-semibold truncate max-w-[120px] block">{selectedParticipant.files.resume.name}</span>
                          </div>
                        </a>
                      )}
                      {selectedParticipant.files.portfolio && (
                        <a
                          href={selectedParticipant.files.portfolio.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <User className="w-4.5 h-4.5 text-purple-500" />
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block font-bold">PORTFOLIO</span>
                            <span className="text-xs font-semibold truncate max-w-[120px] block">{selectedParticipant.files.portfolio.name}</span>
                          </div>
                        </a>
                      )}
                      {selectedParticipant.files.support && (
                        <a
                          href={selectedParticipant.files.support.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <PlusCircle className="w-4.5 h-4.5 text-green-500" />
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block font-bold">SUPPORTING DOCS</span>
                            <span className="text-xs font-semibold truncate max-w-[120px] block">{selectedParticipant.files.support.name}</span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
