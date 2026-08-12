import React, { useState } from 'react';
import { CMSStore } from '../../services/cmsStore';
import { BusinessOpportunity, InvestmentLevel, RiskLevel, BusinessModelType, MarketRegion } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { AdPlaceholder } from '../common/AdPlaceholder';
import {
  Lightbulb,
  Search,
  Filter,
  ChevronRight,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Building2,
  X,
  PlusCircle,
} from 'lucide-react';

interface OpportunitiesViewProps {
  onNavigate: (view: string, param?: string) => void;
  selectedRegion: MarketRegion;
  onOpenLeadModal: () => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  onNavigate,
  selectedRegion,
  onOpenLeadModal,
}) => {
  const allOpps = CMSStore.getOpportunities();
  const settings = CMSStore.getSettings();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvestment, setSelectedInvestment] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');

  const filtered = allOpps.filter(opp => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        opp.name.toLowerCase().includes(q) ||
        opp.category.toLowerCase().includes(q) ||
        opp.industry.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedInvestment !== 'all' && opp.investmentLevel !== selectedInvestment) return false;
    if (selectedModel !== 'all' && opp.businessModel !== selectedModel) return false;
    if (selectedRisk !== 'all' && opp.riskLevel !== selectedRisk) return false;
    if (selectedCategory !== 'all' && opp.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (selectedRegionFilter !== 'all' && opp.region !== selectedRegionFilter) return false;
    return true;
  });

  const categoriesList = Array.from(new Set(allOpps.map(o => o.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="Searchable Business Opportunity Directory | Business Opportunity Hub"
        description="Filter vetted business ideas in Pakistan, UAE & GCC by investment level, profit margins, machinery requirements, and risk factor."
      />

      <Breadcrumbs items={[{ label: 'Business Ideas Directory', active: true }]} onHomeClick={() => onNavigate('home')} />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Lightbulb className="w-3.5 h-3.5" /> Searched & Vetted Directories
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
            Searchable Business Opportunity Directory
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Explore research-backed business concepts across manufacturing, assembly, trading, and services. Filter by capital budget, expected profit margin, and machinery requirements.
          </p>
        </div>

        <button
          onClick={onOpenLeadModal}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" /> Submit Custom Idea
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search business name, industry (e.g. motors, spices, solar, packaging)..."
            className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Investment Level</label>
            <select
              value={selectedInvestment}
              onChange={e => setSelectedInvestment(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Capital Levels</option>
              <option value="low">Low (&lt; 500k PKR)</option>
              <option value="medium">Medium (500k-5M PKR)</option>
              <option value="high">High (5M+ PKR)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Model</label>
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Models</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="trading">Trading & Wholesale</option>
              <option value="service">Service Businesses</option>
              <option value="online">Online / E-commerce</option>
              <option value="import-export">Import & Export</option>
              <option value="home-based">Home-Based</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Risk Rating</label>
            <select
              value={selectedRisk}
              onChange={e => setSelectedRisk(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Categories</option>
              {categoriesList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Market Region</label>
            <select
              value={selectedRegionFilter}
              onChange={e => setSelectedRegionFilter(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Regions</option>
              <option value="pakistan">Pakistan 🇵🇰</option>
              <option value="gcc">GCC Region 🇸🇦🇦🇪</option>
              <option value="international">International 🌍</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-500">
            Showing <strong className="text-slate-900">{filtered.length}</strong> business opportunities
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-serif font-bold text-slate-800">No Opportunities Match Your Criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try resetting your filters or search keywords to explore all opportunities in our directory.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedInvestment('all');
                setSelectedModel('all');
                setSelectedRisk('all');
                setSelectedCategory('all');
                setSelectedRegionFilter('all');
              }}
              className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(opp => (
              <div
                key={opp.id}
                onClick={() => onNavigate('opportunity-detail', opp.slug)}
                className="bg-white border border-slate-200 hover:border-amber-500/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                      {opp.category}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {opp.demandIndicator}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {opp.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Investment Budget:</span>
                    <strong className="text-slate-900 font-semibold">
                      PKR {(opp.minCapitalPKR / 100000).toFixed(1)}L - {(opp.maxCapitalPKR / 100000).toFixed(1)}L
                    </strong>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Target Gross Margin:</span>
                    <strong className="text-emerald-700 font-semibold">~{opp.expectedProfitMarginPercent}%</strong>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Est. Payback Period:</span>
                    <strong className="text-slate-900 font-semibold">{opp.paybackPeriodMonths} Months</strong>
                  </div>

                  <div className="pt-2 text-xs font-semibold text-amber-700 group-hover:translate-x-1 transition-transform flex items-center justify-between">
                    <span>View Full Execution Blueprint</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdPlaceholder slot="before-related" enabled={settings.showAdSensePreview} />
    </div>
  );
};
