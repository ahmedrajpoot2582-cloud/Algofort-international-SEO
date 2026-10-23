'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeProcessMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-process');
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const artwork = [...section.querySelectorAll('.uae-process-art')];
    const visibleArtwork = new Set();
    // This section owns its illustration playback, independently of text motion.
    const updateArtwork = () => {
      const playing = !document.hidden && !preference.matches;
      section.toggleAttribute('data-process-visible', visibleArtwork.size > 0 && playing);
      artwork.forEach(art => art.toggleAttribute('data-loop-visible', visibleArtwork.has(art) && playing));
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleArtwork.add(target);
        else visibleArtwork.delete(target);
      });
      updateArtwork();
    });
    artwork.forEach(art => observer.observe(art));
    document.addEventListener('visibilitychange', updateArtwork);
    preference.addEventListener('change', updateArtwork);

    media.add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 1200px)', tall: '(min-height: 850px)' }, ({ conditions }) => {
      if (!conditions.motion) return;
      let active = true;
      let lifecycle;
      let SplitText;
      const splits = [];
      const context = gsap.context(() => {}, section);
      const buildScene = () => context.add(() => {
        const scene = section.querySelector('.sec-uae__process-scene');
        const stage = section.querySelector('.sec-uae__process-stage');
        const heading = section.querySelector('.sec-uae__process-header h2');
        const hub = section.querySelector('.sec-uae__process-hub');
        const steps = [...section.querySelectorAll('.sec-uae__step')];
        const paths = [...section.querySelectorAll('.sec-uae__connection-line')];
        const flows = [...section.querySelectorAll('.sec-uae__connection-flow')];
        const words = element => {
          if (!SplitText) return [element];
          const split = SplitText.create(element, { type: 'words', wordsClass: 'uae-process-word', aria: 'auto' });
          splits.push(split);
          return split.words;
        };
        const headingWords = words(heading);
        const hubWords = words(hub.querySelector('strong'));
        const copyWords = steps.map(step => [...words(step.querySelector('h3')), ...words(step.querySelector('p'))]);
        const revealWords = (timeline, pieces, at = 0) => timeline.fromTo(pieces, {
          y: 12, opacity: .18,
        }, {
          y: 0, opacity: 1, duration: .55, stagger: { amount: .25 }, ease: 'none',
        }, at);
        const drawPath = (timeline, path, at = 0) => timeline.fromTo(path, {
          strokeDasharray: () => path.getTotalLength(),
          strokeDashoffset: () => path.getTotalLength(),
        }, { strokeDashoffset: 0, stroke: '#f47a1f', duration: .7, ease: 'none' }, at);

        const pinScene = conditions.tall && scene.offsetHeight <= window.innerHeight - 48;
        const pinStage = stage.offsetHeight <= window.innerHeight - 32;
        if (conditions.wide && (pinScene || pinStage)) {
          section.dataset.scrollMotion = pinScene ? 'pinned-scrub' : 'stage-scrub';
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: pinScene ? scene : stage, start: pinScene ? 'top 24px' : 'top 16px',
              end: () => `+=${Math.round(window.innerHeight * 3.2)}`,
              pin: true, pinSpacing: true, anticipatePin: 1,
              scrub: .6, invalidateOnRefresh: true,
            },
          });
          if (pinScene) revealWords(timeline, headingWords);
          else revealWords(gsap.timeline({ scrollTrigger: { trigger: heading, start: 'top 92%', end: 'top 50%', scrub: .6 } }), headingWords);
          timeline.fromTo(hub, { x: 0, y: 0, xPercent: -50, yPercent: -50, scale: .65, opacity: 0 }, { scale: 1, opacity: 1, duration: .9, ease: 'power2.out' }, 0);
          revealWords(timeline, hubWords, .15);
          steps.forEach((step, index) => {
            const at = 1.1 + index * 1.05;
            drawPath(timeline, paths[index], at);
            timeline.fromTo(flows[index], { opacity: 0 }, { opacity: .6, duration: .2 }, at + .7);
            timeline.fromTo(step, { y: 18, opacity: 0 }, {
              y: 0, opacity: 1, duration: .5, ease: 'power1.out',
            }, at + .7);
            revealWords(timeline, copyWords[index], at + .8);
          });
          timeline.to({}, { duration: .7 });
        } else {
          // Flowing layouts retain the same reversible word motion without clipping.
          const headingTimeline = gsap.timeline({
            scrollTrigger: { trigger: heading, start: 'top 92%', end: 'top 50%', scrub: .6 },
          });
          revealWords(headingTimeline, headingWords);
          const hubTimeline = gsap.timeline({
            scrollTrigger: { trigger: hub, start: 'top 92%', end: 'top 55%', scrub: .6 },
          });
          hubTimeline.fromTo(hub, {
            x: 0, y: 16, scale: .65, opacity: 0,
            xPercent: conditions.wide ? -50 : 0,
            yPercent: conditions.wide ? -50 : 0,
          }, { y: 0, scale: 1, opacity: 1, duration: .9, ease: 'power2.out' }, 0);
          revealWords(hubTimeline, hubWords);
          steps.forEach((step, index) => {
            const timeline = gsap.timeline({
              scrollTrigger: { trigger: step, start: 'top 92%', end: 'top 48%', scrub: .6, invalidateOnRefresh: true },
            });
            const cardAt = conditions.wide ? .7 : 0;
            if (conditions.wide) {
              drawPath(timeline, paths[index]);
              timeline.fromTo(flows[index], { opacity: 0 }, { opacity: .6, duration: .2 }, .7);
            }
            timeline.fromTo(step, { y: 18, opacity: .05 }, {
              y: 0, opacity: 1, duration: .6, ease: 'none',
            }, cardAt);
            revealWords(timeline, copyWords[index], cardAt + .1);
          });
        }
      });
      const setup = async () => {
        const modules = await Promise.allSettled([import('@barba/core'), import('gsap/SplitText'), document.fonts?.ready]);
        if (!active) return;
        if (modules[1].status === 'fulfilled') {
          SplitText = modules[1].value.SplitText;
          gsap.registerPlugin(SplitText);
        }
        if (modules[0].status === 'fulfilled') {
          // Use isolated hooks; Next retains navigation and DOM ownership.
          lifecycle = new modules[0].value.default.hooks.constructor();
          lifecycle.enter(buildScene);
          await lifecycle.do('enter', { next: { container: section, namespace: 'uae-process' } });
        } else buildScene();
        if (active) ScrollTrigger.refresh();
      };
      setup();
      return () => {
        active = false;
        context.revert();
        splits.forEach(split => split.revert());
        lifecycle?.clear();
        delete section.dataset.scrollMotion;
      };
    });
    return () => {
      media.revert();
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateArtwork);
      preference.removeEventListener('change', updateArtwork);
      artwork.forEach(art => art.removeAttribute('data-loop-visible'));
      section.removeAttribute('data-process-visible');
    };
  }, []);
  return null;
}
