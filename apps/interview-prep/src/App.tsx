import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../../src/contexts/AuthContext';

// Components
import Dashboard from './components/Dashboard';
import QuestionViewer from './components/QuestionViewer';
import FlashcardViewer from './components/FlashcardViewer';
import PracticeMode from './components/PracticeMode';
import StudyRoadmap from './components/StudyRoadmap';
import Analytics from './components/Analytics';
import Top20Questions from './components/Top20Questions';

// Data
import { questionsData } from './data/questions';
import { Question, StudyProgress, UserStats } from './types';

// Hooks
import { useProgress } from './hooks/useProgress';
import { useLocalStorage } from './hooks/useLocalStorage';

// Styles
import './styles/globals.css';

const InterviewPrepApp: React.FC = () => {
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [completedQuestions, setCompletedQuestions] = useLocalStorage<Set<string>>('completed-questions', new Set());
  const [bookmarkedQuestions, setBookmarkedQuestions] = useLocalStorage<Set<string>>('bookmarked-questions', new Set());
  const [studyStats, setStudyStats] = useLocalStorage<UserStats>('study-stats', {
    totalStudyTime: 0,
    questionsCompleted: 0,
    currentStreak: 0,
    totalSessions: 0,
    lastStudyDate: null
  });

  // Custom hook for progress tracking with Supabase
  const { progress, updateProgress } = useProgress(user?.id || null);

  const handleQuestionComplete = (questionId: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(questionId)) {
      newCompleted.delete(questionId);
    } else {
      newCompleted.add(questionId);
    }
    setCompletedQuestions(newCompleted);
    
    // Update progress in Supabase if user is logged in
    if (user) {
      updateProgress(questionId, !newCompleted.has(questionId));
    }
  };

  const handleBookmarkToggle = (questionId: string) => {
    const newBookmarked = new Set(bookmarkedQuestions);
    if (newBookmarked.has(questionId)) {
      newBookmarked.delete(questionId);
    } else {
      newBookmarked.add(questionId);
    }
    setBookmarkedQuestions(newBookmarked);
  };

  const updateStudyStats = (sessionTime: number) => {
    setStudyStats(prev => ({
      ...prev,
      totalStudyTime: prev.totalStudyTime + sessionTime,
      totalSessions: prev.totalSessions + 1,
      lastStudyDate: new Date().toISOString()
    }));
  };

  return (
    <div className="interview-prep-app">
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                completedQuestions={completedQuestions}
                bookmarkedQuestions={bookmarkedQuestions}
                studyStats={studyStats}
                onSectionChange={setSelectedSection}
              />
            } 
          />
          <Route 
            path="/top-20" 
            element={
              <Top20Questions 
                completedQuestions={completedQuestions}
                bookmarkedQuestions={bookmarkedQuestions}
                onQuestionComplete={handleQuestionComplete}
                onBookmarkToggle={handleBookmarkToggle}
              />
            } 
          />
          <Route 
            path="/section/:sectionId" 
            element={
              <QuestionViewer 
                questionsData={questionsData}
                completedQuestions={completedQuestions}
                bookmarkedQuestions={bookmarkedQuestions}
                onQuestionComplete={handleQuestionComplete}
                onBookmarkToggle={handleBookmarkToggle}
              />
            } 
          />
          <Route 
            path="/flashcards" 
            element={
              <FlashcardViewer 
                questionsData={questionsData}
                completedQuestions={completedQuestions}
                onQuestionComplete={handleQuestionComplete}
                onUpdateStats={updateStudyStats}
              />
            } 
          />
          <Route 
            path="/practice" 
            element={
              <PracticeMode 
                questionsData={questionsData}
                onQuestionComplete={handleQuestionComplete}
                onUpdateStats={updateStudyStats}
              />
            } 
          />
          <Route 
            path="/roadmap" 
            element={
              <StudyRoadmap 
                completedQuestions={completedQuestions}
                studyStats={studyStats}
              />
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <Analytics 
                completedQuestions={completedQuestions}
                studyStats={studyStats}
                progress={progress}
              />
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default InterviewPrepApp;