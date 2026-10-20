'use client';

import { useEffect } from 'react';

// Intersection observers, short compositor animations, and no per-frame scroll handlers.
// Content stays visible in server HTML and when JavaScript or motion is disabled.
export function UaeMotion() {
  useEffect(() => {
    const root = document.querySelector('.page-uae');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

    const animations = new Set();
    const loops = [...root.querySelectorAll('.subtitle-marquee-track, .service-marquee-track, .sonar-wave')];
    const visibleLoops = new Set();
    const updateLoops = () => loops.forEach((loop) => {
      loop.toggleAttribute('data-loop-visible', visibleLoops.has(loop) && !document.hidden && !preference.matches);
    });
    const loopObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleLoops.add(target);
        else visibleLoops.delete(target);
      });
      updateLoops();
    });
    loops.forEach((loop) => loopObserver.observe(loop));
    document.addEventListener('visibilitychange', updateLoops);
    const selector = [
      '.sec-uae-expansion__header',
      '.sec-uae__about-heading',
      '.sec-services__header',
      '.service-content-grid',
      '.sec-uae__process-header',
      '.sec-testimonials__header',
      '.sec-faq__header',
      '.sec-cta__header',
      '.sec-uae-industries__item',
      '.sec-uae-ecosystem__panel',
      '.sec-uae-advantages__item',
      '.sec-uae-technology__row',
      '.sec-uae-results__card',
      '.sec-uae__step',
      '.alg-testimonials-card',
    ].join(',');
    const targets = [...root.querySelectorAll(selector)].filter((element) =>
      !element.matches('.sec-uae-expansion__header') || !element.closest('.sec-uae-ecosystem__panel')
    );

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      visible.forEach(({ target }, index) => {
        observer.unobserve(target);
        if (preference.matches) return;
        const animation = target.animate([
          { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ], {
          duration: 520,
          delay: Math.min(index, 3) * 65,
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'backwards',
        });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      });
    }, { threshold: 0.08 });

    const cancelMotion = () => {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
      updateLoops();
    };
    targets.forEach((target) => observer.observe(target));
    preference.addEventListener('change', cancelMotion);

    return () => {
      observer.disconnect();
      loopObserver.disconnect();
      document.removeEventListener('visibilitychange', updateLoops);
      loops.forEach((loop) => loop.removeAttribute('data-loop-visible'));
      preference.removeEventListener('change', cancelMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return null;
}
