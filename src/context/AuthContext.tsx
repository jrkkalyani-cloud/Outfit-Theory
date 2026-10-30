import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShippingAddress } from '../types';

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  savedAddress?: ShippingAddress;
}

interface AuthContextType {
  user: CustomerUser | null;
  isAdmin: boolean;
  adminPasscode: string;
  loginUser: (user: CustomerUser) => void;
  logoutUser: () => void;
  updateSavedAddress: (address: ShippingAddress) => void;
  loginAdmin: (passcode: string) => Promise<boolean>;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'outfit_theory_user_v1';
const ADMIN_STORAGE_KEY = 'outfit_theory_admin_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default seed patron for instant seamless checkout
    return {
      id: 'usr-arjun-01',
      fullName: 'Arjun Nair',
      email: 'arjun.nair@atelier.design',
      phone: '+91 98450 12890',
      savedAddress: {
        fullName: 'Arjun Nair',
        email: 'arjun.nair@atelier.design',
        phone: '+91 98450 12890',
        addressLine1: 'Penthouse 4B, Lavelle Road',
        addressLine2: 'Richmond Town',
        landmark: 'Opposite UB City Towers',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        courierInstructions: 'Leave with concierge at Lavelle Tower A. Ring 15 min prior.',
      },
    };
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });

  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return localStorage.getItem('outfit_theory_passcode') || 'atelier2025';
  });

  const loginUser = (newUser: CustomerUser) => {
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const updateSavedAddress = (address: ShippingAddress) => {
    if (user) {
      const updated = { ...user, savedAddress: address };
      setUser(updated);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const loginAdmin = async (passcode: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        setAdminPasscode(passcode);
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
        localStorage.setItem('outfit_theory_passcode', passcode);
        return true;
      }
    } catch (err) {
      console.error('Admin login error:', err);
      // Fallback check against default passcode
      if (passcode === 'atelier2025') {
        setIsAdmin(true);
        setAdminPasscode(passcode);
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
        localStorage.setItem('outfit_theory_passcode', passcode);
        return true;
      }
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        adminPasscode,
        loginUser,
        logoutUser,
        updateSavedAddress,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
