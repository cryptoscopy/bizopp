import React from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { TableOfContents, TOCItem } from '../common/TableOfContents';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { NotFoundView } from './NotFoundView';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {
  BarChart3,
  Calendar,
  User,
  ShieldCheck,
  AlertTriangle,
  Award,
  HelpCircle,
  FileText,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface MarketReportDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenLeadModal: () => void;
}

const COLORS = ['#D97706', '#2563EB', '#10B981', '#6B7280', '#8B5CF6'];

export const MarketReportDetailView: React.FC<MarketReportDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const reports = CMSStore.getMarketReports();
  const rep = reports.find(r => r.slug === slug);
  const settings = CMSStore.getSettings();

  if (!rep) {
    return <NotFoundView onNavigate={onNavigate} />;
  }

  const author = rep.author || {
    name: 'Tariq Malik',
    title: 'Senior Industrial Research Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Tariq has over 14 years of hands-on experience evaluating small manufacturing units, machinery procurement, and cost-accounting.',
  };

  const tocItems: TOCItem[] = [
    { id: 'sec-1-executive-summary', text: '1. Executive Summary', level: 1 },
    { id: 'sec-2-market-overview', text: '2. Market Overview & Valuation', level: 1 },
    { id: 'sec-3-demand-analysis', text: '3. Demand Analysis & Trends', level: 1 },
    { id: 'sec-4-target-customers', text: '4. Target Customer Segments', level: 1 },
    { id: 'sec-5-competitor-landscape', text: '5. Competitor Landscape', level: 1 },
    { id: 'sec-6-pricing-structure', text: '6. Pricing & Margin Breakdown', level: 1 },
    { id: 'sec-7-distribution-channels', text: '7. Distribution Channels', level: 1 },
    { id: 'sec-8-supply-chain', text: '8. Supply Chain & Raw Materials', level: 1 },
    { id: 'sec-9-import-export', text: '9. Import/Export & Tariff Structure', level: 1 },
    { id: 'sec-10-investment-req', text: '10. Investment Requirements', level: 1 },
    { id: 'sec-11-profitability', text: '11. Profitability Factors', level: 1 },
    { id: 'sec-12-risks-mitigation', text: '12. Key Risks & Mitigation', level: 1 },
    { id: 'sec-13-entry-strategy', text: '13. Market Entry Strategy', level: 1 },
    { id: 'sec-14-final-verdict', text: '14. Final Verdict & Rating', level: 1 },
    { id: 'sec-15-faqs', text: '15. Frequently Asked Questions', level: 1 },
  ];

  // Schema for FAQ & Article
  const faqSchema = rep.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': rep.faqs.map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer,
      },
    })),
  } : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title={rep.title}
        description={rep.summary}
        ogType="article"
        publishedTime={rep.lastUpdated}
        authorName={author.name}
        schemaJson={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Market Research', onClick: () => onNavigate('market-research') },
          { label: rep.category, onClick: () => onNavigate('market-research') },
          { label: rep.title, active: true },
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {rep.category}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            Demand: {rep.demandLevel}
          </span>
          <span className="text-xs text-slate-400">
            Updated: <strong className="text-slate-200">{rep.lastUpdated}</strong>
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-100 leading-tight">
          {rep.title}
        </h1>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
          {rep.summary}
        </p>

        {/* Author / Analyst Card Header */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
            <div>
              <span className="font-bold text-slate-200 block">{author.name}</span>
              <span className="text-slate-400">{author.title}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-slate-200 font-medium">15-Section Standard</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Table of Contents */}
          <TableOfContents items={tocItems} />

          {/* Section 1: Executive Summary */}
          <section id="sec-1-executive-summary" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              1. Executive Summary
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.executiveSummary}
            </p>
          </section>

          {/* Section 2: Market Overview */}
          <section id="sec-2-market-overview" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              2. Market Overview & Valuation
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.marketOverview}
            </p>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Est. Market Size (PKR)</span>
                <span className="text-xl font-serif font-bold text-slate-900">{rep.marketSizePKR}</span>
              </div>
              {rep.marketSizeUSD && (
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">USD Equivalent</span>
                  <span className="text-lg font-bold text-amber-800">{rep.marketSizeUSD}</span>
                </div>
              )}
            </div>

            {/* Recharts Pie Chart Visualization */}
            {rep.chartData && rep.chartData.length > 0 && (
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Market Segment Share Breakdown</h4>
                <div className="h-64 w-full bg-slate-50 rounded-xl border border-slate-200 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={rep.chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {rep.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </section>

          {/* Section 3: Demand Analysis */}
          <section id="sec-3-demand-analysis" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              3. Demand Analysis & Drivers
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.demandAnalysis}
            </p>
          </section>

          {/* Section 4: Target Customers */}
          <section id="sec-4-target-customers" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              4. Target Customer Segments
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.targetCustomers}
            </p>
          </section>

          {/* Section 5: Competitor Landscape */}
          <section id="sec-5-competitor-landscape" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              5. Competitor Landscape
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.competitorLandscape}
            </p>
          </section>

          {/* Section 6: Pricing Structure */}
          <section id="sec-6-pricing-structure" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              6. Pricing Structure & Margins
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.pricingStructure}
            </p>

            {/* Structured Tables if present */}
            {rep.dataTables && rep.dataTables.length > 0 && (
              <div className="space-y-6 pt-2">
                {rep.dataTables.map((tbl, tIdx) => (
                  <div key={tIdx} className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">{tbl.title}</h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-xs md:text-sm text-left">
                        <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                          <tr>
                            {tbl.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-700">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 7: Distribution Channels */}
          <section id="sec-7-distribution-channels" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              7. Distribution Channels
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.distributionChannels}
            </p>
          </section>

          {/* Section 8: Supply Chain */}
          <section id="sec-8-supply-chain" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              8. Supply Chain & Raw Materials
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.supplyChain}
            </p>
          </section>

          {/* Section 9: Import/Export */}
          <section id="sec-9-import-export" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              9. Import/Export & Tariff Structure
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.importExportConsiderations}
            </p>
          </section>

          {/* Section 10: Investment Requirements */}
          <section id="sec-10-investment-req" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              10. Investment Requirements
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.investmentRequirements}
            </p>
          </section>

          {/* Section 11: Profitability Factors */}
          <section id="sec-11-profitability" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              11. Profitability Factors
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.profitabilityFactors}
            </p>
          </section>

          {/* Section 12: Risks */}
          <section id="sec-12-risks-mitigation" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              12. Key Risks & Mitigation Strategy
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.risksAndMitigation}
            </p>
          </section>

          {/* Section 13: Entry Strategy */}
          <section id="sec-13-entry-strategy" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
              13. Market Entry Strategy
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {rep.marketEntryStrategy}
            </p>
          </section>

          {/* Section 14: Final Verdict */}
          <section id="sec-14-final-verdict" className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-2xl font-serif font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                14. Final Verdict & Investment Feasibility Rating
              </h2>
              <span className="text-lg font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                {rep.finalVerdict.score} / 10
              </span>
            </div>

            <h3 className="text-lg font-bold text-amber-300">{rep.finalVerdict.verdictTitle}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{rep.finalVerdict.summary}</p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Suitable For</h4>
              <div className="flex flex-wrap gap-2">
                {rep.finalVerdict.suitableFor.map((st, sIdx) => (
                  <span key={sIdx} className="text-xs bg-slate-800 text-slate-200 px-3 py-1 rounded-full border border-slate-700">
                    ✓ {st}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 15: FAQ */}
          <section id="sec-15-faqs" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              15. Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {rep.faqs.map((f, fIdx) => (
                <div key={fIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h4 className="font-serif font-bold text-sm text-slate-900">Q: {f.question}</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">A: {f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sources Section */}
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Verified Data Sources & Attribution</h4>
            <ul className="space-y-1">
              {rep.sources.map((src, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>•</span>
                  <span><strong>{src.title}</strong> — {src.publisher} ({src.year})</span>
                  {src.isEstimate && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">
                      Estimated
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Lead Capture Box */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-slate-950 p-6 rounded-2xl shadow-xl space-y-3">
            <h4 className="font-serif font-bold text-lg">Need Custom Feasibility for This Sector?</h4>
            <p className="text-xs text-slate-900/80 leading-relaxed">
              Request bespoke market research, competitor profiling, or customs tariff verification from our research desk.
            </p>
            <button
              onClick={onOpenLeadModal}
              className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Request Custom Feasibility →
            </button>
          </div>

          <AdPlaceholder slot="sidebar" enabled={settings.showAdSensePreview} />
        </div>
      </div>
    </div>
  );
};
