'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { userService } from '@/lib/services/user-service';
import {
  forgotPasswordEmailSchema,
  forgotPasswordResetSchema,
  type ForgotPasswordEmailSchema,
  type ForgotPasswordResetSchema,
} from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword, isLoading } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const emailForm = useForm<ForgotPasswordEmailSchema>({
    resolver: zodResolver(forgotPasswordEmailSchema),
  });

  const resetForm = useForm<ForgotPasswordResetSchema>({
    resolver: zodResolver(forgotPasswordResetSchema),
  });

  const checkEmail = (values: ForgotPasswordEmailSchema) => {
    setError('');
    const user = userService.findByEmail(values.email);
    if (!user) {
      setError('No account found with this email.');
      return;
    }
    setEmail(user.email);
  };

  const updatePassword = async (values: ForgotPasswordResetSchema) => {
    setError('');
    try {
      await resetPassword(email, values.password);
      showToast('Password updated successfully.');
      router.replace('/login');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to update password.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
        <p className="mt-2 text-sm text-gray-600">Demo flow using Local Storage only.</p>

        {!email ? (
          <form onSubmit={emailForm.handleSubmit(checkEmail)} className="mt-6 space-y-4">
            <Field label="Email" error={emailForm.formState.errors.email?.message}>
              <input type="email" {...emailForm.register('email')} className={inputClass} />
            </Field>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button
              type="submit"
              className="w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Verify Email
            </Button>
          </form>
        ) : (
          <form onSubmit={resetForm.handleSubmit(updatePassword)} className="mt-6 space-y-4">
            <p className="text-sm text-gray-700">
              Email verified: <span className="font-semibold">{email}</span>
            </p>
            <Field label="New Password" error={resetForm.formState.errors.password?.message}>
              <input type="password" {...resetForm.register('password')} className={inputClass} />
            </Field>
            <Field
              label="Confirm Password"
              error={resetForm.formState.errors.confirmPassword?.message}
            >
              <input type="password" {...resetForm.register('confirmPassword')} className={inputClass} />
            </Field>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? 'Updating...' : 'Save New Password'}
            </Button>
          </form>
        )}

        <div className="mt-5 text-sm">
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-900">{label}</label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
