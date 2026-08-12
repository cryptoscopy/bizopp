import React from 'react';
import { AUTHORS } from '../../data/authors';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { NotFoundView } from './NotFoundView';
import { ShieldCheck, BookOpen, BarChart3, ChevronRight } from 'lucide-react';

interface AuthorDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
}

export const AuthorDetailView: React.FC<AuthorDetailViewProps> = ({ slug, onNavigate }) => {
  const author = AUTHORS.find(a => a.slug === slug);

  if (!author) {
    return <NotFoundView onNavigate={onNavigate} />;
  }

  const articles = CMSStore.getArticles().filter(a => a.authorId === author.id);
  const reports = CMSStore.getMarketReports().filter(r => r.authorId === author.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title={`${author.name} - Industry Analyst Profile | Business Opportunity Hub`}
        description={author.bio}
      />

      <Breadcrumbs
        items={[
          { label: 'Analysts & Authors', onClick: () => onNavigate('authors') },
          { label: author.name, active: true },
        ]}
        onHomeClick={() => onNavigate('home')}
      />

      {/* Profile Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-amber-500/50 flex-shrink-0"
        />

        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> E-E-A-T Verified Analyst
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">{author.name}</h1>
          <p className="text-sm text-amber-400 font-medium">{author.title}</p>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">{author.bio}</p>

          <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
            {author.expertise.map((ex, idx) => (
              <span key={idx} className="text-xs bg-slate-800 text-slate-200 px-3 py-1 rounded-full border border-slate-700">
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Publications by this author */}
      <div className="space-y-8">
        {/* Reports */}
        {reports.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              15-Section Research Reports Authored ({reports.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map(rep => (
                <div
                  key={rep.id}
                  onClick={() => onNavigate('market-report-detail', rep.slug)}
                  className="bg-white border border-slate-200 hover:border-amber-500/50 p-5 rounded-xl shadow-sm cursor-pointer transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {rep.category}
                  </span>
                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors mt-2">
                    {rep.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{rep.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles */}
        {articles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <BookOpen className="w-5 h-5 text-amber-600" />
              Pillar Guides & Articles Authored ({articles.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map(art => (
                <div
                  key={art.id}
                  onClick={() => onNavigate('article-detail', art.slug)}
                  className="bg-white border border-slate-200 hover:border-slate-400 p-5 rounded-xl shadow-sm cursor-pointer transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {art.category}
                  </span>
                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors mt-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{art.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
