import React from 'react';
import { SEOMeta } from '../common/SEOMeta';
import { Search, Home, Lightbulb, BarChart3, FileText, ArrowRight } from 'lucide-react';
import { getViewPath } from '../../utils/router';

interface NotFoundViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onNavigate('opportunities');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      <SEOMeta
        title="404 - Page Not Found"
        description="The requested page or business research report could not be found."
        noindex={true}
      />

      <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 text-amber-800 rounded-2xl border border-amber-200 font-serif font-bold text-3xl shadow-sm">
        404
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900">
          Page Not Found
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          The business opportunity, market research report, or article URL you requested does not exist or may have been relocated.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search business ideas, markets, HS codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold text-xs rounded-xl shadow transition-colors flex-shrink-0"
        >
          Search
        </button>
      </form>

      {/* Explore Major Sections */}
      <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
        <a
          href={getViewPath('opportunities')}
          onClick={(e) => { e.preventDefault(); onNavigate('opportunities'); }}
          className="p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-500/50 shadow-sm transition-all group block"
        >
          <Lightbulb className="w-5 h-5 text-amber-600 mb-2" />
          <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
            Business Ideas
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Feasibilities & Machinery</p>
        </a>

        <a
          href={getViewPath('market-research')}
          onClick={(e) => { e.preventDefault(); onNavigate('market-research'); }}
          className="p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-500/50 shadow-sm transition-all group block"
        >
          <BarChart3 className="w-5 h-5 text-amber-600 mb-2" />
          <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
            Market Research
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Market Sizes & Tariffs</p>
        </a>

        <a
          href={getViewPath('articles')}
          onClick={(e) => { e.preventDefault(); onNavigate('articles'); }}
          className="p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-500/50 shadow-sm transition-all group block"
        >
          <FileText className="w-5 h-5 text-amber-600 mb-2" />
          <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
            Articles & Guides
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">How-to & Cost Accounting</p>
        </a>
      </div>

      <div className="pt-4">
        <a
          href={getViewPath('home')}
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </a>
      </div>
    </div>
  );
};
