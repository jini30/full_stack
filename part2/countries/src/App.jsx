import { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display';

const App = () => {
  
  const [ filter, setFilter ] = useState('');
  const [ countries, setCountries ] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const all_countries = response.data;
        const filtered_countries = all_countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));
        setCountries(filtered_countries);
      });
  }, [filter])

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      Find countries: <input value={filter} onChange={handleFilter} />
      <Display list={countries} />
    </div>
  )

}

export default App;