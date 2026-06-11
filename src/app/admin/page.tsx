import React from "react";
import Dashboard from "@/components/Dashboard";

export const metadata = {
  title: "Admin Dashboard - MYRA Innovation Challenge 2026",
  description: "Administrative console to inspect, search, and export registration submissions.",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
      {/* Decorative top header highlight */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-650" />
      
      <Dashboard />
    </main>
  );
}
