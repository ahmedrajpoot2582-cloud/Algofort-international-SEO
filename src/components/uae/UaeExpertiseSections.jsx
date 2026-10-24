import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { ProcessSection } from '../sections/ProcessSection';
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

export function UaeIndustriesSection({ items = content.industries, place = 'Dubai’s' } = {}) {
  return (
    <ProcessSection
      id="uae-industries"
      className="uae-industries-home-process"
      badge="Industries we serve ✦ "
      headingLabel={`Powering digital transformation across ${place} key sectors.`}
      leftTitle={['Powering digital', <>across <span className="alg-process-brand-script brand-script">{place}</span></>]}
      rightTitle={['transformation', 'key sectors.']}
      items={items.map(({ number, title, description }) => ({ step: number, title, description }))}
    />
  );
}

export function UaeAdvantagesSection({ items = content.advantages, intro = 'Silicon Valley engineering.', highlight = 'Seamless Dubai collaboration.', description = 'Four ways we make cross-border projects work.' } = {}) {
  return (
    <section className="site-section sec-uae-expansion sec-uae-advantages" id="uae-advantages" aria-label="Why choose Algofort">
      <UaeAdvantagesMotion />
      <div className="site-container container-large padding-global">
        <div className="sec-uae-advantages__layout">
          <div className="sec-uae-advantages__intro">
            <SectionHeading dark badge="Why choose Algofort" description={description}>{intro}<br /><span className="text-color-secondary">{highlight}</span></SectionHeading>
          </div>
          <div className="sec-uae-advantages__timeline">
            <svg className="sec-uae-advantages__route" viewBox="0 0 1200 1800" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path className="sec-uae-advantages__route-base" d="" />
              <path className="sec-uae-advantages__route-progress" d="" />
            </svg>
            <ol className="section-content sec-uae-advantages__list">
              {items.map((item) => <li className="sec-uae-advantages__item" key={item.number}>
                <span className="sec-uae-advantages__marker" aria-hidden="true" />
                <div className="sec-uae-advantages__card">
                  <div className="sec-uae-advantages__card-meta"><span aria-hidden="true">{item.number}</span></div>
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

export function UaeResultsSection({ items = content.results, badge = 'Proven results', caption = 'Recent success stories' } = {}) {
  return (
    <section className="site-section sec-uae-expansion sec-uae-results" id="uae-results" aria-label={caption}>
      <UaeResultsMotion />
      <div className="site-container container-large padding-global">
        <div className="sec-uae-results__stage">
        <div className="sec-uae-results__intro">
          <SectionHeading badge={badge}>How we help<br /><span className="text-color-secondary">brands scale.</span></SectionHeading>
          <div className="sec-uae-expansion__caption"><span>{caption}</span></div>
        </div>
        <div className="section-content sec-uae-results__grid">
          {items.map((result) => <article className="content-card sec-uae-results__card" key={result.number}>
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
