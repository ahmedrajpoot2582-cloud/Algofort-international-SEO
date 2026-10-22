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
    const count = section.querySelector('[data-timeline-current]');
    const label = section.querySelector('.sec-uae-advantages__current-label');
    const initialLabel = label.textContent;
    const measure = () => context.add(() => {
      const first = items[0].querySelector('.sec-uae-advantages__marker').getBoundingClientRect();
      const last = items.at(-1).querySelector('.sec-uae-advantages__marker').getBoundingClientRect();
      gsap.set(rail, {
        top: first.top - rail.parentElement.getBoundingClientRect().top + first.height / 2,
        height: last.top - first.top,
      });
    });
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let current = -1;
      const progress = gsap.timeline({
        scrollTrigger: {
          trigger: items[0], start: 'top 65%',
          endTrigger: items.at(-1), end: 'top 65%', scrub: .5,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const index = Math.round(self.progress * (items.length - 1));
            if (index === current) return;
            current = index;
            count.textContent = String(index + 1).padStart(2, '0');
            label.textContent = items[index].dataset.timelineLabel;
          },
        },
      });
      progress.fromTo(section.querySelector('.sec-uae-advantages__progress'), { scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'none' }, 0);
      progress.fromTo(section.querySelector('.sec-uae-advantages__meter span'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);
      items.forEach(item => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 88%', end: 'top 60%', scrub: .5 },
        });
        timeline.fromTo(item.querySelector('.sec-uae-advantages__card'), { y: 32, opacity: .5 }, {
          y: 0, opacity: 1, duration: 1, ease: 'none',
        }, 0);
        timeline.fromTo(item.querySelector('.sec-uae-advantages__marker'), {
          backgroundColor: '#b9bab5',
        }, {
          backgroundColor: '#f47a1f', duration: 1, ease: 'none',
        }, 0);
        timeline.fromTo(item.querySelector('.sec-uae-advantages__card-meta svg'), { rotation: -45 }, { rotation: 0, duration: 1, ease: 'none' }, 0);
      });
    });
    return () => {
      ScrollTrigger.removeEventListener('refreshInit', measure);
      media.revert();
      context.revert();
      count.textContent = '01';
      label.textContent = initialLabel;
    };
  }, []);
  return null;
}
