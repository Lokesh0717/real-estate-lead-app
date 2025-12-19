import RealEstateNavbar from '../components/realestate/RealEstateNavbar';
import RealEstateHero from '../components/realestate/RealEstateHero';
import PropertyServices from '../components/realestate/PropertyServices';
import WhyChooseUs from '../components/realestate/WhyChooseUs';
import PropertyEnquiryForm from '../components/realestate/PropertyEnquiryForm';
import RealEstateFooter from '../components/realestate/RealEstateFooter';
import RealEstateWhatsAppButton from '../components/realestate/RealEstateWhatsAppButton';

const RealEstateHome = () => {
  return (
    <>
      <RealEstateNavbar />
      <main>
        <RealEstateHero />
        <PropertyServices />
        <WhyChooseUs />
        <PropertyEnquiryForm />
      </main>
      <RealEstateFooter />
      <RealEstateWhatsAppButton />
    </>
  );
};

export default RealEstateHome;

