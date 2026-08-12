import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { getViewPath } from '../../utils/router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onHomeClick?: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onHomeClick }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs md:text-sm text-slate-500 my-3 overflow-x-auto whitespace-nowrap pb-1">
      <a
        href={getViewPath('home')}
        onClick={(e) => {
          if (onHomeClick) {
            e.preventDefault();
            onHomeClick();
          }
        }}
        className="flex items-center gap-1 hover:text-slate-900 transition-colors font-medium text-slate-600"
      >
        <Home className="w-3.5 h-3.5 text-amber-600" />
        <span>Home</span>
      </a>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
          {item.active || (!item.onClick && !item.href) ? (
            <span className="font-semibold text-slate-900 truncate max-w-[200px] md:max-w-[320px]">
              {item.label}
            </span>
          ) : (
            <a
              href={item.href || '#'}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              className="hover:text-slate-900 transition-colors hover:underline text-slate-600 truncate max-w-[180px]"
            >
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

