const express = require('express');
const morgan = require('morgan');

const app = express();

morgan.token('body', (request) => {
    if(request.method === 'POST')
    {
        return JSON.stringify(request.body);
    }
    return '';
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        'id': '1',
        'name': 'Arto Hellas',
        'number': '040-123456'
    },
    {
        'id': '2',
        'name': 'Ada Lovelace',
        'number': '39-44-5323523'
    },
    {
        'id': '3',
        'name': 'Dan Abramov',
        'number': '12-43-234345'
    },
    {
        'id': '4',
        'name': 'Mary Poppendieck',
        'number': '39-23-6423122'
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    if(person)
    {
        response.json(person);
    }
    else
    {
        response.status(404).end();
    }
});

app.get('/info', (request, response) => {
    const time = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`);
});

const generateId = () => {
    const id = String(Math.floor(Math.random() * 1000) + 1);
    const person = persons.find(p => p.id === id);
    if(!person)
    {
        return id;
    }
    return generateId();
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if(!body.name)
    {
        return response.status(400).json({
            error: 'Name is missing'
        });
    }
    if(!body.number)
    {
        return response.status(400).json({
            error: 'Number is missing'
        });
    }
    const duplicate = persons.find(p => p.name.trim().toLowerCase() === body.name.trim().toLowerCase());
    if(duplicate)
    {
        return response.status(400).json({
            error: 'Name must be unique'
        });
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    persons = persons.concat(person);
    response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});