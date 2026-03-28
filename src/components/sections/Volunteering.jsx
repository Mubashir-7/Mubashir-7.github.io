import React from "react";
import { VolunteeringTabs } from "@/components/ui/volunteering-tabs";

export default function Volunteering() {
  return (
    <section
      id="volunteering"
      className="section-padding bg-black"
      aria-label="Volunteering section"
    >
      <div className="content-wrapper">
        <div className="mb-12 animate-slide-up text-center md:text-left">
          <p className="section-label">Giving back</p>
          <h2 className="section-title">Volunteering</h2>
          <div className="divider mx-auto md:mx-0" aria-hidden="true" />
          <p className="section-subtitle max-w-2xl mx-auto md:mx-0">
            A look into some of my community service, ranging from organizing food drives to actively participating in environmental campaigns.
          </p>
        </div>

        <VolunteeringTabs />
      </div>
    </section>
  );
}
