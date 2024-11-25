import { useState } from 'react';

const App = () => {
  
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas'}
  ]);
  const [ newName, setNewName ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const exists = persons.some(person => person.name === newName);
    if(exists)
    {
      alert(`${newName} is already added to the phonebook.`);
    }
    else
    {
      const newPerson = {
        name: newName
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type='submit' onClick={addName}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  );

}

export default App