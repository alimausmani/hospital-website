'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, User, Mail, Phone, Stethoscope } from 'lucide-react';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    department: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Appointment form submitted:', formData);
    alert('Thank you! We will contact you shortly to confirm your appointment.');
    setFormData({ name: '', email: '', phone: '', date: '', department: '', message: '' });
  };

  const departments = [
    'Select Department',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'General Medicine',
    'Pediatrics',
    'ENT',
    'Ophthalmology',
  ];

  return (
    <section id="appointment" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Book Your Visit</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-2 text-balance">
            Schedule an Appointment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Fill out the form below and our team will contact you to confirm your appointment
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-sm p-8 md:p-10 space-y-6 border border-border">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Preferred Date</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Select Department</label>
            <div className="relative">
              <Stethoscope size={18} className="absolute left-3 top-3.5 text-muted-foreground pointer-events-none" />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none"
              >
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Medical Concern (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your symptoms or medical concern..."
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition"
          >
            Book Appointment
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We&apos;ll contact you within 24 hours to confirm your appointment.
          </p>
        </form>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-border text-center">
            <h4 className="font-bold text-foreground mb-2">Quick Response</h4>
            <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border text-center">
            <h4 className="font-bold text-foreground mb-2">Flexible Scheduling</h4>
            <p className="text-sm text-muted-foreground">Choose your preferred time</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border text-center">
            <h4 className="font-bold text-foreground mb-2">Expert Doctors</h4>
            <p className="text-sm text-muted-foreground">Top specialists available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
