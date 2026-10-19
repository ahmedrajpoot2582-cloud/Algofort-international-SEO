'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const dubaiFaqData = [
  {
    question: 'How does Algofort partner with businesses and startups across Dubai & GCC?',
    paragraphs: [
      'We operate with dedicated agile engineering squads from our PECHS Karachi studio. Dubai (GST, UTC+4) and Karachi (PKT, UTC+5) have only a 1-hour time offset, ensuring over 7 hours of daily live synchronous collaboration via Slack, Microsoft Teams, and weekly video sprint reviews with zero friction.',
    ],
  },
  {
    question: 'Can you engineer native bilingual platforms (English & Right-to-Left Arabic)?',
    paragraphs: [
      'Yes. Every digital experience we engineer for the Dubai and UAE market natively supports Right-to-Left (RTL) Arabic typography, bidirectional CSS architecture, and headless multi-language CMS integration (Sanity, Strapi, or Headless WordPress) ensuring high conversions across local Emirati and international audiences.',
    ],
  },
  {
    question: 'What is your code ownership, NDA confidentiality, and intellectual property policy?',
    paragraphs: [
      'We offer 100% intellectual property (IP) and source code ownership. From day one, all Git repositories, cloud architecture blueprints, and design systems belong entirely to your company, fully protected by international Non-Disclosure Agreements (NDAs).',
    ],
  },
  {
    question: 'How are development milestones, project deliverables, and payments structured?',
    paragraphs: [
      'Our engagements follow predictable two-week sprint cycles: Discovery & Architecture, UI/UX Wireframing, Full-Stack Development, QA Testing, and Cloud Deployment. Payments are strictly milestone-based upon deliverable approval, providing full financial peace of mind.',
    ],
  },
  {
    question: 'How do you build for the Dubai Real Estate, Hospitality & Fintech sectors?',
    paragraphs: [
      'We engineer tailored high-conversion web platforms, CRM and ERP portals, and automated lead-scoring pipelines specifically for UAE high-value industries. Whether integrating local payment gateways (Network International, Telr, Stripe UAE) or building bespoke client dashboards, everything is optimized for performance and security.',
    ],
  },
  {
    question: 'Do you provide SLA-backed maintenance and ongoing technical support in Dubai?',
    paragraphs: [
      'Yes. We provide continuous Service Level Agreement (SLA) support covering cloud infrastructure monitoring, automated security patches, Core Web Vitals maintenance, and ongoing feature expansion.',
    ],
  },
];

function FaqDivider() {
  const dividerRef = useRef(null);

  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;

    const w = el.offsetWidth || 800;
    const d = `M0,100 Q${w / 2},100 ${w},100`;
    el.innerHTML = `<svg viewBox="0 0 ${w} 200" preserveAspectRatio="none"><path d="${d}"/></svg>`;
    const svg = el.querySelector('svg');
    const path = el.querySelector('path');

    if (!svg || !path) return;

    gsap.set(svg, { transformOrigin: 'left center' });
    const scrollAnim = gsap.from(svg, {
      scaleX: 0,
      duration: 2.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    const defaultD = d;

    const handleMouseMove = (e) => {
      const rect = svg.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cpY = 2 * my - 100;

      gsap.killTweensOf(path);
      const newD = `M0,100 Q${mx},${cpY} ${w},100`;
      gsap.to(path, { attr: { d: newD }, duration: 0.1, overwrite: true });
    };

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: defaultD },
        duration: 1.2,
        ease: 'elastic.out(1.2, 0.15)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollAnim?.kill();
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="alg-faq-divider cb-faq-divider">
      <div className="alg-faq-divider-line cb-divider" ref={dividerRef}></div>
    </div>
  );
}

export function DubaiFaqSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.alg-faq-title, .sec-faq__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }
  }, []);

  return (
    <section ref={sectionRef} className="alg-faq site-section sec-faq cb-faq" id="sec-faq">
      <div className="alg-faq-container site-container sec-faq__container cb-faq-container -lg">
        <div
          className="alg-faq-header section-header sec-faq__header cb-faq-header"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '4rem' }}
        >
          <div className="alg-faq-badge section-badge sec-faq__badge">
            <SubtitleMarquee text="Dubai & GCC FAQs ✦ " />
          </div>
          <h2 className="alg-faq-title heading-style-h2 section-title sec-faq__title" style={{ marginBottom: 0 }}>
            Answers for <br />
            <span className="alg-faq-title-secondary text-color-secondary">Dubai Clients</span>
          </h2>
        </div>
        <div className="alg-faq-items cb-faq-items">
          <FaqDivider />

          {dubaiFaqData.map((item, idx) => (
            <div key={idx}>
              <details className="alg-faq-item cb-faq-item">
                <summary className="alg-faq-item-toggle cb-faq-item-toggle">
                  <span className="alg-faq-item-title cb-faq-item-title">{item.question}</span>
                  <span className="alg-faq-item-arrow cb-faq-item-arr"></span>
                </summary>
                <div className="alg-faq-item-content cb-faq-item-content">
                  <div className="alg-faq-item-text cb-faq-item-text">
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="alg-faq-text alg-text">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </details>

              <FaqDivider />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
