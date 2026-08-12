import React from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { NotFoundView } from './NotFoundView';
import {
  Lightbulb,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldAlert,
  Wrench,
  Users,
  Target,
  CheckCircle2,
  Building2,
  FileText,
  ArrowRight,
  Share2,
} from 'lucide-react';

interface OpportunityDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenLeadModal: () => void;
}

export const OpportunityDetailView: React.FC<OpportunityDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const opps = CMSStore.getOpportunities();
  const opp = opps.find(o => o.slug === slug);
  const settings = CMSStore.getSettings();

  if (!opp) {
    return <NotFoundView onNavigate={onNavigate} />;
  }

  const relatedReport = opp.relatedReportId
    ? CMSStore.getMarketReports().find(r => r.id === opp.relatedReportId)
    : null;

  const relatedArticle = opp.relatedArticleSlug
    ? CMSStore.getArticles().find(a => a.slug === opp.relatedArticleSlug)
    : null;

  const totalEquipmentCost = opp.equipmentNeeded.reduce((acc, eq) => acc + eq.approxCostPKR, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title={`${opp.name} Feasibility & Machinery Guide`}
        description={`Detailed feasibility report for starting ${opp.name}. Investment budget PKR ${(opp.minCapitalPKR / 100000).toFixed(1)}L - ${(opp.maxCapitalPKR / 100000).toFixed(1)}L, required equipment list, profit margins, and step-by-step setup plan.`}
        ogType="article"
      />

      <Breadcrumbs
        items={[
          { label: 'Business Ideas', onClick: () => onNavigate('opportunities') },
          { label: opp.category, onClick: () => onNavigate('category', opp.category.toLowerCase()) },
          { label: opp.name, active: true },
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {opp.category}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            {opp.demandIndicator}
          </span>
          <span className="text-xs text-slate-400">
            Market: <strong className="text-slate-200">{opp.locationName}</strong>
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 leading-tight">
          {opp.name}
        </h1>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
          {opp.description}
        </p>

        {/* Quick Metrics Bar */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Est. Capital Required</span>
            <span className="text-base sm:text-lg font-bold text-amber-400 mt-1 block">
              PKR {(opp.minCapitalPKR / 100000).toFixed(1)}L - {(opp.maxCapitalPKR / 100000).toFixed(1)}L
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Gross Profit Margin</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400 mt-1 block">
              ~{opp.expectedProfitMarginPercent}%
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Payback Period</span>
            <span className="text-base sm:text-lg font-bold text-slate-100 mt-1 block">
              {opp.paybackPeriodMonths} Months
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-center">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Risk & Scalability</span>
            <span className="text-xs sm:text-sm font-bold text-slate-200 mt-1 block">
              {opp.riskLevel.toUpperCase()} Risk • {opp.scalability}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Primary Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Parameters Table */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-600" />
              Core Business Profile & Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block font-medium text-[11px]">Business Model</span>
                <span className="font-bold text-slate-900 uppercase mt-0.5 block">{opp.businessModel}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block font-medium text-[11px]">Target Customer Base</span>
                <span className="font-semibold text-slate-900 mt-0.5 block">{opp.targetCustomer}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block font-medium text-[11px]">Competition Level</span>
                <span className="font-bold text-slate-900 uppercase mt-0.5 block">{opp.competitionLevel} Competition</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block font-medium text-[11px]">Setup Complexity</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{opp.complexity} Technical Complexity</span>
              </div>
            </div>

            {/* Required Skills Chips */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Required Core Skills & Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {opp.requiredSkills.map((sk, idx) => (
                  <span key={idx} className="text-xs bg-amber-50 text-amber-900 border border-amber-200 font-medium px-3 py-1 rounded-full">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Machinery & Equipment Cost Breakdown Table */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" />
                Equipment & Machinery Cost Breakdown
              </h3>
              <span className="text-xs text-slate-500">2026 Price Estimates</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm text-left text-slate-700">
                <thead className="text-[11px] uppercase tracking-wider bg-slate-100 text-slate-800 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Equipment / Machine Item</th>
                    <th className="py-3 px-4 font-bold">Approx. Cost (PKR)</th>
                    <th className="py-3 px-4 font-bold">Sourcing Market / Vendor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {opp.equipmentNeeded.map((eq, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">{eq.item}</td>
                      <td className="py-3 px-4 font-bold text-amber-800">PKR {eq.approxCostPKR.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-600">{eq.source}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold text-slate-900">
                    <td className="py-3 px-4">Est. Total Fixed Equipment Outlay</td>
                    <td className="py-3 px-4 text-amber-900 text-sm">PKR {totalEquipmentCost.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-500 font-normal text-xs">Excludes working capital stock</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step-by-Step Execution Plan */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Step-by-Step Setup & Execution Plan
            </h3>

            <div className="space-y-4">
              {opp.executionSteps.map(st => (
                <div key={st.stepNumber} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {st.stepNumber}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-slate-900">{st.title}</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">{st.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Potential Sales Channels */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
              Potential Sales Channels & Distribution Strategy
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-700">
              {opp.salesChannels.map((ch, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Lead Gen Banner Inside Detail */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-serif font-bold text-slate-100">Need Supplier Connections for This Venture?</h4>
              <p className="text-xs text-slate-400 mt-1">Connect with verified machinery dealers, raw material importers, or custom market analysts.</p>
            </div>
            <button
              onClick={onOpenLeadModal}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg whitespace-nowrap flex-shrink-0"
            >
              Connect with Suppliers →
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Related Market Research Report Widget */}
          {relatedReport && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                Related Market Intelligence
              </span>
              <h4 className="font-serif font-bold text-base text-slate-100">{relatedReport.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{relatedReport.summary}</p>

              <button
                onClick={() => onNavigate('market-report-detail', relatedReport.slug)}
                className="w-full mt-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Read Full Market Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Related Article Guide Widget */}
          {relatedArticle && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Related Guide</span>
              <h4 className="font-serif font-bold text-base text-slate-900">{relatedArticle.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{relatedArticle.excerpt}</p>

              <button
                onClick={() => onNavigate('article-detail', relatedArticle.slug)}
                className="w-full mt-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Ad Placement */}
          <AdPlaceholder slot="sidebar" enabled={settings.showAdSensePreview} />
        </div>
      </div>
    </div>
  );
};
