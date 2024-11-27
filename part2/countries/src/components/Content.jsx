import Display from './Display';
import axios from 'axios';
import { useState } from 'react';

const Content = ({ list }) => {

    const [ selectedCountry, setSelectedCountry ] = useState(null);

    const handleClick = (country) => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setSelectedCountry(response.data);
        });
    }
  
    if(selectedCountry)
    {
      return (
        <Display country={selectedCountry} />
      );
    }
    else
    {
      if(list === null)
      {
        return null;
      }
      
      if(list.length > 10)
      {
        return (
          <p>Too many matches, specify another filter.</p>
        );
      }
      else if(list.length > 1)
      {
        return (
          <>
            {list.map((country, index) => <p key={index}>{country.name.common} <button onClick={() => {handleClick(country.name.common)}}>Show</button></p>)}
          </>
        )
      }
      else if(list.length == 1)
      {
        return (
          <Display country={list[0]}/>
        );
      }
      return null;
    }
  
  }

export default Content;