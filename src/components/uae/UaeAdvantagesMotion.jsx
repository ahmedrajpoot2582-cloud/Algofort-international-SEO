'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeAdvantagesMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-advantages');
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const route = section.querySelector('.sec-uae-advantages__route');
    const timeline = section.querySelector('.sec-uae-advantages__timeline');
    const paths = [...route.querySelectorAll('path')];
    const progressPath = section.querySelector('.sec-uae-advantages__route-progress');
    const items = [...section.querySelectorAll('.sec-uae-advantages__item')];
    const markers = items.map(item => item.querySelector('.sec-uae-advantages__marker'));
    const originalViewBox = route.getAttribute('viewBox');
    const originalPaths = paths.map(path => path.getAttribute('d'));
    let active = true;
    let pathLength = 1;
    const measure = () => {
      const bounds = timeline.getBoundingClientRect();
      const width = timeline.clientWidth;
      const height = timeline.clientHeight;
      const points = markers.map(marker => {
        const box = marker.getBoundingClientRect();
        return { x: box.left - bounds.left + box.width / 2, y: box.top - bounds.top + box.height / 2 };
      });
      const first = points[0];
      // Vertical tangents meet at every side node, so consecutive curves never kink.
      // The journey starts and ends at a card; there are no loose decorative tails.
      let d = `M${first.x} ${first.y}`;
      points.slice(1).forEach((point, index) => {
        const previous = points[index];
        const dy = point.y - previous.y;
        d += `C${previous.x} ${previous.y + dy * .5} ${point.x} ${point.y - dy * .5} ${point.x} ${point.y}`;
      });
      route.setAttribute('viewBox', `0 0 ${width} ${height}`);
      paths.forEach(path => path.setAttribute('d', d));
      pathLength = progressPath.getTotalLength();
    };
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(progressPath, {
        strokeDasharray: () => pathLength, strokeDashoffset: () => pathLength,
      }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: {
          trigger: markers[0], start: 'center 70%', endTrigger: markers.at(-1), end: 'center 70%', scrub: .65,
          invalidateOnRefresh: true,
        },
      });
      items.forEach(item => {
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 55%', scrub: .5 },
        });
        reveal.fromTo(item.querySelector('.sec-uae-advantages__card'), { opacity: .3 }, {
          opacity: 1, duration: 1, ease: 'none',
        }, 0);
        reveal.fromTo(item.querySelectorAll('.sec-uae-advantages__card > *'), { y: 18, opacity: .25 }, {
          y: 0, opacity: 1, stagger: .08, duration: .8, ease: 'none',
        }, 0);
        reveal.fromTo(item.querySelector('.sec-uae-advantages__marker'), {
          backgroundColor: '#5b5146',
        }, { backgroundColor: '#f47a1f', duration: 1, ease: 'none' }, 0);
      });
    });
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => {
      active = false;
      ScrollTrigger.removeEventListener('refreshInit', measure);
      media.revert();
      route.setAttribute('viewBox', originalViewBox);
      paths.forEach((path, index) => path.setAttribute('d', originalPaths[index]));
    };
  }, []);
  return null;
}
