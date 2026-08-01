'use client';

import Header from '@/components/premium/header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { profileSchema, type ProfileSchema } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  });

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }, [reset, user]);

  const onSubmit = async (values: ProfileSchema) => {
    await updateProfile(values);
    showToast('Profile updated successfully.');
  };

  const avatarInitial = user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <main className="bg-white min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-600">
              {avatarInitial}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-sm text-gray-600">Manage your personal details.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <Field label="Name" error={errors.name?.message}>
              <input {...register('name')} className={inputClass} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register('email')} className={inputClass} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register('phone')} className={inputClass} />
            </Field>

            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-8 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </div>
      </section>
    </main>
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
