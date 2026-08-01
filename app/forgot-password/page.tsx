'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { forgotPasswordSchema, resetPasswordSchema, type ForgotPasswordFormData, type ResetPasswordFormData } from '@/lib/validations';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [emailFound, setEmailFound] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Email verification form
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Reset password form
  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors, isSubmitting: isResetSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onEmailSubmit = async (data: ForgotPasswordFormData) => {
    setError('');
    try {
      const usersJson = localStorage.getItem('hospital_users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      const userExists = users.some((u: any) => u.email === data.email);

      if (!userExists) {
        setError('Email not found');
        return;
      }

      setEmailFound(data.email);
      setStep('reset');
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const onResetSubmit = async (data: ResetPasswordFormData) => {
    setError('');
    setSuccess('');
    try {
      await resetPassword(emailFound, data.newPassword);
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    }
  };

  const passwordValue = watch('newPassword');

  const passwordStrength = {
    length: passwordValue?.length >= 6,
    hasNumber: /\d/.test(passwordValue || ''),
    hasUppercase: /[A-Z]/.test(passwordValue || ''),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-lg smooth-shadow-lg p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">
              {step === 'email' ? 'Enter your email to reset your password' : 'Create a new password'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}

          {/* Email Step */}
          {step === 'email' && (
            <motion.form
              onSubmit={handleEmailSubmit(onEmailSubmit)}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  {...registerEmail('email')}
                />
                {emailErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{emailErrors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isEmailSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
              >
                {isEmailSubmitting ? 'Verifying...' : 'Continue'}
              </button>
            </motion.form>
          )}

          {/* Reset Password Step */}
          {step === 'reset' && (
            <motion.form
              onSubmit={handleResetSubmit(onResetSubmit)}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    {...registerReset('newPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {resetErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{resetErrors.newPassword.message}</p>
                )}

                {/* Password Strength */}
                <div className="mt-2 space-y-1">
                  <div className={`flex items-center gap-2 text-sm ${passwordStrength.length ? 'text-green-600' : 'text-gray-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.length ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    At least 6 characters
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.hasNumber ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    At least one number
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${passwordStrength.hasUppercase ? 'text-green-600' : 'text-gray-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.hasUppercase ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    At least one uppercase letter
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    {...registerReset('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-600 hover:text-gray-900"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {resetErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{resetErrors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isResetSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition mt-6"
              >
                {isResetSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold py-2"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            </motion.form>
          )}

          {/* Login Link */}
          <p className="text-center text-gray-700 mt-6">
            Remember your password?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
