const Display = ({ country }) => {
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
    );
}

export default Display;