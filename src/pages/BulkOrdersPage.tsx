import React, { useState } from 'react';
import { GarmentCategory } from '../types';

interface BulkOrdersPageProps {
  onNavigate: (path: string) => void;
}

export const BulkOrdersPage: React.FC<BulkOrdersPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Director / Lead Coordinator');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<GarmentCategory | 'multiple'>('hoodies');
  const [quantity, setQuantity] = useState(100);
  const [targetDate, setTargetDate] = useState('');
  const [designRequirements, setDesignRequirements] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiryNumber, setSubmittedEnquiryNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic Tier Calculation
  const getTier = (qty: number) => {
    if (qty >= 200) return { name: 'Tier 3 (Enterprise)', discount: 40, perks: 'Dedicated Production Head + Custom Pantones + Free Air Freight' };
    if (qty >= 51) return { name: 'Tier 2 (Growth / Club)', discount: 25, perks: 'Custom Woven Neck Labels + 3D Puff Embroidery' };
    return { name: 'Tier 1 (Core)', discount: 15, perks: 'High-Density Screen / DTG + Sizing Swatches' };
  };

  const currentTier = getTier(quantity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/bulk-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          organization,
          role,
          email,
          phone,
          category,
          estimatedQuantity: quantity,
          tier: quantity >= 200 ? 'tier3' : quantity >= 51 ? 'tier2' : 'tier1',
          targetDate,
          designRequirements,
          additionalNotes,
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success) {
        setSubmittedEnquiryNumber(data.data.enquiryNumber);
      } else {
        setErrorMsg(data.message || 'Failed to submit bulk quotation request.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Network error submitting request.');
    }
  };

  return (
    <div className="w-full bg-[#131313] text-[#e5e2e1] min-h-screen pb-20">
      {/* Editorial Header */}
      <div className="w-full bg-[#0e0e0e] border-b border-[#2a2a2a] py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              HOME
            </button>
            <span>/</span>
            <span className="text-white">B2B & CAMPUS ATELIER</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            BULK & CORPORATE APPAREL STUDIO
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light leading-relaxed">
            Engineered heavyweight merchandise for AI companies, Series-A startups, student councils, luxury lifestyle clubs, and premier content creators.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-10 space-y-12">
        {/* Tier Savings Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-6 bg-[#1c1b1b] border space-y-3 ${quantity >= 25 && quantity <= 50 ? 'border-white ring-1 ring-white' : 'border-[#2a2a2a]'}`}>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">TIER 1 (25 - 50 PIECES)</span>
            <div className="font-serif text-2xl font-bold text-white">15% SAVING</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ideal for founder teams, hackathons, and intimate creator capsules. Includes free sample swatch kit.
            </p>
          </div>

          <div className={`p-6 bg-[#1c1b1b] border space-y-3 ${quantity >= 51 && quantity <= 199 ? 'border-white ring-1 ring-white' : 'border-[#2a2a2a]'}`}>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">TIER 2 (51 - 200 PIECES)</span>
            <div className="font-serif text-2xl font-bold text-white">25% SAVING</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Designed for growth-stage tech companies and university student councils. Custom woven neck tags included.
            </p>
          </div>

          <div className={`p-6 bg-[#1c1b1b] border space-y-3 ${quantity >= 200 ? 'border-white ring-1 ring-white' : 'border-[#2a2a2a]'}`}>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">TIER 3 (200+ PIECES)</span>
            <div className="font-serif text-2xl font-bold text-white">40% SAVING</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enterprise volume production. Dedicated production head, custom pantone lab dips, and fast-track air delivery.
            </p>
          </div>
        </div>

        {/* Form Container */}
        {submittedEnquiryNumber ? (
          <div className="bg-[#1c1b1b] border border-[#2a2a2a] p-8 text-center space-y-4 max-w-xl mx-auto animate-fadeIn">
            <span className="material-symbols-outlined text-[48px] text-white">verified</span>
            <h3 className="font-serif text-2xl font-bold text-white uppercase">
              Quotation Dossier Transmitted
            </h3>
            <p className="text-xs font-mono text-zinc-400">
              Reference: <span className="text-white font-bold">{submittedEnquiryNumber}</span>
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
              Our B2B Production Director has received your request and will contact you via WhatsApp & Email with physical swatch delivery timelines within 4 business hours.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/919611623514?text=Hello%20Outfit%20Theory%20Atelier%2C%20I%20have%20submitted%20bulk%20enquiry%20${submittedEnquiryNumber}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-zinc-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Speed Up on WhatsApp (+91 9611623514)</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#1c1b1b] border border-[#2a2a2a] p-6 sm:p-10 space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider">
                Request Formal Institutional Quotation
              </h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Receive customized pricing with digital 3D vector mockups within 4 hours.
              </p>
            </div>

            {/* Contact Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Contact Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Vikram Raman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">
                  Organisation / University / Brand *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RVCE Cultural Forum / ScaleVentures"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Official Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Direct Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98450 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Garment Selection Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2a2a2a]">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Primary Garment Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-xs text-white font-mono focus:outline-none uppercase"
                >
                  <option value="hoodies">420-450 GSM Heavy Hoodies</option>
                  <option value="t-shirts">280 GSM Boxy Drop-Shoulder Tees</option>
                  <option value="shirts">Tailored Cotton Shirts</option>
                  <option value="multiple">Multiple Category Mix</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">
                  Estimated Quantity: <strong className="text-white">{quantity} PCS</strong>
                </label>
                <input
                  type="number"
                  min={25}
                  max={5000}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-xs text-white font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Target Deadline</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Live Tier Feedback Callout */}
            <div className="p-4 bg-[#131313] border border-[#2a2a2a] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">
                ACTIVE BULK TIER: <strong className="text-white">{currentTier.name}</strong>
              </span>
              <span className="text-white font-bold">{currentTier.perks}</span>
            </div>

            {/* Design Requirements */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-zinc-400 uppercase">
                Artwork & Design Specifications *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Mention print placements (e.g. 3D Puff Embroidery on left chest, screen print on back), Pantone shade codes, and sizing breakdown..."
                value={designRequirements}
                onChange={(e) => setDesignRequirements(e.target.value)}
                className="w-full bg-[#131313] border border-[#353534] p-3 text-xs text-white font-mono focus:outline-none focus:border-white placeholder:text-zinc-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-zinc-400 uppercase">Additional Atelier Guidance</label>
              <textarea
                rows={2}
                placeholder="Target budget per unit, delivery locations across multiple campuses, or special packaging..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full bg-[#131313] border border-[#353534] p-3 text-xs text-white font-mono focus:outline-none focus:border-white placeholder:text-zinc-600"
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-mono text-red-400">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting RFQ Dossier...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>SUBMIT RFQ FOR {quantity} PIECES</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
