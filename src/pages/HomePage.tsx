import React from 'react';
import { Product } from '../types';
import { useEnquiry } from '../context/EnquiryContext';

interface HomePageProps {
  products: Product[];
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, onNavigate }) => {
  const { setDraftFromProduct } = useEnquiry();

  const handleRequestProduct = (product: Product) => {
    setDraftFromProduct(product);
    onNavigate('enquiry-form');
  };

  const handleCustomiseProduct = (product: Product) => {
    onNavigate('customise', { productId: product.id });
  };

  return (
    <div className="w-full bg-[#0A0A0A] font-sans text-[#E5E2E1] selection:bg-white selection:text-black">
      {/* 1. HERO SECTION: Editorial Container (Google Stitch Layout) */}
      <section className="relative w-full bg-[#0A0A0A] border-b border-[#202020] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
          <div className="relative w-full h-[620px] md:h-[660px] lg:h-[680px] rounded-xl overflow-hidden border border-[#262626] bg-[#111111] shadow-2xl flex flex-col justify-end">
            {/* Campaign Background Image */}
            <img
              alt="Outfit Theory Haute Streetwear Campaign"
              className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[30%] contrast-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATMA5miSB8M4_Fwxx1lc5g4FBZTwc2Ml5IZZF4oy9SeyDnN_zlHOYEGAYDv9J5JJmsW28ZwPuTe74hFvjuisBoKXRxfSxf8CnVNRtd4AXB6bHEa5iVS_EC9MUmQAsIcA-7z3L0tEK9sq6-InFn6ZmxAdiJ943UeLrfG4bBQc8imlN-SDbCH_86PRErOwmSIrm9pq-bOWJ8gJQIkQAqsNAWoUUXcMBGYATYGiW_PuCy"
            />
            {/* Multi-Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/90 via-[#090909]/40 to-transparent"></div>

            {/* Top Brand Badges Inside Container */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-3">
              <div className="bg-black/80 backdrop-blur-md border border-[#333333] px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="font-mono text-[11px] tracking-widest uppercase text-neutral-300">
                  AUTUMN / WINTER BLUEPRINT 04
                </span>
              </div>
              <div className="hidden sm:inline-flex bg-black/60 backdrop-blur-md border border-[#2a2a2a] px-3 py-1.5 rounded-full font-mono text-[11px] text-neutral-400">
                ATELIER GRADE: 240 – 450 GSM
              </div>
            </div>

            {/* Hero Content Layer */}
            <div className="relative z-10 p-6 md:p-12 lg:p-14 max-w-3xl space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-neutral-400"></span>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                    HAUTE STREETWEAR PLATFORM
                  </span>
                </div>
                <h1 className="font-headline-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none uppercase font-serif">
                  OUTFIT THEORY
                </h1>
                <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-neutral-300 font-light tracking-wide">
                  WEAR YOUR IDENTITY.
                </p>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-light">
                Bespoke Haute Streetwear & Structural Apparel. Architectural silhouettes tailored from 240 to 450 GSM luxury fabrics. No off-the-rack mass production — every piece is individually engineered to order.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('customise')}
                  className="bg-white text-black px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>REQUEST YOUR OUTFIT</span>
                  <span className="material-symbols-outlined text-[16px]">north_east</span>
                </button>
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 px-6 py-3.5 rounded-full text-xs font-medium tracking-[0.16em] uppercase transition-all backdrop-blur-sm cursor-pointer"
                >
                  EXPLORE ARCHIVE
                </button>
                <a
                  className="inline-flex items-center gap-2 bg-[#121212]/90 border border-neutral-700/80 px-4 py-3 rounded-full text-xs font-mono text-neutral-300 hover:text-white hover:border-emerald-500/60 transition-all"
                  href="https://wa.me/919611623514?text=Hello%20Outfit%20Theory%20Concierge%2C%20I%20would%20like%20to%20open%20a%20bespoke%20garment%20inquiry."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">forum</span>
                  <span>WHATSAPP CONCIERGE (+91 9611623514)</span>
                </a>
              </div>

              {/* Micro Specifications */}
              <div className="pt-2 border-t border-neutral-800/80 grid grid-cols-3 gap-4 max-w-md font-mono text-[10px] tracking-wider text-neutral-400 uppercase">
                <div>
                  <span className="text-neutral-500 block">DENSITY</span>
                  <span className="text-white font-medium">450 GSM TERRY</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">PRICING</span>
                  <span className="text-white font-medium">BY ENQUIRY ONLY</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">DISPATCH</span>
                  <span className="text-white font-medium">INDIVIDUAL TAILORING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PILLAR BAR */}
      <section className="w-full bg-[#0D0D0D] border-b border-[#1C1C1C] py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded bg-[#121212] border border-[#212121]">
            <span className="material-symbols-outlined text-neutral-400 text-[24px]">layers</span>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white">450 GSM DENSITY</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Extreme weight French Terry with zero sag & lifetime architectural shape retention.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5 p-4 rounded bg-[#121212] border border-[#212121]">
            <span className="material-symbols-outlined text-neutral-400 text-[24px]">tune</span>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white">ZERO MASS RETAIL</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                No generic inventories. Every garment is cut, finished, and embellished strictly to your blueprint.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5 p-4 rounded bg-[#121212] border border-[#212121]">
            <span className="material-symbols-outlined text-neutral-400 text-[24px]">palette</span>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white">HAUTE EMBELLISHMENT</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                High-density 3D puff embroidery, silk screen, and subtle tonal monogramming.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5 p-4 rounded bg-[#121212] border border-[#212121]">
            <span className="material-symbols-outlined text-neutral-400 text-[24px]">chat_bubble_outline</span>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white">DIRECT OWNER CONCIERGE</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Consult one-on-one with the founder & master cutter via WhatsApp for fitting & delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES SECTION (Hoodies, T-Shirts, Shirts - NO PRICES) */}
      <section className="w-full bg-[#0A0A0A] py-20 px-4 md:px-8 border-b border-[#1E1E1E]" id="product-categories">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                THE ATELIER BLUEPRINTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white uppercase tracking-tight font-bold">
                ARCHITECTURAL CATEGORIES
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl font-light">
                Explore our three foundational silhouettes. All pieces are available for complete tailored customisation, single-unit prototypes, or bulk corporate editions.
              </p>
            </div>
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
              ALL ORDERS ENGINEERED BY SPECIFICATION
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category 1: HOODIES */}
            <article className="group bg-[#111111] border border-[#242424] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
                  <img
                    alt="450 GSM Oversized French Terry Hoodie"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9JJky5FacVQY5qVR62ZzArQPfiD8mu8U_OvV-Va76B6hyP2SoZdA-E9NhObukiqx5TA2aDJ2D3ALoIm6nXwj6qeccSKuBenTUZlKs3WTP1-gO5isX914kVAapKQiTT9F1nQj1eMuOPH1NyxFfjIdz-EnOrYPjrXLjdlZPmhRY-bb9btEjkVdNZ-6dbpbohAvKcH-aJGHd52NHuYWaCisZcLQKe5ByfesEYw0nnO6z"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase border border-neutral-800">
                      CATEGORY // 01
                    </span>
                    <span className="bg-white text-black font-mono text-[10px] font-semibold tracking-widest px-2.5 py-0.5 uppercase">
                      450 GSM TERRY
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 backdrop-blur-sm text-neutral-300 font-mono text-[10px] px-2.5 py-1 uppercase border border-neutral-800">
                      BY ENQUIRY ONLY
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">HEAVYWEIGHT PIECE</span>
                    <h3 className="font-serif text-2xl text-white tracking-wide uppercase mt-1 font-bold">HOODIES</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
                      450 GSM ultra-compact French Terry. Double-layered drop-shoulder architectural hoods, heavyweight ribbed cuffs, and zero-sag bottom hem.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#202020] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">AVAILABLE STYLES</span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Oversized</span>
                        <span className="text-neutral-500 text-[10px]">450 GSM</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Regular-Fit</span>
                        <span className="text-neutral-500 text-[10px]">380 GSM</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Zip-Up</span>
                        <span className="text-neutral-500 text-[10px]">420 GSM</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Pullover</span>
                        <span className="text-neutral-500 text-[10px]">450 GSM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('customise', { productId: 'prod-hd-01' })}
                  className="bg-white text-black py-3 rounded text-center text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  CUSTOMISE HOODIE
                </button>
                <button
                  onClick={() => onNavigate('category-hoodies')}
                  className="bg-[#1e1e1e] hover:bg-[#292929] text-white border border-[#333333] py-3 rounded text-center text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  VIEW HOODIES
                </button>
              </div>
            </article>

            {/* Category 2: T-SHIRTS */}
            <article className="group bg-[#111111] border border-[#242424] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
                  <img
                    alt="280 GSM Boxy Drop-Shoulder Jersey T-Shirt"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbWwpkh1yQ8Z7GyoxrazPFnn1WM9_HY_8qJ0ZviKVU-qvCnU4HkkTmK83CsX27fS9wAwwehS_OUujM3LDKC8J6rDV8nrSxh4_rEP6lqcoQ78blEpB-7UsCaS6vD9RjXt_vm8kcvGrvywgmnq1fTlF_soD9WO9kLVZfWWDyol3hMe5yBrxmjrhMPOhf4ocGO0y_RG6ymdt2E4MyT9fUNMelnCKagitUH6qq7xS-YSTM"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase border border-neutral-800">
                      CATEGORY // 02
                    </span>
                    <span className="bg-white text-black font-mono text-[10px] font-semibold tracking-widest px-2.5 py-0.5 uppercase">
                      280 GSM JERSEY
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 backdrop-blur-sm text-neutral-300 font-mono text-[10px] px-2.5 py-1 uppercase border border-neutral-800">
                      BY ENQUIRY ONLY
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">SIGNATURE DRAPE</span>
                    <h3 className="font-serif text-2xl text-white tracking-wide uppercase mt-1 font-bold">T-SHIRTS</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
                      280 GSM compact combed cotton. High-tension 1.25" ribbed collar that stays rigid after dozens of washes, drop shoulders, and tailored side vents.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#202020] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">AVAILABLE STYLES</span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Oversized</span>
                        <span className="text-neutral-500 text-[10px]">280 GSM</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Regular-Fit</span>
                        <span className="text-neutral-500 text-[10px]">240 GSM</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Boxy-Fit</span>
                        <span className="text-neutral-500 text-[10px]">260 GSM</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Long-Sleeve</span>
                        <span className="text-neutral-500 text-[10px]">280 GSM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('customise', { productId: 'prod-ts-01' })}
                  className="bg-white text-black py-3 rounded text-center text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  CUSTOMISE T-SHIRT
                </button>
                <button
                  onClick={() => onNavigate('category-t-shirts')}
                  className="bg-[#1e1e1e] hover:bg-[#292929] text-white border border-[#333333] py-3 rounded text-center text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  VIEW T-SHIRTS
                </button>
              </div>
            </article>

            {/* Category 3: SHIRTS */}
            <article className="group bg-[#111111] border border-[#242424] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
                  <img
                    alt="Tailored Structural Collarless & Twill Shirt"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase border border-neutral-800">
                      CATEGORY // 03
                    </span>
                    <span className="bg-white text-black font-mono text-[10px] font-semibold tracking-widest px-2.5 py-0.5 uppercase">
                      LONG-STAPLE TWILL
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 backdrop-blur-sm text-neutral-300 font-mono text-[10px] px-2.5 py-1 uppercase border border-neutral-800">
                      BY ENQUIRY ONLY
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">SARTORIAL LAB</span>
                    <h3 className="font-serif text-2xl text-white tracking-wide uppercase mt-1 font-bold">SHIRTS</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
                      Superfine 60s Twill & Heavy Oxford cotton. Minimalist concealed plackets, sculpted geometric cuffs, and bespoke collar profiles.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#202020] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">AVAILABLE STYLES</span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Collarless</span>
                        <span className="text-neutral-500 text-[10px]">Twill</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Collared</span>
                        <span className="text-neutral-500 text-[10px]">Oxford</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Full-Sleeve</span>
                        <span className="text-neutral-500 text-[10px]">Cotton</span>
                      </div>
                      <div className="bg-[#181818] px-2.5 py-1.5 border border-[#272727] rounded-sm flex items-center justify-between">
                        <span>Mandarin</span>
                        <span className="text-neutral-500 text-[10px]">Poplin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('customise', { productId: 'prod-sh-01' })}
                  className="bg-white text-black py-3 rounded text-center text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  CUSTOMISE SHIRT
                </button>
                <button
                  onClick={() => onNavigate('category-shirts')}
                  className="bg-[#1e1e1e] hover:bg-[#292929] text-white border border-[#333333] py-3 rounded text-center text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  VIEW SHIRTS
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 4. HAUTE ARCHIVE // EDITORIAL LOOKBOOK 2025 */}
      <section className="w-full bg-[#070707] py-20 px-4 md:px-8 border-b border-[#1E1E1E]" id="editorial-lookbook">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                HAUTE ARCHIVE // LOOKBOOK 2025
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white uppercase tracking-tight font-bold">
                EDITORIAL LOOKBOOK & SILHOUETTE ARCHIVE
              </h2>
              <p className="text-sm text-neutral-400 max-w-2xl font-light">
                An editorial examination of form, drape, and structural weight. View our foundational cuts styled in brutalist architectural spaces, available exclusively via bespoke atelier commission.
              </p>
            </div>
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              PRIVATE ATELIER DISPATCH
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Look 01 */}
            <article className="group bg-[#111111] border border-[#242424] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
                  <img
                    alt="High-fashion luxury streetwear lookbook editorial - 450 GSM oversized hoodie"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC26PVWkikASFn4W_XH6O3FhDEN9t2J3ZNbQN79yBC5YtkwCJ2CjDaPEGDoyANrcZTl2r82hBErK57NVVv6HBRCDzbmG07CV9HAFhSbNjIJPvDTgtM7RGiJEPR1DCgv3CTH8A3oLhDZ0ZL5kUIsWc15EpzT9UV8tLGlxRaSLQUJUybhky1bj1z8HGr56roDve1Fiir6O5OL5BtrB29RkGGQoQ3VD5o02SwnmVcOL8Dw"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase border border-neutral-800">
                      LOOK // 01
                    </span>
                    <span className="bg-white text-black font-mono text-[10px] font-semibold tracking-widest px-2.5 py-0.5 uppercase">
                      450 GSM ARCHITECTURAL
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 backdrop-blur-sm text-neutral-300 font-mono text-[10px] px-2.5 py-1 uppercase border border-neutral-800">
                      BY ENQUIRY ONLY
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">CURATED SILHOUETTE</span>
                    <h3 className="font-serif text-2xl text-white tracking-wide uppercase mt-1 font-bold">
                      01 // THE ARCHITECTURAL HOODIE (450 GSM)
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
                      Engineered with an ultra-dense 450 GSM French Terry drape, drop shoulders, and reinforced structural seams built for monumental presence.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#202020] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">STRUCTURAL TAGS</span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">Double-Layered Hood</span>
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">Zero Sag Cuff</span>
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">French Terry</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7 pt-0 grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => onNavigate('customise', { productId: 'prod-hd-01' })}
                  className="bg-white text-black py-3 rounded text-center text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  CUSTOMISE THIS SILHOUETTE
                </button>
                <a
                  className="bg-[#1e1e1e] hover:bg-[#292929] text-white border border-[#333333] py-2.5 rounded text-center text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  href="https://wa.me/919611623514?text=Hi%20Outfit%20Theory%2C%20I%20am%20enquiring%20about%2001%20The%20Architectural%20Hoodie%20(450%20GSM)."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[15px] text-emerald-400">chat</span>
                  <span>ENQUIRE ON WHATSAPP (+91 9611623514)</span>
                </a>
              </div>
            </article>

            {/* Look 02 */}
            <article className="group bg-[#111111] border border-[#242424] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
                  <img
                    alt="High-fashion luxury streetwear lookbook editorial - 280 GSM minimal boxy t-shirt"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlmZI5PrjztigLmCxfEoAJK0DZ68b13Ul2bKJ7DzODgAaaq-R55suvqh57sRm2Vsisjtx4ehnGBcCup7W28rJv7bb9PUGcy0Ikzo5ng0_XAYDx0gW3oQKuQaGHHFXEmvqOSLImp1k1ajtHGsatzaraEh7BIgyA148J-ugE4_2pK0jk1t4USRtrrjROtZNuwzVFJezSm_zclquulPJZvUHhGjlAnZaxPDs5PCt63lr6"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase border border-neutral-800">
                      LOOK // 02
                    </span>
                    <span className="bg-white text-black font-mono text-[10px] font-semibold tracking-widest px-2.5 py-0.5 uppercase">
                      280 GSM BOXY DRAPE
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 backdrop-blur-sm text-neutral-300 font-mono text-[10px] px-2.5 py-1 uppercase border border-neutral-800">
                      BY ENQUIRY ONLY
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">CURATED SILHOUETTE</span>
                    <h3 className="font-serif text-2xl text-white tracking-wide uppercase mt-1 font-bold">
                      02 // THE BOXY STATEMENT TEE (280 GSM)
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
                      Structured geometry meets soft tactile weight. Cut with wide chest dimensions, sculpted drop-sleeves, and an immovable collar build.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#202020] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">STRUCTURAL TAGS</span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">Drop Shoulder</span>
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">High-Tension Collar</span>
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">Combed Compact Jersey</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7 pt-0 grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => onNavigate('customise', { productId: 'prod-ts-01' })}
                  className="bg-white text-black py-3 rounded text-center text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  CUSTOMISE THIS SILHOUETTE
                </button>
                <a
                  className="bg-[#1e1e1e] hover:bg-[#292929] text-white border border-[#333333] py-2.5 rounded text-center text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  href="https://wa.me/919611623514?text=Hi%20Outfit%20Theory%2C%20I%20am%20enquiring%20about%2002%20The%20Boxy%20Statement%20Tee%20(280%20GSM)."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[15px] text-emerald-400">chat</span>
                  <span>ENQUIRE ON WHATSAPP (+91 9611623514)</span>
                </a>
              </div>
            </article>

            {/* Look 03 */}
            <article className="group bg-[#111111] border border-[#242424] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
                  <img
                    alt="Luxury streetwear editorial lookbook - structured black collarless shirt"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv-Jbe2aOfImj8MT4cyp7JJPSrXhojmX8uOovy7PJ6wX0mvWKXvbhPJXOz8ebLuaUyjUQZvkST3eREwhwPd7QLOhLaNSl1OO-KUY09wEsySfFXOf4ZsMAMruQ5Q4zVh96KD9Ua7i-UT2aQgsOYMTHEBMx-GWTY4ZjAJG-oEEs-5-LkaJv3JEIKy_GIsXcYGzmAycIskjUX52Wgc9zliFcwaEWf3-YwcVORZ4DQr0Go"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <span className="bg-black/85 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase border border-neutral-800">
                      LOOK // 03
                    </span>
                    <span className="bg-white text-black font-mono text-[10px] font-semibold tracking-widest px-2.5 py-0.5 uppercase">
                      60S TWILL TAILORING
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 backdrop-blur-sm text-neutral-300 font-mono text-[10px] px-2.5 py-1 uppercase border border-neutral-800">
                      BY ENQUIRY ONLY
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">CURATED SILHOUETTE</span>
                    <h3 className="font-serif text-2xl text-white tracking-wide uppercase mt-1 font-bold">
                      03 // SARTORIAL TAILORED SHIRT (60s TWILL)
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
                      Avant-garde architectural tailoring with minimalist fly-front concealing, bespoke collar lines, and structured geometric sleeve drapes.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#202020] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">STRUCTURAL TAGS</span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">Concealed Placket</span>
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">Geometric Cuffs</span>
                      <span className="bg-[#181818] px-2.5 py-1 border border-[#272727] rounded-sm text-[11px]">Structured Drapes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7 pt-0 grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => onNavigate('customise', { productId: 'prod-sh-01' })}
                  className="bg-white text-black py-3 rounded text-center text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  CUSTOMISE THIS SILHOUETTE
                </button>
                <a
                  className="bg-[#1e1e1e] hover:bg-[#292929] text-white border border-[#333333] py-2.5 rounded text-center text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  href="https://wa.me/919611623514?text=Hi%20Outfit%20Theory%2C%20I%20am%20enquiring%20about%2003%20Sartorial%20Tailored%20Shirt%20(60s%20Twill)."
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[15px] text-emerald-400">chat</span>
                  <span>ENQUIRE ON WHATSAPP (+91 9611623514)</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. BESPOKE ATELIER PROCESS SECTION (Clean 4-Step Protocol) */}
      <section className="w-full bg-[#0D0D0D] py-20 px-4 md:px-8 border-b border-[#1E1E1E]" id="atelier-process">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block">
              THE ATELIER PROTOCOL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white uppercase tracking-tight font-bold">
              ENGINEERED IN 4 STEPS
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              From individual creative statements to corporate capsule collections. Here is how your bespoke garment comes to life.
            </p>
          </div>

          {/* 4 Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#121212] border border-[#222222] p-7 rounded-lg space-y-4 relative group hover:border-[#383838] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl text-neutral-600 group-hover:text-white transition-colors">01</span>
                <span className="material-symbols-outlined text-neutral-500">styler</span>
              </div>
              <h3 className="font-serif text-lg text-white uppercase font-bold">Silhouette Selection</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Choose your base form: Oversized 450 GSM Hoodie, Boxy 280 GSM Drop-Tee, Collarless Tailored Shirt, or Pullover Canvas.
              </p>
              <div className="pt-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                PHASE 01 // PATTERN & FIT
              </div>
            </div>

            <div className="bg-[#121212] border border-[#222222] p-7 rounded-lg space-y-4 relative group hover:border-[#383838] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl text-neutral-600 group-hover:text-white transition-colors">02</span>
                <span className="material-symbols-outlined text-neutral-500">texture</span>
              </div>
              <h3 className="font-serif text-lg text-white uppercase font-bold">Fabric & GSM Density</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Select textile weight from 240 to 450 GSM. Choose French Terry, compact combed jersey, or Oxford twill with custom bio-wash finishes.
              </p>
              <div className="pt-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                PHASE 02 // TEXTILE ENGINE
              </div>
            </div>

            <div className="bg-[#121212] border border-[#222222] p-7 rounded-lg space-y-4 relative group hover:border-[#383838] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl text-neutral-600 group-hover:text-white transition-colors">03</span>
                <span className="material-symbols-outlined text-neutral-500">format_shapes</span>
              </div>
              <h3 className="font-serif text-lg text-white uppercase font-bold">Artwork & Placement</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Submit your vector typography or graphic blueprint. Specify high-density 3D puff embroidery, DTG silkscreen, or tone-on-tone embroidery.
              </p>
              <div className="pt-2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                PHASE 03 // EMBELLISHMENT
              </div>
            </div>

            <div className="bg-[#121212] border border-[#222222] p-7 rounded-lg space-y-4 relative group hover:border-[#383838] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl text-emerald-400">04</span>
                <span className="material-symbols-outlined text-emerald-400">support_agent</span>
              </div>
              <h3 className="font-serif text-lg text-white uppercase font-bold">WhatsApp Owner Consult</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Connect directly with Bharath (Founder & Head Tailor). Finalize dimensional proofs, order quantities, and express delivery coordinates.
              </p>
              <div className="pt-2 font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
                PHASE 04 // DIRECT CONCIERGE
              </div>
            </div>
          </div>

          {/* 6. LARGE PROMINENT CTA BANNER */}
          <div className="relative bg-gradient-to-r from-[#141414] via-[#1c1c1c] to-[#141414] border border-[#2d2d2d] rounded-xl p-8 sm:p-12 lg:p-16 text-center space-y-8 overflow-hidden shadow-2xl">
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 block">
                NO CART • NO STANDARD PRICING • 100% BESPOKE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight font-bold">
                READY TO WEAR YOUR IDENTITY?
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Every garment is an original structural art piece crafted exclusively for you, your club, or your corporate team. Start your enquiry now.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('customise')}
                className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold tracking-[0.18em] uppercase hover:bg-neutral-200 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>REQUEST YOUR OUTFIT</span>
                <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
              </button>
              <a
                className="bg-[#1f1f1f] hover:bg-[#292929] text-white border border-neutral-700 px-7 py-4 rounded-full text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2"
                href="https://wa.me/919611623514?text=Hi%20Bharath%2C%20I%20have%20an%20order%20question%20for%20Outfit%20Theory."
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">chat</span>
                <span>WHATSAPP DIRECT ENQUIRY (+91 9611623514)</span>
              </a>
            </div>

            <div className="font-mono text-[11px] text-neutral-400 flex flex-wrap items-center justify-center gap-4 uppercase tracking-widest pt-2">
              <span>DIRECT ATELIER DESK</span>
              <span>•</span>
              <span>PAN-INDIA DISPATCH</span>
              <span>•</span>
              <span>CORPORATE & INDIVIDUAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BRAND ETHOS & BULK TIERS */}
      <section className="w-full bg-[#0A0A0A] py-20 px-4 md:px-8 border-b border-[#1E1E1E]" id="brand-ethos">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#2b2b2b] text-neutral-300 font-mono text-xs">
              <span>ATELIER ARCHITECTURE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight font-bold">
              CRAFTED FOR THOSE WHO REJECT THE GENERIC.
            </h2>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Outfit Theory was founded on a singular conviction: luxury streetwear should not come from a soulless warehouse shelf. By offering heavyweight fabrics from 240 to 450 GSM and direct artisan consultations, each piece becomes an unmistakable extension of your identity.
            </p>
            <div className="pt-2 border-t border-[#222222] grid grid-cols-2 gap-4 font-mono text-xs text-neutral-400">
              <div>
                <span className="text-white font-semibold block text-sm">450 GSM</span>
                <span>Heavyweight Standard</span>
              </div>
              <div>
                <span className="text-white font-semibold block text-sm">1 : 1 CRAFT</span>
                <span>Direct Tailor Alignment</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#111111] border border-[#242424] p-8 md:p-10 rounded-xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block">
              BULK & CORPORATE TIERS
            </span>
            <h3 className="font-serif text-2xl text-white uppercase font-bold">
              BESPOKE MERCHANDISE FOR STARTUPS & TEAMS
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
              We provide specialized batch manufacturing for tech enterprises, Series-A teams, premium university cultural councils, and music collectives who demand supreme fabric standards over flimsy promotional giveaways.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#181818] border border-[#292929] rounded">
                <span className="text-white font-medium block">25 – 50 UNITS</span>
                <span className="text-neutral-400 text-[11px]">Custom puff & embroidery</span>
              </div>
              <div className="p-3 bg-[#181818] border border-[#292929] rounded">
                <span className="text-white font-medium block">50 – 200 UNITS</span>
                <span className="text-neutral-400 text-[11px]">Custom neck tags & pantone</span>
              </div>
              <div className="p-3 bg-[#181818] border border-[#292929] rounded">
                <span className="text-white font-medium block">200+ UNITS</span>
                <span className="text-neutral-400 text-[11px]">Dedicated cutter & express air</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('bulk')}
                className="inline-flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider hover:text-neutral-300 cursor-pointer"
              >
                <span>EXPLORE BULK & B2B COMMISSION WORKFLOW</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
