import { SubtitleMarquee } from '../common/SubtitleMarquee';
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

function IndustryIcon({ name }) {
  const paths = {
    property: <><path d="M3 21V7l9-4v18M12 9h9v12M7 9h1M7 13h1M7 17h1M16 13h1M16 17h1M2 21h20" /></>,
    retail: <><path d="M5 8h14l2 13H3L5 8Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2M9 12h.01M15 12h.01" /></>,
    finance: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 10h18M7 15h3M14 15h3" /></>,
    logistics: <><path d="M3 5h11v12H3zM14 10h4l3 4v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    health: <><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M8 12h8M12 8v8" /></>,
    travel: <><path d="m3 10 7 2 8-8c1-1 3-1 3 0s0 2-1 3l-8 8 2 6-3-1-2-4-4-2-2-4Z" /></>,
  };
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function UaeIndustriesSection() {
  return (
    <section className="site-section sec-uae-expansion sec-uae-industries" id="uae-industries" aria-labelledby="uae-industries-title">
      <div className="site-container container-large padding-global">
        <SectionHeading titleId="uae-industries-title" badge="Industries we serve" description="We build tailored software, high-converting web platforms, and mobile apps designed for the fastest-growing industries in the UAE and wider GCC."><span className="uae-industries-title-line">Powering digital transformation</span>{' '}<span className="uae-industries-title-line">across <em className="uae-heading-script">Dubai’s</em> key sectors.</span></SectionHeading>
        <div className="sec-uae-expansion__caption"><span>Sector-specific expertise</span><span>06 industries</span></div>
        <div className="section-content sec-uae-industries__grid">
          {content.industries.map((industry) => <article className="sec-uae-industries__item" key={industry.number}>
            <div className="sec-uae-industries__meta"><span className="sec-uae-expansion__number">({industry.number})</span><IndustryIcon name={industry.icon} /></div>
            <h3 className="heading-style-h3 sec-uae-expansion__subtitle">{industry.title}</h3>
            <p className="alg-text">{industry.description}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}

export function UaeEcosystemSection() {
  return (
    <section className="site-section sec-uae-expansion sec-uae-ecosystem" id="uae-ecosystem" aria-label="Built for the UAE market">
      <div className="site-container container-large padding-global">
        <div className="sec-uae-ecosystem__panel">
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
