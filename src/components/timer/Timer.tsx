import { useState } from 'react';
import { formatTime } from '../../utils/timeFormatHadler';
import styles from './timer.module.css';
import { useTimer } from '../../hooks/useTimer';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const { initialTime, remainingTime, reset, repetition } = useTimer(isRunning);
  const progress = ((initialTime - remainingTime) / initialTime) * 100;
  const dashArray = 283;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <div className={styles.container}>
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
          />
        </svg>
        <p className={styles.timerText}>{formatTime(remainingTime)}</p>
      </div>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
        }}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={() => {
          reset();
          setIsRunning(false);
        }}
      >
        Stop
      </button>
      {isRunning && (
        <img src={repetition % 2 === 0 ? 'work.gif' : 'break.gif'} alt='' />
      )}
    </div>
  );
};

export default Timer;
