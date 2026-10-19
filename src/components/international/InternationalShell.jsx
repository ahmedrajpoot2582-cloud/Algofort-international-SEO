import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { PageBanner } from '../common/PageBanner';
import { Cursor } from '../common/Cursor';
import { BackToTop } from '../common/BackToTop';
import { SmoothScroll } from '../common/SmoothScroll';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import Link from 'next/link';
import '../../styles/international.css';

export function InternationalShell({ title, breadcrumbs, children }) {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-international min-h-screen" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner title={title} breadcrumbs={breadcrumbs} />
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export function InternationalSection({ id, badge, title, description, dark = false, children }) {
  return (
    <section id={id} className={`site-section sec-international ${dark ? 'sec-international--dark' : ''}`}>
      <div className="site-container container-large padding-global sec-international__container">
        <div className="padding-section-large sec-international__padding">
          <div className="section-header sec-international__header">
            <div className="section-badge sec-international__badge">
              <SubtitleMarquee text={`${badge} ✦ `} variant={dark ? 'light' : 'dark'} icon="/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg" />
            </div>
            <h2 className="heading-style-h2 section-title sec-international__title">{title}</h2>
            {description && <p className="alg-text section-description sec-international__desc">{description}</p>}
          </div>
          <div className="section-content sec-international__content">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function InternationalButton({ href, children }) {
  return (
    <Link href={href} className="main-button alternate-button w-inline-block sec-international__button">
      <span className="main-button-block">
        <span className="button-text alternate-text">{children}</span>
        <span className="button-text alternate-text" aria-hidden="true">{children}</span>
      </span>
      <img src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg" alt="" width="20" height="20" className="button-icon" loading="lazy" />
    </Link>
  );
}
