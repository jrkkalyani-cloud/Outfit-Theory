import React, { useState } from 'react';
import { Product, GarmentCategory } from '../types';
import { useEnquiry } from '../context/EnquiryContext';

interface ShopPageProps {
  products: Product[];
  initialCategory?: GarmentCategory | 'all';
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ products, initialCategory = 'all', onNavigate }) => {
  const { setDraftFromProduct } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<GarmentCategory | 'all'>(initialCategory);
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'gsm-desc' | 'gsm-asc'>('featured');
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);

  // Derive unique fits based on selected category
  const availableFits = Array.from(
    new Set(
      products
        .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
        .map((p) => p.fit)
    )
  );

  const filtered = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedFit !== 'all' && product.fit !== selectedFit) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchFabric = product.fabric.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchFabric) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'gsm-desc') return b.gsm - a.gsm;
    if (sortBy === 'gsm-asc') return a.gsm - b.gsm;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const handleRequestOutfit = (product: Product) => {
    setDraftFromProduct(product);
    onNavigate('enquiry-form');
  };

  const handleCustomiseOutfit = (product: Product) => {
    onNavigate('customise', { productId: product.id });
  };

  return (
    <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen pb-24">
      {/* Category Banner */}
      <div className="w-full bg-[#050505] border-b border-[#1E1E1E] py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              HOME
            </button>
            <span>/</span>
            <span className="text-white">ATELIER ARCHIVE</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-neutral-300 uppercase">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
                {selectedCategory === 'all'
                  ? 'ATELIER READY-TO-WEAR ARCHIVE'
                  : selectedCategory.toUpperCase()}
              </h1>
              <p className="text-sm text-neutral-400 max-w-2xl font-light mt-2">
                Engineered with 190 to 450 GSM Indian combed cottons, zero-sag French Terry loopback weaves, and Japanese minimal drape patterns. All garments available strictly by bespoke enquiry.
              </p>
            </div>
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              NO CART • BESPOKE COMMISSIONS ONLY
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        {/* Filter and Search Bar */}
        <div className="bg-[#111111] border border-[#222222] p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-lg">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono uppercase">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFit('all');
              }}
              className={`px-3.5 py-2 whitespace-nowrap rounded transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-[#181818]'
              }`}
            >
              ALL PIECES ({products.length})
            </button>
            <button
              onClick={() => {
                setSelectedCategory('hoodies');
                setSelectedFit('all');
              }}
              className={`px-3.5 py-2 whitespace-nowrap rounded transition-colors cursor-pointer ${
                selectedCategory === 'hoodies'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-[#181818]'
              }`}
            >
              HOODIES
            </button>
            <button
              onClick={() => {
                setSelectedCategory('t-shirts');
                setSelectedFit('all');
              }}
              className={`px-3.5 py-2 whitespace-nowrap rounded transition-colors cursor-pointer ${
                selectedCategory === 't-shirts'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-[#181818]'
              }`}
            >
              T-SHIRTS
            </button>
            <button
              onClick={() => {
                setSelectedCategory('shirts');
                setSelectedFit('all');
              }}
              className={`px-3.5 py-2 whitespace-nowrap rounded transition-colors cursor-pointer ${
                selectedCategory === 'shirts'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white bg-[#181818]'
              }`}
            >
              SHIRTS
            </button>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Fit Filter Dropdown */}
            {availableFits.length > 0 && (
              <select
                value={selectedFit}
                onChange={(e) => setSelectedFit(e.target.value)}
                className="bg-[#181818] border border-[#333333] px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none uppercase rounded cursor-pointer"
              >
                <option value="all">ALL FITS</option>
                {availableFits.map((f) => (
                  <option key={f} value={f}>
                    {f.toUpperCase()}
                  </option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#181818] border border-[#333333] px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none uppercase rounded cursor-pointer"
            >
              <option value="featured">FEATURED CURATION</option>
              <option value="gsm-desc">DENSITY: HIGH TO LOW (GSM)</option>
              <option value="gsm-asc">DENSITY: LOW TO HIGH (GSM)</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <span className="material-symbols-outlined text-[16px] text-neutral-500 absolute left-2.5 top-2.5">
                search
              </span>
              <input
                type="text"
                placeholder="SEARCH ARCHIVE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181818] border border-[#333333] pl-8 pr-3 py-2 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none uppercase rounded"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {sorted.length === 0 ? (
          <div className="p-16 bg-[#111111] border border-[#222222] text-center space-y-3 rounded-lg">
            <span className="material-symbols-outlined text-[48px] text-neutral-600">tune</span>
            <p className="font-serif text-lg text-white">No garments match current criteria</p>
            <p className="text-xs text-neutral-400">
              Try adjusting your fit filter or search query, or design a custom piece in the bespoke atelier studio.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFit('all');
                setSearchQuery('');
              }}
              className="mt-2 px-5 py-2.5 bg-white text-black font-mono text-xs uppercase font-semibold hover:bg-neutral-200 rounded cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product) => (
              <article
                key={product.id}
                className="group bg-[#111111] border border-[#242424] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#3d3d3d] transition-all duration-300"
              >
                <div>
                  <div className="relative w-full aspect-[4/5] bg-[#161616] overflow-hidden">
                    <img
                      src={product.images.front}
                      alt={product.images.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[15%]"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      <span className="bg-white text-black text-[10px] font-mono px-2.5 py-0.5 uppercase tracking-wider font-bold">
                        {product.gsm} GSM
                      </span>
                      <span className="bg-black/85 backdrop-blur-sm text-neutral-300 text-[10px] font-mono px-2 py-0.5 uppercase border border-neutral-800">
                        {product.fit}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="bg-black/80 backdrop-blur-sm text-neutral-300 font-mono text-[10px] px-2.5 py-1 uppercase border border-neutral-800">
                        BY ENQUIRY ONLY
                      </span>
                    </div>

                    {/* Hover Quick Action Suite */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 gap-2 z-20">
                      <button
                        onClick={() => handleRequestOutfit(product)}
                        className="w-full bg-white text-black py-2.5 font-mono text-xs uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors rounded cursor-pointer"
                      >
                        REQUEST YOUR OUTFIT
                      </button>
                      <button
                        onClick={() => handleCustomiseOutfit(product)}
                        className="w-full bg-[#1c1c1c] text-white border border-neutral-700 py-2 font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors rounded cursor-pointer"
                      >
                        CUSTOMISE THIS PIECE
                      </button>
                      <button
                        onClick={() => setInspectProduct(product)}
                        className="w-full text-center text-xs text-neutral-400 hover:text-white uppercase font-mono py-1 cursor-pointer"
                      >
                        Inspect Specifications
                      </button>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase">
                      <span>{product.category} // {product.fit}</span>
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="w-2.5 h-2.5 rounded-full border border-neutral-600 inline-block"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <h3
                      onClick={() => setInspectProduct(product)}
                      className="font-serif text-base text-white font-bold truncate cursor-pointer hover:underline"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                      {product.description}
                    </p>

                    <div className="pt-2 border-t border-[#202020] flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-medium">
                        {product.stockStatus}
                      </span>
                      <span className="text-[10px] text-neutral-500 uppercase">
                        {product.sizes.length} SIZES
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleRequestOutfit(product)}
                    className="w-full bg-white text-black py-2.5 text-center font-mono text-xs uppercase font-bold tracking-wider hover:bg-neutral-200 transition-colors rounded cursor-pointer"
                  >
                    REQUEST
                  </button>
                  <button
                    onClick={() => handleCustomiseOutfit(product)}
                    className="w-full bg-[#181818] border border-neutral-700 text-neutral-200 py-2.5 text-center font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors rounded cursor-pointer"
                  >
                    CUSTOMISE
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {inspectProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-[#111111] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-fadeIn relative">
            <button
              onClick={() => setInspectProduct(null)}
              className="absolute top-3 right-3 z-30 p-1.5 bg-[#181818] text-neutral-400 hover:text-white border border-[#2a2a2a] rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="relative aspect-[4/5] bg-[#0A0A0A] overflow-hidden">
              <img
                src={inspectProduct.images.front}
                alt={inspectProduct.images.alt}
                className="w-full h-full object-cover filter grayscale-[10%]"
              />
              <span className="absolute bottom-3 left-3 bg-white text-black text-xs font-mono px-2.5 py-1 font-bold uppercase">
                {inspectProduct.gsm} GSM
              </span>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[85vh]">
              <div className="space-y-4">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                  {inspectProduct.category} // {inspectProduct.fit}
                </span>
                <h2 className="font-serif text-2xl text-white font-bold">
                  {inspectProduct.name}
                </h2>

                <div className="inline-flex items-center gap-2 bg-[#181818] border border-neutral-800 px-3 py-1 text-xs font-mono text-neutral-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>{inspectProduct.stockStatus}</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {inspectProduct.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-[#202020] text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">FABRIC SPEC:</span>
                    <span className="text-white text-right">{inspectProduct.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">GSM DENSITY:</span>
                    <span className="text-white">{inspectProduct.gsm} GSM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">AVAILABLE SIZES:</span>
                    <span className="text-white">{inspectProduct.sizes.join(' · ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">EDITION:</span>
                    <span className="text-white">{inspectProduct.edition || 'Drop 04 Permanent'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">PRICING:</span>
                    <span className="text-neutral-300 font-semibold">BY ENQUIRY VIA WHATSAPP</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-4">
                <button
                  onClick={() => {
                    const p = inspectProduct;
                    setInspectProduct(null);
                    handleRequestOutfit(p);
                  }}
                  className="w-full py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors rounded cursor-pointer"
                >
                  REQUEST YOUR OUTFIT
                </button>
                <button
                  onClick={() => {
                    const id = inspectProduct.id;
                    setInspectProduct(null);
                    onNavigate('customise', { productId: id });
                  }}
                  className="w-full py-3 bg-[#1c1c1c] border border-neutral-700 text-white font-mono text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 rounded cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>CUSTOMISE IN BESPOKE STUDIO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
