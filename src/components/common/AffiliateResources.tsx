import React from 'react';
import { INITIAL_RESOURCES } from '../../data/resources';
import { ExternalLink, ShieldCheck, Star } from 'lucide-react';

interface AffiliateResourcesProps {
  showDisclosure?: boolean;
  limit?: number;
  categoryFilter?: string;
  className?: string;
}

export const AffiliateResources: React.FC<AffiliateResourcesProps> = ({
  showDisclosure = true,
  limit,
  categoryFilter,
  className = '',
}) => {
  let resources = INITIAL_RESOURCES;
  if (categoryFilter) {
    resources = resources.filter(r => r.category === categoryFilter);
  }
  if (limit) {
    resources = resources.slice(0, limit);
  }

  return (
    <section className={`bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Recommended Tools & Portals
          </span>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-100">
            Verified Business Resources & Sourcing Tools
          </h3>
        </div>
      </div>

      {showDisclosure && (
        <div className="mb-6 p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Affiliate & Partner Transparency Disclosure:</strong> Some links below are partner links. If you register or purchase services through these verified links, we may receive a small referral commission at no extra cost to you. We only feature tools verified for Pakistani and emerging market trade operations.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(res => (
          <a
            key={res.id}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 p-5 rounded-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                  {res.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{res.rating.toFixed(1)}</span>
                </div>
              </div>

              <h4 className="font-semibold text-slate-100 group-hover:text-amber-300 transition-colors flex items-center justify-between gap-2">
                <span>{res.title}</span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-3">
                {res.description}
              </p>
            </div>

            {res.affiliateBadge && (
              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-amber-400 font-medium">
                <span>{res.affiliateBadge}</span>
                <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">Visit Tool →</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};
