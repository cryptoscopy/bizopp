export interface InvestmentTier {
  id: string;
  slug: string;
  title: string;
  pkLabel: string;
  minPKR: number;
  maxPKR: number;
  usdEquivalent: string;
  summary: string;
  suitableModels: string[];
  keyFinancialAdvice: string[];
  seoTitle: string;
  metaDescription: string;
}

export const INVESTMENT_TIERS: InvestmentTier[] = [
  {
    id: 'inv-under-500k',
    slug: 'under-500k',
    title: 'Business Ideas Under PKR 5 Lakh',
    pkLabel: 'Under PKR 5 Lakh (500,000)',
    minPKR: 50000,
    maxPKR: 500000,
    usdEquivalent: '$180 - $1,800 USD',
    summary: 'Low-capital micro ventures, specialized B2B services, diagnostic testing, and digital/home-based agency models that require minimal fixed equipment outlay.',
    suitableModels: [
      'Solar Panel Cleaning & Thermal Hotspot Auditing',
      'Home-Based Herbal Extract & Botanical Cosmetics Packing',
      'Specialized Sub-Contract Stator Coil Winding Service',
      'Digital B2B Sourcing & Export Brokerage'
    ],
    keyFinancialAdvice: [
      'Allocate 70% of budget to customer acquisition and initial working capital rather than expensive office/shop rents.',
      'Operate from low-cost workshop sheds or shared spaces during the first 6 months.',
      'Maintain strict 100% cash-on-delivery or 50% advance payment terms to prevent cashflow locks.'
    ],
    seoTitle: 'Business Ideas Under 5 Lakh PKR in Pakistan (2026 Feasibility)',
    metaDescription: 'Discover realistic low-investment business ideas under PKR 5 Lakh in Pakistan with exact equipment costs, profit margins, and ROI.',
  },
  {
    id: 'inv-500k-to-1m',
    slug: '500k-to-1m',
    title: 'Business Ideas PKR 5 Lakh to 10 Lakh',
    pkLabel: 'PKR 5 Lakh to 10 Lakh (500k - 1M)',
    minPKR: 500000,
    maxPKR: 1000000,
    usdEquivalent: '$1,800 - $3,600 USD',
    summary: 'Small machinery setups, specialized workshop tooling, food cleaning & spice packing, and local distribution agencies.',
    suitableModels: [
      'Small Spice Cleaning, Grinding & Pouch Packaging Unit',
      'Auto Spare Parts Diagnostic & Battery Service Station',
      'Herbal & Organic Cosmetic Formulation & Bottling',
      'Custom Die-Cut E-commerce Box Converting Workshop'
    ],
    keyFinancialAdvice: [
      'Procure high-quality local Pakistani machinery (from Gujranwala or Lahore) to avoid expensive import duties on basic equipment.',
      'Ensure 30-day raw material inventory buffer to safeguard against local inflation spikes.'
    ],
    seoTitle: 'Business Ideas Between 5 Lakh and 10 Lakh PKR in Pakistan (2026)',
    metaDescription: 'Detailed feasibility guides for starting small manufacturing and trading businesses with 5 to 10 Lakh PKR in Pakistan.',
  },
  {
    id: 'inv-1m-to-2m',
    slug: '1m-to-2m',
    title: 'Business Ideas PKR 10 Lakh to 20 Lakh',
    pkLabel: 'PKR 10 Lakh to 20 Lakh (1M - 2M / 10 to 20 Lakh)',
    minPKR: 1000000,
    maxPKR: 2000000,
    usdEquivalent: '$3,600 - $7,200 USD',
    summary: 'Semi-automated component assembly, value-added agri-processing, small corrugated box printing, and wholesale trading stocks.',
    suitableModels: [
      'Small Corrugated Box & Mailer Converting Unit',
      'Vacuum-Packed Spices & Grain Cleaning Export Setup',
      'Electric Motor Stator Pressing & Assembly Workshop',
      'Hardware & Fastener Wholesale Stock Distributorship'
    ],
    keyFinancialAdvice: [
      'Incorporate a single-member private limited company (SMC-Pvt Ltd) with SECP for formal corporate B2B invoicing.',
      'Register for Sales Tax (STRN) to sell directly to medium Tier-2 corporate buyers.'
    ],
    seoTitle: 'Business Ideas Between 10 Lakh and 20 Lakh PKR in Pakistan',
    metaDescription: 'Feasibility reports for PKR 10 to 20 Lakh business ideas in Pakistan including machinery breakdown, profit margins, and setup steps.',
  },
  {
    id: 'inv-2m-to-5m',
    slug: '2m-to-5m',
    title: 'Business Ideas PKR 20 Lakh to 50 Lakh',
    pkLabel: 'PKR 20 Lakh to 50 Lakh (2M - 5M / 20 to 50 Lakh)',
    minPKR: 2000000,
    maxPKR: 5000000,
    usdEquivalent: '$7,200 - $18,000 USD',
    summary: 'Full semi-automated manufacturing setups, motor assembly lines, EV rickshaw assembly workshops, and direct export houses.',
    suitableModels: [
      'Washing Machine & Appliance Electric Motor Assembly Plant',
      'Denim Garment Manufacturing & Export Trading House',
      'EV Rickshaw Battery Swapping & Retrofitting Station',
      'B2B Machinery Hardware & Industrial Consumables Stockist'
    ],
    keyFinancialAdvice: [
      'Install commercial rooftop solar PV (15kW–25kW) to cut factory electricity expenses by 40–60%.',
      'Structure supply contracts with 30% advance + 70% post-dated checks (PDC) framework.'
    ],
    seoTitle: 'Business Ideas Between 20 Lakh and 50 Lakh PKR in Pakistan',
    metaDescription: 'Explore high-margin manufacturing, motor winding, and export ventures between PKR 20 Lakh and 50 Lakh in Pakistan.',
  },
  {
    id: 'inv-5m-to-10m',
    slug: '5m-to-10m',
    title: 'Business Ideas PKR 50 Lakh to 1 Crore',
    pkLabel: 'PKR 50 Lakh to 1 Crore (5M - 10M / 50 Lakh to 1 Crore)',
    minPKR: 5000000,
    maxPKR: 10000000,
    usdEquivalent: '$18,000 - $36,000 USD',
    summary: 'Automated corrugated board converting plants, food export cleaning facilities with laboratory testing, and high-capacity assembly plants.',
    suitableModels: [
      'Automatic Corrugated Box Converting & Die-Cutting Plant',
      'SFDA-Compliant Gulf Spice & Food Grain Export Facility',
      'Industrial Plastic Injection Molding Unit (150-250 Ton Press)'
    ],
    keyFinancialAdvice: [
      'Apply for SBP subsidized Refinance Facility for Modernization of SMEs where applicable.',
      'Obtain ISO 9001 and HACCP certifications to bid on Tier-1 multinational contracts.'
    ],
    seoTitle: 'Business Ideas Between 50 Lakh and 1 Crore PKR in Pakistan',
    metaDescription: 'Manufacturing and industrial business setup guides for 50 Lakh to 1 Crore PKR investment in Pakistan.',
  },
  {
    id: 'inv-10m-to-50m',
    slug: '10m-to-50m',
    title: 'Business Ideas PKR 1 Crore to 5 Crore',
    pkLabel: 'PKR 1 Crore to 5 Crore (10M - 50M)',
    minPKR: 10000000,
    maxPKR: 50000000,
    usdEquivalent: '$36,000 - $180,000 USD',
    summary: 'Medium-scale industrial manufacturing, complete EV assembly facilities, pharmaceutical packaging converting mills, and solar distribution centers.',
    suitableModels: [
      'Full EV 3-Wheeler Chassis & Motor Assembly Line',
      'High-Speed Automatic Paper Fluting & Corrugated Mill',
      'Export Meat Processing & Cold Storage Chain Facility'
    ],
    keyFinancialAdvice: [
      'Locate inside designated Special Economic Zones (SEZs) or Industrial Estates for tax concessions and dedicated grid power feeders.',
      'Employ dedicated chartered cost accountants to optimize scrap recovery and raw material yield.'
    ],
    seoTitle: 'Business Ideas Between 1 Crore and 5 Crore PKR in Pakistan',
    metaDescription: 'Medium industrial factory setup and export plant feasibility guides for PKR 1 Crore to 5 Crore in Pakistan.',
  },
  {
    id: 'inv-50m-plus',
    slug: '50m-plus',
    title: 'Business Ideas Over PKR 5 Crore (50M+)',
    pkLabel: 'PKR 5 Crore+ (50M+ / 50 Million PKR+)',
    minPKR: 50000000,
    maxPKR: 500000000,
    usdEquivalent: '$180,000 USD+',
    summary: 'Large-scale industrial import substitution plants, copper wire drawing mills, silicon steel lamination pressing plants, and integrated agri export complexes.',
    suitableModels: [
      'Enameled Copper Wire Drawing & Enameling Plant',
      'Silicon Steel Lamination Stator Stamping Factory',
      'Integrated Solar Module Assembly & Testing Facility'
    ],
    keyFinancialAdvice: [
      'Structure project financing with syndicate commercial banks or venture capital equity partners.',
      'Secure long-term raw material supply contracts linked to global metal exchange benchmarks.'
    ],
    seoTitle: 'Industrial Manufacturing Business Ideas Above 5 Crore PKR in Pakistan',
    metaDescription: 'Large scale industrial setup, import substitution, and factory feasibility guides above 5 Crore PKR in Pakistan.',
  }
];
