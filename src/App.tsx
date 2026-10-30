import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { INITIAL_PRODUCTS } from './data/initialData';
import { EnquiryProvider, useEnquiry } from './context/EnquiryContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CustomiserPage } from './pages/CustomiserPage';
import { CustomerEnquiryPage } from './pages/CustomerEnquiryPage';
import { EnquiryConfirmationPage } from './pages/EnquiryConfirmationPage';
import { AdminPage } from './pages/AdminPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { BulkOrdersPage } from './pages/BulkOrdersPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';

function AppContent() {
  const [currentPath, setCurrentPath] = useState('home');
  const [navParams, setNavParams] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const { toastMessage } = useEnquiry();

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.data?.length > 0) {
        setProducts(data.data);
      }
    } catch (err) {
      console.warn('Using client initial catalog:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const handleNavigate = (path: string, params?: Record<string, string>) => {
    if (params) setNavParams(params);
    setCurrentPath(path);
  };

  // Render Page Content based on currentPath
  const renderPage = () => {
    switch (currentPath) {
      case 'home':
        return <HomePage products={products} onNavigate={handleNavigate} />;
      case 'shop':
        return <ShopPage products={products} initialCategory="all" onNavigate={handleNavigate} />;
      case 'category-hoodies':
        return <ShopPage products={products} initialCategory="hoodies" onNavigate={handleNavigate} />;
      case 'category-t-shirts':
        return <ShopPage products={products} initialCategory="t-shirts" onNavigate={handleNavigate} />;
      case 'category-shirts':
        return <ShopPage products={products} initialCategory="shirts" onNavigate={handleNavigate} />;
      case 'customise':
        return (
          <CustomiserPage
            products={products}
            initialProductId={navParams.productId}
            onNavigate={handleNavigate}
          />
        );
      case 'enquiry-form':
        return <CustomerEnquiryPage onNavigate={handleNavigate} />;
      case 'enquiry-confirmation':
        return <EnquiryConfirmationPage onNavigate={handleNavigate} />;
      case 'tracking':
        return (
          <OrderTrackingPage
            initialOrderId={navParams.orderId}
            onNavigate={handleNavigate}
          />
        );
      case 'bulk':
        return <BulkOrdersPage onNavigate={handleNavigate} />;
      case 'collections':
        return <CollectionsPage products={products} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} />;
      case 'admin':
        return (
          <AdminPage
            products={products}
            onProductUpdated={fetchProducts}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <HomePage products={products} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#e5e2e1]">
      {/* Top Fixed Header */}
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main Page Viewport with padding top for fixed header */}
      <main className="flex-1 pt-24 md:pt-28">
        {renderPage()}
      </main>

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-white text-black p-4 shadow-2xl flex items-center gap-3 border border-zinc-300 max-w-sm animate-fadeIn rounded"
        >
          <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
          <div className="space-y-0.5">
            <span className="font-mono text-xs uppercase block font-bold tracking-wider">
              ATELIER UPDATE
            </span>
            <span className="text-xs text-zinc-800 block truncate">{toastMessage}</span>
          </div>
        </aside>
      )}

      {/* Floating Concierge Action Trigger */}
      <aside className="fixed bottom-6 left-6 z-30">
        <a
          href="https://wa.me/919611623514?text=Hello%20Outfit%20Theory%20Concierge%2C%20I%20have%20an%20inquiry%20regarding%20bespoke%20apparel."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Concierge"
          className="bg-[#181818]/90 backdrop-blur-md border border-[#333333] text-white hover:bg-white hover:text-black px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 transition-all group font-mono text-xs uppercase"
        >
          <span className="material-symbols-outlined text-[18px] text-emerald-400 group-hover:text-black">chat</span>
          <span className="hidden sm:inline tracking-wider">Concierge: +91 9611623514</span>
        </a>
      </aside>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EnquiryProvider>
        <AppContent />
      </EnquiryProvider>
    </AuthProvider>
  );
}
