import React, { useState, useEffect, useCallback } from 'react';
import { questionsData } from '../data/questions';
import { Question } from '../types';
import { Card, CardContent } from '../../../../packages/ui/src/Card';
import { Button } from '../../../../packages/ui/src/Button';

interface FlashcardViewerProps {
  questionsData: typeof questionsData;
  completedQuestions: Set<string>;
  onQuestionComplete: (questionId: string) => void;
  onUpdateStats: (sessionTime: number) => void;
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  questionsData,
  completedQuestions,
  onQuestionComplete,
  onUpdateStats
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showConfidence, setShowConfidence] = useState(false);

  // Get all questions or filter by category
  const availableQuestions = selectedCategory === 'all' 
    ? questionsData.allQuestions
    : questionsData.allQuestions.filter(q => q.category === selectedCategory);

  const currentQuestion = availableQuestions[currentQuestionIndex];

  // Categories for filter
  const categories = ['all', ...questionsData.categories];

  // Navigation functions
  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => (prev + 1) % availableQuestions.length);
    setIsFlipped(false);
    setShowConfidence(false);
  }, [availableQuestions.length]);

  const prevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => 
      prev === 0 ? availableQuestions.length - 1 : prev - 1
    );
    setIsFlipped(false);
    setShowConfidence(false);
  }, [availableQuestions.length]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setShowConfidence(true);
    }
  };

  const handleConfidenceRating = (rating: number) => {
    if (!currentQuestion) return;
    
    // Update completion status based on confidence
    if (rating >= 3 && !completedQuestions.has(currentQuestion.id)) {
      onQuestionComplete(currentQuestion.id);
    }
    
    setQuestionsAnswered(prev => prev + 1);
    
    // Update streak
    if (rating >= 3) {
      setCurrentStreak(prev => prev + 1);
    } else {
      setCurrentStreak(0);
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  const getSessionTime = () => {
    return Math.floor((Date.now() - sessionStartTime) / 1000 / 60); // minutes
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') prevQuestion();
      if (e.key === 'ArrowRight' || e.key === 'd') nextQuestion();
      if (e.key === ' ' || e.key === 'f') {
        e.preventDefault();
        flipCard();
      }
      if (e.key >= '1' && e.key <= '5' && showConfidence) {
        handleConfidenceRating(parseInt(e.key));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevQuestion, nextQuestion, showConfidence]);

  // Update session stats on unmount
  useEffect(() => {
    return () => {
      onUpdateStats(getSessionTime());
    };
  }, [onUpdateStats]);

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-4xl mb-4">🃏</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No questions available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category or add some questions to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completionPercentage = Math.round((questionsAnswered / availableQuestions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🃏 Flashcard Study Mode
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span>🏆 Streak: <strong className="text-yellow-600 dark:text-yellow-400">{currentStreak}</strong></span>
          <span>✅ Answered: <strong className="text-green-600 dark:text-green-400">{questionsAnswered}</strong></span>
          <span>⏱️ Time: <strong className="text-blue-600 dark:text-blue-400">{getSessionTime()}m</strong></span>
          <span>📊 Progress: <strong className="text-purple-600 dark:text-purple-400">{completionPercentage}%</strong></span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentQuestionIndex(0);
            setIsFlipped(false);
            setShowConfidence(false);
          }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Question {currentQuestionIndex + 1} of {availableQuestions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / availableQuestions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / availableQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''} cursor-pointer`}
          onClick={flipCard}
        >
          <div className="flashcard-inner">
            {/* Front - Question */}
            <div className="flashcard-front">
              <div className="text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  currentQuestion.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  currentQuestion.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {currentQuestion.difficulty} • {currentQuestion.category}
                </div>
                <h2 className="flashcard-question text-xl">
                  {currentQuestion.question}
                </h2>
                <div className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
                  Click to reveal answer or press Space 🔄
                </div>
              </div>
            </div>

            {/* Back - Answer */}
            <div className="flashcard-back">
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                    {currentQuestion.category} • {currentQuestion.difficulty}
                  </div>
                  <div className="flashcard-answer mb-6">
                    <p className="leading-relaxed">{currentQuestion.answer}</p>
                  </div>
                  
                  {/* Key Points */}
                  {currentQuestion.keyPoints && currentQuestion.keyPoints.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                        Key Points:
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {currentQuestion.keyPoints.slice(0, 3).map((point, index) => (
                          <li key={index} className="flex items-start text-gray-600 dark:text-gray-400">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {showConfidence && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        How confident are you with this answer?
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        This affects when you'll see this question again
                      </div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          variant={rating <= 2 ? 'destructive' : rating <= 3 ? 'warning' : 'success'}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfidenceRating(rating);
                          }}
                          className="min-w-[2.5rem]"
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                      1=Hard • 3=OK • 5=Easy | Use keys 1-5
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant="outline"
          onClick={prevQuestion}
          leftIcon="←"
        >
          Previous
        </Button>
        
        <Button
          variant={isFlipped ? 'secondary' : 'default'}
          onClick={flipCard}
        >
          {isFlipped ? '🔄 Show Question' : '🔍 Reveal Answer'}
        </Button>
        
        <Button
          variant="outline"
          onClick={nextQuestion}
          rightIcon="→"
        >
          Next
        </Button>
      </div>

      {/* Keyboard Shortcuts Help */}
      <Card variant="outlined" className="bg-gray-50 dark:bg-gray-800/50">
        <CardContent className="py-4">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">Keyboard Shortcuts:</strong>
            <span className="mx-4">Space/F = Flip</span>
            <span className="mx-4">A/← = Previous</span>
            <span className="mx-4">D/→ = Next</span>
            <span className="mx-4">1-5 = Rate Confidence</span>
          </div>
        </CardContent>
      </Card>

      {/* Session Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding="sm" className="text-center">
          <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
            🏆 {currentStreak}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
        </Card>
        
        <Card padding="sm" className="text-center">
          <div className="text-xl font-bold text-green-600 dark:text-green-400">
            ✅ {questionsAnswered}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Questions Rated</div>
        </Card>
        
        <Card padding="sm" className="text-center">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ⏱️ {getSessionTime()}m
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Session Time</div>
        </Card>
        
        <Card padding="sm" className="text-center">
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
            📊 {completionPercentage}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Overall Progress</div>
        </Card>
      </div>
    </div>
  );
};

export default FlashcardViewer;