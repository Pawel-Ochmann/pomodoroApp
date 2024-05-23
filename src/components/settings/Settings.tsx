import { ChangeEvent, useState } from 'react';
import { usePersistedState } from '../../hooks/usePersistedState';
import styles from './settings.module.css';

function Settings() {
  const [intervals, setIntervals] = usePersistedState<number[]>(
    'intervals',
    [5, 3]
  );
  const [pomodoro, setPomodoro] = useState(intervals[0]);
  const [breaks, setBreaks] = useState(intervals[1]);
  const [longBreak, setLongBreak] = useState(intervals[intervals.length - 1]);
  const [repetitions, setRepetitions] = useState(intervals.length / 2);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter(+e.target.value);
  };

  const saveHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const newIntervals = [];
    for (let i = repetitions; i > 0; i--) {
      newIntervals.push(pomodoro);
      newIntervals.push(breaks);
    }
    newIntervals[newIntervals.length - 1] = longBreak;
    setIntervals(newIntervals);
  };

  const resetHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIntervals([5, 3]);
  };

  return (
    <div className={styles.container}>
      <form action=''>
        <label htmlFor=''>
          Work time:
          <input
            type='range'
            min='1'
            max='100'
            value={pomodoro}
            onChange={(e) => {
              changeHandler(e, setPomodoro);
            }}
          />
        </label>
        <label htmlFor=''>
          Break time:{' '}
          <input
            type='range'
            min='1'
            max='100'
            value={breaks}
            onChange={(e) => {
              changeHandler(e, setBreaks);
            }}
          />
        </label>
        <label htmlFor=''>
          Long break time:
          <input
            type='range'
            min='1'
            max='100'
            value={longBreak}
            onChange={(e) => {
              changeHandler(e, setLongBreak);
            }}
          />
        </label>
        <label htmlFor=''>
          Long break after:
          <input
            type='number'
            min='1'
            max='10'
            value={repetitions}
            onChange={(e) => {
              changeHandler(e, setRepetitions);
            }}
          />
          intervals.
        </label>
        <button onClick={saveHandler}>Save</button>
        <button onClick={resetHandler}>reset settings</button>
      </form>
    </div>
  );
}

export default Settings;
