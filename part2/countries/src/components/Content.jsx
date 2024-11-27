import Display from './Display';

const Content = ({ list }) => {

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
      return (
        <Display country={list[0]}/>
      );
    }
    
    return null;
  
  }

export default Content;