import React from "react";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";

const SKILLS_DATA = [
  {
    id: "skill-1",
    title: "AI, Machine Learning & LLMs",
    description: "Core AI/ML: Machine Learning, Deep Learning, Model Training & Evaluation, Neural Networks, Reinforcement Learning, Transformers.",
    subText: "LLMs & Agents: GPT-4, GPT-4o Mini, Gemini, RAG (Retrieval-Augmented Generation), Prompt Engineering, Multi-Agent Systems, Agentic AI Architectures."
  },
  {
    id: "skill-2",
    title: "NLP & Speech",
    description: "Natural Language Processing, Embeddings (Voyage AI), Semantic Search, Conversational AI.",
    subText: "STT (Speech-to-Text), TTS (Text-to-Speech)."
  },
  {
    id: "skill-3",
    title: "Vibe Coding & Full-Stack Execution",
    description: "Web & App Development: Rapid prototyping and deployment of production-grade web and mobile applications using modern frameworks.",
    subText: "Custom Software Solutions: Architecting end-to-end systems where LLMs and automation are seamlessly integrated into custom business software. Mastery of Python, JavaScript, PHP, and SQL to build everything from responsive frontends to scalable backend architectures."
  },
  {
    id: "skill-4",
    title: "Data & Systems",
    description: "Programming Languages: Python, C, C++, SQL, PHP, JavaScript.",
    subText: "Data Engineering & Systems: Big Data, Data Pipelines, Vector Databases, Data Structures & Algorithms, Linux Kernel Development and Optimization. Statistical Analysis, Numerical Computing, Data Visualization."
  },
  {
    id: "skill-5",
    title: "Professional & Leadership",
    description: "Project Management: Agile Delivery (Scrum/Sprints), Milestone Tracking, and Technical Leadership. Strategic Consulting: Client Consulting, Stakeholder Management, and translating business \"vibes\" and goals into technical execution plans.",
    subText: "Founder's Note: I don't just build models; I ship solutions. Whether it’s a custom AI agent, a mobile app, or a complex web ecosystem, I focus on the architecture that makes the technology work for the user."
  }
];

export default function SkillsGallery() {
  return (
    <section id="skills" className="bg-black py-20 text-white min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 lg:gap-16">
          {/* Static Left Side Pinned Headers */}
          <div className="left-0 top-0 lg:sticky lg:h-svh lg:py-32">
            <h5 className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">My Arsenal</h5>
            <h2 className="mb-6 mt-4 text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Executing <br />
              <span className="text-white/50 italic font-serif">Solutions</span>
            </h2>
            <p className="max-w-md text-lg text-neutral-400 leading-relaxed font-light">
              From low-level data engineering and robust machine learning pipelines to shipping full-stack agentic applications, my tech stack bridges the gap between deep AI research and scalable product development.
            </p>
          </div>
          
          {/* Right Side Stacked Scrolling Cards */}
          <ContainerScroll className="min-h-[400vh] py-12 lg:py-32" incrementY={20} incrementZ={5}>
            {SKILLS_DATA.map((skill, index) => {
               // Calculate alternate styling logic
               const isDark = index % 2 === 0;
               return (
                  <CardSticky
                    key={skill.id}
                    index={index + 2}
                    className={`rounded-3xl border p-8 md:p-12 shadow-2xl backdrop-blur-xl transition-all ${
                       isDark 
                         ? "bg-[#0a0a0a] border-white/10 text-white shadow-black/80" 
                         : "bg-[#111] border-accent/20 text-white shadow-black/60"
                    }`}
                  >
                    <div className="flex flex-col h-full gap-4 relative">
                      {/* Big Background Number Layer */}
                      <div className="absolute top-0 right-0 -mr-6 -mt-10 opacity-5 select-none font-bold text-9xl tracking-tighter">
                         {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="flex items-center justify-between gap-4 z-10 mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight w-4/5 py-1">
                          {skill.title}
                        </h2>
                        <h3 className="text-2xl font-bold text-accent/80 opacity-50 font-mono self-start mt-2">
                          0{index + 1}.
                        </h3>
                      </div>
                      
                      <div className="z-10 bg-white/5 p-6 rounded-2xl border border-white/5">
                        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-medium">
                           {skill.description}
                        </p>
                      </div>

                      <div className="mt-4 z-10 p-2">
                        <p className="text-base text-neutral-400 leading-relaxed">
                           {skill.subText}
                        </p>
                      </div>
                    </div>
                  </CardSticky>
               )
            })}
          </ContainerScroll>
        </div>
      </div>
    </section>
  )
}
