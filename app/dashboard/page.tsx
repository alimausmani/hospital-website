'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Trash2, X, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getAppointments, deleteAppointment, updateAppointmentStatus, type Appointment } from '@/lib/appointments';

export default function DashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');

  useEffect(() => {
    if (user) {
      const userAppointments = getAppointments(user.id);
      setAppointments(userAppointments);
    }
  }, [user]);

  const handleDelete = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(appointmentId);
      setAppointments(appointments.filter((a) => a.id !== appointmentId));
    }
  };

  const handleCancel = (appointmentId: string) => {
    updateAppointmentStatus(appointmentId, 'Cancelled');
    setAppointments(appointments.map((a) => (a.id === appointmentId ? { ...a, status: 'Cancelled' } : a)));
  };

  const filteredAppointments = appointments.filter((a) => filter === 'all' || a.status === filter);

  const upcomingAppointments = appointments.filter((a) => a.status !== 'Completed' && a.status !== 'Cancelled');
  const completedAppointments = appointments.filter((a) => a.status === 'Completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your medical appointments</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="text-3xl font-bold text-blue-600">{appointments.length}</div>
            <p className="text-gray-600 text-sm mt-1">Total Appointments</p>
          </motion.div>

          <motion.div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="text-3xl font-bold text-yellow-600">{upcomingAppointments.length}</div>
            <p className="text-gray-600 text-sm mt-1">Upcoming</p>
          </motion.div>

          <motion.div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="text-3xl font-bold text-green-600">{completedAppointments.length}</div>
            <p className="text-gray-600 text-sm mt-1">Completed</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {(['all', 'pending', 'confirmed', 'cancelled', 'completed'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2.5 rounded-lg font-semibold whitespace-nowrap transition ${
                filter === filterOption
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-600'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <motion.div className="bg-white rounded-lg p-12 text-center border border-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-6">You don&apos;t have any {filter === 'all' ? '' : filter} appointments yet.</p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Book Appointment
              </Link>
            </motion.div>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>{appointment.status}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{appointment.department}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">{appointment.appointmentDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Time</p>
                        <p className="font-medium text-gray-900">{appointment.appointmentTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Reason</p>
                        <p className="font-medium text-gray-900 truncate">{appointment.reason}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Booked</p>
                        <p className="font-medium text-gray-900">{new Date(appointment.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 md:flex-row">
                    {appointment.status === 'Pending' && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition"
                      >
                        <X size={18} />
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition"
                    >
                      <Trash2 size={18} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>

                {/* Emergency Badge */}
                {appointment.emergency && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">🚨 Emergency Case</span>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
