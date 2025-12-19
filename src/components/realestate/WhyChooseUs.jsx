const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Verified Properties',
      description: 'Every listing is thoroughly verified. No fake listings, no hidden surprises. Only genuine properties from trusted sellers.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Expert Guidance',
      description: 'Our experienced real estate advisors provide personalized assistance throughout your property buying journey.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Negotiate the best deals with our transparent pricing. We ensure you get the most value for your investment.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Quick Process',
      description: 'Streamlined documentation and fast-track approvals. Move into your dream home faster with our efficient process.',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer support. Our team is always ready to assist you with any queries or concerns.',
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Legal Assurance',
      description: 'Complete legal verification and documentation support. Buy with confidence knowing all paperwork is in order.',
      gradient: 'from-teal-500 to-green-600',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            Why Choose <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Trusted by thousands of property buyers across India. Experience the difference of working with professionals.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <article
              key={index}
              className="glass-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02] group"
            >
              <section className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <section className="text-white">
                  {feature.icon}
                </section>
              </section>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight leading-snug">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed tracking-wide">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        {/* Trust Badges */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <article>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">15+</h3>
              <p className="text-gray-600 tracking-wide">Years Experience</p>
            </article>
            <article>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">5000+</h3>
              <p className="text-gray-600 tracking-wide">Happy Customers</p>
            </article>
            <article>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">1000+</h3>
              <p className="text-gray-600 tracking-wide">Properties Sold</p>
            </article>
            <article>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">98%</h3>
              <p className="text-gray-600 tracking-wide">Satisfaction Rate</p>
            </article>
          </section>
        </section>
      </section>
    </section>
  );
};

export default WhyChooseUs;

