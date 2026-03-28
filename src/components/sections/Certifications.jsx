import React from "react";
import ElegantCarousel from "@/components/ui/elegant-carousel";
import { CertificateGrid } from "@/components/ui/certificate-grid";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-padding bg-[rgb(5,5,5)]"
      aria-label="Certifications section"
    >
      <div className="content-wrapper">
        <div className="mb-12 animate-slide-up text-center md:text-left">
          <p className="section-label">Continuous Learning</p>
          <h2 className="section-title">Certifications</h2>
          <div className="divider mx-auto md:mx-0" aria-hidden="true" />
          <p className="section-subtitle max-w-2xl mx-auto md:mx-0">
            A showcase of my commitment to continuous learning and professional development through rigorous industry-level job simulations and globally recognized certifications.
          </p>
        </div>

        <ElegantCarousel />

        <div className="mt-20">
            <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
                    Additional <span className="font-semibold text-accent">Credentials</span>
                </h3>
            </div>
            <CertificateGrid />
        </div>
      </div>
    </section>
  );
}
