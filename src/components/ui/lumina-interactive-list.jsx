"use client";
import React, { useEffect, useRef } from 'react';

// Extract data to feed into the WebGL slider
const slideData = [
  {
    title: "OmniChat Gemini",
    description: "Multimodal AI Assistant. Context-aware chatbot powered by Google's Gemini Pro model, processing text, images, and documents.",
    media: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "TrainMate Edge",
    description: "Self-Hosted Knowledge Base. Privacy-focused LLM platform featuring RAG and 8-bit quantization for local hardware optimization.",
    media: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
  },
  {
    title: "Nexus Agent",
    description: "Autonomous Multi-Model AI Orchestrator. Advanced AI agent with a Model Router selecting the best LLM for specific tasks with long-term memory.",
    media: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "ExpenseMate",
    description: "FinTech Social Expense Tracker. Full-stack mobile application integrating Plaid for real-time bank syncing and automated debt settlement.",
    media: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "GreenDoctor AI",
    description: "Deep Learning Plant Pathology System. Agro-tech solution using CNNs to diagnose plant diseases from leaf images, deployed on Azure.",
    media: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "CAGPT",
    description: "Financial Audit & Compliance LLM. Enterprise-grade system streamlining auditing with RAG and Python.",
    media: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Echo AI",
    description: "Voice AI Agent. Real-time conversational AI using GPT-4o Mini, Voyage AI embeddings, and low-latency speech pipelines.",
    media: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "VibranEat",
    description: "AI Personalized Diet Planner. Employs ensemble learning architectures to build custom nutrition based on health profiles.",
    media: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
  },
  {
    title: "HealthGuard AI",
    description: "Early Disease Detection Portal. Intelligent healthcare system powered by SVM and Meta-Classifiers for diagnostic precision.",
    media: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1964&auto=format&fit=crop"
  },
  {
    title: "Senticore",
    description: "Sentiment Analysis with LSTM. Built for real-time temporal-aware feedback loops using NLP and Word Embeddings.",
    media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Self-Driving Car",
    description: "Reinforcement Learning Engine. Navigation simulations built for autonomous environment traversing.",
    media: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
  }
];

export function LuminaSlider() {
  const containerRef = useRef(null);

  useEffect(() => {
    // --- DYNAMIC SCRIPT LOADING ---
    const loadScripts = async () => {
      const loadScript = (src, globalName) => new Promise((res, rej) => {
        if (window[globalName]) { res(); return; }
        if (document.querySelector(`script[src="${src}"]`)) {
          const check = setInterval(() => {
            if (window[globalName]) { clearInterval(check); res(); }
          }, 50);
          setTimeout(() => { clearInterval(check); rej(new Error(`Timeout waiting for ${globalName}`)); }, 10000);
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { setTimeout(() => res(), 100); };
        s.onerror = () => rej(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
      } catch (e) {
        console.error('Failed to load base scripts:', e);
      }
      
      if (window.gsap && window.THREE) {
          initApplication();
      }
    };

    const initApplication = async () => {
        // --- MAIN LOGIC ---
        const SLIDER_CONFIG = {
            settings: {
                transitionDuration: 1.5, autoSlideSpeed: 5000, currentEffect: "timeshift", currentEffectPreset: "Dreamlike",
                globalIntensity: 1.0, speedMultiplier: 1.0, distortionStrength: 1.0, colorEnhancement: 1.0,
                glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0,
                frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0,
                rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0,
                plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0,
                timeshiftDistortion: 2.8, timeshiftBlur: 2.5, timeshiftFlow: 2.5, timeshiftChromatic: 2.6, timeshiftTurbulence: 2.5
            }
        };

        // --- GLOBAL STATE ---
        let currentSlideIndex = 0;
        let isTransitioning = false;
        let shaderMaterial, renderer, scene, camera;
        let slideTextures = [];
        let texturesLoaded = false;
        let autoSlideTimer = null;
        let progressAnimation = null;
        let sliderEnabled = false;

        const slides = slideData;
        const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
        const PROGRESS_UPDATE_INTERVAL = 50;
        const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

        // --- SHADERS ---
        const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
        const fragmentShader = `
            uniform sampler2D uTexture1, uTexture2;
            uniform float uProgress;
            uniform vec2 uResolution, uTexture1Size, uTexture2Size;
            uniform float uTimeshiftDistortion, uTimeshiftBlur, uTimeshiftChromatic;
            varying vec2 vUv;

            vec2 getCoverUV(vec2 uv, vec2 textureSize) {
                vec2 s = uResolution / textureSize;
                float scale = max(s.x, s.y);
                vec2 scaledSize = textureSize * scale;
                vec2 offset = (uResolution - scaledSize) * 0.5;
                return (uv * uResolution - offset) / scaledSize;
            }
            
            vec4 timeshiftEffect(vec2 uv, float progress) { 
                vec2 uv1 = getCoverUV(uv, uTexture1Size);
                vec2 uv2 = getCoverUV(uv, uTexture2Size);
                
                // Add some liquid horizontal swipe effect
                float displaceX = sin(uv.y * 10.0) * 0.1 * progress;
                vec2 displacedUV = uv1 + vec2(displaceX, 0.0);
                
                vec4 img1 = texture2D(uTexture1, displacedUV);
                vec4 img2 = texture2D(uTexture2, uv2);
                
                return mix(img1, img2, progress); 
            }

            void main() {
                gl_FragColor = timeshiftEffect(vUv, uProgress);
            }
        `;

        // --- CORE FUNCTIONS ---
        const splitText = (text) => {
            return text.split('').map(char => `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        };

        const updateContent = (idx) => {
            const titleEl = document.getElementById('luminaTitle');
            const descEl = document.getElementById('luminaDesc');
            if (titleEl && descEl) {
                 window.gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
                 window.gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });
                 
                 setTimeout(() => {
                     // Set new content
                     titleEl.innerHTML = splitText(slides[idx].title);
                     descEl.textContent = slides[idx].description; 
                     
                     // Reset state
                     window.gsap.set(titleEl.children, { opacity: 0, y: 30 });
                     window.gsap.set(descEl, { y: 20, opacity: 0 });

                     // Animate in
                     const children = titleEl.children;
                     window.gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
                     window.gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
                 }, 500); 
            }
        };

        const navigateToSlide = (targetIndex) => {
            if (isTransitioning || targetIndex === currentSlideIndex) return;
            stopAutoSlideTimer();
            quickResetProgress(currentSlideIndex);
            
            const currentTexture = slideTextures[currentSlideIndex];
            const targetTexture = slideTextures[targetIndex];
            if (!currentTexture || !targetTexture) return;

            isTransitioning = true;
            shaderMaterial.uniforms.uTexture1.value = currentTexture;
            shaderMaterial.uniforms.uTexture2.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
            shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;
            
            updateContent(targetIndex);

            currentSlideIndex = targetIndex;
            updateCounter(currentSlideIndex);
            updateNavigationState(currentSlideIndex);
            
            window.gsap.fromTo(shaderMaterial.uniforms.uProgress, 
                { value: 0 },
                {
                    value: 1,
                    duration: TRANSITION_DURATION(),
                    ease: "power2.inOut",
                    onComplete: () => {
                        shaderMaterial.uniforms.uProgress.value = 0;
                        shaderMaterial.uniforms.uTexture1.value = targetTexture;
                        shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
                        isTransitioning = false;
                        safeStartTimer(100);
                    }
                }
            );
        };

        const handleSlideChange = () => {
            if (isTransitioning || !texturesLoaded || !sliderEnabled) return;
            navigateToSlide((currentSlideIndex + 1) % slides.length);
        };

        const createSlidesNavigation = () => {
            const nav = document.getElementById("luminaNav"); if (!nav) return;
            nav.innerHTML = "";
            slides.forEach((slide, i) => {
                const item = document.createElement("div");
                item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
                item.dataset.slideIndex = String(i);
                item.innerHTML = `<div class="slide-progress-line"><div class="slide-progress-fill"></div></div><div class="slide-nav-title hidden md:block">${slide.title}</div>`;
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (!isTransitioning && i !== currentSlideIndex) {
                         stopAutoSlideTimer();
                         quickResetProgress(currentSlideIndex);
                         navigateToSlide(i);
                    }
                });
                nav.appendChild(item);
            });
        };

        const updateNavigationState = (idx) => document.querySelectorAll(".slide-nav-item").forEach((el, i) => el.classList.toggle("active", i === idx));
        const updateSlideProgress = (idx, prog) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill"); if (el) { el.style.width = `${prog}%`; el.style.opacity = '1'; } };
        const fadeSlideProgress = (idx) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill"); if (el) { el.style.opacity = '0'; setTimeout(() => el.style.width = "0%", 300); } };
        const quickResetProgress = (idx) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill"); if (el) { el.style.transition = "width 0.2s ease-out"; el.style.width = "0%"; setTimeout(() => el.style.transition = "width 0.1s ease, opacity 0.3s ease", 200); } };
        const updateCounter = (idx) => { 
            const sn = document.getElementById("luminaCounter"); if (sn) sn.textContent = String(idx + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0"); 
        };

        const startAutoSlideTimer = () => {
             if (!texturesLoaded || !sliderEnabled) return;
             stopAutoSlideTimer();
             let progress = 0;
             const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
             progressAnimation = setInterval(() => {
                 if (!sliderEnabled) { stopAutoSlideTimer(); return; }
                 progress += increment;
                 updateSlideProgress(currentSlideIndex, progress);
                 if (progress >= 100) {
                     clearInterval(progressAnimation); progressAnimation = null;
                     fadeSlideProgress(currentSlideIndex);
                     if (!isTransitioning) handleSlideChange();
                 }
             }, PROGRESS_UPDATE_INTERVAL);
        };
        const stopAutoSlideTimer = () => { if (progressAnimation) clearInterval(progressAnimation); if (autoSlideTimer) clearTimeout(autoSlideTimer); progressAnimation = null; autoSlideTimer = null; };
        const safeStartTimer = (delay = 0) => { stopAutoSlideTimer(); if (sliderEnabled && texturesLoaded) { if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay); else startAutoSlideTimer(); } };

        const loadImageTexture = (src) => new Promise((resolve, reject) => {
             const l = new window.THREE.TextureLoader();
             l.load(src, (t) => { t.minFilter = t.magFilter = window.THREE.LinearFilter; t.userData = { size: new window.THREE.Vector2(t.image.width, t.image.height) }; resolve(t); }, undefined, reject);
        });

        const initRenderer = async () => {
            const canvas = document.querySelector(".lumina-canvas"); if (!canvas || !window.THREE) return;
            
            // Limit canvas height based on container
            const container = containerRef.current;
            const w = container.clientWidth;
            const h = container.clientHeight;

            scene = new window.THREE.Scene(); camera = new window.THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            renderer = new window.THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
            renderer.setSize(w, h); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            shaderMaterial = new window.THREE.ShaderMaterial({
                uniforms: {
                    uTexture1: { value: null }, uTexture2: { value: null }, uProgress: { value: 0 },
                    uResolution: { value: new window.THREE.Vector2(w, h) },
                    uTexture1Size: { value: new window.THREE.Vector2(1, 1) }, uTexture2Size: { value: new window.THREE.Vector2(1, 1) }
                },
                vertexShader, fragmentShader
            });
            scene.add(new window.THREE.Mesh(new window.THREE.PlaneGeometry(2, 2), shaderMaterial));
            
            for (const s of slides) { try { slideTextures.push(await loadImageTexture(s.media)); } catch { console.warn("Failed texture"); } }
            if (slideTextures.length >= 2) {
                shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
                shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
                texturesLoaded = true; sliderEnabled = true;
                containerRef.current.classList.remove("opacity-0"); // Fade in smoothly
                safeStartTimer(500);
            }
            
            const render = () => { requestAnimationFrame(render); renderer.render(scene, camera); };
            render();
        };
        
        createSlidesNavigation(); updateCounter(0); 
        
        // Init text content
        const tEl = document.getElementById('luminaTitle');
        const dEl = document.getElementById('luminaDesc');
        if (tEl && dEl && window.gsap) {
            tEl.innerHTML = splitText(slides[0].title);
            dEl.textContent = slides[0].description;
            // animate initial in
            window.gsap.fromTo(tEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: "power3.out", delay: 0.5 });
            window.gsap.fromTo(dEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });
        }

        initRenderer();
        
        // Listeners
        document.addEventListener("visibilitychange", () => document.hidden ? stopAutoSlideTimer() : (!isTransitioning && safeStartTimer()));
        window.addEventListener("resize", () => { 
            if (renderer && containerRef.current) { 
                const w = containerRef.current.clientWidth;
                const h = containerRef.current.clientHeight;
                renderer.setSize(w, h); 
                shaderMaterial.uniforms.uResolution.value.set(w, h); 
            } 
        });
    };

    loadScripts();
    return () => {};
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-black overflow-hidden rounded-xl border border-white/10 opacity-0 transition-opacity duration-1000" ref={containerRef}>
      {/* Canvas Layer */}
      <canvas className="lumina-canvas absolute inset-0 w-full h-full object-cover z-0"></canvas>
      
      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>

      {/* Counter */}
      <div className="absolute top-6 right-8 z-20 font-mono text-white/50 text-sm tracking-widest" id="luminaCounter">01 / 11</div>

      {/* Content */}
      <div className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 z-20 max-w-2xl pointer-events-none">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight" id="luminaTitle"></h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-md drop-shadow-md" id="luminaDesc"></p>
      </div>

      {/* Navigation Slider */}
      <nav className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20" id="luminaNav"></nav>

      {/* Internal Style for the Progress Navigators */}
      <style dangerouslySetInnerHTML={{__html: `
        .slide-nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .slide-nav-item:hover, .slide-nav-item.active {
          opacity: 1;
        }
        .slide-progress-line {
          width: 3px;
          height: 30px;
          background: rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }
        .slide-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          transform-origin: top;
          transform: scaleY(0);
        }
        .slide-nav-item.active .slide-progress-fill {
           transform: scaleY(1);
           height: var(--progress, 0%); /* Bound via JS width override mapped to CSS */
        }
        /* Custom mapping to hack width onto height for vertical navigation */
        .slide-progress-fill { height: 100%; top: -100%; transition: top 0.1s linear; }
        .slide-nav-item.active .slide-progress-fill[style*="width:"] { width: 100% !important; top: 0 !important; transform-origin: bottom; transform: scaleY(calc(var(--prog-val) / 100)); }
        
        /* Direct vertical hack */
        .slide-nav-title {
          font-family: monospace;
          color: white;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      `}} />
    </div>
  );
}
