'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type AppointmentModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AppointmentModalContext = createContext<AppointmentModalContextType | undefined>(undefined);

export function AppointmentModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return (
    <AppointmentModalContext.Provider value={value}>
      {children}
    </AppointmentModalContext.Provider>
  );
}

export const useAppointmentModal = () => {
  const context = useContext(AppointmentModalContext);
  if (!context) {
    throw new Error('useAppointmentModal must be used inside AppointmentModalProvider.');
  }
  return context;
};
