import React from "react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import projectData from '../../../public/projects.json'
import { Github } from "lucide-react";

export default function AdditionalProjectsGallery() {
  const { 
    llm_and_agentic_ai,
    healthcare_and_predictive_ai,
    nlp_and_data_science, 
    engineering_and_simulations 
  } = projectData.project_portfolio.projects;

  // Reusable builder for rich projects with tech stacks and key contributions
  const renderRichProjects = (projects) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full">
      {projects.map((project, idx) => (
        <div key={idx} className="flex flex-col gap-y-4 bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start">
             <div>
               <h2 className="text-2xl font-bold text-white tracking-tight">{project.name}</h2>
               <p className="text-accent text-sm font-medium mt-1">{project.subtitle}</p>
             </div>
             <a href="https://github.com/Mubashir-7" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="View on GitHub">
                <Github size={20} />
             </a>
          </div>
          
          {project.description && (
            <p className="text-sm text-neutral-300 leading-relaxed mt-1">
              {project.description}
            </p>
          )}

          {project.key_contributions && (
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Key Contributions</h4>
              <ul className="space-y-2">
                {project.key_contributions.map((contrib, i) => (
                  <li key={i} className="flex gap-2 text-sm text-neutral-300">
                    <span className="text-white/30">▹</span> {contrib}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {project.tech_stack && (
            <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {project.tech_stack.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-mono text-neutral-300">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Tab: Engineering & Simulations
  const engineeringContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
      {engineering_and_simulations.filter(p => p.name !== "AI Self-Driving Car").map((project, idx) => (
        <div key={idx} className="flex flex-col gap-y-3 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
            <a href="https://github.com/Mubashir-7" target="_blank" rel="noreferrer" className="text-white/30 hover:text-white transition-colors flex-shrink-0" aria-label="View on GitHub">
               <Github size={18} />
            </a>
          </div>
          <p className="text-sm text-accent font-medium">{project.category}</p>
          
          {project.description ? (
            <p className="text-sm text-neutral-300 leading-relaxed mt-1">
              {project.description}
            </p>
          ) : project.types ? (
            <ul className="mt-2 space-y-1">
               {project.types.map((type, i) => (
                 <li key={i} className="text-sm text-neutral-300 flex gap-2">
                   <span className="text-white/30">•</span> {type}
                 </li>
               ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );

  const tabs = [
    {
      id: "llm-ai",
      label: "LLM & Agentic AI",
      content: renderRichProjects(llm_and_agentic_ai),
    },
    {
      id: "healthcare-ai",
      label: "Healthcare & Predictive AI",
      content: renderRichProjects(healthcare_and_predictive_ai),
    },
    {
      id: "nlp-data",
      label: "NLP & Data Science",
      content: renderRichProjects(nlp_and_data_science),
    },
    {
      id: "engineering",
      label: "Engineering & Simulations",
      content: engineeringContent,
    }
  ];

  return (
    <div className="mt-32 w-full">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-3">Other Technical Endeavors</h3>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Explore secondary projects spanning Natural Language Processing, complex data science models, and low-level software engineering simulations.
        </p>
      </div>
      <AnimatedTabs tabs={tabs} />
      
      <div className="mt-16 flex justify-center">
         <a 
           href="https://github.com/Mubashir-7" 
           target="_blank" 
           rel="noreferrer" 
           className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium text-white"
         >
           <Github size={20} className="group-hover:scale-110 transition-transform" />
           View Complete Portfolio on GitHub
         </a>
      </div>
    </div>
  );
}
