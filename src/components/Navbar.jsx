import { useState, useEffect } from 'react';

const Navbar = () => {
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
          <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              LeadGen Pro
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a href="#home" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Contact
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors font-semibold"
              >
                Get Started
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
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
                  className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors font-semibold text-center"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </section>
        )}
      </header>
    </nav>
  );
};

export default Navbar;

