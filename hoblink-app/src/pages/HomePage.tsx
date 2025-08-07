import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HobLinkLogo from '../components/HobLinkLogo';
import ThemeToggle from '../components/ThemeToggle';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on load
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Moving Car Animation - Multiple cars */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <div className="opacity-10 dark:opacity-5 moving-car">
            <div className="w-16 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg shadow-lg relative">
              {/* Car details */}
              <div className="absolute top-1 left-2 w-3 h-3 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-1 right-2 w-3 h-3 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-0 left-4 w-8 h-2 bg-blue-200 rounded opacity-60"></div>
              {/* Car emoji for better mobile representation */}
              <div className="absolute inset-0 flex items-center justify-center text-lg">🚗</div>
            </div>
          </div>

        {/* Second car - different timing */}
        <div className="absolute top-3/5 left-0 transform -translate-y-1/2" style={{ animationDelay: '7s' }}>
          <div className="opacity-8 dark:opacity-4 moving-car">
            <div className="w-12 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg shadow-lg relative">
              <div className="absolute inset-0 flex items-center justify-center text-sm">🚕</div>
            </div>
          </div>
        </div>
      </div>

        {/* Road/path indicator */}
        <div className="absolute bottom-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-20 dark:via-gray-600"></div>
        
        {/* Floating mobility icons */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 text-green-300 opacity-20 animate-ping">📍</div>
        <div className="absolute bottom-1/4 left-1/4 w-6 h-6 text-emerald-400 opacity-30 animate-pulse">🗺️</div>
        <div className="absolute top-1/3 left-2/3 w-4 h-4 text-blue-400 opacity-25 animate-bounce">🛣️</div>
        
        {/* Abstract geometric shapes */}
        <div className="absolute top-1/5 right-1/3 w-4 h-4 bg-green-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-2/5 right-1/5 w-2 h-8 bg-emerald-300 rounded opacity-15 animate-ping"></div>
      </div>

      {/* Header with enlarged logo */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <HobLinkLogo variant="horizontal" size="3xl" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors">
                Home
              </Link>
              <Link to="/book-ride" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors">
                Book Ride
              </Link>
              <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors">
                Login
              </Link>
              <ThemeToggle />
            </nav>
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Glassmorphism */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Glassmorphism Hero Content Box */}
            <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-gray-700/20 max-w-4xl mx-auto hover:bg-white/40 dark:hover:bg-gray-800/40 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-green-500/10 dark:hover:shadow-emerald-400/10">
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 opacity-30 pointer-events-none"></div>
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-green-500/20 via-transparent to-emerald-500/20 dark:from-green-400/20 dark:to-emerald-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-[float_4s_ease-in-out_infinite]">
                  Hob in. Link up.
                </span>
                <br />
                <span className="text-gray-700 dark:text-gray-200 inline-block animate-[float_4s_ease-in-out_infinite] delay-100">Let's go.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-[float_4s_ease-in-out_infinite] delay-200">
                Safe, Simple Rides — Wherever You Are.<br />
                <span className="text-lg font-medium text-green-600 dark:text-green-400 inline-block animate-[pulse_3s_ease-in-out_infinite]">
                  Serving rural Limpopo with reliable transport solutions.
                </span>
              </p>

              {/* CTA Buttons with Glassmorphism */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/book-ride"
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="relative z-10">🚗 Book a Ride Now</span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link
                  to="/signup"
                  className="px-8 py-4 backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-200 font-bold rounded-2xl hover:bg-white/30 dark:hover:bg-gray-800/30 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  📱 Sign Up Today
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Icons Bar */}
      <section className={`py-12 px-4 transition-all duration-1000 delay-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl">⚡</div>
                <h3 className="font-bold text-gray-800 dark:text-white">Fast & Reliable</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Optimized for 2G & low-data areas</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl">📍</div>
                <h3 className="font-bold text-gray-800 dark:text-white">Local Focus</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Serving Tzaneen & nearby villages</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl">💳</div>
                <h3 className="font-bold text-gray-800 dark:text-white">Flexible Payments</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Cash • SnapScan • PayFast • Yoco • Capitec Pay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className={`py-16 px-4 transition-all duration-1000 delay-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Where HobLink Operates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're proud to serve local communities in Limpopo. HobLink is focused on short-distance trips within rural and township areas. Here's where we're currently operating and where we're headed next.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Areas */}
            <div className="backdrop-blur-lg bg-green-50/50 dark:bg-green-900/20 rounded-2xl p-8 shadow-xl border border-green-200/30 dark:border-green-700/30">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-400">✅ Initial Launch Areas</h3>
              </div>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="font-medium">🏘️ <strong>Tzaneen</strong> • <strong>Nkowankowa</strong> • <strong>Lenyenye</strong></p>
                <p className="font-medium">🏘️ <strong>Dan Village</strong> • <strong>Ritavi</strong> • <strong>Tickyline</strong></p>
                <p className="font-medium">🏘️ <strong>Mogapeng</strong> • <strong>Burgersdorp</strong></p>
                <p className="text-sm italic mt-4">+ surrounding rural areas in Mopani District, Limpopo</p>
              </div>
            </div>

            {/* Expanding Soon */}
            <div className="backdrop-blur-lg bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-8 shadow-xl border border-blue-200/30 dark:border-blue-700/30">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-3"></div>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400">🚀 Expanding Soon</h3>
              </div>
              <div className="space-y-3">
                {['Polokwane', 'Giyani', 'Phalaborwa', 'Burgersfort', 'Sekhukhune'].map((city, index) => (
                  <div key={city} className="flex items-center justify-between p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">🏙️ {city}</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-sm animate-pulse">
                      Coming Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div className="mt-8 text-center">
            <div className="inline-block backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-2xl px-8 py-4 shadow-lg border border-white/20 dark:border-gray-700/20">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                📍 <strong>Service Type:</strong> Local rides only (no long-distance trips for now)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className={`py-16 px-4 bg-gradient-to-r from-green-600/5 to-emerald-600/5 dark:from-green-900/10 dark:to-emerald-900/10 transition-all duration-1000 delay-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="container mx-auto max-w-4xl">
          <div className="backdrop-blur-lg bg-white/50 dark:bg-gray-800/50 rounded-2xl p-8 shadow-2xl border border-white/30 dark:border-gray-700/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300">We're here to serve your community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Head Office */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center md:justify-start">
                  🏢 Head Office
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p className="flex items-center justify-center md:justify-start">
                    <span className="mr-2">📍</span>
                    Ramalema, Tzaneen, Limpopo
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <span className="mr-2">📞</span>
                    <a href="tel:+27835976462" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      +27 83 597 6462
                    </a>
                  </p>
                </div>
              </div>

              {/* Payment Options */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">💳 Payment Options</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center"><span className="mr-1">💵</span> Cash</span>
                  <span className="flex items-center"><span className="mr-1">📱</span> SnapScan</span>
                  <span className="flex items-center"><span className="mr-1">💳</span> PayFast</span>
                  <span className="flex items-center"><span className="mr-1">🏦</span> Yoco</span>
                  <span className="flex items-center"><span className="mr-1">🏧</span> Capitec Pay</span>
                  <span className="flex items-center"><span className="mr-1">⚡</span> OZOW</span>
                  <span className="flex items-center"><span className="mr-1">📲</span> Zapper</span>
                  <span className="flex items-center"><span className="mr-1">💳</span> Card Swipe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <HobLinkLogo variant="horizontal" size="xl" />
              <p className="mt-4 text-gray-400 mb-4">
                Safe, Simple Rides — Wherever You Are.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/hoblinksa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <span className="text-white text-lg group-hover:scale-110 transition-transform">📘</span>
                </a>
                <a 
                  href="https://instagram.com/hoblinksa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group"
                >
                  <span className="text-white text-lg group-hover:scale-110 transition-transform">📷</span>
                </a>
                <a 
                  href="https://x.com/hoblinksa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black hover:bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center transition-colors duration-300 group"
                >
                  <span className="text-white text-lg group-hover:scale-110 transition-transform">𝕏</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/book-ride" className="block text-gray-400 hover:text-white transition-colors">Book a Ride</Link>
                <Link to="/signup" className="block text-gray-400 hover:text-white transition-colors">Sign Up</Link>
                <Link to="/login" className="block text-gray-400 hover:text-white transition-colors">Login</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>📍 Ramalema, Tzaneen, Limpopo</p>
                <p>📞 +27 83 597 6462</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-6">
              <a 
                href="https://facebook.com/hoblinksa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/hoblinksa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://x.com/hoblinksa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-100 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <p className="mb-2">&copy; 2024 HobLink. All rights reserved.</p>
            <p className="text-sm">
              <span className="text-green-400 font-semibold">HobLink</span> by{' '}
              <a 
                href="https://thabodigital.co.za" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Thabo Digital
              </a>
              {' '} • Built with ❤️ for rural South Africa
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes moveRight {
          0% {
            transform: translateX(-100px) translateY(-50%);
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-50%);
          }
        }
        .moving-car {
          animation: moveRight 15s linear infinite, bounce 2s ease-in-out infinite;
          animation-delay: 0s, 1s;
        }
      `}} />
    </div>
  );
};

export default HomePage;