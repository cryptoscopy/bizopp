import React, { useState } from 'react';
import { CMSStore } from '../../services/cmsStore';
import { X, Send, CheckCircle2, Building2 } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRequirement?: string;
  defaultTitle?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  defaultRequirement = 'Supplier Inquiry',
  defaultTitle = 'Looking for Suppliers, Buyers or Custom Business Research?',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Pakistan',
    businessType: 'Appliance & Engineering',
    requirement: defaultRequirement,
    budgetRange: 'PKR 1M - 5M',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    CMSStore.addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      businessType: formData.businessType,
      requirement: formData.requirement as any,
      budgetRange: formData.budgetRange,
      message: formData.message,
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4" /> B2B Matchmaking & Advisory
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-100 pr-6">
            {defaultTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Connect with verified machinery suppliers, buyers, or request custom market research.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-serif font-bold text-slate-900">Inquiry Submitted Successfully</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our research desk and verified trade network will review your request and reach out via email within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tariq Mahmood"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Country / Market</label>
                  <select
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="Pakistan">Pakistan 🇵🇰</option>
                    <option value="UAE">United Arab Emirates 🇦🇪</option>
                    <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                    <option value="GCC">GCC Region 🌐</option>
                    <option value="International">International 🌍</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Requirement Type</label>
                  <select
                    value={formData.requirement}
                    onChange={e => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="Supplier Inquiry">Looking for Suppliers</option>
                    <option value="Buyer Inquiry">Looking for International Buyers</option>
                    <option value="Machinery Sourcing">Machinery & Equipment Sourcing</option>
                    <option value="Market Research Service">Custom Market Research</option>
                    <option value="Export Mentorship">Export Guidance & Documentation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Budget / Project Size</label>
                <select
                  value={formData.budgetRange}
                  onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="Under PKR 500k">Under PKR 500,000</option>
                  <option value="PKR 500k - 2.5M">PKR 500,000 - 2,500,000</option>
                  <option value="PKR 2.5M - 5M">PKR 2,500,000 - 5,000,000</option>
                  <option value="PKR 5M - 15M">PKR 5,000,000 - 15,000,000</option>
                  <option value="PKR 15M+">PKR 15,000,000+ ($50k+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Describe Your Requirement *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify machine parameters, target export products, or questions for our research team..."
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
              >
                {loading ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Business Inquiry</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
