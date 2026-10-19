export const insights = [
  {
    slug: 'planning-an-international-development-project',
    title: 'How to Plan an International Development Project',
    description: 'Prepare a practical brief for a remote website, SaaS or mobile app project: audience, scope, reviews, ownership and handover.',
    intro: 'A productive international development engagement starts before the first screen is designed. Give the team enough business context to discuss the right scope, and make the decisions that affect delivery visible to everyone involved.',
    sections: [
      { title: 'Name the audience and the first useful release', paragraphs: ['Describe who will use the product, where they are and the action they need to complete. “A website for everyone” is difficult to estimate; “a service website for business customers who need to request a proposal” gives the team a useful starting point.', 'Separate the launch requirements from future improvements. List the essential pages or user journeys, the content you already have and the systems the product needs to connect to. Explain how you will decide whether the release works.'] },
      { title: 'Agree how decisions will be made', paragraphs: ['Nominate one owner who can consolidate stakeholder feedback. Record review windows with time zones, who approves each milestone and how questions should be raised between meetings.', 'A shared task board and short written decisions reduce the need for frequent calls. Ask for a demonstration of each milestone against agreed acceptance criteria, rather than approving work from a screenshot alone.'] },
      { title: 'Put regional requirements in the scope', paragraphs: ['List languages, currency display, address conventions, required devices and any hosting or procurement constraints. Confirm who supplies and approves translated content. If the project needs specialist legal or privacy review, involve the responsible adviser before implementation.', 'Identify the owner of each third-party account. Provider availability, fees, permissions and test access can affect the build even when an integration appears straightforward.'] },
      { title: 'Define ownership and handover', paragraphs: ['Agree access to the source repository, design files, hosting, domain and business accounts. Document deployment, essential configuration and how support requests will be handled after launch.', 'A useful brief does not need to solve the entire architecture. It needs to make the audience, constraints, responsibilities and first release clear enough for a team to propose a realistic plan.'] },
    ],
    relatedServices: ['web-development', 'saas-app-development', 'mobile-app-development'],
  },
  {
    slug: 'website-localization-checklist',
    title: 'A Website Localization Checklist for Global Teams',
    description: 'Plan a useful localized website: language journeys, regional content, URL structure, hreflang, interface testing and content maintenance.',
    intro: 'Localization works best when the customer can complete the whole journey in the intended language and regional context. Start with the markets you can support properly, then build a repeatable process for expanding the site.',
    sections: [
      { title: 'Localize the complete journey', paragraphs: ['Inventory navigation, public pages, forms, validation messages, confirmation screens and transactional emails. Translating only the menu leaves important parts of the experience unfinished.', 'Review content with a person who understands both the language and the audience. Agree the terminology, writing style and owner of future changes. If Arabic or another right-to-left language is required, include layout and interaction testing from the design stage.'] },
      { title: 'Give each version a clear address', paragraphs: ['Use stable URLs for published language or regional versions so people can link to them directly. Provide a visible selector and let visitors keep the version they choose instead of forcing an IP-based redirect.', 'Use hreflang only between corresponding versions of the same content. Each version should reference itself and its relevant alternatives. A global fallback can serve people whose language or region does not have a dedicated version.'] },
      { title: 'Test regional interface details', paragraphs: ['Check currency display, dates, addresses and phone fields against the audience in scope. Test long translations, small screens, keyboard navigation and form errors. A layout that works with short English labels may fail with real translated content.', 'Review external integrations and operational messages as well as the website. A localized enquiry form is incomplete if the confirmation or next step sends customers to an unsupported experience.'] },
      { title: 'Keep the published versions useful', paragraphs: ['Assign a content owner to each version. When a service, price or policy changes, record which pages and interface messages need updating. Include regional pages in your crawl and link checks.', 'Measure search performance and completed enquiries by market. Expand where you have a useful service proposition and the resources to maintain it; country-name variations alone do not make a page valuable.'] },
    ],
    relatedServices: ['web-development', 'brand-identity'],
  },
  {
    slug: 'website-saas-or-mobile-app',
    title: 'Website, SaaS or Mobile App: What Should You Build First?',
    description: 'Compare a business website, SaaS platform and mobile app by the customer task, product requirements and smallest useful first release.',
    intro: 'Choosing a format is easier when you begin with the customer task. A website, software platform and mobile app can complement each other, but they do not all need to be built at the same time.',
    sections: [
      { title: 'Choose a website for discovery and clear actions', paragraphs: ['A business website is often a useful first step when customers need to understand your offer, see your work and make an enquiry. It can also support transactions or custom workflows where those requirements are in scope.', 'Plan the content and conversion journey before choosing a visual style. If search visibility matters, make important information available in crawlable page content and link related services clearly.'] },
      { title: 'Choose SaaS when the product is an ongoing workflow', paragraphs: ['A SaaS platform is relevant when users return to manage information, collaborate or complete repeated tasks. Scope user roles, account access, core workflows and the business model before building secondary features.', 'Start with one customer segment and a focused release. Administration, permissions, error handling and support processes are part of the product, even if they are less visible than the main dashboard.'] },
      { title: 'Choose mobile when the task benefits from the device', paragraphs: ['A mobile app may make sense when a recurring task benefits from a dedicated device experience, notifications or required device capabilities. Define why customers would install and continue using it.', 'Include supported platforms, devices, release responsibilities and store submission preparation in the brief. A mobile app still needs content, a backend where appropriate and an operational support plan.'] },
      { title: 'Invest in the smallest useful release', paragraphs: ['Write the customer journey in plain language and identify what is necessary to complete it. Compare the approaches against that task, your existing systems and the resources available to maintain the result.', 'A discovery conversation can help turn that brief into options. Ask for clear assumptions, exclusions and handover responsibilities rather than choosing an approach from a feature checklist alone.'] },
    ],
    relatedServices: ['web-development', 'saas-app-development', 'mobile-app-development'],
  },
];
export const getInsight = (slug) => insights.find((insight) => insight.slug === slug);
