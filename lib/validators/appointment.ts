import { z } from 'zod';

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required.'),
  age: z.coerce.number().int().min(0, 'Age must be valid.').max(120, 'Age must be valid.'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    message: 'Please select gender.',
  }),
  phone: z.string().trim().regex(/^[0-9]{10,15}$/, 'Phone must be 10 to 15 digits.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  address: z.string().trim().min(5, 'Address is required.'),
  department: z.string().trim().min(1, 'Department is required.'),
  doctor: z.string().trim().min(1, 'Doctor is required.'),
  appointmentDate: z.string().min(1, 'Appointment date is required.'),
  appointmentTime: z.string().min(1, 'Appointment time is required.'),
  reason: z.string().trim().min(3, 'Reason is required.'),
  emergency: z.boolean(),
  notes: z.string().trim().optional(),
  agreement: z.literal(true, {
    errorMap: () => ({ message: 'You must agree before submitting.' }),
  }),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;
