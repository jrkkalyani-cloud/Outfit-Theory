import React from 'react';
import { Product } from '../types';

interface CollectionsPageProps {
  products: Product[];
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ products, onNavigate }) => {
  const collections = [
    {
      id: 'drop-04',
      title: 'DROP 04 // STRUCTURAL SOULS',
      subtitle: 'Winter / Spring Editorial Capsule',
      desc: 'Architectural silhouettes engineered with 450 GSM French Terry and heavy compact cottons. Monolithic drop-shoulder drape tailored in Bengaluru & Tokyo.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAdrNcuSAfZJKOug-O31J6lF5G8YIpVkgKQw5V5W85j2WYr8Tp_P_0MTZ14j7prrGM27sF45DVsVHK0GCsqlZouNsPXbKMAEHQglekY7wgx2drreS2kxdR3P9v7g0na595KbO8bylEpuFcZut2aV53G-U6mVm3kp5-9yYrEdLfx21pmnSo3dx5CDCjELGvUPLV1eY_r6xZAZQa3dULA3Usp_iV2eZkPH1wAjKKOopW',
      category: 'hoodies',
    },
    {
      id: 'monolith-black',
      title: 'THE MONOCHROME MONOLITH',
      subtitle: 'Obsidian Black Capsule',
      desc: 'Pure pitch black loopback textiles with matte metal hardware and hidden plackets. Built to absorb light and articulate sculptural silhouettes.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe9SZLiHVMDLK1SxWBjoTUliGE2mxibXFFb98pQz3r0DIxppGgM6-K3D8G2y0vJJDmb0gsTMRI1SxOLNE7v0pYkqxn0yKalhuoFZCfEWygnswO5UPrCTK3AXwyiJHPBsjrKF25D6EvehtgJ0Ai3LDoklGG0geeaD3nlJztdlVmi1tBm0WP0mpS5vCB98RoHF7OipcspOOBe5A1KGPjfcNxRpqLSWHOZR6aKH25H3Gq',
      category: 't-shirts',
    },
    {
      id: 'twill-lab',
      title: 'ARCHITECTURAL TWILL & LINEN',
      subtitle: 'Superfine Tailoring Lab',
      desc: 'Japanese collarless plackets crafted with 60s count long-staple Indian cottons and breathable French linen blends.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9mjpzTvlFSxu1WY-VuyrAshWQwzl_eo0dSC5R13QcOe2uHe72K92Us1hJHswQAo2PbUo4Rq_aZC7cw8VYJu6Qq416iQ4NovusVPvhHfgDhOeqf2v0FOQJbyFwe_aMbaxiZIyF9Zk4VpN_-3lbRW9sPO8XOrazvnrkNeYC9XsYpabpuhqekMQjUFO3vOmOWRp8dX_1GM4X_8F3TeYad79M6rSxMcX-6ucQDC2Wy8Yu',
      category: 'shirts',
    },
  ];

  return (
    <div className="w-full bg-[#131313] text-[#e5e2e1] min-h-screen pb-20">
      {/* Editorial Header */}
      <div className="w-full bg-[#0e0e0e] border-b border-[#2a2a2a] py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
              HOME
            </button>
            <span>/</span>
            <span className="text-white">OUR COLLECTIONS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            SEASONAL ARCHIVES & LOOKBOOKS
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light leading-relaxed">
            Every collection is produced in disciplined small batches. Zero deadstock waste, maximum textile integrity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 space-y-16">
        {collections.map((col, idx) => (
          <div
            key={col.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1c1b1b] border border-[#2a2a2a] p-6 lg:p-10 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={`lg:col-span-7 space-y-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                  {col.subtitle}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {col.title}
                </h2>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-light">{col.desc}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate(`category-${col.category}`)}
                  className="bg-white text-black font-mono text-xs uppercase font-bold tracking-widest px-6 py-3.5 hover:bg-zinc-200 transition-colors"
                >
                  SHOP THIS COLLECTION
                </button>
                <button
                  onClick={() => onNavigate('customise')}
                  className="bg-[#201f1f] border border-[#353534] text-white font-mono text-xs uppercase tracking-widest px-6 py-3.5 hover:bg-[#2a2a2a] transition-colors"
                >
                  CUSTOMISE LOOK
                </button>
              </div>
            </div>

            <div className={`lg:col-span-5 aspect-[4/3] bg-black border border-[#2a2a2a] overflow-hidden ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
