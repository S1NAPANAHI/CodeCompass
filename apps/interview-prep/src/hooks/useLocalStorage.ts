import { useState, useEffect } from 'react';
import { UseLocalStorageReturn } from '../types';

/**
 * Custom hook for managing localStorage with React state
 * Automatically syncs with localStorage and handles JSON serialization
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }

      // Handle Set objects specially
      if (initialValue instanceof Set) {
        const parsed = JSON.parse(item);
        return new Set(Array.isArray(parsed) ? parsed : []) as T;
      }

      // Handle regular JSON parsing
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      // Allow value to be a function for functional updates
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        // Handle Set objects specially
        if (valueToStore instanceof Set) {
          window.localStorage.setItem(key, JSON.stringify(Array.from(valueToStore)));
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          
          // Handle Set objects specially
          if (initialValue instanceof Set) {
            setStoredValue(new Set(Array.isArray(newValue) ? newValue : []) as T);
          } else {
            setStoredValue(newValue);
          }
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

/**
 * Enhanced localStorage hook with additional utilities
 */
export function useLocalStorageAdvanced<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [value, setValue] = useLocalStorage<T>(key, initialValue);

  const removeValue = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        setValue(initialValue);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return {
    value,
    setValue,
    removeValue
  };
}

/**
 * Hook for managing user preferences in localStorage
 */
export function useUserPreferences<T extends Record<string, any>>(
  defaultPreferences: T
): [T, (preferences: Partial<T>) => void, () => void] {
  const [preferences, setPreferences] = useLocalStorage<T>(
    'user-preferences',
    defaultPreferences
  );

  const updatePreferences = (newPreferences: Partial<T>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return [preferences, updatePreferences, resetPreferences];
}

/**
 * Hook for managing study session data
 */
export function useStudySession() {
  const [sessionData, setSessionData] = useLocalStorage('current-study-session', {
    startTime: null as string | null,
    questionsAnswered: 0,
    currentStreak: 0,
    sessionType: 'general' as string,
    isActive: false
  });

  const startSession = (type: string = 'general') => {
    setSessionData({
      startTime: new Date().toISOString(),
      questionsAnswered: 0,
      currentStreak: 0,
      sessionType: type,
      isActive: true
    });
  };

  const endSession = () => {
    setSessionData(prev => ({
      ...prev,
      isActive: false
    }));
  };

  const incrementQuestions = () => {
    setSessionData(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1
    }));
  };

  const updateStreak = (correct: boolean) => {
    setSessionData(prev => ({
      ...prev,
      currentStreak: correct ? prev.currentStreak + 1 : 0
    }));
  };

  const getSessionDuration = (): number => {
    if (!sessionData.startTime) return 0;
    
    const start = new Date(sessionData.startTime);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / 1000 / 60); // minutes
  };

  return {
    sessionData,
    startSession,
    endSession,
    incrementQuestions,
    updateStreak,
    getSessionDuration
  };
}

export default useLocalStorage;