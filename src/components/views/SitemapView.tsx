import React from 'react';
import { CMSStore } from '../../services/cmsStore';
import { MAIN_CATEGORIES } from '../../data/categories';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { Globe, ArrowRight } from 'lucide-react';

interface SitemapViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({ onNavigate }) => {
  const articles = CMSStore.getArticles();
  const opportunities = CMSStore.getOpportunities();
  const reports = CMSStore.getMarketReports();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="XML Sitemap & Crawl Index | Business Opportunity Hub"
        description="Comprehensive index of all business opportunities, market research reports, and pillar guides for search engines."
      />

      <Breadcrumbs items={[{ label: 'XML Sitemap & Index', active: true }]} onHomeClick={() => onNavigate('home')} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-2">
        <h1 className="text-2xl font-serif font-bold text-slate-100 flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-400" />
          XML Sitemap Index
        </h1>
        <p className="text-xs text-slate-400">
          Visual index of all canonical URLs active on this publication for Google indexers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Section 1: Core Pages */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Primary Navigation Pages
          </h3>
          <ul className="space-y-1.5 text-slate-700">
            <li><button onClick={() => onNavigate('home')} className="hover:text-amber-700">/ (Homepage)</button></li>
            <li><button onClick={() => onNavigate('opportunities')} className="hover:text-amber-700">/business-ideas (Directory)</button></li>
            <li><button onClick={() => onNavigate('market-research')} className="hover:text-amber-700">/market-research (Database)</button></li>
            <li><button onClick={() => onNavigate('articles')} className="hover:text-amber-700">/articles (Guides)</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-amber-700">/about</button></li>
            <li><button onClick={() => onNavigate('editorial-policy')} className="hover:text-amber-700">/editorial-policy</button></li>
            <li><button onClick={() => onNavigate('privacy-policy')} className="hover:text-amber-700">/privacy-policy</button></li>
            <li><button onClick={() => onNavigate('terms')} className="hover:text-amber-700">/terms</button></li>
            <li><button onClick={() => onNavigate('disclaimer')} className="hover:text-amber-700">/disclaimer</button></li>
          </ul>
        </div>

        {/* Section 2: Categories */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Category Clusters ({MAIN_CATEGORIES.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700">
            {MAIN_CATEGORIES.map(c => (
              <li key={c.id}>
                <button onClick={() => onNavigate('category', c.slug)} className="hover:text-amber-700">
                  /category/{c.slug}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Business Ideas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Business Opportunities ({opportunities.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700">
            {opportunities.map(o => (
              <li key={o.id}>
                <button onClick={() => onNavigate('opportunity-detail', o.slug)} className="hover:text-amber-700 truncate block max-w-xs">
                  /business-ideas/{o.slug}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Market Reports */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
            Market Intelligence Reports ({reports.length})
          </h3>
          <ul className="space-y-1.5 text-slate-700">
            {reports.map(r => (
              <li key={r.id}>
                <button onClick={() => onNavigate('market-report-detail', r.slug)} className="hover:text-amber-700 truncate block max-w-xs">
                  /market-research/{r.slug}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
