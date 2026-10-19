'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { SubtitleMarquee } from '../../components/common/SubtitleMarquee';
import { ProcessSection } from '../../components/sections/ProcessSection';
import { ContactSection } from '../../components/sections/ContactSection';
import '../../styles/dubai.css';

const dubaiServices = [
  {
    num: '(01)',
    title: 'Web & E-Commerce Engineering',
    link: '/services/web-development',
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146016/algofort/assets/services/service-web-development',
    tags: ['Next.js', 'Headless Shopify Plus', 'Bilingual EN/AR', 'High-Speed SEO'],
  },
  {
    num: '(02)',
    title: 'Brand Identity & Strategy',
    link: '/services/brand-identity',
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146014/algofort/assets/services/service-brand-identity',
    tags: ['Brand Guidelines', 'Logo Design', 'Luxury Packaging', 'Visual Systems'],
  },
  {
    num: '(03)',
    title: 'SaaS & Enterprise Cloud Portals',
    link: '/services/saas-app-development',
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146015/algofort/assets/services/service-saas-app',
    tags: ['Multi-Tenant Systems', 'CRM & ERP Software', 'Fintech APIs', 'Dashboards'],
  },
  {
    num: '(04)',
    title: 'Mobile App Engineering',
    link: '/services/mobile-app-development',
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146015/algofort/assets/services/service-mobile-app',
    tags: ['iOS & Android Apps', 'React Native & Flutter', 'Biometrics', 'Real-Time Sync'],
  },
  {
    num: '(05)',
    title: 'AI Automation & Intelligent Agents',
    link: '/services/web-development',
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146016/algofort/assets/services/service-web-development',
    tags: ['Autonomous AI Agents', 'Real Estate Lead Scoring', 'WhatsApp Bots', 'n8n Pipelines'],
  },
];

const dubaiFaqs = [
  {
    q: 'How does Algofort partner with businesses and startups across Dubai?',
    a: 'We operate with dedicated agile engineering teams from our PECHS Karachi studio. Dubai (GST, UTC+4) and Karachi (PKT, UTC+5) have only a 1-hour time difference, ensuring over 7 hours of daily live synchronous communication via Slack, Teams, and weekly video sprint reviews.',
  },
  {
    q: 'Can you develop bilingual websites and applications (English and Arabic)?',
    a: 'Yes. Every digital experience we engineer for the Dubai and GCC market supports native Right-to-Left (RTL) Arabic typography, bidirectional CSS, and headless multi-language CMS integration (Sanity, Strapi, or Headless WordPress).',
  },
  {
    q: 'What is your code ownership and NDA confidentiality guarantee?',
    a: 'We offer 100% intellectual property (IP) and source code ownership. From day one, all repositories, cloud architecture blueprints, and design systems belong entirely to your company, protected by international Non-Disclosure Agreements (NDAs).',
  },
  {
    q: 'How are development milestones, project deliverables, and payments structured?',
    a: 'Our engagements follow predictable two-week sprint cycles: Discovery & Architecture, UI/UX Wireframing, Full-Stack Development, QA Testing, and Cloud Deployment. Payments are strictly milestone-based upon deliverable approval.',
  },
  {
    q: 'Do you provide SLA-backed maintenance and ongoing technical support in Dubai?',
    a: 'Yes. We offer continuous Service Level Agreement (SLA) support covering cloud infrastructure monitoring, automated security patches, Core Web Vitals maintenance, and ongoing feature expansion.',
  },
];

export default function DubaiPage() {
  const [openFaq, setOpenFaq] = React.useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <SmoothScroll>
      <div className="page-wrapper page-dubai min-h-screen" id="top">
        <Cursor />
        <Header />
        <BackToTop />

        <main id="main-content">
          {/* Signature Algofort PageBanner - Minimal, Dark & Sleek */}
          <PageBanner
            title="Dubai"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Dubai' },
            ]}
          />

          {/* Section 1: Overview & Fact Cards (Exact Home Page About Section Architecture) */}
          <section id="sec-about" className="site-section sec-about section_about-markeio forteve-about">
            <div className="site-container container-large sec-about__container forteve-about__container padding-global">
              <div className="section-header sec-about__header about-markeio_top forteve-about__top">
                <div className="section-badge sec-about__badge forteve-about__badge">
                  <SubtitleMarquee text="Regional Hub — Dubai ✦ " variant="dark" />
                </div>
                <div className="section-description sec-about__desc sec-about__content about-markeio_content forteve-about__content">
                  <p className="alg-text">
                    Algofort partners with ambitious businesses, ventures, and enterprises across Downtown Dubai, DIFC, Business Bay, and Dubai Internet City to engineer world-class digital products. From high-converting web and e-commerce platforms to scalable SaaS software and autonomous AI workflows, we combine elite technical craftsmanship with seamless regional collaboration.
                  </p>
                </div>
              </div>

              {/* Exact Fact Cards Layout from Home Page */}
              <div className="fact-cards-wrapper">
                <div className="fact-card fact-card--white">
                  <div className="fact-card-top">
                    <div className="why-us-card-number-wrap">
                      <h3 className="why-us-card-number">1-Hr</h3>
                    </div>
                  </div>
                  <div className="fact-card-bottom">
                    <p className="fact-card-label">TIMEZONE OFFSET (GST / PKT)</p>
                  </div>
                </div>

                <div className="fact-card fact-card--black">
                  <div className="fact-card-top">
                    <div className="why-us-card-number-wrap">
                      <h3 className="why-us-card-number">100%</h3>
                    </div>
                  </div>
                  <div className="fact-card-bottom">
                    <p className="fact-card-label">IP &amp; CODE OWNERSHIP</p>
                  </div>
                </div>

                <div className="fact-card fact-card--orange">
                  <div className="fact-card-top">
                    <div className="why-us-card-number-wrap">
                      <h3 className="why-us-card-number">&lt;1.2s</h3>
                    </div>
                  </div>
                  <div className="fact-card-bottom">
                    <p className="fact-card-label">CORE WEB VITALS SPEED</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Services Section (Exact Home Page Services Component) */}
          <section id="sec-services" className="site-section sec-services section-home-service">
            <div className="site-container sec-services__container padding-global">
              <div className="container-large">
                <div className="padding-section-large">
                  <div className="section-header sec-services__header w-layout-grid top-grid">
                    <div className="max-width-large">
                      <div className="section-badge sec-services__badge">
                        <SubtitleMarquee text="Our Capabilities ✦ " variant="dark" />
                      </div>
                      <h2 className="heading-style-h2 section-title sec-services__title text-color-alternate">
                        Digital <span className="text-color-secondary">Solutions</span>
                      </h2>
                    </div>
                    <div className="button-item">
                      <Link className="main-button alternate-button w-inline-block" href="/services">
                        <div className="main-button-block">
                          <div className="button-text alternate-text">All Services</div>
                          <div className="button-text alternate-text">All Services</div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145871/algofort/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                          alt="Star Icon"
                          className="button-icon"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="spacer-xlarge"></div>
                  <div className="dark-line"></div>

                  <div className="service-component">
                    {dubaiServices.map((service) => (
                      <div key={service.num} className="w-layout-grid service-content-grid">
                        <div className="service-content-item">
                          <div className="service-text is-number">{service.num}</div>
                        </div>

                        <div className="service-content-item">
                          <Link href={service.link} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="service-title-wrap">
                              <h3 className="service-title is-top">{service.title}</h3>
                              <h3 className="service-title is-bottom">{service.title}</h3>
                            </div>
                          </Link>
                          <div className="service-image-wrap">
                            <img
                              src={service.image}
                              loading="lazy"
                              alt={`Image - ${service.title}`}
                              className="service-image"
                            />
                          </div>
                        </div>

                        <div className="service-content-item">
                          <div className="service-tags-wrap">
                            {service.tags.map((tag, idx) => (
                              <Link key={idx} className="service-tag-pill nav-link w-inline-block" href={service.link}>
                                <div className="nav-text-wrap">
                                  <span className="nav-text">{tag}</span>
                                  <span className="nav-text">{tag}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Interactive Process Section (Exact Home Page DotLottie Component) */}
          <ProcessSection />

          {/* Section 4: Minimalist FAQ Section (Matching Exact Algofort Clean Typography) */}
          <section id="sec-faq" className="site-section sec-faq">
            <div className="site-container sec-faq__container container-large padding-global">
              <div className="padding-section-large">
                <div className="section-header sec-faq__header">
                  <div className="section-badge sec-faq__badge">
                    <SubtitleMarquee text="Dubai FAQs ✦ " variant="dark" />
                  </div>
                  <h2 className="heading-style-h2 section-title sec-faq__title">
                    Answers for <span className="text-color-secondary">Dubai Clients</span>
                  </h2>
                </div>

                <div className="sec-dubai-faq__wrapper">
                  {dubaiFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className={`sec-dubai-faq__item ${openFaq === i ? 'is-open' : ''}`}
                      onClick={() => toggleFaq(i)}
                    >
                      <button type="button" className="sec-dubai-faq__trigger" aria-expanded={openFaq === i}>
                        <span className="sec-dubai-faq__trigger-text">{faq.q}</span>
                        <span className="sec-dubai-faq__trigger-icon">{openFaq === i ? '−' : '+'}</span>
                      </button>
                      {openFaq === i && (
                        <div className="sec-dubai-faq__body">
                          <p className="alg-text">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Signature Contact CTA */}
          <ContactSection country="Dubai, UAE" />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
