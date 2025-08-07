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
        {/* Moving Car Animation */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <div className="animate-pulse opacity-10 dark:opacity-5">
            <div className="w-16 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg shadow-lg animate-bounce" 
                 style={{ 
                   animation: 'moveRight 15s linear infinite, bounce 2s ease-in-out infinite',
                   animationDelay: '0s, 1s' 
                 }}>
              {/* Car shape */}
              <div className="absolute top-1 left-2 w-3 h-3 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-1 right-2 w-3 h-3 bg-white rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-300 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
      </div>

      {/* Header with enlarged logo */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <HobLinkLogo variant="horizontal" size="2xl" />
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
            <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-gray-700/20 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Hob in. Link up.
                </span>
                <br />
                <span className="text-gray-700 dark:text-gray-200">Let's go.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Safe, Simple Rides — Wherever You Are.<br />
                <span className="text-lg font-medium text-green-600 dark:text-green-400">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <HobLinkLogo variant="horizontal" size="lg" />
              <p className="mt-4 text-gray-400">
                Safe, Simple Rides — Wherever You Are.
              </p>
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
            <p>&copy; 2024 HobLink. All rights reserved. Built with ❤️ for rural South Africa.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes moveRight {
          0% {
            transform: translateX(-100px) translateY(-50%);
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;