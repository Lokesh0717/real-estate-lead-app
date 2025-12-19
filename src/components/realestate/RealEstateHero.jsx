const RealEstateHero = () => {
  const phoneNumber = '+1234567890'; // Replace with your phone number
  const whatsappNumber = '1234567890'; // Replace with your WhatsApp number
  const whatsappMessage = encodeURIComponent('Hello! I\'m interested in finding my dream property.');

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background Image with Dark Overlay */}
      <section className="absolute inset-0">
        <section 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')"
          }}
        >
          {/* Dark Overlay - Multiple layers for depth */}
          <section className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/75"></section>
          <section className="absolute inset-0 bg-black/40"></section>
        </section>
      </section>

      {/* Animated Decorative Elements */}
      <section className="absolute inset-0 overflow-hidden">
        <section className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></section>
        <section className="absolute bottom-20 left-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></section>
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></section>
      </section>

      {/* Content with Fade-in Animation */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 animate-fade-in">
        {/* Large Bold Heading - Property-Focused for Buyers */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight animate-slide-up">
          Your Dream Home
          <span className="block bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent mt-2 animate-gradient bg-[length:200%_auto]">
            Awaits You
          </span>
        </h1>
        
        {/* Subheading - Buyer-Focused */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed tracking-wide font-light animate-slide-up-delay">
          Explore premium properties, verified listings, and trusted real estate solutions.
          <span className="block mt-2 text-white/90 font-medium">Start your property journey with India's most trusted real estate partner.</span>
        </p>

        {/* CTA Buttons with Enhanced Hover Effects */}
        <section className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up-delay-2">
          <a
            href={`tel:${phoneNumber}`}
            className="group relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-1 shadow-soft hover:shadow-glow inline-flex items-center justify-center w-full sm:w-auto overflow-hidden"
          >
            {/* Shine effect on hover */}
            <section className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></section>
            <svg className="w-5 h-5 mr-2 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="relative z-10">Call Now</span>
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative glass-card backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/25 hover:border-white/50 transition-all duration-300 ease-out transform hover:scale-110 hover:-translate-y-1 inline-flex items-center justify-center w-full sm:w-auto"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Enquire on WhatsApp</span>
          </a>
        </section>

        {/* Trust Indicators with Hover Effects */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-delay">
          <article className="glass-card rounded-xl p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 cursor-default group">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">500+</h3>
            <p className="text-white/80 tracking-wide group-hover:text-white transition-colors duration-300">Properties Sold</p>
          </article>
          <article className="glass-card rounded-xl p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 cursor-default group">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">15+</h3>
            <p className="text-white/80 tracking-wide group-hover:text-white transition-colors duration-300">Years Experience</p>
          </article>
          <article className="glass-card rounded-xl p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 cursor-default group">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">98%</h3>
            <p className="text-white/80 tracking-wide group-hover:text-white transition-colors duration-300">Client Satisfaction</p>
          </article>
        </section>
      </section>

      {/* Scroll Indicator with Pulse Animation */}
      <section className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <section className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2 tracking-wide">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-white animate-pulse"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </section>
      </section>
    </section>
  );
};

export default RealEstateHero;

