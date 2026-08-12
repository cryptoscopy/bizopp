import React, { useState } from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface NewsletterFormProps {
  className?: string;
  variant?: 'card' | 'inline' | 'dark';
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ className = '', variant = 'card' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      const added = CMSStore.addSubscriber(email);
      if (added) {
        setStatus('success');
      } else {
        setStatus('already');
      }
      setEmail('');
    }, 400);
  };

  const isDark = variant === 'dark' || variant === 'card';

  return (
    <div
      className={`rounded-2xl p-6 md:p-8 ${
        isDark
          ? 'bg-[#0f172a] text-white border border-slate-800 shadow-xl'
          : 'bg-amber-50/80 border border-amber-200/80 text-slate-900'
      } ${className}`}
    >
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Mail className="w-3.5 h-3.5 text-amber-400" /> Practical Intelligence Weekly
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Get Practical Business Opportunities & Market Insights
        </h3>

        <p className={`text-xs md:text-sm max-w-lg mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Receive research-backed business ideas, verified market reports, and export trade leads directly in your inbox without the noise.
        </p>

        {status === 'success' && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Thank you for subscribing! You are now on our priority research dispatch list.</span>
          </div>
        )}

        {status === 'already' && (
          <div className="p-4 bg-amber-950/80 border border-amber-500/40 rounded-xl text-amber-300 text-xs flex items-center justify-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>You are already subscribed to our newsletter list!</span>
          </div>
        )}

        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your business email..."
              className={`flex-1 px-4 py-3 rounded-lg text-sm border focus:outline-none focus:border-amber-500 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wide rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md shadow-amber-500/20"
            >
              {status === 'loading' ? 'Subscribing...' : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}

        <p className={`text-[10px] uppercase font-semibold tracking-wider pt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          No spam ever • Unsubscribe anytime with one click
        </p>
      </div>
    </div>
  );
};
