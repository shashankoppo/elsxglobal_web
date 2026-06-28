import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://elsxglobal.com';
  const routes = [
    '',
    '/about',
    '/services',
    '/ai-solutions',
    '/erp-crm',
    '/vaulthost',
    '/cloud',
    '/cybersecurity',
    '/software',
    '/bpo-kpo',
    '/digital-marketing',
    '/industries',
    '/case-studies',
    '/blog',
    '/careers',
    '/contact',
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
