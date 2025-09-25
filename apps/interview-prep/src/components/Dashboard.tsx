import React from 'react';
import { Link } from 'react-router-dom';
import { UserStats } from '../types';
import { questionsData } from '../data/questions';

interface DashboardProps {
  completedQuestions: Set<string>;
  bookmarkedQuestions: Set<string>;
  studyStats: UserStats;
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  completedQuestions,
  bookmarkedQuestions,
  studyStats,
  onSectionChange
}) => {
  const totalQuestions = questionsData.allQuestions.length;
  const completionPercentage = totalQuestions > 0 ? (completedQuestions.size / totalQuestions) * 100 : 0;

  const quickStats = [
    {
      label: 'Questions Completed',
      value: completedQuestions.size,
      total: totalQuestions,
      color: 'bg-green-500',
      icon: '✅'
    },
    {
      label: 'Bookmarked',
      value: bookmarkedQuestions.size,
      total: null,
      color: 'bg-yellow-500',
      icon: '⭐'
    },
    {
      label: 'Study Streak',
      value: studyStats.currentStreak,
      total: null,
      color: 'bg-blue-500',
      icon: '🔥',
      unit: 'days'
    },
    {
      label: 'Total Sessions',
      value: studyStats.totalSessions,
      total: null,
      color: 'bg-purple-500',
      icon: '📊'
    }
  ];

  const studySections = [
    {
      title: 'Top 20 Questions',
      description: 'Most frequently asked React interview questions',
      icon: '🎯',
      route: '/top-20',
      color: 'from-blue-500 to-blue-600',
      questions: 20
    },
    {
      title: 'React Fundamentals',
      description: 'Core React concepts and principles',
      icon: '⚛️',
      route: '/section/react-fundamentals',
      color: 'from-green-500 to-green-600',
      questions: questionsData.sections.find(s => s.id === 'react-fundamentals')?.questions.length || 0
    },
    {
      title: 'React Hooks',
      description: 'Modern React with hooks and functional components',
      icon: '🎣',
      route: '/section/react-hooks',
      color: 'from-purple-500 to-purple-600',
      questions: questionsData.sections.find(s => s.id === 'react-hooks')?.questions.length || 0
    },
    {
      title: 'Coding Challenges',
      description: 'Hands-on coding exercises and challenges',
      icon: '💻',
      route: '/section/challenges',
      color: 'from-red-500 to-red-600',
      questions: questionsData.challenges.length
    },
    {
      title: 'Flashcards',
      description: 'Interactive flashcard study mode',
      icon: '🃏',
      route: '/flashcards',
      color: 'from-yellow-500 to-yellow-600',
      questions: totalQuestions
    },
    {
      title: 'Practice Mode',
      description: 'Timed practice sessions with random questions',
      icon: '⏱️',
      route: '/practice',
      color: 'from-indigo-500 to-indigo-600',
      questions: totalQuestions
    }
  ];

  const recentActivity = [
    {
      action: 'Completed',
      item: 'What is React?',
      time: '2 hours ago',
      type: 'success'
    },
    {
      action: 'Bookmarked',
      item: 'Custom Hooks',
      time: '1 day ago',
      type: 'info'
    },
    {
      action: 'Started',
      item: 'Practice Session',
      time: '2 days ago',
      type: 'primary'
    }
  ];

  return (
    <div className="dashboard p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Interview Preparation Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your progress and continue your React interview preparation journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}{stat.unit && ` ${stat.unit}`}
                  {stat.total && (
                    <span className="text-sm text-gray-500 ml-1">/ {stat.total}</span>
                  )}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
            {stat.total && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{((stat.value / stat.total) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stat.color}`}
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Overall Progress
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {completedQuestions.size} of {totalQuestions} questions completed
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {completionPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {completionPercentage < 25 && "Just getting started! Keep going! 🚀"}
          {completionPercentage >= 25 && completionPercentage < 50 && "Great progress! You're building momentum! 💪"}
          {completionPercentage >= 50 && completionPercentage < 75 && "Halfway there! You're doing amazing! 🎉"}
          {completionPercentage >= 75 && completionPercentage < 100 && "Almost done! The finish line is in sight! 🏆"}
          {completionPercentage === 100 && "Congratulations! You've completed all questions! 🎆"}
        </p>
      </div>

      {/* Study Sections */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Study Sections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studySections.map((section, index) => (
            <Link
              key={index}
              to={section.route}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 group-hover:border-blue-300 dark:group-hover:border-blue-600">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center text-white text-xl mb-4`}>
                  {section.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {section.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {section.questions} questions
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Start studying →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/practice"
              className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-3">⏱️</span>
                <span className="font-medium text-gray-900 dark:text-white">Start Practice Session</span>
              </div>
              <span className="text-blue-600 dark:text-blue-400">→</span>
            </Link>
            <Link
              to="/flashcards"
              className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-green-600 dark:text-green-400 mr-3">🃏</span>
                <span className="font-medium text-gray-900 dark:text-white">Review Flashcards</span>
              </div>
              <span className="text-green-600 dark:text-green-400">→</span>
            </Link>
            <Link
              to="/analytics"
              className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-purple-600 dark:text-purple-400 mr-3">📊</span>
                <span className="font-medium text-gray-900 dark:text-white">View Analytics</span>
              </div>
              <span className="text-purple-600 dark:text-purple-400">→</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  activity.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                  activity.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <span className="text-xs">
                    {activity.type === 'success' ? '✅' :
                     activity.type === 'info' ? '⭐' : '🚀'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/analytics" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              View all activity →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;