import React from 'react';
import { CMSStore } from '../../services/cmsStore';
import { MAIN_CATEGORIES } from '../../data/categories';
import { CITY_CLUSTERS } from '../../data/cityClusters';
import { INVESTMENT_TIERS } from '../../data/investmentTiers';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { getViewPath } from '../../utils/router';
import { Globe, ArrowRight, ExternalLink } from 'lucide-react';

interface SitemapViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({ onNavigate }) => {
  const articles = CMSStore.getArticles();
  const opportunities = CMSStore.getOpportunities();
  const reports = CMSStore.getMarketReports();

  const handleNav = (e: React.MouseEvent, view: string, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="XML Sitemap & Crawl Index | Business Opportunity Hub"
        description="Comprehensive index of all business opportunities, market research reports, Pakistani industrial city clusters, and investment tiers for search engine indexers."
        canonicalPath="/sitemap"
      />

      <Breadcrumbs items={[{ label: 'XML Sitemap & Index', active: true }]} onHomeClick={() => onNavigate('home')} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-slate-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            XML Sitemap Index
          </h1>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded flex items-center gap-1"
          >
            Raw XML Sitemap <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-xs text-slate-400">
          Visual index of all active canonical URLs on this publication for Google indexers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Section 1: Core Pages */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Primary Navigation Pages
          </h3>
          <ul className="space-y-1.5 text-slate-700 font-mono text-[11px]">
            <li><a href="/" onClick={(e) => handleNav(e, 'home')} className="hover:text-amber-700">/ (Homepage)</a></li>
            <li><a href="/business-ideas" onClick={(e) => handleNav(e, 'opportunities')} className="hover:text-amber-700">/business-ideas (Directory)</a></li>
            <li><a href="/market-research" onClick={(e) => handleNav(e, 'market-research')} className="hover:text-amber-700">/market-research (Database)</a></li>
            <li><a href="/articles" onClick={(e) => handleNav(e, 'articles')} className="hover:text-amber-700">/articles (Guides)</a></li>
            <li><a href="/about" onClick={(e) => handleNav(e, 'about')} className="hover:text-amber-700">/about</a></li>
            <li><a href="/editorial-policy" onClick={(e) => handleNav(e, 'editorial-policy')} className="hover:text-amber-700">/editorial-policy</a></li>
            <li><a href="/privacy-policy" onClick={(e) => handleNav(e, 'privacy-policy')} className="hover:text-amber-700">/privacy-policy</a></li>
            <li><a href="/terms" onClick={(e) => handleNav(e, 'terms')} className="hover:text-amber-700">/terms</a></li>
            <li><a href="/disclaimer" onClick={(e) => handleNav(e, 'disclaimer')} className="hover:text-amber-700">/disclaimer</a></li>
          </ul>
        </div>

        {/* Section 2: Pakistani Industrial City Clusters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Pakistani Industrial Clusters ({CITY_CLUSTERS.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700 font-mono text-[11px]">
            {CITY_CLUSTERS.map(c => (
              <li key={c.id}>
                <a href={getViewPath('city', c.slug)} onClick={(e) => handleNav(e, 'city', c.slug)} className="hover:text-amber-700">
                  /city/{c.slug} ({c.name})
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Investment Tiers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Capital Investment Ranges ({INVESTMENT_TIERS.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700 font-mono text-[11px]">
            {INVESTMENT_TIERS.map(t => (
              <li key={t.id}>
                <a href={getViewPath('investment', t.slug)} onClick={(e) => handleNav(e, 'investment', t.slug)} className="hover:text-amber-700">
                  /investment/{t.slug} ({t.pkLabel})
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Category Clusters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Category Clusters ({MAIN_CATEGORIES.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700 font-mono text-[11px]">
            {MAIN_CATEGORIES.map(c => (
              <li key={c.id}>
                <a href={getViewPath('category', c.slug)} onClick={(e) => handleNav(e, 'category', c.slug)} className="hover:text-amber-700">
                  /category/{c.slug}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5: Business Ideas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Business Opportunities ({opportunities.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700 font-mono text-[11px]">
            {opportunities.map(o => (
              <li key={o.id}>
                <a href={getViewPath('opportunity-detail', o.slug)} onClick={(e) => handleNav(e, 'opportunity-detail', o.slug)} className="hover:text-amber-700 truncate block max-w-xs">
                  /business-ideas/{o.slug}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 6: Market Reports */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Market Intelligence Reports ({reports.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700 font-mono text-[11px]">
            {reports.map(r => (
              <li key={r.id}>
                <a href={getViewPath('market-report-detail', r.slug)} onClick={(e) => handleNav(e, 'market-report-detail', r.slug)} className="hover:text-amber-700 truncate block max-w-xs">
                  /market-research/{r.slug}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

