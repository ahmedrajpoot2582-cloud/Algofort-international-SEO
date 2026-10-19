'use client';

import React, { useRef, useState } from 'react';
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
import { initTitleAnimation } from '../../utils/titleAnimation';
import '../../styles/dubai.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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

// Helper to split text into words and chars for magnetic hover effect
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
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const pageRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const aboutTextRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const faqSectionRef = useRef(null);

  // GSAP Animations Engine
  useGSAP(
    () => {
      // 1. Kinetic Scrub on Dubai Intro Text (Chars light up as user scrolls)
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

      if (faqSectionRef.current) {
        const faqTitle = faqSectionRef.current.querySelector('.sec-faq__title');
        if (faqTitle) {
          initTitleAnimation(faqTitle, { start: 'top 85%', stagger: 0.02 });
        }
      }

      // 4. Interactive 3D Cursor Hover & Floating Image Follow on Service Grids
      if (servicesSectionRef.current) {
        const serviceGrids = servicesSectionRef.current.querySelectorAll('.service-content-grid');
        serviceGrids.forEach((grid) => {
          const imageWrap = grid.querySelector('.service-image-wrap');
          const titles = grid.querySelectorAll('.service-title');
          const numberText = grid.querySelector('.service-text.is-number');

          const allChars = [];
          titles.forEach((titleEl) => {
            const chars = splitTextIntoSpans(titleEl);
            allChars.push(chars);
          });

          if (imageWrap) {
            gsap.set(imageWrap, {
              opacity: 0,
              scale: 0.6,
              pointerEvents: 'none',
            });
          }

          let xTo = imageWrap ? gsap.quickTo(imageWrap, 'x', { duration: 0.35, ease: 'power2.out' }) : null;
          let yTo = imageWrap ? gsap.quickTo(imageWrap, 'y', { duration: 0.35, ease: 'power2.out' }) : null;
          let rotateYTo = imageWrap ? gsap.quickTo(imageWrap, 'rotationY', { duration: 0.35, ease: 'power2.out' }) : null;
          let rotateZTo = imageWrap ? gsap.quickTo(imageWrap, 'rotation', { duration: 0.35, ease: 'power2.out' }) : null;

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

            if (imageWrap) {
              gsap.to(imageWrap, {
                opacity: 1,
                scale: 1,
                duration: 0.45,
                ease: 'power3.out',
                overwrite: 'auto',
              });
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

            if (imageWrap) {
              gsap.to(imageWrap, {
                opacity: 0,
                scale: 0.6,
                duration: 0.35,
                ease: 'power2.in',
                overwrite: 'auto',
              });
            }
          };

          const onMouseMove = (e) => {
            if (!imageWrap) return;
            const rect = grid.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;

            if (xTo) xTo(relX * 0.4);
            if (yTo) yTo(relY * 0.4);
            if (rotateYTo) rotateYTo(relX * 0.03);
            if (rotateZTo) rotateZTo(relX * 0.02);
          };

          grid.addEventListener('mouseenter', onMouseEnter);
          grid.addEventListener('mouseleave', onMouseLeave);
          grid.addEventListener('mousemove', onMouseMove);
        });
      }

      // 5. Minimalist FAQ Accordions Stagger Reveal
      if (faqSectionRef.current) {
        const faqItems = faqSectionRef.current.querySelectorAll('.sec-dubai-faq__item');
        if (faqItems.length > 0) {
          gsap.fromTo(
            faqItems,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: faqSectionRef.current.querySelector('.sec-dubai-faq__wrapper'),
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
        {/* International SEO Structured Data Schema */}
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
                  name: 'Algofort Dubai | Software Engineering, AI & Digital Products',
                  description:
                    'Algofort partners with businesses and ventures in Dubai, DIFC, and Business Bay to engineer high-performance web applications, custom SaaS platforms, and AI automation systems.',
                  inLanguage: 'en',
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': 'https://algofort.com/#organization',
                  name: 'Algofort',
                  url: 'https://algofort.com',
                  logo: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:best/v1792145914/algofort/assets/logo.png',
                  areaServed: [
                    {
                      '@type': 'AdministrativeArea',
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
                    'AI Agent Development',
                    'Brand Identity',
                    'Mobile App Development',
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

          {/* Section 1: Overview & Fact Cards with Scroll Scrub Typography */}
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

          {/* Section 2: Services Section with Character Stagger & 3D Interactive Cursor Follow */}
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

          {/* Section 3: Interactive Process Section (Exact Home Page DotLottie Scroll Component) */}
          <ProcessSection />

          {/* Section 4: Minimalist FAQ Section with Character Heading Reveal & Smooth Expand */}
          <section ref={faqSectionRef} id="sec-faq" className="site-section sec-faq">
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

          {/* Section 5: Signature Contact Section */}
          <ContactSection country="Dubai, UAE" />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
