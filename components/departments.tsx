import { Users, Microscope, Zap, Wind, Eye, Ear } from 'lucide-react';

const departments = [
  {
    icon: Users,
    name: 'Surgery',
    description: 'State-of-the-art surgical suites with advanced equipment',
    specialties: ['General Surgery', 'Laparoscopic Surgery', 'Trauma'],
  },
  {
    icon: Microscope,
    name: 'Diagnostics',
    description: 'Advanced diagnostic imaging and laboratory services',
    specialties: ['CT Scan', 'MRI', 'Ultrasound'],
  },
  {
    icon: Zap,
    name: 'Emergency',
    description: 'Fully equipped emergency department with trauma care',
    specialties: ['24/7 Services', 'Critical Care', 'Ambulance Service'],
  },
  {
    icon: Wind,
    name: 'Respiratory',
    description: 'Comprehensive respiratory and pulmonary care',
    specialties: ['Pulmonology', 'Sleep Medicine', 'ICU'],
  },
  {
    icon: Eye,
    name: 'Ophthalmology',
    description: 'Complete eye care and vision correction services',
    specialties: ['LASIK', 'Cataract Surgery', 'Retinal Care'],
  },
  {
    icon: Ear,
    name: 'ENT',
    description: 'Ear, nose, and throat specialist care',
    specialties: ['Hearing Aids', 'Surgery', 'Allergy Testing'],
  },
];

export default function Departments() {
  return (
    <section id="departments" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Our Departments</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-2 text-balance">
            Specialized Care Centers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each department features advanced technology and experienced specialists dedicated to your care
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div
                key={index}
                className="group bg-card rounded-xl p-7 border border-border hover:border-primary/40 hover:shadow-lg transition cursor-pointer"
              >
                <div className="bg-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{dept.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{dept.description}</p>

                <div className="space-y-2 pt-4 border-t border-border">
                  {dept.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-foreground font-medium">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
