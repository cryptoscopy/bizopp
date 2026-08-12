// Lightweight URL Routing & Navigation Utility using HTML5 History API

export interface RouteMatch {
  view: string;
  param?: string;
}

export function getSiteUrl(): string {
  if (typeof window !== 'undefined') {
    // Check Vite environment variable or runtime window location
    const viteUrl = (import.meta as any).env?.VITE_SITE_URL;
    if (viteUrl) return viteUrl.replace(/\/$/, '');
    return window.location.origin;
  }
  return process.env.VITE_SITE_URL || process.env.APP_URL || 'https://businessopportunityhub.com';
}

export function parsePath(pathname: string): RouteMatch {
  const path = pathname.replace(/\/$/, '') || '/';

  if (path === '/' || path === '') {
    return { view: 'home' };
  }

  if (path === '/business-ideas') {
    return { view: 'opportunities' };
  }

  if (path.startsWith('/business-ideas/')) {
    const slug = path.replace('/business-ideas/', '');
    return { view: 'opportunity-detail', param: slug };
  }

  if (path === '/market-research') {
    return { view: 'market-research' };
  }

  if (path.startsWith('/market-research/')) {
    const slug = path.replace('/market-research/', '');
    return { view: 'market-report-detail', param: slug };
  }

  if (path === '/articles') {
    return { view: 'articles' };
  }

  if (path.startsWith('/articles/')) {
    const slug = path.replace('/articles/', '');
    return { view: 'article-detail', param: slug };
  }

  if (path.startsWith('/category/')) {
    const slug = path.replace('/category/', '');
    return { view: 'category', param: slug };
  }

  if (path === '/authors') {
    return { view: 'authors' };
  }

  if (path.startsWith('/authors/')) {
    const slug = path.replace('/authors/', '');
    return { view: 'author', param: slug };
  }

  if (path.startsWith('/city/')) {
    const slug = path.replace('/city/', '');
    return { view: 'city', param: slug };
  }

  if (path.startsWith('/investment/')) {
    const slug = path.replace('/investment/', '');
    return { view: 'investment', param: slug };
  }

  if (path === '/about') return { view: 'about' };
  if (path === '/editorial-policy') return { view: 'editorial-policy' };
  if (path === '/privacy-policy') return { view: 'privacy-policy' };
  if (path === '/terms') return { view: 'terms' };
  if (path === '/disclaimer') return { view: 'disclaimer' };
  if (path === '/contact') return { view: 'contact' };
  if (path === '/submit-opportunity') return { view: 'submit-opportunity' };
  if (path === '/sitemap') return { view: 'sitemap' };
  if (path === '/admin') return { view: 'admin' };

  return { view: '404' };
}

export const parseCurrentPath = parsePath;

export function getViewPath(view: string, param?: string): string {
  switch (view) {
    case 'home':
      return '/';
    case 'opportunities':
      return '/business-ideas/';
    case 'opportunity-detail':
      return param ? `/business-ideas/${param}` : '/business-ideas/';
    case 'market-research':
      return '/market-research/';
    case 'market-report-detail':
      return param ? `/market-research/${param}` : '/market-research/';
    case 'articles':
      return '/articles/';
    case 'article-detail':
      return param ? `/articles/${param}` : '/articles/';
    case 'category':
      return param ? `/category/${param}` : '/articles/';
    case 'authors':
      return '/authors/';
    case 'author':
      return param ? `/authors/${param}` : '/authors/';
    case 'city':
      return param ? `/city/${param}` : '/business-ideas/';
    case 'investment':
      return param ? `/investment/${param}` : '/business-ideas/';
    case 'about':
      return '/about/';
    case 'editorial-policy':
      return '/editorial-policy/';
    case 'privacy-policy':
      return '/privacy-policy/';
    case 'terms':
      return '/terms/';
    case 'disclaimer':
      return '/disclaimer/';
    case 'contact':
      return '/contact/';
    case 'submit-opportunity':
      return '/submit-opportunity/';
    case 'sitemap':
      return '/sitemap/';
    case 'admin':
      return '/admin/';
    default:
      return '/';
  }
}

export function navigateTo(view: string, param?: string) {
  const targetPath = getViewPath(view, param);
  if (typeof window !== 'undefined') {
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view, param }, '', targetPath);
      window.dispatchEvent(new Event('popstate'));
    }
  }
}
