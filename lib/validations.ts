import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').regex(/^\d+$/, 'Phone must contain only digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const appointmentSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  age: z.string().min(1, 'Age is required').transform((val) => parseInt(val)),
  gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: 'Gender is required' }) }),
  phone: z.string().min(10, 'Phone must be at least 10 digits').regex(/^\d+$/, 'Phone must contain only digits'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  department: z.string().min(1, 'Department is required'),
  doctor: z.string().min(1, 'Doctor is required'),
  appointmentDate: z.string().min(1, 'Appointment date is required'),
  appointmentTime: z.string().min(1, 'Appointment time is required'),
  reason: z.string().min(5, 'Reason is required'),
  emergency: z.boolean().default(false),
  notes: z.string().optional().default(''),
  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type AppointmentFormData = z.infer<typeof appointmentSchema>;
