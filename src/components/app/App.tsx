import { useState } from 'react';
import Timer from '../../components/timer/Timer';
import Settings from '../../components/settings/Settings';
import styles from './app.module.css';
import classNames from 'classnames';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const classes = {
    container: styles.container,
    navigation: styles.navigation,
    timerButton: classNames(styles.timerButton, {
      [styles.closed]: settingsOpen,
    }),
    settingsButton: classNames(styles.settingsButton, {
      [styles.closed]: !settingsOpen,
    }),
  };

  return (
    <div className={classes.container}>
      <nav className={classes.navigation}>
        <button
        className={classes.timerButton}
          onClick={() => {
            setSettingsOpen(false);
          }}
        >
          timer
        </button>
        <button
        className={classes.settingsButton}
          onClick={() => {
            setSettingsOpen(true);
          }}
        >
          settings
        </button>
      </nav>
      {settingsOpen ? (
        <Settings />
      ) : (
        <main>
          <Timer/>
        </main>
      )}
    </div>
  );
}

export default App;
