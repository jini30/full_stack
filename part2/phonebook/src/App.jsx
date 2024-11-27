import { useState, useEffect } from 'react';
import { getAll, create, deletePerson, update } from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ errorType, setErrorType ] = useState(null);

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
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        const originalPerson = persons.find(p => p.name === newName);
        const id = originalPerson.id;
        const updatedPerson = {...originalPerson, number: newNumber};
        update(id, updatedPerson)
          .then(changedPerson => {
            setErrorMessage(`Updated ${newName}`);
            setErrorType('changed');
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.map(p => p.id === id ? changedPerson : p));
          })
          .catch(err => {
            setErrorMessage(`Information of ${newName} has already been removed from the server.`);
            setErrorType('deleted');
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    }
    else
    {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      create(newPerson)
        .then(newPersonObject => {
          setErrorMessage(`Added ${newName}`);
          setErrorType('added');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
        setErrorMessage(`Deleted ${person.name}`);
        setErrorType('deleted');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      <Notification message={errorMessage} type={errorType} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );

}

export default App