import { useState, useEffect } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';

interface Intervals {
  workTime: number;
  shortBreak: number;
  longBreak: number;
  repetitions: number;
}

export const useTimer = (isRunning: boolean) => {
  const intervals = usePersistedState<Intervals>('intervals', {
    workTime: 15,
    shortBreak: 3,
    longBreak: 18,
    repetitions: 8,
  }).get;
  const [repetition, setRepetition] = useState(1);
  const [initialTime, setInitialTime] = useState(intervals.workTime);
  const [remainingTime, setRemainingTime] = useState<number>(initialTime);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (remainingTime === 0 && isRunning) {
      clearInterval(intervalId!);
      setIntervalId(null);

      if (repetition === intervals.repetitions) {
        setRepetition(1);
        setInitialTime(intervals.longBreak);
        setRemainingTime(intervals.longBreak);
      } else if (repetition % intervals.repetitions === 0) {
        setRepetition(repetition + 1);
        setInitialTime(intervals.workTime);
        setRemainingTime(intervals.workTime);
      } else {
        setRepetition(repetition + 1);
        setInitialTime(intervals.shortBreak);
        setRemainingTime(intervals.shortBreak);
      }
    }
  }, [remainingTime, isRunning, intervalId, intervals, repetition]);

  return { initialTime, remainingTime };
};
