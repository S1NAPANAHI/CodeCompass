import { useState, useEffect } from 'react';
import { StudyProgress, UseProgressReturn } from '../types';
import { supabase } from '../../../../packages/database/src/supabase';

export const useProgress = (userId: string | null): UseProgressReturn => {
  const [progress, setProgress] = useState<StudyProgress[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's progress from Supabase
  const fetchProgress = async () => {
    if (!userId) {
      setProgress([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('user_flashcard_progress')
        .select('*')
        .eq('user_id', userId);

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match our StudyProgress interface
      const transformedProgress: StudyProgress[] = (data || []).map(item => ({
        questionId: item.question_id,
        completed: item.confidence_level > 0,
        confidenceLevel: item.confidence_level,
        lastReviewedAt: item.last_reviewed_at,
        reviewCount: item.review_count,
        nextReviewAt: item.next_review_at
      }));

      setProgress(transformedProgress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
      console.error('Error fetching progress:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update progress for a specific question
  const updateProgress = async (
    questionId: string, 
    completed: boolean, 
    confidence: number = 1
  ): Promise<void> => {
    if (!userId) {
      console.warn('Cannot update progress: User not logged in');
      return;
    }

    try {
      const now = new Date().toISOString();
      
      // Check if progress entry already exists
      const { data: existing } = await supabase
        .from('user_flashcard_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('question_id', questionId)
        .single();

      if (existing) {
        // Update existing progress
        const { error: updateError } = await supabase
          .from('user_flashcard_progress')
          .update({
            confidence_level: completed ? confidence : 0,
            last_reviewed_at: now,
            review_count: existing.review_count + 1,
            next_review_at: calculateNextReview(confidence, existing.review_count + 1)
          })
          .eq('id', existing.id);

        if (updateError) {
          throw updateError;
        }
      } else {
        // Create new progress entry
        const { error: insertError } = await supabase
          .from('user_flashcard_progress')
          .insert({
            user_id: userId,
            question_id: questionId,
            confidence_level: completed ? confidence : 0,
            last_reviewed_at: now,
            review_count: 1,
            next_review_at: calculateNextReview(confidence, 1)
          });

        if (insertError) {
          throw insertError;
        }
      }

      // Refresh progress data
      await fetchProgress();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      console.error('Error updating progress:', err);
    }
  };

  // Calculate next review date based on spaced repetition algorithm (simplified SM-2)
  const calculateNextReview = (confidence: number, reviewCount: number): string => {
    // Simple spaced repetition: confidence affects interval
    const baseIntervals = [1, 3, 7, 14, 30]; // days
    const intervalIndex = Math.min(reviewCount - 1, baseIntervals.length - 1);
    let interval = baseIntervals[intervalIndex];
    
    // Adjust based on confidence (1-5 scale)
    if (confidence >= 4) {
      interval *= 1.5; // Increase interval for high confidence
    } else if (confidence <= 2) {
      interval *= 0.5; // Decrease interval for low confidence
    }
    
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + Math.round(interval));
    
    return nextReview.toISOString();
  };

  // Load progress when userId changes
  useEffect(() => {
    fetchProgress();
  }, [userId]);

  // Set up real-time subscription for progress updates
  useEffect(() => {
    if (!userId) return;

    const subscription = supabase
      .channel('progress_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_flashcard_progress',
          filter: `user_id=eq.${userId}`
        },
        () => {
          // Refresh progress when changes occur
          fetchProgress();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  return {
    progress,
    updateProgress,
    loading,
    error
  };
};

export default useProgress;