import React, { useState } from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { PlusCircle, CheckCircle, Send, Lightbulb } from 'lucide-react';

interface SubmitOpportunityViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const SubmitOpportunityView: React.FC<SubmitOpportunityViewProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    oppTitle: '',
    category: 'Manufacturing',
    estimatedCapitalPKR: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="Submit a Business Opportunity / Sourcing Requirement | Business Opportunity Hub"
        description="Are you a manufacturer, importer, or business owner with a proven business idea or machinery offer? Submit it to our research directory."
      />

      <Breadcrumbs items={[{ label: 'Submit Business Opportunity', active: true }]} onHomeClick={() => onNavigate('home')} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <PlusCircle className="w-3.5 h-3.5" /> Editorial Directory Submission
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-100">
          Submit a Business Idea or Sourcing Offer
        </h1>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Submit verified business models, machinery equipment supply deals, or B2B export buyer opportunities. Our analyst team reviews all submissions before inclusion in the public directory.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-2xl font-serif font-bold text-slate-900">Submission Under Review</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you for submitting your opportunity. Our research analysts will verify the metrics and contact you if additional cost details are needed.
            </p>
            <button
              onClick={() => onNavigate('opportunities')}
              className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl"
            >
              Back to Business Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Asad Raza"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. asad@factory.pk"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Opportunity / Business Title *</label>
                <input
                  type="text"
                  required
                  value={formData.oppTitle}
                  onChange={e => setFormData({ ...formData, oppTitle: e.target.value })}
                  placeholder="e.g. Corrugated Packaging Box Unit"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Capital Required (PKR)</label>
                <input
                  type="text"
                  value={formData.estimatedCapitalPKR}
                  onChange={e => setFormData({ ...formData, estimatedCapitalPKR: e.target.value })}
                  placeholder="e.g. 2,500,000 PKR"
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Opportunity Detail & Machinery Requirements *</label>
              <textarea
                required
                rows={5}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the business model, target customer base, machinery costs, and expected profit margin..."
                className="w-full p-3 border border-slate-300 rounded-xl"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Opportunity for Editorial Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
