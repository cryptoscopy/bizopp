import React, { useState } from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { getViewPath } from '../../utils/router';
import { FileText, Search, Clock, ChevronRight, User, Tag } from 'lucide-react';

interface ArticlesViewProps {
  onNavigate: (view: string, param?: string) => void;
  selectedCategorySlug?: string;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ onNavigate, selectedCategorySlug }) => {
  const articles = CMSStore.getArticles();
  const settings = CMSStore.getSettings();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>(selectedCategorySlug || 'all');

  const filtered = articles.filter(art => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        art.title.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q)) ||
        art.excerpt.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeCategoryFilter !== 'all' && art.category.toLowerCase() !== activeCategoryFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="Editorial Analysis & Practical Business Guides | Business Opportunity Hub"
        description="Vetted business strategy guides, manufacturing cost calculators, export documentation tutorials, and trade intelligence for entrepreneurs."
      />

      <Breadcrumbs items={[{ label: 'Analysis & Guides', active: true }]} onHomeClick={() => onNavigate('home')} />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <FileText className="w-3.5 h-3.5" /> Practical Business Intelligence
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Editorial Analysis, Pillar Guides & Market Intelligence
        </h1>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Deep-dive guides on starting small factories, calculating gross margins, handling customs documentation, and finding international B2B buyers.
        </p>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, category or tags..."
            className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeCategoryFilter === 'all'
                ? 'bg-slate-900 text-amber-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Articles
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeCategoryFilter.toLowerCase() === cat.toLowerCase()
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <p className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> articles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(art => (
            <a
              key={art.id}
              href={getViewPath('article-detail', art.slug)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('article-detail', art.slug);
              }}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row group"
            >
              <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden">
                <img
                  src={art.featuredImage}
                  alt={art.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {art.isPillar && (
                  <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    Master Pillar Guide
                  </span>
                )}
              </div>

              <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{art.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readingTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base md:text-lg text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>By {art.author?.name || 'Editorial Team'}</span>
                  <span className="text-amber-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <AdPlaceholder slot="hero-below" enabled={settings.showAdSensePreview} />
    </div>
  );
};
