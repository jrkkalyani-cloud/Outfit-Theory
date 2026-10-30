import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Enquiry, CustomisationSpec, Product, GarmentColor, GarmentCategory } from '../types';

export interface EnquiryDraft {
  productId: string;
  productName: string;
  category: GarmentCategory;
  fit: string;
  fabric: string;
  gsm: number;
  color: GarmentColor;
  size: string;
  quantity: number;
  image: string;
  customisation?: CustomisationSpec;
  additionalInstructions?: string;
}

interface EnquiryContextType {
  activeDraft: EnquiryDraft;
  setActiveDraft: React.Dispatch<React.SetStateAction<EnquiryDraft>>;
  setDraftFromProduct: (product: Product, size?: string, color?: GarmentColor, quantity?: number) => void;
  setDraftFromCustomisation: (spec: CustomisationSpec, image: string) => void;
  lastSubmittedEnquiry: Enquiry | null;
  setLastSubmittedEnquiry: (enquiry: Enquiry | null) => void;
  savedEnquiries: Enquiry[];
  addSavedEnquiry: (enquiry: Enquiry) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_DRAFT: EnquiryDraft = {
  productId: 'prod-hd-01',
  productName: 'Oversized Acid Wash Heavyweight Hoodie',
  category: 'hoodies',
  fit: 'Oversized',
  fabric: '100% Combed Compact Ringspun French Terry',
  gsm: 450,
  color: { name: 'Obsidian Black', hex: '#131313' },
  size: 'L',
  quantity: 1,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9JJky5FacVQY5qVR62ZzArQPfiD8mu8U_OvV-Va76B6hyP2SoZdA-E9NhObukiqx5TA2aDJ2D3ALoIm6nXwj6qeccSKuBenTUZlKs3WTP1-gO5isX914kVAapKQiTT9F1nQj1eMuOPH1NyxFfjIdz-EnOrYPjrXLjdlZPmhRY-bb9btEjkVdNZ-6dbpbohAvKcH-aJGHd52NHuYWaCisZcLQKe5ByfesEYw0nnO6z',
};

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeDraft, setActiveDraft] = useState<EnquiryDraft>(() => {
    try {
      const saved = localStorage.getItem('ot_active_draft');
      return saved ? JSON.parse(saved) : DEFAULT_DRAFT;
    } catch {
      return DEFAULT_DRAFT;
    }
  });

  const [lastSubmittedEnquiry, setLastSubmittedEnquiry] = useState<Enquiry | null>(() => {
    try {
      const saved = localStorage.getItem('ot_last_enquiry');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedEnquiries, setSavedEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem('ot_saved_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ot_active_draft', JSON.stringify(activeDraft));
    } catch (e) {
      console.warn('Could not persist active draft:', e);
    }
  }, [activeDraft]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const setDraftFromProduct = (product: Product, size?: string, color?: GarmentColor, quantity = 1) => {
    const selectedColor = color || product.colors[0] || { name: 'Obsidian Black', hex: '#131313' };
    const selectedSize = size || product.sizes[0] || 'L';
    
    setActiveDraft({
      productId: product.id,
      productName: product.name,
      category: product.category,
      fit: product.fit,
      fabric: product.fabric,
      gsm: product.gsm,
      color: selectedColor,
      size: selectedSize,
      quantity,
      image: product.images.front,
      customisation: undefined,
      additionalInstructions: '',
    });
  };

  const setDraftFromCustomisation = (spec: CustomisationSpec, image: string) => {
    setActiveDraft({
      productId: spec.silhouetteId,
      productName: spec.silhouetteName,
      category: spec.category,
      fit: spec.fit,
      fabric: spec.fabric,
      gsm: spec.gsm,
      color: spec.color,
      size: spec.size,
      quantity: spec.quantity,
      image,
      customisation: spec,
      additionalInstructions: spec.customInstructions,
    });
  };

  const addSavedEnquiry = (enquiry: Enquiry) => {
    setLastSubmittedEnquiry(enquiry);
    try {
      localStorage.setItem('ot_last_enquiry', JSON.stringify(enquiry));
      const updated = [enquiry, ...savedEnquiries.filter(e => e.id !== enquiry.id)];
      setSavedEnquiries(updated);
      localStorage.setItem('ot_saved_enquiries', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist enquiry:', e);
    }
  };

  return (
    <EnquiryContext.Provider
      value={{
        activeDraft,
        setActiveDraft,
        setDraftFromProduct,
        setDraftFromCustomisation,
        lastSubmittedEnquiry,
        setLastSubmittedEnquiry,
        savedEnquiries,
        addSavedEnquiry,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = (): EnquiryContextType => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
};
