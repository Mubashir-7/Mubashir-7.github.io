"use client";
import React from "react";
import {
  NotepadTextDashed,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ModemAnimatedFooter = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-white/10 bg-black mt-20 relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10 z-20">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full text-white">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-3xl font-bold tracking-tighter">
                    {brandName}
                  </span>
                </div>
                <p className="text-white/60 font-medium text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-6 gap-6">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-white/50 max-w-full px-4 mt-4">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      className="hover:text-white transition-colors duration-300 hover:font-semibold uppercase tracking-wider text-xs"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 z-20">
            <p className="text-sm text-white/40 text-center md:text-left">
              &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white transition-colors duration-300 hover:font-medium"
                >
                  Crafted by {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text */}
        <div 
          className="bg-gradient-to-b from-white/10 via-white/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-black tracking-tighter pointer-events-none select-none text-center px-4 z-0"
          style={{
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            maxWidth: '100vw',
            whiteSpace: 'nowrap'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo component */}
        <div className="absolute hover:border-white/50 duration-500 hover:shadow-[0_0px_30px_rgba(255,255,255,0.2)] bottom-24 md:bottom-20 backdrop-blur-xl rounded-2xl bg-black/60 left-1/2 border border-white/10 flex items-center justify-center p-3 -translate-x-1/2 z-30">
          <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-br from-white/20 to-transparent rounded-xl flex items-center justify-center shadow-lg border border-white/5">
            {brandIcon || (
              <NotepadTextDashed className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-white/80 drop-shadow-lg" />
            )}
          </div>
        </div>

        {/* Bottom glowing line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full left-1/2 -translate-x-1/2 z-10" />

        {/* Bottom shadow fade */}
        <div className="bg-gradient-to-t from-black via-black/80 blur-[2em] to-transparent absolute bottom-0 w-full h-40 z-10 pointer-events-none" />
      </footer>
    </section>
  );
};
