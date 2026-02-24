export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES = [
  {
    id: 'web-development',
    slug: 'web-development',
    number: '01',
    name: 'Web Development',
    tagline: 'Websites that perform as beautifully as they look.',
    shortDesc:
      'We build blazing-fast, responsive, and SEO-optimized websites that convert visitors into customers.',
    fullDescription:
      'In a world where your website is your first impression, mediocrity is not an option. We architect, design, and develop web experiences that command attention, earn trust, and drive measurable business results. Every line of code we write is purposeful — optimized for speed, accessibility, and long-term scalability. From dynamic React applications to headless e-commerce platforms, we build websites that don\'t just look exceptional — they perform at a world-class level.',
    color: '#3B82F6',
    icon: 'web',
    offerings: [
      'Custom React & Next.js Applications',
      'E-Commerce Platforms (Shopify, Custom)',
      'Progressive Web Apps (PWA)',
      'Headless CMS Integration',
      'API-first Architecture',
      'Performance & Core Web Vitals Optimization',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'TypeScript', 'Vercel', 'AWS'],
    process: [
      {
        step: '01',
        title: 'Discovery & Strategy',
        desc: 'We dive deep into your business goals, target audience, and competitive landscape to define the right technical and design strategy.',
      },
      {
        step: '02',
        title: 'Design & Prototyping',
        desc: 'Our designers craft pixel-perfect wireframes and interactive prototypes, ensuring every user interaction is intuitive and on-brand.',
      },
      {
        step: '03',
        title: 'Development & Integration',
        desc: 'Our engineers build with clean, documented code — integrating CMS, payment systems, APIs, and third-party tools seamlessly.',
      },
      {
        step: '04',
        title: 'Testing & Launch',
        desc: 'Rigorous QA across browsers, devices, and performance benchmarks. We don\'t launch until every metric is green.',
      },
    ],
    benefits: [
      {
        title: 'Lightning Fast',
        desc: 'Sub-2-second load times with advanced caching, CDN, and code optimization that Google rewards with top rankings.',
      },
      {
        title: 'SEO-First',
        desc: 'Built with semantic HTML, structured data, and technical SEO best practices baked in from day one — not bolted on later.',
      },
      {
        title: 'Conversion-Optimized',
        desc: 'Every element is designed to guide users toward action. Strategic CTAs, trust signals, and UX patterns that convert.',
      },
      {
        title: 'Future-Proof',
        desc: 'Scalable architecture that grows with your business. Adding features months later is as easy as day one.',
      },
    ],
    metrics: [
      { value: '3x', label: 'Avg. Conversion Increase' },
      { value: '98+', label: 'PageSpeed Score' },
      { value: '<2s', label: 'Load Time Target' },
      { value: '100%', label: 'Mobile Responsive' },
    ],
    industries: [
      'E-Commerce & Retail',
      'SaaS & Technology',
      'Healthcare & Wellness',
      'Finance & Fintech',
      'Education',
      'Real Estate',
    ],
    faq: [
      {
        q: 'How long does a website project take?',
        a: 'Typically 4–12 weeks depending on scope. A simple marketing site takes 4–6 weeks; a complex web application or e-commerce platform takes 8–16 weeks. We\'ll give you a precise timeline after the discovery phase.',
      },
      {
        q: 'Will my website work on all devices?',
        a: 'Absolutely. We build with a mobile-first approach and test across 20+ device/browser combinations before launch. Your site will be pixel-perfect on every screen.',
      },
      {
        q: 'Can you redesign my existing website?',
        a: 'Yes. We handle complete redesigns and rebuilds, including migrating your existing content, preserving your SEO rankings, and modernizing your tech stack.',
      },
      {
        q: 'Do you provide ongoing maintenance?',
        a: 'Yes. We offer monthly maintenance packages covering security updates, performance monitoring, content updates, and priority support.',
      },
    ],
    relatedServices: ['app-development', 'digital-marketing', 'custom-software'],
  },
  {
    id: 'app-development',
    slug: 'app-development',
    number: '02',
    name: 'App Development',
    tagline: 'Native performance. Cross-platform reach.',
    shortDesc:
      'We develop high-performance mobile applications for iOS and Android that users love.',
    fullDescription:
      'The best mobile apps are invisible — they dissolve into users\' daily routines so seamlessly that people can\'t imagine life without them. That\'s the standard we build to. Our mobile development team combines native platform expertise with cross-platform efficiency to ship apps that delight users and drive retention. From fintech apps handling millions in transactions to consumer apps with millions of daily active users — we build for real-world scale from day one.',
    color: '#8B5CF6',
    icon: 'app',
    offerings: [
      'iOS Native Development (Swift)',
      'Android Native Development (Kotlin)',
      'Cross-Platform (Flutter & React Native)',
      'UI/UX Design for Mobile',
      'App Store Optimization (ASO)',
      'Backend & API Development',
    ],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'AWS', 'PostgreSQL'],
    process: [
      {
        step: '01',
        title: 'User Research & Planning',
        desc: 'We analyze your target users, map user journeys, and define core features to build the minimum lovable product — not just MVP.',
      },
      {
        step: '02',
        title: 'UI/UX Design',
        desc: 'Intuitive interfaces designed to platform guidelines (HIG for iOS, Material Design for Android) with your brand identity woven throughout.',
      },
      {
        step: '03',
        title: 'Agile Development',
        desc: 'Sprint-based development with bi-weekly demos so you see real progress, not just a big reveal at the end.',
      },
      {
        step: '04',
        title: 'QA & Store Submission',
        desc: 'Exhaustive testing on real devices. We handle the App Store and Google Play submission, including App Store Connect and Play Console setup.',
      },
    ],
    benefits: [
      {
        title: 'Buttery Performance',
        desc: '60fps animations, instant responses, and optimized memory usage that make your app feel native even when it\'s cross-platform.',
      },
      {
        title: 'Offline Capability',
        desc: 'Smart offline modes that let users keep working even without internet — data syncs automatically when connectivity returns.',
      },
      {
        title: 'Secure by Design',
        desc: 'End-to-end encryption, biometric authentication, and secure storage — built into the architecture, not added as an afterthought.',
      },
      {
        title: 'Analytics Ready',
        desc: 'Deep event tracking, user behavior analytics, and crash reporting integrated from launch so you can iterate with confidence.',
      },
    ],
    metrics: [
      { value: '4.8+', label: 'Avg. App Store Rating' },
      { value: '60fps', label: 'Smooth Animations' },
      { value: '2', label: 'Platforms Covered' },
      { value: '<3s', label: 'App Launch Time' },
    ],
    industries: [
      'Healthcare & MedTech',
      'Fintech & Banking',
      'Logistics & Transport',
      'Food & Delivery',
      'Social & Community',
      'Enterprise & B2B',
    ],
    faq: [
      {
        q: 'Should I go native or cross-platform?',
        a: 'It depends on your needs. Native (Swift/Kotlin) gives maximum performance and platform integration. Cross-platform (Flutter/React Native) gives 80–90% of native performance at 60% of the cost. We\'ll recommend the right approach after understanding your requirements.',
      },
      {
        q: 'How long does app development take?',
        a: 'An MVP app typically takes 8–16 weeks. A full-featured app with complex backend can take 16–24 weeks. We build in phases so you can launch early and iterate.',
      },
      {
        q: 'Do you handle App Store rejection issues?',
        a: 'Yes. We\'ve navigated countless App Store and Google Play review processes. We know the guidelines inside out and handle any rejections or revision requests.',
      },
      {
        q: 'What happens after launch?',
        a: 'We offer post-launch support packages for bug fixes, OS update compatibility, feature additions, and performance optimization as your user base grows.',
      },
    ],
    relatedServices: ['web-development', 'custom-software', 'digital-marketing'],
  },
  {
    id: 'video-editing',
    slug: 'video-editing',
    number: '03',
    name: 'Video Editing',
    tagline: 'Stories that move people — literally.',
    shortDesc:
      'We transform raw footage into polished visual narratives that captivate, convert, and stay in memory.',
    fullDescription:
      'In the attention economy, video is the currency of impact. The difference between a video that gets scrolled past and one that gets shared a thousand times is craft. Our video production and editing team combines cinematic storytelling with strategic intent — every cut, every transition, every sound cue is deliberate. From brand films to social reels, corporate explainers to product showcases, we produce content that builds brands, drives engagement, and delivers results you can measure.',
    color: '#EC4899',
    icon: 'video',
    offerings: [
      'Corporate & Brand Films',
      'Social Media Reels & Short-Form Content',
      'Motion Graphics & 2D/3D Animation',
      'Product Showcase & Demo Videos',
      'Color Grading & Colour Correction',
      'Sound Design & Audio Mixing',
    ],
    techStack: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Blender', 'Cinema 4D', 'Adobe Audition'],
    process: [
      {
        step: '01',
        title: 'Brief & Creative Direction',
        desc: 'We nail down your message, audience, tone, and distribution channels — then build a creative brief that guides every creative decision.',
      },
      {
        step: '02',
        title: 'Scripting & Storyboarding',
        desc: 'Scripts and shot-by-shot storyboards crafted before a frame is cut — so you know exactly what you\'re getting before production begins.',
      },
      {
        step: '03',
        title: 'Editing & Post-Production',
        desc: 'Assembly cuts, fine cuts, motion graphics, color grading, and sound design — all in collaborative rounds with your feedback driving every revision.',
      },
      {
        step: '04',
        title: 'Delivery & Distribution',
        desc: 'Export in every format you need — 4K masters, compressed web versions, social-optimized cuts — delivered on time and on brand.',
      },
    ],
    benefits: [
      {
        title: 'Higher Engagement',
        desc: 'Video content generates 12x more shares than text and images combined. We make every second of runtime count.',
      },
      {
        title: 'Brand Consistency',
        desc: 'Every frame reflects your brand — colours, typography, tone, and pacing are all aligned with your visual identity.',
      },
      {
        title: 'Platform-Optimized',
        desc: 'Different formats for different platforms. Your brand film, 60s Instagram cut, and 15s TikTok all look native to their platform.',
      },
      {
        title: 'Fast Turnaround',
        desc: 'Our streamlined production pipeline means you get professional results fast — without sacrificing a frame of quality.',
      },
    ],
    metrics: [
      { value: '12x', label: 'More Shares vs Text' },
      { value: '80%', label: 'Viewer Recall Rate' },
      { value: '4K', label: 'Maximum Resolution' },
      { value: '48hr', label: 'Rush Turnaround Available' },
    ],
    industries: [
      'Brands & Consumer Goods',
      'Real Estate & Property',
      'Education & E-Learning',
      'Events & Entertainment',
      'Healthcare & Pharma',
      'Technology & SaaS',
    ],
    faq: [
      {
        q: 'Do you handle filming or only editing?',
        a: 'Both. We can work with your existing footage for editing-only projects, or we can manage the entire production — scripting, shooting, and post-production.',
      },
      {
        q: 'How many revision rounds are included?',
        a: 'Our standard packages include 3 rounds of revisions. We find this gives our clients the freedom to refine without endless back-and-forth.',
      },
      {
        q: 'What video formats do you deliver?',
        a: 'We deliver in any format you need — H.264/H.265 for web, ProRes for broadcast, optimized versions for Instagram, YouTube, TikTok, LinkedIn, and more.',
      },
      {
        q: 'Can you animate our logo or create a brand video?',
        a: 'Absolutely. Logo animations, brand intro sequences, and full brand films are some of our most popular services.',
      },
    ],
    relatedServices: ['digital-marketing', 'web-development', 'custom-software'],
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    number: '04',
    name: 'Digital Marketing',
    tagline: 'Data-driven growth, not guesswork.',
    shortDesc:
      'We craft marketing strategies that deliver measurable ROI with scientific precision and creative excellence.',
    fullDescription:
      'Marketing without data is just expense. Marketing with data — and the creativity to act on it — is growth. We build full-funnel digital marketing strategies that attract the right audience, convert them into customers, and turn customers into advocates. Our approach combines rigorous data analysis with compelling creative to drive campaigns that consistently outperform industry benchmarks. We don\'t just run ads — we build growth engines.',
    color: '#F59E0B',
    icon: 'marketing',
    offerings: [
      'SEO — Technical, On-Page & Off-Page',
      'Content Marketing & Strategy',
      'Google Ads & PPC Campaigns',
      'Meta, LinkedIn & TikTok Advertising',
      'Social Media Management & Growth',
      'Email Marketing & Marketing Automation',
    ],
    techStack: ['Google Analytics 4', 'Google Ads', 'Meta Business Suite', 'SEMrush', 'HubSpot', 'Mailchimp', 'Hotjar'],
    process: [
      {
        step: '01',
        title: 'Audit & Research',
        desc: 'We audit your current digital presence, analyze competitors, and identify the highest-leverage opportunities for growth.',
      },
      {
        step: '02',
        title: 'Strategy & Planning',
        desc: 'A bespoke marketing strategy aligned to your business goals — with clear KPIs, channel mix, budget allocation, and 90-day milestones.',
      },
      {
        step: '03',
        title: 'Execution & Optimization',
        desc: 'Campaigns launched with precision and optimized continuously — A/B testing, bid management, creative refresh, and audience refinement.',
      },
      {
        step: '04',
        title: 'Reporting & Scaling',
        desc: 'Transparent monthly reports with clear attribution. What\'s working gets more budget; what isn\'t gets fixed or cut.',
      },
    ],
    benefits: [
      {
        title: 'Measurable ROI',
        desc: 'Every campaign tied to revenue. We track cost-per-acquisition, customer lifetime value, and ROAS — not just vanity metrics.',
      },
      {
        title: 'Omnichannel Reach',
        desc: 'Your audience exists across multiple channels. We orchestrate a coordinated presence so your brand is everywhere they look.',
      },
      {
        title: 'Compounding Growth',
        desc: 'SEO and content investments compound over time. We balance quick-win paid campaigns with long-term organic growth strategies.',
      },
      {
        title: 'Creative + Analytical',
        desc: 'Rare combination of data-driven strategy and compelling creative. Great targeting with mediocre creative fails. We nail both.',
      },
    ],
    metrics: [
      { value: '4.2x', label: 'Avg. ROAS Achieved' },
      { value: '65%', label: 'Avg. SEO Traffic Increase' },
      { value: '2.8x', label: 'Avg. Lead Volume Increase' },
      { value: '30-Day', label: 'Time to First Results' },
    ],
    industries: [
      'E-Commerce & D2C',
      'SaaS & Software',
      'Professional Services',
      'Healthcare',
      'Real Estate',
      'Education & Coaching',
    ],
    faq: [
      {
        q: 'How long before I see results?',
        a: 'Paid ads can show results within 2–4 weeks. SEO typically shows meaningful improvement in 3–6 months. We\'ll set realistic expectations based on your specific situation and budget.',
      },
      {
        q: 'What\'s the minimum marketing budget?',
        a: 'We work with ad spends starting from $2,000/month. Our management fee is separate. We\'ll recommend the minimum effective budget for your industry and goals.',
      },
      {
        q: 'Do you create the ad creatives?',
        a: 'Yes. Our in-house creative team handles ad copy, static images, and short video ads. We A/B test creatives continuously to identify top performers.',
      },
      {
        q: 'How do you report on performance?',
        a: 'You get a live dashboard with real-time data, plus a detailed monthly report with insights, wins, learnings, and the plan for the next month.',
      },
    ],
    relatedServices: ['web-development', 'video-editing', 'custom-software'],
  },
  {
    id: 'erp-solutions',
    slug: 'erp-solutions',
    number: '05',
    name: 'ERP Solutions',
    tagline: 'Streamline everything. Automate the rest.',
    shortDesc:
      'We implement and customize ERP systems that unify your operations and eliminate inefficiency at scale.',
    fullDescription:
      'Disconnected systems, manual data entry, and siloed teams are the enemies of growth. An ERP system, properly implemented, is the operating system of your business — connecting finance, HR, inventory, procurement, and operations into one source of truth. We don\'t just install software; we redesign your business processes, configure the system to match how your business actually works, and ensure your team is fully empowered to leverage it from day one.',
    color: '#10B981',
    icon: 'erp',
    offerings: [
      'ERP System Selection & Consulting',
      'Odoo Implementation & Customization',
      'SAP Implementation & Integration',
      'Microsoft Dynamics 365 Deployment',
      'Business Process Re-engineering',
      'Data Migration & Legacy System Integration',
    ],
    techStack: ['Odoo', 'SAP', 'Microsoft Dynamics 365', 'Oracle ERP', 'PostgreSQL', 'Python', 'REST APIs'],
    process: [
      {
        step: '01',
        title: 'Business Analysis',
        desc: 'Deep-dive into your current processes, pain points, data flows, and future requirements before recommending any technology.',
      },
      {
        step: '02',
        title: 'Solution Design',
        desc: 'Blueprint the system architecture, module selection, customization requirements, and integration points with your existing tools.',
      },
      {
        step: '03',
        title: 'Implementation & Configuration',
        desc: 'System installation, custom module development, data migration from legacy systems, and integration with existing software.',
      },
      {
        step: '04',
        title: 'Training & Go-Live',
        desc: 'Comprehensive user training, parallel running period to ensure stability, go-live support, and post-implementation review.',
      },
    ],
    benefits: [
      {
        title: 'Single Source of Truth',
        desc: 'Eliminate data silos. Every department — finance, HR, inventory, sales — works from the same real-time data.',
      },
      {
        title: 'Automated Workflows',
        desc: 'Manual processes that used to take hours are automated in seconds. Your team focuses on decisions, not data entry.',
      },
      {
        title: 'Real-Time Visibility',
        desc: 'Live dashboards and reports give leadership instant visibility into every corner of the business — from anywhere.',
      },
      {
        title: 'Scalable Foundation',
        desc: 'The system grows with you. Adding new users, modules, or business units takes days, not months.',
      },
    ],
    metrics: [
      { value: '40%', label: 'Avg. Operational Cost Reduction' },
      { value: '60%', label: 'Less Manual Data Entry' },
      { value: '3x', label: 'Faster Reporting' },
      { value: '99.9%', label: 'System Uptime SLA' },
    ],
    industries: [
      'Manufacturing',
      'Distribution & Logistics',
      'Retail & Wholesale',
      'Construction & Real Estate',
      'Healthcare Administration',
      'Professional Services',
    ],
    faq: [
      {
        q: 'Which ERP platform should I choose?',
        a: 'It depends on your company size, industry, budget, and complexity. We\'re platform-agnostic and will recommend the right fit after understanding your needs — not push you toward the most expensive option.',
      },
      {
        q: 'How disruptive is an ERP implementation?',
        a: 'With proper change management and a phased approach, disruption is minimal. We run parallel systems during transition and provide dedicated support during go-live.',
      },
      {
        q: 'Can you integrate the ERP with my existing software?',
        a: 'Yes. We specialize in integrating ERP systems with CRMs, e-commerce platforms, accounting tools, and custom applications via APIs.',
      },
      {
        q: 'How long does an ERP implementation take?',
        a: 'A standard SME implementation takes 3–6 months. Enterprise-scale implementations can take 9–18 months. We deliver in phases so you see value before the full rollout.',
      },
    ],
    relatedServices: ['custom-software', 'web-development', 'digital-marketing'],
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    number: '06',
    name: 'Custom Software',
    tagline: 'Your vision. Our engineering. Zero compromises.',
    shortDesc:
      'We architect and build bespoke software solutions that give your business a genuine competitive advantage.',
    fullDescription:
      'Off-the-shelf software is built for everyone — which means it\'s optimized for no one. When your business model, workflows, or competitive advantage requires capabilities that no packaged software can deliver, you build custom. Our engineering team architects scalable, secure, and maintainable software tailored precisely to your requirements. From internal tools that 10x your team\'s productivity to customer-facing platforms that define your industry — we build the software your business needs to lead.',
    color: '#06B6D4',
    icon: 'software',
    offerings: [
      'Bespoke Web & Desktop Applications',
      'Internal Business Tools & Portals',
      'API Development & Third-Party Integrations',
      'Cloud Architecture (AWS, GCP, Azure)',
      'Microservices & Serverless Architecture',
      'DevOps, CI/CD & Infrastructure Automation',
    ],
    techStack: ['Python', 'Node.js', 'Go', 'TypeScript', 'React', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    process: [
      {
        step: '01',
        title: 'Requirements Engineering',
        desc: 'We work with your stakeholders to define precise functional and non-functional requirements, user stories, and acceptance criteria.',
      },
      {
        step: '02',
        title: 'Architecture Design',
        desc: 'System architecture decisions made with longevity in mind — the right database, the right cloud services, the right scalability model.',
      },
      {
        step: '03',
        title: 'Iterative Development',
        desc: 'Agile sprints with working software delivered every 2 weeks. You see real progress and can adjust priorities as you learn.',
      },
      {
        step: '04',
        title: 'Deployment & Support',
        desc: 'Automated deployment pipelines, monitoring, alerting, and a documented handover — so your team can maintain and evolve the software.',
      },
    ],
    benefits: [
      {
        title: 'Competitive Edge',
        desc: 'Software built for your exact processes is faster, more efficient, and harder to replicate than any off-the-shelf alternative.',
      },
      {
        title: 'You Own It Completely',
        desc: 'Full source code ownership, no vendor lock-in, no per-seat licensing. Your software is an asset, not an ongoing expense.',
      },
      {
        title: 'Integrates with Everything',
        desc: 'Custom software can connect to every system you use — legacy databases, third-party APIs, hardware systems — without compromise.',
      },
      {
        title: 'Built to Scale',
        desc: 'Architecture designed for your 10x future, not just today\'s load. Horizontal scaling, caching, and database optimization from the start.',
      },
    ],
    metrics: [
      { value: '10x', label: 'Team Productivity Gains' },
      { value: '0%', label: 'Vendor Lock-In' },
      { value: '99.95%', label: 'Uptime Target' },
      { value: 'Full', label: 'Source Code Ownership' },
    ],
    industries: [
      'Fintech & Financial Services',
      'Healthcare & MedTech',
      'Logistics & Supply Chain',
      'Legal & Compliance',
      'Government & Public Sector',
      'Enterprise & Corporates',
    ],
    faq: [
      {
        q: 'How is custom software priced?',
        a: 'We price based on scope, complexity, and team composition. After a discovery workshop, we provide a fixed-scope quote for Phase 1 and a range estimate for subsequent phases.',
      },
      {
        q: 'Do I need a technical co-founder to work with you?',
        a: 'No. We act as your technical partner. We translate your business requirements into technical solutions and communicate in plain English throughout.',
      },
      {
        q: 'What happens after the software is built?',
        a: 'We offer ongoing retainer agreements for new features, maintenance, monitoring, and technical support. Many clients also use us for version 2 and beyond.',
      },
      {
        q: 'How do you ensure code quality?',
        a: 'Code reviews on every PR, automated testing (unit, integration, e2e), static analysis, and documented coding standards. We deliver code we\'re proud to put our name on.',
      },
    ],
    relatedServices: ['web-development', 'app-development', 'erp-solutions'],
  },
];

export const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Global Clients' },
  { value: 6, suffix: '', label: 'Core Services' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

export const TESTIMONIALS = [
  {
    quote:
      'PostPerfect transformed our digital presence completely. The website they built doubled our conversion rate within two months.',
    author: 'Sarah Chen',
    company: 'NovaTech Solutions',
    role: 'CEO',
    service: 'web-development',
  },
  {
    quote:
      'Their approach to app development is unlike anything we\'ve experienced. The attention to detail and performance optimization is exceptional.',
    author: 'Marcus Rivera',
    company: 'UrbanFlow',
    role: 'Product Director',
    service: 'app-development',
  },
  {
    quote:
      'Working with PostPerfect on our ERP implementation was seamless. They understood our complex workflows and delivered ahead of schedule.',
    author: 'Anika Patel',
    company: 'GlobalTrade Inc.',
    role: 'COO',
    service: 'erp-solutions',
  },
  {
    quote:
      'The marketing team at PostPerfect delivered a 4x ROAS on our Google campaigns within the first 60 days. Incredible results.',
    author: 'James Wu',
    company: 'Elevate Commerce',
    role: 'Growth Lead',
    service: 'digital-marketing',
  },
];

export const TEAM = [
  { name: 'Alex Morgan', role: 'Founder & CEO', image: null },
  { name: 'Jordan Lee', role: 'CTO', image: null },
  { name: 'Priya Sharma', role: 'Design Lead', image: null },
  { name: 'Marcus Webb', role: 'Lead Developer', image: null },
  { name: 'Sofia Rossi', role: 'Marketing Director', image: null },
  { name: 'David Kim', role: 'Project Manager', image: null },
];

export const VALUES = [
  {
    number: '01',
    title: 'Innovation',
    description:
      'We don\'t follow trends — we set them. Every project pushes boundaries and challenges conventions.',
  },
  {
    number: '02',
    title: 'Precision',
    description:
      'Every pixel, every line of code, every strategy is crafted with meticulous attention to detail.',
  },
  {
    number: '03',
    title: 'Partnership',
    description:
      'Your success is our success. We embed ourselves in your vision and treat every project as our own.',
  },
  {
    number: '04',
    title: 'Excellence',
    description:
      'Good enough is never enough. We deliver work that exceeds expectations and stands the test of time.',
  },
];

export const TECH_STACK = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Python',
  'Flutter', 'React Native', 'Swift', 'Kotlin', 'Go', 'Rust',
  'AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB',
  'Figma', 'After Effects', 'Premiere Pro', 'Blender',
  'Tailwind CSS', 'TypeScript', 'GraphQL', 'Redis',
  'SAP', 'Odoo', 'Shopify', 'WordPress',
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    desc: 'We start by deeply understanding your business, goals, audience, and competitive landscape.',
    icon: 'discover',
  },
  {
    number: '02',
    title: 'Strategize',
    desc: 'Every decision is backed by research. We build a roadmap that prioritizes impact and minimizes risk.',
    icon: 'strategy',
  },
  {
    number: '03',
    title: 'Execute',
    desc: 'Our specialists execute with precision — iterating fast, communicating clearly, and delivering on time.',
    icon: 'execute',
  },
  {
    number: '04',
    title: 'Deliver & Grow',
    desc: 'We don\'t disappear after launch. We monitor, optimize, and evolve your product for lasting results.',
    icon: 'deliver',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Full-Service Under One Roof',
    desc: 'Web, apps, video, marketing, ERP, and custom software — no juggling multiple agencies. One team, one vision, zero handoff friction.',
  },
  {
    title: 'Senior-Led Delivery',
    desc: 'You won\'t be handed to juniors after signing. Your project is led by senior specialists who\'ve solved these problems before.',
  },
  {
    title: 'Transparent Process',
    desc: 'Real-time project dashboards, weekly standups, and no-surprise billing. You\'re always in the loop.',
  },
  {
    title: 'Results, Not Deliverables',
    desc: 'We care about the business outcome, not just shipping code or designs. If it\'s not moving your metrics, we fix it.',
  },
  {
    title: 'Global Standards, Personal Service',
    desc: 'International-quality output with the responsiveness of a boutique agency. You get the best of both worlds.',
  },
  {
    title: 'Long-Term Partners',
    desc: '80% of our clients stay with us beyond the first project. We\'re not here for a transaction — we\'re here for the long run.',
  },
];

export const INDUSTRIES = [
  { name: 'E-Commerce & Retail', icon: '🛍️' },
  { name: 'SaaS & Technology', icon: '💻' },
  { name: 'Healthcare & MedTech', icon: '🏥' },
  { name: 'Finance & Fintech', icon: '📈' },
  { name: 'Real Estate', icon: '🏢' },
  { name: 'Education & E-Learning', icon: '🎓' },
  { name: 'Logistics & Supply Chain', icon: '🚚' },
  { name: 'Manufacturing', icon: '🏭' },
];
