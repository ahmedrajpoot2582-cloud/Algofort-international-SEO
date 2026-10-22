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
        const scene = section.querySelector('.sec-uae__process-scene');
        const stage = section.querySelector('.sec-uae__process-stage');
        const journey = section.querySelector('.sec-uae__process-journey');
        const steps = [...section.querySelectorAll('.sec-uae__step')];
        const frames = steps.map(step => step.querySelector('.sec-uae__step-frame'));
        const phase = 1.8;
        const reveal = 1.2;
        // Activate the viewport before ScrollTrigger measures its pin spacer.
        // Without JS/reduced motion, this stays an ordinary readable list.
        section.dataset.scrollMotion = 'pinned-scrub';
        const cameraY = step => {
          const lastY = Math.max(0, journey.offsetHeight - stage.clientHeight + 24);
          const centered = step.offsetTop - (stage.clientHeight - step.offsetHeight) / 2;
          return -Math.min(lastY, Math.max(0, centered));
        };
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            // Pin the heading and artwork together; pan only the inner staircase.
            trigger: scene,
            start: 'top 24px',
            end: () => `+=${Math.round(Math.max(window.innerHeight * 2.4, 1600) * steps.length)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        steps.forEach((step, index) => {
          const at = index * phase;
          // Pan the tall staircase inside its sticky viewport, keeping the
          // current text and frame readable together instead of cutting off rows.
          timeline.to(journey, { y: () => cameraY(step), duration: reveal }, at);
          if (index === 0) {
            // The first complete step travels from the left, toward the right.
            timeline.fromTo(step, { x: () => -window.innerWidth, opacity: 0 }, {
              x: 0, opacity: 1, duration: reveal,
            }, at);
            return;
          }
          const frame = frames[index];
          const previous = frames[index - 1];
          const difference = axis => layoutPosition(previous)[axis] - layoutPosition(frame)[axis];
          // Move the complete step: copy and artwork share exactly one transform.
          // Opaque step canvases and z-order mask text while it unfolds underneath.
          const dropsDown = Math.abs(difference('y')) > 8;
          timeline.fromTo(step, {
            x: () => difference('x'),
            y: () => difference('y'),
            opacity: 0,
          }, {
            // Drop below the preceding step, then align with the staircase.
            x: dropsDown ? () => difference('x') : 0,
            y: 0, opacity: 1, duration: dropsDown ? reveal * .65 : reveal,
          }, at);
          if (dropsDown) timeline.to(step, { x: 0, duration: reveal * .35 }, at + reveal * .65);
        });
        // Each step gets a reading pause before the next starts, still tied to scroll.
        timeline.to({}, { duration: phase - reveal }, (steps.length - 1) * phase + reveal);
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
