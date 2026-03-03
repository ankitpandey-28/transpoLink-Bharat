import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { 
  Truck, 
  Menu, 
  X, 
  User, 
  Package, 
  Phone, 
  ChevronDown,
  LogOut,
  Globe,
  Home,
  ShoppingBag,
  Upload,
  List,
  Calendar,
  Mail
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userType, user, logout, toggleLanguage, language, t } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items - Role-based navigation
  const getNavItems = () => {
    if (!isAuthenticated) {
      // Not logged in - show all options
      return [
        { name: t('home'), path: '/', icon: <Home className="w-4 h-4" /> },
        { name: t('trucks'), path: '/trucks', icon: <Truck className="w-4 h-4" /> },
        { name: t('goods'), path: '/goods', icon: <ShoppingBag className="w-4 h-4" /> },
        { name: t('postGoods'), path: '/post-goods', icon: <Upload className="w-4 h-4" /> },
        { name: t('postTruck'), path: '/post-truck', icon: <Truck className="w-4 h-4" /> },
        { name: t('contact'), path: '/contact', icon: <Phone className="w-4 h-4" /> },
      ];
    }
    
    if (userType === 'truck_driver') {
      // Driver menu
      return [
        { name: t('home'), path: '/', icon: <Home className="w-4 h-4" /> },
        { name: t('goods'), path: '/goods', icon: <ShoppingBag className="w-4 h-4" /> },
        { name: t('postTruck'), path: '/post-truck', icon: <Upload className="w-4 h-4" /> },
        { name: 'Bookings', path: '/bookings', icon: <Calendar className="w-4 h-4" /> },
        { name: 'My Listings', path: '/my-listings', icon: <List className="w-4 h-4" /> },
        { name: t('contact'), path: '/contact', icon: <Phone className="w-4 h-4" /> },
      ];
    } else {
      // Businessman menu
      return [
        { name: t('home'), path: '/', icon: <Home className="w-4 h-4" /> },
        { name: t('trucks'), path: '/trucks', icon: <Truck className="w-4 h-4" /> },
        { name: t('postGoods'), path: '/post-goods', icon: <Upload className="w-4 h-4" /> },
        { name: 'Bookings', path: '/bookings', icon: <Calendar className="w-4 h-4" /> },
        { name: 'My Listings', path: '/my-listings', icon: <List className="w-4 h-4" /> },
        { name: t('contact'), path: '/contact', icon: <Phone className="w-4 h-4" /> },
      ];
    }
  };

  const navItems = getNavItems();

  const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white/90 backdrop-blur-sm'
      }`
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand - Modern Professional */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-primary-green-light rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-neutral-text font-display tracking-tight">
                TranspoLink
              </span>
              <span className="text-sm text-accent-amber font-semibold -mt-1">
                Bharat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Modern with hover effects */}
          <div className="hidden xl:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative"
              >
                <div className={
                  `flex items-center space-x-2 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
                  ${location.pathname === item.path
                    ? 'text-primary-green bg-primary-green/10'
                    : 'text-neutral-text hover:text-primary-green hover:bg-neutral-bg-dark'
                  }`
                }>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Medium Navigation - Tablet view */}
          <div className="hidden lg:flex xl:hidden items-center space-x-1">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  `flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === item.path
                    ? 'text-primary-green bg-primary-green/5'
                    : 'text-neutral-text hover:text-primary-green hover:bg-neutral-bg-dark'
                  }`
                }
              >
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Language Toggle & Profile - Modern design */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle with Globe Icon */}
            <button
              onClick={toggleLanguage}
              className={
                `flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105
                ${language === 'en' 
                  ? 'bg-accent-amber/10 text-accent-amber-dark hover:bg-accent-amber/20'
                  : 'bg-primary-green/10 text-primary-green hover:bg-primary-green/20'
                }`
              }
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
            {/* Profile Dropdown - Modern */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-neutral-bg-dark transition-all duration-200 group"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-primary-green to-primary-green-light rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                  <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-text-light group-hover:text-neutral-text transition-colors" />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-soft-lg border border-neutral-border py-2 z-50 overflow-hidden"
                  >
                    {isAuthenticated ? (
                      <>
                        {/* User Info Section - Static (No Click) */}
                        <div className={`px-4 py-4 border-b border-neutral-border ${
                          userType === 'truck_driver' 
                            ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
                            : 'bg-gradient-to-br from-green-50 to-green-100'
                        }`}>
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                              userType === 'truck_driver' 
                                ? 'bg-blue-500' 
                                : 'bg-green-600'
                            }`}>
                              {userType === 'truck_driver' ? (
                                <Truck className="w-6 h-6 text-white" />
                              ) : (
                                <Package className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-neutral-text">
                                {user?.name || 'User'}
                              </p>
                              <p className="text-xs text-neutral-text-light">
                                {userType === 'truck_driver' ? 'Truck Driver' : 'Business Owner'}
                              </p>
                            </div>
                          </div>
                          
                          {/* User Details */}
                          <div className="space-y-1.5 text-xs">
                            {user?.email && (
                              <div className="flex items-center space-x-2 text-neutral-text-light">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{user.email}</span>
                              </div>
                            )}
                            {user?.phone && (
                              <div className="flex items-center space-x-2 text-neutral-text-light">
                                <Phone className="w-3 h-3" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-neutral-text hover:bg-red-50 hover:text-red-600 flex items-center space-x-3 transition-all duration-150 font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate('/login');
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-neutral-text hover:bg-primary-green/5 hover:text-primary-green flex items-center space-x-3 transition-all duration-150 font-medium"
                        >
                          <User className="w-4 h-4" />
                          <span>{t('signInButtonNavbar')}</span>
                        </button>
                        <div className="h-px bg-neutral-border my-1" />
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate('/signup');
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-white bg-gradient-to-r from-primary-green to-primary-green-light hover:from-primary-green-light hover:to-primary-green flex items-center space-x-3 transition-all duration-150 font-medium rounded-lg mx-2 my-1"
                        >
                          <User className="w-4 h-4" />
                          <span>{t('signUpButtonNavbar')}</span>
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Hamburger Menu - Modern */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-neutral-bg-dark transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-neutral-text" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-text" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Modern slide-down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden bg-white/95 backdrop-blur-md border-t border-neutral-border shadow-soft"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={
                    `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                    ${location.pathname === item.path
                      ? 'text-primary-green bg-primary-green/10 border-l-4 border-primary-green'
                      : 'text-neutral-text hover:text-primary-green hover:bg-neutral-bg-dark hover:translate-x-1'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
