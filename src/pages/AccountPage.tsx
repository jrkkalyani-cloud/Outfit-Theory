import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEnquiry } from '../context/EnquiryContext';
import { Enquiry } from '../types';

interface AccountPageProps {
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { user, loginUser, logoutUser } = useAuth();
  const { savedEnquiries } = useEnquiry();
  const [enquiries, setEnquiries] = useState<Enquiry[]>(savedEnquiries);
  const [loading, setLoading] = useState(false);

  // Form states for login/register if not logged in
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user?.email || user?.phone) {
      setLoading(true);
      fetch(`/api/enquiries?phone=${encodeURIComponent(user.phone || '')}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.success && data.data?.length > 0) {
            setEnquiries(data.data);
          } else if (savedEnquiries.length > 0) {
            setEnquiries(savedEnquiries);
          }
        })
        .catch(() => {
          setLoading(false);
          if (savedEnquiries.length > 0) {
            setEnquiries(savedEnquiries);
          }
        });
    } else if (savedEnquiries.length > 0) {
      setEnquiries(savedEnquiries);
    }
  }, [user, savedEnquiries]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    loginUser({
      id: `usr-${Date.now()}`,
      fullName,
      email,
      phone: phone || '+91 98450 12890',
    });
  };

  return (
    <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen pb-24 font-sans">
      {/* Banner */}
      <div className="w-full bg-[#050505] border-b border-[#1E1E1E] py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              HOME
            </button>
            <span>/</span>
            <span className="text-white">PATRON DOSSIER</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            PATRON ACCOUNT & BESPOKE ENQUIRIES
          </h1>
          <p className="text-sm text-neutral-400 font-light">
            Review your custom commission enquiries, track tailoring status, and connect directly with the atelier.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-10 space-y-8">
        {!user ? (
          /* Sign In / Register Card */
          <div className="bg-[#111111] border border-[#242424] rounded-2xl p-8 max-w-md mx-auto space-y-6 shadow-2xl">
            <div className="text-center space-y-1">
              <h2 className="font-serif text-xl font-bold uppercase text-white">
                Access Patron Account
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                Log in or enter details to view previous enquiries and status.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Arjun Nair"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] px-4 py-3 text-white focus:outline-none rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] px-4 py-3 text-white focus:outline-none rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400 uppercase">Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+91 98450 12890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181818] border border-[#333333] px-4 py-3 text-white focus:outline-none rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black uppercase font-bold tracking-widest hover:bg-neutral-200 transition-colors rounded cursor-pointer mt-2"
              >
                Access Account
              </button>
            </form>
          </div>
        ) : (
          /* User Profile Header */
          <div className="space-y-6">
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white text-black font-serif font-bold text-xl flex items-center justify-center">
                  {user.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-0.5">
                  <h2 className="font-serif text-xl font-bold text-white uppercase">{user.fullName}</h2>
                  <p className="text-xs font-mono text-neutral-400">{user.email} • {user.phone}</p>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                    Verified Patron
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('customise')}
                  className="px-4 py-2 bg-white text-black font-mono text-xs uppercase font-bold rounded hover:bg-neutral-200 cursor-pointer"
                >
                  New Custom Commission
                </button>
                <button
                  onClick={logoutUser}
                  className="px-3 py-2 bg-[#181818] border border-neutral-700 text-neutral-300 font-mono text-xs uppercase rounded hover:text-white cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Enquiries History */}
            <div className="bg-[#111111] border border-[#242424] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
                <h3 className="font-serif text-base uppercase text-white font-bold tracking-wider">
                  Your Bespoke Commission Enquiries ({enquiries.length})
                </h3>
              </div>

              {loading ? (
                <p className="text-xs font-mono text-neutral-400 py-6 text-center">Loading enquiry records...</p>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <p className="font-serif text-white">No active custom commissions yet.</p>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto font-light">
                    Select a silhouette from our archive or design an original piece in the bespoke customiser studio.
                  </p>
                  <button
                    onClick={() => onNavigate('customise')}
                    className="mt-2 px-6 py-2.5 bg-white text-black font-mono text-xs uppercase font-bold rounded hover:bg-neutral-200 cursor-pointer"
                  >
                    Launch Studio
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-4 bg-[#161616] border border-[#262626] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={enq.garment.image}
                          alt={enq.garment.productName}
                          className="w-12 h-14 object-cover bg-black rounded"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white">
                              {enq.enquiryNumber}
                            </span>
                            <span className="px-2 py-0.5 bg-[#121212] border border-neutral-700 text-emerald-400 text-[10px] font-mono uppercase font-semibold rounded">
                              {enq.status}
                            </span>
                          </div>
                          <p className="text-xs text-white font-serif font-bold truncate">
                            {enq.garment.productName} ({enq.garment.quantity} units)
                          </p>
                          <p className="text-[11px] font-mono text-neutral-400">
                            {enq.garment.fit} • {enq.garment.color.name} • Size: {enq.garment.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => onNavigate('tracking', { orderId: enq.enquiryNumber })}
                          className="flex-1 sm:flex-none px-3.5 py-2 bg-[#202020] hover:bg-neutral-700 text-white font-mono text-xs uppercase rounded transition-colors"
                        >
                          Track Milestone
                        </button>
                        <a
                          href={`https://wa.me/919611623514?text=${encodeURIComponent(
                            `Hello Bharath J, I'm checking in on my enquiry ${enq.enquiryNumber} (${enq.garment.productName}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase font-bold rounded transition-colors text-center"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
