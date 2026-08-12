import React, { useState, useEffect } from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Search, X, Lightbulb, BarChart3, FileText, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const articles = CMSStore.getArticles();
  const opportunities = CMSStore.getOpportunities();
  const reports = CMSStore.getMarketReports();

  const q = query.trim().toLowerCase();

  const matchedOpps = q
    ? opportunities.filter(
        o =>
          o.name.toLowerCase().includes(q) ||
          o.category.toLowerCase().includes(q) ||
          o.industry.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q)
      )
    : opportunities.slice(0, 3);

  const matchedReports = q
    ? reports.filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.industry.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q)
      )
    : reports.slice(0, 3);

  const matchedArticles = q
    ? articles.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q)) ||
          a.excerpt.toLowerCase().includes(q)
      )
    : articles.slice(0, 3);

  const handleSelect = (view: string, param: string) => {
    onNavigate(view, param);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search business ideas, market research, machinery, export guides..."
            className="w-full bg-transparent text-slate-900 text-sm md:text-base focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Business Opportunities Section */}
          {matchedOpps.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Business Ideas Directory ({matchedOpps.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedOpps.map(opp => (
                  <button
                    key={opp.id}
                    onClick={() => handleSelect('opportunity-detail', opp.slug)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200 flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="font-semibold text-sm text-slate-900 group-hover:text-amber-700">
                        {opp.name}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {opp.category} • Investment: {opp.investmentLevel.toUpperCase()} • Margin: ~{opp.expectedProfitMarginPercent}%
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Market Reports Section */}
          {matchedReports.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                <span>Market Intelligence Reports ({matchedReports.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedReports.map(rep => (
                  <button
                    key={rep.id}
                    onClick={() => handleSelect('market-report-detail', rep.slug)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200 flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="font-semibold text-sm text-slate-900 group-hover:text-amber-700">
                        {rep.title}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {rep.category} • Score: {rep.finalVerdict.score}/10 • Updated: {rep.lastUpdated}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Articles & Pillar Guides ({matchedArticles.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedArticles.map(art => (
                  <button
                    key={art.id}
                    onClick={() => handleSelect('article-detail', art.slug)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200 flex items-center justify-between group"
                  >
                    <div>
                      <h5 className="font-semibold text-sm text-slate-900 group-hover:text-amber-700">
                        {art.title}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {art.category} • {art.readingTime}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {!q && (
            <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-400">
              Type keywords like <span className="text-slate-600 font-semibold">"motor"</span>, <span className="text-slate-600 font-semibold">"export"</span>, <span className="text-slate-600 font-semibold">"solar"</span>, or <span className="text-slate-600 font-semibold">"low investment"</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
