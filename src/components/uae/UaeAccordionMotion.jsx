'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeAccordionMotion() {
  useEffect(() => {
    const root = document.querySelector('.page-uae');
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let refreshFrame;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const groups = new Map();
    const controllers = [...root.querySelectorAll('#uae-ecosystem details, #sec-faq details')].map(details => {
      const summary = details.querySelector('summary');
      const body = summary?.nextElementSibling;
      if (!summary || !body) return null;
      const groupKey = details.closest('#uae-ecosystem, #sec-faq');
      if (!groups.has(groupKey)) groups.set(groupKey, []);
      const group = groups.get(groupKey);
      const originalStyle = body.getAttribute('style');
      const originalExpanded = summary.getAttribute('aria-expanded');
      let expanded = details.open;
      let tween;
      details.dataset.uaeAccordion = '';
      const state = value => {
        details.dataset.accordionState = value;
        summary.setAttribute('aria-expanded', String(expanded));
      };
      const settle = () => {
        tween?.kill();
        details.open = expanded;
        gsap.set(body, { height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0, overflow: 'hidden' });
        state(expanded ? 'open' : 'closed');
      };
      settle();
      const setExpanded = next => {
        if (expanded === next) return;
        const height = body.getBoundingClientRect().height;
        tween?.kill();
        expanded = next;
        if (preference.matches) {
          settle();
          refresh();
          return;
        }
        if (expanded) details.open = true;
        state(expanded ? 'opening' : 'closing');
        gsap.set(body, { height, overflow: 'hidden' });
        tween = gsap.to(body, {
          height: expanded ? body.scrollHeight : 0,
          opacity: expanded ? 1 : 0,
          duration: .42,
          ease: 'power2.inOut',
          onComplete: () => {
            settle();
            refresh();
          },
        });
      };
      const click = event => {
        event.preventDefault();
        const next = !expanded;
        if (next) group.forEach(controller => controller.setExpanded(false));
        setExpanded(next);
      };
      summary.addEventListener('click', click);
      const controller = {
        settle,
        setExpanded,
        destroy: () => {
          tween?.kill();
          summary.removeEventListener('click', click);
          details.open = expanded;
          if (originalStyle === null) body.removeAttribute('style');
          else body.setAttribute('style', originalStyle);
          if (originalExpanded === null) summary.removeAttribute('aria-expanded');
          else summary.setAttribute('aria-expanded', originalExpanded);
          delete details.dataset.uaeAccordion;
          delete details.dataset.accordionState;
        },
      };
      group.push(controller);
      return controller;
    }).filter(Boolean);
    const reduceMotion = () => {
      if (!preference.matches) return;
      controllers.forEach(controller => controller.settle());
      refresh();
    };
    preference.addEventListener('change', reduceMotion);
    return () => {
      cancelAnimationFrame(refreshFrame);
      preference.removeEventListener('change', reduceMotion);
      controllers.forEach(controller => controller.destroy());
    };
  }, []);
  return null;
}
