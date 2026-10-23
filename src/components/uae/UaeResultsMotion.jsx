'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeResultsMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-results');
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const stage = section.querySelector('.sec-uae-results__stage');
    const cards = [...section.querySelectorAll('.sec-uae-results__card')];
    const steps = [...section.querySelectorAll('.sec-uae-results__progress span')];
    const media = gsap.matchMedia();
    let active = true;

    const setupPin = () => {
      section.setAttribute('data-results-pinned', '');
      // Short viewports keep the readable stacked layout instead of clipping copy.
      if (stage.scrollHeight > window.innerHeight + 2) {
        section.removeAttribute('data-results-pinned');
        return;
      }
      const sequence = gsap.timeline({
        scrollTrigger: {
          trigger: stage, start: 'top top',
          end: () => `+=${window.innerHeight * 2.8}`,
          pin: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
      gsap.set(cards, { x: () => stage.clientWidth, autoAlpha: 0 });
      cards.forEach((card, index) => {
        const at = index * 1.6;
        sequence.to(card, { x: 0, autoAlpha: 1, duration: .9, ease: 'power2.out' }, at);
        sequence.to(steps[index], { backgroundColor: '#f47a1f', color: '#fff', duration: .3 }, at);
        if (index < cards.length - 1) {
          sequence.to(card, { x: -40, autoAlpha: 0, duration: .45, ease: 'power1.in' }, at + 1.3);
        }
      });
      // Give the last result the same reading interval before releasing the section.
      sequence.to({}, { duration: .7 });
      return () => section.removeAttribute('data-results-pinned');
    };
    media.add('(prefers-reduced-motion: no-preference) and (min-width: 992px) and (min-height: 600px)', setupPin);
    media.add('(prefers-reduced-motion: no-preference) and (max-width: 991px) and (min-height: 820px)', setupPin);
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, []);
  return null;
}
