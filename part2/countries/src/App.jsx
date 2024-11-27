import { useState, useEffect } from 'react';
import axios from 'axios';
import Content from './components/Content';

const App = () => {
  
  const [ filter, setFilter ] = useState('');
  const [ countries, setCountries ] = useState(null);
  const [ filteredCountries, setFilteredCountries ] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if(filter === '')
    {
      setFilteredCountries([]);
    }
    else if(countries)
    {
      const filtered_countries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));
      setFilteredCountries(filtered_countries);
    }
  }, [filter, countries])

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      Find countries: <input value={filter} onChange={handleFilter} />
      <Content list={filteredCountries} />
    </div>
  )

}

export default App;