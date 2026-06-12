"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Categories, { EventCategoryType } from "@/components/Categories";
import Prizes from "@/components/Prizes";
import RegistrationForm from "@/components/RegistrationForm";
import SuccessPage from "@/components/SuccessPage";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<EventCategoryType>("reel");
  const [activeSection, setActiveSection] = useState("home");

  const [registeredUser, setRegisteredUser] = useState<{
    registrationId: string;
    category: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (registeredUser) return;

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
    <div className="min-h-screen bg-white">
      <Navbar activeSection={registeredUser ? "" : activeSection} />

      {registeredUser ? (
        <SuccessPage
          registrationId={registeredUser.registrationId}
          category={registeredUser.category}
          name={registeredUser.name}
          onGoBack={handleReset}
        />
      ) : (
        <main className="relative">
          <Hero />
          <About />
          <Categories
            selectedCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
          <Prizes />
          <div className="bg-[#f47621]/10">
            <RegistrationForm
              initialCategory={activeCategory}
              onSubmitSuccess={handleRegistrationSuccess}
            />
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
