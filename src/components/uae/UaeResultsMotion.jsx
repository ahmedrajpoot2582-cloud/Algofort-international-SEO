'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeResultsMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-results');
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const cards = [...section.querySelectorAll('.sec-uae-results__card')];
    const media = gsap.matchMedia();
    let active = true;

    media.add('(prefers-reduced-motion: no-preference)', () => {
      cards.forEach(card => {
        gsap.fromTo(card, { y: 64, opacity: 0 }, {
          y: 0, opacity: 1, duration: .85, ease: 'power3.out',
          scrollTrigger: {
            trigger: card, start: 'top 90%',
            toggleActions: 'play none none none', once: true,
          },
        });
      });
    });
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, []);
  return null;
}
