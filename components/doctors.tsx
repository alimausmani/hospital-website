'use client';

import { Button } from '@/components/ui/button';
import { Star, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15+ years',
    rating: 4.9,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Neurosurgeon',
    experience: '18+ years',
    rating: 4.8,
    reviews: 287,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Emma Wilson',
    specialty: 'General Practitioner',
    experience: '12+ years',
    rating: 5.0,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Rajesh Kumar',
    specialty: 'Orthopedic Surgeon',
    experience: '16+ years',
    rating: 4.9,
    reviews: 356,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Lisa Anderson',
    specialty: 'Pediatrician',
    experience: '14+ years',
    rating: 4.8,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. James Mitchell',
    specialty: 'Dermatologist',
    experience: '13+ years',
    rating: 4.9,
    reviews: 271,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-sm font-semibold text-accent">Expert Physicians</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Meet Our Doctors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our team of highly qualified and experienced doctors are committed to providing the best healthcare
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition group">
              {/* Image */}
              <div className="relative h-56 bg-muted overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{doctor.name}</h3>
                <p className="text-accent font-semibold mb-2">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground mb-4">{doctor.experience} experience</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {doctor.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.reviews} reviews)
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button size="sm" variant="ghost" className="flex-1 gap-2 text-primary hover:bg-primary/10">
                    <Mail size={16} />
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
}
