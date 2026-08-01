import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Patricia Martinez',
    role: 'Patient',
    text: 'HealthCare Plus provided exceptional care during my cardiac treatment. The doctors and staff were incredibly professional and compassionate throughout my recovery journey.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    name: 'Robert Thompson',
    role: 'Patient',
    text: 'The emergency team at HealthCare Plus saved my life. Their quick response and expert care made all the difference. I cannot thank them enough for their dedication.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    text: 'I had my orthopedic surgery here and the post-operative care was outstanding. The physio team helped me recover faster than I expected. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'Patient',
    text: 'The neurology department is world-class. Dr. Chen was thorough in his diagnosis and explained everything clearly. I felt confident in my treatment plan from day one.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Patient Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-2 text-balance">
            What Our Patients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Read inspiring stories from patients who have experienced our healthcare excellence
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-7 border border-border hover:shadow-lg hover:border-primary/40 transition relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-6 h-6 text-primary/15" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                {`"${testimonial.text}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">100K+</h3>
            <p className="text-muted-foreground">Happy Patients</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</h3>
            <p className="text-muted-foreground">Patient Satisfaction</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</h3>
            <p className="text-muted-foreground">Expert Doctors</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">25+</h3>
            <p className="text-muted-foreground">Medical Specialties</p>
          </div>
        </div>
      </div>
    </section>
  );
}
