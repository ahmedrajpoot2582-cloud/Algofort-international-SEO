import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { ProcessSection } from '../sections/ProcessSection';
import { UaeEcosystemMotion } from './UaeEcosystemMotion';
import { UaeMarketSlider } from './UaeMarketSlider';
import { UaeAdvantagesMotion } from './UaeAdvantagesMotion';
import { UaeResultsMotion } from './UaeResultsMotion';
import { uaeSections as content } from '../../data/uae-sections';

const asterisk = '/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg';

function SectionHeading({ badge, children, description, dark = false, titleId }) {
  return (
    <div className="section-header sec-uae-expansion__header">
      <div className="section-badge">
        <SubtitleMarquee text={`${badge} ✦ `} variant={dark ? 'light' : 'dark'} icon={asterisk} />
      </div>
      <h2 id={titleId} className="heading-style-h2 section-title">{children}</h2>
      {description && <p className="alg-text section-description">{description}</p>}
    </div>
  );
}

export function UaeIndustriesSection() {
  return (
    <ProcessSection
      id="uae-industries"
      className="uae-industries-home-process"
      badge="Industries we serve ✦ "
      headingLabel="Powering digital transformation across Dubai’s key sectors."
      leftTitle={['Powering digital', <>across <span className="alg-process-brand-script brand-script">Dubai’s</span></>]}
      rightTitle={['transformation', 'key sectors.']}
      items={content.industries.map(({ number, title, description }) => ({ step: number, title, description }))}
      footerDescription="We build tailored software, high-converting web platforms, and mobile apps designed for the fastest-growing industries in the UAE and wider GCC."
    />
  );
}

export function UaeEcosystemSection() {
  return (
    <section className="site-section sec-uae-expansion sec-uae-ecosystem" id="uae-ecosystem" aria-label="Built for the UAE market">
      <UaeEcosystemMotion />
      <div className="site-container container-large padding-global">
        <SectionHeading badge="Built for the UAE market">Local knowledge.<br /><span className="text-color-secondary">Global engineering.</span></SectionHeading>
        <div className="sec-uae-ecosystem__panel">
          <UaeMarketSlider items={content.ecosystem} />
        </div>
      </div>
    </section>
  );
}

export function UaeAdvantagesSection() {
  const labels = ['Aligned working hours', 'Clear project milestones', 'Your ideas. Your ownership.', 'A team that works with you'];
  return (
    <section className="site-section sec-uae-expansion sec-uae-advantages" id="uae-advantages" aria-label="Why choose Algofort">
      <UaeAdvantagesMotion />
      <div className="site-container container-large padding-global">
        <div className="sec-uae-advantages__layout">
          <div className="sec-uae-advantages__intro">
            <SectionHeading dark badge="Why choose Algofort" description="Four ways we make cross-border projects work.">Silicon Valley engineering.<br /><span className="text-color-secondary">Seamless Dubai collaboration.</span></SectionHeading>
          </div>
          <div className="sec-uae-advantages__timeline">
            <svg className="sec-uae-advantages__route" viewBox="0 0 1200 1800" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path className="sec-uae-advantages__route-base" d="" />
              <path className="sec-uae-advantages__route-progress" d="" />
            </svg>
            <ol className="section-content sec-uae-advantages__list">
              {content.advantages.map((item, index) => <li className="sec-uae-advantages__item" key={item.number} data-timeline-label={labels[index]}>
                <span className="sec-uae-advantages__marker" aria-hidden="true" />
                <div className="sec-uae-advantages__card">
                  <div className="sec-uae-advantages__card-meta"><span aria-hidden="true">{item.number}</span><span className="sec-uae-advantages__card-label">{labels[index]}</span></div>
                  <h3 className="heading-style-h3 sec-uae-expansion__subtitle">{item.title}</h3><p className="alg-text">{item.description}</p>
                </div>
              </li>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UaeResultsSection() {
  return (
    <section className="site-section sec-uae-expansion sec-uae-results" id="uae-results" aria-label="Recent success stories">
      <UaeResultsMotion />
      <div className="site-container container-large padding-global">
        <div className="sec-uae-results__stage">
        <div className="sec-uae-results__intro">
          <SectionHeading badge="Proven results">How we help<br /><span className="text-color-secondary">brands scale.</span></SectionHeading>
          <div className="sec-uae-expansion__caption"><span>Recent success stories</span></div>
        </div>
        <div className="section-content sec-uae-results__grid">
          {content.results.map((result) => <article className="content-card sec-uae-results__card" key={result.number}>
            <span className="sec-uae-expansion__number">({result.number})</span>
            <div className="sec-uae-results__outcome"><strong>{result.metric}</strong><span>{result.metricLabel}</span></div>
            <h3 className="heading-style-h3 sec-uae-expansion__subtitle">{result.title}</h3>
            <p className="sec-uae-results__category">{result.category}</p>
            <p className="alg-text">{result.description}</p>
          </article>)}
        </div>
        </div>
      </div>
    </section>
  );
}
