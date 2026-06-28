import { Metadata } from 'next';

const BASE_URL = 'https://elsxglobal.com';

export const defaultOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ELSxGlobal',
  alternateName: 'EvolucentSphere Global',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Premier enterprise technology partner delivering custom software, AI/ML solutions, cloud infrastructure, ERP/CRM implementation, and digital transformation across India and globally.',
  foundingDate: '2020-01-01',
  parentOrganization: {
    '@type': 'Organization',
    name: 'EvolucentSphere Pvt. Ltd.',
  },
  founder: {
    '@type': 'Person',
    name: 'Shashank Patel',
    jobTitle: 'Business Transformation Architect',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-22-XXXX-XXXX',
      contactType: 'sales',
      areaServed: 'India',
      availableLanguage: ['English', 'Hindi'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-80-XXXX-XXXX',
      contactType: 'technical support',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://linkedin.com/company/elsxglobal',
    'https://twitter.com/elsxglobal',
    'https://facebook.com/elsxglobal',
    'https://instagram.com/elsxglobal',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Business District, Mumbai',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU', 'CA'],
  industry: 'Software Development',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: '150' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Enterprise Technology Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development', url: `${BASE_URL}/software/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development', url: `${BASE_URL}/website-development/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Machine Learning Solutions', url: `${BASE_URL}/ai-solutions/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Infrastructure & Migration', url: `${BASE_URL}/cloud/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP & CRM Implementation', url: `${BASE_URL}/erp-crm/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersecurity Solutions', url: `${BASE_URL}/cybersecurity/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing', url: `${BASE_URL}/digital-marketing/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Process Outsourcing', url: `${BASE_URL}/bpo-kpo/` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Managed Hosting - VaultHost', url: `${BASE_URL}/vaulthost/` } },
    ],
  },
};

export interface SEOPageConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  modifiedAt?: string;
  author?: string;
  breadcrumb?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  serviceSchema?: {
    name: string;
    description: string;
    provider?: string;
    areaServed?: string;
    category?: string;
  };
  articleSchema?: {
    headline: string;
    image: string;
    publishedAt: string;
    modifiedAt?: string;
    author: string;
    category: string;
    tags?: string[];
  };
  localBusiness?: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode?: string;
    phone: string;
    latitude?: string;
    longitude?: string;
  };
}

export function createMetadata(config: SEOPageConfig): Metadata {
  const ogTitle = config.ogTitle || config.title;
  const ogDesc = config.ogDescription || config.description;

  return {
    metadataBase: new URL(BASE_URL),
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: config.author || 'ELSxGlobal', url: BASE_URL }],
    creator: 'ELSxGlobal',
    publisher: 'ELSxGlobal',
    alternates: {
      canonical: config.canonical,
      languages: {
        'en-US': config.canonical,
        'en-IN': config.canonical,
      },
    },
    openGraph: {
      type: config.type || 'website',
      locale: 'en_US',
      url: config.canonical,
      siteName: 'ELSxGlobal',
      title: ogTitle,
      description: ogDesc,
      images: [
        {
          url: config.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      ...(config.publishedAt && {
        publishedTime: config.publishedAt,
        modifiedTime: config.modifiedAt,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDesc,
      images: [config.ogImage || '/og-image.png'],
      creator: '@elsxglobal',
      site: '@elsxglobal',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: 'technology',
    classification: 'Enterprise Technology Solutions',
    other: {
      'og:phone_number': '+91-22-XXXX-XXXX',
      'og:street-address': 'Business District, Mumbai',
      'og:locality': 'Mumbai',
      'og:region': 'Maharashtra',
      'og:postal-code': '400001',
      'og:country-name': 'India',
      'business:contact_data:street_address': 'Business District, Mumbai',
      'business:contact_data:locality': 'Mumbai',
      'business:contact_data:region': 'Maharashtra',
      'business:contact_data:country_name': 'India',
      'business:contact_data:phone_number': '+91-22-XXXX-XXXX',
      'business:contact_data:email': 'info@elsxglobal.com',
    },
    ...(config.type === 'article' && {
      verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification',
        yahoo: 'your-yahoo-verification',
        other: {
          me: ['info@elsxglobal.com'],
        },
      },
    }),
  };
}

export function createSchemaMarkup(config: SEOPageConfig): string[] {
  const schemas: unknown[] = [defaultOrganization];

  // Breadcrumb
  if (config.breadcrumb) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  // FAQ
  if (config.faq) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faq.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    });
  }

  // Service
  if (config.serviceSchema) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: config.serviceSchema.name,
      description: config.serviceSchema.description,
      provider: {
        '@type': 'Organization',
        name: config.serviceSchema.provider || 'ELSxGlobal',
        url: BASE_URL,
      },
      ...(config.serviceSchema.areaServed && {
        areaServed: {
          '@type': 'Place',
          name: config.serviceSchema.areaServed,
        },
      }),
      ...(config.serviceSchema.category && {
        category: config.serviceSchema.category,
      }),
    });
  }

  // Article
  if (config.articleSchema) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: config.articleSchema.headline,
      image: [`${BASE_URL}${config.articleSchema.image}`],
      datePublished: config.articleSchema.publishedAt,
      dateModified: config.articleSchema.modifiedAt || config.articleSchema.publishedAt,
      author: {
        '@type': 'Person',
        name: config.articleSchema.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'ELSxGlobal',
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
        },
      },
      articleSection: config.articleSchema.category,
      keywords: config.articleSchema.tags?.join(', '),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': config.canonical,
      },
    });
  }

  // Local Business
  if (config.localBusiness) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: config.localBusiness.name,
      image: `${BASE_URL}/logo.png`,
      telephone: config.localBusiness.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: config.localBusiness.address,
        addressLocality: config.localBusiness.city,
        addressRegion: config.localBusiness.state,
        addressCountry: 'IN',
        ...(config.localBusiness.postalCode && { postalCode: config.localBusiness.postalCode }),
      },
      ...(config.localBusiness.latitude && config.localBusiness.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: config.localBusiness.latitude,
          longitude: config.localBusiness.longitude,
        },
      }),
      url: config.canonical,
      parentOrganization: {
        '@type': 'Organization',
        name: 'ELSxGlobal',
        url: BASE_URL,
      },
    });
  }

  return schemas.map((s) => JSON.stringify(s));
}

// Site-wide service definitions
export const services = {
  software: {
    name: 'Custom Software Development',
    description: 'Enterprise-grade custom software solutions built with modern technologies. Web applications, mobile apps, API development, and enterprise systems for Indian businesses.',
    keywords: ['custom software development India', 'enterprise software development Mumbai', 'web application development', 'mobile app development India', 'API development services', 'enterprise software solutions', 'software development company Bangalore'],
    path: '/software',
  },
  website: {
    name: 'Website Development',
    description: 'High-performance, SEO-optimized websites and e-commerce platforms. Corporate websites, online stores, and web applications built with Next.js and React.',
    keywords: ['website development company India', 'e-commerce development Mumbai', 'corporate website development', 'WordPress development India', 'Next.js development', 'web design company Bangalore', 'e-commerce website development'],
    path: '/website-development',
  },
  ai: {
    name: 'AI & Machine Learning Solutions',
    description: 'Enterprise AI and machine learning solutions. Predictive analytics, NLP, computer vision, and custom AI models for business intelligence.',
    keywords: ['AI solutions India', 'machine learning services', 'predictive analytics', 'NLP services India', 'computer vision solutions', 'AI consulting Mumbai', 'business intelligence AI'],
    path: '/ai-solutions',
  },
  cloud: {
    name: 'Cloud Infrastructure & Migration',
    description: 'Enterprise cloud architecture, migration, and management. AWS, Azure, and GCP solutions with DevOps, CI/CD, and infrastructure as code.',
    keywords: ['cloud migration services India', 'AWS consulting Mumbai', 'Azure migration services', 'DevOps consulting India', 'infrastructure as code', 'cloud architecture services', 'GCP consulting'],
    path: '/cloud',
  },
  erp: {
    name: 'ERP & CRM Implementation',
    description: 'Enterprise ERP and CRM implementation with Odoo, Salesforce, and custom solutions. Business process automation and digital transformation.',
    keywords: ['ERP implementation India', 'Odoo implementation Mumbai', 'CRM implementation services', 'Salesforce consulting India', 'business process automation', 'digital transformation ERP'],
    path: '/erp-crm',
  },
  cybersecurity: {
    name: 'Cybersecurity Solutions',
    description: 'Enterprise cybersecurity, compliance, and risk management. Security audits, penetration testing, SOC services, and compliance consulting.',
    keywords: ['cybersecurity services India', 'penetration testing Mumbai', 'security audit services', 'compliance consulting India', 'SOC services', 'cybersecurity consulting Bangalore'],
    path: '/cybersecurity',
  },
  digitalMarketing: {
    name: 'Digital Marketing Services',
    description: 'Results-driven digital marketing. SEO, PPC, social media, content marketing, and performance marketing for Indian businesses.',
    keywords: ['digital marketing agency India', 'SEO services Mumbai', 'PPC management India', 'social media marketing', 'content marketing services', 'performance marketing', 'search engine optimization'],
    path: '/digital-marketing',
  },
  bpo: {
    name: 'Business Process Outsourcing',
    description: 'KPO and BPO services for Indian and global enterprises. Data processing, customer support, research, and back-office operations.',
    keywords: ['BPO services India', 'KPO services Mumbai', 'business process outsourcing', 'data processing services', 'customer support outsourcing', 'back office operations India'],
    path: '/bpo-kpo',
  },
  vaulthost: {
    name: 'VaultHost - Managed Hosting',
    description: 'Enterprise-grade managed hosting and cloud infrastructure. Dedicated servers, VPS, cloud hosting, and managed WordPress hosting.',
    keywords: ['managed hosting India', 'cloud hosting Mumbai', 'dedicated server hosting', 'VPS hosting India', 'managed WordPress hosting', 'enterprise hosting solutions'],
    path: '/vaulthost',
  },
};

// Industry definitions
export const industries = {
  manufacturing: {
    name: 'Manufacturing',
    description: 'Digital transformation solutions for manufacturing companies. Smart factory, Industry 4.0, ERP integration, and supply chain optimization.',
    keywords: ['manufacturing ERP India', 'smart factory solutions', 'Industry 4.0 India', 'manufacturing software', 'supply chain optimization', 'MRP software India'],
    path: '/industries/manufacturing',
  },
  healthcare: {
    name: 'Healthcare',
    description: 'Healthcare technology solutions for hospitals, clinics, and pharmaceutical companies. EMR, practice management, and telemedicine platforms.',
    keywords: ['healthcare software India', 'EMR software Mumbai', 'hospital management system', 'telemedicine platform India', 'pharmaceutical software', 'healthcare IT solutions'],
    path: '/industries/healthcare',
  },
  finance: {
    name: 'Financial Services',
    description: 'Fintech and banking technology solutions. Core banking, payment processing, risk management, and regulatory compliance software.',
    keywords: ['fintech software India', 'banking software solutions', 'payment processing', 'risk management software', 'financial services technology', 'regulatory compliance software'],
    path: '/industries/financial-services',
  },
  retail: {
    name: 'Retail & E-commerce',
    description: 'Retail technology solutions. Omnichannel commerce, POS systems, inventory management, and customer engagement platforms.',
    keywords: ['retail software India', 'e-commerce platform development', 'POS system India', 'inventory management software', 'omnichannel commerce', 'retail technology solutions'],
    path: '/industries/retail',
  },
  logistics: {
    name: 'Logistics & Transportation',
    description: 'Logistics and supply chain technology. Fleet management, route optimization, warehouse management, and freight tracking systems.',
    keywords: ['logistics software India', 'fleet management system', 'warehouse management software', 'route optimization', 'freight tracking', 'supply chain technology'],
    path: '/industries/logistics',
  },
  realEstate: {
    name: 'Real Estate',
    description: 'Real estate technology solutions. Property management, CRM for builders, lead management, and real estate marketing platforms.',
    keywords: ['real estate software India', 'property management system', 'real estate CRM', 'lead management real estate', 'builder software India', 'real estate marketing'],
    path: '/industries/real-estate',
  },
  education: {
    name: 'Education',
    description: 'EdTech solutions for schools, colleges, and training institutes. Learning management systems, student portals, and assessment platforms.',
    keywords: ['EdTech solutions India', 'LMS software', 'school management system', 'student portal development', 'online learning platform', 'education technology India'],
    path: '/industries/education',
  },
};

// Location definitions
export const locations = {
  mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    description: 'Software development and technology solutions company in Mumbai, Maharashtra. Custom software, ERP, cloud, and AI services for Mumbai enterprises.',
    keywords: ['software development company Mumbai', 'IT company Mumbai', 'software company Maharashtra', 'Mumbai tech solutions', 'Mumbai IT services', 'Mumbai software development'],
    path: '/locations/mumbai',
  },
  delhi: {
    name: 'Delhi',
    state: 'Delhi',
    description: 'Enterprise technology solutions in Delhi NCR. Custom software, ERP, cloud, and AI services for Delhi-based enterprises.',
    keywords: ['software development company Delhi', 'IT company Delhi NCR', 'software company Delhi', 'Delhi tech solutions', 'Delhi IT services', 'Noida software development'],
    path: '/locations/delhi',
  },
  bangalore: {
    name: 'Bangalore',
    state: 'Karnataka',
    description: 'AI and software development company in Bangalore, Karnataka. Machine learning, cloud, and enterprise software solutions for Bangalore tech companies.',
    keywords: ['software development company Bangalore', 'AI company Bangalore', 'IT company Bangalore', 'Bangalore tech solutions', 'Karnataka software development', 'Bangalore cloud services'],
    path: '/locations/bangalore',
  },
  chennai: {
    name: 'Chennai',
    state: 'Tamil Nadu',
    description: 'Enterprise technology solutions in Chennai, Tamil Nadu. Custom software, ERP, and cloud services for Chennai manufacturing and IT companies.',
    keywords: ['software development company Chennai', 'IT company Chennai', 'software company Tamil Nadu', 'Chennai tech solutions', 'Chennai IT services', 'Chennai ERP solutions'],
    path: '/locations/chennai',
  },
  hyderabad: {
    name: 'Hyderabad',
    state: 'Telangana',
    description: 'Software development and AI solutions company in Hyderabad, Telangana. Enterprise technology solutions for Hyderabad IT and pharmaceutical companies.',
    keywords: ['software development company Hyderabad', 'IT company Hyderabad', 'software company Telangana', 'Hyderabad tech solutions', 'Hyderabad IT services', 'Hyderabad AI solutions'],
    path: '/locations/hyderabad',
  },
  pune: {
    name: 'Pune',
    state: 'Maharashtra',
    description: 'Enterprise technology solutions in Pune, Maharashtra. Custom software, ERP, and manufacturing solutions for Pune automotive and IT companies.',
    keywords: ['software development company Pune', 'IT company Pune', 'software company Pune', 'Pune tech solutions', 'Pune IT services', 'Pune manufacturing software'],
    path: '/locations/pune',
  },
  ahmedabad: {
    name: 'Ahmedabad',
    state: 'Gujarat',
    description: 'Software development and IT solutions company in Ahmedabad, Gujarat. Enterprise technology solutions for Ahmedabad manufacturing and trading companies.',
    keywords: ['software development company Ahmedabad', 'IT company Ahmedabad', 'software company Gujarat', 'Ahmedabad tech solutions', 'Ahmedabad IT services', 'Gujarat software development'],
    path: '/locations/ahmedabad',
  },
  kolkata: {
    name: 'Kolkata',
    state: 'West Bengal',
    description: 'Enterprise technology solutions in Kolkata, West Bengal. Custom software, ERP, and IT services for Kolkata enterprises and government organizations.',
    keywords: ['software development company Kolkata', 'IT company Kolkata', 'software company West Bengal', 'Kolkata tech solutions', 'Kolkata IT services', 'Kolkata ERP solutions'],
    path: '/locations/kolkata',
  },
  dubai: {
    name: 'Dubai',
    state: 'UAE',
    description: 'Enterprise technology solutions in Dubai, UAE. Custom software, ERP, and cloud services for Dubai-based enterprises and free zone companies.',
    keywords: ['software development company Dubai', 'IT company Dubai', 'ERP solutions UAE', 'Dubai tech solutions', 'UAE IT services', 'Dubai cloud services'],
    path: '/locations/dubai',
  },
  singapore: {
    name: 'Singapore',
    state: 'Singapore',
    description: 'Enterprise technology solutions in Singapore. Custom software, fintech, and cloud solutions for Singapore financial and technology companies.',
    keywords: ['software development company Singapore', 'IT company Singapore', 'fintech solutions Singapore', 'Singapore tech solutions', 'Singapore IT services', 'Singapore cloud services'],
    path: '/locations/singapore',
  },
  london: {
    name: 'London',
    state: 'UK',
    description: 'Enterprise technology solutions in London, UK. Custom software, fintech, and compliance solutions for UK financial and technology companies.',
    keywords: ['software development company London', 'IT company London', 'fintech solutions UK', 'London tech solutions', 'UK IT services', 'London cloud services'],
    path: '/locations/london',
  },
  newyork: {
    name: 'New York',
    state: 'USA',
    description: 'Enterprise technology solutions in New York, USA. Custom software, fintech, and AI solutions for NYC enterprises and startups.',
    keywords: ['software development company New York', 'IT company NYC', 'fintech solutions USA', 'New York tech solutions', 'USA IT services', 'NYC cloud services'],
    path: '/locations/new-york',
  },
  sydney: {
    name: 'Sydney',
    state: 'Australia',
    description: 'Enterprise technology solutions in Sydney, Australia. Custom software, cloud, and digital transformation for Australian enterprises.',
    keywords: ['software development company Sydney', 'IT company Sydney', 'cloud solutions Australia', 'Sydney tech solutions', 'Australia IT services', 'Sydney digital transformation'],
    path: '/locations/sydney',
  },
  toronto: {
    name: 'Toronto',
    state: 'Canada',
    description: 'Enterprise technology solutions in Toronto, Canada. Custom software, AI, and fintech solutions for Canadian enterprises.',
    keywords: ['software development company Toronto', 'IT company Toronto', 'fintech solutions Canada', 'Toronto tech solutions', 'Canada IT services', 'Toronto AI solutions'],
    path: '/locations/toronto',
  },
};
