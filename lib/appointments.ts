export interface Appointment {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  gender: string;
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
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  createdAt: string;
}

const APPOINTMENTS_KEY = 'hospital_appointments';

export function getAppointments(userId: string): Appointment[] {
  try {
    const appointmentsJson = localStorage.getItem(APPOINTMENTS_KEY);
    const appointments: Appointment[] = appointmentsJson ? JSON.parse(appointmentsJson) : [];
    return appointments.filter((a) => a.userId === userId);
  } catch (error) {
    console.error('Failed to get appointments:', error);
    return [];
  }
}

export function saveAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
  try {
    const appointmentsJson = localStorage.getItem(APPOINTMENTS_KEY);
    const appointments: Appointment[] = appointmentsJson ? JSON.parse(appointmentsJson) : [];

    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    return newAppointment;
  } catch (error) {
    console.error('Failed to save appointment:', error);
    throw error;
  }
}

export function updateAppointmentStatus(appointmentId: string, status: Appointment['status']): void {
  try {
    const appointmentsJson = localStorage.getItem(APPOINTMENTS_KEY);
    const appointments: Appointment[] = appointmentsJson ? JSON.parse(appointmentsJson) : [];

    const index = appointments.findIndex((a) => a.id === appointmentId);
    if (index !== -1) {
      appointments[index].status = status;
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    }
  } catch (error) {
    console.error('Failed to update appointment:', error);
    throw error;
  }
}

export function deleteAppointment(appointmentId: string): void {
  try {
    const appointmentsJson = localStorage.getItem(APPOINTMENTS_KEY);
    const appointments: Appointment[] = appointmentsJson ? JSON.parse(appointmentsJson) : [];

    const filteredAppointments = appointments.filter((a) => a.id !== appointmentId);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(filteredAppointments));
  } catch (error) {
    console.error('Failed to delete appointment:', error);
    throw error;
  }
}

export function generateWhatsAppMessage(appointment: Appointment): string {
  return `🏥 NEW APPOINTMENT REQUEST

Patient Name: ${appointment.fullName}

Age: ${appointment.age}

Gender: ${appointment.gender.toUpperCase()}

Phone: ${appointment.phone}

Email: ${appointment.email}

Address: ${appointment.address}

Department: ${appointment.department}

Doctor: ${appointment.doctor}

Date: ${appointment.appointmentDate}

Time: ${appointment.appointmentTime}

Reason: ${appointment.reason}

Emergency: ${appointment.emergency ? 'YES' : 'NO'}

Notes: ${appointment.notes || 'N/A'}`;
}

export function sendWhatsAppMessage(message: string, phoneNumber: string = '917775840289'): void {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}
