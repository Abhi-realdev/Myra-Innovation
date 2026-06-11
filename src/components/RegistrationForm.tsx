"use client";

import React, { useState } from "react";
import { Upload, AlertCircle, Loader2, Sparkles, CheckCircle } from "lucide-react";

// Types for form files
interface FormFile {
  base64: string;
  name: string;
  type: string;
}

interface RegistrationFormProps {
  initialCategory?: string;
  onSubmitSuccess: (data: { registrationId: string; category: string; name: string }) => void;
}

export default function RegistrationForm({ initialCategory = "reel", onSubmitSuccess }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // File states
  const [resumeFile, setResumeFile] = useState<FormFile | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<FormFile | null>(null);
  const [supportFile, setSupportFile] = useState<FormFile | null>(null);

  // Common Fields
  const [commonFields, setCommonFields] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    gender: "",
    dob: "",
    organization: "",
    courseClass: "",
    city: "",
    state: "",
    country: "India",
    category: initialCategory,
  });

  // Category-specific fields
  const [reelFields, setReelFields] = useState({
    instagramLink: "",
    youtubeLink: "",
    editingSoftware: "",
    bestReelLink: "",
    experience: "Beginner",
    motivation: "",
  });

  const [hackathonFields, setHackathonFields] = useState({
    programmingLanguages: "",
    githubProfile: "",
    linkedinProfile: "",
    technicalSkills: "",
    projectDescription: "",
    problemStatement: "",
  });

  const [designFields, setDesignFields] = useState({
    designTools: "",
    portfolioLink: "",
    bestWorkLink: "",
    designDomain: "UI/UX",
    creativeStatement: "",
  });

  const [blogFields, setBlogFields] = useState({
    blogLinks: "",
    writingPlatform: "Medium",
    preferredTopics: "",
    writingSample: "",
    motivation: "",
  });

  // Sync category state if changed
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommonFields((prev) => ({ ...prev, category: e.target.value }));
    setErrorMsg("");
  };

  // Helper: File to base64
  const processFile = (file: File, callback: (fileData: FormFile) => void) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg(`File ${file.name} exceeds the 10MB limit.`);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      callback({
        base64: base64String,
        name: file.name,
        type: file.type,
      });
      setErrorMsg("");
    };
    reader.readAsDataURL(file);
  };

  // Validation rules
  const validateForm = () => {
    if (!commonFields.fullName.trim()) return "Full Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(commonFields.email)) return "Enter a valid email address.";

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(commonFields.phone)) return "Phone Number must be exactly 10 digits.";
    if (!phoneRegex.test(commonFields.whatsapp)) return "WhatsApp Number must be exactly 10 digits.";

    if (!commonFields.gender) return "Please select your gender.";
    if (!commonFields.dob) return "Date of Birth is required.";
    if (!commonFields.organization.trim()) return "School/College/Organization is required.";
    if (!commonFields.courseClass.trim()) return "Course/Class details are required.";
    if (!commonFields.city.trim()) return "City is required.";
    if (!commonFields.state.trim()) return "State is required.";

    // Validate Event-specific required fields
    if (commonFields.category === "reel") {
      if (!reelFields.instagramLink.trim()) return "Instagram Profile Link is required for Reel Making.";
      if (!reelFields.editingSoftware.trim()) return "Editing Software field is required.";
      if (!reelFields.bestReelLink.trim()) return "Link to your best reel is required.";
      if (!reelFields.motivation.trim()) return "Why do you want to participate is required.";
    } else if (commonFields.category === "hackathon") {
      if (!hackathonFields.programmingLanguages.trim()) return "Programming Languages known field is required.";
      if (!hackathonFields.githubProfile.trim()) return "GitHub Profile Link is required for Hackathon.";
      if (!hackathonFields.linkedinProfile.trim()) return "LinkedIn Profile Link is required.";
      if (!hackathonFields.technicalSkills.trim()) return "Technical Skills field is required.";
      if (!hackathonFields.projectDescription.trim()) return "Project Description is required.";
      if (!hackathonFields.problemStatement.trim()) return "Problem statement to solve is required.";
    } else if (commonFields.category === "design") {
      if (!designFields.designTools.trim()) return "Design Tools used field is required.";
      if (!designFields.portfolioLink.trim()) return "Portfolio Link is required.";
      if (!designFields.bestWorkLink.trim()) return "Best Design Link is required.";
      if (!designFields.creativeStatement.trim()) return "Creative Statement is required.";
    } else if (commonFields.category === "blog") {
      if (!blogFields.preferredTopics.trim()) return "Preferred Topics field is required.";
      if (!blogFields.writingSample.trim()) return "Writing Sample / Outline is required.";
      if (!blogFields.motivation.trim()) return "Why do you want to participate is required.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    // Prepare payload
    let eventSpecificData = {};
    if (commonFields.category === "reel") eventSpecificData = reelFields;
    else if (commonFields.category === "hackathon") eventSpecificData = hackathonFields;
    else if (commonFields.category === "design") eventSpecificData = designFields;
    else if (commonFields.category === "blog") eventSpecificData = blogFields;

    const payload = {
      action: "register",
      timestamp: new Date().toISOString(),
      ...commonFields,
      eventSpecificData,
      files: {
        resume: resumeFile,
        portfolio: portfolioFile,
        support: supportFile,
      },
    };

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
      const useMock = scriptUrl === "mock-url";

      if (useMock) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const existingRaw = localStorage.getItem("myra_registrations");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const isDuplicate = existing.some(
          (reg: any) => reg.email.toLowerCase() === commonFields.email.toLowerCase() && reg.category === commonFields.category
        );

        if (isDuplicate) {
          throw new Error("You have already registered for this event category with this email address.");
        }

        const mockId = `MYRA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const localReg = {
          registrationId: mockId,
          ...payload,
          files: {
            resume: resumeFile ? { name: resumeFile.name, url: "https://drive.google.com/mock-resume-url" } : null,
            portfolio: portfolioFile ? { name: portfolioFile.name, url: "https://drive.google.com/mock-portfolio-url" } : null,
            support: supportFile ? { name: supportFile.name, url: "https://drive.google.com/mock-support-url" } : null,
          },
        };

        existing.push(localReg);
        localStorage.setItem("myra_registrations", JSON.stringify(existing));

        setLoading(false);
        onSubmitSuccess({
          registrationId: mockId,
          category: commonFields.category,
          name: commonFields.fullName,
        });
      } else {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok || result.status === "error") {
          throw new Error(result.message || "Failed to submit registration.");
        }

        if (!result.registrationId) {
          throw new Error("Registration may not have been saved. Check your Google Sheet and Apps Script deployment.");
        }

        if (!result.spreadsheetName && !result.sheetTab) {
          console.warn(
            "Registration succeeded but Apps Script may be outdated. Redeploy backend/code.js as a new version so submissions include sheet confirmation."
          );
        }

        setLoading(false);
        onSubmitSuccess({
          registrationId: result.registrationId,
          category: commonFields.category,
          name: commonFields.fullName,
        });
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="register" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-premium p-8 sm:p-12 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-2xl relative overflow-hidden bg-white/70 dark:bg-slate-950/70">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500 animate-pulse-slow" />
              Event Registration Form
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill in your details accurately. Category-specific fields will adapt dynamically based on your event selection.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Common Section Heading */}
            <div className="border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                1. General Participant Information
              </h3>
            </div>

            {/* General Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={commonFields.fullName}
                  onChange={(e) => setCommonFields({ ...commonFields, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={commonFields.email}
                  onChange={(e) => setCommonFields({ ...commonFields, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Phone Number (10 digits) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  value={commonFields.phone}
                  onChange={(e) => setCommonFields({ ...commonFields, phone: e.target.value.replace(/\D/g, "") })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  value={commonFields.whatsapp}
                  onChange={(e) => setCommonFields({ ...commonFields, whatsapp: e.target.value.replace(/\D/g, "") })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Gender *
                </label>
                <select
                  required
                  value={commonFields.gender}
                  onChange={(e) => setCommonFields({ ...commonFields, gender: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={commonFields.dob}
                  onChange={(e) => setCommonFields({ ...commonFields, dob: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  School / College / Company *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter organization name"
                  value={commonFields.organization}
                  onChange={(e) => setCommonFields({ ...commonFields, organization: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* Course / Class / Designation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Course / Class / Designation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech CSE / Class XII / Developer"
                  value={commonFields.courseClass}
                  onChange={(e) => setCommonFields({ ...commonFields, courseClass: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter city"
                  value={commonFields.city}
                  onChange={(e) => setCommonFields({ ...commonFields, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter state"
                  value={commonFields.state}
                  onChange={(e) => setCommonFields({ ...commonFields, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={commonFields.country}
                  onChange={(e) => setCommonFields({ ...commonFields, country: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-800 dark:text-white"
                />
              </div>

              {/* Event Category Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Event Category Selection *
                </label>
                <select
                  required
                  value={commonFields.category}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200/85 dark:border-slate-800/85 bg-white/60 dark:bg-slate-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800 dark:text-white font-bold"
                >
                  <option value="reel">🎬 Reel Making</option>
                  <option value="hackathon">💻 Hackathon</option>
                  <option value="design">🎨 Creative & Design</option>
                  <option value="blog">✍️ Blog Writing</option>
                </select>
              </div>
            </div>

            {/* Dynamic Event-Specific Fields */}
            <div className="space-y-6 pt-4">
              <div className="border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
                <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  2. Challenge-Specific Details
                </h3>
              </div>

              {commonFields.category === "reel" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Instagram Profile Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://instagram.com/username"
                      value={reelFields.instagramLink}
                      onChange={(e) => setReelFields({ ...reelFields, instagramLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">YouTube Channel Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/@channel"
                      value={reelFields.youtubeLink}
                      onChange={(e) => setReelFields({ ...reelFields, youtubeLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Editing Software Used *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Premiere Pro, CapCut, DaVinci"
                      value={reelFields.editingSoftware}
                      onChange={(e) => setReelFields({ ...reelFields, editingSoftware: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Best Reel/Video Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="Paste link to your best reel"
                      value={reelFields.bestReelLink}
                      onChange={(e) => setReelFields({ ...reelFields, bestReelLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Experience Level *</label>
                    <select
                      value={reelFields.experience}
                      onChange={(e) => setReelFields({ ...reelFields, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    >
                      <option value="Beginner">Beginner (&lt; 1 year)</option>
                      <option value="Intermediate">Intermediate (1-3 years)</option>
                      <option value="Expert">Expert (3+ years)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Why do you want to participate? *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly tell us what drives you as a content creator"
                      value={reelFields.motivation}
                      onChange={(e) => setReelFields({ ...reelFields, motivation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {commonFields.category === "hackathon" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Programming Languages Known *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. JavaScript, Python, Rust, Go"
                      value={hackathonFields.programmingLanguages}
                      onChange={(e) => setHackathonFields({ ...hackathonFields, programmingLanguages: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">GitHub Profile Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/username"
                      value={hackathonFields.githubProfile}
                      onChange={(e) => setHackathonFields({ ...hackathonFields, githubProfile: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">LinkedIn Profile Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://linkedin.com/in/username"
                      value={hackathonFields.linkedinProfile}
                      onChange={(e) => setHackathonFields({ ...hackathonFields, linkedinProfile: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Technical Skills & Frameworks *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next.js, Docker, PyTorch, SQL"
                      value={hackathonFields.technicalSkills}
                      onChange={(e) => setHackathonFields({ ...hackathonFields, technicalSkills: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Project Description (Mock/Planned) *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe what product or prototype you are planning to build during the Hackathon"
                      value={hackathonFields.projectDescription}
                      onChange={(e) => setHackathonFields({ ...hackathonFields, projectDescription: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Problem Statement You Want To Solve *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="What real-world pain point or challenge does your code address?"
                      value={hackathonFields.problemStatement}
                      onChange={(e) => setHackathonFields({ ...hackathonFields, problemStatement: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {commonFields.category === "design" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Design Tools Used *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Figma, Illustrator, Photoshop, Blender"
                      value={designFields.designTools}
                      onChange={(e) => setDesignFields({ ...designFields, designTools: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Design Portfolio Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://behance.net/username or personal site"
                      value={designFields.portfolioLink}
                      onChange={(e) => setDesignFields({ ...designFields, portfolioLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Link to your Best Work *</label>
                    <input
                      type="url"
                      required
                      placeholder="Paste direct link to your single best artwork/mockup"
                      value={designFields.bestWorkLink}
                      onChange={(e) => setDesignFields({ ...designFields, bestWorkLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Preferred Design Domain *</label>
                    <select
                      value={designFields.designDomain}
                      onChange={(e) => setDesignFields({ ...designFields, designDomain: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    >
                      <option value="UI/UX">UI/UX Design</option>
                      <option value="Graphic Design">Graphic Design & Print</option>
                      <option value="3D Art">3D Modeling & Art</option>
                      <option value="Motion Graphics">Motion Graphics & VFX</option>
                      <option value="Branding">Branding & Corporate Identity</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Creative Statement / Philosophy *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your design style, aesthetic principles, and what inspires your layouts"
                      value={designFields.creativeStatement}
                      onChange={(e) => setDesignFields({ ...designFields, creativeStatement: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {commonFields.category === "blog" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Blog / Article Links (Optional)</label>
                    <input
                      type="url"
                      placeholder="Paste link to previously published article"
                      value={blogFields.blogLinks}
                      onChange={(e) => setBlogFields({ ...blogFields, blogLinks: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Primary Writing Platform *</label>
                    <select
                      value={blogFields.writingPlatform}
                      onChange={(e) => setBlogFields({ ...blogFields, writingPlatform: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    >
                      <option value="Medium">Medium</option>
                      <option value="Substack">Substack</option>
                      <option value="Personal Blog">Personal Website</option>
                      <option value="LinkedIn">LinkedIn Articles</option>
                      <option value="Other">Other Platform</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Preferred Topics / Niches *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI Ethics, Tech Disruption, Design Trends"
                      value={blogFields.preferredTopics}
                      onChange={(e) => setBlogFields({ ...blogFields, preferredTopics: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Writing Sample / Core Article Outline *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Provide a short sample paragraph or a structured outline of the article you wish to write"
                      value={blogFields.writingSample}
                      onChange={(e) => setBlogFields({ ...blogFields, writingSample: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Why do you want to participate? *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly state your motivation for choosing the Editorial Blog Writing category"
                      value={blogFields.motivation}
                      onChange={(e) => setBlogFields({ ...blogFields, motivation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 text-sm focus:outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* File Upload Section */}
            <div className="space-y-6 pt-4">
              <div className="border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
                <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  3. Submissions & Document Uploads (Max 10MB each)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Resume Upload */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center hover:border-blue-500/50 transition-colors relative">
                  <Upload className="w-8 h-8 text-slate-400 mb-3" />
                  <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">Upload Resume *</span>
                  <span className="text-[10px] text-slate-400 mt-1">PDF or DOCX</span>
                  <input
                    type="file"
                    required
                    accept=".pdf,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        processFile(e.target.files[0], setResumeFile);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {resumeFile && (
                    <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold max-w-full">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{resumeFile.name}</span>
                    </div>
                  )}
                </div>

                {/* Portfolio Upload */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center hover:border-blue-500/50 transition-colors relative">
                  <Upload className="w-8 h-8 text-slate-400 mb-3" />
                  <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">Upload Portfolio *</span>
                  <span className="text-[10px] text-slate-400 mt-1">PDF or ZIP</span>
                  <input
                    type="file"
                    required
                    accept=".pdf,.zip"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        processFile(e.target.files[0], setPortfolioFile);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {portfolioFile && (
                    <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold max-w-full">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{portfolioFile.name}</span>
                    </div>
                  )}
                </div>

                {/* Supporting Documents Upload */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center hover:border-blue-500/50 transition-colors relative">
                  <Upload className="w-8 h-8 text-slate-400 mb-3" />
                  <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">Supporting Docs</span>
                  <span className="text-[10px] text-slate-400 mt-1">PDF, ZIP, PNG, JPG (Optional)</span>
                  <input
                    type="file"
                    accept=".pdf,.zip,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        processFile(e.target.files[0], setSupportFile);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {supportFile && (
                    <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold max-w-full">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{supportFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message banner */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-650 dark:text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-extrabold text-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl shadow-blue-500/20 dark:shadow-purple-500/10 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Challenge Registration</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
