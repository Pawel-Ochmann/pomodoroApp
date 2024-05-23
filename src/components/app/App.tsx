import { useState } from 'react';
import Timer from '../../components/timer/Timer';
import {useJoke} from '../../hooks/useJoke';
import Settings from '../../components/settings/Settings'
import styles from './app.module.css';
import classNames from 'classnames';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const {joke, getJoke} = useJoke();
  const [settingsOpen, setSettingsOpen] = useState(false);


  const classes = {
    container: styles.container,
    navigation:styles.navigation
  };


  return (
    <div className={classes.container}>
      <nav><button>timer</button><button>settings</button></nav>
      <Settings />
      <div></div>
 
      <Timer isRunning={isRunning}/>
      <button onClick={()=>{setIsRunning(!isRunning)}}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={getJoke}>Get Joke</button>
      <p>{joke}</p>
    </div>
  );
}

export default App;
