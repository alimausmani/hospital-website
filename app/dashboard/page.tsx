'use client';

import Header from '@/components/premium/header';
import { useAppointments } from '@/hooks/use-appointments';
import { useAuth } from '@/hooks/use-auth';
import { useMemo } from 'react';

const badgeStyles: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
  Completed: 'bg-green-100 text-green-700',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { appointments, updateStatus, cancelAppointment, deleteAppointment } = useAppointments();

  const upcomingAppointment = useMemo(() => {
    const now = Date.now();
    return appointments
      .filter((appointment) => {
        if (appointment.status === 'Cancelled' || appointment.status === 'Completed') return false;
        const time = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`).getTime();
        return !Number.isNaN(time) && time >= now;
      })
      .sort(
        (a, b) =>
          new Date(`${a.appointmentDate}T${a.appointmentTime}`).getTime() -
          new Date(`${b.appointmentDate}T${b.appointmentTime}`).getTime(),
      )[0];
  }, [appointments]);

  return (
    <main className="bg-white min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <h1 className="text-3xl font-bold text-gray-900">Welcome {user?.name}</h1>
        <p className="mt-2 text-gray-600">Track your appointment requests and status updates.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {(['Pending', 'Confirmed', 'Cancelled', 'Completed'] as const).map((status) => (
            <div key={status} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-600">{status}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {appointments.filter((appointment) => appointment.status === status).length}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Appointment</h2>
          {upcomingAppointment ? (
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><span className="font-semibold">Department:</span> {upcomingAppointment.department}</p>
              <p><span className="font-semibold">Doctor:</span> {upcomingAppointment.doctor}</p>
              <p><span className="font-semibold">Date:</span> {upcomingAppointment.appointmentDate}</p>
              <p><span className="font-semibold">Time:</span> {upcomingAppointment.appointmentTime}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-600">No upcoming appointments yet.</p>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Appointment History</h2>

          {appointments.length ? (
            <div className="mt-4 space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl border border-gray-100 bg-white p-4 md:flex md:items-center md:justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{appointment.department} • {appointment.doctor}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {appointment.appointmentDate} at {appointment.appointmentTime}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Reason: {appointment.reason}</p>
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[appointment.status]}`}>
                      {appointment.status}
                    </span>
                    {appointment.status === 'Pending' ? (
                      <button
                        onClick={() => updateStatus(appointment.id, 'Confirmed')}
                        className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition"
                      >
                        Mark Confirmed
                      </button>
                    ) : null}
                    {(appointment.status === 'Pending' || appointment.status === 'Confirmed') ? (
                      <button
                        onClick={() => updateStatus(appointment.id, 'Completed')}
                        className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50 transition"
                      >
                        Mark Completed
                      </button>
                    ) : null}
                    {(appointment.status === 'Pending' || appointment.status === 'Confirmed') ? (
                      <button
                        onClick={() => cancelAppointment(appointment.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                      >
                        Cancel Appointment
                      </button>
                    ) : null}
                    <button
                      onClick={() => deleteAppointment(appointment.id)}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      Delete Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-600">No appointment history found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
