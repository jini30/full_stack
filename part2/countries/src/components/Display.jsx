const Display = ({ list }) => {

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
          {list.map((country, index) => <p key={index}>{country.name.common}</p>)}
        </>
      )
    }
    else if(list.length == 1)
    {
      const country = list[0];
      
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
        </div>
      )
    }
    
    return null;
  
  }

export default Display;