'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { SubtitleMarquee } from '../../components/common/SubtitleMarquee';
import { ProcessSection } from '../../components/sections/ProcessSection';
import { ContactSection } from '../../components/sections/ContactSection';
import { DubaiFaqSection } from '../../components/sections/DubaiFaqSection';
import { initTitleAnimation } from '../../utils/titleAnimation';
import '../../styles/faq-section.css';
import '../../styles/dubai.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// 6 Core Focused Digital Engineering Services for Dubai & GCC
const dubaiServices = [
  {
    num: '(01)',
    title: 'High-Performance Web & E-Commerce',
    link: '/services/web-development',
    desc: 'Bespoke Next.js web applications, headless Shopify Plus architectures, and blazing-fast marketing platforms built for conversion and ultra-low bounce rates.',
    tags: ['Next.js 15', 'Shopify Plus', 'Bilingual EN/AR', 'High-Speed SEO', 'Headless CMS'],
  },
  {
    num: '(02)',
    title: 'Brand Identity & Visual Systems',
    link: '/services/brand-identity',
    desc: 'Distinctive brand strategy, premium logo design, luxury packaging, and complete design guideline systems calibrated for prestigious UAE ventures.',
    tags: ['Brand Strategy', 'Visual Identity', 'Typography Systems', 'Luxury Packaging', 'Guidelines'],
  },
  {
    num: '(03)',
    title: 'Custom SaaS & Cloud Platforms',
    link: '/services/saas-app-development',
    desc: 'Multi-tenant cloud applications, real-time analytics portals, automated CRM & ERP systems, and secure API microservices engineered to scale gracefully.',
    tags: ['Multi-Tenant SaaS', 'Enterprise Dashboards', 'Fintech APIs', 'Cloud Microservices'],
  },
  {
    num: '(04)',
    title: 'Mobile App Engineering (iOS & Android)',
    link: '/services/mobile-app-development',
    desc: 'Intuitive, native and cross-platform mobile apps built with React Native and Flutter, featuring biometric security and offline-first data sync.',
    tags: ['React Native', 'Flutter', 'Biometric Auth', 'Push Workflows', 'App Store SEO'],
  },
  {
    num: '(05)',
    title: 'AI Automation & Intelligent Agent Systems',
    link: '/services/web-development',
    desc: 'Autonomous AI agents, customer support bot pipelines, automated lead scoring, and customized workflow automation to streamline UAE business operations.',
    tags: ['Autonomous AI', 'Lead Qualification', 'n8n Pipelines', 'WhatsApp Business API'],
  },
  {
    num: '(06)',
    title: 'Enterprise Technical SEO & Web Vitals',
    link: '/services/web-development',
    desc: 'Technical search optimization, schema architecture, multilingual hreflang implementation, and sub-second Core Web Vitals to dominate Google UAE rankings.',
    tags: ['Technical SEO', 'Schema.org', 'Sub-Second Speeds', 'Hreflang Multi-Region'],
  },
];

// Helper to split text into words and chars for magnetic title hover
function splitTextIntoSpans(el) {
  if (!el || el.dataset.splitDone) return el.querySelectorAll('.char');

  const text = el.textContent.trim();
  el.innerHTML = '';
  const charArray = [];

  const words = text.split(/\s+/);
  words.forEach((wordStr, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';

    wordStr.split('').forEach((cStr) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.style.display = 'inline-block';
      charSpan.style.willChange = 'transform';
      charSpan.textContent = cStr;
      wordSpan.appendChild(charSpan);
      charArray.push(charSpan);
    });

    el.appendChild(wordSpan);
    if (wIdx < words.length - 1) {
      const space = document.createTextNode(' ');
      el.appendChild(space);
    }
  });

  el.dataset.splitDone = 'true';
  return charArray;
}

export default function DubaiPage() {
  const pageRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const aboutTextRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const whyUsSectionRef = useRef(null);

  // GSAP Animations Engine
  useGSAP(
    () => {
      // 1. Kinetic Scrub on Dubai Intro Text (Chars light up on scroll)
      if (aboutTextRef.current) {
        const pElement = aboutTextRef.current.querySelector('p');
        if (pElement) {
          const split = new SplitType(pElement, {
            types: 'words, chars',
            tagName: 'span',
          });

          if (split.chars && split.chars.length > 0) {
            gsap.set(split.chars, { opacity: 0.2 });

            gsap.to(split.chars, {
              opacity: 1,
              duration: 0.01,
              stagger: 0.02,
              ease: 'none',
              scrollTrigger: {
                trigger: aboutTextRef.current,
                start: 'top 80%',
                end: 'bottom 35%',
                scrub: true,
              },
            });
          }
        }
      }

      // 2. Fact Cards Stagger Fade & Slide In
      if (aboutSectionRef.current) {
        const cards = aboutSectionRef.current.querySelectorAll('.fact-card');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: aboutSectionRef.current.querySelector('.fact-cards-wrapper'),
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }

      // 3. Stagger Character Reveal on Section Headings
      if (servicesSectionRef.current) {
        const servTitle = servicesSectionRef.current.querySelector('.sec-services__title');
        if (servTitle) {
          initTitleAnimation(servTitle, { start: 'top 85%', stagger: 0.02 });
        }
      }

      if (whyUsSectionRef.current) {
        const whyTitle = whyUsSectionRef.current.querySelector('.section-title');
        if (whyTitle) {
          initTitleAnimation(whyTitle, { start: 'top 85%', stagger: 0.02 });
        }
      }

      // 4. Interactive Character Flip Hover on Service Rows (Clean & Minimal, zero bloated images)
      if (servicesSectionRef.current) {
        const serviceGrids = servicesSectionRef.current.querySelectorAll('.service-content-grid');
        serviceGrids.forEach((grid) => {
          const titles = grid.querySelectorAll('.service-title');
          const numberText = grid.querySelector('.service-text.is-number');

          const allChars = [];
          titles.forEach((titleEl) => {
            const chars = splitTextIntoSpans(titleEl);
            allChars.push(chars);
          });

          const onMouseEnter = () => {
            allChars.forEach((chars) => {
              if (chars.length) {
                gsap.to(chars, {
                  yPercent: -100,
                  duration: 0.4,
                  ease: 'power2.out',
                  stagger: 0.02,
                  overwrite: 'auto',
                });
              }
            });

            if (numberText) {
              gsap.to(numberText, { color: '#f47a1f', duration: 0.3, overwrite: 'auto' });
            }
          };

          const onMouseLeave = () => {
            allChars.forEach((chars) => {
              if (chars.length) {
                gsap.to(chars, {
                  yPercent: 0,
                  duration: 0.4,
                  ease: 'power2.out',
                  stagger: 0.02,
                  overwrite: 'auto',
                });
              }
            });

            if (numberText) {
              gsap.to(numberText, { color: '#05080c', duration: 0.3, overwrite: 'auto' });
            }
          };

          grid.addEventListener('mouseenter', onMouseEnter);
          grid.addEventListener('mouseleave', onMouseLeave);
        });
      }

      // 5. Why Choose Us Pillar Cards Stagger Animation
      if (whyUsSectionRef.current) {
        const pillars = whyUsSectionRef.current.querySelectorAll('.dubai-pillar-card');
        if (pillars.length > 0) {
          gsap.fromTo(
            pillars,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: whyUsSectionRef.current.querySelector('.dubai-pillars-grid'),
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }
    },
    { scope: pageRef }
  );

  return (
    <SmoothScroll>
      <div ref={pageRef} className="page-wrapper page-dubai min-h-screen" id="top">
        {/* Comprehensive International SEO Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebPage',
                  '@id': 'https://algofort.com/dubai/#webpage',
                  url: 'https://algofort.com/dubai',
                  name: 'Algofort Dubai | Software Engineering, AI & Digital Solutions Agency',
                  description:
                    'Algofort partners with businesses and ventures across Downtown Dubai, DIFC, and Business Bay to engineer high-converting web applications, custom SaaS platforms, and AI automation systems.',
                  inLanguage: 'en',
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': 'https://algofort.com/#organization',
                  name: 'Algofort',
                  url: 'https://algofort.com',
                  logo: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:best/v1792145914/algofort/assets/logo.png',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '84j Ghazali Rd, Block 2 PECHS',
                    addressLocality: 'Karachi',
                    addressCountry: 'PK',
                  },
                  areaServed: [
                    {
                      '@type': 'City',
                      name: 'Dubai',
                    },
                    {
                      '@type': 'Country',
                      name: 'United Arab Emirates',
                    },
                  ],
                  knowsAbout: [
                    'Web Development',
                    'SaaS Engineering',
                    'AI Automation',
                    'Brand Identity',
                    'Mobile App Development',
                    'Technical International SEO',
                  ],
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://algofort.com/dubai/#faq',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'How does Algofort partner with businesses and startups across Dubai & GCC?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'We operate with dedicated agile engineering squads from our PECHS Karachi studio. Dubai (GST, UTC+4) and Karachi (PKT, UTC+5) have only a 1-hour time offset, ensuring over 7 hours of daily live synchronous collaboration via Slack, Microsoft Teams, and weekly video sprint reviews with zero friction.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Can you engineer native bilingual platforms (English & Right-to-Left Arabic)?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. Every digital experience we engineer for the Dubai and UAE market natively supports Right-to-Left (RTL) Arabic typography, bidirectional CSS architecture, and headless multi-language CMS integration ensuring high conversions across local Emirati and international audiences.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What is your code ownership, NDA confidentiality, and intellectual property policy?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'We offer 100% intellectual property (IP) and source code ownership. From day one, all Git repositories, cloud architecture blueprints, and design systems belong entirely to your company, fully protected by international Non-Disclosure Agreements (NDAs).',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How are development milestones, project deliverables, and payments structured?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Our engagements follow predictable two-week sprint cycles: Discovery & Architecture, UI/UX Wireframing, Full-Stack Development, QA Testing, and Cloud Deployment. Payments are strictly milestone-based upon deliverable approval.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />

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

          {/* Section 1: Regional Hub Overview & Fact Cards with Scroll Scrub Typography */}
          <section
            ref={aboutSectionRef}
            id="sec-about"
            className="site-section sec-about section_about-markeio forteve-about"
          >
            <div className="site-container container-large sec-about__container forteve-about__container padding-global">
              <div className="section-header sec-about__header about-markeio_top forteve-about__top">
                <div className="section-badge sec-about__badge forteve-about__badge">
                  <SubtitleMarquee text="Regional Hub — Dubai ✦ " variant="dark" />
                </div>
                <div
                  ref={aboutTextRef}
                  className="section-description sec-about__desc sec-about__content about-markeio_content forteve-about__content"
                >
                  <p className="alg-text">
                    Algofort partners with ambitious businesses, ventures, and enterprises across Downtown Dubai, DIFC, Business Bay, and Dubai Internet City to engineer world-class digital products. From high-converting web and e-commerce platforms to scalable SaaS software and autonomous AI workflows, we combine elite technical craftsmanship with seamless regional collaboration.
                  </p>
                </div>
              </div>

              {/* Exact Fact Cards Layout from Home Page with Entrance Animation */}
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

          {/* Section 2: Detailed Capabilities List (Clean, Minimal, Rich Data, No Image Bloat) */}
          <section
            ref={servicesSectionRef}
            id="sec-services"
            className="site-section sec-services section-home-service"
          >
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
                      <div key={service.num} className="w-layout-grid service-content-grid dubai-service-row">
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
                          <p className="dubai-service-desc alg-text">{service.desc}</p>
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

          {/* Section 3: Engineering Pillars for Dubai & GCC (Comprehensive Market Data) */}
          <section ref={whyUsSectionRef} id="sec-pillars" className="site-section sec-pillars padding-global">
            <div className="container-large">
              <div className="padding-section-large" style={{ paddingTop: 0 }}>
                <div className="section-header" style={{ marginBottom: '3rem' }}>
                  <div className="section-badge">
                    <SubtitleMarquee text="Why Algofort for Dubai ✦ " variant="dark" />
                  </div>
                  <h2 className="heading-style-h2 section-title">
                    Engineered for <span className="text-color-secondary">Regional Excellence</span>
                  </h2>
                </div>

                <div className="dubai-pillars-grid">
                  <div className="dubai-pillar-card">
                    <span className="pillar-num">01</span>
                    <h3 className="pillar-title">Synchronous Collaboration</h3>
                    <p className="alg-text pillar-text">
                      Only 1 hour time offset between Dubai (GST) and Karachi (PKT). Live real-time Slack channels, immediate support turnarounds, and aligned office hours throughout the work week.
                    </p>
                  </div>

                  <div className="dubai-pillar-card">
                    <span className="pillar-num">02</span>
                    <h3 className="pillar-title">Arabic RTL &amp; Localization</h3>
                    <p className="alg-text pillar-text">
                      Flawless Right-to-Left bidirectional layouts, localized Arabic typographic scales, and multi-currency UAE payment integrations that preserve brand prestige.
                    </p>
                  </div>

                  <div className="dubai-pillar-card">
                    <span className="pillar-num">03</span>
                    <h3 className="pillar-title">Silicon-Grade Tech Stack</h3>
                    <p className="alg-text pillar-text">
                      We never cut corners with slow pre-made themes. Every application is custom-engineered on Next.js, Node.js, and modern headless APIs for sub-second Core Web Vitals.
                    </p>
                  </div>

                  <div className="dubai-pillar-card">
                    <span className="pillar-num">04</span>
                    <h3 className="pillar-title">Full IP &amp; Code Ownership</h3>
                    <p className="alg-text pillar-text">
                      Complete source code ownership transfer, production deployment on your own enterprise cloud accounts (AWS, Vercel, GCP), and international NDA protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Interactive Process Section (Exact Home Page DotLottie Component) */}
          <ProcessSection />

          {/* Section 5: Exact Home Page FAQ Section with Elastic Magnetic Dividers */}
          <DubaiFaqSection />

          {/* Section 6: Signature Contact Section */}
          <ContactSection country="Dubai, UAE" />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
