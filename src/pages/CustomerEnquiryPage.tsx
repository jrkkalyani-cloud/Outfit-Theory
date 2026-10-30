import React, { useState } from 'react';
import { useEnquiry } from '../context/EnquiryContext';
import { OrderType } from '../types';

interface CustomerEnquiryPageProps {
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const CustomerEnquiryPage: React.FC<CustomerEnquiryPageProps> = ({ onNavigate }) => {
  const { activeDraft, addSavedEnquiry, showToast } = useEnquiry();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [email, setEmail] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('Personal');
  const [organizationName, setOrganizationName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');
  const [additionalNotes, setAdditionalNotes] = useState(activeDraft.additionalInstructions || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please provide your full name, contact phone number, and email.');
      return;
    }

    const finalWhatsApp = sameAsPhone ? phone.trim() : (whatsAppNumber.trim() || phone.trim());

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: fullName.trim(),
            phone: phone.trim(),
            whatsAppNumber: finalWhatsApp,
            email: email.trim(),
            orderType,
            organizationName: organizationName.trim() || undefined,
            country,
            state,
            city,
            pincode,
            deliveryAddress: deliveryAddress.trim() || 'Address to be confirmed on WhatsApp',
          },
          garment: {
            productId: activeDraft.productId,
            productName: activeDraft.productName,
            category: activeDraft.category,
            fit: activeDraft.fit,
            fabric: activeDraft.fabric,
            gsm: activeDraft.gsm,
            color: activeDraft.color,
            size: activeDraft.size,
            quantity: activeDraft.quantity,
            image: activeDraft.image,
          },
          customisation: activeDraft.customisation,
          additionalInstructions: additionalNotes.trim(),
        }),
      });

      const result = await response.json();
      if (result.success && result.data) {
        addSavedEnquiry(result.data);
        showToast(`Enquiry ${result.data.enquiryNumber} submitted successfully`);
        onNavigate('enquiry-confirmation');
      } else {
        setErrorMessage(result.message || 'Unable to register enquiry. Please check details or reach out via WhatsApp.');
      }
    } catch (err: any) {
      console.error('Error submitting enquiry:', err);
      setErrorMessage('Network connection error. Please try again or message our concierge directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen pb-24 font-sans">
      {/* Page Header */}
      <div className="w-full bg-[#050505] border-b border-[#1E1E1E] py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <button onClick={() => onNavigate('shop')} className="hover:text-white cursor-pointer">
              CATALOGUE
            </button>
            <span>/</span>
            <span className="text-white">BESPOKE ENQUIRY DOSSIER</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl uppercase text-white font-bold tracking-tight">
            SUBMIT YOUR OUTFIT ENQUIRY
          </h1>
          <p className="text-sm text-neutral-400 font-light max-w-2xl">
            Outfit Theory operates as a bespoke commission atelier. Submit your garment specifications and our founder, Bharath J, will personally contact you via WhatsApp to discuss bespoke pricing, swatches, and timeline.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Garment Specification Manifest Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  SELECTED GARMENT
                </span>
                <span className="bg-[#181818] border border-neutral-700 text-neutral-300 font-mono text-[10px] px-2 py-0.5 uppercase rounded">
                  {activeDraft.category.toUpperCase()}
                </span>
              </div>

              {/* Garment Image & Name */}
              <div className="flex gap-4 items-center">
                <div className="w-20 h-24 bg-[#0a0a0a] border border-[#252525] rounded overflow-hidden shrink-0">
                  <img
                    src={activeDraft.image}
                    alt={activeDraft.productName}
                    className="w-full h-full object-cover filter grayscale-[15%]"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base text-white font-bold leading-tight">
                    {activeDraft.productName}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1">
                    {activeDraft.fit} • {activeDraft.gsm} GSM
                  </p>
                  <p className="text-xs font-mono text-neutral-400">
                    Fabric: {activeDraft.fabric}
                  </p>
                </div>
              </div>

              {/* Garment Specs Matrix */}
              <div className="bg-[#161616] border border-[#222222] p-3.5 rounded text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">COLOURWAY:</span>
                  <div className="flex items-center gap-1.5 text-white">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-neutral-500 inline-block"
                      style={{ backgroundColor: activeDraft.color.hex }}
                    />
                    <span>{activeDraft.color.name}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">SIZE:</span>
                  <span className="text-white font-semibold">{activeDraft.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">QUANTITY:</span>
                  <span className="text-white font-semibold">{activeDraft.quantity} unit(s)</span>
                </div>
                {activeDraft.customisation && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">PLACEMENTS:</span>
                      <span className="text-white text-right">
                        {activeDraft.customisation.placements.join(', ') || 'Front Center'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">TECHNIQUE:</span>
                      <span className="text-emerald-400">
                        {activeDraft.customisation.techniqueName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">ARTWORK ATTACHED:</span>
                      <span className="text-white">
                        {activeDraft.customisation.artworkFiles.length} file(s)
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Re-edit trigger */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('customise', { productId: activeDraft.productId })}
                  className="w-full py-2 bg-[#181818] border border-neutral-700 text-neutral-300 text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 rounded cursor-pointer"
                >
                  Adjust Customisation
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="w-full py-2 bg-[#181818] border border-neutral-700 text-neutral-300 text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 rounded cursor-pointer"
                >
                  Change Garment
                </button>
              </div>

              {/* Informational Card */}
              <div className="p-3 bg-[#181818] border border-emerald-900/40 rounded text-xs font-mono text-emerald-300/90 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>HOW PRICING WORKS</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  We don't display generic cart prices. Because every garment uses custom yarn weights (240–450 GSM) and bespoke embellishments, our founder provides exact quotes with transparent tiered pricing directly via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Customer Details Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-[#111111] border border-[#242424] rounded-xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="space-y-1 pb-3 border-b border-[#202020]">
                <h2 className="font-serif text-xl text-white font-bold uppercase">
                  Client Contact Dossier
                </h2>
                <p className="text-xs text-neutral-400 font-light">
                  Please provide your accurate WhatsApp contact for personalized tailor alignment.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-200 text-xs font-mono rounded">
                  {errorMessage}
                </div>
              )}

              {/* Order Type Radio Pills */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                  Commission Order Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(['Personal', 'College', 'Corporate', 'Club', 'Bulk'] as OrderType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`py-2 text-center text-xs font-mono uppercase rounded border transition-colors cursor-pointer ${
                        orderType === type
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-[#181818] text-neutral-400 border-[#2a2a2a] hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Organization Name (If applicable) */}
              {orderType !== 'Personal' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                    Organization / College / Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="E.g., RVCE Cultural Council, Razorpay Tech Team, Studio Zero..."
                    className="w-full bg-[#181818] border border-[#333333] px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                  />
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g., Arjun Nair"
                    className="w-full bg-[#181818] border border-[#333333] px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arjun@example.com"
                    className="w-full bg-[#181818] border border-[#333333] px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                  />
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                      Phone Number (Primary) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#181818] border border-[#333333] px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                    />
                  </div>

                  {!sameAsPhone && (
                    <div className="space-y-1.5 animate-fadeIn">
                      <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsAppNumber}
                        onChange={(e) => setWhatsAppNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#181818] border border-[#333333] px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                      />
                    </div>
                  )}
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-neutral-400">
                  <input
                    type="checkbox"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="w-4 h-4 accent-white rounded-none cursor-pointer"
                  />
                  <span>WhatsApp number is identical to primary phone number</span>
                </label>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3 pt-3 border-t border-[#202020]">
                <span className="text-xs font-mono text-white uppercase font-semibold block">
                  Delivery Destination
                </span>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase block">
                    Street Address / Studio / Concierge Location
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Apartment, suite, building, street..."
                    className="w-full bg-[#181818] border border-[#333333] px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase block">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full bg-[#181818] border border-[#333333] px-3 py-2 text-xs text-white focus:outline-none rounded font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase block">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Karnataka"
                      className="w-full bg-[#181818] border border-[#333333] px-3 py-2 text-xs text-white focus:outline-none rounded font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-neutral-400 uppercase block">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="560001"
                      className="w-full bg-[#181818] border border-[#333333] px-3 py-2 text-xs text-white focus:outline-none rounded font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Tailor Notes */}
              <div className="space-y-1.5 pt-2 border-t border-[#202020]">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                  Additional Notes / Bespoke Requests
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Mention target event date, custom fit preferences, packaging requests, or questions regarding fabric swatches..."
                  rows={3}
                  className="w-full bg-[#181818] border border-[#333333] p-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white rounded font-mono"
                />
              </div>

              {/* Submit Action Button */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 rounded shadow-2xl disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      <span>TRANSMITTING ENQUIRY DOSSIER...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT ENQUIRY</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] font-mono text-neutral-500 text-center">
                  By submitting, your bespoke request will be transmitted directly to founder Bharath J (+91 9611623514). You will receive a unique enquiry tracking reference.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
