import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

// Data
import { portfolioData } from './data/portfolio';

// Styles
import './styles/globals.css';

const PortfolioApp: React.FC = () => {
  return (
    <div className="portfolio-app">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                data={portfolioData}
              />
            } 
          />
          <Route 
            path="/about" 
            element={
              <About 
                personalInfo={portfolioData.personal}
                experience={portfolioData.experience}
              />
            } 
          />
          <Route 
            path="/projects" 
            element={
              <Projects 
                projects={portfolioData.projects}
              />
            } 
          />
          <Route 
            path="/projects/:projectId" 
            element={
              <ProjectDetail 
                projects={portfolioData.projects}
              />
            } 
          />
          <Route 
            path="/skills" 
            element={
              <Skills 
                skills={portfolioData.skills}
                certifications={portfolioData.certifications}
              />
            } 
          />
          <Route 
            path="/experience" 
            element={
              <Experience 
                experience={portfolioData.experience}
                education={portfolioData.education}
              />
            } 
          />
          <Route 
            path="/contact" 
            element={
              <Contact 
                contactInfo={portfolioData.contact}
              />
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default PortfolioApp;