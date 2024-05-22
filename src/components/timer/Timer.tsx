import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/timeFormatHadler';
import styles from './timer.module.css';

interface Props {
  initialTime: number;
  isRunning: boolean;
}

const Timer = ({ initialTime, isRunning }: Props) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
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
    }
  }, [remainingTime, isRunning, intervalId]);

  const progress = ((initialTime - remainingTime) / initialTime) * 100;
  const dashArray = 283;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <>
      <div className={styles.circularProgressBar}>
        <svg viewBox='0 0 100 100'>
          <circle
            className={styles.circleBackground}
            cx='50'
            cy='50'
            r='45'
            fill='transparent'
            stroke='#ddd'
            strokeWidth='10'
          />
          <circle
            className={styles.circleProgress}
            cx='50'
            cy='50'
            r='45'
            fill='transparent'
            stroke='#4caf50'
            strokeWidth='10'
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
      </div>
      <div>{formatTime(remainingTime)}</div>
    </>
  );
};

export default Timer;
