'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeAdvantagesMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-advantages');
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {}, section);
    const items = [...section.querySelectorAll('.sec-uae-advantages__item')];
    const rail = section.querySelector('.sec-uae-advantages__rail');
    const measure = () => context.add(() => {
      gsap.set(rail, { height: items.at(-1).offsetTop - items[0].offsetTop });
    });
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(section.querySelector('.sec-uae-advantages__progress'), { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: {
          trigger: items[0], start: 'top 65%',
          endTrigger: items.at(-1), end: 'top 65%', scrub: .5,
          invalidateOnRefresh: true,
        },
      });
      items.forEach(item => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 88%', end: 'top 60%', scrub: .5 },
        });
        timeline.fromTo(item.querySelector('.sec-uae-advantages__card'), { y: 24, opacity: .35 }, {
          y: 0, opacity: 1, duration: 1, ease: 'none',
        }, 0);
        timeline.fromTo(item.querySelector('.sec-uae-advantages__marker'), {
          backgroundColor: '#f4f4f2', borderColor: '#c9c9c4', color: '#575752',
        }, {
          backgroundColor: '#f47a1f', borderColor: '#f47a1f', color: '#05080c', duration: 1, ease: 'none',
        }, 0);
      });
    });
    return () => {
      ScrollTrigger.removeEventListener('refreshInit', measure);
      media.revert();
      context.revert();
    };
  }, []);
  return null;
}
