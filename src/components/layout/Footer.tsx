import React from 'react';
import { MAIN_CATEGORIES } from '../../data/categories';
import { CITY_CLUSTERS } from '../../data/cityClusters';
import { INVESTMENT_TIERS } from '../../data/investmentTiers';
import { Shield, Mail, ArrowUpRight } from 'lucide-react';
import { getViewPath } from '../../utils/router';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLeadModal }) => {
  const handleNav = (e: React.MouseEvent, view: string, param?: string) => {
    e.preventDefault();
    onNavigate(view, param);
  };

  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href={getViewPath('home')}
              onClick={(e) => handleNav(e, 'home')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black font-serif text-base shadow-md shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
                B
              </div>
              <span className="text-lg font-extrabold tracking-tighter text-amber-400 uppercase">
                BUSINESS OPPORTUNITY HUB
              </span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Practical Ideas. Real Markets. Better Business Decisions.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An independent business research and market intelligence publication for entrepreneurs, SME manufacturers, exporters, and emerging market investors.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 pt-1 font-bold uppercase tracking-wider text-[11px]">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Independent Research • Zero Sponsored Ratings</span>
            </div>
          </div>

          {/* Col 2: Core Directories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Core Directories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href={getViewPath('opportunities')}
                  onClick={(e) => handleNav(e, 'opportunities')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Business Ideas Directory
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('market-research')}
                  onClick={(e) => handleNav(e, 'market-research')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Market Research Database
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('category', 'manufacturing')}
                  onClick={(e) => handleNav(e, 'category', 'manufacturing')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Manufacturing & Assembly
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('category', 'import-export')}
                  onClick={(e) => handleNav(e, 'category', 'import-export')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Import & Export Corridors
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('category', 'e-commerce')}
                  onClick={(e) => handleNav(e, 'category', 'e-commerce')}
                  className="hover:text-amber-400 transition-colors"
                >
                  E-commerce & Wholesale
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Pakistani Industrial Clusters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Pakistani City Clusters
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CITY_CLUSTERS.slice(0, 6).map(c => (
                <li key={c.id}>
                  <a
                    href={getViewPath('city', c.slug)}
                    onClick={(e) => handleNav(e, 'city', c.slug)}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {c.name} Industrial Hub
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Trust & Investment Ranges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Trust & Investment Filters
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href={getViewPath('investment', 'under-500k')}
                  onClick={(e) => handleNav(e, 'investment', 'under-500k')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Ideas Under PKR 5 Lakh
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('investment', '1m-to-2m')}
                  onClick={(e) => handleNav(e, 'investment', '1m-to-2m')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Ideas PKR 10 Lakh - 20 Lakh
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('about')}
                  onClick={(e) => handleNav(e, 'about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('editorial-policy')}
                  onClick={(e) => handleNav(e, 'editorial-policy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Editorial & Methodology Policy
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('privacy-policy')}
                  onClick={(e) => handleNav(e, 'privacy-policy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={getViewPath('submit-opportunity')}
                  onClick={(e) => handleNav(e, 'submit-opportunity')}
                  className="hover:text-amber-400 transition-colors text-amber-400 font-medium"
                >
                  Submit Business Opportunity →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate & Risk Disclaimer */}
        <div className="py-6 border-b border-slate-900 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Disclaimer & Due Diligence Notice:</strong> All market reports, profitability figures, equipment cost estimates, and business opportunity data published on Business Opportunity Hub are provided for informational and preliminary feasibility evaluation purposes only. Past performance or estimated returns are not a guarantee of future profits. Entrepreneurship involves inherent risk. Readers must perform their own independent due diligence, consult qualified cost accountants, tax advisors, and legal specialists before making capital investments.
          </p>
          <p>
            <strong>Affiliate Disclosure:</strong> Some links on this publication may be partner or affiliate links. If you purchase software, equipment, or services through these links, we may earn a referral commission at no additional cost to you.
          </p>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Business Opportunity Hub. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              XML Sitemap
            </a>
            <a
              href={getViewPath('contact')}
              onClick={(e) => handleNav(e, 'contact')}
              className="hover:text-amber-400 transition-colors"
            >
              Contact Desk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

