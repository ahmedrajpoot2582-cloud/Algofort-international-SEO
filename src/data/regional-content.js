import { uaeContent } from './uae.js';

// Reuse the approved service artwork and destinations; all market copy is explicit.
const services = (tags) => uaeContent.services.map((service, index) => ({ ...service, tags: tags[index] }));
const steps = (descriptions) => uaeContent.process.map((step, index) => ({ ...step, description: descriptions[index] }));
const numbered = (items) => items.map((item, index) => ({ number: String(index + 1).padStart(2, '0'), ...item }));
const faqs = (items) => items.map(([question, answer]) => ({ question, paragraphs: [answer] }));

export const usaContent = {
  path: '/usa', code: 'US', locale: 'en-US', name: 'United States', shortName: 'USA',
  cities: ['New York', 'Austin', 'San Francisco'], industryPlace: 'America’s',
  title: 'Web, SaaS & Mobile App Development for US Businesses | Algofort',
  description: 'Custom websites, SaaS platforms, mobile apps and brand identity for US businesses. Work with Algofort’s Karachi studio through clear USD milestones and remote collaboration.',
  keywords: ['software development for US businesses', 'web development USA', 'SaaS development USA', 'mobile app development USA', 'brand identity USA'],
  heroTitle: 'Designing Your Digital World in the USA & Beyond',
  heroBadge: '® Algofort USA',
  servicesLine: 'for US enterprises.',
  marquee: ['Web Development USA', 'Brand Identity USA', 'SaaS App Development', 'Mobile App Development USA'],
  about: 'At Algofort, we turn ambitious ideas into digital products that help US businesses grow. We build websites, cloud platforms, mobile apps, and distinctive brands for startups and established teams. Our Karachi studio brings strategy, design, and engineering together to support your next stage of growth.',
  services: services([
    ['WordPress', 'Shopify', 'React.js', 'Custom Websites', 'WooCommerce', 'Accessible Interfaces'],
    ['Logo Design', 'Brand Strategy', 'Brand Guidelines', 'Corporate Identity', 'Packaging Design'],
    ['Custom SaaS', 'B2B Platforms', 'ERP Software', 'Dashboards & Analytics', 'Payment & API Integration'],
    ['Android Apps', 'iOS Apps', 'Cross Platform Apps', 'Mobile UI/UX Design', 'App Maintenance & Support'],
  ]),
  process: steps([
    'Define your customers, US market priorities, product goals, technical requirements, delivery milestones, and estimated budget in USD.',
    'Explore wireframes and interactive prototypes with your team. We shape clear user journeys, a consistent visual identity, and responsive interfaces.',
    'Turn approved designs into a maintainable website, SaaS platform, or mobile application, with integrations and security requirements agreed in the scope.',
    'Test key journeys across browsers, screen sizes, and devices. Review accessibility, performance, and release readiness before launch.',
    'Deploy to the agreed hosting environment, configure analytics and monitoring, and coordinate a release window that works for your US team.',
    'Keep improving through planned updates, issue resolution, and ongoing maintenance, with support hours and response targets agreed for your project.',
  ]),
  industries: numbered([
    { title: 'SaaS & B2B Technology', description: 'Customer portals, subscription products, internal dashboards, and workflow tools that give US startups and established software teams a clear path from first release to continued development.' },
    { title: 'E-Commerce & Consumer Brands', description: 'Shopify and WooCommerce stores, product discovery experiences, brand systems, and checkout integrations built around your catalog, customers, and fulfillment process.' },
    { title: 'Real Estate & Property', description: 'Property search experiences, broker websites, lead management tools, and customer portals that help real estate teams organize listings and stay connected with prospective buyers.' },
    { title: 'Logistics & Operations', description: 'Inventory dashboards, shipment visibility tools, dispatch interfaces, and business-system integrations designed to reduce repetitive tasks across distributed operations.' },
    { title: 'Healthcare & Wellness', description: 'Clear service websites, appointment journeys, and wellness applications, with privacy and security requirements defined before any sensitive-data feature enters the project scope.' },
    { title: 'Professional Services', description: 'Distinctive websites, client portals, booking experiences, and brand identities for consulting, education, and service businesses competing across US markets.' },
  ]),
  advantagesIntro: 'Thoughtful engineering.', advantagesHighlight: 'Built for US collaboration.',
  advantagesDescription: 'A practical way to work with a remote product team.',
  advantages: numbered([
    { title: 'Planned US Time Zone Overlap', description: 'Agree a practical meeting window for your US time zone, supported by written updates, sprint demos, and shared project boards that keep decisions moving between calls.' },
    { title: 'Transparent USD Milestone Billing', description: 'Review a defined scope, deliverables, and payment schedule in USD before work starts. Changes are discussed and approved so your team can plan the budget clearly.' },
    { title: 'Clear Ownership & Confidentiality', description: 'Document confidentiality, source-code ownership, design deliverables, and handover terms in the project agreement, so responsibilities are clear from the first milestone.' },
    { title: 'Direct Access to Your Delivery Team', description: 'Work with a project lead and the designers and developers building your product. Review progress through agreed communication channels and regular staging demonstrations.' },
  ]),
  results: numbered([
    { metric: 'MVP', metricLabel: 'From idea to first release', title: 'Launch a Focused SaaS Product', category: 'Product Strategy & Cloud Development', description: 'Prioritize the core customer journey, validate an interactive prototype, and build the accounts, workflows, and integrations your first release needs.' },
    { metric: 'DTC', metricLabel: 'A connected shopping experience', title: 'Grow a Consumer Brand Online', category: 'E-Commerce & Brand Identity', description: 'Connect a distinctive identity with responsive product pages, clear navigation, and checkout and fulfillment integrations tailored to your business.' },
    { metric: 'B2B', metricLabel: 'Less manual work across teams', title: 'Connect Your Business Operations', category: 'Custom Software & API Integration', description: 'Bring customer information, reporting, and day-to-day workflows into a purpose-built portal with permissions and integrations agreed for your team.' },
  ]),
  faqs: faqs([
    ['What services does Algofort offer to US businesses?', 'We design and develop custom websites, brand identities, SaaS platforms, and mobile applications for US startups and established businesses. The scope can include discovery, UI/UX design, development, integration, testing, and ongoing maintenance.'],
    ['Where is your team based?', 'Our engineering and delivery studio is based in Karachi, Pakistan. We serve US businesses remotely through planned meetings, shared project boards, and staging demonstrations.'],
    ['How do you price projects for US clients?', 'After discovery, we prepare a scope and an itemized proposal in USD. Delivery milestones, payment terms, third-party costs, and the process for requesting changes are agreed before development starts.'],
    ['How do you handle US time zones?', 'We agree an overlap window for your team’s time zone and use written updates and recorded demonstrations where helpful. Meeting frequency, feedback windows, and support coverage are defined for the project.'],
    ['Can you integrate our existing business tools?', 'Yes. We assess your existing APIs, accounts, data, and workflows before recommending an integration approach. Payment, commerce, CRM, and analytics integrations depend on provider access, eligibility, and the agreed scope.'],
    ['What is the timeline for a website or application?', 'The schedule depends on the feature set, content readiness, integrations, and feedback cycle. Discovery produces a milestone plan, with a focused first release where appropriate, rather than a fixed timeline before requirements are known.'],
    ['Do you provide handover and post-launch support?', 'Yes. We agree the source-code and design handover, documentation, launch checks, and maintenance options in the project scope. Support hours and response targets are planned around your business needs.'],
  ]),
  ctaLine: 'for the USA.', ctaDescription: 'Let us build a digital product that moves your US business forward, from the first idea to the next stage of growth.',
  phoneLabel: 'Phone Number (US / International)',
};

export const pakistanContent = {
  path: '/pakistan', code: 'PK', locale: 'en-PK', name: 'Pakistan', shortName: 'Pakistan',
  cities: ['Karachi', 'Lahore', 'Islamabad'], industryPlace: 'Pakistan’s',
  title: 'Web, SaaS & Mobile App Development in Pakistan | Algofort',
  description: 'Websites, SaaS platforms, mobile apps and brand identity for Pakistani businesses. Work with Algofort’s Karachi studio through clear PKR/USD milestones and local collaboration.',
  keywords: ['software development Pakistan', 'web development Karachi', 'mobile app development Pakistan', 'SaaS development Pakistan', 'branding agency Pakistan'],
  heroTitle: 'Designing Your Digital World in Pakistan & Beyond',
  heroBadge: '® Algofort Pakistan',
  servicesLine: 'for Pakistani brands.',
  processHighlight: 'leading Pakistani brand.',
  marquee: ['Web Development Pakistan', 'Brand Identity Pakistan', 'SaaS App Development', 'Mobile App Development Pakistan'],
  about: 'At Algofort, we turn ambitious ideas into digital products that help Pakistani businesses grow. We build websites, cloud platforms, mobile apps, and distinctive brands for Karachi, Lahore, and Islamabad. Our team combines local understanding with strategy, design, and engineering to take your business further.',
  services: services([
    ['WordPress', 'Shopify', 'React.js', 'Custom Websites', 'WooCommerce', 'English & Urdu Interfaces'],
    ['Logo Design', 'Brand Strategy', 'Brand Guidelines', 'Corporate Identity', 'Retail Packaging'],
    ['Custom SaaS', 'Business Portals', 'ERP Software', 'Dashboards & Analytics', 'Local API Integrations'],
    ['Android Apps', 'iOS Apps', 'Cross Platform Apps', 'Mobile UI/UX Design', 'App Maintenance & Support'],
  ]),
  process: steps([
    'Define your idea, Pakistani customer needs, product goals, technical requirements, timeline, and estimated budget in PKR or USD.',
    'Review wireframes and interactive prototypes that make the customer journey clear, including English and Urdu interfaces where they fit your audience.',
    'Build the approved website, SaaS platform, or mobile app with maintainable code, practical business integrations, and security requirements agreed in the scope.',
    'Test key journeys across browsers, devices, and connection conditions, including the ordering, account, and payment flows your customers rely on.',
    'Release your product to the agreed hosting environment, complete launch checks, and set up the monitoring and analytics needed for ongoing improvement.',
    'Support the next stage through planned maintenance, issue resolution, updates, and feature development, with clear response targets and ownership.',
  ]),
  industries: numbered([
    { title: 'Retail & E-Commerce', description: 'Online stores, product catalogs, inventory tools, and order-management workflows that connect Pakistani retail brands with customers and day-to-day fulfillment operations.' },
    { title: 'Textile & Consumer Brands', description: 'Brand identities, product websites, wholesale portals, and digital catalogs for fashion, textile, and consumer businesses serving local customers and export markets.' },
    { title: 'Education & Training', description: 'Course websites, enrollment journeys, learning portals, and administration dashboards that help schools, training providers, and education businesses organize their services.' },
    { title: 'Logistics & Distribution', description: 'Dispatch tools, delivery-status interfaces, inventory dashboards, and system integrations that support trading companies, distributors, and growing fulfillment teams.' },
    { title: 'Healthcare & Wellness', description: 'Clinic websites, appointment-booking journeys, and wellness applications designed around clear communication, with privacy and access requirements defined in the scope.' },
    { title: 'Startups & Business Services', description: 'Focused MVPs, B2B portals, internal workflow tools, and professional websites that help Pakistani founders and service teams bring a clear digital offer to market.' },
  ]),
  advantagesIntro: 'Local understanding.', advantagesHighlight: 'Engineering for Pakistan.',
  advantagesDescription: 'A local delivery team with a clear, connected process.',
  advantages: numbered([
    { title: 'A Karachi-Based Delivery Studio', description: 'Work with a team based in Pakistan, with communication planned around local business hours. We connect strategy, design, and development through one shared delivery process.' },
    { title: 'Clear PKR & USD Milestone Billing', description: 'Agree the project scope, deliverables, currency, and milestone schedule before work starts. We discuss changes and third-party costs so you can plan with confidence.' },
    { title: 'Local Customer Journeys', description: 'Shape the product around your customers, from mobile browsing and English or Urdu content to ordering and fulfillment. Payment and courier integrations are reviewed against provider access and your business requirements.' },
    { title: 'Ownership, Handover & Ongoing Support', description: 'Define source-code ownership, design files, confidentiality, documentation, and support terms in the agreement, so your team knows what it receives at every stage.' },
  ]),
  results: numbered([
    { metric: 'Shop', metricLabel: 'From catalog to customer', title: 'Take Your Retail Brand Online', category: 'E-Commerce & Brand Identity', description: 'Bring your catalog, identity, and order journey together with responsive storefronts and practical inventory and fulfillment integrations.' },
    { metric: 'MVP', metricLabel: 'Turn a focused idea into a product', title: 'Build Your First Digital Product', category: 'Mobile Apps & SaaS Development', description: 'Define the essential customer journey, test an interactive prototype, and launch a manageable first version with room for future development.' },
    { metric: 'ERP', metricLabel: 'Make daily operations clearer', title: 'Connect Your Business Workflows', category: 'Custom Software & Business Systems', description: 'Organize customer records, orders, and reporting in a shared business portal, with roles and integrations tailored to the way your team works.' },
  ]),
  faqs: faqs([
    ['What services does Algofort provide in Pakistan?', 'We provide website development, brand identity, SaaS development, and mobile app development for Pakistani businesses. Projects can include discovery, interface design, business integrations, testing, launch, and ongoing maintenance.'],
    ['Where is Algofort based, and which cities do you serve?', 'Our studio is at 84j Ghazali Rd, Block 2 PECHS, Karachi. We work with businesses in Karachi, Lahore, Islamabad, and across Pakistan through planned meetings, shared project boards, and staging demonstrations.'],
    ['Can you quote a project in PKR?', 'Yes. We can discuss a proposal in PKR or USD, with the currency, payment schedule, scope, deliverables, and third-party costs agreed before work begins. The quote depends on the product and its technical requirements.'],
    ['Can you build English and Urdu websites or apps?', 'Yes. English and Urdu content, right-to-left layouts, typography, navigation, and content-management needs can be included in the scope. We design and test the experience for the languages your customers use.'],
    ['Can you connect local payment and delivery services?', 'We assess the payment and courier providers your business uses, their API access, and account requirements. We then plan the supported integrations, order flow, and testing before development begins.'],
    ['How long does a website or application take?', 'The timeline depends on features, content, integrations, and feedback readiness. After discovery, we propose delivery milestones and can prioritize a focused first release for businesses that want to launch in stages.'],
    ['Will you support the website or app after launch?', 'Yes. Maintenance, fixes, updates, monitoring, and future features can be covered by an agreed support plan. We also define the handover of source code, design files, and documentation in the project agreement.'],
  ]),
  ctaLine: 'in Pakistan.', ctaDescription: 'Let us build a digital product that helps your Pakistani business grow, with clear direction from discovery to launch.',
  phoneLabel: 'Phone Number (PK / International)',
};
