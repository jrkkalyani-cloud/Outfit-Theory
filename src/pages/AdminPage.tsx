import React, { useState, useEffect } from 'react';
import { Enquiry, EnquiryStatus, Product, BulkEnquiry, WhatsAppNotificationLog, GarmentCategory, GarmentFit } from '../types';
import { useAuth } from '../context/AuthContext';
import { BusinessContactSettings } from '../data/initialData';

interface AdminPageProps {
  products: Product[];
  onProductUpdated: () => void;
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

const ALL_ENQUIRY_STATUSES: EnquiryStatus[] = [
  'New enquiry',
  'Contacted',
  'Discussion ongoing',
  'Quote shared',
  'Order confirmed',
  'In production',
  'Dispatched',
  'Completed',
  'Cancelled',
];

export const AdminPage: React.FC<AdminPageProps> = ({ products, onProductUpdated, onNavigate }) => {
  const { isAdmin, adminPasscode, loginAdmin, logoutAdmin } = useAuth();

  // Authentication State
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'enquiries' | 'bulk' | 'products' | 'whatsapp' | 'integrations'>('enquiries');

  // Real Data from API
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bulkEnquiries, setBulkEnquiries] = useState<BulkEnquiry[]>([]);
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppNotificationLog[]>([]);
  const [settings, setSettings] = useState<BusinessContactSettings | null>(null);

  // Selected Enquiry for Inspector
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [enquirySearchQuery, setEnquirySearchQuery] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');
  const [statusUpdateNote, setStatusUpdateNote] = useState('');
  const [internalNoteInput, setInternalNoteInput] = useState('');

  // Clock
  const [currentTime, setCurrentTime] = useState('');

  // Manual WhatsApp push
  const [manualWaInput, setManualWaInput] = useState('');
  const [manualWaFeedback, setManualWaFeedback] = useState<string | null>(null);

  // Add Product Form State (NO PRICES)
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<GarmentCategory>('hoodies');
  const [newProductFit, setNewProductFit] = useState<GarmentFit>('Oversized');
  const [newProductGsm, setNewProductGsm] = useState(450);
  const [newProductFabric, setNewProductFabric] = useState('100% Combed Compact Ringspun French Terry');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductColors, setNewProductColors] = useState('Obsidian Black:#131313, Off-White Ivory:#ECEBE7');
  const [newProductSizes, setNewProductSizes] = useState('S, M, L, XL, XXL');

  // Integrations Status
  const [integrationsStatus, setIntegrationsStatus] = useState<{
    payment: { configured: boolean; statusText: string; mode: string; description: string };
    whatsapp: { configured: boolean; statusText: string; mode: string; description: string; ownerPhone: string };
  } | null>(null);

  // Fetch Admin Data
  const fetchAdminData = async () => {
    try {
      const [enqRes, bulkRes, waRes, settingsRes, intRes] = await Promise.all([
        fetch('/api/enquiries'),
        fetch('/api/bulk-enquiries'),
        fetch('/api/whatsapp/logs'),
        fetch('/api/settings'),
        fetch('/api/integrations/status'),
      ]);

      const [enqData, bulkData, waData, settingsData, intData] = await Promise.all([
        enqRes.json(),
        bulkRes.json(),
        waRes.json(),
        settingsRes.json(),
        intRes.json(),
      ]);

      if (enqData.success) {
        setEnquiries(enqData.data);
        if (!selectedEnquiry && enqData.data.length > 0) {
          setSelectedEnquiry(enqData.data[0]);
          setInternalNoteInput(enqData.data[0].internalNotes || '');
        }
      }
      if (bulkData.success) setBulkEnquiries(bulkData.data);
      if (waData.success) setWhatsappLogs(waData.data);
      if (settingsData.success) setSettings(settingsData.data);
      if (intData.success) setIntegrationsStatus(intData.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedEnquiry) {
      setInternalNoteInput(selectedEnquiry.internalNotes || '');
    }
  }, [selectedEnquiry]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const success = await loginAdmin(passcodeInput);
    if (!success) {
      setAuthError('Incorrect Atelier Master Passcode.');
    }
  };

  // Status Update
  const handleUpdateStatus = async (status: EnquiryStatus) => {
    if (!selectedEnquiry) return;
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': adminPasscode || 'atelier2025',
        },
        body: JSON.stringify({ status, note: statusUpdateNote }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry(data.data);
        setEnquiries((prev) => prev.map((e) => (e.id === data.data.id ? data.data : e)));
        setStatusUpdateNote('');
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Internal Notes Save
  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}/notes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': adminPasscode || 'atelier2025',
        },
        body: JSON.stringify({ notes: internalNoteInput }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedEnquiry(data.data);
        setEnquiries((prev) => prev.map((e) => (e.id === data.data.id ? data.data : e)));
      }
    } catch (err) {
      console.error('Error saving internal note:', err);
    }
  };

  // Manual WhatsApp Ping
  const handleSendManualWhatsAppPing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/whatsapp/test-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: manualWaInput || 'Atelier production line active and responsive.' }),
      });
      const data = await res.json();
      if (data.success) {
        setManualWaFeedback('WhatsApp verification alert dispatched.');
        setManualWaInput('');
        fetchAdminData();
        setTimeout(() => setManualWaFeedback(null), 4000);
      }
    } catch (err: any) {
      setManualWaFeedback(`Error: ${err.message}`);
    }
  };

  // Add Product (NO PRICES)
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedColors = newProductColors.split(',').map((item) => {
        const [name, hex] = item.split(':');
        return { name: name.trim(), hex: hex ? hex.trim() : '#131313' };
      });
      const parsedSizes = newProductSizes.split(',').map((s) => s.trim());

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': adminPasscode || 'atelier2025',
        },
        body: JSON.stringify({
          name: newProductName,
          slug: newProductName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: newProductCategory,
          fit: newProductFit,
          description: newProductDesc,
          gsm: Number(newProductGsm),
          fabric: newProductFabric,
          stockStatus: 'Available for Commission',
          colors: parsedColors,
          sizes: parsedSizes,
          images: {
            front: newProductImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9JJky5FacVQY5qVR62ZzArQPfiD8mu8U_OvV-Va76B6hyP2SoZdA-E9NhObukiqx5TA2aDJ2D3ALoIm6nXwj6qeccSKuBenTUZlKs3WTP1-gO5isX914kVAapKQiTT9F1nQj1eMuOPH1NyxFfjIdz-EnOrYPjrXLjdlZPmhRY-bb9btEjkVdNZ-6dbpbohAvKcH-aJGHd52NHuYWaCisZcLQKe5ByfesEYw0nnO6z',
            alt: newProductName,
          },
          customisable: true,
          featured: false,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAddingProduct(false);
        setNewProductName('');
        setNewProductDesc('');
        onProductUpdated();
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryStatusFilter !== 'all' && e.status.toLowerCase() !== enquiryStatusFilter.toLowerCase()) {
      return false;
    }
    if (enquirySearchQuery.trim()) {
      const q = enquirySearchQuery.toLowerCase();
      const matchNum = e.enquiryNumber.toLowerCase().includes(q);
      const matchName = e.customer.fullName.toLowerCase().includes(q);
      const matchPhone = e.customer.phone.includes(q) || (e.customer.whatsAppNumber && e.customer.whatsAppNumber.includes(q));
      const matchItem = e.garment.productName.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchPhone && !matchItem) return false;
    }
    return true;
  });

  // If Not Authenticated, Render Master Passcode Gate
  if (!isAdmin) {
    return (
      <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#111111] border border-[#262626] rounded-2xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white text-black font-serif font-bold text-xl rounded flex items-center justify-center mx-auto">
              OT
            </div>
            <h1 className="font-serif text-2xl uppercase tracking-widest text-white font-bold">
              ATELIER MASTER DESK
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              OUTFIT THEORY // FOUNDER CONSOLE
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Master Security Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode (default: atelier2025)"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] px-4 py-3 text-sm text-white font-mono placeholder:text-neutral-600 focus:outline-none focus:border-white rounded"
              />
            </div>

            {authError && (
              <p className="text-xs font-mono text-rose-400 animate-fadeIn">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors rounded cursor-pointer"
            >
              AUTHENTICATE CONSOLE
            </button>
          </form>

          <div className="pt-2 border-t border-[#222222] text-center">
            <span className="text-[11px] font-mono text-neutral-500">
              Default access passcode: <strong className="text-neutral-300">atelier2025</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Generate WhatsApp contact link for an enquiry
  const getWhatsAppContactUrl = (enq: Enquiry) => {
    const cleanPhone = (enq.customer.whatsAppNumber || enq.customer.phone).replace(/\D/g, '');
    const message = `Hello ${enq.customer.fullName}, this is Bharath J from Outfit Theory regarding your bespoke enquiry ${enq.enquiryNumber} (${enq.garment.productName}). I've reviewed your specifications and would love to discuss custom pricing, fabric swatches, and timeline.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen pb-24 font-sans">
      {/* Top Admin HUD */}
      <div className="w-full bg-[#050505] border-b border-[#1E1E1E] px-4 md:px-8 py-4 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-white text-black font-serif font-bold text-sm flex items-center justify-center">
              OT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-bold uppercase text-white tracking-widest">
                  OUTFIT THEORY ATELIER CONSOLE
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                ACTIVE DESK: BHARATH J (+91 9611623514) • {currentTime}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 bg-[#141414] border border-[#2a2a2a] text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white rounded cursor-pointer"
            >
              Public Storefront
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 bg-rose-950/40 border border-rose-900/60 text-xs font-mono uppercase tracking-wider text-rose-300 hover:bg-rose-900/40 rounded cursor-pointer"
            >
              Lock Console
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        {/* Unconfigured Integrations Notice Banner (User explicit requirement) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment Status Card */}
          <div className="bg-[#111111] border border-neutral-800 rounded-lg p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                E-Commerce / Payment Gateway
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="font-mono text-xs font-semibold text-neutral-200">
                  {integrationsStatus?.payment.statusText || 'Payment gateway not configured'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Operating in 100% bespoke enquiry mode. No cart checkout or online payments.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 bg-[#181818] border border-neutral-700 text-neutral-400 rounded">
              ENQUIRY ONLY
            </span>
          </div>

          {/* WhatsApp Status Card */}
          <div className="bg-[#111111] border border-neutral-800 rounded-lg p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                WhatsApp Cloud API
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="font-mono text-xs font-semibold text-neutral-200">
                  {integrationsStatus?.whatsapp.statusText || 'WhatsApp integration not configured'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Direct 1-click WhatsApp concierge chat links active (+91 9611623514).
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 bg-[#181818] border border-neutral-700 text-neutral-400 rounded">
              READY FOR CONFIG
            </span>
          </div>
        </div>

        {/* View Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#222222] pb-3 overflow-x-auto text-xs font-mono uppercase">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'enquiries'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white bg-[#141414]'
            }`}
          >
            Bespoke Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'bulk'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white bg-[#141414]'
            }`}
          >
            Bulk & Corporate ({bulkEnquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white bg-[#141414]'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'whatsapp'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white bg-[#141414]'
            }`}
          >
            WhatsApp Telemetry ({whatsappLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'integrations'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white bg-[#141414]'
            }`}
          >
            Integration Setup
          </button>
        </div>

        {/* 1. ENQUIRIES WORKFLOW TAB */}
        {activeTab === 'enquiries' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Enquiries List & Filter */}
            <div className="lg:col-span-5 space-y-4">
              {/* Search & Filter Controls */}
              <div className="bg-[#111111] border border-[#242424] p-4 rounded-xl space-y-3">
                <div className="relative">
                  <span className="material-symbols-outlined text-[16px] text-neutral-500 absolute left-3 top-2.5">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="SEARCH REF, PATRON, PHONE..."
                    value={enquirySearchQuery}
                    onChange={(e) => setEnquirySearchQuery(e.target.value)}
                    className="w-full bg-[#181818] border border-[#333333] pl-9 pr-3 py-2 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded"
                  />
                </div>

                {/* 9 Status Filter Pills */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono">
                  <button
                    onClick={() => setEnquiryStatusFilter('all')}
                    className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors cursor-pointer ${
                      enquiryStatusFilter === 'all'
                        ? 'bg-white text-black font-bold'
                        : 'bg-[#181818] text-neutral-400 hover:text-white'
                    }`}
                  >
                    ALL ({enquiries.length})
                  </button>
                  {ALL_ENQUIRY_STATUSES.map((st) => {
                    const count = enquiries.filter((e) => e.status === st).length;
                    return (
                      <button
                        key={st}
                        onClick={() => setEnquiryStatusFilter(st)}
                        className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors cursor-pointer ${
                          enquiryStatusFilter === st
                            ? 'bg-white text-black font-bold'
                            : 'bg-[#181818] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {st} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enquiries Card List */}
              <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
                {filteredEnquiries.length === 0 ? (
                  <div className="p-8 bg-[#111111] border border-[#222222] rounded-xl text-center text-xs font-mono text-neutral-500">
                    No enquiries match selected filter.
                  </div>
                ) : (
                  filteredEnquiries.map((enq) => {
                    const isSelected = selectedEnquiry?.id === enq.id;
                    return (
                      <div
                        key={enq.id}
                        onClick={() => setSelectedEnquiry(enq)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1a1a1a] border-white shadow-xl'
                            : 'bg-[#111111] border-[#242424] hover:border-neutral-600'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1">
                          <span className="font-mono text-xs font-bold text-white">
                            {enq.enquiryNumber}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181818] border border-neutral-700 text-emerald-400 font-semibold">
                            {enq.status}
                          </span>
                        </div>

                        <div className="space-y-0.5 mt-1">
                          <p className="font-serif text-sm font-semibold text-white truncate">
                            {enq.customer.fullName}
                          </p>
                          <p className="text-xs font-mono text-neutral-400">
                            {enq.garment.productName} ({enq.garment.quantity} pcs)
                          </p>
                          <p className="text-[11px] font-mono text-neutral-500">
                            {enq.customer.whatsAppNumber || enq.customer.phone} • {enq.customer.orderType}
                          </p>
                        </div>

                        <div className="pt-2 mt-2 border-t border-[#222222] flex items-center justify-between text-[10px] font-mono text-neutral-500">
                          <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                          <span className="text-neutral-400">
                            {enq.customisation ? 'Custom Embellishment' : 'Direct Request'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Selected Enquiry Inspector */}
            <div className="lg:col-span-7">
              {selectedEnquiry ? (
                <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 md:p-8 space-y-6 shadow-2xl">
                  {/* Top Header & WhatsApp Contact Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202020]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-neutral-400 uppercase">ENQUIRY REF</span>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-800 text-white rounded">
                          {selectedEnquiry.enquiryNumber}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl text-white font-bold mt-1">
                        {selectedEnquiry.customer.fullName}
                      </h2>
                      <p className="text-xs font-mono text-neutral-400">
                        Submitted: {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </p>
                    </div>

                    {/* Direct WhatsApp Contact Button */}
                    <a
                      href={getWhatsAppContactUrl(selectedEnquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase font-bold rounded flex items-center gap-2 shadow-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>OPEN WHATSAPP CHAT</span>
                    </a>
                  </div>

                  {/* Status Updater Matrix */}
                  <div className="bg-[#161616] border border-[#262626] p-4 rounded-lg space-y-3">
                    <span className="text-xs font-mono text-neutral-400 uppercase font-semibold block">
                      Enquiry Status Management
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_ENQUIRY_STATUSES.map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(st)}
                          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                            selectedEnquiry.status === st
                              ? 'bg-white text-black font-bold'
                              : 'bg-[#1e1e1e] border border-neutral-700 text-neutral-300 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Add milestone update note (e.g., Sent quote for 450 GSM terry on WhatsApp)..."
                        value={statusUpdateNote}
                        onChange={(e) => setStatusUpdateNote(e.target.value)}
                        className="flex-1 bg-[#121212] border border-[#333333] px-3 py-2 text-xs font-mono text-white rounded focus:outline-none"
                      />
                      <button
                        onClick={() => handleUpdateStatus(selectedEnquiry.status)}
                        className="px-4 py-2 bg-[#252525] hover:bg-neutral-700 text-white font-mono text-xs uppercase rounded cursor-pointer"
                      >
                        Log Note
                      </button>
                    </div>
                  </div>

                  {/* Customer & Garment Dossier Tabs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block border-b border-[#202020] pb-1">
                        Patron Dossier
                      </span>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">WHATSAPP:</span>
                          <span className="text-white font-semibold">
                            {selectedEnquiry.customer.whatsAppNumber || selectedEnquiry.customer.phone}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">PHONE:</span>
                          <span className="text-neutral-300">{selectedEnquiry.customer.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">EMAIL:</span>
                          <span className="text-neutral-300">{selectedEnquiry.customer.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">ORDER TYPE:</span>
                          <span className="text-white">{selectedEnquiry.customer.orderType}</span>
                        </div>
                        {selectedEnquiry.customer.organizationName && (
                          <div className="flex justify-between">
                            <span className="text-neutral-500">ORGANIZATION:</span>
                            <span className="text-white">{selectedEnquiry.customer.organizationName}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-[#202020]">
                          <span className="text-neutral-500 block">DELIVERY ADDRESS:</span>
                          <p className="text-neutral-300 mt-0.5 leading-relaxed">
                            {selectedEnquiry.customer.deliveryAddress}
                            {selectedEnquiry.customer.city && `, ${selectedEnquiry.customer.city}`}
                            {selectedEnquiry.customer.state && `, ${selectedEnquiry.customer.state}`}
                            {selectedEnquiry.customer.pincode && ` - ${selectedEnquiry.customer.pincode}`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Garment Specifications */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block border-b border-[#202020] pb-1">
                        Garment Blueprint
                      </span>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">ITEM:</span>
                          <span className="text-white font-semibold">{selectedEnquiry.garment.productName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">FIT & WEIGHT:</span>
                          <span className="text-neutral-300">{selectedEnquiry.garment.fit} ({selectedEnquiry.garment.gsm} GSM)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">COLOURWAY:</span>
                          <span className="text-white">{selectedEnquiry.garment.color.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">SIZE & QTY:</span>
                          <span className="text-white font-bold">{selectedEnquiry.garment.size} • {selectedEnquiry.garment.quantity} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">FABRIC:</span>
                          <span className="text-neutral-300 text-right">{selectedEnquiry.garment.fabric}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Artwork & Customisation Details */}
                  {selectedEnquiry.customisation && (
                    <div className="p-4 bg-[#161616] border border-[#262626] rounded-lg space-y-3">
                      <span className="text-xs font-mono text-white font-semibold uppercase block">
                        Custom Embellishment & Attached Artwork
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <p className="text-neutral-400">
                            • Placements: <strong>{selectedEnquiry.customisation.placements.join(', ') || 'Front Center'}</strong>
                          </p>
                          <p className="text-neutral-400">
                            • Technique: <strong>{selectedEnquiry.customisation.techniqueName}</strong>
                          </p>
                          {selectedEnquiry.customisation.customInstructions && (
                            <p className="text-neutral-300 mt-1 italic">
                              "{selectedEnquiry.customisation.customInstructions}"
                            </p>
                          )}
                        </div>

                        {/* Artwork Thumbnails */}
                        <div>
                          <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">
                            Attached Files ({selectedEnquiry.customisation.artworkFiles.length}):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {selectedEnquiry.customisation.artworkFiles.map((art, idx) => (
                              <div key={idx} className="p-2 bg-[#121212] border border-[#2a2a2a] rounded flex items-center gap-2">
                                <img
                                  src={art.dataUrl}
                                  alt={art.name}
                                  className="w-10 h-10 object-contain bg-black border border-neutral-800 rounded"
                                />
                                <div className="text-[10px] font-mono truncate max-w-[120px]">
                                  <p className="text-white truncate">{art.name}</p>
                                  <p className="text-neutral-500">{art.size}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Internal Tailor Notes Editor */}
                  <div className="space-y-2 pt-2 border-t border-[#202020]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-neutral-300 uppercase font-semibold">
                        Founder Internal Notes (Private)
                      </span>
                      <button
                        onClick={handleSaveNotes}
                        className="px-3 py-1 bg-white text-black font-mono text-xs uppercase font-bold rounded hover:bg-neutral-200 cursor-pointer"
                      >
                        Save Notes
                      </button>
                    </div>
                    <textarea
                      value={internalNoteInput}
                      onChange={(e) => setInternalNoteInput(e.target.value)}
                      placeholder="Add pricing quotes discussed on WhatsApp, delivery deadline notes, swatch preferences..."
                      rows={3}
                      className="w-full bg-[#161616] border border-[#333333] p-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                    />
                  </div>

                  {/* Status History Timeline Log */}
                  <div className="space-y-2 pt-2 border-t border-[#202020]">
                    <span className="text-xs font-mono text-neutral-400 uppercase font-semibold block">
                      Enquiry Status Audit Trail
                    </span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {selectedEnquiry.statusHistory.map((h, idx) => (
                        <div key={idx} className="p-2 bg-[#141414] border border-[#222222] rounded flex justify-between text-xs font-mono">
                          <div>
                            <span className="text-white font-medium">{h.status}</span>
                            {h.note && <p className="text-neutral-400 text-[11px] mt-0.5">{h.note}</p>}
                          </div>
                          <span className="text-[10px] text-neutral-500 whitespace-nowrap ml-2">
                            {new Date(h.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-16 bg-[#111111] border border-[#242424] rounded-xl text-center text-xs font-mono text-neutral-500">
                  Select an enquiry from the list to view full specifications.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. BULK & CORPORATE ENQUIRIES TAB */}
        {activeTab === 'bulk' && (
          <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#202020]">
              <div>
                <h3 className="font-serif text-xl text-white font-bold uppercase">
                  Bulk & Institutional Commission Requests
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  High-volume inquiries for tech companies, university fests, and lifestyle brands.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {bulkEnquiries.map((bulk) => {
                const cleanPhone = (bulk.whatsAppNumber || bulk.phone).replace(/\D/g, '');
                const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${bulk.fullName}, this is Bharath J from Outfit Theory regarding your bulk apparel enquiry ${bulk.enquiryNumber} (${bulk.organization} - ${bulk.estimatedQuantity} units).`
                )}`;

                return (
                  <div key={bulk.id} className="p-5 bg-[#161616] border border-[#262626] rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white px-2 py-0.5 bg-neutral-800 rounded">
                            {bulk.enquiryNumber}
                          </span>
                          <span className="font-serif text-base text-white font-bold">
                            {bulk.organization}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">({bulk.role})</span>
                        </div>
                        <p className="text-xs font-mono text-neutral-300 mt-1">
                          Contact: <strong>{bulk.fullName}</strong> • Phone: {bulk.phone} • Email: {bulk.email}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold uppercase rounded">
                          {bulk.estimatedQuantity} UNITS
                        </span>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase font-bold rounded flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span>
                          <span>WhatsApp Lead</span>
                        </a>
                      </div>
                    </div>

                    <div className="p-3 bg-[#111111] border border-[#222222] rounded text-xs font-mono space-y-1">
                      <span className="text-neutral-400 uppercase font-semibold block">Requirements:</span>
                      <p className="text-neutral-200">{bulk.clothingRequirements}</p>
                      {bulk.additionalInstructions && (
                        <p className="text-neutral-400 italic">Notes: "{bulk.additionalInstructions}"</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PRODUCT CATALOG MANAGEMENT TAB (NO PRICES) */}
        {activeTab === 'products' && (
          <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
              <div>
                <h3 className="font-serif text-xl text-white font-bold uppercase">
                  Product Catalog Architecture
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  Manage garment silhouettes, GSM weights, and commission allocations (pure specifications, no prices).
                </p>
              </div>

              <button
                onClick={() => setIsAddingProduct(true)}
                className="px-4 py-2 bg-white text-black font-mono text-xs uppercase font-bold rounded hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Add Garment Specimen</span>
              </button>
            </div>

            {/* Add Product Modal */}
            {isAddingProduct && (
              <form onSubmit={handleCreateProduct} className="p-5 bg-[#161616] border border-[#333333] rounded-xl space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
                  <h4 className="font-serif text-base text-white font-bold uppercase">Add New Garment Specification</h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-neutral-300 uppercase">Garment Name</label>
                    <input
                      type="text"
                      required
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      placeholder="E.g., Oversized Heavyweight French Terry Hoodie"
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-2 text-xs text-white rounded font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-neutral-300 uppercase">Category</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value as any)}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-2 text-xs text-white rounded font-mono uppercase"
                    >
                      <option value="hoodies">Hoodies</option>
                      <option value="t-shirts">T-Shirts</option>
                      <option value="shirts">Shirts</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-neutral-300 uppercase">Fit</label>
                    <input
                      type="text"
                      required
                      value={newProductFit}
                      onChange={(e) => setNewProductFit(e.target.value as any)}
                      placeholder="Oversized / Regular / Boxy / Collarless..."
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-2 text-xs text-white rounded font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-neutral-300 uppercase">GSM Weight</label>
                    <input
                      type="number"
                      required
                      value={newProductGsm}
                      onChange={(e) => setNewProductGsm(Number(e.target.value))}
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-2 text-xs text-white rounded font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-neutral-300 uppercase">Fabric</label>
                    <input
                      type="text"
                      required
                      value={newProductFabric}
                      onChange={(e) => setNewProductFabric(e.target.value)}
                      placeholder="100% Combed Ringspun French Terry"
                      className="w-full bg-[#111111] border border-[#333333] px-3 py-2 text-xs text-white rounded font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-300 uppercase">Description</label>
                  <textarea
                    required
                    rows={2}
                    value={newProductDesc}
                    onChange={(e) => setNewProductDesc(e.target.value)}
                    placeholder="Describe architectural drape, needle stitch construct, ribbing..."
                    className="w-full bg-[#111111] border border-[#333333] p-3 text-xs text-white rounded font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-white text-black font-mono text-xs uppercase font-bold rounded hover:bg-neutral-200 cursor-pointer"
                >
                  Save Specification to Archive
                </button>
              </form>
            )}

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 bg-[#161616] border border-[#262626] rounded-xl flex gap-3">
                  <img
                    src={p.images.front}
                    alt={p.name}
                    className="w-16 h-20 object-cover bg-black rounded shrink-0 filter grayscale-[15%]"
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">
                      {p.category} // {p.fit}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-white truncate">{p.name}</h4>
                    <p className="text-xs font-mono text-neutral-400">{p.gsm} GSM • {p.fabric}</p>
                    <span className="text-[10px] font-mono text-neutral-500 block">
                      {p.stockStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. WHATSAPP TELEMETRY TAB */}
        {activeTab === 'whatsapp' && (
          <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#202020]">
              <div>
                <h3 className="font-serif text-xl text-white font-bold uppercase">
                  WhatsApp Concierge Activity Log
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  Audit trail of automated notifications and customer concierge chats.
                </p>
              </div>

              {/* Manual Ping Tool */}
              <form onSubmit={handleSendManualWhatsAppPing} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Verification note to founder..."
                  value={manualWaInput}
                  onChange={(e) => setManualWaInput(e.target.value)}
                  className="bg-[#181818] border border-[#333333] px-3 py-1.5 text-xs font-mono text-white rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-white text-black font-mono text-xs uppercase font-bold rounded hover:bg-neutral-200 cursor-pointer"
                >
                  Ping Desk
                </button>
              </form>
            </div>

            {manualWaFeedback && (
              <p className="text-xs font-mono text-emerald-400 animate-fadeIn">
                {manualWaFeedback}
              </p>
            )}

            <div className="space-y-2">
              {whatsappLogs.map((log) => (
                <div key={log.id} className="p-3 bg-[#161616] border border-[#262626] rounded flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{log.eventType}</span>
                      <span className="text-neutral-500">→</span>
                      <span className="text-emerald-400">{log.recipientName} ({log.recipientPhone})</span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">{log.payloadSummary}</p>
                  </div>
                  <div className="text-right text-[10px] text-neutral-500">
                    <span className="px-2 py-0.5 bg-[#121212] border border-neutral-700 rounded text-neutral-300">
                      {log.status}
                    </span>
                    <p className="mt-1">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. INTEGRATION SETUP TAB */}
        {activeTab === 'integrations' && (
          <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 md:p-8 space-y-6">
            <div className="space-y-1 pb-3 border-b border-[#202020]">
              <h3 className="font-serif text-xl text-white font-bold uppercase">
                External Integrations Architecture
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                Zero credentials required during development. Everything operates safely in enquiry-first concierge mode.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#161616] border border-[#2a2a2a] rounded-xl space-y-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block font-semibold">
                  1. Payment Gateway Configuration
                </span>
                <div className="p-3 bg-[#111111] border border-neutral-800 rounded text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-white font-bold">Payment gateway not configured</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed pt-1">
                    Outfit Theory operates strictly as a custom apparel enquiry platform. Product prices, online payment checkouts, and Razorpay/Cashfree gateways are intentionally disabled in favor of personalized WhatsApp pricing consultations with founder Bharath J.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#161616] border border-[#2a2a2a] rounded-xl space-y-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block font-semibold">
                  2. WhatsApp Cloud API Configuration
                </span>
                <div className="p-3 bg-[#111111] border border-neutral-800 rounded text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-white font-bold">WhatsApp integration not configured</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed pt-1">
                    Running in direct concierge link mode. When patrons submit enquiries, 1-click WhatsApp chat URLs are dynamically generated linking to founder phone <strong>+91 9611623514</strong>. Automated Meta Cloud API delivery will activate automatically if <code>WHATSAPP_PHONE_ID</code> and <code>WHATSAPP_ACCESS_TOKEN</code> are added to environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
