import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CompassIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  ArrowRightIcon,
  CodeBracketIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const features = [
    {
      name: 'Site Analysis',
      description: 'Reverse-engineer websites and extract design patterns, components, and code structure.',
      icon: CompassIcon,
      href: '/codecompass',
      color: 'blue',
      stats: 'Analyze any website',
    },
    {
      name: 'Interview Preparation',
      description: 'Master React and Next.js with 150+ questions, coding challenges, and spaced repetition.',
      icon: AcademicCapIcon,
      href: '/interview-prep',
      color: 'green',
      stats: '150+ Questions',
    },
    {
      name: 'Developer Portfolio',
      description: 'Professional portfolio showcasing projects, skills, and development journey.',
      icon: BriefcaseIcon,
      href: '/portfolio',
      color: 'purple',
      stats: 'Live Projects',
    },
  ];

  const benefits = [
    {
      icon: CodeBracketIcon,
      title: 'Learn by Doing',
      description: 'Hands-on experience with real websites and coding challenges.',
    },
    {
      icon: ChartBarIcon,
      title: 'Track Progress',
      description: 'Comprehensive analytics and progress tracking across all tools.',
    },
    {
      icon: UserGroupIcon,
      title: 'Interview Ready',
      description: 'Systematic preparation for React/Next.js developer interviews.',
    },
  ];

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center">
            <CompassIcon className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-400 mb-8" />
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Navigate Your Way to
              <span className="text-blue-600 dark:text-blue-400"> Full-Stack Mastery</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              A unified platform combining site analysis, interview preparation, and portfolio showcase. 
              Master React, Next.js, and full-stack development through hands-on learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/codecompass"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Analyzing Sites
              </Link>
              <Link
                to="/interview-prep"
                className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 transition-colors"
              >
                Prepare for Interviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Three Powerful Tools, One Platform
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need for modern web development in one integrated platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.name}
                  to={feature.href}
                  className="group relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900 mb-4`}>
                    <Icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium text-${feature.color}-600 dark:text-${feature.color}-400`}>
                      {feature.stats}
                    </span>
                    <ArrowRightIcon className={`h-4 w-4 text-${feature.color}-600 dark:text-${feature.color}-400 group-hover:translate-x-1 transition-transform`} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why CodeCompass?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Accelerate your development journey with integrated learning tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Level Up Your Development Skills?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers who are mastering full-stack development with CodeCompass.
            </p>
            <Link
              to="/dashboard"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
