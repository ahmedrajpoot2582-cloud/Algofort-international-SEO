'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { observeNear } from '../../utils/observeNear';

export function UaeAdvantagesMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-advantages');
    if (!section) return;
    return observeNear(section, () => {
    gsap.registerPlugin(ScrollTrigger);
    const items = [...section.querySelectorAll('.sec-uae-advantages__item')];
    let active = true;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      items.forEach(item => {
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 55%', scrub: .5 },
        });
        reveal.fromTo(item.querySelector('.sec-uae-advantages__card'), { opacity: .3 }, {
          opacity: 1, duration: 1, ease: 'none',
        }, 0);
        reveal.fromTo(item.querySelectorAll('.sec-uae-advantages__card > *'), { y: 18, opacity: .25 }, {
          y: 0, opacity: 1, stagger: .08, duration: .8, ease: 'none',
        }, 0);
        reveal.fromTo(item.querySelector('.sec-uae-advantages__marker'), {
          backgroundColor: '#5b5146',
        }, { backgroundColor: '#f47a1f', duration: 1, ease: 'none' }, 0);
      });
    });
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => {
      active = false;
      media.revert();
    };
    }, 400);
  }, []);
  return null;
}
