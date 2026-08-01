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
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-semibold text-primary">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Medical Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We offer a wide range of medical specialties and services to meet all your healthcare needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-background rounded-xl p-8 border border-border hover:shadow-lg hover:border-primary/30 transition group"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/20 transition">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Button variant="ghost" className="text-primary p-0 hover:bg-transparent hover:translate-x-1 transition">
                  Learn More →
                </Button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
