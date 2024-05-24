import { useState, useEffect } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';

export const useTimer = (isRunning: boolean) => {
  const [intervals] = usePersistedState<number[]>('intervals', [5, 3]);
  const [repetition, setRepetition] = useState(0);
  const [initialTime, setInitialTime] = useState(intervals[repetition]);
  const [remainingTime, setRemainingTime] = useState<number>(initialTime);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (remainingTime === 0) {
          clearInterval(interval!);
          if (repetition + 1 >= intervals.length) {
            setInitialTime(intervals[0]);
            setRemainingTime(intervals[0]);
            setRepetition(0);
          } else {
            setInitialTime(intervals[repetition + 1]);
            setRemainingTime(intervals[repetition + 1] -1);
            setRepetition((prev) => prev + 1);
          }
        } else {
          setRemainingTime((prevTime) => prevTime - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [intervals, isRunning, remainingTime, repetition]);

  const reset = () => {
    setRepetition(0);
    setInitialTime(intervals[0]);
    setRemainingTime(intervals[0]);
  };

  return { initialTime, remainingTime, reset, repetition };
};
