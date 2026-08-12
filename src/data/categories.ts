export interface CategoryDef {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories?: { name: string; slug: string }[];
  iconName: string;
}

export const MAIN_CATEGORIES: CategoryDef[] = [
  {
    id: 'business-ideas',
    name: 'Business Ideas',
    slug: 'business-ideas',
    description: 'Vetted, research-backed business concepts across manufacturing, trading, and services.',
    iconName: 'Lightbulb',
    subcategories: [
      { name: 'Low Investment (< 500k PKR)', slug: 'low-investment' },
      { name: 'Medium Investment (500k-5M PKR)', slug: 'medium-investment' },
      { name: 'High Investment (5M+ PKR)', slug: 'high-investment' },
      { name: 'Home-Based & Cottage', slug: 'home-based' },
      { name: 'Manufacturing & Assembly', slug: 'manufacturing' },
      { name: 'Trading & Wholesale', slug: 'trading' },
      { name: 'Service Businesses', slug: 'service-businesses' },
      { name: 'Online & E-commerce', slug: 'online-businesses' },
    ],
  },
  {
    id: 'market-research',
    name: 'Market Research',
    slug: 'market-research',
    description: 'In-depth market intelligence reports, product demand estimates, and competitor analysis.',
    iconName: 'BarChart3',
    subcategories: [
      { name: 'Product Demand', slug: 'product-demand' },
      { name: 'Customer Research', slug: 'customer-research' },
      { name: 'Competitor Research', slug: 'competitor-research' },
      { name: 'Pricing & Margins', slug: 'pricing-research' },
      { name: 'Industry Outlook', slug: 'industry-research' },
      { name: 'Export Market Research', slug: 'export-market-research' },
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Guides on setting up small factories, machinery sourcing, raw material supply, and costing.',
    iconName: 'Factory',
    subcategories: [
      { name: 'Machinery Sourcing', slug: 'machinery-sourcing' },
      { name: 'Cost & Margin Calculation', slug: 'cost-calculation' },
      { name: 'Quality Standards', slug: 'quality-standards' },
      { name: 'Factory Operations', slug: 'factory-operations' },
    ],
  },
  {
    id: 'import-export',
    name: 'Import & Export',
    slug: 'import-export',
    description: 'Cross-border trade, export corridors to GCC & West, customs documentation, and buyer sourcing.',
    iconName: 'Globe2',
    subcategories: [
      { name: 'Export Opportunities', slug: 'export-opportunities' },
      { name: 'Import Opportunities', slug: 'import-opportunities' },
      { name: 'Finding International Buyers', slug: 'international-buyers' },
      { name: 'Export Documentation & Compliance', slug: 'export-documentation' },
      { name: 'Logistics & Shipping', slug: 'logistics' },
      { name: 'Trade Fairs & Markets', slug: 'trade-markets' },
    ],
  },
  {
    id: 'e-commerce',
    name: 'E-commerce',
    slug: 'e-commerce',
    description: 'D2C brands, B2B wholesale portals, logistics integration, payment gateways, and marketplaces.',
    iconName: 'ShoppingCart',
    subcategories: [
      { name: 'D2C Brand Building', slug: 'd2c-brands' },
      { name: 'B2B Wholesale Portals', slug: 'b2b-wholesale' },
      { name: 'Payment Gateways & COD', slug: 'payment-gateways' },
      { name: 'Product Sourcing', slug: 'product-sourcing' },
    ],
  },
  {
    id: 'small-business',
    name: 'Small Business',
    slug: 'small-business',
    description: 'Practical management tools, working capital handling, staff hiring, and local regulations.',
    iconName: 'Store',
    subcategories: [
      { name: 'Working Capital Management', slug: 'working-capital' },
      { name: 'Taxation & FBR Compliance', slug: 'taxation-fbr' },
      { name: 'Local Business Licensing', slug: 'licensing' },
    ],
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    slug: 'entrepreneurship',
    description: 'Idea validation frameworks, risk assessment, investor pitch preparation, and growth strategies.',
    iconName: 'TrendingUp',
    subcategories: [
      { name: 'Idea Validation', slug: 'idea-validation' },
      { name: 'Financial Planning', slug: 'financial-planning' },
      { name: 'Risk Management', slug: 'risk-management' },
    ],
  },
  {
    id: 'ai-business',
    name: 'AI & Business',
    slug: 'ai-business',
    description: 'Practical deployment of AI tools for supply chain optimization, customer care, and cost reduction.',
    iconName: 'Cpu',
    subcategories: [
      { name: 'Operational AI Tools', slug: 'ai-tools' },
      { name: 'E-commerce AI Automation', slug: 'ai-ecommerce' },
      { name: 'Cost Reduction Case Studies', slug: 'cost-reduction' },
    ],
  },
  {
    id: 'pakistan-market',
    name: 'Pakistan Market',
    slug: 'pakistan-market',
    description: 'Regional dynamics across Punjab, Sindh, KPK, Balochistan, and industrial hubs like Gujranwala & Sialkot.',
    iconName: 'MapPin',
    subcategories: [
      { name: 'Gujranwala & Sialkot Hubs', slug: 'industrial-clusters' },
      { name: 'Karachi Wholesale Markets', slug: 'karachi-markets' },
      { name: 'Faisalabad Textile Zone', slug: 'faisalabad-textiles' },
    ],
  },
  {
    id: 'international-markets',
    name: 'International Markets',
    slug: 'international-markets',
    description: 'Emerging market intelligence for UAE, Saudi Arabia, Qatar, Oman, Afghanistan, and East Africa.',
    iconName: 'Compass',
    subcategories: [
      { name: 'UAE & Dubai Freezones', slug: 'uae-market' },
      { name: 'Saudi Arabia Vision 2030 Opportunities', slug: 'saudi-market' },
      { name: 'GCC Halal Trade Corridors', slug: 'gcc-trade' },
      { name: 'Central Asia & Transit Trade', slug: 'central-asia' },
    ],
  },
];

export const REGIONS_DEF = [
  { id: 'pakistan', name: 'Pakistan 🇵🇰', flag: '🇵🇰', label: 'Pakistan Market' },
  { id: 'uae', name: 'UAE 🇦🇪', flag: '🇦🇪', label: 'United Arab Emirates' },
  { id: 'saudi-arabia', name: 'Saudi Arabia 🇸🇦', flag: '🇸🇦', label: 'Saudi Arabia' },
  { id: 'gcc', name: 'GCC Region 🇸🇦🇦🇪', flag: '🌐', label: 'Gulf Cooperation Council' },
  { id: 'international', name: 'International / Export 🌍', flag: '🌍', label: 'Global / Export' },
];
