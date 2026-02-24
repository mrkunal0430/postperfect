export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES = [
  {
    id: 'web-app-development',
    slug: 'web-app-development',
    number: '01',
    name: 'Website & App Development',
    tagline: 'End-to-end digital solutions that scale with your business.',
    shortDesc:
      'We build blazing-fast websites, web applications, and mobile apps for every industry — from e-commerce stores to enterprise ERP systems.',
    fullDescription:
      'Your digital presence is your most powerful business asset. We architect, design, and develop high-performance websites, web applications, and native/cross-platform mobile apps that command attention and drive measurable results. Whether you need an e-commerce platform, a SaaS product, a healthcare portal, a fintech application, or a custom ERP system — our full-stack team delivers end-to-end solutions built for real-world scale. Every line of code is purposeful — optimized for speed, accessibility, security, and long-term growth.',
    color: '#3B82F6',
    icon: 'web',
    industries: [
      {
        name: 'E-Commerce & Retail',
        icon: '🛍️',
        desc: 'Custom online stores, marketplaces, inventory management, payment integrations, and omnichannel solutions that convert browsers into buyers.',
        techStack: ['Shopify', 'WooCommerce', 'React', 'Node.js', 'Stripe'],
      },
      {
        name: 'SaaS & Technology',
        icon: '💻',
        desc: 'Scalable SaaS platforms, dashboards, APIs, and cloud-native applications built with modern architecture and subscription billing.',
        techStack: ['React', 'Next.js', 'AWS', 'PostgreSQL', 'TypeScript'],
      },
      {
        name: 'Healthcare & MedTech',
        icon: '🏥',
        desc: 'HIPAA-compliant patient portals, telemedicine apps, electronic health records (EHR), and medical device interfaces.',
        techStack: ['React', 'Node.js', 'FHIR APIs', 'AWS', 'Flutter'],
      },
      {
        name: 'Finance & Fintech',
        icon: '📈',
        desc: 'Secure banking apps, payment gateways, trading platforms, and financial dashboards with real-time data processing.',
        techStack: ['React', 'Python', 'PostgreSQL', 'AWS', 'Blockchain'],
      },
      {
        name: 'ERP Solutions',
        icon: '⚙️',
        desc: 'Custom ERP systems, Odoo/SAP implementations, business process automation, and enterprise resource planning tailored to your workflows.',
        techStack: ['Odoo', 'SAP', 'Python', 'React', 'PostgreSQL'],
      },
      {
        name: 'Real Estate',
        icon: '🏢',
        desc: 'Property listing platforms, virtual tour integrations, CRM systems, and lead management solutions for real estate businesses.',
        techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Three.js'],
      },
      {
        name: 'Education & E-Learning',
        icon: '🎓',
        desc: 'Learning management systems (LMS), online course platforms, virtual classrooms, and student management portals.',
        techStack: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'AWS'],
      },
      {
        name: 'Logistics & Supply Chain',
        icon: '🚚',
        desc: 'Fleet tracking apps, warehouse management systems, route optimization, and supply chain visibility platforms.',
        techStack: ['React', 'Flutter', 'Node.js', 'PostgreSQL', 'Google Maps'],
      },
      {
        name: 'Manufacturing',
        icon: '🏭',
        desc: 'Production planning systems, IoT dashboards, quality control apps, and inventory management for manufacturers.',
        techStack: ['React', 'Python', 'IoT', 'PostgreSQL', 'Docker'],
      },
    ],
    offerings: [
      'Custom Websites & Landing Pages',
      'E-Commerce Platforms',
      'Progressive Web Apps (PWA)',
      'iOS & Android Mobile Apps',
      'Cross-Platform Apps (Flutter, React Native)',
      'SaaS Product Development',
      'ERP Implementation & Customization',
      'API Development & Integration',
      'Cloud Architecture & DevOps',
      'UI/UX Design & Prototyping',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Flutter', 'React Native', 'Python', 'AWS', 'PostgreSQL', 'MongoDB', 'Docker', 'TypeScript', 'Shopify'],
    portfolio: [
      {
        title: 'UrbanMart E-Commerce',
        category: 'E-Commerce & Retail',
        desc: 'Full-stack e-commerce platform with real-time inventory, AI recommendations, and multi-currency checkout.',
        image: null,
        metrics: ['3x conversion increase', '98 PageSpeed score', '50k+ daily users'],
        color: '#3B82F6',
      },
      {
        title: 'MedConnect Telehealth',
        category: 'Healthcare & MedTech',
        desc: 'HIPAA-compliant telemedicine platform with video consultations, e-prescriptions, and EHR integration.',
        image: null,
        metrics: ['200+ doctors onboarded', '50k+ consultations', '99.9% uptime'],
        color: '#10B981',
      },
      {
        title: 'FinTrack Pro Dashboard',
        category: 'Finance & Fintech',
        desc: 'Real-time financial analytics dashboard with portfolio tracking, risk assessment, and automated reporting.',
        image: null,
        metrics: ['$2M+ assets tracked', '4.9 App Store rating', 'Real-time data'],
        color: '#F59E0B',
      },
      {
        title: 'LogiFlow Supply Chain',
        category: 'Logistics & Supply Chain',
        desc: 'End-to-end supply chain management with GPS tracking, route optimization, and warehouse automation.',
        image: null,
        metrics: ['40% cost reduction', '200+ fleets managed', 'Live tracking'],
        color: '#8B5CF6',
      },
      {
        title: 'EduVerse LMS',
        category: 'Education & E-Learning',
        desc: 'Modern learning management system with live classes, progress analytics, and gamified learning paths.',
        image: null,
        metrics: ['100k+ students', '500+ courses', '4.8 rating'],
        color: '#EC4899',
      },
      {
        title: 'BuildCore ERP',
        category: 'ERP Solutions',
        desc: 'Custom ERP system for a manufacturing company integrating HR, inventory, procurement, and finance.',
        image: null,
        metrics: ['60% less manual work', '3x faster reporting', '99.9% uptime'],
        color: '#06B6D4',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Strategy',
        desc: 'We dive deep into your business goals, user needs, and competitive landscape to define the right approach.',
      },
      {
        step: '02',
        title: 'Design & Prototyping',
        desc: 'Pixel-perfect wireframes and interactive prototypes ensuring every interaction is intuitive and on-brand.',
      },
      {
        step: '03',
        title: 'Development & Integration',
        desc: 'Clean, documented code integrating CMS, payment systems, APIs, and third-party tools seamlessly.',
      },
      {
        step: '04',
        title: 'Testing & Launch',
        desc: 'Rigorous QA across all devices. We don\'t launch until every metric is green.',
      },
    ],
    benefits: [
      {
        title: 'Lightning Fast',
        desc: 'Sub-2-second load times with advanced caching and CDN that Google rewards with top rankings.',
      },
      {
        title: 'Industry-Specific Solutions',
        desc: 'Deep expertise across 9+ industries means we understand your domain challenges and user expectations.',
      },
      {
        title: 'Full-Stack Capability',
        desc: 'From native mobile apps to enterprise web platforms and ERP systems — one team, zero handoff friction.',
      },
      {
        title: 'Future-Proof Architecture',
        desc: 'Scalable, maintainable code that grows with your business. Adding features months later is effortless.',
      },
    ],
    metrics: [
      { value: '150+', label: 'Projects Delivered' },
      { value: '98+', label: 'PageSpeed Score' },
      { value: '9+', label: 'Industries Served' },
      { value: '100%', label: 'Client Satisfaction' },
    ],
    faq: [
      {
        q: 'What types of websites and apps do you build?',
        a: 'Everything from simple marketing websites to complex SaaS platforms, e-commerce stores, mobile apps, and enterprise ERP systems. We work across all major industries including healthcare, fintech, education, logistics, and more.',
      },
      {
        q: 'How long does a project take?',
        a: 'A marketing website takes 4–6 weeks. A web app or mobile app takes 8–16 weeks. Complex ERP implementations take 3–6 months. We\'ll give you a precise timeline after discovery.',
      },
      {
        q: 'Do you build both websites and mobile apps?',
        a: 'Yes. We build responsive websites, progressive web apps, native iOS/Android apps, and cross-platform apps using Flutter and React Native — all under one roof.',
      },
      {
        q: 'Do you provide ongoing support after launch?',
        a: 'Yes. We offer monthly maintenance packages covering security updates, performance monitoring, feature additions, and priority support.',
      },
    ],
    relatedServices: ['video-editing-animation', 'branding', 'marketing'],
  },
  {
    id: 'video-editing-animation',
    slug: 'video-editing-animation',
    number: '02',
    name: 'Video Editing & Animation',
    tagline: 'Visual storytelling that captivates and converts.',
    shortDesc:
      'From cinematic brand films to 3D animations, motion graphics, and social reels — we produce content that leaves a lasting impression.',
    fullDescription:
      'In the attention economy, video is the currency of impact. Our video production and animation team combines cinematic storytelling with strategic intent. We specialize in every type of video content — motion graphics that explain complex ideas in seconds, 3D animations that bring products to life, 2D character animations that tell compelling stories, and professional video editing that turns raw footage into polished masterpieces. Every cut, transition, and sound cue is deliberate and purposeful.',
    color: '#EC4899',
    icon: 'video',
    subServices: [
      {
        name: 'Motion Graphics',
        icon: '✨',
        desc: 'Kinetic typography, animated infographics, logo reveals, and data visualizations that make complex ideas instantly clear.',
      },
      {
        name: '3D Animation',
        icon: '🎬',
        desc: 'Product visualizations, architectural walkthroughs, character animations, and immersive 3D environments.',
      },
      {
        name: '2D Animation',
        icon: '🎨',
        desc: 'Explainer videos, character animations, whiteboard animations, and illustrated narratives for brands.',
      },
      {
        name: 'Video Editing',
        icon: '🎞️',
        desc: 'Corporate films, social reels, YouTube content, wedding films, and documentary-style edits with professional color grading.',
      },
      {
        name: 'VFX & Compositing',
        icon: '💫',
        desc: 'Green screen compositing, visual effects, particle simulations, and advanced post-production techniques.',
      },
      {
        name: 'Sound Design',
        icon: '🎵',
        desc: 'Professional audio mixing, sound effects, voiceover integration, and custom music production.',
      },
    ],
    offerings: [
      'Motion Graphics & Kinetic Typography',
      '3D Product Visualization & Animation',
      '2D Explainer & Character Animation',
      'Corporate & Brand Films',
      'Social Media Reels & Short-Form Content',
      'VFX & Compositing',
      'Color Grading & Color Correction',
      'Sound Design & Audio Mixing',
      'YouTube & Long-Form Content Editing',
      'Wedding & Event Films',
    ],
    techStack: ['Adobe Premiere Pro', 'After Effects', 'Cinema 4D', 'Blender', 'DaVinci Resolve', 'Adobe Audition', 'Nuke', 'Maya'],
    portfolio: [
      {
        title: 'TechVault Product Launch',
        category: 'Motion Graphics',
        desc: '60-second product launch video with kinetic typography, 3D product renders, and dynamic transitions.',
        image: null,
        metrics: ['2.5M+ views', '12% CTR', 'Featured on Product Hunt'],
        color: '#EC4899',
      },
      {
        title: 'ArchVista 3D Walkthrough',
        category: '3D Animation',
        desc: 'Photorealistic 3D architectural walkthrough for a luxury real estate developer.',
        image: null,
        metrics: ['8 properties sold', '4K resolution', 'VR compatible'],
        color: '#8B5CF6',
      },
      {
        title: 'HealthFirst Explainer',
        category: '2D Animation',
        desc: 'Animated explainer video for a healthcare startup, simplifying complex medical processes.',
        image: null,
        metrics: ['500k+ views', '45% signup increase', 'Award winning'],
        color: '#10B981',
      },
      {
        title: 'Horizon Brand Film',
        category: 'Video Editing',
        desc: 'Cinematic brand film with professional color grading, custom sound design, and storytelling.',
        image: null,
        metrics: ['1M+ views', '89% watch time', 'Festival selected'],
        color: '#F59E0B',
      },
      {
        title: 'NexGen Social Campaign',
        category: 'Motion Graphics',
        desc: 'Series of 30 animated social media reels optimized for Instagram, TikTok, and YouTube Shorts.',
        image: null,
        metrics: ['10M+ impressions', '8% avg engagement', '30 videos/month'],
        color: '#3B82F6',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Brief & Creative Direction',
        desc: 'We nail down your message, audience, tone, and distribution channels — then build a creative brief.',
      },
      {
        step: '02',
        title: 'Scripting & Storyboarding',
        desc: 'Scripts and shot-by-shot storyboards crafted before a single frame is created.',
      },
      {
        step: '03',
        title: 'Production & Animation',
        desc: 'Expert editing, motion graphics, 3D/2D animation, color grading, and sound design.',
      },
      {
        step: '04',
        title: 'Delivery & Distribution',
        desc: 'Export in every format — 4K masters, web versions, social-optimized cuts — on time and on brand.',
      },
    ],
    benefits: [
      {
        title: 'Every Style Covered',
        desc: 'Motion graphics, 3D, 2D, live-action editing, VFX — whatever your vision, we have the expertise.',
      },
      {
        title: 'Higher Engagement',
        desc: 'Video content generates 12x more shares. Our work consistently outperforms industry benchmarks.',
      },
      {
        title: 'Platform-Optimized',
        desc: 'Different formats for different platforms. Your brand film, Instagram reel, and TikTok all look native.',
      },
      {
        title: 'Fast Turnaround',
        desc: 'Streamlined pipeline delivers professional results fast — without sacrificing quality.',
      },
    ],
    metrics: [
      { value: '500+', label: 'Videos Produced' },
      { value: '12x', label: 'More Shares vs Text' },
      { value: '4K', label: 'Maximum Resolution' },
      { value: '48hr', label: 'Rush Available' },
    ],
    faq: [
      {
        q: 'What types of video and animation do you offer?',
        a: 'Everything — motion graphics, 3D product animation, 2D explainers, corporate films, social reels, VFX, color grading, and sound design. We cover the full spectrum.',
      },
      {
        q: 'Do you handle filming or only editing?',
        a: 'Both. We can work with your footage for editing-only projects, or manage the entire production from scripting to final delivery.',
      },
      {
        q: 'How many revision rounds are included?',
        a: 'Standard packages include 3 rounds of revisions. We find this gives freedom to refine without endless back-and-forth.',
      },
      {
        q: 'What formats do you deliver?',
        a: 'H.264/H.265 for web, ProRes for broadcast, optimized versions for Instagram, YouTube, TikTok, LinkedIn, and more.',
      },
    ],
    relatedServices: ['web-app-development', 'branding', 'social-media-management'],
  },
  {
    id: 'branding',
    slug: 'branding',
    number: '03',
    name: 'Branding',
    tagline: 'Build an identity that stands out and stays remembered.',
    shortDesc:
      'We craft distinctive brand identities — from logos and visual systems to brand strategy and guidelines — that build trust and recognition.',
    fullDescription:
      'Your brand is more than a logo — it\'s the entire perception people have of your business. We build brands from the ground up, creating cohesive identities that resonate with your target audience and differentiate you from competitors. Our branding process combines strategic thinking with world-class design to deliver visual systems that work across every touchpoint — digital, print, and beyond. The result is a brand that commands attention, earns trust, and creates lasting recognition.',
    color: '#F59E0B',
    icon: 'branding',
    offerings: [
      'Brand Strategy & Positioning',
      'Logo Design & Visual Identity',
      'Brand Guidelines & Style Guides',
      'Color Palette & Typography Systems',
      'Business Card & Stationery Design',
      'Packaging Design',
      'Brand Messaging & Voice',
      'Social Media Brand Kits',
      'Presentation Templates',
      'Brand Audit & Refresh',
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Adobe XD', 'Canva Pro'],
    portfolio: [
      {
        title: 'NovaTech Rebrand',
        category: 'Full Brand Identity',
        desc: 'Complete brand overhaul for a tech startup — logo, color system, typography, and 80+ page brand guidelines.',
        image: null,
        metrics: ['200% brand recall increase', '15+ brand touchpoints', 'Award nominated'],
        color: '#F59E0B',
      },
      {
        title: 'GreenLeaf Organics',
        category: 'Packaging & Identity',
        desc: 'Eco-friendly packaging design and visual identity for an organic food brand.',
        image: null,
        metrics: ['35% shelf-impact increase', '12 SKU packaging', 'Sustainable materials'],
        color: '#10B981',
      },
      {
        title: 'Apex Finance',
        category: 'Corporate Branding',
        desc: 'Premium corporate identity for a financial advisory firm — communicating trust, expertise, and authority.',
        image: null,
        metrics: ['3x client inquiries', 'Full brand system', 'Print & digital'],
        color: '#3B82F6',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Brand Discovery',
        desc: 'Deep-dive into your market, competitors, audience, values, and vision to define your brand positioning.',
      },
      {
        step: '02',
        title: 'Concept Development',
        desc: 'Multiple creative directions explored — mood boards, logo concepts, and visual explorations.',
      },
      {
        step: '03',
        title: 'Design & Refinement',
        desc: 'Selected direction refined to pixel-perfection across all applications and touchpoints.',
      },
      {
        step: '04',
        title: 'Brand Delivery',
        desc: 'Complete brand guidelines, asset library, and templates delivered — ready for your team to use.',
      },
    ],
    benefits: [
      {
        title: 'Strategic Foundation',
        desc: 'Every design decision is backed by strategy. Your brand looks great AND communicates the right message.',
      },
      {
        title: 'Complete Brand System',
        desc: 'Logo, colors, fonts, patterns, templates — everything your team needs to stay on-brand consistently.',
      },
      {
        title: 'Timeless Design',
        desc: 'We design brands that age well — classic enough to endure, modern enough to impress today.',
      },
      {
        title: 'Cross-Platform Ready',
        desc: 'Your brand works beautifully across digital, print, signage, merchandise, and every other medium.',
      },
    ],
    metrics: [
      { value: '100+', label: 'Brands Created' },
      { value: '200%', label: 'Avg. Brand Recall Increase' },
      { value: '50+', label: 'Industries Served' },
      { value: '95%', label: 'Client Satisfaction' },
    ],
    faq: [
      {
        q: 'What\'s included in a branding package?',
        a: 'Our standard package includes brand strategy, logo design (primary + variations), color palette, typography system, brand guidelines document, and social media brand kit. Custom packages available.',
      },
      {
        q: 'How long does branding take?',
        a: 'A complete brand identity takes 4–8 weeks. Logo-only projects take 2–3 weeks. We work in stages so you see progress throughout.',
      },
      {
        q: 'Can you rebrand our existing brand?',
        a: 'Absolutely. We offer brand audits and refreshes — from subtle modernizations to complete overhauls. We\'ll preserve what works and evolve what doesn\'t.',
      },
      {
        q: 'Do you design packaging?',
        a: 'Yes. Packaging design is one of our specialties. We design for print production and work with your manufacturers to ensure quality output.',
      },
    ],
    relatedServices: ['web-app-development', 'marketing', 'social-media-management'],
  },
  {
    id: 'marketing',
    slug: 'marketing',
    number: '04',
    name: 'Marketing',
    tagline: 'Data-driven growth strategies that deliver real ROI.',
    shortDesc:
      'We craft full-funnel marketing strategies — SEO, PPC, content marketing, and email campaigns — that attract, convert, and retain customers.',
    fullDescription:
      'Marketing without data is just expense. Marketing with data — and the creativity to act on it — is growth. We build full-funnel digital marketing strategies that attract the right audience, convert them into customers, and turn customers into advocates. Our approach combines rigorous data analysis with compelling creative to drive campaigns that consistently outperform industry benchmarks. We don\'t just run ads — we build growth engines that compound over time.',
    color: '#10B981',
    icon: 'marketing',
    offerings: [
      'SEO — Technical, On-Page & Off-Page',
      'Content Marketing & Strategy',
      'Google Ads & PPC Campaigns',
      'Meta, LinkedIn & TikTok Advertising',
      'Email Marketing & Automation',
      'Conversion Rate Optimization (CRO)',
      'Marketing Analytics & Reporting',
      'Influencer Marketing',
      'Affiliate Marketing Setup',
      'Lead Generation Campaigns',
    ],
    techStack: ['Google Analytics 4', 'Google Ads', 'Meta Business Suite', 'SEMrush', 'HubSpot', 'Mailchimp', 'Hotjar', 'Ahrefs'],
    portfolio: [
      {
        title: 'EcomBrand D2C Growth',
        category: 'PPC & SEO',
        desc: 'Full-funnel marketing strategy for a D2C brand — 4.2x ROAS on Google Ads and 65% organic traffic growth.',
        image: null,
        metrics: ['4.2x ROAS', '65% SEO traffic increase', '$1.2M revenue generated'],
        color: '#10B981',
      },
      {
        title: 'SaaS Lead Engine',
        category: 'Content & Email',
        desc: 'B2B content marketing and email automation that generated 2,000+ qualified leads in 6 months.',
        image: null,
        metrics: ['2,000+ leads', '35% email open rate', '12% conversion rate'],
        color: '#3B82F6',
      },
      {
        title: 'Retail Chain SEO',
        category: 'Local SEO',
        desc: 'Multi-location local SEO strategy for a retail chain — dominating Google Maps and organic results.',
        image: null,
        metrics: ['300% organic increase', '50 locations optimized', 'Top 3 rankings'],
        color: '#F59E0B',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Audit & Research',
        desc: 'We audit your current presence, analyze competitors, and identify the highest-leverage opportunities.',
      },
      {
        step: '02',
        title: 'Strategy & Planning',
        desc: 'Bespoke marketing strategy with clear KPIs, channel mix, budget allocation, and milestones.',
      },
      {
        step: '03',
        title: 'Execution & Optimization',
        desc: 'Campaigns launched and continuously optimized — A/B testing, creative refresh, audience refinement.',
      },
      {
        step: '04',
        title: 'Reporting & Scaling',
        desc: 'Transparent monthly reports with clear attribution. What works gets more budget; what doesn\'t gets fixed.',
      },
    ],
    benefits: [
      {
        title: 'Measurable ROI',
        desc: 'Every campaign tied to revenue. We track CPA, LTV, and ROAS — not just vanity metrics.',
      },
      {
        title: 'Omnichannel Reach',
        desc: 'Your audience exists across multiple channels. We orchestrate a coordinated presence everywhere.',
      },
      {
        title: 'Compounding Growth',
        desc: 'SEO and content investments compound over time. We balance quick wins with long-term organic strategies.',
      },
      {
        title: 'Creative + Analytical',
        desc: 'Rare combination of data-driven strategy and compelling creative. We nail both — every time.',
      },
    ],
    metrics: [
      { value: '4.2x', label: 'Avg. ROAS Achieved' },
      { value: '65%', label: 'Avg. SEO Traffic Increase' },
      { value: '2.8x', label: 'Lead Volume Increase' },
      { value: '30-Day', label: 'Time to First Results' },
    ],
    faq: [
      {
        q: 'How long before I see results?',
        a: 'Paid ads can show results within 2–4 weeks. SEO typically shows improvement in 3–6 months. We\'ll set realistic expectations based on your situation.',
      },
      {
        q: 'What\'s the minimum marketing budget?',
        a: 'We work with ad spends starting from $2,000/month. Our management fee is separate. We\'ll recommend the minimum effective budget for your goals.',
      },
      {
        q: 'Do you create the ad creatives?',
        a: 'Yes. Our in-house creative team handles ad copy, images, and video ads. We A/B test continuously to find top performers.',
      },
      {
        q: 'How do you report on performance?',
        a: 'Live dashboard with real-time data, plus detailed monthly reports with insights, wins, learnings, and the plan forward.',
      },
    ],
    relatedServices: ['web-app-development', 'social-media-management', 'branding'],
  },
  {
    id: 'social-media-management',
    slug: 'social-media-management',
    number: '05',
    name: 'Social Media Management',
    tagline: 'Build a community that sells for you.',
    shortDesc:
      'We manage your social media presence end-to-end — content creation, scheduling, engagement, analytics, and community building.',
    fullDescription:
      'Social media isn\'t just posting — it\'s building a community, creating conversations, and turning followers into customers. We manage your entire social media presence with strategic content calendars, professional content creation, real-time community management, and data-driven growth strategies. From Instagram and LinkedIn to TikTok and YouTube — we ensure your brand shows up consistently, authentically, and with impact across every platform that matters.',
    color: '#8B5CF6',
    icon: 'social',
    offerings: [
      'Social Media Strategy & Calendar',
      'Content Creation (Graphics, Reels, Stories)',
      'Community Management & Engagement',
      'Social Media Advertising',
      'Influencer Partnerships',
      'Analytics & Performance Reporting',
      'Platform-Specific Content Optimization',
      'Hashtag Strategy & Trend Monitoring',
      'Crisis Management & Reputation Monitoring',
      'Social Commerce Setup',
    ],
    techStack: ['Buffer', 'Hootsuite', 'Canva Pro', 'Adobe Creative Suite', 'Later', 'Sprout Social', 'Meta Business Suite'],
    portfolio: [
      {
        title: 'FashionNova Growth',
        category: 'Instagram & TikTok',
        desc: 'Grew a fashion brand from 5k to 150k followers in 8 months with strategic content and influencer partnerships.',
        image: null,
        metrics: ['150k followers', '8% engagement rate', '30x ROI on ads'],
        color: '#8B5CF6',
      },
      {
        title: 'TechCorp LinkedIn',
        category: 'LinkedIn Strategy',
        desc: 'B2B LinkedIn strategy for a tech company — thought leadership content that generated 500+ qualified leads.',
        image: null,
        metrics: ['500+ leads', '10x profile views', '45% connection rate'],
        color: '#3B82F6',
      },
      {
        title: 'FoodZone Community',
        category: 'Multi-Platform',
        desc: 'Multi-platform social management for a restaurant chain — content, engagement, and local ads.',
        image: null,
        metrics: ['200% engagement increase', '15 locations', '50k community'],
        color: '#F59E0B',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Audit & Strategy',
        desc: 'We analyze your current social presence, competitors, and audience to build a winning strategy.',
      },
      {
        step: '02',
        title: 'Content Planning',
        desc: 'Monthly content calendars with a mix of educational, entertaining, and promotional content aligned to your goals.',
      },
      {
        step: '03',
        title: 'Creation & Publishing',
        desc: 'Professional graphics, videos, and copy created and published at optimal times for maximum reach.',
      },
      {
        step: '04',
        title: 'Engage & Grow',
        desc: 'Active community management, audience interaction, and continuous A/B testing to accelerate growth.',
      },
    ],
    benefits: [
      {
        title: 'Consistent Brand Voice',
        desc: 'Your brand shows up professionally every day — with a cohesive voice and visual identity across all platforms.',
      },
      {
        title: 'Active Community',
        desc: 'We don\'t just post — we build engaged communities that organically advocate for your brand.',
      },
      {
        title: 'Data-Driven Content',
        desc: 'Every post is informed by analytics. We continuously optimize based on what performs and what resonates.',
      },
      {
        title: 'Save Time & Resources',
        desc: 'Your team focuses on core business while we handle the daily grind of content creation and engagement.',
      },
    ],
    metrics: [
      { value: '300%', label: 'Avg. Engagement Increase' },
      { value: '50+', label: 'Brands Managed' },
      { value: '5M+', label: 'Monthly Reach' },
      { value: '24/7', label: 'Community Monitoring' },
    ],
    faq: [
      {
        q: 'Which platforms do you manage?',
        a: 'We manage Instagram, Facebook, LinkedIn, TikTok, Twitter/X, YouTube, Pinterest, and more. We\'ll recommend the right platforms based on your audience and goals.',
      },
      {
        q: 'How many posts per week?',
        a: 'Our standard packages include 15–25 posts per month across platforms. We customize the volume based on your goals and budget.',
      },
      {
        q: 'Do you respond to comments and DMs?',
        a: 'Yes. Active community management is core to our service. We respond to comments, DMs, and engage with your audience in your brand voice.',
      },
      {
        q: 'Can you run paid social ads too?',
        a: 'Absolutely. We handle organic social management and paid social advertising under one strategy for maximum impact.',
      },
    ],
    relatedServices: ['video-editing-animation', 'branding', 'marketing'],
  },
];

export const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Global Clients' },
  { value: 5, suffix: '', label: 'Core Services' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

export const TESTIMONIALS = [
  {
    quote:
      'PostPerfect transformed our digital presence completely. The website they built doubled our conversion rate within two months.',
    author: 'Sarah Chen',
    company: 'NovaTech Solutions',
    role: 'CEO',
    service: 'web-app-development',
  },
  {
    quote:
      'Their video and animation work is exceptional. The 3D product visualization completely changed how our customers interact with our catalog.',
    author: 'Marcus Rivera',
    company: 'UrbanFlow',
    role: 'Product Director',
    service: 'video-editing-animation',
  },
  {
    quote:
      'The branding work PostPerfect did for us is incredible. Our brand recognition has doubled and clients now see us as premium.',
    author: 'Anika Patel',
    company: 'GlobalTrade Inc.',
    role: 'COO',
    service: 'branding',
  },
  {
    quote:
      'The marketing team at PostPerfect delivered a 4x ROAS on our Google campaigns within the first 60 days. Incredible results.',
    author: 'James Wu',
    company: 'Elevate Commerce',
    role: 'Growth Lead',
    service: 'marketing',
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
  'Odoo', 'SAP', 'Shopify', 'WordPress',
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
    desc: 'Web, apps, video, branding, marketing, and social media — no juggling multiple agencies. One team, one vision.',
  },
  {
    title: 'Senior-Led Delivery',
    desc: 'You won\'t be handed to juniors after signing. Your project is led by senior specialists who\'ve solved these problems.',
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
    desc: 'International-quality output with the responsiveness of a boutique agency. Best of both worlds.',
  },
  {
    title: 'Long-Term Partners',
    desc: '80% of our clients stay with us beyond the first project. We\'re here for the long run.',
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
