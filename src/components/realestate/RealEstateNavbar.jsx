import { useState, useEffect } from 'react';

const RealEstateNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
      isScrolled ? 'glass-card backdrop-blur-xl shadow-soft' : 'bg-transparent'
    }`}>
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <section className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </section>
            <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              Elite<span className="text-amber-600">Properties</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide">
                Services
              </a>
            </li>
            <li>
              <a href="#properties" className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide">
                Properties
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide">
                Contact
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-all duration-300 font-semibold shadow-soft hover:shadow-glow transform hover:scale-105"
              >
                Enquire Now
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </section>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <section className="md:hidden py-4 border-t border-gray-200">
            <ul className="flex flex-col space-y-4">
              <li>
                <a
                  href="#home"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors font-semibold text-center"
                >
                  Enquire Now
                </a>
              </li>
            </ul>
          </section>
        )}
      </header>
    </nav>
  );
};

export default RealEstateNavbar;

