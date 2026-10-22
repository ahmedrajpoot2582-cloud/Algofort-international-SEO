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

    media.add('(prefers-reduced-motion: no-preference)', () => {
      let active = true;
      let lifecycle;
      const context = gsap.context(() => {}, section);

      // Offset coordinates ignore transforms, including a preceding frame that
      // is still sliding. Re-measure on refresh for responsive layouts/fonts.
      const layoutPosition = element => {
        let x = 0;
        let y = 0;
        for (let node = element; node; node = node.offsetParent) {
          x += node.offsetLeft;
          y += node.offsetTop;
        }
        return { x, y };
      };
      const buildScene = () => context.add(() => {
        const journey = section.querySelector('.sec-uae__process-journey');
        const steps = [...section.querySelectorAll('.sec-uae__step')];
        const frames = steps.map(step => step.querySelector('.sec-uae__step-frame'));
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: journey,
            start: 'top 80%',
            end: 'bottom 65%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        steps.forEach((step, index) => {
          if (index === 0) {
            // The first complete step travels from the left, toward the right.
            timeline.fromTo(step, { x: () => -window.innerWidth, opacity: 0 }, {
              x: 0, opacity: 1, duration: 1,
            }, 0);
            return;
          }
          const frame = frames[index];
          const previous = frames[index - 1];
          const difference = axis => layoutPosition(previous)[axis] - layoutPosition(frame)[axis];
          // Each frame unfolds from behind its predecessor into the staircase.
          // Existing z-index order keeps the preceding frame in front.
          const dropsDown = Math.abs(difference('y')) > 8;
          timeline.fromTo(frame, {
            x: () => difference('x'),
            y: () => difference('y'),
            opacity: 0,
          }, {
            // Drop below the preceding frame before shifting sideways, so the
            // emerging artwork never crosses its readable description.
            x: dropsDown ? () => difference('x') : 0,
            y: 0, opacity: 1, duration: dropsDown ? .65 : 1,
          }, index);
          if (dropsDown) timeline.to(frame, { x: 0, duration: .35 }, index + .65);
          timeline.fromTo(step.querySelector('.sec-uae__step-copy'), {
            x: step.classList.contains('sec-uae__step--right') ? 28 : -28,
            y: 12, opacity: 0,
          }, {
            x: 0, y: 0, opacity: 1, duration: .35,
          }, index + 1).fromTo(step.querySelector('.sec-uae__step-rule'), {
            scaleX: 0,
          }, {
            scaleX: 1, duration: .35,
          }, index + 1);
        });
        section.dataset.scrollMotion = 'scrub';
      });

      const setup = async () => {
        try {
          const { default: barba } = await import('@barba/core');
          if (!active) return;
          // An isolated Barba hook manager coordinates this scroll scene.
          // Do not initialize its SPA router: React owns the DOM and Next owns history.
          lifecycle = new barba.hooks.constructor();
          // Barba mounts the scene; ScrollTrigger alone controls its progress.
          // No restart/play callback: stopping the scroll also stops the boxes.
          lifecycle.enter(buildScene);
        } catch {
          // The artwork and readable server markup also work without this optional chunk.
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
