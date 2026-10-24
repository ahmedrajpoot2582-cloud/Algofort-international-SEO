'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { initTitleAnimation } from '../../utils/titleAnimation';
import { observeNear } from '../../utils/observeNear';

export function UaeMotion() {
  useEffect(() => {
    const root = document.querySelector('[data-uae-gsap]');
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const headings = [...root.querySelectorAll('main h2.section-title, #uae-industries .heading-text')]
        .filter(heading => !heading.closest('#sec-testimonials'));
      const stops = headings.map(heading => observeNear(heading, () => {
        const original = heading.innerHTML;
        const animation = initTitleAnimation(heading, { regional: true, start: 'top 85%', stagger: .02 });
        return () => {
          animation?.scrollTrigger?.kill();
          animation?.kill();
          heading.innerHTML = original;
          delete heading.dataset.titleAnimated;
          delete heading.dataset.splitDone;
        };
      }, 300));
      return () => stops.forEach(stop => stop());
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
