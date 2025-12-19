import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import LeadCaptureForm from '../components/LeadCaptureForm';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceCards />
        <LeadCaptureForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Home;

