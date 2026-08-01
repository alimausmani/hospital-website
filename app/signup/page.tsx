'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { signupSchema, type SignupSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupSchema) => {
    setAuthError('');
    try {
      await signup(values);
      router.replace('/');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to create account.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-gray-900">Signup</h1>
        <p className="mt-2 text-sm text-gray-600">Create your account to manage appointments.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Field label="Full Name" error={errors.name?.message}>
            <input {...register('name')} className={inputClass} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" {...register('email')} className={inputClass} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input {...register('phone')} className={inputClass} />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <input type="password" {...register('password')} className={inputClass} />
          </Field>
          <Field label="Confirm Password" error={errors.confirmPassword?.message}>
            <input type="password" {...register('confirmPassword')} className={inputClass} />
          </Field>

          {authError ? <p className="text-sm text-red-600">{authError}</p> : null}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? 'Creating account...' : 'Signup'}
          </Button>
        </form>

        <div className="mt-5 text-sm">
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Already have an account? Login
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
