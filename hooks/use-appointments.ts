'use client';

import { appointmentService } from '@/lib/services/appointment-service';
import type { Appointment, AppointmentStatus } from '@/lib/types/appointment';
import { useEffect, useState } from 'react';
import { useAuth } from './use-auth';

export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!user) {
      setAppointments([]);
      return;
    }

    const load = () => setAppointments(appointmentService.getByUserId(user.id));
    load();

    const handler = () => load();
    window.addEventListener('appointments:updated', handler);
    return () => window.removeEventListener('appointments:updated', handler);
  }, [user]);

  const updateStatus = (id: string, status: AppointmentStatus) => {
    appointmentService.updateStatus(id, status);
  };

  const cancelAppointment = (id: string) => {
    appointmentService.updateStatus(id, 'Cancelled');
  };

  const deleteAppointment = (id: string) => {
    appointmentService.delete(id);
  };

  return {
    appointments,
    updateStatus,
    cancelAppointment,
    deleteAppointment,
  };
};
