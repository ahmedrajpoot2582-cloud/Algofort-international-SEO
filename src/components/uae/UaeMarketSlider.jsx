'use client';

import { useEffect, useRef, useState } from 'react';
import { SubtitleMarquee } from '../common/SubtitleMarquee';

const visuals = [
  { image: '/assets/services/service-web-development.webp', label: 'Two languages. One experience.', short: 'Bilingual experiences' },
  { image: '/assets/uae-market/commerce.webp', label: 'Built for a seamless checkout.', short: 'Local payments' },
  { image: '/assets/uae-market/logistics.webp', label: 'Every order. Connected.', short: 'Connected logistics' },
  { image: '/assets/uae-market/cloud.webp', label: 'Closer to your customers.', short: 'Regional cloud' },
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

  useEffect(() => {
    const card = cardRefs.current[active];
    const rail = card?.parentElement;
    if (card && rail && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  }, [active, reducedMotion]);

  return (
    <div className="uae-market-slider" ref={rootRef} role="region" aria-roledescription="carousel" aria-label="UAE market capabilities"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className="uae-market-slider__backgrounds" aria-hidden="true">
        {visuals.map((visual, index) => <img key={visual.image} src={visual.image} alt="" loading="lazy" decoding="async" width="1200" height="1200" className={index === active ? 'is-active' : ''} />)}
      </div>
      <div className="uae-market-slider__shade" aria-hidden="true" />
      <div className="uae-market-slider__layout">
        <div className="uae-market-slider__intro">
          <div className="section-badge"><SubtitleMarquee text="Built for the UAE market ✦ " variant="light" /></div>
          <h2 className="heading-style-h2 section-title">Engineered for<br /><span className="text-color-secondary">the UAE.</span></h2>
          <div className="uae-market-slider__copy" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
            {items.map((item, index) => <article key={item.number} className={index === active ? 'is-active' : ''} aria-hidden={index !== active}>
              <span className="uae-market-slider__eyebrow">{visuals[index].label}</span>
              <h3 className="heading-style-h3">{item.title}</h3>
              <p className="alg-text">{item.description}</p>
            </article>)}
          </div>
        </div>
        <div className="uae-market-slider__gallery">
          <div className="uae-market-slider__cards"
            onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
            onTouchEnd={event => {
              if (touchStart.current === null) return;
              const distance = touchStart.current - event.changedTouches[0].clientX;
              if (Math.abs(distance) > 45) { swipeUntil.current = Date.now() + 500; setPaused(true); move(distance > 0 ? 1 : -1); }
              touchStart.current = null;
            }}>
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
              <span className="uae-market-slider__card-number">{item.number}</span>
              <span className="uae-market-slider__card-label">{visuals[index].short}<span aria-hidden="true">↗</span></span>
            </button>)}
          </div>
          <div className="uae-market-slider__footer">
            <div className="uae-market-slider__controls">
              <button type="button" aria-label="Previous UAE feature" onClick={() => { setPaused(true); move(-1); }}><span aria-hidden="true">←</span></button>
              <button type="button" aria-label="Next UAE feature" onClick={() => { setPaused(true); move(1); }}><span aria-hidden="true">→</span></button>
              {!reducedMotion && <button type="button" aria-label={paused ? 'Play UAE slides' : 'Pause UAE slides'} onClick={() => setPaused(value => !value)}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>}
            </div>
            <div className="uae-market-slider__progress" aria-hidden="true">{items.map((item, index) => <span key={item.number} className={index === active ? 'is-active' : ''} />)}</div>
            <span className="uae-market-slider__count"><strong>{items[active].number}</strong> / 04</span>
          </div>
        </div>
      </div>
    </div>
  );
}
