'use client';

import { STORAGE_KEYS } from '@/lib/constants/storage-keys';
import { userService } from '@/lib/services/user-service';
import { getStorageItem, removeStorageItem, setStorageItem } from '@/lib/storage/local-storage';
import type { LoginInput, ProfileInput, SignupInput, User } from '@/lib/types/auth';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
  updateProfile: (input: ProfileInput) => Promise<void>;
  resetPassword: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = new Set(['/login', '/signup', '/forgot-password']);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentUser = getStorageItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (!currentUser) {
      setIsHydrated(true);
      return;
    }

    const upToDateUser = userService.getUsers().find((storedUser) => storedUser.id === currentUser.id) ?? null;
    if (!upToDateUser) {
      removeStorageItem(STORAGE_KEYS.CURRENT_USER);
      setIsHydrated(true);
      return;
    }

    setUser(upToDateUser);
    setStorageItem(STORAGE_KEYS.CURRENT_USER, upToDateUser);
    setIsHydrated(true);
  }, []);

  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const shouldRedirectToLogin = isHydrated && !user && !isPublicRoute;
  const shouldRedirectToHome = isHydrated && !!user && isPublicRoute;

  useEffect(() => {
    if (shouldRedirectToLogin) {
      router.replace('/login');
      return;
    }
    if (shouldRedirectToHome) {
      router.replace('/');
    }
  }, [router, shouldRedirectToHome, shouldRedirectToLogin]);

  const login = async (input: LoginInput) => {
    setIsLoading(true);
    try {
      const loggedInUser = userService.validateCredentials(input.email, input.password);
      setUser(loggedInUser);
      setStorageItem(STORAGE_KEYS.CURRENT_USER, loggedInUser);
      setStorageItem(STORAGE_KEYS.REMEMBER_ME, input.rememberMe);

      if (input.rememberMe) {
        setStorageItem(STORAGE_KEYS.REMEMBERED_EMAIL, loggedInUser.email);
      } else {
        removeStorageItem(STORAGE_KEYS.REMEMBERED_EMAIL);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (input: SignupInput) => {
    setIsLoading(true);
    try {
      const createdUser = userService.createUser({
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        password: input.password,
      });
      setUser(createdUser);
      setStorageItem(STORAGE_KEYS.CURRENT_USER, createdUser);
      setStorageItem(STORAGE_KEYS.REMEMBER_ME, true);
      setStorageItem(STORAGE_KEYS.REMEMBERED_EMAIL, createdUser.email);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    removeStorageItem(STORAGE_KEYS.CURRENT_USER);
    router.replace('/login');
  };

  const updateProfile = async (input: ProfileInput) => {
    if (!user) throw new Error('You are not logged in.');
    setIsLoading(true);
    try {
      const updatedUser = userService.updateProfile(user.id, input);
      setUser(updatedUser);
      setStorageItem(STORAGE_KEYS.CURRENT_USER, updatedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const updatedUser = userService.updatePassword(email, password);
      if (user && user.id === updatedUser.id) {
        setUser(updatedUser);
        setStorageItem(STORAGE_KEYS.CURRENT_USER, updatedUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
      resetPassword,
    }),
    [user, isLoading],
  );

  if (!isHydrated || shouldRedirectToLogin || shouldRedirectToHome) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
};
