'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { observeNear } from '../../utils/observeNear';

gsap.registerPlugin(ScrollTrigger);

// Use the homepage's power3 reveals, letter scrub and testimonial fan motion.
// Initialize offscreen sections near the viewport and revert everything on exit.
export function UaeMotion() {
  useEffect(() => {
    const root = document.querySelector('[data-uae-gsap]');
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, root);
      const stops = [];
      const splits = [];
      const syncRestoredPosition = (animation, element, start) => {
        const bounds = element.getBoundingClientRect();
        // Hash/restored navigation can jump past a trigger before its observer
        // runs. Finish past sections and play the one already in view.
        if (bounds.bottom <= 0) animation.progress(1);
        else if (bounds.top <= innerHeight * start) animation.play();
      };
      const groups = [
        ['.sec-uae-industries__grid', '.sec-uae-industries__item'],
        ['.sec-uae-ecosystem__list', '.sec-uae-ecosystem__item'],
        ['.sec-uae-advantages__list', '.sec-uae-advantages__item'],
        ['.sec-uae-technology__list', '.sec-uae-technology__row'],
        ['.sec-uae-results__grid', '.sec-uae-results__card'],
        ['.sec-uae__process-grid', '.sec-uae__step'],
      ];

      groups.forEach(([groupSelector, itemSelector]) => {
        const group = root.querySelector(groupSelector);
        stops.push(observeNear(group, () => {
          context.add(() => {
            const animation = gsap.fromTo(group.querySelectorAll(itemSelector),
              { y: 40, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.75, stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: { trigger: group, start: 'top 85%', once: true },
              });
            syncRestoredPosition(animation, group, 0.85);
          });
        }, 300));
      });

      const about = root.querySelector('.sec-uae__about-copy .scrub_letter');
      stops.push(observeNear(about, () => {
        context.add(() => {
          const paragraph = about.querySelector('p');
          const split = new SplitType(paragraph, { types: 'words, chars', tagName: 'span' });
          splits.push(split);
          paragraph.setAttribute('aria-label', paragraph.textContent);
          split.words?.forEach(word => word.setAttribute('aria-hidden', 'true'));
          gsap.fromTo(split.chars, { opacity: 0.2 }, {
            opacity: 1, duration: 0.01, stagger: 0.02, ease: 'none',
            scrollTrigger: { trigger: about, start: 'top 80%', end: 'bottom 30%', scrub: true },
          });
        });
      }, 300));

      const testimonials = root.querySelector('#testimonials');
      stops.push(observeNear(testimonials, () => {
        context.add(() => {
          const cards = testimonials.querySelectorAll('.alg-testimonials-card');
          const desktop = window.matchMedia('(min-width: 768px)').matches;
          // These offsets and timings match the home page's folded card fan.
          const fan = [[28, 27, -9], [0, -5, 0], [-24, 26, 9], [16, -34, -20], [3, -48, 20]];
          const animation = gsap.fromTo(cards, {
            xPercent: index => desktop ? fan[index % fan.length][0] : 0,
            yPercent: index => desktop ? fan[index % fan.length][1] : 0,
            rotation: index => desktop ? fan[index % fan.length][2] : 0,
            y: desktop ? 0 : 30,
          }, {
            xPercent: 0, yPercent: 0, rotation: 0, y: 0,
            duration: 1.2, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: testimonials, start: 'top 70%', once: true },
          });
          syncRestoredPosition(animation, testimonials, 0.7);
        });
      }, 300));

      return () => {
        stops.forEach(stop => stop());
        context.revert();
        splits.forEach(split => split.revert());
      };
    });

    // Marquees keep their original motion while visible and pause offscreen.
    const loops = [...root.querySelectorAll('.subtitle-marquee-track, .service-marquee-track, .sonar-wave')];
    const visibleLoops = new Set();
    const updateLoops = () => loops.forEach(loop => {
      loop.toggleAttribute('data-loop-visible', visibleLoops.has(loop) && !document.hidden && !preference.matches);
    });
    const loopObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleLoops.add(target);
        else visibleLoops.delete(target);
      });
      updateLoops();
    }) : null;
    if (loopObserver) loops.forEach(loop => loopObserver.observe(loop));
    else loops.forEach(loop => visibleLoops.add(loop));
    updateLoops();
    document.addEventListener('visibilitychange', updateLoops);
    preference.addEventListener('change', updateLoops);

    return () => {
      media.revert();
      loopObserver?.disconnect();
      document.removeEventListener('visibilitychange', updateLoops);
      preference.removeEventListener('change', updateLoops);
      loops.forEach(loop => loop.removeAttribute('data-loop-visible'));
    };
  }, []);

  return null;
}
