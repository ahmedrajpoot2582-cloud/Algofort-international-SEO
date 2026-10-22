import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { ProcessSection } from '../sections/ProcessSection';
import { UaeEcosystemMotion } from './UaeEcosystemMotion';
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
        <div className="sec-uae-ecosystem__panel">
          <div className="sec-uae-ecosystem__background" aria-hidden="true" />
          <div className="sec-uae-ecosystem__intro">
            <SectionHeading dark badge="Built for the UAE market" description="Succeeding in Dubai requires more than a generic template. We build digital products pre-configured for the technical, cultural, and regulatory demands of the United Arab Emirates.">Engineered specifically<br /><span className="text-color-secondary">for UAE business standards.</span></SectionHeading>
            <span className="sec-uae-ecosystem__caption">Local ecosystem ready</span>
          </div>
          <div className="section-content sec-uae-ecosystem__list">
            {content.ecosystem.map((item, index) => <details className="sec-uae-ecosystem__item" key={item.number} open={index === 0}>
              <summary><span className="sec-uae-expansion__number">{item.number}</span><h3 className="heading-style-h3 sec-uae-expansion__subtitle">{item.title}</h3><span className="sec-uae-ecosystem__toggle" aria-hidden="true" /></summary>
              <div className="sec-uae-ecosystem__body"><p className="alg-text">{item.description}</p></div>
            </details>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function UaeAdvantagesSection() {
  return (
    <section className="site-section sec-uae-expansion sec-uae-advantages" id="uae-advantages" aria-label="Why choose Algofort">
      <div className="site-container container-large padding-global">
        <div className="sec-uae-advantages__layout">
          <div><SectionHeading badge="Why choose Algofort">Silicon Valley engineering.<br /><span className="text-color-secondary">Seamless Dubai collaboration.</span></SectionHeading><p className="sec-uae-expansion__eyebrow">The Algofort advantage</p></div>
          <div className="section-content sec-uae-advantages__list">
            {content.advantages.map((item) => <article className="sec-uae-advantages__item" key={item.number}><span className="sec-uae-expansion__number">{item.number}</span><div><h3 className="heading-style-h3 sec-uae-expansion__subtitle">{item.title}</h3><p className="alg-text">{item.description}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function UaeTechnologySection() {
  return (
    <section className="site-section sec-uae-expansion sec-uae-technology" id="uae-technology" aria-label="Our technology stack">
      <div className="site-container container-large padding-global">
        <SectionHeading badge="Our tech stack">Technologies we use<br /><span className="text-color-secondary">to build scalable products.</span></SectionHeading>
        <div className="sec-uae-expansion__caption"><span>Built with modern tech</span></div>
        <div className="section-content sec-uae-technology__list">
          {content.technology.map((category) => <div className="sec-uae-technology__row" key={category.title}><h3 className="heading-style-h3 sec-uae-expansion__subtitle">{category.title}</h3><ul className="sec-uae-technology__tools" aria-label={category.title}>{category.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>)}
        </div>
      </div>
    </section>
  );
}

export function UaeResultsSection() {
  return (
    <section className="site-section sec-uae-expansion sec-uae-results" id="uae-results" aria-label="Recent success stories">
      <div className="site-container container-large padding-global">
        <SectionHeading badge="Proven results">How we help<br /><span className="text-color-secondary">brands scale.</span></SectionHeading>
        <div className="sec-uae-expansion__caption"><span>Recent success stories</span></div>
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
    </section>
  );
}
