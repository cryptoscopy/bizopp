import React from 'react';
import { MAIN_CATEGORIES } from '../../data/categories';
import { Shield, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLeadModal }) => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black font-serif text-base shadow-md shadow-amber-500/20">
                B
              </div>
              <span className="text-lg font-extrabold tracking-tighter text-amber-400 uppercase">
                BUSINESS OPPORTUNITY HUB
              </span>
            </div>

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
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Business Ideas Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('market-research')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Market Research Database
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'manufacturing')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Manufacturing & Assembly
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'import-export')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Import & Export Corridors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'e-commerce')}
                  className="hover:text-amber-400 transition-colors"
                >
                  E-commerce & Wholesale
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Topics & Regions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('category', 'pakistan-market')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Pakistan Industrial Estates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'international-markets')}
                  className="hover:text-amber-400 transition-colors"
                >
                  UAE & Saudi Arabia Markets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'ai-business')}
                  className="hover:text-amber-400 transition-colors"
                >
                  AI in SME Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('authors')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Research Analysts & Authors
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Editorial */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Trust & Transparency
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editorial-policy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Editorial & Methodology Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Risk Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('submit-opportunity')}
                  className="hover:text-amber-400 transition-colors text-amber-400 font-medium"
                >
                  Submit Business Opportunity →
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact Research Desk
                </button>
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
            <button
              onClick={() => onNavigate('sitemap')}
              className="hover:text-amber-400 transition-colors"
            >
              XML Sitemap
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-amber-400 transition-colors"
            >
              Contact Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
