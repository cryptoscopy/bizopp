import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, className = '' }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-sm md:text-base">
          <List className="w-4 h-4 text-amber-600" />
          <span>Table of Contents</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-500 hover:text-slate-800 p-1 rounded transition-colors"
          aria-label="Toggle Table of Contents"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <ul className="mt-3 space-y-2 text-xs md:text-sm">
          {items.map((item, idx) => (
            <li
              key={idx}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              className="text-slate-600 hover:text-amber-700 transition-colors"
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="flex items-start gap-1.5 py-0.5"
              >
                <span className="text-amber-600 font-semibold text-[11px] mt-0.5">•</span>
                <span className="leading-snug">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
