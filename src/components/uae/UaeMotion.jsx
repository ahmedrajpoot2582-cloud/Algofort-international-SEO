'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export function UaeMotion() {
  useEffect(() => {
    const root = document.querySelector('[data-uae-gsap]');
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, root);
      const timelines = new Map();
      const visible = new Set();
      const targets = [...root.querySelectorAll('.sec-uae-ecosystem__item')];
      const observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
          if (!isIntersecting) {
            visible.delete(target);
            if (timelines.get(target)?.isActive()) timelines.get(target).progress(1);
            return;
          }
          if (intersectionRatio < .12 || visible.has(target)) return;
          visible.add(target);
          if (!timelines.has(target)) context.add(() => {
            timelines.set(target, gsap.fromTo(target, { y: 24, opacity: 0 }, {
              y: 0, opacity: 1, duration: .65, ease: 'power3.out', paused: true,
            }));
          });
          timelines.get(target).restart(true);
        });
      }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });
      targets.forEach(target => observer.observe(target));
      return () => { observer.disconnect(); context.revert(); };
    });

    const loops = [...root.querySelectorAll('.subtitle-marquee-track, .service-marquee-track, .sonar-wave')];
    const visibleLoops = new Set();
    const updateLoops = () => loops.forEach(loop => {
      loop.toggleAttribute('data-loop-visible', visibleLoops.has(loop) && !document.hidden && !preference.matches);
    });
    const loopObserver = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleLoops.add(target);
        else visibleLoops.delete(target);
      });
      updateLoops();
    });
    loops.forEach(loop => loopObserver.observe(loop));
    document.addEventListener('visibilitychange', updateLoops);
    preference.addEventListener('change', updateLoops);
    return () => {
      media.revert();
      loopObserver.disconnect();
      document.removeEventListener('visibilitychange', updateLoops);
      preference.removeEventListener('change', updateLoops);
      loops.forEach(loop => loop.removeAttribute('data-loop-visible'));
    };
  }, []);
  return null;
}
