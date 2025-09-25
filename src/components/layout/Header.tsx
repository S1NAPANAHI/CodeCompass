import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

// Icons (you can replace with your preferred icon library)
import { 
  Bars3Icon, 
  CompassIcon, 
  UserCircleIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  HomeIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

// Hooks
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, user }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'CodeCompass', href: '/codecompass', icon: CompassIcon },
    { name: 'Portfolio', href: '/portfolio', icon: BriefcaseIcon },
    { name: 'Interview Prep', href: '/interview-prep', icon: AcademicCapIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <CompassIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CodeCompass
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.href)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* User menu */}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
