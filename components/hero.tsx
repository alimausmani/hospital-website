import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-semibold text-primary">Excellence in Healthcare</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
              Your Health is Our{' '}
              <span className="text-primary">Priority</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              HealthCare Plus is a leading multi-specialty hospital equipped with state-of-the-art
              facilities and a team of experienced healthcare professionals dedicated to providing
              comprehensive medical care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white gap-2"
              >
                Book Appointment <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">25+</h3>
                <p className="text-sm text-muted-foreground">Medical Specialties</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">500+</h3>
                <p className="text-sm text-muted-foreground">Expert Doctors</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">100K+</h3>
                <p className="text-sm text-muted-foreground">Happy Patients</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">24/7</h3>
                <p className="text-sm text-muted-foreground">Emergency Services</p>
              </div>
            </div>
          </div>

          {/* Right Side - Info Cards */}
          <div className="grid gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Emergency Hotline</h3>
              <p className="text-muted-foreground mb-4">Available 24/7 for urgent medical needs</p>
              <p className="text-2xl font-bold text-primary">+1 (800) 123-4567</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border hover:shadow-xl transition">
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Operating Hours</h3>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>Emergency: 24 Hours</p>
                <p>OPD: 9:00 AM - 9:00 PM</p>
                <p>Consultation: By Appointment</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-3">Special Offer</h3>
              <p className="text-sm opacity-90">
                Get 20% discount on first consultation. Use code: HEALTH20
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
