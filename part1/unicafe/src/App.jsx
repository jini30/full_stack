import { useState } from 'react';

const Statistics = ({ good, neutral, bad}) => {

  const calculateAverage = () => {
    if(good+neutral+bad === 0)
    {
      return 0;
    }
    return (good - bad) / (good+neutral+bad);
  };

  const calculatePositive = () => {
    if(good+neutral+bad === 0)
    {
      return 0;
    }
    return (good / (good+neutral+bad)) * 100;
  };

  if(good+neutral+bad === 0)
  {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>Total {good+neutral+bad}</p>
        <p>Average {calculateAverage()}</p>
        <p>Positive {calculatePositive()} %</p>
      </div>
  );

}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );

}

export default App;
