import { ChangeEvent, useState } from 'react';
import { usePersistedState } from '../../hooks/usePersistedState';
import styles from './settings.module.css';

function Settings() {
  const defaultIntervals = [1500, 300, 1500, 300, 1500, 300, 1500, 1800];
  const [intervals, setIntervals] = usePersistedState<number[]>(
    'intervals',
    defaultIntervals
  );
  const [pomodoro, setPomodoro] = useState(intervals[0]/60);
  const [breaks, setBreaks] = useState(intervals[1]/60);
  const [longBreak, setLongBreak] = useState(intervals[intervals.length - 1]/60);
  const [repetitions, setRepetitions] = useState(intervals.length / 2);

  console.log('repet', intervals);

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
      newIntervals.push(pomodoro * 60);
      newIntervals.push(breaks * 60);
    }
    newIntervals[newIntervals.length - 1] = longBreak * 60;
    console.log(newIntervals)
    setIntervals(newIntervals);
  };

  const resetHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIntervals(defaultIntervals);
    setPomodoro(intervals[0] / 60);
    setBreaks(intervals[1] / 60);
    setLongBreak(intervals[intervals.length - 1] / 60);
    setRepetitions(intervals.length / 2);
  };

  return (
    <div className={styles.container}>
      <form action=''>
        <label htmlFor=''>
          Work time {pomodoro}:
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
          Break time:{breaks}
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
          Long break time {longBreak}:
          <input
            type='range'
            min={breaks}
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
            step={1}
            min='1'
            max='9'
            pattern='[1-9]*'
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
