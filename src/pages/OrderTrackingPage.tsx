import React, { useState, useEffect } from 'react';
import { Enquiry, EnquiryStatus } from '../types';

interface OrderTrackingPageProps {
  initialOrderId?: string;
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

const ENQUIRY_STAGES: { status: EnquiryStatus; label: string; icon: string; desc: string }[] = [
  { status: 'New enquiry', label: 'Enquiry Registered', icon: 'assignment', desc: 'Garment specifications received at atelier desk.' },
  { status: 'Contacted', label: 'Founder Contact Initiated', icon: 'support_agent', desc: 'Bharath J has initiated WhatsApp contact to review request.' },
  { status: 'Discussion ongoing', label: 'Discussion Ongoing', icon: 'forum', desc: 'Vector proofs, swatches, and sizing details being finalized.' },
  { status: 'Quote shared', label: 'Bespoke Quote Shared', icon: 'request_quote', desc: 'Custom pricing and delivery timeline shared via WhatsApp.' },
  { status: 'Order confirmed', label: 'Order Confirmed', icon: 'verified', desc: 'Patron approved quote; blueprint sent to production queue.' },
  { status: 'In production', label: 'In Production', icon: 'precision_manufacturing', desc: 'Garment being tailored, embroidered, and hand-finished.' },
  { status: 'Dispatched', label: 'Dispatched via Air Courier', icon: 'local_shipping', desc: 'Hand-pressed garment dispatched with insured air tracking.' },
  { status: 'Completed', label: 'Completed & Delivered', icon: 'home', desc: 'Garment safely received by patron.' },
];

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ initialOrderId, onNavigate }) => {
  const [searchInput, setSearchInput] = useState(initialOrderId || 'OT-ENQ-1048');
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEnquiry = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const clean = query.trim();
      const res = await fetch(`/api/enquiries/${encodeURIComponent(clean)}`);
      const data = await res.json();
      setLoading(false);

      if (data.success && data.data) {
        setEnquiry(data.data);
      } else {
        // Try searching by phone query
        const phoneRes = await fetch(`/api/enquiries?phone=${encodeURIComponent(clean)}`);
        const phoneData = await phoneRes.json();
        if (phoneData.success && phoneData.data?.length > 0) {
          setEnquiry(phoneData.data[0]);
        } else {
          setError(`No enquiry found matching "${query}". Please verify your Enquiry Ref (e.g. OT-ENQ-1048) or contact concierge.`);
          setEnquiry(null);
        }
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Error communicating with atelier tracking service');
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      fetchEnquiry(initialOrderId);
    } else {
      fetchEnquiry('OT-ENQ-1048');
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiry(searchInput);
  };

  const getStageIndex = (status: EnquiryStatus) => {
    return ENQUIRY_STAGES.findIndex((s) => s.status === status);
  };

  const currentStageIdx = enquiry ? getStageIndex(enquiry.status) : -1;

  const whatsappInquiryUrl = enquiry
    ? `https://wa.me/919611623514?text=${encodeURIComponent(
        `Hello Bharath, I would like an update regarding my bespoke enquiry ${enquiry.enquiryNumber} (${enquiry.garment.productName}).`
      )}`
    : `https://wa.me/919611623514?text=Hello%20Outfit%20Theory%20Concierge%2C%20I%20have%20an%20enquiry%20tracking%20question.`;

  return (
    <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen pb-24 font-sans">
      {/* Header Banner */}
      <div className="w-full bg-[#050505] border-b border-[#1E1E1E] py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              HOME
            </button>
            <span>/</span>
            <span className="text-white">ENQUIRY TRACKING</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            ATELIER ENQUIRY & COMMISSION TRACKER
          </h1>
          <p className="text-sm text-neutral-400 font-light max-w-2xl">
            Track your bespoke apparel request in real-time. Follow the 8-stage atelier milestone journey from initial specification review to personal founder WhatsApp consultation and production.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 pt-3 max-w-md">
            <input
              type="text"
              placeholder="ENTER ENQUIRY # (e.g. OT-ENQ-1048) OR PHONE"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-[#161616] border border-[#333333] px-4 py-3 text-xs text-white uppercase font-mono focus:outline-none focus:border-white rounded"
            />
            <button
              type="submit"
              className="bg-white text-black font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-neutral-200 transition-colors rounded cursor-pointer"
            >
              TRACK
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        {loading && (
          <div className="p-12 text-center text-neutral-400 font-mono text-xs space-y-2">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Accessing Atelier Enquiry Ledger...</p>
          </div>
        )}

        {error && (
          <div className="p-5 bg-rose-950/30 border border-rose-900 text-rose-300 font-mono text-xs space-y-2 rounded">
            <p className="font-bold uppercase">Tracking Notice:</p>
            <p>{error}</p>
          </div>
        )}

        {enquiry && (
          <div className="space-y-6">
            {/* Enquiry Header Summary */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  COMMISSION SPECIFICATION
                </span>
                <h2 className="font-serif text-2xl font-bold text-white uppercase mt-0.5">
                  Enquiry #{enquiry.enquiryNumber}
                </h2>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Registered on {new Date(enquiry.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })} • Patron: {enquiry.customer.fullName}
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">CURRENT MILESTONE</span>
                <span className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider rounded inline-block">
                  {enquiry.status}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Helper */}
            <div className="bg-[#181818] border border-emerald-500/30 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-emerald-400 text-[22px]">chat</span>
                <div>
                  <span className="text-xs font-mono text-white font-semibold uppercase block">
                    Direct Tailor Communication
                  </span>
                  <span className="text-xs text-neutral-400">
                    Founder Bharath J (+91 9611623514) is your dedicated atelier point of contact.
                  </span>
                </div>
              </div>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase font-bold rounded transition-colors whitespace-nowrap"
              >
                Message on WhatsApp
              </a>
            </div>

            {/* Milestone Timeline */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 md:p-8 space-y-6 shadow-xl">
              <h3 className="font-serif text-base uppercase text-white font-bold tracking-wider">
                Commission & Consultation Milestone Journey
              </h3>

              <div className="space-y-4">
                {ENQUIRY_STAGES.map((stg, idx) => {
                  const isDone = currentStageIdx >= idx;
                  const isCurrent = currentStageIdx === idx;
                  const historyEntry = enquiry.statusHistory.find((h) => h.status === stg.status);

                  return (
                    <div key={stg.status} className="flex items-start gap-4 text-xs font-mono">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                            isCurrent
                              ? 'bg-white text-black ring-4 ring-emerald-500/20'
                              : isDone
                              ? 'bg-neutral-700 text-white'
                              : 'bg-[#181818] text-neutral-600 border border-[#2a2a2a]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{stg.icon}</span>
                        </div>
                        {idx < ENQUIRY_STAGES.length - 1 && (
                          <div
                            className={`w-0.5 h-10 my-1 ${
                              isDone ? 'bg-neutral-600' : 'bg-[#222222]'
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-semibold uppercase tracking-wider ${
                              isCurrent ? 'text-white' : isDone ? 'text-neutral-300' : 'text-neutral-600'
                            }`}
                          >
                            {stg.label}
                          </span>
                          {historyEntry && (
                            <span className="text-[11px] text-neutral-500">
                              {new Date(historyEntry.timestamp).toLocaleString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-400 mt-0.5 text-xs font-sans">
                          {historyEntry?.note || stg.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Garment Manifest Breakdown */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 md:p-8 space-y-4 shadow-xl">
              <h3 className="font-serif text-base uppercase text-white font-bold tracking-wider">
                Commissioned Garment Blueprint
              </h3>

              <div className="p-4 bg-[#161616] border border-[#262626] rounded-lg space-y-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={enquiry.garment.image}
                    alt={enquiry.garment.productName}
                    className="w-20 h-24 object-cover bg-black border border-[#2a2a2a] rounded"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="font-serif text-base font-bold text-white truncate">
                      {enquiry.garment.productName}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono">
                      Category: {enquiry.garment.category.toUpperCase()} // {enquiry.garment.fit}
                    </p>
                    <p className="text-xs text-neutral-400 font-mono">
                      Fabric: {enquiry.garment.fabric} ({enquiry.garment.gsm} GSM)
                    </p>
                    <p className="text-xs font-mono text-white">
                      Colour: {enquiry.garment.color.name} • Size: {enquiry.garment.size} • Qty: {enquiry.garment.quantity} piece(s)
                    </p>
                  </div>
                </div>

                {enquiry.customisation && (
                  <div className="p-3 bg-[#121212] border border-[#222222] rounded text-xs font-mono space-y-1.5">
                    <span className="text-white font-semibold block uppercase">Customisation Specifications:</span>
                    <p className="text-neutral-300">
                      • Placements: {enquiry.customisation.placements.join(', ') || 'Front Center'}
                    </p>
                    <p className="text-neutral-300">
                      • Embellishment Technique: {enquiry.customisation.techniqueName}
                    </p>
                    <p className="text-neutral-300">
                      • Artwork Files: {enquiry.customisation.artworkFiles.length} file(s) attached
                    </p>
                    {enquiry.customisation.customInstructions && (
                      <p className="text-neutral-400 italic pt-1">
                        "{enquiry.customisation.customInstructions}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Delivery Destination Card */}
              <div className="p-4 bg-[#161616] border border-[#262626] rounded-lg text-xs font-mono space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase block">Delivery Destination Coordinates:</span>
                <p className="text-white font-semibold">{enquiry.customer.fullName} ({enquiry.customer.phone})</p>
                <p className="text-neutral-300">{enquiry.customer.deliveryAddress}</p>
                <p className="text-neutral-400">
                  {enquiry.customer.city}, {enquiry.customer.state} - {enquiry.customer.pincode}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
