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

    media.add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 1100px)' }, ({ conditions }) => {
      if (!conditions.motion) return;
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
        const phase = 2;
        const reveal = .9;
        // Activate the viewport before ScrollTrigger measures its pin spacer.
        // Without JS/reduced motion, this stays an ordinary readable list.
        section.dataset.scrollMotion = 'pinned-scrub';
        const cameraY = step => {
          const centered = step.offsetTop - (stage.clientHeight - step.offsetHeight) / 2;
          return -Math.max(0, centered);
        };
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            // Pin the heading and artwork together; pan only the inner staircase.
            trigger: scene,
            start: 'top 24px',
            end: () => `+=${Math.round(Math.max(window.innerHeight * 1.15, 760) * steps.length)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        steps.forEach((step, index) => {
          const at = index * phase;
          const changesRow = index > 0 && step.offsetTop !== steps[index - 1].offsetTop;
          let enterAt = at;
          if (changesRow) {
            const previousRow = steps.slice(0, index).filter(item => item.offsetTop === steps[index - 1].offsetTop);
            // Remove an outgoing row while it is still completely in view.
            // Only pan after it is invisible: no half cards at the header edge.
            timeline.to(previousRow, { opacity: 0, duration: .22 }, at);
            timeline.to(journey, { y: () => cameraY(step), duration: .38 }, at + .22);
            enterAt += .6;
          } else if (index === 0) {
            timeline.set(journey, { y: () => cameraY(step) }, 0);
          }
          const safeX = () => {
            const desired = index === 0 ? -window.innerWidth * .3 : changesRow ? 0 : layoutPosition(frames[index - 1]).x - layoutPosition(frames[index]).x;
            return gsap.utils.clamp(-step.offsetLeft, Math.max(-step.offsetLeft, stage.clientWidth - step.offsetLeft - step.offsetWidth), desired);
          };
          const safeY = () => {
            const top = step.offsetTop + cameraY(step);
            return Math.max(0, Math.min(40, stage.clientHeight - top - step.offsetHeight - 8));
          };
          // Text and frame remain one unit. Keep the entire unit inside the
          // available canvas throughout its entrance, including narrow screens.
          timeline.fromTo(step, {
            x: safeX,
            y: changesRow || stage.clientWidth < 740 ? safeY : 0,
            opacity: 0,
          }, {
            x: 0, y: 0, opacity: 1, duration: reveal,
          }, enterAt);
        });
        // Each step gets a reading pause before the next starts, still tied to scroll.
        timeline.to({}, { duration: .5 }, (steps.length - 1) * phase + 1.5);
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
