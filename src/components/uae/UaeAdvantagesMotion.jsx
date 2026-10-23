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
    const cursor = section.querySelector('.sec-uae-advantages__route-cursor');
    const items = [...section.querySelectorAll('.sec-uae-advantages__item')];
    const markers = items.map(item => item.querySelector('.sec-uae-advantages__marker'));
    const originalViewBox = route.getAttribute('viewBox');
    const originalPaths = paths.map(path => path.getAttribute('d'));
    let active = true;
    let pathLength = 1;
    let routeProgress = 0;
    const moveCursor = progress => {
      routeProgress = progress;
      const point = progressPath.getPointAtLength(pathLength * progress);
      cursor.setAttribute('cx', point.x);
      cursor.setAttribute('cy', point.y);
    };
    const measure = () => {
      const bounds = timeline.getBoundingClientRect();
      const width = timeline.clientWidth;
      const height = timeline.clientHeight;
      const narrow = window.innerWidth < 768;
      const points = markers.map(marker => {
        const box = marker.getBoundingClientRect();
        return { x: box.left - bounds.left + box.width / 2, y: box.top - bounds.top + box.height / 2 };
      });
      const first = points[0];
      const startY = Math.max(16, first.y - (narrow ? 80 : 180));
      let d = narrow
        ? `M${first.x} ${startY}C${first.x - 14} ${startY + 30} ${first.x + 14} ${first.y - 30} ${first.x} ${first.y}`
        : `M${width * .08} ${startY}C${width * .35} ${startY} ${first.x} ${first.y - 80} ${first.x} ${first.y}`;
      points.slice(1).forEach((point, index) => {
        const previous = points[index];
        const dy = point.y - previous.y;
        const bend = narrow ? (index % 2 ? -16 : 16) : (point.x < previous.x ? width * .15 : -width * .15);
        d += `C${previous.x + bend} ${previous.y + dy * .45} ${point.x - bend} ${point.y - dy * .45} ${point.x} ${point.y}`;
      });
      const last = points.at(-1);
      const endY = Math.min(height - 16, last.y + 100);
      d += `C${last.x} ${last.y + 40} ${narrow ? last.x : width * .45} ${endY} ${narrow ? last.x : width * .58} ${endY}`;
      route.setAttribute('viewBox', `0 0 ${width} ${height}`);
      paths.forEach(path => path.setAttribute('d', d));
      pathLength = progressPath.getTotalLength();
      moveCursor(routeProgress);
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
          trigger: timeline, start: 'top 80%', end: 'bottom 65%', scrub: .5,
          invalidateOnRefresh: true, onUpdate: self => moveCursor(self.progress),
        },
      });
      items.forEach(item => {
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 55%', scrub: .5 },
        });
        reveal.fromTo(item.querySelector('.sec-uae-advantages__card'), { y: 40, opacity: .2, scale: .97 }, {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'none',
        }, 0);
        reveal.fromTo(item.querySelector('.sec-uae-advantages__marker'), {
          scale: .7, backgroundColor: '#5b5146',
        }, { scale: 1, backgroundColor: '#f47a1f', duration: 1, ease: 'none' }, 0);
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
