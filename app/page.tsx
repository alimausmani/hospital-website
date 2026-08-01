import Header from '@/components/premium/header';
import Hero from '@/components/premium/hero';
import About from '@/components/premium/about';
import WhyChooseUs from '@/components/premium/why-choose-us';
import Departments from '@/components/premium/departments';
import Doctors from '@/components/premium/doctors';
import Services from '@/components/premium/services';
import Facilities from '@/components/premium/facilities';
import Testimonials from '@/components/premium/testimonials';
import Gallery from '@/components/premium/gallery';
import Emergency from '@/components/premium/emergency';
import FAQ from '@/components/premium/faq';
import Contact from '@/components/premium/contact';
import Footer from '@/components/premium/footer';
import FloatingButtons from '@/components/premium/floating-buttons';

export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <Hero />
      <About />
      <WhyChooseUs />
      <Departments />
      <Doctors />
      <Services />
      <Facilities />
      <Testimonials />
      <Gallery />
      <Emergency />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
