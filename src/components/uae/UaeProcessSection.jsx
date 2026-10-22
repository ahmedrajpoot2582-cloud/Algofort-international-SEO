import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { UaeProcessArtwork } from './UaeProcessArtwork';
import { UaeProcessMotion } from './UaeProcessMotion';

export function UaeProcessSection({ items }) {
  return (
    <section className="site-section sec-uae-process" id="uae-process" aria-labelledby="uae-process-title">
      <UaeProcessMotion />
      <div className="site-container container-large padding-global">
        <div className="sec-uae__process-scene">
          <div className="section-header sec-uae__process-header">
            <div className="section-badge"><SubtitleMarquee text="From Concept to Launch ✦ " variant="light" /></div>
            <h2 id="uae-process-title" className="heading-style-h2 section-title">Your ideas into a<br /><span className="text-color-secondary">market-leading UAE brand.</span></h2>
          </div>
          <div className="sec-uae__process-stage">
            <svg className="sec-uae__process-connections" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M480 235H450V100H365" />
              <path d="M720 235H750V100H835" />
              <path d="M480 300H365" />
              <path d="M720 300H835" />
              <path d="M480 365H450V500H365" />
              <path d="M720 365H750V500H835" />
            </svg>
            <div className="sec-uae__process-hub" aria-hidden="true">
              <div className="sec-uae__process-hub-face">
                <span className="sec-uae__process-hub-brand">Algofort / UAE</span>
                <svg viewBox="0 0 80 80" fill="none"><path d="M40 8v64M8 40h64M17 17l46 46M17 63l46-46" stroke="currentColor" strokeWidth="3" /></svg>
                <strong>From idea<br />to impact.</strong>
                <span className="sec-uae__process-hub-caption">One connected process</span>
              </div>
            </div>
            <ol className="section-content sec-uae__process-journey">
              {items.map((step, index) => (
                <li className={`sec-uae__step sec-uae__step--${index % 2 ? 'right' : 'left'}`} key={step.step}>
                  <div className="sec-uae__step-copy">
                    <span className="sec-uae__step-label">Step {step.step}</span>
                    <h3 className="heading-style-h3 sec-uae__subtitle">{step.title}</h3>
                    <p className="alg-text">{step.description}</p>
                  </div>
                  <div className="sec-uae__step-frame">
                    <div className="sec-uae__step-illustration"><UaeProcessArtwork step={step.step} /></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
