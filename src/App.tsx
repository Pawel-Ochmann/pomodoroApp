import { useState } from 'react';
import './App.css';
import Timer from './components/timer/Timer';
import {useJoke} from './hooks/useJoke';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const {joke, getJoke} = useJoke();

  return (
    <>
      <h1>hello</h1>
      <button onClick={()=>{localStorage.removeItem('intervals')}}>reset settings</button>
      <Timer isRunning={isRunning}/>
      <button onClick={()=>{setIsRunning(!isRunning)}}>{isRunning ? 'Pause' : 'Start'}</button>
      <img src='work.gif' alt='' />
      <img src='break.gif' alt='' />
      <button onClick={getJoke}>Get Joke</button>
      <p>{joke}</p>
    </>
  );
}

export default App;
