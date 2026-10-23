'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export function UaeProcessMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-process');
    if (!section) return;
    const media = gsap.matchMedia();
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const artwork = [...section.querySelectorAll('.uae-process-art')];
    const visibleMotionTargets = new Set();
    const updateArtwork = () => {
      const playing = !document.hidden && !preference.matches;
      section.toggleAttribute('data-process-visible', visibleMotionTargets.size > 0 && playing);
      artwork.forEach(art => art.toggleAttribute('data-loop-visible', visibleMotionTargets.has(art) && playing));
    };
    const artworkObserver = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleMotionTargets.add(target);
        else visibleMotionTargets.delete(target);
      });
      updateArtwork();
    });
    artwork.forEach(art => artworkObserver.observe(art));
    artworkObserver.observe(section.querySelector('.sec-uae__process-hub'));
    document.addEventListener('visibilitychange', updateArtwork);
    preference.addEventListener('change', updateArtwork);

    media.add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 1200px)' }, ({ conditions }) => {
      if (!conditions.motion) return;
      let active = true;
      let revealObserver;
      const splits = [];
      const reveals = new Map();
      const context = gsap.context(() => {}, section);
      const setup = async () => {
        let SplitText;
        try {
          const module = await import('gsap/SplitText');
          SplitText = module.SplitText;
          gsap.registerPlugin(SplitText);
        } catch {
          // Whole text blocks still reveal if the optional splitter cannot load.
        }
        await document.fonts?.ready;
        if (!active) return;
        context.add(() => {
          const heading = section.querySelector('.sec-uae__process-header h2');
          const hub = section.querySelector('.sec-uae__process-hub');
          const steps = [...section.querySelectorAll('.sec-uae__step')];
          const flows = [...section.querySelectorAll('.sec-uae__connection-flow')];
          const words = element => {
            if (!SplitText) return [element];
            const split = SplitText.create(element, { type: 'words', wordsClass: 'uae-process-word', aria: 'auto' });
            splits.push(split);
            return split.words;
          };
          const revealWords = (timeline, pieces, at = 0) => timeline.fromTo(pieces, { y: 10, opacity: 0 }, {
            y: 0, opacity: 1, duration: .45, stagger: { amount: .18 }, ease: 'power2.out',
          }, at);
          const createReveal = target => {
            const timeline = gsap.timeline({
              paused: true,
              onStart: () => { target.dataset.motionState = 'playing'; },
              onComplete: () => { target.dataset.motionState = 'visible'; },
            });
            reveals.set(target, timeline);
            return timeline;
          };
          revealWords(createReveal(heading), words(heading));
          const zoomHub = timeline => {
            timeline.fromTo(hub, {
              x: 0, y: 0, xPercent: conditions.wide ? -50 : 0,
              yPercent: conditions.wide ? -50 : 0, scale: .7, opacity: 0,
            }, { scale: 1, opacity: 1, duration: .65, ease: 'power2.out' }, 0);
            revealWords(timeline, words(hub.querySelector('strong')), .1);
          };
          const revealCard = (timeline, step, at) => {
            timeline.fromTo(step, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'power2.out' }, at);
            revealWords(timeline, [...words(step.querySelector('h3')), ...words(step.querySelector('p'))], at + .05);
          };
          if (conditions.wide) {
            // A normal-flow diagram: viewport entry starts a timed sequence.
            // There is no pin spacer and scrolling never controls its progress.
            const timeline = createReveal(section.querySelector('.sec-uae__process-stage'));
            zoomHub(timeline);
            steps.forEach((step, index) => {
              const at = .65 + index * .15;
              timeline.fromTo(flows[index], { opacity: 0 }, { opacity: .85, duration: .25 }, at);
              revealCard(timeline, step, at + .15);
            });
          } else {
            // Long mobile layouts reveal each card when it enters the viewport.
            zoomHub(createReveal(hub));
            steps.forEach(step => revealCard(createReveal(step), step, 0));
          }
        });
        revealObserver = new IntersectionObserver(entries => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            reveals.get(target)?.play(0);
            revealObserver.unobserve(target);
          });
        }, { threshold: .08, rootMargin: '0px 0px -10% 0px' });
        reveals.forEach((_, target) => revealObserver.observe(target));
      };
      setup();
      return () => {
        active = false;
        revealObserver?.disconnect();
        context.revert();
        splits.forEach(split => split.revert());
        reveals.forEach((_, target) => { delete target.dataset.motionState; });
      };
    });
    return () => {
      media.revert();
      artworkObserver.disconnect();
      document.removeEventListener('visibilitychange', updateArtwork);
      preference.removeEventListener('change', updateArtwork);
      artwork.forEach(art => art.removeAttribute('data-loop-visible'));
      section.removeAttribute('data-process-visible');
    };
  }, []);
  return null;
}
