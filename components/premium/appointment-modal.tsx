'use client';

import { Button } from '@/components/ui/button';
import { useAppointmentModal } from '@/hooks/use-appointment-modal';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { appointmentService } from '@/lib/services/appointment-service';
import { appointmentSchema, type AppointmentSchema } from '@/lib/validators/appointment';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Pediatrics', 'ENT', 'Ophthalmology'];

const doctors = [
  'Dr. Rajesh Sharma',
  'Dr. Priya Verma',
  'Dr. Amit Kulkarni',
  'Dr. Sneha Patil',
  'Dr. Rohan Joshi',
];

export default function AppointmentModal() {
  const { isOpen, closeModal } = useAppointmentModal();
  const { user } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: '',
      age: 0,
      gender: 'Male',
      phone: '',
      email: '',
      address: '',
      department: '',
      doctor: '',
      appointmentDate: '',
      appointmentTime: '',
      reason: '',
      emergency: false,
      notes: '',
      agreement: false,
    },
  });

  useEffect(() => {
    if (!isOpen || !user) return;
    setValue('fullName', user.name);
    setValue('email', user.email);
    setValue('phone', user.phone);
  }, [isOpen, setValue, user]);

  const onSubmit = async (values: AppointmentSchema) => {
    if (!user) return;

    appointmentService.create({
      userId: user.id,
      fullName: values.fullName,
      age: values.age,
      gender: values.gender,
      phone: values.phone,
      email: values.email,
      address: values.address,
      department: values.department,
      doctor: values.doctor,
      appointmentDate: values.appointmentDate,
      appointmentTime: values.appointmentTime,
      reason: values.reason,
      emergency: values.emergency,
      notes: values.notes ?? '',
    });

    const message = `🏥 NEW APPOINTMENT REQUEST

Patient Name:
${values.fullName}

Age:
${values.age}

Gender:
${values.gender}

Phone:
${values.phone}

Email:
${values.email}

Address:
${values.address}

Department:
${values.department}

Doctor:
${values.doctor}

Date:
${values.appointmentDate}

Time:
${values.appointmentTime}

Reason:
${values.reason}

Emergency:
${values.emergency ? 'Yes' : 'No'}

Notes:
${values.notes ?? ''}`;

    const url = `https://wa.me/917775840289?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    showToast('Appointment request sent successfully.');
    closeModal();
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/50 px-4 py-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="mx-auto w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.fullName?.message}>
                  <input {...register('fullName')} className={inputClass} />
                </Field>
                <Field label="Age" error={errors.age?.message}>
                  <input type="number" {...register('age')} className={inputClass} />
                </Field>
                <Field label="Gender" error={errors.gender?.message}>
                  <select {...register('gender')} className={inputClass}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input {...register('phone')} className={inputClass} />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input {...register('email')} className={inputClass} />
                </Field>
                <Field label="Address" error={errors.address?.message}>
                  <input {...register('address')} className={inputClass} />
                </Field>
                <Field label="Department" error={errors.department?.message}>
                  <select {...register('department')} className={inputClass}>
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Doctor" error={errors.doctor?.message}>
                  <select {...register('doctor')} className={inputClass}>
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Appointment Date" error={errors.appointmentDate?.message}>
                  <input type="date" {...register('appointmentDate')} className={inputClass} />
                </Field>
                <Field label="Appointment Time" error={errors.appointmentTime?.message}>
                  <input type="time" {...register('appointmentTime')} className={inputClass} />
                </Field>
              </div>

              <Field label="Reason" error={errors.reason?.message}>
                <input {...register('reason')} className={inputClass} />
              </Field>

              <Field label="Notes" error={errors.notes?.message}>
                <textarea rows={3} {...register('notes')} className={`${inputClass} resize-none`} />
              </Field>

              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input type="checkbox" {...register('emergency')} className="mt-1 h-4 w-4 accent-blue-600" />
                This is an emergency case.
              </label>

              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input type="checkbox" {...register('agreement')} className="mt-1 h-4 w-4 accent-blue-600" />
                I confirm that the above details are accurate and agree to be contacted for appointment confirmation.
              </label>
              {errors.agreement?.message ? (
                <p className="text-xs text-red-600">{errors.agreement.message}</p>
              ) : null}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

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
