"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultTabs = [
  {
    id: "iftar",
    label: "Iftar Volunteering",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="/iftar.png"
          alt="Iftar Volunteering Certificate"
          className="rounded-lg w-full md:h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />

        <div className="flex flex-col gap-y-3 justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Iftar Volunteering Drive
          </h2>
          <p className="text-sm text-neutral-300 mt-0 leading-relaxed">
            Actively participated in organizing and distributing Iftar meals to those in need during the holy month. Handled logistics, food packaging, and distribution to ensure seamless operations and community support.
          </p>
          <div className="mt-2 text-xs font-medium text-accent uppercase tracking-wider">
            Community Service • Logistics
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "blood",
    label: "Blood Donation",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="/blood.png"
          alt="Blood Donation Certificate"
          className="rounded-lg w-full md:h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-3 justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Blood Donation Campaign
          </h2>
          <p className="text-sm text-neutral-300 mt-0 leading-relaxed">
            Contributed to the annual blood donation campaign by donating blood and volunteering. Facilitated donor registrations, managed crowd flow, and ensured a safe and comfortable environment for contributors.
          </p>
          <div className="mt-2 text-xs font-medium text-accent uppercase tracking-wider">
            Healthcare • Organizing
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "meal",
    label: "Meal Distribution",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="/meal.png"
          alt="Meal Distribution Work"
          className="rounded-lg w-full md:h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-3 justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Meal Volunteering Work
          </h2>
          <p className="text-sm text-neutral-300 mt-0 leading-relaxed">
            Volunteered to prepare, package, and distribute meals to underprivileged communities. Managed the supply chain of raw materials and coordinated with local NGOs to ensure structured food drives.
          </p>
          <div className="mt-2 text-xs font-medium text-accent uppercase tracking-wider">
            Social Welfare • Operations
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "plantation",
    label: "Mega Plantation Drive",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <div className="rounded-lg w-full h-40 md:h-60 flex items-center justify-center bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <a href="/plantation.pdf" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 text-white hover:text-accent transition-colors">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium text-sm">View Certificate (PDF)</span>
            </a>
        </div>
        <div className="flex flex-col gap-y-3 justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Mega Plantation Drive
          </h2>
          <p className="text-sm text-neutral-300 mt-0 leading-relaxed">
            Participated in the Mega Plantation Drive initiative, planting hundreds of saplings across the city to combat climate change. Led teams in determining optimal soil locations and ensuring post-plantation hydration schedules.
          </p>
          <div className="mt-2 text-xs font-medium text-accent uppercase tracking-wider">
            Environment • Leadership
          </div>
        </div>
      </div>
    ),
  },
];

const VolunteeringTabs = ({
  tabs = defaultTabs,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-5xl mx-auto flex flex-col items-center gap-y-6", className)}>
      <div className="flex gap-2 flex-wrap justify-center bg-[#11111198] bg-opacity-50 backdrop-blur-sm p-1.5 rounded-xl border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-lg text-white outline-none transition-colors"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="volunteering-active-tab"
                className="absolute inset-0 bg-[#111111d1] bg-opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm !rounded-lg border border-white/10"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 w-full bg-[#11111198] shadow-[0_0_30px_rgba(0,0,0,0.3)] text-white bg-opacity-50 backdrop-blur-md rounded-2xl border border-white/10 min-h-[300px] h-full overflow-hidden relative">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: -10,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: "circInOut",
                  type: "spring",
                }}
                className="w-full h-full inset-0 flex items-center justify-center p-2"
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { VolunteeringTabs };
