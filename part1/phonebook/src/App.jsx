import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas', 
      number: '040-123456', 
      id: 1 
    },
    { 
      name: 'Ada Lovelace', 
      number: '39-44-5323523', 
      id: 2 
    },
    { 
      name: 'Dan Abramov', 
      number: '12-43-234345', 
      id: 3 
    },
    { 
      name: 'Mary Poppendieck', 
      number: '39-23-6423122', 
      id: 4 
    }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const exists = persons.some(person => person.name === newName);
    if(exists)
    {
      alert(`${newName} is already added to the phonebook.`);
    }
    else
    {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  };

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().startsWith(filterName.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );

}

export default App