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

    media.add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 1100px)', tall: '(min-height: 850px)' }, ({ conditions }) => {
      if (!conditions.motion) return;
      let active = true;
      let lifecycle;
      const context = gsap.context(() => {}, section);
      const buildScene = () => context.add(() => {
        const scene = section.querySelector('.sec-uae__process-scene');
        const hub = section.querySelector('.sec-uae__process-hub');
        const steps = [...section.querySelectorAll('.sec-uae__step')];
        const paths = [...section.querySelectorAll('.sec-uae__process-connections path')];
        // Keep the complete diagram visible. Smaller viewports use an ordinary
        // flowing list, so neither text nor artwork gets cropped by a pin.
        if (conditions.wide && conditions.tall && scene.offsetHeight <= window.innerHeight - 48) {
          section.dataset.scrollMotion = 'pinned-scrub';
          const timeline = gsap.timeline({
            defaults: { ease: 'power1.inOut' },
            scrollTrigger: {
              trigger: scene, start: 'top 24px',
              end: () => `+=${Math.round(window.innerHeight * 2.6)}`,
              pin: true, pinSpacing: true, anticipatePin: 1,
              scrub: .4, invalidateOnRefresh: true,
            },
          });
          timeline.fromTo(hub, { x: 0, y: 0, xPercent: -50, yPercent: -50, scale: .92, opacity: .3 }, { scale: 1, opacity: 1, duration: .6 }, 0);
          steps.forEach((step, index) => {
            const at = .35 + index * .7;
            const path = paths[index];
            timeline.fromTo(path, {
              strokeDasharray: () => path.getTotalLength(),
              strokeDashoffset: () => path.getTotalLength(),
            }, { strokeDashoffset: 0, stroke: '#f47a1f', duration: .6 }, at);
            // Move text and illustration as a single unit, then retain all six.
            timeline.fromTo(step, { x: index % 2 ? 24 : -24, opacity: 0 }, {
              x: 0, opacity: 1, duration: .65,
            }, at + .15);
          });
          timeline.to({}, { duration: .8 });
        } else {
          // No long sticky scenes on mobile or short laptop screens.
          gsap.fromTo(hub, {
            x: 0, y: 20, scale: 1,
            xPercent: conditions.wide ? -50 : 0,
            yPercent: conditions.wide ? -50 : 0,
            opacity: .3,
          }, {
            y: 0, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: hub, start: 'top 95%', end: 'top 65%', scrub: .4 },
          });
          steps.forEach((step, index) => {
            gsap.fromTo(step, { x: index % 2 ? 18 : -18, opacity: .15 }, {
              x: 0, opacity: 1, ease: 'none',
              scrollTrigger: { trigger: step, start: 'top 95%', end: 'top 70%', scrub: .4 },
            });
            if (conditions.wide) {
              const path = paths[index];
              gsap.fromTo(path, {
                strokeDasharray: () => path.getTotalLength(),
                strokeDashoffset: () => path.getTotalLength(),
              }, {
                strokeDashoffset: 0, stroke: '#f47a1f', ease: 'none',
                scrollTrigger: { trigger: step, start: 'top 95%', end: 'top 70%', scrub: .4, invalidateOnRefresh: true },
              });
            }
          });
        }
      });
      const setup = async () => {
        try {
          const { default: barba } = await import('@barba/core');
          if (!active) return;
          // Isolated lifecycle hooks only: Next retains navigation ownership.
          lifecycle = new barba.hooks.constructor();
          lifecycle.enter(buildScene);
        } catch {
          // The server-rendered diagram remains readable without this chunk.
        }
        if (!active) return;
        if (lifecycle) await lifecycle.do('enter', { next: { container: section, namespace: 'uae-process' } });
        else buildScene();
        document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      };
      setup();
      return () => {
        active = false;
        context.revert();
        lifecycle?.clear();
        delete section.dataset.scrollMotion;
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
