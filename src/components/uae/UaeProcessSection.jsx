import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { UaeProcessArtwork } from './UaeProcessArtwork';
import { UaeProcessMotion } from './UaeProcessMotion';

export function UaeProcessSection({ items }) {
  return (
    <section className="site-section sec-uae-process" id="uae-process" aria-labelledby="uae-process-title">
      <UaeProcessMotion />
      <div className="site-container container-large padding-global">
        <div className="section-header sec-uae__process-header">
          <div className="section-badge"><SubtitleMarquee text="From Concept to Launch ✦ " /></div>
          <h2 id="uae-process-title" className="heading-style-h2 section-title">Your ideas into a<br /><span className="text-color-secondary">market-leading UAE brand.</span></h2>
        </div>
        <div className="sec-uae__process-stage">
          <ol className="section-content sec-uae__process-journey">
          {items.map((step, index) => (
            <li className={`sec-uae__step sec-uae__step--${index % 2 ? 'right' : 'left'}`} key={step.step}>
              <div className="sec-uae__step-copy">
                <span className="sec-uae__step-rule" aria-hidden="true" />
                <h3 className="heading-style-h3 sec-uae__subtitle">{step.title}</h3>
                <p className="alg-text">{step.description}</p>
              </div>
              <div className="sec-uae__step-frame">
                <div className="sec-uae__step-illustration"><UaeProcessArtwork step={step.step} /></div>
                <span className="sec-uae__number" aria-hidden="true">{step.step}</span>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
