import React from 'react';
import { AUTHORS } from '../../data/authors';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { Award, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface AuthorsViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AuthorsView: React.FC<AuthorsViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="Editorial Board & Industry Analysts | Business Opportunity Hub"
        description="Meet our team of industrial cost accountants, trade analysts, and manufacturing consultants specializing in Pakistan and GCC markets."
      />

      <Breadcrumbs items={[{ label: 'Editorial Board & Analysts', active: true }]} onHomeClick={() => onNavigate('home')} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <ShieldCheck className="w-3.5 h-3.5" /> E-E-A-T Verified Team
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Our Research Analysts & Industry Consultants
        </h1>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Every report and feasibility guide published on Business Opportunity Hub is authored and reviewed by specialists with years of direct operational experience in manufacturing, customs clearance, and business strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AUTHORS.map(author => {
          const articles = CMSStore.getArticles().filter(a => a.authorId === author.id);
          const reports = CMSStore.getMarketReports().filter(r => r.authorId === author.id);

          return (
            <div
              key={author.id}
              onClick={() => onNavigate('author', author.slug)}
              className="bg-white border border-slate-200 hover:border-amber-500/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/40"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                      {author.name}
                    </h3>
                    <p className="text-xs text-amber-800 font-medium">{author.title}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {author.bio}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {author.expertise.map((ex, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-full">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{articles.length} Guides • {reports.length} Reports</span>
                <span className="text-amber-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View Profile <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
