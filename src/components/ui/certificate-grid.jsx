"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CopyIcon, ShieldCheckIcon, GraduationCapIcon, CpuIcon, DatabaseIcon, CodeIcon, LineChartIcon, SettingsIcon, GitMergeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to pick an icon based on title keywords
const getIconForTitle = (title) => {
  const t = title.toLowerCase();
  if (t.includes("ai") || t.includes("agent") || t.includes("machine learning")) return <CpuIcon className="w-5 h-5" />;
  if (t.includes("data") || t.includes("sql")) return <DatabaseIcon className="w-5 h-5" />;
  if (t.includes("software") || t.includes("backend") || t.includes("python") || t.includes("django")) return <CodeIcon className="w-5 h-5" />;
  if (t.includes("analytics") || t.includes("science")) return <LineChartIcon className="w-5 h-5" />;
  if (t.includes("management") || t.includes("governance") || t.includes("quality")) return <ShieldCheckIcon className="w-5 h-5" />;
  if (t.includes("devops") || t.includes("architecture")) return <GitMergeIcon className="w-5 h-5" />;
  return <GraduationCapIcon className="w-5 h-5" />;
};

const certificatesData = [
  { title: "Generative AI", issuer: "Professional Certification", date: "2024", url: "/genai_cert.pdf" },
  { title: "AI Agent Development", issuer: "Specialization", date: "2024", url: "/ai_agent_cert.pdf" },
  { title: "Autonomous Agents System", issuer: "Job Simulation", date: "2024", url: "/autonomous_agent_cert.pdf" },
  { title: "AI in Action", issuer: "Job Simulation", date: "2024", url: "/ai_in_action_cert.pdf" },
  { title: "Machine Learning & Deep Learning with Python", issuer: "Diploma", date: "2023", url: "/python_deep_learning_cert.pdf" },
  { title: "Data Science", issuer: "Job Simulation", date: "2023", url: "/data_science_cert.pdf" },
  { title: "Data Quality, Management & Governance", issuer: "Specialization", date: "2023", url: "/data_governance_cert.pdf" },
  { title: "Software Engineering", issuer: "Job Simulation", date: "2024", url: "/software_engineering_cert.pdf" },
  { title: "Backend Development", issuer: "Professional Certificate", date: "2023", url: "/backend_dev_cert.pdf" },
  { title: "Python & Django REST API", issuer: "Bootcamp", date: "2023", url: "/django_cert.pdf" },
  { title: "Professional Python Development", issuer: "Diploma", date: "2023", url: "/python_diploma_cert.pdf" },
  { title: "The Complete Microsoft SQL Server", issuer: "Masterclass", date: "2023", url: "/sql_server_cert.pdf" },
  { title: "DevOps Engineering", issuer: "Professional Certificate", date: "2024", url: "/devops_cert.pdf" },
  { title: "Project Management", issuer: "Professional Certificate", date: "2024", url: "/project_management_cert.png" },
  { title: "ISO 42001 AIMS", issuer: "Global Standard", date: "2024", url: "/iso_cert.jpg" },
];

export function CertificateGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show 6 items initially, or all if expanded
  const visibleCertificates = isExpanded ? certificatesData : certificatesData.slice(0, 6);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center mt-12 mb-8">
      
      {/* Grid Container */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      >
        <AnimatePresence>
          {visibleCertificates.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-start gap-4 z-10">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  {getIconForTitle(cert.title)}
                </div>
                
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium tracking-wide uppercase">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>

              {/* View Arrow icon that slides in */}
              <div className="absolute bottom-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-neutral-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less Button */}
      {certificatesData.length > 6 && (
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-10 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2"
        >
          {isExpanded ? (
            <>
              Collapse Gallery
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </>
          ) : (
            <>
              View All {certificatesData.length} Credentials
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </motion.button>
      )}

    </div>
  );
}
