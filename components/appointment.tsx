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
    <section id="appointment" className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Calendar size={16} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Book Your Appointment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Schedule a Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Fill out the form below and our team will contact you to confirm your appointment
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (800) 123-4567"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Department</label>
                <div className="relative">
                  <Stethoscope className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition appearance-none bg-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept === 'Select Department' ? '' : dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your symptoms or concerns..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Book Appointment
              </Button>
              <Button
                type="reset"
                size="lg"
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/10"
              >
                Clear Form
              </Button>
            </div>
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
