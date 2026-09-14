import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // 크롤링 필요 없는 경로 직접 추가
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
