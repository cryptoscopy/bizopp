import React, { useState } from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { getViewPath } from '../../utils/router';
import { MarketRegion } from '../../types';
import {
  BarChart3,
  Search,
  ChevronRight,
  TrendingUp,
  FileText,
  Calendar,
  Globe2,
  Filter,
} from 'lucide-react';

interface MarketResearchViewProps {
  onNavigate: (view: string, param?: string) => void;
  selectedRegion: MarketRegion;
  onOpenLeadModal: () => void;
}

export const MarketResearchView: React.FC<MarketResearchViewProps> = ({
  onNavigate,
  selectedRegion,
  onOpenLeadModal,
}) => {
  const reports = CMSStore.getMarketReports();
  const settings = CMSStore.getSettings();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [selectedDemand, setSelectedDemand] = useState<string>('all');

  const filtered = reports.filter(rep => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        rep.title.toLowerCase().includes(q) ||
        rep.category.toLowerCase().includes(q) ||
        rep.industry.toLowerCase().includes(q) ||
        rep.summary.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedRegionFilter !== 'all' && rep.region !== selectedRegionFilter) return false;
    if (selectedDemand !== 'all' && rep.demandLevel !== selectedDemand) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="Market Research Reports Database | Business Opportunity Hub"
        description="Comprehensive market intelligence reports with product demand metrics, pricing structures, customs tariff analysis, and 15-section strategic entry blueprints."
      />

      <Breadcrumbs items={[{ label: 'Market Research Database', active: true }]} onHomeClick={() => onNavigate('home')} />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <BarChart3 className="w-3.5 h-3.5" /> 15-Section Research Standards
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Market Intelligence & Trade Research Reports
        </h1>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Every report provides verified market size estimates, customs tariff breakdowns (HS Code level), supply chain vulnerability assessments, and structured 15-section entry strategies for entrepreneurs.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search reports by industry, product or trade corridor (e.g. motors, spices, solar)..."
            className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Market / Region</label>
            <select
              value={selectedRegionFilter}
              onChange={e => setSelectedRegionFilter(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">All Regions</option>
              <option value="pakistan">Pakistan 🇵🇰</option>
              <option value="gcc">GCC Region 🇸🇦🇦🇪</option>
              <option value="international">International 🌍</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Demand Level</label>
            <select
              value={selectedDemand}
              onChange={e => setSelectedDemand(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="all">All Demand Indicators</option>
              <option value="High">High Demand</option>
              <option value="Expanding">Expanding Market</option>
              <option value="Moderate">Moderate Demand</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Listing */}
      <div className="space-y-6">
        <p className="text-xs text-slate-500">
          Showing <strong className="text-slate-900">{filtered.length}</strong> market research reports
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(rep => (
            <a
              key={rep.id}
              href={getViewPath('market-report-detail', rep.slug)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('market-report-detail', rep.slug);
              }}
              className="bg-slate-900 text-white border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-800 text-amber-400">
                    {rep.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Score: {rep.finalVerdict.score}/10
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                  {rep.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {rep.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Market Valuation:</span>
                  <strong className="text-slate-200">{rep.marketSizePKR}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Demand Rating:</span>
                  <strong className="text-emerald-400">{rep.demandLevel}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="text-slate-300">{rep.lastUpdated}</span>
                </div>

                <div className="pt-2 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center justify-between">
                  <span>Read 15-Section Intelligence</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <AdPlaceholder slot="above-footer" enabled={settings.showAdSensePreview} />
    </div>
  );
};
