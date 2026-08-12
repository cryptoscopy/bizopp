import React from 'react';
import { INVESTMENT_TIERS, InvestmentTier } from '../../data/investmentTiers';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { NotFoundView } from './NotFoundView';
import { getViewPath } from '../../utils/router';
import {
  DollarSign,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface InvestmentTierViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenLeadModal: () => void;
}

export const InvestmentTierView: React.FC<InvestmentTierViewProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const tier = INVESTMENT_TIERS.find(t => t.slug === slug);

  if (!tier) {
    return <NotFoundView onNavigate={onNavigate} />;
  }

  const allOpps = CMSStore.getOpportunities();
  // Filter opportunities matching this investment range
  const matchingOpps = allOpps.filter(o => {
    return o.minCapitalPKR <= tier.maxPKR && o.maxCapitalPKR >= tier.minPKR;
  });

  const otherTiers = INVESTMENT_TIERS.filter(t => t.slug !== slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title={tier.seoTitle}
        description={tier.metaDescription}
        canonicalPath={`/investment/${tier.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Investment Ranges', onClick: () => onNavigate('opportunities') },
          { label: tier.pkLabel, active: true },
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> {tier.pkLabel}
          </span>
          <span className="text-xs text-slate-400">
            {tier.usdEquivalent}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 leading-tight">
          {tier.title}
        </h1>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
          {tier.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Financial Advice */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              Financial & Capital Allocation Advice
            </h2>
            <div className="space-y-3">
              {tier.keyFinancialAdvice.map((adv, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-slate-800 leading-relaxed">{adv}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Suitable Business Models */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
              Suitable Business Archetypes for {tier.pkLabel}
            </h2>
            <ul className="space-y-2 text-xs md:text-sm text-slate-700">
              {tier.suitableModels.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Matching Feasibilities */}
          <section className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Published Feasibilities in This Capital Bracket ({matchingOpps.length})
            </h2>

            {matchingOpps.length > 0 ? (
              <div className="space-y-3">
                {matchingOpps.map(opp => (
                  <a
                    key={opp.id}
                    href={getViewPath('opportunity-detail', opp.slug)}
                    onClick={(e) => { e.preventDefault(); onNavigate('opportunity-detail', opp.slug); }}
                    className="block p-4 bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 rounded-xl transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-sm sm:text-base text-slate-100 group-hover:text-amber-300">
                        {opp.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {opp.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-300">
                      <span>Capital: <strong className="text-amber-400">PKR {(opp.minCapitalPKR / 100000).toFixed(1)}L - {(opp.maxCapitalPKR / 100000).toFixed(1)}L</strong></span>
                      <span>Margin: <strong className="text-emerald-400">~{opp.expectedProfitMarginPercent}%</strong></span>
                      <span>Payback: <strong className="text-slate-200">{opp.paybackPeriodMonths} Months</strong></span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-4">
                No published feasibilities match this exact filter currently. Contact our research desk for custom capital feasibility studies.
              </p>
            )}
          </section>

          {/* Lead Modal CTA */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-950">Have a Budget of {tier.pkLabel}?</h3>
              <p className="text-xs text-slate-900 mt-1">Get customized machinery price quotes and supplier connections for your exact capital outlay.</p>
            </div>
            <button
              onClick={onOpenLeadModal}
              className="px-6 py-3 bg-slate-950 text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-900 transition-colors whitespace-nowrap"
            >
              Get Custom Machinery Feasibility →
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-200 pb-2">
              Browse Other Investment Ranges
            </h3>
            <div className="space-y-2">
              {otherTiers.map(t => (
                <a
                  key={t.id}
                  href={getViewPath('investment', t.slug)}
                  onClick={(e) => { e.preventDefault(); onNavigate('investment', t.slug); }}
                  className="block p-3 bg-slate-50 border border-slate-200 hover:border-amber-500/50 rounded-xl transition-all group"
                >
                  <h4 className="font-serif font-bold text-xs text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
                    {t.pkLabel}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.usdEquivalent}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
