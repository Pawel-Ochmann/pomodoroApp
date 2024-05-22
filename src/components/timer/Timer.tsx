import { useState, useEffect } from 'react';
import {formatTime} from '../../utils/timeFormatHadler'

interface Props {
  initialTime: number;
  isRunning:boolean
}

const Timer = ({ initialTime, isRunning }: Props) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);



  return <div>{formatTime(remainingTime)}</div>;
};
export default Timer;
