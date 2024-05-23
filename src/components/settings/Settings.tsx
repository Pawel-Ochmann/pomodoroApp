import { usePersistedState } from '../../hooks/usePersistedState';
import styles from './settings.module.css';

function Settings() {
  const [intervals, setIntervals] = usePersistedState<number[]>('intervals', [5, 3]);

  return (
    <div className={styles.container}>
      <form action=''>
        <label htmlFor=''>
          Work time:{' '}
          <input type='range' min='1' max='100' value={intervals[0]} />
        </label>
        <label htmlFor=''>
          Break time:{' '}
          <input type='range' min='1' max='100' value={intervals[1]} />
        </label>
        <label htmlFor=''>
          Long break time:{' '}
          <input
            type='range'
            min='1'
            max='100'
            value={intervals[intervals.length - 1]}
          />
        </label>
        <label htmlFor=''>
          Long break after{' '}
          <input type='number' min='1' max='10' value={intervals.length / 2} />{' '}
          intervals.
        </label>
      </form>
      <button
        onClick={() => {
          localStorage.removeItem('intervals');
        }}
      >
        reset settings
      </button>
    </div>
  );
}

export default Settings;
