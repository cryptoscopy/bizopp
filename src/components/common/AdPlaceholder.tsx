import React from 'react';
import { Info } from 'lucide-react';

interface AdPlaceholderProps {
  slot: 'hero-below' | 'in-article' | 'sidebar' | 'before-related' | 'above-footer';
  className?: string;
  enabled?: boolean;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = '', enabled = true }) => {
  if (!enabled) return null;

  const slotStyles = {
    'hero-below': 'h-[90px] max-w-[728px] mx-auto my-6',
    'in-article': 'h-[250px] max-w-[336px] md:max-w-[600px] mx-auto my-8',
    'sidebar': 'h-[600px] w-[300px] mx-auto my-4',
    'before-related': 'h-[90px] max-w-[728px] mx-auto my-8',
    'above-footer': 'h-[90px] max-w-[970px] mx-auto my-10',
  };

  const slotLabels = {
    'hero-below': '728x90 Leaderboard Ad Unit',
    'in-article': 'In-Article Responsive Ad Unit',
    'sidebar': '300x600 Half-Page Sidebar Ad Unit',
    'before-related': '728x90 Responsive Ad Unit',
    'above-footer': '970x90 Large Leaderboard Ad Unit',
  };

  return (
    <div
      className={`relative border border-slate-200 bg-slate-50/80 rounded-md flex flex-col items-center justify-center text-slate-400 p-4 transition-all hover:bg-slate-100/60 ${slotStyles[slot]} ${className}`}
      id={`ad-slot-${slot}`}
    >
      <div className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-1">
        <span>Advertisement</span>
        <Info className="w-3 h-3 text-slate-300" />
      </div>
      <p className="text-xs text-slate-400 font-mono text-center">
        [Google AdSense Reserve Unit: {slotLabels[slot]}]
      </p>
      <p className="text-[10px] text-slate-300 mt-1">Non-intrusive placement • Configurable in Admin</p>
    </div>
  );
};
