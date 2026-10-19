export const internationalServices = [
  {
    slug: 'web-development', name: 'Web Development',
    summary: 'Fast, accessible websites and custom web applications designed around your customers and the way your business works.',
    deliverables: ['Website architecture and responsive interface design', 'Content management and business-system integrations', 'Performance checks, testing and a documented handover'],
  },
  {
    slug: 'brand-identity', name: 'Brand Identity',
    summary: 'A clear visual identity that stays consistent across websites, product interfaces, packaging and everyday business communication.',
    deliverables: ['Brand discovery and visual direction', 'Logo, typography and colour systems', 'Practical brand guidelines and production-ready files'],
  },
  {
    slug: 'saas-app-development', name: 'SaaS App Development',
    summary: 'From a focused first release to a growing platform: product flows, account experiences and software built for continued development.',
    deliverables: ['Product scope, user journeys and interface design', 'Accounts, roles and application integrations', 'A release plan, quality checks and maintainable documentation'],
  },
  {
    slug: 'mobile-app-development', name: 'Mobile App Development',
    summary: 'Mobile experiences for the tasks your customers need to complete, with a clear path from discovery to testing and release.',
    deliverables: ['Mobile product planning and interactive prototypes', 'Application development and backend integration', 'Device testing and preparation for store submission'],
  },
];

// These are English-language market guides, not claims of local offices.
// Other countries use the global service pages through /international.
export const markets = [
  {
    slug: 'united-states', code: 'US', locale: 'en-US', name: 'United States', shortName: 'USA',
    title: 'Web, SaaS & App Development for US Businesses | Algofort',
    description: 'Plan your US business website, SaaS product, mobile app or brand identity with Algofort. Explore remote delivery, project scope and launch considerations.',
    intro: 'A US product launch can involve customers, decision-makers and partners across several time zones. A useful delivery plan starts with one audience, a clear release scope and an agreed way to review work. Algofort offers remote web development, brand identity, SaaS and mobile app services for businesses planning that next step.',
    context: 'Start with the customer action that matters: booking a service, requesting a proposal, buying a product or using a software feature. Define what the first release must do before expanding to additional audiences or channels.',
    focus: [
      ['A release that can be measured', 'Choose the main conversion and the events you need to understand it. Separate essential customer journeys from features that can wait, and include analytics setup in the agreed scope.'],
      ['Reviews across US time zones', 'Name one decision-maker and record their time zone. Agree review windows, a shared task board and written feedback so work can progress without requiring every stakeholder to join the same call.'],
      ['A useful handover', 'Specify who owns the domain, hosting, source repository and third-party accounts. Ask for deployment notes and a list of dependencies so your internal team can operate the product after release.'],
    ],
    serviceNotes: ['Plan responsive pages, USD display where relevant and the specific conversion events your US audience needs.', 'Check that the visual system works across your website, sales material and US-facing product interfaces.', 'Define user roles, subscription journeys and the first customer segment before building a broad feature set.', 'Agree the target devices, intended distribution and backend responsibilities before estimating the app.'],
    brief: ['Primary customer segment and target states', 'Decision-maker time zone and review process', 'Existing systems, launch scope and ownership requirements'],
  },
  {
    slug: 'united-kingdom', code: 'GB', locale: 'en-GB', name: 'United Kingdom', shortName: 'UK',
    title: 'Web Development & Digital Product Services for UK Businesses | Algofort',
    description: 'Explore website development, branding, SaaS and mobile app services for UK businesses, with a practical remote delivery and project-planning approach.',
    intro: 'For a UK-facing website or digital product, local language details and a clear service journey are part of the experience. Algofort works remotely on web development, brand identity, SaaS and mobile app projects, with the project scope and communication plan agreed before delivery begins.',
    context: 'A regional launch needs more than a different country label. Decide which UK customers the product serves, how enquiries should reach your team and which existing operations the new platform needs to support.',
    focus: [
      ['British English throughout the journey', 'Review page copy, field labels, error messages and transactional text together. Agree date formats, address fields and GBP presentation where relevant so the interface feels consistent.'],
      ['Accessibility in the brief', 'Include keyboard navigation, clear focus states, readable contrast and useful form errors in acceptance criteria. Agree your accessibility target and any specialist review before estimating the work.'],
      ['Your policies, implemented accurately', 'List analytics, forms and external integrations early. Your legal or privacy adviser should supply the applicable policy and consent requirements; the development scope can then describe the implementation to be tested.'],
    ],
    serviceNotes: ['Build service journeys around British English, relevant address formats and a clear enquiry or purchase flow.', 'Create consistent assets for your UK website, proposals and customer communications.', 'Plan account flows, billing presentation and operational integrations around the intended UK customer.', 'Review UK-facing onboarding copy, device coverage and customer-support journeys before release.'],
    brief: ['UK audience and the main enquiry or purchase journey', 'Accessibility target and approved policy requirements', 'Content owner, integrations and preferred review windows'],
  },
  {
    slug: 'united-arab-emirates', code: 'AE', locale: 'en-AE', name: 'United Arab Emirates', shortName: 'UAE',
    title: 'Web, Brand & App Development for UAE Businesses | Algofort',
    description: 'Discuss web development, brand identity, SaaS and mobile apps for UAE businesses. Plan language, mobile enquiries and integrations with a remote delivery team.',
    intro: 'A UAE-facing digital experience may need to serve different customer languages and connect several enquiry channels. Algofort offers remote website, brand, SaaS and mobile app development. Language requirements and integration availability are confirmed during project discovery rather than assumed.',
    context: 'Identify your intended audience first: a local service business, an international company, a property business or a software product can each need a very different journey. Use the first release to make that journey clear.',
    focus: [
      ['Plan English and Arabic separately', 'If Arabic is in scope, allow for right-to-left layouts, navigation behaviour and translated interface states. Client-approved Arabic copy and a language review should be part of the plan, including validation and error messages.'],
      ['Connect the enquiry channels', 'Define what happens after a visitor submits a form, taps a phone number or starts a WhatsApp conversation. Specify which channel reaches which team and what information needs to arrive with the enquiry.'],
      ['Agree regional operating details', 'Confirm AED presentation, relevant phone and address formats, stakeholder availability and any required integrations. Validate provider availability with the client before treating it as a committed feature.'],
    ],
    serviceNotes: ['Plan mobile enquiries and, where commissioned, English/Arabic page layouts and navigation.', 'Test the identity in both scripts when bilingual brand work is included in the approved brief.', 'Map customer accounts, operational roles and regional integration requirements before selecting a platform.', 'Include right-to-left screens and language switching in device testing when bilingual delivery is in scope.'],
    brief: ['Target customers and emirates served by your business', 'Required languages and approved translation resources', 'Enquiry channels, integrations and operational requirements'],
  },
  {
    slug: 'canada', code: 'CA', locale: 'en-CA', name: 'Canada', shortName: 'Canada',
    title: 'Web & Software Development for Canadian Businesses | Algofort',
    description: 'Plan websites, SaaS platforms, mobile apps and brand identity for Canadian customers with Algofort. Explore language scope, regional delivery and project handover.',
    intro: 'A Canadian audience can span different provinces, time zones and language expectations. Algofort provides remote digital design and development services with an agreed project scope, so your team can plan the audience and operating requirements before committing to the build.',
    context: 'Begin with the provinces and customer groups you actually serve. A national platform and a local service website need different content, address fields and support journeys. Document the first audience before expanding the brief.',
    focus: [
      ['Define the language scope', 'Decide whether the launch needs English, French or both. A bilingual project should include complete navigation, page content, forms and interface messages, plus an agreed owner for approved translations.'],
      ['Build suitable address and currency fields', 'Specify province selection, postal codes, phone fields and CAD display where appropriate. Test sample customer records from the regions in scope rather than relying on one international default.'],
      ['Choose data and integration requirements early', 'If your organisation has hosting-location, data-handling or procurement requirements, put them in the brief before selecting providers. Confirm those decisions with the responsible advisers and your own operations team.'],
    ],
    serviceNotes: ['Scope Canadian address patterns and complete language journeys where bilingual delivery is commissioned.', 'Plan how the identity works across English and French materials if both are part of your audience.', 'Identify the customer regions, currency presentation and organisational hosting requirements before development.', 'Test onboarding, language preferences and regional contact details on the intended devices.'],
    brief: ['Provinces and customer groups included at launch', 'English/French scope and content approval owner', 'Hosting requirements, integrations and stakeholder time zones'],
  },
  {
    slug: 'australia', code: 'AU', locale: 'en-AU', name: 'Australia', shortName: 'Australia',
    title: 'Web Development & Digital Design for Australian Businesses | Algofort',
    description: 'Explore remote web, SaaS, mobile app and brand services for Australian businesses. Plan regional performance, content and an effective delivery workflow.',
    intro: 'An Australian business needs a digital delivery plan that respects customer location and stakeholder availability. Algofort offers remote development and design services, with written milestones and a shared review process defined around the project.',
    context: 'A website serving local enquiries, an online product and an internal business application need different foundations. Agree the audience, launch geography and service journey before deciding which technology or features to build.',
    focus: [
      ['Test where your customers are', 'Include performance checks from an Australian region in the acceptance plan. Review image sizes, third-party scripts and hosting/CDN choices against the actual experience instead of assuming a local development result represents customer performance.'],
      ['Make asynchronous reviews useful', 'Document review deadlines in the stakeholder time zone. Recorded walkthroughs, clear acceptance criteria and consolidated feedback help projects move when live meeting hours are limited.'],
      ['Use local interface conventions', 'Confirm Australian English, AUD display, state/territory and postcode fields where relevant. Review transactional messages as well as public pages so customers encounter the same conventions throughout.'],
    ],
    serviceNotes: ['Scope Australian customer journeys and test delivery performance from the intended audience region.', 'Prepare a consistent identity for digital channels and the physical brand materials your business uses.', 'Define administrator tasks, customer roles and regional integrations in the first product release.', 'Include devices, connectivity conditions and the customer-support path in your mobile test plan.'],
    brief: ['Australian audience and primary service journey', 'Stakeholder time zone and milestone review windows', 'Performance expectations, integrations and existing platform'],
  },
  {
    slug: 'germany', code: 'DE', locale: 'en-DE', name: 'Germany', shortName: 'Germany',
    title: 'Web & Digital Product Development for German Businesses | Algofort',
    description: 'Explore Algofort’s remote web, SaaS, app and brand development services for German businesses, including practical language and integration planning.',
    intro: 'A German-facing product needs a deliberate language and content plan. Algofort offers remote website, brand identity, SaaS and mobile development services. This market guide is in English; German content and any translation work are separate project requirements to agree during discovery.',
    context: 'A business selling to German-speaking customers should define who approves the language, how the interface handles longer copy and which operational systems need to connect. These decisions affect design and estimation from the start.',
    focus: [
      ['Allow room for German content', 'Use realistic approved text in design reviews. Navigation, buttons and mobile cards need to cope with longer labels without clipping or hiding essential actions. Include form feedback and emails in the content inventory.'],
      ['Implement adviser-approved requirements', 'Your responsible advisers should confirm applicable legal notices, privacy information and consent requirements. Record the approved requirements in the implementation checklist rather than treating a template as legal advice.'],
      ['Prepare a structured integration brief', 'List existing business tools, the information each system owns and how errors should be handled. Include EUR display, address formats and other interface conventions where they apply to the actual product.'],
    ],
    serviceNotes: ['Use realistic German copy and test layouts before approving responsive website templates.', 'Review logo assets and typography for the language and production requirements in your brief.', 'Document account roles, system integrations and client-approved operational requirements.', 'Test longer labels, form states and German-language onboarding when localization is commissioned.'],
    brief: ['German-speaking audience and intended launch languages', 'Approved content and legal/privacy implementation requirements', 'Existing systems, owners and data flows'],
  },
  {
    slug: 'singapore', code: 'SG', locale: 'en-SG', name: 'Singapore', shortName: 'Singapore',
    title: 'Web, SaaS & App Development for Singapore Businesses | Algofort',
    description: 'Plan a website, SaaS platform, mobile app or brand identity for Singapore and wider regional audiences with Algofort’s remote delivery services.',
    intro: 'A Singapore-based business may serve one local audience or operate across several regional markets. Algofort offers remote digital development and design services, with the first audience and expansion requirements separated clearly in the project brief.',
    context: 'Start by deciding whether the launch serves Singapore alone or needs a foundation for additional markets. Shared components can support expansion, but currency, content and operational requirements should remain explicit for each audience.',
    focus: [
      ['One launch, a clear expansion plan', 'Prioritise the customer journey for the first market. Identify which content and settings could later vary by country, without building incomplete country pages or unnecessary application features at launch.'],
      ['Scope regional systems accurately', 'List required payment, customer-management and communication providers. Confirm account ownership and provider availability, and define how the platform should respond when an external service fails.'],
      ['Make mobile tasks easy to complete', 'Test essential enquiries, sign-up and account tasks on small screens. Define language requirements and SGD presentation where relevant, then review each step with actual launch content.'],
    ],
    serviceNotes: ['Separate Singapore launch content from future regional versions while keeping navigation and ownership clear.', 'Build an identity system that can support consistent materials across the markets in your approved scope.', 'Define tenant roles, account journeys and regional expansion requirements before planning the architecture.', 'Prioritise mobile onboarding and the tasks customers need to finish while away from a desktop.'],
    brief: ['Singapore-only or multi-market launch scope', 'Customer journeys, languages and currency requirements', 'Required providers and the owner of each business account'],
  },
  {
    slug: 'saudi-arabia', code: 'SA', locale: 'en-SA', name: 'Saudi Arabia', shortName: 'Saudi Arabia',
    title: 'Web & App Development for Saudi Businesses | Algofort',
    description: 'Explore remote web, brand, SaaS and mobile app services for Saudi businesses. Plan Arabic/English scope, mobile journeys and integration requirements.',
    intro: 'A Saudi-facing digital product benefits from planning language, mobile journeys and operational requirements together. Algofort offers remote web development, brand identity, SaaS and mobile app services, with delivery details confirmed in the project scope.',
    context: 'Decide which customer group the first release serves and what language they need at each step. A public website, customer application and staff portal can have different content and integration needs even within one business.',
    focus: [
      ['Treat right-to-left as a full experience', 'Where Arabic is commissioned, review navigation, icons, mixed-language numbers and form messages in context. Use approved Arabic text and allow time for a qualified language review before release.'],
      ['Confirm provider requirements', 'Identify the payment, messaging and business-system providers your organisation wants to use. Confirm availability, account ownership and technical access before including an integration in the delivery estimate.'],
      ['Document operating and hosting constraints', 'Record any organisation-specific procurement, hosting or data requirements and have the responsible advisers approve them. Include SAR display and local contact conventions where the interface needs them.'],
    ],
    serviceNotes: ['Plan Arabic/English layouts and mobile enquiry journeys according to your approved language scope.', 'Check bilingual typography and the identity system across the required digital and print assets.', 'Agree operational roles, hosting constraints and provider integrations before estimating a platform.', 'Include right-to-left screens, mixed-language content and required devices in the mobile acceptance plan.'],
    brief: ['Target customers and Arabic/English content scope', 'Approved hosting, procurement and operational requirements', 'Integrations, mobile priorities and content approval owner'],
  },
];

export const marketPath = (market) => `/international/${market.slug}`;
export const internationalAlternates = () => Object.fromEntries([
  ['en', '/international'], ['x-default', '/international'],
  ...markets.map((market) => [market.locale, marketPath(market)]),
]);
export const getMarket = (slug) => markets.find((market) => market.slug === slug);

// ISO 3166-1 countries and territories. Inclusion is a directory entry, not a
// claim of an office, local credentials or confirmed availability in every region.
const countryCodes = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });
export const countries = countryCodes.map((code) => ({
  code,
  name: countryNames.of(code),
  market: markets.find((market) => market.code === code)?.slug || null,
})).sort((a, b) => a.name.localeCompare(b.name, 'en'));
