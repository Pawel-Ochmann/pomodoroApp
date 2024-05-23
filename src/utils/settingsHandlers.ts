
import React, { ChangeEvent } from 'react';

interface PomodoroProps {
  pomodoro: number;
  onPomodoroChange: (value: number) => void;
}


export  const handlePomodoroChange = (event: ChangeEvent<HTMLInputElement>) => {
    onPomodoroChange(Number(event.target.value));
  };

