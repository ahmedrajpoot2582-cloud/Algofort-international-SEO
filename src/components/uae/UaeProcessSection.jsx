import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { UaeProcessArtwork } from './UaeProcessArtwork';
import { UaeProcessMotion } from './UaeProcessMotion';

export function UaeProcessSection({ items, market = 'UAE' }) {
  const connections = [
    'M600 235H484Q470 235 470 221V114Q470 100 456 100H440',
    'M600 235H716Q730 235 730 221V114Q730 100 744 100H760',
    'M600 300H440', 'M600 300H760',
    'M600 365H484Q470 365 470 379V486Q470 500 456 500H440',
    'M600 365H716Q730 365 730 379V486Q730 500 744 500H760',
  ];
  return (
    <section className="site-section sec-uae-process" id="uae-process" aria-labelledby="uae-process-title">
      <UaeProcessMotion />
      <div className="site-container container-large padding-global">
        <div className="sec-uae__process-scene">
          <div className="section-header sec-uae__process-header">
            <div className="section-badge"><SubtitleMarquee text="From Concept to Launch ✦ " /></div>
            <h2 id="uae-process-title" className="heading-style-h2 section-title">Your ideas into a<br /><span className="text-color-secondary">market-leading {market} brand.</span></h2>
          </div>
          <div className="sec-uae__process-stage">
            <svg className="sec-uae__process-connections" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
              {connections.map(d => <path className="sec-uae__connection-flow" d={d} key={d} />)}
            </svg>
            <div className="sec-uae__process-hub" aria-hidden="true">
              <div className="sec-uae__process-hub-face">
                <span className="sec-uae__process-hub-brand">Algofort / {market}</span>
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
