import React from "react";
import { Timeline } from "@/components/ui/timeline";
import profileData from '../../../public/professional-profile.json'

export default function ExperienceTimeline() {
  const { experience, education } = profileData;

  const experienceData = experience.map((exp) => {
    // Check if the experience has multiple roles
    const isMultipleRoles = exp.roles && exp.roles.length > 0;
    
    // For single role structure
    const roleTitle = isMultipleRoles ? exp.roles[0].title : exp.role;
    const duration = isMultipleRoles ? exp.roles[0].duration : exp.duration;
    const responsibilities = isMultipleRoles ? exp.roles[0].responsibilities : exp.responsibilities;
    const yearMatch = duration.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : "Present";
    
    return {
      title: year,
      content: (
        <div>
          <h4 className="text-white text-2xl md:text-3xl font-bold mb-2">
            {roleTitle} <span className="text-neutral-500 font-medium">@ {exp.company}</span>
          </h4>
          <p className="text-neutral-400 text-sm md:text-base font-normal mb-8">
            {duration} • {isMultipleRoles ? exp.roles[0].location : exp.location}
          </p>
          
          {responsibilities && (
            <div className="space-y-4">
              {responsibilities.map((resp, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-white mt-1.5 opacity-50">▹</span>
                  <span className="text-neutral-300 text-base leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>
          )}

          {/* Render older roles in the same company if any */}
          {isMultipleRoles && exp.roles.length > 1 && (
             <div className="mt-8 pt-8 border-t border-neutral-800">
               {exp.roles.slice(1).map((subRole, idx) => (
                 <div key={idx} className="mb-6 last:mb-0">
                    <h5 className="text-white text-xl font-semibold mb-1">{subRole.title}</h5>
                    <p className="text-neutral-400 text-sm mb-4">
                      {subRole.duration} • {subRole.location}
                    </p>
                    {subRole.responsibilities && (
                      <div className="space-y-3">
                        {subRole.responsibilities.map((r, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <span className="text-white mt-1 opacity-50 text-sm">▹</span>
                            <span className="text-neutral-400 text-sm">{r}</span>
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
               ))}
             </div>
          )}
        </div>
      ),
    };
  });

  const educationData = education.map((edu) => {
    const yearMatch = edu.duration.match(/\d{4}$/);
    const year = yearMatch ? yearMatch[0] : edu.duration;

    return {
      title: year,
      content: (
        <div>
           <h4 className="text-white text-2xl md:text-3xl font-bold mb-2">
            {edu.degree}
          </h4>
          <p className="text-neutral-400 text-sm md:text-base font-normal mb-2">
            {edu.institution}
          </p>
           <p className="text-neutral-500 text-sm font-normal mb-4">
            {edu.duration}
          </p>
          {edu.coursework && (
            <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-neutral-300 font-medium mb-2">Relevant Coursework:</p>
              <p className="text-sm text-neutral-400 leading-relaxed">{edu.coursework}</p>
            </div>
          )}
        </div>
      )
    };
  });

  return (
    <section id="experience" aria-label="Experience & Education" className="bg-black py-10">
      <div className="mb-20">
        <Timeline data={experienceData} title="Professional Experience" subtitle="A timeline of my professional journey in AI." />
      </div>
      <div>
        <Timeline data={educationData} title="Education History" subtitle="My academic background and qualifications." />
      </div>
    </section>
  );
}
