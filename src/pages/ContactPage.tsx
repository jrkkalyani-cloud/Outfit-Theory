import React, { useState } from 'react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order Enquiry / Sizing Assistance');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 5000);
  };

  const faqs = [
    {
      q: 'What makes Outfit Theory heavyweight cottons different?',
      a: 'We use genuine 420 to 480 GSM 100% Indian ringspun combed French Terry and compact single jerseys. They maintain a structured silhouette that does not sag, drape-cling, or lose shape through repeated washings.',
    },
    {
      q: 'What files are accepted for custom apparel orders?',
      a: 'We accept high-resolution PNG, JPG, JPEG, and PDF files. For the crispest reproduction, we recommend 300 DPI transparent vector/PNG files. Our atelier studio includes an automatic background remover.',
    },
    {
      q: 'How long does custom order production take?',
      a: 'Individual custom pieces are proofed within 24 hours, manufactured in 2-3 business days, and delivered across India within 48-72 hours via BlueDart Air Express.',
    },
    {
      q: 'Do you offer bulk orders for colleges, startups, and clubs?',
      a: 'Yes! We have a dedicated bulk & institutional pipeline with tiered savings: 15% off for 25-50 pieces, 25% off for 51-200 pieces, and 40% off for 200+ pieces with custom woven labels and Pantone color matching.',
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'Ready-to-wear pieces feature an easy 7-day sizing exchange. Bespoke customized pieces undergo strict digital pre-production proofing before cut-and-sew to guarantee 100% accuracy.',
    },
  ];

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
            <span className="text-white">CONCIERGE DESK</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            DIRECT ATELIER CONCIERGE
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Get in touch with our master tailors, check order statuses, or consult on custom brand apparel.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-10 space-y-12">
        {/* Direct Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://wa.me/919611623514"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[#1c1b1b] border border-[#2a2a2a] hover:border-zinc-400 transition-colors space-y-2 block"
          >
            <span className="material-symbols-outlined text-[24px] text-white">chat</span>
            <h4 className="font-serif text-base text-white uppercase font-bold">WHATSAPP DESK</h4>
            <p className="text-xs text-zinc-400 font-mono">+91 9611623514</p>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Average reply: 5 mins</span>
          </a>

          <a
            href="mailto:bharathj0109@gmail.com"
            className="p-6 bg-[#1c1b1b] border border-[#2a2a2a] hover:border-zinc-400 transition-colors space-y-2 block"
          >
            <span className="material-symbols-outlined text-[24px] text-white">mail</span>
            <h4 className="font-serif text-base text-white uppercase font-bold">EMAIL ATELIER</h4>
            <p className="text-xs text-zinc-400 font-mono">bharathj0109@gmail.com</p>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Official correspondence</span>
          </a>

          <div className="p-6 bg-[#1c1b1b] border border-[#2a2a2a] space-y-2">
            <span className="material-symbols-outlined text-[24px] text-white">location_on</span>
            <h4 className="font-serif text-base text-white uppercase font-bold">STUDIO LOCATION</h4>
            <p className="text-xs text-zinc-400 font-mono">Indiranagar Stage II, Bengaluru</p>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Karnataka - 560038, India</span>
          </div>
        </div>

        {/* Form and FAQ Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#1c1b1b] border border-[#2a2a2a] p-6 sm:p-8 space-y-5">
            <h3 className="font-serif text-xl font-bold uppercase text-white">
              Send a Message to the Concierge
            </h3>

            {sent ? (
              <div className="p-6 bg-[#131313] border border-[#2a2a2a] text-center space-y-2">
                <span className="material-symbols-outlined text-[36px] text-white">check_circle</span>
                <p className="font-serif text-base text-white font-bold">Message Transmitted</p>
                <p className="text-xs text-zinc-400 font-mono">
                  Our concierge team will respond via WhatsApp or Email within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-400 uppercase">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-white focus:outline-none focus:border-white"
                      placeholder="+91..."
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 uppercase">Enquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#131313] border border-[#353534] px-4 py-3 text-white focus:outline-none uppercase"
                  >
                    <option value="Order Enquiry / Sizing Assistance">Order Enquiry / Sizing Assistance</option>
                    <option value="Custom Outfit Studio Support">Custom Outfit Studio Support</option>
                    <option value="Bulk & Corporate Quotation">Bulk & Corporate Quotation</option>
                    <option value="Press / Collaboration">Press / Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 uppercase">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#131313] border border-[#353534] p-3 text-white focus:outline-none focus:border-white placeholder:text-zinc-600"
                    placeholder="How can our atelier assist you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors"
                >
                  TRANSMIT ENQUIRY
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif text-xl font-bold uppercase text-white mb-2">
              Frequently Addressed Inquiries
            </h3>

            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-[#1c1b1b] border border-[#2a2a2a] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 text-left font-serif text-sm font-semibold text-white flex justify-between items-center gap-2"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[18px] text-zinc-400">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed font-light border-t border-[#2a2a2a] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
