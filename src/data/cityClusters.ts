export interface CityCluster {
  id: string;
  name: string;
  slug: string;
  province: string;
  tagline: string;
  description: string;
  primaryIndustries: string[];
  keyWholesaleMarkets: string[];
  powerAndInfraNote: string;
  keyAdvantages: string[];
  seoTitle: string;
  metaDescription: string;
  featuredOpportunityIds: string[];
}

export const CITY_CLUSTERS: CityCluster[] = [
  {
    id: 'city-gujranwala',
    name: 'Gujranwala',
    slug: 'gujranwala',
    province: 'Punjab',
    tagline: 'Engineering, Appliance Motors, Plastics & Utensils Manufacturing Hub',
    description: 'Gujranwala is the industrial heartland of small engineering enterprises in Pakistan. Known for washing machine motor winding, electric fans, sanitary fittings, aluminum utensils, and plastic injection molding, Gujranwala offers an unmatched ecosystem of lathe craftsmen, die-makers, and raw material wholesale markets.',
    primaryIndustries: [
      'Washing Machine & Fan Motor Winding',
      'Plastic Injection Molding & Household Items',
      'Sanitary Fittings & Brass Processing',
      'Aluminum Utensils & Pressure Cookers',
      'Rice Processing & Agri Machinery'
    ],
    keyWholesaleMarkets: [
      'Gondlanwala Road Industrial Cluster',
      'G.T. Road Machinery & Machine Tools Market',
      'Small Industrial Estate I, II & III',
      'Climaxabad Electrical & Motor Area'
    ],
    powerAndInfraNote: 'GEPCO commercial 3-phase grid infrastructure with active industrial estate feeder lines. Commercial solar PV adoption is expanding across industrial sheds.',
    keyAdvantages: [
      'Access to highly experienced die-makers, lathe operators, and foundry molders.',
      'Raw material availability: Enameled copper wire, silicon steel sheets, aluminum ingots, PP granules.',
      'Low factory shed rental costs compared to Lahore or Karachi.'
    ],
    seoTitle: 'Gujranwala Manufacturing Opportunities & Industrial Cluster Guide (2026)',
    metaDescription: 'Explore small factory setup, motor winding, plastic molding, and manufacturing business opportunities in Gujranwala, Pakistan.',
    featuredOpportunityIds: ['opp-washing-machine-motor', 'opp-ev-rickshaw-assembly-battery-swapping', 'opp-corrugated-box-packaging']
  },
  {
    id: 'city-gujrat',
    name: 'Gujrat',
    slug: 'gujrat',
    province: 'Punjab',
    tagline: 'Electric Fan Capital & Ceramics Manufacturing Center',
    description: 'Gujrat is Pakistan’s renowned electric fan manufacturing capital, producing over 80% of domestic ceiling, pedestal, and exhaust fans. The city also hosts major ceramic tile, pottery, and furniture clusters.',
    primaryIndustries: [
      'Electric Fan Manufacturing & Stator Winding',
      'Ceramic Tiles & Sanitary Ware',
      'Wood Furniture & Interior Craftsmanship',
      'Light Engineering & Electrical Components'
    ],
    keyWholesaleMarkets: [
      'Small Industrial Estate Gujrat',
      'G.T. Road Electrical Market',
      'Sargodha Road Ceramics Zone'
    ],
    powerAndInfraNote: 'Served by GEPCO distribution network with dedicated industrial feeders.',
    keyAdvantages: [
      'Specialized electric motor & fan stator winding supply chain.',
      'Strong export history to GCC, Africa, and Central Asia.',
      'Established testing standards for electrical safety and airflow efficiency.'
    ],
    seoTitle: 'Gujrat Fan & Ceramics Manufacturing Business Opportunities (2026)',
    metaDescription: 'Discover business ideas, factory setup guides, and electrical component manufacturing opportunities in Gujrat, Pakistan.',
    featuredOpportunityIds: ['opp-washing-machine-motor', 'opp-solar-maintenance-service']
  },
  {
    id: 'city-sialkot',
    name: 'Sialkot',
    slug: 'sialkot',
    province: 'Punjab',
    tagline: 'World-Renowned Surgical Instruments, Sports Goods & Leather Export City',
    description: 'Sialkot is Pakistan’s premier export city, generating over $2.5 Billion in foreign exchange through surgical instruments, FIFA-grade match soccer balls, leather apparel, and stainless steel cutlery.',
    primaryIndustries: [
      'AISI 304/316 Stainless Steel Surgical Instruments',
      'Sports Goods, Thermo-Bonded Soccer Balls & Martial Arts Wear',
      'Leather Garments & Motorbike Gloves',
      'Stainless Steel Cutlery & Tableware'
    ],
    keyWholesaleMarkets: [
      'Sialkot Export Processing Zone (EPZ)',
      'Small Industrial Estate Sialkot',
      'Kashmir Road Surgical Market',
      'Daska Road Engineering Cluster'
    ],
    powerAndInfraNote: 'Privately managed Sialkot International Airport (SIAL) and dry port facilities streamline international air and sea freight logistics.',
    keyAdvantages: [
      'Direct exposure to international buyers and ISO/CE/FDA compliance standards.',
      'World-class stainless steel forging, heat treatment, and electro-polishing units.',
      'Robust culture of export entrepreneurship and private infrastructure.'
    ],
    seoTitle: 'Sialkot Export Manufacturing & Business Opportunities Guide (2026)',
    metaDescription: 'Detailed feasibility and export guides for surgical instruments, leather goods, sports apparel, and stainless steel manufacturing in Sialkot.',
    featuredOpportunityIds: ['opp-corrugated-box-packaging', 'opp-denim-garments-trading-export']
  },
  {
    id: 'city-lahore',
    name: 'Lahore',
    slug: 'lahore',
    province: 'Punjab',
    tagline: 'Commercial, Software, Chemical & FMCG Enterprise Capital',
    description: 'Lahore is Punjab’s economic center, hosting massive industrial estates (Sundar, Kot Lakhpat, Quaid-e-Azam) alongside tech, commercial B2B wholesale markets, and pharmaceutical packaging clusters.',
    primaryIndustries: [
      'FMCG Food Processing & Packaging',
      'Pharmaceuticals & Medical Supplies',
      'D2C E-commerce Brands & Software Services',
      'Paper Converting & Corrugated Packaging',
      'Chemicals & Plastic Polymers'
    ],
    keyWholesaleMarkets: [
      'Brandreth Road Machine Tools & Hardware Bazaar',
      'Shah Alam Market (Shaalmi) Consumer Wholesale',
      'Urdu Bazaar Packaging & Printing Market',
      'Sundar Industrial Estate & Kot Lakhpat Estate'
    ],
    powerAndInfraNote: 'LESCO industrial feeders with high net-metering solar adoption across Sundar and Quaid-e-Azam industrial parks.',
    keyAdvantages: [
      'Largest consumer market in Punjab for D2C brand launches.',
      'Central logistics hub for inter-city cargo transit across Pakistan.',
      'Proximity to top engineering and software talent.'
    ],
    seoTitle: 'Lahore Business Opportunities, Factory Setup & Wholesale Guide (2026)',
    metaDescription: 'Explore business ideas in Lahore: manufacturing, packaging converting, e-commerce brands, and wholesale distribution.',
    featuredOpportunityIds: ['opp-corrugated-box-packaging', 'opp-solar-maintenance-service', 'opp-b2b-hardware-wholesale', 'opp-herbal-extract-cosmetics']
  },
  {
    id: 'city-faisalabad',
    name: 'Faisalabad',
    slug: 'faisalabad',
    province: 'Punjab',
    tagline: 'Manchester of Pakistan — Textile, Weaving, Apparel & Agri Processing Hub',
    description: 'Faisalabad is the engine of Pakistan’s textile industry, producing denim, bedwear, knitwear, and yarn. It also hosts major corrugated packaging factories and agricultural processing plants.',
    primaryIndustries: [
      'Power Loom & Air-Jet Fabric Weaving',
      'Denim Garments & Knitwear Stitching',
      'Yarn Dyeing & Textile Chemicals',
      'Corrugated Carton Packaging Converting',
      'Agri & Grain Mill Machinery'
    ],
    keyWholesaleMarkets: [
      'Mian Channu & Faisalabad Grain Mandi',
      'Clock Tower Wholesale Cloth Bazaars',
      'Value Addition City & FIEDMC Industrial Zone',
      'Sargodha Road Industrial Area'
    ],
    powerAndInfraNote: 'FESCO commercial industrial tariffs; FIEDMC industrial city provides state-of-the-art power grid infrastructure.',
    keyAdvantages: [
      'Unmatched raw material cotton yarn and fabric availability at lowest national cost.',
      'Skilled textile stitching, washing, and loom maintenance labor force.',
      'Direct highway links to M-2 and M-4 motorways for freight transport.'
    ],
    seoTitle: 'Faisalabad Textile & Manufacturing Business Opportunities (2026)',
    metaDescription: 'Start a business in Faisalabad: denim garment sourcing, textile weaving, corrugated packaging, and agri-processing.',
    featuredOpportunityIds: ['opp-denim-garments-trading-export', 'opp-corrugated-box-packaging', 'opp-ev-rickshaw-assembly-battery-swapping']
  },
  {
    id: 'city-karachi',
    name: 'Karachi',
    slug: 'karachi',
    province: 'Sindh',
    tagline: 'Economic Metropolis, Sea Ports & Mega Wholesale Trade Center',
    description: 'Karachi handles over 85% of Pakistan’s international trade through Karachi Port and Port Qasim. It houses massive industrial estates (SITE, Korangi, Landhi, Federal B Area) and major B2B wholesale markets.',
    primaryIndustries: [
      'International Import & Export Shipping',
      'Chemicals, Polymers & Plastic Raw Materials',
      'Pharmaceuticals & Halal Food Processing',
      'Steel Rolling Mills & Auto Parts',
      'Mega B2B Wholesale Distribution'
    ],
    keyWholesaleMarkets: [
      'Marriot Road Hardware & Chemical Market',
      'Jodia Bazaar Agri Commodity & Food Wholesale',
      'Plaza Market Auto & Spare Parts',
      'Port Qasim & Korangi Industrial Zones'
    ],
    powerAndInfraNote: 'K-Electric industrial tariff network and independent captive power plants across Port Qasim and SITE.',
    keyAdvantages: [
      'Direct access to sea container ports for lowest freight import/export costs.',
      'Nation’s largest B2B commodity and raw material wholesale markets.',
      'Population base of 20M+ for immediate D2C consumer product launches.'
    ],
    seoTitle: 'Karachi Business Opportunities, Import/Export & Manufacturing (2026)',
    metaDescription: 'Find business opportunities in Karachi: import-export, agri-food packaging, industrial hardware distribution, and manufacturing.',
    featuredOpportunityIds: ['opp-spices-agri-processing-export', 'opp-b2b-hardware-wholesale', 'opp-solar-maintenance-service', 'opp-corrugated-box-packaging']
  },
  {
    id: 'city-multan',
    name: 'Multan',
    slug: 'multan',
    province: 'Punjab',
    tagline: 'Agri-Processing, Mangoes, Cotton & Southern Punjab Trade Hub',
    description: 'Multan is the economic pivot of Southern Punjab, famous for high-grade cotton, mangoes, citrus, and expanding agri-processing industries.',
    primaryIndustries: ['Agri-Processing & Cold Storage', 'Fertilizer & Pesticide Distribution', 'Cotton Ginning & Oil Mills', 'Herbal Extracts & Handicrafts'],
    keyWholesaleMarkets: ['Multan Industrial Estate Phase I & II', 'Galla Mandi Multan', 'Vehari Road Trade Hub'],
    powerAndInfraNote: 'MEPCO power grid with agricultural and industrial estate feeders.',
    keyAdvantages: ['Abundant raw agricultural produce at farm-gate prices.', 'Strategic location connecting Punjab, Sindh, and Balochistan trade corridors.'],
    seoTitle: 'Multan Agri-Processing & Business Opportunities Guide (2026)',
    metaDescription: 'Agri-processing, cold storage, and manufacturing business opportunities in Multan, Pakistan.',
    featuredOpportunityIds: ['opp-spices-agri-processing-export', 'opp-herbal-extract-cosmetics']
  },
  {
    id: 'city-peshawar',
    name: 'Peshawar',
    slug: 'peshawar',
    province: 'Khyber Pakhtunkhwa',
    tagline: 'KPK Gateway for Transit Trade, Minerals & Spices',
    description: 'Peshawar is KPK’s capital and primary commercial trading hub, playing a central role in Central Asian transit trade, mineral processing, and regional spices.',
    primaryIndustries: ['Transit Trade & Logistics', 'Marble & Gemstone Processing', 'Spices & Dry Fruits Packaging', 'Light Engineering & Fabrication'],
    keyWholesaleMarkets: ['Hayatabad Industrial Estate', 'Karkhano Market', 'G.T. Road Wholesale Hub'],
    powerAndInfraNote: 'PESCO industrial grid infrastructure.',
    keyAdvantages: ['Strategic gateway for Afghanistan and Central Asian Republic (CAR) export trade.'],
    seoTitle: 'Peshawar Business Opportunities & Transit Trade Guide (2026)',
    metaDescription: 'Explore transit trade, mineral processing, and business ideas in Peshawar, KPK.',
    featuredOpportunityIds: ['opp-herbal-extract-cosmetics', 'opp-spices-agri-processing-export']
  },
  {
    id: 'city-islamabad-rawalpindi',
    name: 'Islamabad / Rawalpindi',
    slug: 'islamabad-rawalpindi',
    province: 'Federal Capital / Punjab',
    tagline: 'Technology, Corporate Services, Real Estate & Commercial Hub',
    description: 'The twin cities offer high purchasing power, corporate headquarters, technology services, and commercial trading hubs.',
    primaryIndustries: ['Software & IT Services', 'Corporate Consultancy & Legal Desk', 'Real Estate & Construction', 'Light Assembly & Commercial Plazas'],
    keyWholesaleMarkets: ['I-9 & I-10 Industrial Area Islamabad', 'Raja Bazaar Rawalpindi', 'Blue Area Commercial Hub'],
    powerAndInfraNote: 'IESCO power grid with reliable commercial sector uptime.',
    keyAdvantages: ['Highest average household income and corporate density in Northern Pakistan.'],
    seoTitle: 'Islamabad & Rawalpindi Business Opportunities Guide (2026)',
    metaDescription: 'Discover business ideas in Islamabad and Rawalpindi: tech, solar maintenance, and commercial services.',
    featuredOpportunityIds: ['opp-solar-maintenance-service', 'opp-b2b-hardware-wholesale']
  }
];
