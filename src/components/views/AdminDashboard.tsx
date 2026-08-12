import React, { useState } from 'react';
import { CMSStore } from '../../services/cmsStore';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { SEOMeta } from '../common/SEOMeta';
import {
  Settings,
  Database,
  Users,
  Mail,
  Lightbulb,
  BarChart3,
  FileText,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'subscribers' | 'opps' | 'reports' | 'settings'>('leads');

  const [leads, setLeads] = useState(CMSStore.getLeads());
  const [subscribers, setSubscribers] = useState(CMSStore.getSubscribers());
  const [opps, setOpps] = useState(CMSStore.getOpportunities());
  const [reports, setReports] = useState(CMSStore.getMarketReports());
  const [siteSettings, setSiteSettings] = useState(CMSStore.getSettings());

  // Quick form state for new opportunity
  const [newOppName, setNewOppName] = useState('');
  const [newOppCat, setNewOppCat] = useState('Manufacturing');
  const [newOppCapital, setNewOppCapital] = useState(1500000);

  const handleCreateOpp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOppName.trim()) return;

    const created = CMSStore.addOpportunity({
      id: `opp-${Date.now()}`,
      slug: newOppName.toLowerCase().replace(/[^a-z0-0]+/g, '-'),
      name: newOppName,
      category: newOppCat,
      industry: newOppCat,
      region: 'pakistan',
      locationName: 'Pakistan Industrial Estates',
      investmentLevel: 'medium',
      minCapitalPKR: newOppCapital,
      maxCapitalPKR: newOppCapital * 1.5,
      businessModel: 'manufacturing',
      targetCustomer: 'B2B Wholesale Distributors',
      requiredSkills: ['Quality Control', 'Basic Accounting'],
      equipmentNeeded: [{ item: 'Standard Assembly Machine', approxCostPKR: newOppCapital * 0.6, source: 'Gujranwala Dealer' }],
      salesChannels: ['Direct Wholesale', 'Online Catalog'],
      competitionLevel: 'medium',
      demandIndicator: 'Expanding',
      riskLevel: 'medium',
      scalability: 'High',
      complexity: 'Medium',
      expectedProfitMarginPercent: 25,
      paybackPeriodMonths: 14,
      description: `Vetted feasibility model for ${newOppName}. High market demand across SME distribution networks.`,
      executionSteps: [
        { stepNumber: 1, title: 'Procure Machinery', detail: 'Source machines from Gujranwala dealers.' },
        { stepNumber: 2, title: 'Setup Factory Unit', detail: 'Lease 1000 sq ft industrial hall.' },
      ],
      isFeatured: true,
    });

    setOpps(CMSStore.getOpportunities());
    setNewOppName('');
  };

  const handleDeleteOpp = (id: string) => {
    CMSStore.deleteOpportunity(id);
    setOpps(CMSStore.getOpportunities());
  };

  const handleToggleAdSense = () => {
    const updated = CMSStore.updateSettings({ showAdSensePreview: !siteSettings.showAdSensePreview });
    setSiteSettings(updated);
  };

  const handleReset = () => {
    if (confirm('Reset CMS database to factory defaults?')) {
      CMSStore.resetToDefaults();
      setLeads(CMSStore.getLeads());
      setSubscribers(CMSStore.getSubscribers());
      setOpps(CMSStore.getOpportunities());
      setReports(CMSStore.getMarketReports());
      setSiteSettings(CMSStore.getSettings());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <SEOMeta title="CMS Admin & Lead Management | Business Opportunity Hub" description="Internal CMS Dashboard" />

      <Breadcrumbs items={[{ label: 'CMS Admin Center', active: true }]} onHomeClick={() => onNavigate('home')} />

      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-serif font-bold text-slate-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-400" />
            CMS Publishing & Lead Center
          </h1>
          <p className="text-xs text-slate-400">
            Manage incoming B2B buyer leads, subscriber newsletters, and directory content.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Database
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 ${
            activeTab === 'leads' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> B2B Leads ({leads.length})
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 ${
            activeTab === 'subscribers' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-4 h-4" /> Subscribers ({subscribers.length})
        </button>

        <button
          onClick={() => setActiveTab('opps')}
          className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 ${
            activeTab === 'opps' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4" /> Business Ideas ({opps.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-4 flex items-center gap-1.5 border-b-2 ${
            activeTab === 'settings' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" /> Monetization & AdSense Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">Incoming B2B Leads & Inquiries</h3>
            {leads.length === 0 ? (
              <p className="text-xs text-slate-500">No leads submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 font-bold text-slate-800 border-b">
                    <tr>
                      <th className="p-3">Name & Contact</th>
                      <th className="p-3">Inquiry Type</th>
                      <th className="p-3">Target Industry / Budget</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {leads.map(ld => (
                      <tr key={ld.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">
                          {ld.fullName}
                          <span className="block font-normal text-slate-500">{ld.email}</span>
                          <span className="block font-normal text-amber-800">{ld.phone}</span>
                        </td>
                        <td className="p-3 font-bold text-amber-900 uppercase">{ld.inquiryType}</td>
                        <td className="p-3 text-slate-700">{ld.targetIndustry || 'General'}</td>
                        <td className="p-3 text-slate-600 max-w-xs">{ld.message}</td>
                        <td className="p-3 text-slate-400">{new Date(ld.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">Newsletter Dispatch List</h3>
            {subscribers.length === 0 ? (
              <p className="text-xs text-slate-500">No newsletter subscribers yet.</p>
            ) : (
              <ul className="divide-y divide-slate-200 text-xs text-slate-700 max-w-md">
                {subscribers.map((sub, idx) => (
                  <li key={idx} className="py-2.5 flex justify-between items-center">
                    <span className="font-medium text-slate-900">{sub.email}</span>
                    <span className="text-slate-400 text-[10px]">{new Date(sub.subscribedAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Opportunities Manager */}
        {activeTab === 'opps' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-serif font-bold text-lg text-slate-900">Directory Opportunities ({opps.length})</h3>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleCreateOpp} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add New Business Idea</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Opportunity Title..."
                  value={newOppName}
                  onChange={e => setNewOppName(e.target.value)}
                  className="p-2 border border-slate-300 rounded-lg"
                />
                <select
                  value={newOppCat}
                  onChange={e => setNewOppCat(e.target.value)}
                  className="p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Import & Export">Import & Export</option>
                  <option value="E-commerce & Wholesale">E-commerce & Wholesale</option>
                  <option value="Solar & Renewable Energy">Solar & Renewable Energy</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Capital PKR..."
                  value={newOppCapital}
                  onChange={e => setNewOppCapital(Number(e.target.value))}
                  className="p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> Publish Opportunity
              </button>
            </form>

            <div className="space-y-2">
              {opps.map(opp => (
                <div key={opp.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 text-sm font-serif block">{opp.name}</strong>
                    <span className="text-slate-500">{opp.category} • Budget: PKR {(opp.minCapitalPKR / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('opportunity-detail', opp.slug)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteOpp(opp.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4 text-xs text-slate-700">
            <h3 className="font-serif font-bold text-lg text-slate-900">Monetization & AdSense Configuration</h3>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold text-sm">Toggle AdSense Reserved Placements Preview</strong>
                  <p className="text-slate-500 text-xs">Highlights Google AdSense banner placeholders in blue across pages.</p>
                </div>
                <button
                  onClick={handleToggleAdSense}
                  className={`px-4 py-2 font-bold rounded-xl transition-colors ${
                    siteSettings.showAdSensePreview
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {siteSettings.showAdSensePreview ? 'AdSense Preview ACTIVE' : 'AdSense Preview DISABLED'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
