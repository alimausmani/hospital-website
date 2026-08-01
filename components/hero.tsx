import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <CheckCircle size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Trusted Healthcare Provider</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Your Health is{' '}
              <span className="text-primary">Our Mission</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience world-class healthcare with our team of expert doctors and cutting-edge medical facilities. We provide comprehensive medical care for your entire family.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-lg font-semibold"
              >
                Book Appointment <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-secondary rounded-lg font-semibold"
              >
                Learn More
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
              <div>
                <h3 className="text-3xl font-bold text-primary">25+</h3>
                <p className="text-sm text-muted-foreground font-medium">Specialties</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">500+</h3>
                <p className="text-sm text-muted-foreground font-medium">Expert Doctors</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">100K+</h3>
                <p className="text-sm text-muted-foreground font-medium">Happy Patients</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">24/7</h3>
                <p className="text-sm text-muted-foreground font-medium">Emergency Care</p>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="space-y-6">
            {/* Emergency Card */}
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex items-start gap-4">
                <Phone size={28} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Emergency Hotline</h3>
                  <p className="text-white/80 mb-4 text-sm">Call anytime for urgent care</p>
                  <p className="text-3xl font-bold">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <Clock size={28} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Operating Hours</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-semibold text-foreground">Emergency:</span> Open 24/7</p>
                    <p><span className="font-semibold text-foreground">OPD:</span> 9:00 AM - 9:00 PM</p>
                    <p><span className="font-semibold text-foreground">ICU:</span> Round the clock</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-secondary border-2 border-primary/30 p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-primary mb-2">Limited Time Offer</h3>
              <p className="text-sm text-foreground mb-4">
                Get 20% discount on your first consultation. Use code <span className="font-bold text-primary">HEALTH20</span>
              </p>
              <div className="h-1 bg-primary/30 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Limited slots available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
