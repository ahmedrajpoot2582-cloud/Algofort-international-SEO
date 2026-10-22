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

      const setup = async () => {
        try {
          const { default: barba } = await import('@barba/core');
          if (!active) return;
          // An isolated Barba hook manager coordinates this scroll scene.
          // Do not initialize its SPA router: React owns the DOM and Next owns history.
          lifecycle = new barba.hooks.constructor();
          lifecycle.enter(({ next, animation }) => {
            next.container.dataset.transition = 'entering';
            return animation.restart().then(() => {
              if (active) next.container.dataset.transition = 'visible';
            });
          });
        } catch {
          // The artwork and readable server markup also work without this optional chunk.
        }
        if (!active) return;
        context.add(() => {
          section.querySelectorAll('.sec-uae__step').forEach((step, index) => {
            const right = step.classList.contains('sec-uae__step--right');
            const animation = gsap.timeline({ paused: true });
            animation.fromTo(step, {
              x: index === 0 ? 90 : (right ? 28 : -28),
              y: index === 0 ? 0 : 80,
              opacity: 0,
            }, {
              x: 0, y: 0, opacity: 1,
              duration: 1, ease: 'power3.out', immediateRender: false,
            }).fromTo(step.querySelector('.sec-uae__step-frame'), {
              y: 24, rotation: right ? 3 : -3,
            }, {
              y: 0, rotation: 0, duration: 1, ease: 'power3.out', immediateRender: false,
            }, 0).fromTo(step.querySelector('.sec-uae__step-rule'), {
              scaleX: 0,
            }, {
              scaleX: 1, duration: .7, ease: 'power2.out', immediateRender: false,
            }, .15);

            const enter = () => {
              if (animation.isActive()) return;
              if (lifecycle) {
                lifecycle.do('enter', { next: { container: step, namespace: 'uae-process' }, animation });
              } else animation.restart();
            };
            ScrollTrigger.create({
              trigger: step, start: 'top 88%', onEnter: enter, onEnterBack: enter,
            });
          });
        });
        document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      };
      setup();
      return () => {
        active = false;
        context.revert();
        lifecycle?.clear();
        section.querySelectorAll('[data-transition]').forEach(step => { delete step.dataset.transition; });
      };
    });

    return () => media.revert();
  }, []);
  return null;
}
