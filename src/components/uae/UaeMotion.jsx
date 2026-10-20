'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

// Each visible item owns one reusable GSAP timeline. Native intersection
// events start it on entry; no global text splitting or scroll-frame loop.
export function UaeMotion() {
  useEffect(() => {
    const root = document.querySelector('[data-uae-gsap]');
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, root);
      const timelines = new Map();
      let scrollingStarted = window.scrollY > 0 || !!window.location.hash;
      const pending = new Set();
      const selector = [
        '.heading-style-h2', '.sec-uae__about-copy',
        '.sec-uae-industries__item', '.sec-uae-ecosystem__item',
        '.sec-uae-advantages__item', '.sec-uae-technology__row',
        '.sec-uae-results__card', '.sec-uae__step',
      ].join(',');
      const targets = [...root.querySelectorAll(selector)].filter(element =>
        !element.closest('#sec-testimonials, .sec-page-banner, .showreel_lightbox')
      );
      const reveal = target => {
          if (!timelines.has(target)) context.add(() => {
            const timeline = gsap.timeline({
              paused: true,
              onStart: () => { target.dataset.motionState = 'entering'; },
              onComplete: () => { target.dataset.motionState = 'visible'; },
            });
            if (target.matches('.heading-style-h2')) {
              timeline.fromTo(target, { y: 28, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
              });
            } else {
              const technology = target.matches('.sec-uae-technology__row');
              timeline.fromTo(target, { y: technology ? 0 : 32, x: technology ? 40 : 0, opacity: 0 }, {
                x: 0, y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
              });
              const icon = target.querySelector('.sec-uae-industries__meta svg');
              if (icon) timeline.fromTo(icon, { rotation: -18, scale: 0.8 }, {
                rotation: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)',
              }, 0.1);
              if (technology) timeline.fromTo(target.querySelectorAll('li'), { y: 12, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out',
              }, 0.15);
            }
            timelines.set(target, timeline);
          });
          const timeline = timelines.get(target);
          if (!timeline.isActive()) timeline.restart(true);
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) { pending.delete(target); return; }
          if (!scrollingStarted) { pending.add(target); return; }
          reveal(target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
      const startScrollMotion = () => {
        scrollingStarted = true;
        pending.forEach(reveal);
        pending.clear();
        inputEvents.forEach(type => window.removeEventListener(type, startScrollMotion));
      };
      const inputEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
      // Keep initially visible copy steady during hydration. Motion starts with
      // actual input, not a synthetic scroll used by layout measurement.
      // Direct hash/restored navigation is already armed above.
      if (!scrollingStarted) inputEvents.forEach(type => window.addEventListener(type, startScrollMotion, { passive: true }));
      targets.forEach(target => observer.observe(target));
      return () => {
        inputEvents.forEach(type => window.removeEventListener(type, startScrollMotion));
        observer.disconnect();
        context.revert();
        targets.forEach(target => { delete target.dataset.motionState; });
      };
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
