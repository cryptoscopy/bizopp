import { Author } from '../types';

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'author-tariq-malik',
    name: 'Tariq Malik',
    slug: 'tariq-malik',
    title: 'Senior Industrial Research Analyst & Machinery Specialist',
    bio: 'Tariq has over 14 years of hands-on experience evaluating small manufacturing units, machinery procurement from China and Turkey, and cost-accounting for engineering enterprises across Punjab industrial estates.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    expertise: ['Manufacturing Sourcing', 'Engineering Costing', 'Gujranwala/Sialkot Clusters', 'Equipment ROI'],
    articlesCount: 12,
    reportsCount: 5,
  },
  {
    id: 'author-ayesha-siddiqui',
    name: 'Ayesha Siddiqui',
    slug: 'ayesha-siddiqui',
    title: 'International Trade Analyst & GCC Export Consultant',
    bio: 'Specializing in South Asia to Middle East trade corridors, Ayesha advises SMEs on GCC import regulations, WebOC documentation, phytosanitary compliance, and buyer outreach in Dubai & Riyadh.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    expertise: ['GCC Trade Regulations', 'Agri & Food Exports', 'WebOC Customs', 'Buyer Matchmaking'],
    articlesCount: 9,
    reportsCount: 6,
  },
  {
    id: 'author-hamza-khan',
    name: 'Hamza Khan',
    slug: 'hamza-khan',
    title: 'E-commerce Supply Chain & FMCG Market Lead',
    bio: 'Hamza focuses on local sourcing networks, D2C cash-on-delivery economics, and unit economics for consumer products in Pakistan and regional emerging markets.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    expertise: ['D2C Economics', 'Cash on Delivery Logistics', 'FMCG Wholesale Sourcing', 'AI in Retail'],
    articlesCount: 11,
    reportsCount: 4,
  },
];

export const AUTHORS = INITIAL_AUTHORS;

