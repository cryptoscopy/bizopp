import React from 'react';
import { CITY_CLUSTERS, CityCluster } from '../../data/cityClusters';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { NotFoundView } from './NotFoundView';
import { getViewPath } from '../../utils/router';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Zap,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';

interface CityClusterViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenLeadModal: () => void;
}

export const CityClusterView: React.FC<CityClusterViewProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const cluster = CITY_CLUSTERS.find(c => c.slug === slug);

  if (!cluster) {
    return <NotFoundView onNavigate={onNavigate} />;
  }

  const allOpps = CMSStore.getOpportunities();
  const featuredOpps = allOpps.filter(o => cluster.featuredOpportunityIds.includes(o.id));
  const otherClusters = CITY_CLUSTERS.filter(c => c.slug !== slug);

  const citySchema = {
    '@context': 'https://schema.org',
    '@type': 'AdministrativeArea',
    'name': `${cluster.name} Industrial Cluster`,
    'description': cluster.description,
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': cluster.province,
      'addressCountry': 'PK'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title={cluster.seoTitle}
        description={cluster.metaDescription}
        canonicalPath={`/city/${cluster.slug}`}
        schemaJson={citySchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Industrial Clusters', onClick: () => onNavigate('opportunities') },
          { label: `${cluster.name} Cluster`, active: true },
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {cluster.province}, Pakistan
          </span>
          <span className="text-xs text-slate-400">
            Industrial Hub
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 leading-tight">
          {cluster.name} Industrial Cluster & Feasibilities
        </h1>

        <p className="text-sm md:text-base text-amber-300/90 font-serif font-medium">
          {cluster.tagline}
        </p>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {cluster.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Primary Industries */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              Primary Manufacturing & Industry Specializations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cluster.primaryIndustries.map((ind, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-slate-800">{ind}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Key Wholesale Markets & Infrastructure */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
                Key Wholesale Bazaars & Machinery Clusters
              </h2>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                {cluster.keyWholesaleMarkets.map((mkt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{mkt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                Power Grid & Industrial Infrastructure Note
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-amber-50/60 border border-amber-200 p-4 rounded-xl">
                {cluster.powerAndInfraNote}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
                Competitive Advantages of {cluster.name} Cluster
              </h2>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                {cluster.keyAdvantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Opportunities in this Cluster */}
          {featuredOpps.length > 0 && (
            <section className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-xl font-serif font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Key Business Feasibilities for {cluster.name}
              </h2>
              <div className="space-y-3">
                {featuredOpps.map(opp => (
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
                      <span>Est Capital: <strong className="text-amber-400">PKR {(opp.minCapitalPKR / 100000).toFixed(1)}L - {(opp.maxCapitalPKR / 100000).toFixed(1)}L</strong></span>
                      <span>Margin: <strong className="text-emerald-400">{opp.expectedProfitMarginPercent}%</strong></span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Lead Modal CTA */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-950">Looking for Machinery Suppliers in {cluster.name}?</h3>
              <p className="text-xs text-slate-900 mt-1">Connect with verified vendors, tooling workshops, and raw material dealers in {cluster.name}.</p>
            </div>
            <button
              onClick={onOpenLeadModal}
              className="px-6 py-3 bg-slate-950 text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-900 transition-colors whitespace-nowrap"
            >
              Request Supplier Contacts →
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-200 pb-2">
              Other Major Pakistani Clusters
            </h3>
            <div className="space-y-2">
              {otherClusters.map(c => (
                <a
                  key={c.id}
                  href={getViewPath('city', c.slug)}
                  onClick={(e) => { e.preventDefault(); onNavigate('city', c.slug); }}
                  className="block p-3 bg-slate-50 border border-slate-200 hover:border-amber-500/50 rounded-xl transition-all group"
                >
                  <h4 className="font-serif font-bold text-xs text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
                    {c.name} ({c.province})
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{c.tagline}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
