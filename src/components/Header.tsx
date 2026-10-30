import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', path: 'home' },
    { label: 'SHOP', path: 'shop' },
    { label: 'HOODIES', path: 'category-hoodies' },
    { label: 'T-SHIRTS', path: 'category-t-shirts' },
    { label: 'SHIRTS', path: 'category-shirts' },
    { label: 'CUSTOMISE', path: 'customise' },
    { label: 'COLLECTIONS', path: 'collections' },
    { label: 'BULK ORDERS', path: 'bulk' },
    { label: 'ABOUT', path: 'about' },
    { label: 'CONTACT', path: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1E1E1E]">
      {/* Top Announcement & Concierge Rail */}
      <aside className="w-full bg-[#050505] border-b border-[#242424] text-[11px] font-mono tracking-widest uppercase text-neutral-400 py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              BESPOKE HAUTE APPAREL • ZERO MASS PRODUCTION
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-400">240–450 GSM ARCHITECTURAL COTTON</span>
          </div>
          <div className="flex items-center gap-4 ml-auto text-neutral-300">
            <a
              className="hover:text-white transition-colors flex items-center gap-1"
              href="https://wa.me/919611623514?text=Hello%20Outfit%20Theory%20Concierge%2C%20I%20would%20like%20to%20request%20a%20bespoke%20order."
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[13px] text-emerald-400">chat</span>
              CONCIERGE: +91 9611623514
            </a>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <a
              className="hover:text-white transition-colors hidden sm:inline"
              href="mailto:bharathj0109@gmail.com"
            >
              bharathj0109@gmail.com
            </a>
          </div>
        </div>
      </aside>

      {/* Main Navigation Header Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo & Emblem Left */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 shrink-0 group focus:outline-none text-left"
        >
          <div className="h-10 w-auto overflow-hidden rounded">
            <img
              alt="OUTFIT THEORY Monogram & Emblem"
              className="h-10 w-auto object-contain brightness-110"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V9UNSH4MgdwRKnt--pcmc0JMbXec7Npe6JPxHqPAiI6i1Bs2MFxBlbFrhe3pk0FZJul38VB_joW5Q1nzULPnTgi8RpZ5dLKfsNO_21pjcjb-NFA1Iu8wfGQBr2KVpYIRntbmJH5F8mACzEWa3Y1yguIgWanYJNk3qcxBroz8cN5WOZ1WrCwASIeZQiTpYr7D5zEXWs_EV2BRhJAVW_1jRklC-xjqiKmSnTNJjPItQD"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-headline-display text-lg tracking-widest text-white uppercase font-bold leading-none">
              OUTFIT THEORY
            </span>
            <span className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase font-mono mt-1">
              WEAR YOUR IDENTITY.
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-xs font-medium tracking-[0.16em] uppercase text-neutral-400">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
                  isActive
                    ? 'text-white border-white font-semibold'
                    : 'hover:text-white border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Track Enquiry Action */}
          <button
            onClick={() => onNavigate('tracking')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2 border rounded-full text-[11px] font-mono tracking-wider transition-all ${
              currentPath === 'tracking'
                ? 'border-white text-white bg-neutral-900'
                : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 bg-neutral-950'
            }`}
            title="Track Your Enquiry Status"
          >
            <span className="material-symbols-outlined text-[15px]">location_searching</span>
            <span>TRACK ENQUIRY</span>
          </button>

          {/* Admin Action */}
          <button
            onClick={() => onNavigate('admin')}
            className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-full text-[11px] font-mono tracking-wider transition-all ${
              currentPath === 'admin' || isAdmin
                ? 'bg-neutral-800 text-white border border-neutral-600'
                : 'text-neutral-500 hover:text-neutral-300 border border-transparent'
            }`}
            title="Atelier Admin Console"
          >
            <span className="material-symbols-outlined text-[15px]">dashboard</span>
            <span>ADMIN</span>
          </button>

          {/* Direct WhatsApp Concierge Button */}
          <a
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 border border-neutral-700 rounded-full text-[11px] font-mono tracking-wider text-neutral-300 hover:text-white hover:border-neutral-400 hover:bg-neutral-900 transition-all"
            href="https://wa.me/919611623514?text=Hello%20Outfit%20Theory%2C%20I%20want%20to%20consult%20with%20the%20head%20tailor."
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[15px] text-emerald-400">chat</span>
            <span>+91 9611623514</span>
          </a>

          {/* Primary Action Pill */}
          <button
            onClick={() => onNavigate('customise')}
            className="inline-flex items-center gap-2 bg-white text-black px-4 md:px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-neutral-200 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>REQUEST AN OUTFIT</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0A] border-b border-[#242424] px-6 py-5 space-y-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs uppercase tracking-wider font-mono">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2.5 px-3 rounded border transition-colors ${
                  currentPath === link.path
                    ? 'bg-white text-black font-semibold border-white'
                    : 'text-neutral-400 hover:text-white bg-[#111111] border-[#222222]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#222222] flex flex-wrap gap-2 text-xs font-mono">
            <button
              onClick={() => {
                onNavigate('tracking');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-[#141414] border border-[#2a2a2a] text-center text-neutral-200 hover:text-white uppercase tracking-wider rounded"
            >
              TRACK ENQUIRY
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-[#141414] border border-[#2a2a2a] text-center text-neutral-200 hover:text-white uppercase tracking-wider rounded"
            >
              ADMIN PORTAL
            </button>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/919611623514?text=Hello%20Outfit%20Theory%2C%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#181818] border border-emerald-500/40 text-emerald-400 flex items-center justify-center gap-2 rounded text-xs font-mono tracking-wider uppercase"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              WhatsApp Concierge (+91 9611623514)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
