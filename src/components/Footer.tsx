import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#070707] border-t border-[#1C1C1C] text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand & Emblem */}
        <div className="lg:col-span-5 space-y-5">
          <button
            onClick={() => onNavigate('home')}
            className="inline-block focus:outline-none text-left"
          >
            <img
              alt="OUTFIT THEORY Logo"
              className="h-9 w-auto object-contain brightness-110"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V9UNSH4MgdwRKnt--pcmc0JMbXec7Npe6JPxHqPAiI6i1Bs2MFxBlbFrhe3pk0FZJul38VB_joW5Q1nzULPnTgi8RpZ5dLKfsNO_21pjcjb-NFA1Iu8wfGQBr2KVpYIRntbmJH5F8mACzEWa3Y1yguIgWanYJNk3qcxBroz8cN5WOZ1WrCwASIeZQiTpYr7D5zEXWs_EV2BRhJAVW_1jRklC-xjqiKmSnTNJjPItQD"
            />
          </button>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
            Haute streetwear and structural garment tailoring. Zero mass inventories. Every silhouette engineered from 240 to 450 GSM pure combed cotton.
          </p>
          <div className="space-y-1 font-mono text-xs text-neutral-400 pt-2">
            <p>
              <span className="text-white font-medium">FOUNDER & HEAD TAILOR:</span> Bharath J
            </p>
            <p>
              <span className="text-white font-medium">CONCIERGE:</span>{' '}
              <a
                href="https://wa.me/919611623514"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 hover:text-white underline decoration-neutral-600"
              >
                +91 9611623514
              </a>
            </p>
            <p>
              <span className="text-white font-medium">INQUIRIES:</span>{' '}
              <a className="hover:text-white transition-colors" href="mailto:bharathj0109@gmail.com">
                bharathj0109@gmail.com
              </a>
            </p>
            <p className="text-[11px] text-neutral-500 pt-1">
              Bengaluru Atelier & Commission Desk • Pan-India Courier Dispatches
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white border-b border-[#222222] pb-2">
            CATEGORIES
          </h4>
          <ul className="space-y-2 text-xs font-mono text-neutral-400">
            <li>
              <button
                onClick={() => onNavigate('category-hoodies')}
                className="hover:text-white transition-colors"
              >
                HOODIES (450 GSM)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('category-t-shirts')}
                className="hover:text-white transition-colors"
              >
                T-SHIRTS (280 GSM)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('category-shirts')}
                className="hover:text-white transition-colors"
              >
                TAILORED SHIRTS
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('customise')}
                className="hover:text-white transition-colors"
              >
                CUSTOMISE OUTFIT
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="hover:text-white transition-colors"
              >
                FULL ARCHIVE
              </button>
            </li>
          </ul>
        </div>

        {/* Atelier Services */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white border-b border-[#222222] pb-2">
            ATELIER
          </h4>
          <ul className="space-y-2 text-xs font-mono text-neutral-400">
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-white transition-colors"
              >
                ABOUT US
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('bulk')}
                className="hover:text-white transition-colors"
              >
                BULK & B2B ORDERS
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('tracking')}
                className="hover:text-white transition-colors"
              >
                TRACK ENQUIRY
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-white transition-colors"
              >
                CONTACT DESK
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('admin')}
                className="hover:text-white transition-colors text-neutral-500"
              >
                ADMIN CONSOLE
              </button>
            </li>
          </ul>
        </div>

        {/* Private Dispatches */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white border-b border-[#222222] pb-2">
            PRIVATE DISPATCHES
          </h4>
          <p className="text-xs text-neutral-400 font-light">
            Receive invitations to private collection drops, bespoke swatch books, and textile releases.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="YOUR EMAIL ADDRESS"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full bg-[#111111] border border-[#292929] px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 rounded-sm"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors whitespace-nowrap"
            >
              JOIN
            </button>
          </form>
          {newsletterSubscribed && (
            <p className="text-[11px] font-mono text-emerald-400 animate-fadeIn">
              ✓ Registered to private atelier dispatches.
            </p>
          )}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#181818] py-6 px-4 md:px-8 text-center sm:flex sm:items-center sm:justify-between max-w-7xl mx-auto font-mono text-[11px] text-neutral-400">
        <p>© 2025 OUTFIT THEORY ATELIER. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 sm:mt-0 tracking-widest uppercase text-neutral-300">
          WEAR YOUR IDENTITY • BESPOKE APPAREL
        </p>
      </div>
    </footer>
  );
};
