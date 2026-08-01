import { z } from 'zod';

const phoneRegex = /^[0-9]{10,15}$/;

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  rememberMe: z.boolean(),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
    email: z.string().trim().email('Please enter a valid email address.'),
    phone: z.string().trim().regex(phoneRegex, 'Phone must be 10 to 15 digits.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(8, 'Confirm password is required.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const forgotPasswordEmailSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
});

export const forgotPasswordResetSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(8, 'Confirm password is required.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().trim().regex(phoneRegex, 'Phone must be 10 to 15 digits.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type ForgotPasswordEmailSchema = z.infer<typeof forgotPasswordEmailSchema>;
export type ForgotPasswordResetSchema = z.infer<typeof forgotPasswordResetSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
