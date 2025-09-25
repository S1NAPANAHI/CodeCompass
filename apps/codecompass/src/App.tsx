import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components from existing frontend
import Hero from './components/Hero';
import AnalysisResult from './components/AnalysisResult';
import UrlInput from './components/UrlInput';
import ComponentGenerator from './components/ComponentGenerator';
import ProjectManager from './components/ProjectManager';

// New components for CodeCompass app
import Dashboard from './components/Dashboard';
import SiteAnalyzer from './components/SiteAnalyzer';
import ComponentLibrary from './components/ComponentLibrary';
import LearningModules from './components/LearningModules';

// Hooks and services
import { useSiteAnalysis } from './hooks/useSiteAnalysis';
import { useGitHubIntegration } from './hooks/useGitHubIntegration';

// Types
export interface AnalysisData {
  url: string;
  title: string;
  components: ExtractedComponent[];
  styles: StyleData;
  structure: SiteStructure;
  timestamp: string;
}

export interface ExtractedComponent {
  id: string;
  name: string;
  type: 'header' | 'navigation' | 'card' | 'button' | 'form' | 'footer' | 'sidebar' | 'modal';
  html: string;
  css: string;
  description: string;
  props?: string[];
  reactCode?: string;
  tailwindClasses?: string[];
}

export interface StyleData {
  colors: {
    primary: string[];
    secondary: string[];
    neutral: string[];
  };
  typography: {
    headings: FontInfo[];
    body: FontInfo;
  };
  spacing: {
    margins: string[];
    paddings: string[];
  };
  layout: {
    grid: boolean;
    flexbox: boolean;
    responsive: boolean;
  };
}

interface FontInfo {
  family: string;
  size: string;
  weight: string;
  lineHeight: string;
}

interface SiteStructure {
  sections: SiteSection[];
  navigation: NavigationItem[];
  metadata: SiteMetadata;
}

interface SiteSection {
  id: string;
  name: string;
  type: string;
  position: number;
  elements: number;
}

interface NavigationItem {
  text: string;
  url: string;
  type: 'internal' | 'external';
}

interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  technologies: string[];
  framework?: string;
}

const CodeCompassApp: React.FC = () => {
  const [currentAnalysis, setCurrentAnalysis] = React.useState<AnalysisData | null>(null);
  const [analysisHistory, setAnalysisHistory] = React.useState<AnalysisData[]>([]);
  
  const { analyzeWebsite, loading, error } = useSiteAnalysis();
  const { saveToGitHub, createRepository } = useGitHubIntegration();

  const handleUrlSubmit = async (url: string) => {
    try {
      const analysis = await analyzeWebsite(url);
      setCurrentAnalysis(analysis);
      setAnalysisHistory(prev => [analysis, ...prev.slice(0, 9)]); // Keep last 10
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  return (
    <div className="codecompass-app min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Hero onUrlSubmit={handleUrlSubmit} />
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}
              {error && (
                <div className="max-w-4xl mx-auto px-4 py-6">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <strong>Analysis Error:</strong> {error}
                  </div>
                </div>
              )}
              {currentAnalysis && (
                <AnalysisResult 
                  analysis={currentAnalysis}
                  onSaveToGitHub={saveToGitHub}
                />
              )}
            </>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              analysisHistory={analysisHistory}
              currentAnalysis={currentAnalysis}
            />
          } 
        />
        <Route 
          path="/analyzer" 
          element={
            <SiteAnalyzer 
              onAnalysisComplete={setCurrentAnalysis}
            />
          } 
        />
        <Route 
          path="/components" 
          element={
            <ComponentLibrary 
              extractedComponents={currentAnalysis?.components || []}
            />
          } 
        />
        <Route 
          path="/generator" 
          element={
            <ComponentGenerator 
              analysis={currentAnalysis}
              onSaveToGitHub={saveToGitHub}
            />
          } 
        />
        <Route 
          path="/projects" 
          element={
            <ProjectManager 
              analysisHistory={analysisHistory}
              onCreateRepository={createRepository}
            />
          } 
        />
        <Route 
          path="/learn" 
          element={
            <LearningModules 
              currentAnalysis={currentAnalysis}
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default CodeCompassApp;