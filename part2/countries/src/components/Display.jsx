import axios from "axios";
import { useState, useEffect } from 'react';

const Display = ({ country }) => {
    
    const [ weather, setWeather ] = useState(null);

    useEffect(() => {
      const latitude = country.capitalInfo.latlng[0];
      const longitude = country.capitalInfo.latlng[1];
      const temp = import.meta.env.VITE_API_KEY;
      const api_key = temp.substr(0, temp.length-1);
      console.log(api_key);
      const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${latitude},${longitude}`;
      axios
        .get(url)
        .then(response => {
          const weatherObject = {
            temp: response.data.current.temp_c,
            wind: response.data.current.wind_kph,
            icon: response.data.current.condition.icon,
            alt: response.data.current.condition.text
          };
          setWeather(weatherObject);
        });
    }, []);

    return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital.reduce((total, curr) =>  total + " " + curr, "")}</p>
          <p>Area: {country.area}</p>
          <p><b>Languages:</b></p>
          <ul>
            {Object.values(country.languages).map((lang, index) => <li key={index}>{lang}</li>)}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} />
          <h2>Weather in {country.capital[0]}</h2>
          {weather ?
            <>
              <p>Temperature: {weather.temp} Celcius</p>
              <img src={weather.icon} alt={weather.alt} />
              <p>Wind: {weather.wind} kph</p>
            </> :
            <p>Loading weather information...</p>
          }
        </div>
    );
}

export default Display;