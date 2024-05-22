import { useState } from 'react';
import './App.css';
import Timer from './components/timer/Timer';



function App() {
  const [joke, setJoke] = useState<string>('');

  const fetchJoke = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist,explicit,political'
      );
      const data: Joke = await response.json();

      if (data.error) {
        console.error('Error fetching joke:', data.error);
        return;
      }

      if (data.type === 'twopart') {
        setJoke(`${data.setup} ${data.delivery}`);
      } else {
        setJoke(data.joke || '');
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  return (
    <>
      <h1>hello</h1>
      <Timer initialTime={200} />
      <img src='work.gif' alt='' />
      <img src='break.gif' alt='' />
      <button onClick={fetchJoke}>Get Random Dad Joke</button>
      <p>{joke}</p>
    </>
  );
}

export default App;
