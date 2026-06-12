import Image from "next/image";
import { Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "https://www.myraglobaltech.com/about-us" },
  { name: "Services", href: "https://www.myraglobaltech.com/#services" },
  { name: "Blog", href: "https://www.myraglobaltech.com/blog" },
  { name: "Careers", href: "https://www.myraglobaltech.com/career" },
  { name: "Contact", href: "https://www.myraglobaltech.com/contact-us" },
];

const serviceLinks = [
  { name: "SaaS", href: "https://www.myraglobaltech.com/#services" },
  { name: "BaaS", href: "https://www.myraglobaltech.com/#services" },
  { name: "CaaS", href: "https://www.myraglobaltech.com/#services" },
  { name: "IaaS", href: "https://www.myraglobaltech.com/#services" },
  { name: "MaaS", href: "https://www.myraglobaltech.com/#services" },
  { name: "PaaS", href: "https://www.myraglobaltech.com/#services" },
  { name: "KaaS", href: "https://www.myraglobaltech.com/#services" },
  { name: "TaaS", href: "https://www.myraglobaltech.com/#services" },
];

const socialLinks = [
  { name: "MYRA'S GLOBAL TECH", href: "https://www.myraglobaltech.com/", icon: Globe },
  { name: "Contact", href: "https://www.myraglobaltech.com/#contact", icon: Share2 },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <a href="https://www.myraglobaltech.com/" className="inline-flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                <Image
                  src="/myra-logo.png"
                  alt="MYRA'S GLOBAL TECH Logo"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold text-lg tracking-wide text-white">
                MYRA'S <span className="text-[#f47621]">GLOBAL TECH</span>
              </span>
            </a>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Building next-generation technology solutions while empowering talent with industry-ready skills. Based in Hyderabad, serving globally.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f47621]/100 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#f47621] mb-5">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-slate-300 hover:text-[#f47621] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#f47621] mb-5">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-300 hover:text-[#f47621] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#f47621] mb-5">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#f47621] mt-0.5 shrink-0" />
                <a href="mailto:support@myraglobaltech.com" className="hover:text-[#f47621] transition-colors">
                  support@myraglobaltech.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#f47621] mt-0.5 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#f47621] mt-0.5 shrink-0" />
                <span>
                  23 GOKUL BRINDAVANAM, Simhapuri Colony Rd, Bowrampet, Hyderabad, Telangana 500043
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} MYRA'S GLOBAL TECH. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            MYRA'S INNOVATION CHALLENGE 2026 — An official initiative by{" "}
            <a
              href="https://www.myraglobaltech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f47621] hover:text-[#e66a1b] transition-colors"
            >
              MYRA'S GLOBAL TECH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
