import { useEffect, useState } from 'react';
import { formatTime } from '../../utils/timeFormatHadler';
import styles from './timer.module.css';
import { useTimer } from '../../hooks/useTimer';
import { getJoke } from '../../utils/getJoke';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';



const Timer = () => {
  const [joke, setJoke] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const { initialTime, remainingTime, reset, repetition } = useTimer(isRunning);
  const progress = ((initialTime - remainingTime) / initialTime) * 100;
  const dashArray = 283;
  const dashOffset = dashArray - (dashArray * progress) / 100;

   

  useEffect(() => {
    const fetchJoke = async () => {
      if (repetition % 2 !== 0) {
        const newJoke = await getJoke();
        if (newJoke) {
          setJoke(newJoke);
        }
      }
      else {
         setJoke('');
      }
    };

    fetchJoke();
  }, [repetition]);

  const resetHandler = () => {
    const shouldReset = window.confirm(
      'Are you sure you want to quit the process?'
    );

    if (shouldReset) {
      reset();
      setIsRunning(false);
      const audio = new Audio('./audio/bonus.mp3');
      audio.play();
    }
  };

  return (
    <div className={styles.container}>
      <dialog className={styles.joke} open={joke !== ''}>
        <button
          onClick={() => {
            setJoke('');
          }}
        >
          X
        </button>
        <p>Time for a break, grab a joke as a reward: </p>
        <p className={styles.jokeContent}>{joke}</p>
      </dialog>
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
        {isRunning && (
          <img
            className={styles.gif}
            src={repetition % 2 === 0 ? 'work.gif' : 'break.gif'}
            alt=''
          />
        )}
        {(!isRunning && (remainingTime !== initialTime)) && <FontAwesomeIcon icon={faPause} className={styles.pauseIcon}/>}
      </div>
      <h1 className={styles.timerText}>{formatTime(remainingTime)}</h1>
      <div className={styles.buttonsContainer}>
        <button
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetHandler}>Stop</button>
      </div>
    </div>
  );
};

export default Timer;
