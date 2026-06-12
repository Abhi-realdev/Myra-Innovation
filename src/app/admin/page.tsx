import React from "react";
import Dashboard from "@/components/Dashboard";

export const metadata = {
  title: "Admin Dashboard - MYRA'S INNOVATION CHALLENGE 2026",
  description: "Administrative console to inspect, search, and export registration submissions.",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="h-1.5 w-full bg-[#f47621]" />
      <Dashboard />
    </main>
  );
}
