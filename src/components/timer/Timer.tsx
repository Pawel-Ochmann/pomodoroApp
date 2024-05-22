import { formatTime } from '../../utils/timeFormatHadler';
import styles from './timer.module.css';
import { useTimer } from '../../hooks/useTimer';

interface Props {
  isRunning: boolean;
}

const Timer = ({ isRunning }: Props) => {
  const { initialTime, remainingTime } = useTimer(isRunning);
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