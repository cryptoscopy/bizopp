import { Article, BusinessOpportunity, MarketReport, Author, LeadSubmission, NewsletterSubscriber, SiteSettings } from '../types';
import { INITIAL_ARTICLES } from '../data/articles';
import { INITIAL_OPPORTUNITIES } from '../data/opportunities';
import { INITIAL_MARKET_REPORTS } from '../data/marketReports';
import { INITIAL_AUTHORS } from '../data/authors';

const STORAGE_KEYS = {
  ARTICLES: 'boh_cms_articles',
  OPPORTUNITIES: 'boh_cms_opportunities',
  MARKET_REPORTS: 'boh_cms_market_reports',
  AUTHORS: 'boh_cms_authors',
  LEADS: 'boh_cms_leads',
  SUBSCRIBERS: 'boh_cms_subscribers',
  SETTINGS: 'boh_cms_settings',
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'Business Opportunity Hub',
  tagline: 'Practical Ideas. Real Markets. Better Business Decisions.',
  showAdSensePreview: true,
  showAffiliateDisclosure: true,
  defaultRegion: 'pakistan',
  contactEmail: 'research@businessopportunityhub.com',
  currencySymbol: 'PKR',
};

// Helper for local storage
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage:`, e);
  }
}

export class CMSStore {
  // Getters
  static getArticles(): Article[] {
    const articles = getStored<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
    const authors = this.getAuthors();
    return articles.map(art => ({
      ...art,
      author: authors.find(a => a.id === art.authorId) || authors[0],
    }));
  }

  static getOpportunities(): BusinessOpportunity[] {
    return getStored<BusinessOpportunity[]>(STORAGE_KEYS.OPPORTUNITIES, INITIAL_OPPORTUNITIES);
  }

  static getMarketReports(): MarketReport[] {
    const reports = getStored<MarketReport[]>(STORAGE_KEYS.MARKET_REPORTS, INITIAL_MARKET_REPORTS);
    const authors = this.getAuthors();
    return reports.map(rep => ({
      ...rep,
      author: authors.find(a => a.id === rep.authorId) || authors[0],
    }));
  }

  static getAuthors(): Author[] {
    return getStored<Author[]>(STORAGE_KEYS.AUTHORS, INITIAL_AUTHORS);
  }

  static getLeads(): LeadSubmission[] {
    return getStored<LeadSubmission[]>(STORAGE_KEYS.LEADS, [
      {
        id: 'lead-1',
        name: 'Usman Ali',
        email: 'usman.ali@example.com',
        phone: '+92 300 5551234',
        country: 'Pakistan',
        businessType: 'Appliance Assembler',
        requirement: 'Machinery Sourcing',
        budgetRange: 'PKR 2.5M - 5M',
        message: 'Looking for automatic copper winding machinery suppliers in Gujranwala or China import options.',
        submittedAt: '2026-03-01 14:30',
        status: 'New',
      },
    ]);
  }

  static getSubscribers(): NewsletterSubscriber[] {
    return getStored<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, [
      { id: 'sub-1', email: 'investor@faisalabadtextile.com', subscribedAt: '2026-02-20', status: 'Active' },
      { id: 'sub-2', email: 'trade.buyer@dubai-food.ae', subscribedAt: '2026-02-28', status: 'Active' },
    ]);
  }

  static getSettings(): SiteSettings {
    return getStored<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  // Setters / Actions
  static saveArticle(article: Article): void {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
      articles[index] = article;
    } else {
      articles.unshift(article);
    }
    setStored(STORAGE_KEYS.ARTICLES, articles);
  }

  static deleteArticle(id: string): void {
    const articles = this.getArticles().filter(a => a.id !== id);
    setStored(STORAGE_KEYS.ARTICLES, articles);
  }

  static saveOpportunity(opportunity: BusinessOpportunity): void {
    const opps = this.getOpportunities();
    const index = opps.findIndex(o => o.id === opportunity.id);
    if (index >= 0) {
      opps[index] = opportunity;
    } else {
      opps.unshift(opportunity);
    }
    setStored(STORAGE_KEYS.OPPORTUNITIES, opps);
  }

  static deleteOpportunity(id: string): void {
    const opps = this.getOpportunities().filter(o => o.id !== id);
    setStored(STORAGE_KEYS.OPPORTUNITIES, opps);
  }

  static saveMarketReport(report: MarketReport): void {
    const reports = this.getMarketReports();
    const index = reports.findIndex(r => r.id === report.id);
    if (index >= 0) {
      reports[index] = report;
    } else {
      reports.unshift(report);
    }
    setStored(STORAGE_KEYS.MARKET_REPORTS, reports);
  }

  static deleteMarketReport(id: string): void {
    const reports = this.getMarketReports().filter(r => r.id !== id);
    setStored(STORAGE_KEYS.MARKET_REPORTS, reports);
  }

  static addLead(lead: Omit<LeadSubmission, 'id' | 'submittedAt' | 'status'>): LeadSubmission {
    const leads = this.getLeads();
    const newLead: LeadSubmission = {
      ...lead,
      id: `lead-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
    };
    leads.unshift(newLead);
    setStored(STORAGE_KEYS.LEADS, leads);
    return newLead;
  }

  static addSubscriber(email: string): boolean {
    const subs = this.getSubscribers();
    if (subs.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return false; // Already subscribed
    }
    subs.unshift({
      id: `sub-${Date.now()}`,
      email: email.trim(),
      subscribedAt: new Date().toISOString().substring(0, 10),
      status: 'Active',
    });
    setStored(STORAGE_KEYS.SUBSCRIBERS, subs);
    return true;
  }

  static saveSettings(settings: SiteSettings): void {
    setStored(STORAGE_KEYS.SETTINGS, settings);
  }

  static resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.OPPORTUNITIES);
    localStorage.removeItem(STORAGE_KEYS.MARKET_REPORTS);
    localStorage.removeItem(STORAGE_KEYS.AUTHORS);
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.SUBSCRIBERS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  }
}
