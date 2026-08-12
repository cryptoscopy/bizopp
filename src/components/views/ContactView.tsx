import React, { useState } from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import { Mail, Phone, MapPin, CheckCircle, Send, Building2 } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Research Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta
        title="Contact Research Desk | Business Opportunity Hub"
        description="Get in touch with our business intelligence desk for custom research inquiries, B2B supplier connections, or editorial inquiries."
      />

      <Breadcrumbs items={[{ label: 'Contact Research Desk', active: true }]} onHomeClick={() => onNavigate('home')} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <Mail className="w-3.5 h-3.5" /> B2B Communications Desk
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">Contact Research Desk</h1>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
          Have a question regarding custom feasibility reports, verified machinery suppliers in Gujranwala/Lahore, or export opportunities in GCC? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-slate-900">Message Received</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting our research desk. An analyst will review your inquiry and respond within 1 business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-slate-900 pb-2 border-b border-slate-200">
                Direct Contact Form
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Usman Chaudhry"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. usman@company.pk"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                  >
                    <option>General Research Inquiry</option>
                    <option>Custom Feasibility Request</option>
                    <option>Sourcing Machinery / Equipment</option>
                    <option>GCC Export Matchmaking</option>
                    <option>Advertising & Sponsorship</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-slate-700 mb-1">Message Detail *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide details regarding your business background or target sector..."
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Inquiry to Research Desk
              </button>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-100 pb-2 border-b border-slate-800">
              Research Operations Center
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-100 block">Pakistan Office:</strong>
                  <span>Gulberg III, Industrial Cluster Avenue, Lahore, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-100 block">UAE Regional Hub:</strong>
                  <span>Business Bay Trade Tower, Dubai, United Arab Emirates</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-100 block">Editorial Email:</strong>
                  <span>research@businessopportunityhub.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
