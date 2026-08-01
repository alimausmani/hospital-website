import { Activity, Pill, Heart, Stethoscope, Brain, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Advanced cardiac care including diagnosis, treatment, and preventive cardiology services.',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Comprehensive neurological services for brain and nervous system disorders.',
  },
  {
    icon: Activity,
    title: 'Orthopedics',
    description: 'Specialized bone and joint care with minimally invasive surgical techniques.',
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    description: 'Complete pharmaceutical services with expert pharmacists on staff.',
  },
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description: 'Comprehensive healthcare for all ages with experienced internists.',
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description: 'Child-friendly healthcare services from newborn to adolescent care.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-2 text-balance">
            Specialized Medical Care
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From preventive care to advanced treatments, we offer comprehensive medical services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/40 transition group cursor-pointer"
              >
                <div className="bg-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                <div className="h-1 w-8 bg-primary opacity-0 group-hover:opacity-100 transition" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
