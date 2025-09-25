import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// App Components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CodeCompassApp from '../apps/codecompass/src/App';
import PortfolioApp from '../apps/portfolio/src/App';
import InterviewPrepApp from '../apps/interview-prep/src/App';

// Auth Components
import AuthModal from './components/auth/AuthModal';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Styles
import './styles/globals.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              user={user}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <Header 
                onMenuClick={() => setSidebarOpen(true)}
                user={user}
              />

              {/* Main Content Area */}
              <main className="flex-1 overflow-auto">
                <Routes>
                  {/* Home & Dashboard */}
                  <Route path="/" element={<Home />} />
                  <Route 
                    path="/dashboard" 
                    element={user ? <Dashboard /> : <Navigate to="/" />} 
                  />

                  {/* CodeCompass - Site Analysis */}
                  <Route path="/codecompass/*" element={<CodeCompassApp />} />

                  {/* Portfolio */}
                  <Route path="/portfolio/*" element={<PortfolioApp />} />

                  {/* Interview Prep */}
                  <Route path="/interview-prep/*" element={<InterviewPrepApp />} />

                  {/* Catch all - redirect to home */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>

            {/* Auth Modal */}
            {!user && <AuthModal />}
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
