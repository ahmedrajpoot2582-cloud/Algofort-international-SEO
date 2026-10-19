import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { ContactSection } from '../../components/sections/ContactSection';
import { SubtitleMarquee } from '../../components/common/SubtitleMarquee';
import { withSocialMetadata } from '../../lib/seo';
import { absoluteUrl } from '../../lib/site';
import Link from 'next/link';
import '../../styles/ai-automation.css';

export const metadata = withSocialMetadata({
  title: 'Enterprise AI Automation & Autonomous Agents Engineering | Algofort',
  description: 'Deploy custom autonomous AI agents, multi-modal LLM pipelines, and end-to-end workflow automation systems designed to eliminate repetitive operational friction.',
  alternates: { canonical: '/ai-automation' },
  openGraph: {
    locale: 'en_US',
    title: 'Enterprise AI Automation & Autonomous Agents Engineering | Algofort',
    description: 'Bespoke AI agents, WhatsApp/Web conversational automation, and CRM intelligence engineered for modern digital enterprises.',
  },
});

const aiCapabilities = [
  {
    num: '(01)',
    name: 'Autonomous Multi-Agent Systems',
    desc: 'Goal-driven AI agents equipped with custom memory architectures, function-calling capabilities, and deterministic fail-safes. Designed to execute complex multi-step workflows across your software stack without manual intervention.',
    tags: ['LangChain & LlamaIndex', 'Multi-Agent Orchestration', 'Deterministic Guardrails', 'Custom Vector Databases'],
  },
  {
    num: '(02)',
    name: 'Workflow & API Integration Pipelines',
    desc: 'High-reliability orchestration connecting legacy ERPs, CRMs (HubSpot, Salesforce), communication channels, and payment systems into cohesive, self-healing automated data loops.',
    tags: ['n8n Self-Hosted', 'Custom Python Microservices', 'Webhook & Event Triggers', 'Automated Error Recovery'],
  },
  {
    num: '(03)',
    name: 'Intelligent Conversational Systems',
    desc: 'Domain-trained AI agents for web, WhatsApp, and internal team channels. Capable of instant multi-turn qualification, appointment scheduling, and warm context-preserved human agent handoffs.',
    tags: ['WhatsApp Business API', 'Contextual RAG Pipelines', 'Warm Human Handoff', 'Multi-Language NLP'],
  },
  {
    num: '(04)',
    name: 'Document Intelligence & Extraction',
    desc: 'Automate high-volume unstructured document intake. Extract structured JSON data from contracts, invoices, and KYC documents with 99%+ validated accuracy.',
    tags: ['Optical Character Recognition', 'Structured JSON Output', 'Audit Trail Logging', 'SOC2 Compliant Storage'],
  },
];

const aiFaqs = [
  {
    q: 'What is the difference between simple automation (Zapier) and custom AI agents?',
    a: 'Traditional tools like standard Zapier workflows follow static if-this-then-that rules that break on unexpected edge cases. Algofort builds intelligent AI agent systems that combine deterministic API logic with reasoning models capable of interpreting natural language, handling exceptions, and adapting dynamically to variable user input.',
  },
  {
    q: 'How do you prevent AI models from hallucinating or sharing incorrect data?',
    a: 'We implement Retrieval-Augmented Generation (RAG) with strict semantic guardrails. The AI agent answers queries solely referencing verified internal documentation and databases. When certainty falls below defined thresholds, the system transparently routes the interaction to a human team member.',
  },
  {
    q: 'Where is our proprietary business and client data hosted?',
    a: 'Data privacy is paramount. We engineer self-hosted, dedicated cloud pipelines on your own AWS, Azure, or private cloud infrastructure. Data is never shared or used to train external public foundation models.',
  },
  {
    q: 'What typical ROI timeline can our business expect from AI automation?',
    a: 'Most enterprises experience measurable operational returns within 30 to 60 days post-deployment—typically measured in an 80%+ reduction in manual data processing time, sub-minute lead response rates, and significant operational cost savings.',
  },
  {
    q: 'How do we get started with an initial audit of our internal workflows?',
    a: 'We conduct a structured Automation Discovery Sprint to review your current toolchain, identify operational bottlenecks, and deliver an actionable technical architecture proposal with transparent milestone costs before development begins.',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': absoluteUrl('/ai-automation#service'),
      name: 'Enterprise AI Automation & Autonomous Agents Engineering',
      provider: {
        '@type': 'Organization',
        name: 'Algofort',
        url: 'https://algofort.com',
      },
      description: 'End-to-end intelligent automation, autonomous AI agents, and workflow engineering for enterprises.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: aiFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
};

export default function AiAutomationPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-ai-automation min-h-screen" id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <Cursor />
        <Header />
        <BackToTop />

        <main id="main-content">
          {/* Signature Algofort PageBanner - Minimal, Dark & Sleek */}
          <PageBanner
            title="AI Automation & Agents"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'AI Automation' },
            ]}
          />

          {/* Section 1: Strategic Vision & Live Workflow Blueprint */}
          <section id="sec-overview" className="site-section sec-ai">
            <div className="site-container sec-ai__container container-large padding-global">
              <div className="padding-section-large">
                <div className="sec-ai__overview-grid">
                  <div className="sec-ai__overview-content">
                    <div className="section-badge sec-ai__badge">
                      <SubtitleMarquee text="Next-Gen Intelligent Systems ✦ " variant="dark" />
                    </div>
                    <h2 className="heading-style-h2 section-title sec-ai__title">
                      Autonomous Intelligence for{' '}
                      <span className="text-color-secondary">Scalable Operations</span>
                    </h2>
                    <p className="alg-text">
                      High-growth businesses lose thousands of productive hours each quarter to fragmented manual processes, slow lead qualification, and disconnected software silos. Algofort engineers intelligent automation systems that replace repetitive friction with autonomous, self-healing execution.
                    </p>
                    <p className="alg-text">
                      By uniting foundation models with custom API orchestrations, our solutions execute tasks end-to-end—accurately, securely, and 24 hours a day.
                    </p>
                  </div>

                  {/* Architecture Sequence Card */}
                  <div className="sec-ai__workflow-preview">
                    <div className="sec-ai__step">
                      <div className="sec-ai__step-bullet">01</div>
                      <div>
                        <div className="sec-ai__step-title">Inquiry Intake & Rerouting</div>
                        <div className="sec-ai__step-desc">Omnichannel trigger (web form, WhatsApp, email) captured and validated via webhook.</div>
                      </div>
                    </div>
                    <div className="sec-ai__step">
                      <div className="sec-ai__step-bullet">02</div>
                      <div>
                        <div className="sec-ai__step-title">Contextual AI Reasoning</div>
                        <div className="sec-ai__step-desc">RAG pipeline interrogates business data to qualify intent and extract structured parameters.</div>
                      </div>
                    </div>
                    <div className="sec-ai__step">
                      <div className="sec-ai__step-bullet">03</div>
                      <div>
                        <div className="sec-ai__step-title">Autonomous Execution</div>
                        <div className="sec-ai__step-desc">CRM records updated, calendar invites scheduled, and notifications dispatched with zero human delay.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Core Solutions (Obsidian Dark Container) */}
          <section id="sec-solutions" className="site-section sec-ai-solutions">
            <div className="site-container sec-ai__container container-large padding-global">
              <div className="padding-section-large">
                <div className="section-header sec-ai__header">
                  <div className="section-badge sec-ai__badge">
                    <SubtitleMarquee text="Engineering Capabilities ✦ " variant="light" />
                  </div>
                  <h2 className="heading-style-h2 section-title sec-ai__title text-color-alternate">
                    Comprehensive AI Automation{' '}
                    <span className="text-color-secondary">Architecture</span>
                  </h2>
                  <p className="sec-ai__desc">
                    Engineered to integrate seamlessly into your current software stack without disruptive rewrites.
                  </p>
                </div>

                <div className="sec-ai__solutions-grid">
                  {aiCapabilities.map((cap) => (
                    <div key={cap.num} className="sec-ai__card">
                      <div>
                        <span className="sec-ai__card-num">{cap.num}</span>
                        <h3 className="sec-ai__card-name">{cap.name}</h3>
                        <p className="sec-ai__card-desc">{cap.desc}</p>
                      </div>
                      <div className="sec-ai__card-tags">
                        {cap.tags.map((tag, idx) => (
                          <span key={idx} className="sec-ai__card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Technology Infrastructure */}
          <section id="sec-tech" className="site-section sec-ai">
            <div className="site-container sec-ai__container container-large padding-global">
              <div className="padding-section-large">
                <div className="section-header sec-ai__header">
                  <div className="section-badge sec-ai__badge">
                    <SubtitleMarquee text="Technology Ecosystem ✦ " variant="dark" />
                  </div>
                  <h2 className="heading-style-h2 section-title sec-ai__title">
                    Built with Production-Grade{' '}
                    <span className="text-color-secondary">AI Frameworks</span>
                  </h2>
                  <p className="sec-ai__desc">
                    We select battle-tested tools engineered for enterprise security, resilience, and latency minimization.
                  </p>
                </div>

                <div className="sec-ai__stack-grid">
                  <div className="sec-ai__stack-item">
                    <div className="sec-ai__stack-label">Orchestration</div>
                    <div className="sec-ai__stack-tech">LangChain, LlamaIndex, n8n</div>
                  </div>
                  <div className="sec-ai__stack-item">
                    <div className="sec-ai__stack-label">Foundation Models</div>
                    <div className="sec-ai__stack-tech">OpenAI, Anthropic Claude, Mistral</div>
                  </div>
                  <div className="sec-ai__stack-item">
                    <div className="sec-ai__stack-label">Vector Storage</div>
                    <div className="sec-ai__stack-tech">PostgreSQL pgvector, Pinecone, Qdrant</div>
                  </div>
                  <div className="sec-ai__stack-item">
                    <div className="sec-ai__stack-label">Cloud Infrastructure</div>
                    <div className="sec-ai__stack-tech">AWS Lambda, Docker, Redis, Supabase</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: FAQs */}
          <section id="sec-faqs" className="site-section sec-ai">
            <div className="site-container sec-ai__container container-large padding-global">
              <div className="padding-section-large">
                <div className="section-header sec-ai__header">
                  <div className="section-badge sec-ai__badge">
                    <SubtitleMarquee text="Frequently Asked Questions ✦ " variant="dark" />
                  </div>
                  <h2 className="heading-style-h2 section-title sec-ai__title">
                    Clarity on Implementation &{' '}
                    <span className="text-color-secondary">Governance</span>
                  </h2>
                </div>

                <div className="sec-ai-faq__container">
                  <div className="sec-ai-faq__list">
                    {aiFaqs.map((faq, i) => (
                      <details key={i} className="sec-ai-faq__item">
                        <summary className="sec-ai-faq__question">
                          <span className="sec-ai-faq__question-text">{faq.q}</span>
                          <span className="sec-ai-faq__icon" aria-hidden="true">+</span>
                        </summary>
                        <p className="sec-ai-faq__answer">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Signature Contact CTA */}
          <ContactSection
            country="Global Enterprise"
            serviceOptions={[
              'AI Automation',
              'Autonomous AI Agents',
              'Workflow Automation',
              'Custom Software',
            ]}
          />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
