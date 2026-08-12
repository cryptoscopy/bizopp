import React from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { TableOfContents, TOCItem } from '../common/TableOfContents';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { NewsletterForm } from '../common/NewsletterForm';
import {
  Clock,
  Calendar,
  User,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Share2,
  FileText,
  Lightbulb,
  BarChart3,
  BookOpen,
} from 'lucide-react';

interface ArticleDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenLeadModal: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const articles = CMSStore.getArticles();
  const article = articles.find(a => a.slug === slug) || articles[0];
  const settings = CMSStore.getSettings();

  const author = article.author || {
    name: 'Tariq Malik',
    title: 'Senior Industrial Research Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Tariq has over 14 years of hands-on experience evaluating small manufacturing units, machinery procurement, and cost-accounting.',
    expertise: ['Manufacturing Sourcing', 'Engineering Costing', 'Equipment ROI'],
  };

  // Generate Table of Contents items dynamically from H1/H2 tags or static headers
  const tocItems: TOCItem[] = [
    { id: 'sec-takeaways', text: 'Key Executive Takeaways', level: 1 },
    { id: 'sec-overview', text: 'Executive Overview', level: 1 },
    { id: 'sec-main-guide', text: 'Detailed Implementation Blueprint', level: 1 },
    { id: 'sec-faqs', text: 'Frequently Asked Questions', level: 1 },
    { id: 'sec-sources', text: 'Research Sources & References', level: 1 },
  ];

  // Related opportunities and reports
  const relatedOpps = article.relatedOpportunityIds
    ? CMSStore.getOpportunities().filter(o => article.relatedOpportunityIds?.includes(o.id))
    : [];

  const relatedReports = article.relatedReportIds
    ? CMSStore.getMarketReports().filter(r => article.relatedReportIds?.includes(r.id))
    : [];

  const faqSchema = article.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': article.faqs.map(f => ({
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
        title={article.seoTitle || article.title}
        description={article.metaDescription || article.excerpt}
        ogType="article"
        ogImage={article.featuredImage}
        publishedTime={article.publishedDate}
        modifiedTime={article.updatedDate}
        authorName={author.name}
        schemaJson={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Articles & Analysis', onClick: () => onNavigate('articles') },
          { label: article.category, onClick: () => onNavigate('category', article.category.toLowerCase()) },
          { label: article.title, active: true },
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Main Header */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold uppercase tracking-wider px-3 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200">
            {article.category}
          </span>
          {article.isPillar && (
            <span className="font-bold uppercase tracking-wider px-3 py-1 rounded bg-slate-900 text-amber-400">
              Master Pillar Guide
            </span>
          )}
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>

        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author Metadata Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
          <div
            onClick={() => onNavigate('author', author.slug)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
            <div>
              <span className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors block">{author.name}</span>
              <span className="text-slate-500 text-[11px]">{author.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Published: <strong>{article.publishedDate}</strong></span>
            <span>•</span>
            <span>Last Updated: <strong>{article.updatedDate}</strong></span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-md border border-slate-200 max-h-[420px]">
        <img src={article.featuredImage} alt={article.imageAlt} className="w-full h-full object-cover" />
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Left Column (Article Body) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Executive Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <section id="sec-takeaways" className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-serif font-bold text-amber-950 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                Key Executive Takeaways
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-800">
                {article.keyTakeaways.map((take, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{take}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Table of Contents */}
          <TableOfContents items={tocItems} />

          {/* Article Main Markdown/Formatted Content */}
          <section id="sec-main-guide" className="prose prose-slate max-w-none space-y-6 text-slate-800 leading-relaxed font-sans">
            {/* Simple Markdown-like renderer */}
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return <h2 key={idx} className="text-2xl md:text-3xl font-serif font-bold text-slate-900 pt-4 border-b border-slate-200 pb-2">{paragraph.replace('# ', '')}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h3 key={idx} className="text-xl md:text-2xl font-serif font-bold text-slate-900 pt-3">{paragraph.replace('## ', '')}</h3>;
              }
              if (paragraph.startsWith('### ')) {
                return <h4 key={idx} className="text-lg font-serif font-bold text-slate-900 pt-2">{paragraph.replace('### ', '')}</h4>;
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-xl text-slate-700 italic my-4 text-sm">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              return <p key={idx} className="text-sm md:text-base text-slate-700 leading-relaxed">{paragraph}</p>;
            })}
          </section>

          {/* In-Article Ad Placement */}
          <AdPlaceholder slot="in-article" enabled={settings.showAdSensePreview} />

          {/* FAQ Section */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="sec-faqs" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {article.faqs.map((f, fIdx) => (
                  <div key={fIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <h4 className="font-serif font-bold text-sm text-slate-900">Q: {f.question}</h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">A: {f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio Footer Box */}
          <section className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
            <img src={author.avatar} alt={author.name} className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/50 flex-shrink-0" />
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Written by Industry Analyst</span>
              <h4 className="text-lg font-serif font-bold text-slate-100">{author.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{author.bio}</p>
              <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start">
                {author.expertise?.map((ex, eIdx) => (
                  <span key={eIdx} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Form */}
          <NewsletterForm />
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Contextual Related Business Opportunities */}
          {relatedOpps.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                Related Business Ideas
              </h4>
              <div className="space-y-3">
                {relatedOpps.map(opp => (
                  <div
                    key={opp.id}
                    onClick={() => onNavigate('opportunity-detail', opp.slug)}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-500/50 cursor-pointer transition-all group"
                  >
                    <h5 className="font-serif font-bold text-xs text-slate-900 group-hover:text-amber-700">{opp.name}</h5>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Budget: PKR {(opp.minCapitalPKR / 100000).toFixed(1)}L - {(opp.maxCapitalPKR / 100000).toFixed(1)}L
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextual Related Market Reports */}
          {relatedReports.length > 0 && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl border border-slate-800">
              <h4 className="font-serif font-bold text-base text-slate-100 flex items-center gap-2 pb-2 border-b border-slate-800">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                Related Market Intelligence
              </h4>
              <div className="space-y-3">
                {relatedReports.map(rep => (
                  <div
                    key={rep.id}
                    onClick={() => onNavigate('market-report-detail', rep.slug)}
                    className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 hover:border-amber-500/50 cursor-pointer transition-all group"
                  >
                    <h5 className="font-serif font-bold text-xs text-slate-100 group-hover:text-amber-300">{rep.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Size: {rep.marketSizePKR}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lead Modal Box */}
          <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <h4 className="font-serif font-bold text-base text-slate-100">Need Machinery or Export Contacts?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our B2B desk helps connect Pakistani entrepreneurs with verified suppliers and trade matchmakers.
            </p>
            <button
              onClick={onOpenLeadModal}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
            >
              Submit Business Inquiry →
            </button>
          </div>

          <AdPlaceholder slot="sidebar" enabled={settings.showAdSensePreview} />
        </div>
      </div>
    </div>
  );
};
