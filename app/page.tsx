import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Departments from '@/components/departments';
import Doctors from '@/components/doctors';
import Appointment from '@/components/appointment';
import Testimonials from '@/components/testimonials';
import Emergency from '@/components/emergency';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <Services />
      <Departments />
      <Doctors />
      <Appointment />
      <Testimonials />
      <Emergency />
      <Footer />
    </main>
  );
}
