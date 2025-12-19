const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Gradient Background */}
      <section className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-purple-600"></section>
      
      {/* Animated Background Elements */}
      <section className="absolute inset-0">
        <section className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></section>
        <section className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></section>
      </section>

      {/* Content Container */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <article className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Generate More
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Leads Today
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed tracking-wide">
              Transform your business with our powerful lead generation platform.
              Connect with qualified prospects and scale your revenue effortlessly.
            </p>

            <section className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="group bg-white/95 backdrop-blur-sm text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-2xl shadow-soft hover:shadow-glow inline-flex items-center justify-center tracking-wide"
              >
                <span>Get Started Free</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </section>
          </article>

          {/* Right Illustration Placeholder */}
          <article className="relative flex items-center justify-center lg:justify-end">
            <section className="relative w-full max-w-lg">
              {/* Illustration Container with Glassmorphism */}
              <section className="relative glass-card rounded-3xl p-8 md:p-12 shadow-soft transform hover:scale-[1.02] transition-all duration-500 ease-out hover:shadow-glow">
                {/* Placeholder Content */}
                <section className="aspect-square flex items-center justify-center">
                  <svg
                    className="w-full h-full text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </section>
                
                {/* Decorative Elements */}
                <section className="absolute top-4 right-4 w-16 h-16 bg-yellow-300/20 rounded-full blur-xl animate-pulse"></section>
                <section className="absolute bottom-4 left-4 w-24 h-24 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-1000"></section>
              </section>
              
              {/* Floating Elements */}
              <section className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-2xl animate-bounce hidden lg:block"></section>
              <section className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-bounce delay-500 hidden lg:block"></section>
            </section>
          </article>
        </section>
      </section>

      {/* Scroll Indicator */}
      <section className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
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
  );
};

export default Hero;

