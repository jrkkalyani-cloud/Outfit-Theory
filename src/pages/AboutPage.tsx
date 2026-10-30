import React from 'react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#131313] text-[#e5e2e1] min-h-screen pb-20">
      {/* Banner */}
      <div className="w-full bg-[#0e0e0e] border-b border-[#2a2a2a] py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              HOME
            </button>
            <span>/</span>
            <span className="text-white">ABOUT ATELIER</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            WEAR YOUR IDENTITY.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            The philosophy, textile engineering, and bespoke craft of Outfit Theory.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-12 space-y-12">
        {/* Core Manifesto */}
        <div className="space-y-4 leading-relaxed text-zinc-300 font-light">
          <p className="font-serif text-xl sm:text-2xl text-white font-normal italic">
            "Apparel is the architectural frame of personal identity. It shouldn't collapse after three washes, and it shouldn't look like everyone else's off-the-shelf mass template."
          </p>
          <p className="text-sm sm:text-base">
            Born out of frustration with fast-fashion disposability in India, <strong>OUTFIT THEORY</strong> synthesizes luxury minimalism, brutalist streetwear drapes, and bespoke sartorial manufacturing. We believe that what you wear speaks before you do — wear your identity.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-[#1c1b1b] border border-[#2a2a2a] p-6 space-y-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">01 / DENSITY FIRST</span>
            <h3 className="font-serif text-lg font-bold text-white uppercase">420 TO 480 GSM COTTONS</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Standard commercial hoodies in India use flimsy 280-320 GSM fleece that shrinks and pills. We knit custom 420-480 GSM French Terry using long-staple Indian ringspun yarns with zero synthetic fillers.
            </p>
          </div>

          <div className="bg-[#1c1b1b] border border-[#2a2a2a] p-6 space-y-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">02 / 1:1 BESPOKE CANVAS</span>
            <h3 className="font-serif text-lg font-bold text-white uppercase">INDIVIDUAL CRAFTSMANSHIP</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every customized piece runs through our master tailor verification in Bengaluru. 3D Puff embroidery, metallic lurex threads, and German pigment DTG printing calibrated per garment curve.
            </p>
          </div>

          <div className="bg-[#1c1b1b] border border-[#2a2a2a] p-6 space-y-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">03 / SUSTAINABLE PRODUCTION</span>
            <h3 className="font-serif text-lg font-bold text-white uppercase">DISCIPLINED BATCHES</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We reject warehouse overproduction. Garments are cut, sewn, and finished on demand or in micro-batches of 50 to 200 units, ensuring zero landfill waste.
            </p>
          </div>

          <div className="bg-[#1c1b1b] border border-[#2a2a2a] p-6 space-y-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">04 / ORIGIN & REACH</span>
            <h3 className="font-serif text-lg font-bold text-white uppercase">BENGALURU TO WORLDWIDE</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Headquartered in Bengaluru, Karnataka with global air dispatch across India, Europe, and the Middle East via BlueDart and DHL International.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-[#1c1b1b] border border-[#2a2a2a] text-center space-y-4">
          <h3 className="font-serif text-2xl text-white font-bold uppercase">Experience The Difference</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Order a piece from Drop 04 or customize your own silhouette in the interactive atelier studio.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-white text-black font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-zinc-200 transition-colors"
            >
              Shop Catalogue
            </button>
            <button
              onClick={() => onNavigate('customise')}
              className="bg-[#201f1f] text-white border border-[#353534] font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#2a2a2a] transition-colors"
            >
              Customise Your Outfit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
