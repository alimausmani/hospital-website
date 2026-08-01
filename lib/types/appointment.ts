export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export type Appointment = {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  emergency: boolean;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};
