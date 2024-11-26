import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAll, create, deletePerson } from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  const hook = () => {
    getAll()
      .then(response => {
        setPersons(response);
      });
  };

  useEffect(hook, []);

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
      create(newPerson)
        .then(newPersonObject => {
          setPersons(persons.concat(newPersonObject));
        });
    }
    setNewName('');
    setNewNumber('');
  };

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if(window.confirm(`Do you really want to delete ${person.name}?`))
    {
      deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== response.id));
      });
    }
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );

}

export default App