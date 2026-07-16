import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://elsxglobal.com';

  // Static routes
  const staticRoutes = [
    { url: `${base}/`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${base}/about/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/services/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/ai-solutions/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/erp-crm/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/shared/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/wordpress/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/vps/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/cloud/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/dedicated/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/email/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/website-builder/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/ssl/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/domains/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/addons/`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/compare/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/vaulthost/checkout/`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/vaulthost/kb/`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${base}/portal/`, priority: 0.7, changeFrequency: 'daily' as const },
    { url: `${base}/portal/login/`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/portal/signup/`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/portal/forgot-password/`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/portal/profile/`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/portal/notifications/`, priority: 0.5, changeFrequency: 'daily' as const },
    { url: `${base}/portal/service/`, priority: 0.5, changeFrequency: 'daily' as const },
    { url: `${base}/cloud/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/cybersecurity/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/software/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/bpo-kpo/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/digital-marketing/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/website-development/`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/industries/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/case-studies/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/blog/`, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${base}/careers/`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${base}/contact/`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/locations/`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/compare/`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/resources/`, priority: 0.7, changeFrequency: 'weekly' as const },
  ];

  // Dynamic routes from Supabase
  const supabase = createClient();

  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('is_published', true);

  const { data: locations } = await supabase
    .from('locations')
    .select('slug, updated_at')
    .eq('is_active', true);

  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('slug, updated_at')
    .eq('is_published', true);

  const articleRoutes = (articles || []).map((article) => ({
    url: `${base}/blog/${article.slug}/`,
    lastModified: new Date(article.updated_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const locationRoutes = (locations || []).map((location) => ({
    url: `${base}/locations/${location.slug}/`,
    lastModified: new Date(location.updated_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = (caseStudies || []).map((cs) => ({
    url: `${base}/case-studies/${cs.slug}/`,
    lastModified: new Date(cs.updated_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Industry routes
  const industrySlugs = [
    'manufacturing', 'healthcare', 'financial-services', 'retail',
    'logistics', 'real-estate', 'education', 'government',
  ];
  const industryRoutes = industrySlugs.map((slug) => ({
    url: `${base}/industries/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...locationRoutes,
    ...caseStudyRoutes,
    ...industryRoutes,
  ];
}
