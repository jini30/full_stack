import { useState } from 'react';

const App = () => {
  
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const handleGood = () => {
    setGood(good+1);
  };

  const handleNeutral = () => {
    setNeutral(neutral+1);
  };

  const handleBad = () => {
    setBad(bad+1);
  };

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <button onClick={handleGood}>Good</button>
        <button onClick={handleNeutral}>Neutral</button>
        <button onClick={handleBad}>Bad</button>
      </div>
      <div>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>
    </div>
  );

}

export default App;
