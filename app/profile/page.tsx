'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setMessage('error: All fields are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage('error: Invalid email address');
      return;
    }

    if (!/^\d{10,}$/.test(formData.phone)) {
      setMessage('error: Phone must be at least 10 digits');
      return;
    }

    if (user) {
      updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setMessage('success: Profile updated successfully');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const passwordStrength = {
    length: formData.password?.length >= 6,
    hasNumber: /\d/.test(formData.password || ''),
    hasUppercase: /[A-Z]/.test(formData.password || ''),
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              message.includes('error')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {message.replace('error: ', '').replace('success: ', '')}
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-4xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password */}
            {isEditing && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-600 hover:text-gray-900"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      {passwordStrength.length ? <Check size={16} className="text-green-600" /> : <X size={16} className="text-gray-400" />}
                      <span className={`text-sm ${passwordStrength.length ? 'text-green-600' : 'text-gray-600'}`}>At least 6 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasNumber ? <Check size={16} className="text-green-600" /> : <X size={16} className="text-gray-400" />}
                      <span className={`text-sm ${passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-600'}`}>At least one number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasUppercase ? <Check size={16} className="text-green-600" /> : <X size={16} className="text-gray-400" />}
                      <span className={`text-sm ${passwordStrength.hasUppercase ? 'text-green-600' : 'text-gray-600'}`}>At least one uppercase letter</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      if (user) {
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                          password: user.password,
                        });
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Account Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Account ID</span>
                <span className="font-medium text-gray-900 text-xs">{user.id}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
