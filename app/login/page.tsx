'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { STORAGE_KEYS } from '@/lib/constants/storage-keys';
import { getStorageItem } from '@/lib/storage/local-storage';
import { loginSchema, type LoginSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  useEffect(() => {
    const rememberedEmail = getStorageItem<string>(STORAGE_KEYS.REMEMBERED_EMAIL, '');
    if (rememberedEmail) {
      setValue('email', rememberedEmail);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = async (values: LoginSchema) => {
    setAuthError('');
    try {
      await login(values);
      router.replace('/');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to login.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome back to your healthcare dashboard.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Field label="Email" error={errors.email?.message}>
            <input type="email" {...register('email')} className={inputClass} />
          </Field>

          <Field label="Password" error={errors.password?.message}>
            <input type="password" {...register('password')} className={inputClass} />
          </Field>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register('rememberMe')} className="h-4 w-4 accent-blue-600" />
            Remember Me
          </label>

          {authError ? <p className="text-sm text-red-600">{authError}</p> : null}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
            Create Account
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
