'use client';

import React from 'react';
import { Header } from '../../components/common/Header';
import { PageBanner } from '../../components/common/PageBanner';
import { AboutSection } from '../../components/sections/AboutSection';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { ProcessSection } from '../../components/sections/ProcessSection';
import { ShowreelSection } from '../../components/sections/ShowreelSection';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { DubaiFaqSection } from '../../components/sections/DubaiFaqSection';
import { CtaSection } from '../../components/sections/CtaSection';
import { Footer } from '../../components/common/Footer';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import '../../styles/dubai.css';

const dubaiJsonLd = {
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
};

export default function DubaiPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-dubai min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dubaiJsonLd).replace(/</g, '\\u003c') }}
        />
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          {/* 1. Sleek Algofort Dubai Header Banner */}
          <PageBanner
            title="Dubai"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Dubai' },
            ]}
          />

          {/* 2. Kinetic About & Fact Cards (Home standard with SplitType scrub) */}
          <AboutSection />

          {/* 3. Numbered Services Grid with 3D Hover & Cursor Physics */}
          <ServicesSection />

          {/* 4. Interactive 6-Step DotLottie Process Section */}
          <ProcessSection />

          {/* 5. Signature Showreel Showcase Section */}
          <ShowreelSection />

          {/* 6. Testimonials & Client Endorsements */}
          <TestimonialsSection />

          {/* 7. Native Home-Standard FAQ Section with Elastic Physics Dividers */}
          <DubaiFaqSection />

          {/* 8. Full Interactive Project Estimator & Contact CTA Form */}
          <CtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
