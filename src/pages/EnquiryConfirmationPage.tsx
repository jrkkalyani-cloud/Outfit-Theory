import React from 'react';
import { useEnquiry } from '../context/EnquiryContext';
import { Enquiry } from '../types';

interface EnquiryConfirmationPageProps {
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const EnquiryConfirmationPage: React.FC<EnquiryConfirmationPageProps> = ({ onNavigate }) => {
  const { lastSubmittedEnquiry } = useEnquiry();

  // If no last enquiry in memory, fallback gracefully
  const enquiry: Enquiry = lastSubmittedEnquiry || {
    id: 'enq-sample',
    enquiryNumber: 'OT-ENQ-1049',
    customer: {
      fullName: 'Valued Patron',
      phone: '+91 9611623514',
      whatsAppNumber: '+91 9611623514',
      email: 'patron@atelier.com',
      orderType: 'Personal',
      organizationName: undefined,
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru',
      pincode: '560001',
      deliveryAddress: 'Atelier delivery coordinates confirmed via WhatsApp',
    },
    garment: {
      productId: 'prod-hd-01',
      productName: 'Oversized Acid Wash Heavyweight Hoodie',
      category: 'hoodies',
      fit: 'Oversized',
      fabric: '450 GSM French Terry',
      gsm: 450,
      color: { name: 'Obsidian Black', hex: '#131313' },
      size: 'L',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9JJky5FacVQY5qVR62ZzArQPfiD8mu8U_OvV-Va76B6hyP2SoZdA-E9NhObukiqx5TA2aDJ2D3ALoIm6nXwj6qeccSKuBenTUZlKs3WTP1-gO5isX914kVAapKQiTT9F1nQj1eMuOPH1NyxFfjIdz-EnOrYPjrXLjdlZPmhRY-bb9btEjkVdNZ-6dbpbohAvKcH-aJGHd52NHuYWaCisZcLQKe5ByfesEYw0nnO6z',
    },
    customisation: {
      silhouetteId: 'prod-hd-01',
      silhouetteName: 'Oversized Acid Wash Heavyweight Hoodie',
      category: 'hoodies',
      fit: 'Oversized',
      fabric: '450 GSM French Terry',
      gsm: 450,
      color: { name: 'Obsidian Black', hex: '#131313' },
      size: 'L',
      quantity: 1,
      artworkFiles: [],
      placements: ['front-center'],
      technique: 'dtg',
      techniqueName: 'Direct-to-Garment (DTG)',
      transform: { scale: 1, rotation: 0, offsetX: 0, offsetY: 0 },
      customInstructions: 'Founder alignment on bespoke placement requested.',
    },
    status: 'New enquiry',
    statusHistory: [
      {
        status: 'New enquiry',
        timestamp: new Date().toISOString(),
        note: 'Sample registered specification',
      },
    ],
    whatsAppNotificationStatus: 'logged_unconfigured',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const whatsappText = `Hello Bharath J, I have registered bespoke enquiry ${enquiry.enquiryNumber} on Outfit Theory.\n\n` +
    `Garment: ${enquiry.garment.productName} (${enquiry.garment.fit}, Size: ${enquiry.garment.size}, Qty: ${enquiry.garment.quantity})\n` +
    `Client: ${enquiry.customer.fullName} (${enquiry.customer.phone})\n\n` +
    `I would like to discuss bespoke pricing, fabric swatches, and timeline.`;
  const whatsappUrl = `https://wa.me/919611623514?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-12 space-y-8">
        {/* Confirmation Header Banner */}
        <div className="bg-[#111111] border border-[#242424] rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <span className="material-symbols-outlined text-[32px]">done_all</span>
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 block font-semibold">
              ENQUIRY REGISTERED SUCCESSFULLY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white uppercase font-bold tracking-tight">
              WEAR YOUR IDENTITY.
            </h1>
            <div className="pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                UNIQUE ENQUIRY REFERENCE
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-wider block mt-1 py-1 px-4 bg-[#181818] border border-[#2f2f2f] rounded inline-block">
                {enquiry.enquiryNumber}
              </span>
            </div>
          </div>

          {/* Reassurance Message regarding Founder WhatsApp Alignment */}
          <div className="p-5 bg-[#161616] border border-[#2a2a2a] rounded-xl max-w-2xl mx-auto text-left space-y-3">
            <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">support_agent</span>
              <span>Next Step: Founder WhatsApp Alignment</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              <strong>Outfit Theory is a bespoke custom apparel atelier — not a mass e-commerce store.</strong> Our founder and head tailor, <strong>Bharath J</strong>, has received your specifications and will personally reach out to you on WhatsApp at <strong>{enquiry.customer.whatsAppNumber || enquiry.customer.phone}</strong> to discuss bespoke pricing, textile swatches, and delivery schedules.
            </p>
          </div>

          {/* Fast-Track WhatsApp CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>CHAT WITH FOUNDER ON WHATSAPP NOW</span>
            </a>
            <button
              onClick={() => onNavigate('tracking', { orderId: enquiry.enquiryNumber })}
              className="bg-[#1c1c1c] hover:bg-[#252525] text-white border border-neutral-700 px-6 py-4 rounded-full font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">location_searching</span>
              <span>TRACK THIS ENQUIRY</span>
            </button>
          </div>
        </div>

        {/* Enquiry Specification Manifest */}
        <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
            <h2 className="font-serif text-lg text-white font-bold uppercase">
              Enquiry Summary Manifest
            </h2>
            <span className="font-mono text-xs text-neutral-400 uppercase">
              STATUS: <strong className="text-emerald-400">{enquiry.status}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Garment Details */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block border-b border-[#202020] pb-1">
                Garment & Style
              </span>
              <div className="flex gap-4 items-center">
                <div className="w-20 h-24 bg-[#0a0a0a] border border-[#252525] rounded overflow-hidden shrink-0">
                  <img
                    src={enquiry.garment.image}
                    alt={enquiry.garment.productName}
                    className="w-full h-full object-cover filter grayscale-[15%]"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base text-white font-bold">
                    {enquiry.garment.productName}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    {enquiry.garment.fit} • {enquiry.garment.gsm} GSM
                  </p>
                  <p className="text-xs font-mono text-neutral-400">
                    Fabric: {enquiry.garment.fabric}
                  </p>
                  <p className="text-xs font-mono text-white">
                    Colour: {enquiry.garment.color.name} • Size: {enquiry.garment.size}
                  </p>
                  <p className="text-xs font-mono text-white font-semibold">
                    Quantity: {enquiry.garment.quantity} piece(s)
                  </p>
                </div>
              </div>

              {enquiry.customisation && (
                <div className="p-3 bg-[#181818] border border-[#262626] rounded text-xs font-mono space-y-1.5">
                  <span className="text-white font-semibold block uppercase">Customisation Dossier:</span>
                  <p className="text-neutral-400">
                    • Placements: {enquiry.customisation.placements.join(', ') || 'Front'}
                  </p>
                  <p className="text-neutral-400">
                    • Finishing: {enquiry.customisation.techniqueName}
                  </p>
                  <p className="text-neutral-400">
                    • Artwork Files: {enquiry.customisation.artworkFiles.length} file(s) attached
                  </p>
                  {enquiry.customisation.customInstructions && (
                    <p className="text-neutral-300 pt-1 italic">
                      "{enquiry.customisation.customInstructions}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Client & Destination Details */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block border-b border-[#202020] pb-1">
                Client & Delivery Details
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">CLIENT NAME:</span>
                  <span className="text-white font-medium">{enquiry.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">WHATSAPP:</span>
                  <span className="text-white">{enquiry.customer.whatsAppNumber || enquiry.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">EMAIL:</span>
                  <span className="text-white">{enquiry.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ORDER TYPE:</span>
                  <span className="text-white">{enquiry.customer.orderType}</span>
                </div>
                {enquiry.customer.organizationName && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">ORGANIZATION:</span>
                    <span className="text-white">{enquiry.customer.organizationName}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#202020]">
                  <span className="text-neutral-500 block">DELIVERY DESTINATION:</span>
                  <p className="text-neutral-300 mt-1 leading-relaxed">
                    {enquiry.customer.deliveryAddress}
                    {enquiry.customer.city && `, ${enquiry.customer.city}`}
                    {enquiry.customer.state && `, ${enquiry.customer.state}`}
                    {enquiry.customer.pincode && ` - ${enquiry.customer.pincode}`}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-3 bg-[#181818] border border-neutral-700 text-neutral-300 font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 rounded cursor-pointer"
                >
                  Return to Atelier Catalogue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
