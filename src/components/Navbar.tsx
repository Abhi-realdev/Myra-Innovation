"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
}

export default function Navbar({ darkMode, toggleDarkMode, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Event", href: "#about" },
    { name: "Categories", href: "#categories" },
    { name: "Prizes", href: "#prizes" },
    { name: "Registration", href: "#register" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 ring-1 ring-blue-100 dark:ring-blue-900/40 flex-shrink-0">
              <Image
                src="/myra-logo.png"
                alt="MYRA Global Tech Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-sans font-bold text-lg tracking-wider text-blue-950 dark:text-white transition-colors">
              MYRA <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 font-extrabold">GLOBAL TECH</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-all duration-200 hover:text-blue-500 dark:hover:text-cyan-400 relative py-1 ${
                  activeSection === item.href.substring(1)
                    ? "text-blue-600 dark:text-cyan-400 font-semibold"
                    : "text-blue-950/70 dark:text-slate-300"
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                )}
              </a>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full glass hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full glass text-slate-600 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-blue-600" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl glass text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass transition-all duration-300 ease-in-out border-t border-slate-200/50 dark:border-slate-800/50 ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1.5 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                activeSection === item.href.substring(1)
                  ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-cyan-400 border-l-2 border-blue-500"
                  : "text-blue-900 dark:text-slate-300 hover:bg-blue-50/60 dark:hover:bg-slate-800/50"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
