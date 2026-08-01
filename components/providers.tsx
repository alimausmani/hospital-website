'use client';

import AppointmentModal from '@/components/premium/appointment-modal';
import { AppointmentModalProvider } from '@/contexts/appointment-modal-context';
import { AuthProvider } from '@/contexts/auth-context';
import { ToastProvider } from '@/contexts/toast-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppointmentModalProvider>
          {children}
          <AppointmentModal />
        </AppointmentModalProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
