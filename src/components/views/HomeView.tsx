import React from 'react';
import { CMSStore } from '../../services/cmsStore';
import { MAIN_CATEGORIES } from '../../data/categories';
import { CITY_CLUSTERS } from '../../data/cityClusters';
import { INVESTMENT_TIERS } from '../../data/investmentTiers';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { AffiliateResources } from '../common/AffiliateResources';
import { NewsletterForm } from '../common/NewsletterForm';
import { SEOMeta } from '../common/SEOMeta';
import { MarketRegion } from '../../types';
import { getViewPath } from '../../utils/router';
import {
  Lightbulb,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Building2,
  CheckCircle2,
  ChevronRight,
  Briefcase,
  Layers,
  Award,
  MapPin,
  DollarSign,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  selectedRegion: MarketRegion;
  onOpenLeadModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, selectedRegion, onOpenLeadModal }) => {
  const articles = CMSStore.getArticles();
  const opportunities = CMSStore.getOpportunities();
  const reports = CMSStore.getMarketReports();
  const settings = CMSStore.getSettings();

  const featuredOpps = opportunities.filter(o => o.isFeatured || o.region === selectedRegion).slice(0, 4);
  const featuredReports = reports.filter(r => r.isFeatured || r.region === selectedRegion).slice(0, 3);
  const featuredArticles = articles.slice(0, 4);

  const handleNav = (e: React.MouseEvent, view: string, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
  };

  return (
    <div className="space-y-12 pb-12">
      <SEOMeta
        title="Business Ideas & Market Research for Entrepreneurs | Business Opportunity Hub"
        description="Discover practical business ideas, market research, manufacturing opportunities, export opportunities and actionable guides for entrepreneurs in Pakistan and emerging markets."
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white py-12 md:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Business Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Find Practical Business Opportunities <span className="text-amber-400">Before You Invest</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
              Research-based business ideas, market analysis and practical guides for entrepreneurs who want to make better business decisions in Pakistan & emerging markets.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={getViewPath('opportunities')}
                onClick={(e) => handleNav(e, 'opportunities')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Explore Business Ideas</span>
              </a>

              <a
                href={getViewPath('market-research')}
                onClick={(e) => handleNav(e, 'market-research')}
                className="border border-slate-600 hover:bg-slate-800 text-white px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>Browse Market Research</span>
              </a>
            </div>

            {/* Trust Metrics Pill */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Machinery Costs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Customs & Tariff Data</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual & Dynamic Stat Blocks */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
                <div className="text-amber-400 font-extrabold text-3xl">{opportunities.length}+</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Published Opportunities</div>
              </div>

              <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50">
                <div className="text-amber-400 font-extrabold text-3xl">{reports.length}+</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Market Research Reports</div>
              </div>
            </div>

            <div className="bg-[#0b1329] border border-slate-700/80 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <TrendingUp className="w-4 h-4" /> Market Feasibility Index
                </div>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">2026 Vetted</span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Electric Motor Rewinding</h5>
                    <p className="text-[11px] text-slate-400">Gujranwala Cluster</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">8.4 / 10 Score</span>
                    <p className="text-[10px] text-slate-400">22% Margin</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Organic Himalayan Salt Packaging</h5>
                    <p className="text-[11px] text-slate-400">GCC & EU Export</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">9.1 / 10 Score</span>
                    <p className="text-[10px] text-slate-400">32% Margin</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenLeadModal}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wide rounded-lg transition-colors text-center block"
              >
                Request Custom Feasibility Report →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement Below Hero */}
      <AdPlaceholder slot="hero-below" enabled={settings.showAdSensePreview} />

      {/* Pakistani Industrial Clusters Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pakistan-First Localized SEO Hubs</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Major Pakistani Industrial & Machinery Clusters</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITY_CLUSTERS.slice(0, 6).map(cluster => (
            <a
              key={cluster.id}
              href={getViewPath('city', cluster.slug)}
              onClick={(e) => handleNav(e, 'city', cluster.slug)}
              className="bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-800 p-5 rounded-2xl transition-all duration-200 group shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {cluster.province}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-semibold">Industrial Hub</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-slate-100 transition-colors">
                  {cluster.name} Cluster
                </h3>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 line-clamp-2">
                  {cluster.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 group-hover:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-700 group-hover:text-amber-400">
                <span>Explore {cluster.name} Feasibilities</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Investment Ranges Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Capital Outlay Directory
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-100">
                Browse Business Ideas by Investment Tier
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INVESTMENT_TIERS.map(tier => (
              <a
                key={tier.id}
                href={getViewPath('investment', tier.slug)}
                onClick={(e) => handleNav(e, 'investment', tier.slug)}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 p-5 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{tier.usdEquivalent}</span>
                  <h3 className="font-serif font-bold text-base text-slate-100 group-hover:text-amber-300 mt-1">
                    {tier.pkLabel}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {tier.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-xs font-semibold text-amber-400 flex items-center justify-between">
                  <span>View Ideas</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Topic Clusters</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Explore Primary Categories</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {MAIN_CATEGORIES.map(cat => (
            <a
              key={cat.id}
              href={getViewPath('category', cat.slug)}
              onClick={(e) => handleNav(e, 'category', cat.slug)}
              className="bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-800 p-4 rounded-xl text-left transition-all duration-200 group shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif font-bold text-sm group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 group-hover:text-slate-400 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>
              <div className="mt-3 text-[10px] font-semibold text-amber-700 group-hover:text-amber-400 flex items-center gap-1">
                <span>Browse Cluster</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Business Opportunities Directory */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-2">
                <Lightbulb className="w-3.5 h-3.5" /> Vetted Directories
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                Featured Business Opportunities
              </h2>
            </div>
            <a
              href={getViewPath('opportunities')}
              onClick={(e) => handleNav(e, 'opportunities')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider"
            >
              <span>View All Opportunities ({opportunities.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredOpps.map(opp => (
              <a
                key={opp.id}
                href={getViewPath('opportunity-detail', opp.slug)}
                onClick={(e) => handleNav(e, 'opportunity-detail', opp.slug)}
                className="bg-white border border-slate-200 hover:border-amber-500/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {opp.category}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      {opp.demandIndicator}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                    {opp.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Investment:</span>
                    <strong className="text-slate-900">PKR {(opp.minCapitalPKR / 100000).toFixed(1)}L - {(opp.maxCapitalPKR / 100000).toFixed(1)}L</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Est. Profit Margin:</span>
                    <strong className="text-emerald-700">~{opp.expectedProfitMarginPercent}%</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Payback:</span>
                    <strong className="text-slate-900">{opp.paybackPeriodMonths} Months</strong>
                  </div>

                  <div className="pt-1 text-[11px] font-semibold text-amber-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Read Full Feasibility</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Market Research Reports */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Market Intelligence</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
              15-Section Research Reports
            </h2>
          </div>
          <a
            href={getViewPath('market-research')}
            onClick={(e) => handleNav(e, 'market-research')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider"
          >
            <span>View All Reports ({reports.length})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReports.map(rep => (
            <a
              key={rep.id}
              href={getViewPath('market-report-detail', rep.slug)}
              onClick={(e) => handleNav(e, 'market-report-detail', rep.slug)}
              className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 shadow-lg cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-800 text-amber-400">
                    {rep.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Score: {rep.finalVerdict.score} / 10
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-100 group-hover:text-amber-300 transition-colors">
                  {rep.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {rep.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Market Size:</span>
                  <span className="text-slate-200 font-medium">{rep.marketSizePKR}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="text-slate-300">{rep.lastUpdated}</span>
                </div>
                <div className="pt-2 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Explore 15-Section Intelligence</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Recommended Resources (Affiliate Block) */}
      <section className="max-w-7xl mx-auto px-4">
        <AffiliateResources showDisclosure={settings.showAffiliateDisclosure} limit={3} />
      </section>

      {/* Latest Analysis & Pillar Guides */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Editorial Analysis</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
              Pillar Guides & Practical Articles
            </h2>
          </div>
          <a
            href={getViewPath('articles')}
            onClick={(e) => handleNav(e, 'articles')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider"
          >
            <span>View All Articles ({articles.length})</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArticles.map(art => (
            <a
              key={art.id}
              href={getViewPath('article-detail', art.slug)}
              onClick={(e) => handleNav(e, 'article-detail', art.slug)}
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
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-slate-700">{art.category}</span>
                    <span>•</span>
                    <span>{art.readingTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>By {art.author?.name || 'Editorial Team'}</span>
                  <span className="text-amber-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Lead Generation CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 text-white rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Building2 className="w-3.5 h-3.5" /> B2B Sourcing & Research Desk
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-100">
              Looking for Verified Suppliers, Foreign Buyers or Custom Feasibility?
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Connect with vetted machinery dealers in Gujranwala/Lahore, export buyers in UAE/Saudi Arabia, or submit your requirement to our analyst desk.
            </p>
          </div>

          <button
            onClick={onOpenLeadModal}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xl shadow-amber-500/20 whitespace-nowrap flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>Submit Business Inquiry</span>
          </button>
        </div>
      </section>

      {/* Newsletter Subscription Block */}
      <section className="max-w-7xl mx-auto px-4">
        <NewsletterForm />
      </section>
    </div>
  );
};
