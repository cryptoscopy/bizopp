import React from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { Shield, CheckCircle2, AlertTriangle, FileText, Lock } from 'lucide-react';

interface TrustPagesViewProps {
  type: 'about' | 'editorial-policy' | 'privacy-policy' | 'terms' | 'disclaimer';
  onNavigate: (view: string, param?: string) => void;
}

export const TrustPagesView: React.FC<TrustPagesViewProps> = ({ type, onNavigate }) => {
  const getPageInfo = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About Business Opportunity Hub',
          metaDesc: 'Learn about our mission to provide practical business research, verified machinery costs, and trade intelligence for entrepreneurs.',
          heading: 'Empowering Entrepreneurs with Real, Unbiased Business Intelligence',
          content: (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Business Opportunity Hub</strong> is an independent digital publishing and business intelligence platform dedicated to small and medium entrepreneurs, industrial manufacturers, trade importers, and investors in Pakistan and across emerging markets in the Middle East and South Asia.
              </p>
              <p>
                Unlike generic lifestyle or AI-generated blogs that post superficial lists of business ideas, our mission is to deliver <strong>actionable, costed, and field-verified research</strong>. Every feasibility report, machinery breakdown, and market report is vetted against real supplier prices in Gujranwala, Lahore, and Karachi, as well as customs tariffs for export corridors in the UAE and Saudi Arabia.
              </p>
              <h3 className="text-lg font-serif font-bold text-slate-900 pt-2">Our Core Commitments</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Zero Fabrication:</strong> We never fabricate machinery costs, profit margins, or market demand figures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>15-Section Research Standards:</strong> Every comprehensive market report follows a rigorous 15-section framework covering everything from HS Codes to supply chain bottlenecks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Independent Research:</strong> Paid placements do not influence our research ratings or feasibility scores.</span>
                </li>
              </ul>
            </div>
          ),
        };

      case 'editorial-policy':
        return {
          title: 'Editorial & Research Methodology Policy',
          metaDesc: 'Our editorial principles, fact-checking process, data verification standards, and research methodology.',
          heading: 'Editorial Principles & Data Verification Framework',
          content: (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Business Opportunity Hub maintains strict editorial independence and rigorous data standards across all published articles, market research reports, and directory listings.
              </p>
              <h3 className="text-lg font-serif font-bold text-slate-900 pt-2">Fact-Checking & Price Verification</h3>
              <p>
                Equipment costs, raw material estimates, and customs duties quoted on our publication are sourced directly from verified machinery dealers, industrial equipment importers, and published FBR / Customs tariff schedules. Where price figures represent estimates or ranges, they are explicitly tagged as <em>Estimated</em>.
              </p>
              <h3 className="text-lg font-serif font-bold text-slate-900 pt-2">AI Usage Transparency</h3>
              <p>
                We use modern data tools for market research aggregation, structural formatting, and linguistic clarity. However, all core financial models, profit margin calculations, and strategic feasibility judgments are reviewed and approved by human industry analysts before publication.
              </p>
            </div>
          ),
        };

      case 'privacy-policy':
        return {
          title: 'Privacy Policy',
          metaDesc: 'How Business Opportunity Hub collects, protects, and uses user data, subscriber emails, and cookies.',
          heading: 'Privacy Policy & Data Protection',
          content: (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                At Business Opportunity Hub, accessible from businessopportunityhub.com, the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is received and collected and how it is used.
              </p>
              <h3 className="text-lg font-serif font-bold text-slate-900 pt-2">Information We Collect</h3>
              <p>
                When you subscribe to our newsletter or submit a business inquiry form, we collect your name, email address, phone number, and business details solely for the purpose of fulfilling your inquiry or sending periodic intelligence dispatches. We never sell or rent subscriber data to third parties.
              </p>
              <h3 className="text-lg font-serif font-bold text-slate-900 pt-2">Cookies & Analytics</h3>
              <p>
                Like many websites, we use standard browser cookies and Google Analytics to understand visitor navigation patterns, measure page popularity, and optimize site performance. You may disable cookies in your browser settings at any time.
              </p>
            </div>
          ),
        };

      case 'terms':
        return {
          title: 'Terms & Conditions',
          metaDesc: 'Terms of service and usage rules for Business Opportunity Hub.',
          heading: 'Terms & Conditions of Publication Access',
          content: (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                By accessing and browsing Business Opportunity Hub, you agree to comply with and be bound by the following terms and conditions of use.
              </p>
              <h3 className="text-lg font-serif font-bold text-slate-900 pt-2">Intellectual Property</h3>
              <p>
                All research reports, feasibility models, custom charts, and article copy published on this website are protected by copyright. Reproduction, republication, or scraping of our content without written permission is strictly prohibited.
              </p>
            </div>
          ),
        };

      case 'disclaimer':
        return {
          title: 'Risk Disclaimer & Financial Notice',
          metaDesc: 'Important financial risk disclaimer regarding business investments and feasibility reports.',
          heading: 'Important Risk Disclaimer & Feasibility Limitations',
          content: (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-amber-950 font-medium">
                  <strong>Entrepreneurship Risk Notice:</strong> Starting any business or purchasing manufacturing machinery involves financial risk. Profit projections and payback estimations published on this platform are for general educational evaluation only and do not guarantee future financial returns.
                </p>
              </div>
              <p>
                Readers must perform their own independent field due diligence, consult qualified cost accountants, tax professionals, and legal advisors before committing capital to any equipment purchase, factory lease, or export transaction.
              </p>
            </div>
          ),
        };
    }
  };

  const info = getPageInfo();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta title={`${info.title} | Business Opportunity Hub`} description={info.metaDesc} />

      <Breadcrumbs items={[{ label: info.title, active: true }]} onHomeClick={() => onNavigate('home')} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <Shield className="w-3.5 h-3.5" /> Trust & Compliance
        </div>
        <h1 className="text-3xl font-serif font-bold text-slate-100">{info.heading}</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {info.content}
      </div>
    </div>
  );
};
