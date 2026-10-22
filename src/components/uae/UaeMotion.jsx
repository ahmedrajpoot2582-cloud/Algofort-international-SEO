'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

// Split only visible UAE copy. Other pages and the home testimonials keep
// their original animation, and native observers avoid a scroll-frame loop.
export function UaeMotion() {
  useEffect(() => {
    const root = document.querySelector('[data-uae-gsap]');
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, root);
      const timelines = new Map();
      const splits = new Set();
      const building = new Set();
      const visibleTargets = new Set();
      const accentColor = getComputedStyle(root).getPropertyValue('--brand-orange').trim() || '#f47a1f';
      let active = true;
      let splitPlugin;
      const selector = [
        '.sec-uae__about-copy .section-description',
        '.sec-uae-ecosystem__item',
        '.sec-uae-advantages__item', '.sec-uae-technology__row',
        '.sec-uae-results__card', '.sec-uae__step',
      ].join(',');
      const targets = [...root.querySelectorAll(selector)].filter(element =>
        !element.closest('#sec-testimonials, .sec-page-banner, .showreel_lightbox')
      );
      const reveal = async target => {
          const wave = target.matches('.sec-uae__about-copy .section-description');
          let SplitText;
          if (wave && !timelines.has(target)) {
            if (building.has(target)) return;
            building.add(target);
            try {
              splitPlugin ||= import('gsap/SplitText').then(module => {
                gsap.registerPlugin(module.SplitText);
                return module.SplitText;
              });
              SplitText = await splitPlugin;
            } catch {
              // Leave server-rendered copy visible if the optional chunk fails.
              building.delete(target);
              return;
            }
            building.delete(target);
            if (!active || !target.isConnected || !visibleTargets.has(target)) return;
          }
          if (!timelines.has(target)) context.add(() => {
            const timeline = gsap.timeline({
              paused: true,
              onStart: () => { target.dataset.motionState = 'entering'; },
              onComplete: () => { target.dataset.motionState = 'visible'; },
            });
            if (wave) {
              const split = SplitText.create(target, {
                type: 'words', wordsClass: 'uae-text-word', aria: 'auto',
              });
              splits.add(split);
              const pieces = split.words;
              const colors = pieces.map(char => getComputedStyle(char).color);
              timeline.fromTo(pieces, {
                y: 10, opacity: 0.5,
                color: index => gsap.utils.interpolate(colors[index], accentColor, 0.35),
              }, {
                y: 0, opacity: 1,
                color: index => colors[index],
                stagger: { amount: 0.35, from: 'start' },
                duration: 0.65, ease: 'power2.out',
                immediateRender: false,
              });
              // Include the stagger in the requested one-second total.
              timeline.duration(1);
            } else {
              const technology = target.matches('.sec-uae-technology__row');
              timeline.fromTo(target, { y: technology ? 0 : 32, x: technology ? 40 : 0, opacity: 0 }, {
                x: 0, y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
              });
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
        entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
          if (!isIntersecting) {
            visibleTargets.delete(target);
            const timeline = timelines.get(target);
            if (timeline?.isActive()) timeline.progress(1);
            return;
          }
          if (intersectionRatio < 0.12) return;
          if (visibleTargets.has(target)) return;
          visibleTargets.add(target);
          reveal(target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
      // Play on viewport entry, replay on re-entry, never scrub with scrolling.
      targets.forEach(target => observer.observe(target));
      // Fetch the optional splitter before About enters, without starting motion.
      const about = root.querySelector('.sec-uae__about-copy .section-description');
      const prepareObserver = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        splitPlugin ||= import('gsap/SplitText').then(module => {
          gsap.registerPlugin(module.SplitText);
          return module.SplitText;
        });
        splitPlugin.catch(() => {});
        prepareObserver.disconnect();
      }, { rootMargin: '240px' });
      if (about) prepareObserver.observe(about);
      return () => {
        active = false;
        observer.disconnect();
        prepareObserver.disconnect();
        context.revert();
        splits.forEach(split => split.revert());
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
