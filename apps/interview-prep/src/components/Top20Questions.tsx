import React, { useState, useMemo } from 'react';
import { top20Questions } from '../data/questions';
import { TopQuestion } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../packages/ui/src/Card';
import { Button } from '../../../../packages/ui/src/Button';

interface Top20QuestionsProps {
  completedQuestions: Set<string>;
  bookmarkedQuestions: Set<string>;
  onQuestionComplete: (questionId: string) => void;
  onBookmarkToggle: (questionId: string) => void;
}

const Top20Questions: React.FC<Top20QuestionsProps> = ({
  completedQuestions,
  bookmarkedQuestions,
  onQuestionComplete,
  onBookmarkToggle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  // Filter questions based on search and filters
  const filteredQuestions = useMemo(() => {
    return top20Questions.filter(question => {
      const matchesSearch = !searchQuery || 
        question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.keyPoints.some(point => point.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = !selectedDifficulty || question.difficulty === selectedDifficulty;
      const matchesCategory = !selectedCategory || question.category === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory]);

  const categories = [...new Set(top20Questions.map(q => q.category))];
  const difficulties = [...new Set(top20Questions.map(q => q.difficulty))];

  const toggleExpanded = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 Top 20 React Interview Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Master the most frequently asked React interview questions with detailed explanations and code examples.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions, answers, or key points..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Showing {filteredQuestions.length} of {top20Questions.length} questions</span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => {
          const isCompleted = completedQuestions.has(question.id);
          const isBookmarked = bookmarkedQuestions.has(question.id);
          const isExpanded = expandedQuestions.has(question.id);
          
          return (
            <Card key={question.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle 
                        className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => toggleExpanded(question.id)}
                      >
                        {question.question}
                      </CardTitle>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          question.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          question.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {question.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          🏆 {question.importance} Priority
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          📊 {question.frequency}% frequency
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBookmarkToggle(question.id)}
                      className={isBookmarked ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-500'}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                    >
                      {isBookmarked ? '⭐' : '☆'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(`${question.question}\n\n${question.answer}`)}
                      title="Copy question and answer"
                    >
                      📋
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onQuestionComplete(question.id)}
                      className={isCompleted ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-green-500'}
                      title={isCompleted ? 'Mark incomplete' : 'Mark completed'}
                    >
                      {isCompleted ? '✅' : '⭕'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpanded(question.id)}
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? '🔼' : '🔽'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  {/* Answer */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Answer:
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {question.answer}
                    </p>
                  </div>
                  
                  {/* Key Points */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Key Points:
                    </h4>
                    <ul className="space-y-1">
                      {question.keyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-blue-500 mr-2 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Code Example */}
                  {question.codeExample && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-t-md">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          Code Example:
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(question.codeExample || '')}
                          className="text-xs"
                        >
                          Copy 📋
                        </Button>
                      </div>
                      <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-b-md p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                          {question.codeExample}
                        </code>
                      </pre>
                    </div>
                  )}
                  
                  {/* Follow-up Questions */}
                  {question.followUpQuestions && question.followUpQuestions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Follow-up Questions:
                      </h4>
                      <ul className="space-y-1">
                        {question.followUpQuestions.map((followUp, followUpIndex) => (
                          <li key={followUpIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <span className="text-purple-500 mr-2 font-bold">•</span>
                            <span>{followUp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Companies and Metadata */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs">
                    {question.companies && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Asked by:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                          {question.companies.join(', ')}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Frequency:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {question.frequency}% of interviews
                      </span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredQuestions.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('');
                setSelectedCategory('');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completedQuestions.size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {bookmarkedQuestions.size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Bookmarked</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredQuestions.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Showing</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round((completedQuestions.size / top20Questions.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Top20Questions;