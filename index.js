// Setup Express Package for Server
const express = require('express');
const app = express();
app.use(express.json()); // Enable JSON functionality

// Setup Joi Module for Object Validation
const Joi = require('joi');

// Setup Port Allocation from Global Variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// GENRES
const genres = [
    { id: 1, name: "Drama" },
    { id: 2, name: "Horror" },
    { id: 3, name: "SciFi" },
    { id: 4, name: "Comedy" },
];

// BROWSE A GENRE
app.get('/', (req, res) =>{ // On request of ROOT directory
    res.send('Welcome to Vidly');
});
app.get('/api/genres', (req, res) =>{ // On request of localhost:3000/api/genres
    res.send(genres);
})

app.get('/api/genres/:id', (req,res) =>{ //Returns the genre object if found in the array
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found');
    } else
        res.send(genre);
});

// ADD A GENRE
app.post('/api/genres', (req,res) => {
    const { error } = validateGenre(req.body); // Object destructured: We take only the error property
    if (error){
        return res.status(400).send(error.details[0].message); // 400 Bad Request
    }
    
    const genre = { // If Genre passes validation, add to array
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

// UPDATE A GENRE
app.put('/api/genres/:id', (req,res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id)); // Find genre by id
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found');
    }
    const { error } = validateGenre(req.body); // Object destructured: We take only the error property
    if (error){
        return res.status(400).send(error.details[0].message); // 400 Bad Request
    }

    genre.name = req.body.name; // Update and return the genre if genre ok
    res.send(genre);
    
})
// DELETE A GENRE
app.delete('/api/genres/:id', (req,res) =>{
    // Look up Course (if Not existing, return 404)
    const genre = genres.find(g => g.id === parseInt(req.params.id)); // Find Genre by id
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found');
    }
    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return the genre that was deleted
    res.send(genre);

})

// VALIDATE GENRE OBJECT
function validateGenre(genre){
    const schema = { // Schema for validating input (see Joi on npmjs)
        name: Joi.string().min(1).required()
    }
    return result = Joi.validate(genre, schema);  
}

