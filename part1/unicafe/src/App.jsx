import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  );
}

const Statistics = ({ good, neutral, bad }) => {

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
    return (good / (good+neutral+bad)) * 100 + '%';
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
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='Total' value={good+neutral+bad} />
        <StatisticLine text='Average' value={calculateAverage()} />
        <StatisticLine text='Positive' value={calculatePositive()} />
      </div>
  );

}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
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
        <Button onClick={handleGood} text='Good' />
        <Button onClick={handleNeutral} text='Neutral' />
        <Button onClick={handleBad} text='Bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );

}

export default App;
