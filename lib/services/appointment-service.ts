import { STORAGE_KEYS } from '@/lib/constants/storage-keys';
import { getStorageItem, setStorageItem } from '@/lib/storage/local-storage';
import type { Appointment, AppointmentStatus } from '@/lib/types/appointment';

const emitAppointmentsUpdated = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('appointments:updated'));
};

const getAllAppointments = (): Appointment[] =>
  getStorageItem<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, []);

const saveAllAppointments = (appointments: Appointment[]) => {
  setStorageItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  emitAppointmentsUpdated();
};

export const appointmentService = {
  getByUserId(userId: string): Appointment[] {
    return getAllAppointments()
      .filter((appointment) => appointment.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  create(input: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment {
    const newAppointment: Appointment = {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Date.now().toString(),
      ...input,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    saveAllAppointments([newAppointment, ...getAllAppointments()]);
    return newAppointment;
  },
  updateStatus(id: string, status: AppointmentStatus): void {
    const updated = getAllAppointments().map((appointment) =>
      appointment.id === id ? { ...appointment, status } : appointment,
    );
    saveAllAppointments(updated);
  },
  delete(id: string): void {
    saveAllAppointments(getAllAppointments().filter((appointment) => appointment.id !== id));
  },
};
