"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Categories, { EventCategoryType } from "@/components/Categories";
import Prizes from "@/components/Prizes";
import RegistrationForm from "@/components/RegistrationForm";
import SuccessPage from "@/components/SuccessPage";
import { Heart } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeCategory, setActiveCategory] = useState<EventCategoryType>("reel");
  const [activeSection, setActiveSection] = useState("home");
  
  // Registration Success receipt details
  const [registeredUser, setRegisteredUser] = useState<{
    registrationId: string;
    category: string;
    name: string;
  } | null>(null);

  // Initialize Dark Mode on mount
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = localStorage.getItem("theme") !== "light";
    setDarkMode(isDark);
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // Theme Toggler
  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  // Scroll section tracking observer
  useEffect(() => {
    if (registeredUser) return; // Disable scroll tracking if success page is shown

    const sections = ["home", "about", "categories", "prizes", "register"];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [registeredUser]);

  const handleSelectCategory = (category: EventCategoryType) => {
    setActiveCategory(category);
    // Smooth scroll to categories section
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegistrationSuccess = (data: { registrationId: string; category: string; name: string }) => {
    setRegisteredUser(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setRegisteredUser(null);
    setActiveSection("home");
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""} transition-colors duration-500`}>
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={registeredUser ? "" : activeSection}
      />

      {/* Success Page or Main Flow */}
      {registeredUser ? (
        <SuccessPage
          registrationId={registeredUser.registrationId}
          category={registeredUser.category}
          name={registeredUser.name}
          onGoBack={handleReset}
        />
      ) : (
        <main className="relative">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Dynamic Event Categories tab section */}
          <div className={`theme-${activeCategory} transition-colors duration-500`}>
            <Categories
              selectedCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* Prizes Section */}
          <Prizes />

          {/* Registration Section */}
          <div className="bg-slate-50/50 dark:bg-slate-950/20">
            <RegistrationForm
              initialCategory={activeCategory}
              onSubmitSuccess={handleRegistrationSuccess}
            />
          </div>
        </main>
      )}

      {/* Premium Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-800 pb-8 mb-8 text-center md:text-left">
            
            {/* Left Column Logo */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/myra-logo.png"
                    alt="MYRA Global Tech Logo"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
                <span className="font-sans font-bold text-white text-md tracking-wider">
                  MYRA <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-extrabold">GLOBAL TECH</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                Where Creativity Meets Technology
              </span>
            </div>

            {/* Middle Column contact */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Contact & Support</span>
              <span className="text-xs text-slate-400">Email: support@myraglobaltech.com</span>
              <span className="text-xs text-slate-400">Phone: +91 98765 43210</span>
            </div>

            {/* Right Column details */}
            <div className="flex flex-col items-center md:items-end gap-1.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Important Timelines</span>
              <span className="text-xs text-slate-400">Registrations Close: Jan 05, 2026</span>
              <span className="text-xs text-slate-400">Results Declared: Jan 25, 2026</span>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} MYRA Global Tech. All rights reserved.
            </p>
            <p className="text-xs text-slate-550 flex items-center justify-center gap-1 select-none">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> for India's Brightest Innovators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
