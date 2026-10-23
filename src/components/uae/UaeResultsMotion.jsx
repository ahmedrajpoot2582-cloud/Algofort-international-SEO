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
    const grid = section.querySelector('.sec-uae-results__grid');
    const media = gsap.matchMedia();
    let active = true;

    media.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      // Set every card before the stagger starts so later cards cannot flash in place.
      gsap.set(cards, { x: () => section.clientWidth, opacity: 0 });
      gsap.fromTo(cards, { x: () => section.clientWidth, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, stagger: .22, ease: 'power2.out',
        scrollTrigger: {
          trigger: grid, start: 'top 95%', end: 'top 25%',
          scrub: .65, once: true, invalidateOnRefresh: true,
        },
      });
    });
    media.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
      cards.forEach(card => {
        gsap.fromTo(card, { x: 80, opacity: 0 }, {
          x: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: card, start: 'top 95%', end: 'top 55%',
            scrub: .5, once: true,
          },
        });
      });
    });
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, []);
  return null;
}
