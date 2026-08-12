export type InvestmentLevel = 'low' | 'medium' | 'high'; // low < 500k PKR, medium 500k-5M, high 5M+
export type RiskLevel = 'low' | 'medium' | 'high';
export type CompetitionLevel = 'low' | 'moderate' | 'high';
export type BusinessModelType = 'manufacturing' | 'trading' | 'service' | 'online' | 'home-based' | 'import-export';
export type MarketRegion = 'pakistan' | 'uae' | 'saudi-arabia' | 'gcc' | 'international';

export interface Author {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio: string;
  avatar: string;
  expertise: string[];
  articlesCount?: number;
  reportsCount?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  authorId: string;
  author?: Author;
  featuredImage: string;
  imageAlt: string;
  excerpt: string;
  content: string; // Markdown or rich HTML string
  seoTitle: string;
  metaDescription: string;
  tags: string[];
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  isPillar?: boolean;
  pillarParentSlug?: string;
  sources?: { title: string; url?: string; note?: string }[];
  faqs?: { question: string; answer: string }[];
  keyTakeaways?: string[];
  relatedOpportunityIds?: string[];
  relatedReportIds?: string[];
  relatedArticleSlugs?: string[];
  isFeatured?: boolean;
}

export interface BusinessOpportunity {
  id: string;
  name: string;
  slug: string;
  category: string;
  industry: string;
  region: MarketRegion;
  locationName: string; // e.g. "Lahore / Karachi / Gujranwala Industrial Zones"
  investmentLevel: InvestmentLevel;
  minCapitalPKR: number;
  maxCapitalPKR: number;
  businessModel: BusinessModelType;
  targetCustomer: string;
  requiredSkills: string[];
  equipmentNeeded: { item: string; approxCostPKR: number; source: string }[];
  salesChannels: string[];
  competitionLevel: CompetitionLevel;
  demandIndicator: 'High Demand' | 'Growing' | 'Stable' | 'Niche';
  riskLevel: RiskLevel;
  scalability: 'Local' | 'National' | 'Export Ready';
  complexity: 'Low' | 'Moderate' | 'High';
  paybackPeriodMonths: number;
  expectedProfitMarginPercent: number;
  description: string;
  executionSteps: { stepNumber: number; title: string; detail: string }[];
  relatedReportId?: string;
  relatedArticleSlug?: string;
  isFeatured?: boolean;
  publishedDate: string;
  updatedDate: string;
}

export interface MarketReport {
  id: string;
  title: string;
  slug: string;
  category: string;
  industry: string;
  region: MarketRegion;
  productOrSector: string;
  demandLevel: 'High' | 'Expanding' | 'Moderate' | 'Seasonal';
  marketSizePKR?: string;
  marketSizeUSD?: string;
  lastUpdated: string;
  authorId: string;
  author?: Author;
  summary: string;
  // 15 Standard Sections
  executiveSummary: string;
  marketOverview: string;
  demandAnalysis: string;
  targetCustomers: string;
  competitorLandscape: string;
  pricingStructure: string;
  distributionChannels: string;
  supplyChain: string;
  importExportConsiderations: string;
  investmentRequirements: string;
  profitabilityFactors: string;
  risksAndMitigation: string;
  marketEntryStrategy: string;
  finalVerdict: {
    score: number; // out of 10
    verdictTitle: string;
    summary: string;
    suitableFor: string[];
  };
  faqs: { question: string; answer: string }[];
  dataTables?: { title: string; headers: string[]; rows: (string | number)[][] }[];
  chartData?: { name: string; value: number; secondaryValue?: number }[];
  sources: { title: string; publisher: string; year: string; isEstimate?: boolean }[];
  relatedOpportunityIds?: string[];
  relatedArticleSlugs?: string[];
  isFeatured?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Software' | 'Hosting' | 'Accounting' | 'E-commerce' | 'Customs & Trade' | 'Machinery' | 'Marketing';
  description: string;
  link: string;
  affiliateBadge?: string;
  rating: number;
  isRecommended?: boolean;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  businessType: string;
  requirement: 'Supplier Inquiry' | 'Buyer Inquiry' | 'Market Research Service' | 'Machinery Sourcing' | 'Export Mentorship' | 'Other';
  budgetRange: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'In Progress' | 'Contacted';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed';
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  showAdSensePreview: boolean;
  showAffiliateDisclosure: boolean;
  defaultRegion: MarketRegion;
  contactEmail: string;
  currencySymbol: string;
}
