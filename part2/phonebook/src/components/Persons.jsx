const Persons = ({ filteredPersons, handleDelete }) => {

    return (
        <>
        {filteredPersons.map(person => 
            <p key={person.name}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.id)}>Delete</button>
            </p>
        )}
        </>
    );

}

export default Persons;