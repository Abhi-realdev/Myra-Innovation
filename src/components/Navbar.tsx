"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Event", href: "#about" },
    { name: "Registration", href: "#register" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-[#f47621]/20"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <a href="#home" className="flex-shrink-0 flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/myra-logo.png"
                alt="MYRA'S GLOBAL TECH Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg tracking-wide text-slate-900 hidden sm:inline">
              MYRA'S <span className="text-[#f47621]">GLOBAL TECH</span>
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                  activeSection === item.href.substring(1)
                    ? "text-[#f47621] font-semibold"
                    : "text-slate-600 hover:text-[#f47621]"
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f47621] rounded-full" />
                )}
              </a>
            ))}
            <a
              href="#register"
              className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold"
            >
              Register Now
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#f47621] hover:bg-[#f47621]/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#f47621]/20 shadow-lg transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.href.substring(1)
                  ? "bg-[#f47621]/10 text-[#f47621] border-l-2 border-[#f47621]"
                  : "text-slate-700 hover:bg-[#f47621]/20"
              }`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setIsOpen(false)}
            className="block mt-2 btn-primary px-4 py-2.5 rounded-xl text-center text-sm font-semibold"
          >
            Register Now
          </a>
        </div>
      </div>
    </nav>
  );
}
