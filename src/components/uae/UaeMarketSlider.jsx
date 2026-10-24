'use client';

import { useEffect, useRef, useState } from 'react';

const visuals = [
  { image: '/assets/services/service-web-development.webp', heading: 'Bilingual by design.', short: 'Bilingual experiences' },
  { image: '/assets/uae-market/commerce.webp', heading: 'Checkout without friction.', short: 'Local payments' },
  { image: '/assets/uae-market/logistics.webp', heading: 'Logistics in sync.', short: 'Connected logistics' },
  { image: '/assets/uae-market/cloud.webp', heading: 'Built closer to you.', short: 'Regional cloud' },
];

export function UaeMarketSlider({ items }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStart = useRef(null);
  const swipeUntil = useRef(0);
  const move = direction => setActive(value => (value + direction + items.length) % items.length);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    const observer = new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: .2 });
    observer.observe(rootRef.current);
    const onVisibility = () => { if (document.hidden) setInView(false); else setInView(rootRef.current.getBoundingClientRect().bottom > 0 && rootRef.current.getBoundingClientRect().top < innerHeight); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const playing = inView && !paused && !interacting && !reducedMotion;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % items.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, active, items.length]);

  return (
    <div className="uae-market-slider" ref={rootRef} role="region" aria-roledescription="carousel" aria-label="UAE market capabilities"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className="uae-market-slider__backgrounds" aria-hidden="true">
        {visuals.map((visual, index) => <img key={visual.image} src={visual.image} alt="" loading="lazy" decoding="async" width="1200" height="1200" className={index === active ? 'is-active' : ''} />)}
      </div>
      <div className="uae-market-slider__shade" aria-hidden="true" />
      <div className="uae-market-slider__stage"
        onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={event => {
          if (!touchStart.current) return;
          const distance = touchStart.current.x - event.changedTouches[0].clientX;
          const vertical = touchStart.current.y - event.changedTouches[0].clientY;
          if (Math.abs(distance) > 45 && Math.abs(distance) > Math.abs(vertical) * 1.2) {
            swipeUntil.current = Date.now() + 500; setPaused(true); move(distance > 0 ? 1 : -1);
          }
          touchStart.current = null;
        }}>
        <div className="uae-market-slider__intro">
          <div className="uae-market-slider__copy" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
            {items.map((item, index) => <article key={item.number} className={index === active ? 'is-active' : ''} aria-hidden={index !== active}>
              <span className="uae-market-slider__eyebrow">{item.number} / {visuals[index].short}</span>
              <h3 className="heading-style-h3">{visuals[index].heading}</h3>
              <p className="alg-text">{item.description}</p>
            </article>)}
          </div>
          <div className="uae-market-slider__controls">
            <button type="button" aria-label="Previous UAE feature" onClick={() => { setPaused(true); move(-1); }}><span aria-hidden="true">←</span></button>
            <button type="button" aria-label="Next UAE feature" onClick={() => { setPaused(true); move(1); }}><span aria-hidden="true">→</span></button>
            {!reducedMotion && <button className="uae-market-slider__play" type="button" aria-label={paused ? 'Play UAE slides' : 'Pause UAE slides'} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>}
            <span className="uae-market-slider__count"><strong>{items[active].number}</strong><span> / {String(items.length).padStart(2, '0')}</span></span>
          </div>
        </div>
        <div className="uae-market-slider__scene" aria-hidden="true">
          {visuals.map((visual, index) => <img key={visual.image} src={visual.image} alt="" loading="lazy" decoding="async" width="1200" height="1200" className={index === active ? 'is-active' : ''} />)}
          <span className="uae-market-slider__scene-caption">UAE / GCC <span>Built around your business.</span></span>
        </div>
      </div>
          <div className="uae-market-slider__cards" aria-label="Choose a UAE capability">
            {items.map((item, index) => <button key={item.number} type="button" ref={element => { cardRefs.current[index] = element; }}
              className={`uae-market-slider__card${index === active ? ' is-active' : ''}`} aria-pressed={index === active}
              aria-label={`Show ${visuals[index].short}`} onClick={() => { if (Date.now() >= swipeUntil.current) { setPaused(true); setActive(index); } }}
              onKeyDown={event => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
                event.preventDefault();
                const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
                setPaused(true); setActive(next); cardRefs.current[next]?.focus({ preventScroll: true });
              }}>
              <img src={visuals[index].image} alt="" loading="lazy" decoding="async" width="1200" height="1200" />
              <span className="uae-market-slider__card-copy"><span className="uae-market-slider__card-number">{item.number}</span><span className="uae-market-slider__card-label">{visuals[index].short}</span></span>
              <span className="uae-market-slider__card-arrow" aria-hidden="true">↗</span>
            </button>)}
          </div>
    </div>
  );
}
