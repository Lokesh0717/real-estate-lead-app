const PropertyServices = () => {
  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Buy Property',
      description: 'Browse verified listings of luxury homes, premium apartments, and exclusive villas. Find your perfect property with expert guidance and complete transparency.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Sell Property',
      description: 'Get the best value for your property with our professional valuation and marketing services. We handle everything for you.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Rent Property',
      description: 'Find your ideal rental property from our curated selection. Short-term and long-term rentals available with flexible terms.',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            Our <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Comprehensive real estate solutions tailored to your needs
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <article
              key={index}
              className="glass-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02] group"
            >
              <section className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <section className={service.iconColor}>
                  {service.icon}
                </section>
              </section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight leading-snug">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed tracking-wide">
                {service.description}
              </p>
              <a
                href="#contact"
                className={`inline-flex items-center mt-6 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
              >
                Learn More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </article>
          ))}
        </section>
      </section>
    </section>
  );
};

export default PropertyServices;

