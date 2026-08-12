import React, { useState } from 'react';
import { REGIONS_DEF, MAIN_CATEGORIES } from '../../data/categories';
import { MarketRegion } from '../../types';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Globe2,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string, param?: string) => void;
  selectedRegion: MarketRegion;
  onSelectRegion: (region: MarketRegion) => void;
  onOpenSearch: () => void;
  onOpenLeadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  selectedRegion,
  onSelectRegion,
  onOpenSearch,
  onOpenLeadModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  const currentRegionDef = REGIONS_DEF.find(r => r.id === selectedRegion) || REGIONS_DEF[0];

  const handleNav = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a] text-white border-b border-amber-500/30 shadow-lg">
      {/* Top Bar for Trust & Region Switcher */}
      <div className="bg-[#080d1a] border-b border-slate-800 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-400 overflow-x-auto whitespace-nowrap">
            <span className="flex items-center gap-1 text-amber-400 font-bold uppercase tracking-widest text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Intelligence
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400 font-medium">Practical Ideas • Real Markets • Better Decisions</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Region Selector */}
            <div className="relative">
              <button
                onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors py-0.5 px-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-medium"
              >
                <span>{currentRegionDef.flag}</span>
                <span className="hidden md:inline">{currentRegionDef.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {regionDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-xs"
                  onMouseLeave={() => setRegionDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-800">
                    Select Target Market
                  </div>
                  {REGIONS_DEF.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onSelectRegion(r.id as MarketRegion);
                        setRegionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                        selectedRegion === r.id ? 'text-amber-400 font-semibold bg-slate-800/50' : 'text-slate-300'
                      }`}
                    >
                      <span>{r.flag}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('admin')}
              className="text-slate-400 hover:text-white transition-colors text-[11px] font-medium underline underline-offset-2"
            >
              CMS Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => handleNav('home')}
          className="cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black font-serif text-lg shadow-md shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
            B
          </div>
          <div>
            <span className="text-lg md:text-xl font-extrabold tracking-tighter text-amber-400 block leading-tight">
              BUSINESS OPPORTUNITY HUB
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block">
              Practical Ideas • Pakistan & Global Edition
            </span>
          </div>
        </div>

        {/* Desktop Primary Nav */}
        <nav className="hidden lg:flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              activeView === 'home' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('opportunities')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              activeView === 'opportunities' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Business Ideas
          </button>

          <button
            onClick={() => handleNav('market-research')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              activeView === 'market-research' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Market Research
          </button>

          {/* Category Hub Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center gap-1"
            >
              <span>Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {categoriesDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 capitalize"
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
              >
                {MAIN_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNav('category', cat.slug)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-800 transition-colors flex items-center justify-between text-xs text-slate-300 hover:text-amber-400"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-500">Explore →</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('articles')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              activeView === 'articles' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Analysis & Articles
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              activeView === 'about' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right CTA & Search */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-2 bg-slate-800/60 border border-slate-700/60 rounded-md text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
            title="Search Business Ideas & Research"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenLeadModal}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] uppercase tracking-wide rounded-md transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit Inquiry</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-amber-400"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900 text-slate-200 text-xs font-medium"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('opportunities')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900 text-slate-200 text-xs font-medium"
            >
              Business Ideas Directory
            </button>
            <button
              onClick={() => handleNav('market-research')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900 text-slate-200 text-xs font-medium"
            >
              Market Research
            </button>
            <button
              onClick={() => handleNav('articles')}
              className="text-left px-3 py-2 rounded-lg bg-slate-900 text-slate-200 text-xs font-medium"
            >
              Articles & Guides
            </button>
          </div>

          <div className="pt-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2">Main Categories</p>
            <div className="grid grid-cols-2 gap-1.5">
              {MAIN_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleNav('category', cat.slug)}
                  className="text-left px-2.5 py-1.5 rounded text-xs text-slate-400 hover:text-amber-400 hover:bg-slate-900 truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={onOpenLeadModal}
              className="w-full py-2.5 bg-amber-600 text-slate-950 font-bold text-xs rounded-lg text-center"
            >
              Submit Supplier / Buyer Inquiry
            </button>

            <button
              onClick={() => handleNav('contact')}
              className="w-full py-2 bg-slate-900 text-slate-300 text-xs rounded-lg text-center"
            >
              Contact Research Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
