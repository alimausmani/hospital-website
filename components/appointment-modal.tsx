'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { appointmentSchema, type AppointmentFormData } from '@/lib/validations';
import { saveAppointment, generateWhatsAppMessage, sendWhatsAppMessage } from '@/lib/appointments';

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics', 'General Surgery', 'Ophthalmology'];
const doctors = {
  Cardiology: ['Dr. Rajesh Kumar', 'Dr. Priya Singh'],
  Neurology: ['Dr. Amit Patel', 'Dr. Neha Sharma'],
  Orthopedics: ['Dr. Vikram Rao', 'Dr. Anjali Verma'],
  Dermatology: ['Dr. Sanjay Desai', 'Dr. Meera Gupta'],
  Pediatrics: ['Dr. Arun Nair', 'Dr. Divya Kumari'],
  'General Surgery': ['Dr. Hemant Joshi', 'Dr. Kavya Iyer'],
  Ophthalmology: ['Dr. Suresh Kumar', 'Dr. Shruti Mehta'],
};

export function AppointmentModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const dept = watch('department') || selectedDept;
  const availableDoctors = doctors[dept as keyof typeof doctors] || [];

  useEffect(() => {
    const modal = document.getElementById('appointmentModal') as any;
    if (modal) {
      modal.addEventListener('close', () => setIsOpen(false));
      modal.addEventListener('cancel', () => setIsOpen(false));
    }
  }, []);

  const onSubmit = async (data: AppointmentFormData) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      const appointment = saveAppointment({
        userId: user.id,
        fullName: data.fullName,
        age: data.age,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        department: data.department,
        doctor: data.doctor,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        reason: data.reason,
        emergency: data.emergency,
        notes: data.notes || '',
        status: 'Pending',
      });

      const message = generateWhatsAppMessage(appointment);
      sendWhatsAppMessage(message);

      setSuccess('Appointment booked successfully! Redirecting to WhatsApp...');
      setTimeout(() => {
        reset();
        setIsOpen(false);
        const modal = document.getElementById('appointmentModal') as any;
        modal?.close?.();
      }, 2000);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      id="appointmentModal"
      className="modal modal-bottom sm:modal-middle w-full max-w-2xl"
      onClose={() => setIsOpen(false)}
    >
      <motion.div
        className="modal-box w-full bg-white p-0 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 md:p-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">Book Appointment</h2>
          <button
            onClick={() => {
              const modal = document.getElementById('appointmentModal') as any;
              modal?.close?.();
            }}
            className="p-2 hover:bg-blue-700 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
          {success && (
            <motion.div
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                {...register('fullName')}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Age</label>
                <input
                  type="number"
                  placeholder="25"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('age')}
                />
                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Gender</label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('gender')}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('phone')}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('email')}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
              <input
                type="text"
                placeholder="123 Main Street, City"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                {...register('address')}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            {/* Department & Doctor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('department', {
                    onChange: (e) => setSelectedDept(e.target.value),
                  })}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Doctor</label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('doctor')}
                  disabled={!availableDoctors.length}
                >
                  <option value="">
                    {availableDoctors.length ? 'Select Doctor' : 'Select Department First'}
                  </option>
                  {availableDoctors.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
                {errors.doctor && <p className="mt-1 text-sm text-red-600">{errors.doctor.message}</p>}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Appointment Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('appointmentDate')}
                />
                {errors.appointmentDate && <p className="mt-1 text-sm text-red-600">{errors.appointmentDate.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Appointment Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  {...register('appointmentTime')}
                />
                {errors.appointmentTime && <p className="mt-1 text-sm text-red-600">{errors.appointmentTime.message}</p>}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Reason for Visit</label>
              <textarea
                placeholder="Describe your medical concern..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                rows={3}
                {...register('reason')}
              />
              {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>}
            </div>

            {/* Emergency & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  {...register('emergency')}
                />
                <label className="text-sm font-medium text-gray-900">Emergency Case</label>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Notes</label>
              <textarea
                placeholder="Any other information..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                rows={2}
                {...register('notes')}
              />
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 mt-1"
                {...register('agreement')}
              />
              <label className="text-sm text-gray-700">
                I agree to the terms and conditions and understand that this appointment request will be reviewed by the hospital staff.
              </label>
            </div>
            {errors.agreement && <p className="text-sm text-red-600">{errors.agreement.message}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition mt-6"
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </motion.div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
