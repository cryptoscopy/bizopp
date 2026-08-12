import React, { useState, useEffect } from 'react';
import { MarketRegion } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { LeadModal } from './components/common/LeadModal';

import { HomeView } from './components/views/HomeView';
import { OpportunitiesView } from './components/views/OpportunitiesView';
import { OpportunityDetailView } from './components/views/OpportunityDetailView';
import { MarketResearchView } from './components/views/MarketResearchView';
import { MarketReportDetailView } from './components/views/MarketReportDetailView';
import { ArticlesView } from './components/views/ArticlesView';
import { ArticleDetailView } from './components/views/ArticleDetailView';
import { AuthorsView } from './components/views/AuthorsView';
import { AuthorDetailView } from './components/views/AuthorDetailView';
import { ContactView } from './components/views/ContactView';
import { SubmitOpportunityView } from './components/views/SubmitOpportunityView';
import { TrustPagesView } from './components/views/TrustPagesView';
import { SitemapView } from './components/views/SitemapView';
import { AdminDashboard } from './components/views/AdminDashboard';

export function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [currentParam, setCurrentParam] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>('pakistan');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);

  // Scroll to top on navigation view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView, currentParam]);

  const handleNavigate = (view: string, param?: string) => {
    setActiveView(view);
    setCurrentParam(param || '');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView
            onNavigate={handleNavigate}
            selectedRegion={selectedRegion}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        );

      case 'opportunities':
        return (
          <OpportunitiesView
            onNavigate={handleNavigate}
            selectedRegion={selectedRegion}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        );

      case 'opportunity-detail':
        return (
          <OpportunityDetailView
            slug={currentParam}
            onNavigate={handleNavigate}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        );

      case 'market-research':
        return (
          <MarketResearchView
            onNavigate={handleNavigate}
            selectedRegion={selectedRegion}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        );

      case 'market-report-detail':
        return (
          <MarketReportDetailView
            slug={currentParam}
            onNavigate={handleNavigate}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        );

      case 'articles':
        return (
          <ArticlesView
            onNavigate={handleNavigate}
          />
        );

      case 'article-detail':
        return (
          <ArticleDetailView
            slug={currentParam}
            onNavigate={handleNavigate}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        );

      case 'category':
        return (
          <ArticlesView
            onNavigate={handleNavigate}
            selectedCategorySlug={currentParam}
          />
        );

      case 'authors':
        return <AuthorsView onNavigate={handleNavigate} />;

      case 'author':
        return <AuthorDetailView slug={currentParam} onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;

      case 'submit-opportunity':
        return <SubmitOpportunityView onNavigate={handleNavigate} />;

      case 'about':
        return <TrustPagesView type="about" onNavigate={handleNavigate} />;

      case 'editorial-policy':
        return <TrustPagesView type="editorial-policy" onNavigate={handleNavigate} />;

      case 'privacy-policy':
        return <TrustPagesView type="privacy-policy" onNavigate={handleNavigate} />;

      case 'terms':
        return <TrustPagesView type="terms" onNavigate={handleNavigate} />;

      case 'disclaimer':
        return <TrustPagesView type="disclaimer" onNavigate={handleNavigate} />;

      case 'sitemap':
        return <SitemapView onNavigate={handleNavigate} />;

      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;

      default:
        return (
          <HomeView
            onNavigate={handleNavigate}
            selectedRegion={selectedRegion}
            onOpenLeadModal={() => setIsLeadModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      <div>
        <Header
          activeView={activeView}
          onNavigate={handleNavigate}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />

        <main className="min-h-[70vh]">
          {renderActiveView()}
        </main>
      </div>

      <Footer
        onNavigate={handleNavigate}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />

      {/* Overlay Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
    </div>
  );
}

export default App;
