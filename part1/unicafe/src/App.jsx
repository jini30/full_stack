import { useState } from 'react';

const App = () => {
  
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const [ total, setTotal ] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood+neutral+bad);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(good+updatedNeutral+bad);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(good+neutral+updatedBad);
  };

  const calculateAverage = () => {
    if(total === 0)
    {
      return 0;
    }
    return (good - bad) / total;
  };

  const calculatePositive = () => {
    if(total === 0)
    {
      return 0;
    }
    return (good / total) * 100;
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
        <p>Total {total}</p>
        <p>Average {calculateAverage()}</p>
        <p>Positive {calculatePositive()} %</p>
      </div>
    </div>
  );

}

export default App;
