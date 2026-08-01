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
    <section id="departments" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-secondary rounded-full" />
            <span className="text-sm font-semibold text-secondary">Our Departments</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            World-Class Departments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Each department is equipped with cutting-edge technology and staffed by highly qualified professionals
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 border border-border hover:border-secondary hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2">{dept.name}</h3>
                <p className="text-muted-foreground mb-6">{dept.description}</p>

                <div className="space-y-2">
                  {dept.specialties.map((specialty, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
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
