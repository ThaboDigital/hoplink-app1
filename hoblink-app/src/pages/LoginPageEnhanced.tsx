import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HobLinkLogo from '../components/HobLinkLogo';
import ThemeToggle from '../components/ThemeToggle';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'driver'>('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { signIn, signInWithGoogle, signInWithFacebook } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Trigger animations on load
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get the intended destination from the location state, default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err.message.includes('Redirect')) {
        setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithFacebook();
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err.message.includes('Redirect')) {
        setError(err.message || 'Failed to sign in with Facebook');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header with Return to Home */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <span className="text-lg">🏠</span>
              </div>
              <span className="font-medium">Return to Home</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-blue-200 rounded-full animate-bounce"></div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-4 sm:p-6">
        <div className={`w-full max-w-md mx-auto transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Glassmorphism Login Card */}
          <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
            {/* Logo */}
            <div className="text-center mb-8">
              <HobLinkLogo variant="vertical" size="2xl" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-4 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to continue your journey
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 backdrop-blur-md bg-red-100/50 dark:bg-red-900/30 border border-red-200/30 dark:border-red-700/30 rounded-2xl">
                <p className="text-red-700 dark:text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* User Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  I am a:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('user')}
                    className={`px-4 py-3 rounded-2xl border transition-all duration-300 ${
                      userType === 'user'
                        ? 'bg-green-500 text-white border-green-500 shadow-lg'
                        : 'backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40'
                    }`}
                  >
                    🙋‍♂️ Passenger
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('driver')}
                    className={`px-4 py-3 rounded-2xl border transition-all duration-300 ${
                      userType === 'driver'
                        ? 'bg-green-500 text-white border-green-500 shadow-lg'
                        : 'backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/30 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-800/40'
                    }`}
                  >
                    🚗 Driver
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300/30 dark:border-gray-600/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded-full">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Sign In Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="px-4 py-3 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300"
                >
                  <span>🟦</span>
                  <span className="text-sm">Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  disabled={loading}
                  className="px-4 py-3 backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300"
                >
                  <span>📘</span>
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Forgot Password Link */}
            <div className="mt-4 text-center">
              <Link 
                to="/forgot-password" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;