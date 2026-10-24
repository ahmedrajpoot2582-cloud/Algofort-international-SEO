'use client';

import { useEffect, useRef, useState } from 'react';

const visuals = [
  { image: '/assets/services/service-web-development.webp', heading: 'Bilingual by design.', short: 'Bilingual experiences' },
  { image: '/assets/uae-market/commerce.webp', heading: 'Checkout without friction.', short: 'Local payments' },
  { image: '/assets/uae-market/logistics.webp', heading: 'Logistics in sync.', short: 'Connected logistics' },
  { image: '/assets/uae-market/cloud.webp', heading: 'Built closer to you.', short: 'Regional cloud' },
];

export function UaeMarketSlider({ items }) {
  const [slide, setSlide] = useState({ active: 0, previous: null, direction: 1 });
  const [reducedMotion, setReducedMotion] = useState(true);
  const touchStart = useRef(null);
  const { active, previous, direction } = slide;
  const turning = previous !== null;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!turning) return;
    // Keep one page turn at a time; clean up even when navigating away.
    const timer = window.setTimeout(() => setSlide(value => ({ ...value, previous: null })), reducedMotion ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [turning, reducedMotion]);

  const move = step => {
    if (turning) return;
    setSlide(value => ({
      active: (value.active + step + items.length) % items.length,
      previous: reducedMotion ? null : value.active,
      direction: step,
    }));
  };

  return (
    <div className="uae-market-slider" role="region" aria-roledescription="carousel" aria-label="UAE market capabilities"
      onKeyDown={event => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }}>
      <div className="uae-market-slider__stage"
        onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={event => {
          if (!touchStart.current) return;
          const distance = touchStart.current.x - event.changedTouches[0].clientX;
          const vertical = touchStart.current.y - event.changedTouches[0].clientY;
          if (Math.abs(distance) > 45 && Math.abs(distance) > Math.abs(vertical) * 1.2) move(distance > 0 ? 1 : -1);
          touchStart.current = null;
        }}>
        <div className="uae-market-slider__intro">
          <div className="uae-market-slider__copy" aria-live="polite" aria-atomic="true">
            {items.map((item, index) => <article key={item.number} className={index === active ? 'is-active' : ''} aria-hidden={index !== active}>
              <span className="uae-market-slider__eyebrow">{item.number} / {visuals[index].short}</span>
              <h3 className="heading-style-h3">{visuals[index].heading}</h3>
              <p className="alg-text">{item.description}</p>
            </article>)}
          </div>
          <div className="uae-market-slider__controls">
            <button type="button" aria-label="Previous UAE feature" aria-disabled={turning} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
            <button type="button" aria-label="Next UAE feature" aria-disabled={turning} onClick={() => move(1)}><span aria-hidden="true">→</span></button>
            <span className="uae-market-slider__count"><strong>{items[active].number}</strong><span> / {String(items.length).padStart(2, '0')}</span></span>
          </div>
        </div>
        <div className="uae-market-slider__scene" data-turn-direction={direction > 0 ? 'forward' : 'backward'} aria-hidden="true">
          {visuals.map((visual, index) => <div key={visual.image} className={`uae-market-slider__page${index === active ? ' is-active' : ''}${index === previous ? ' is-turning' : ''}`}>
            <img src={visual.image} alt="" loading="lazy" decoding="async" width="1200" height="1200" />
            <span className="uae-market-slider__page-shade" />
          </div>)}
          <span className="uae-market-slider__scene-caption">UAE / GCC <span>Built around your business.</span></span>
        </div>
      </div>
    </div>
  );
}
