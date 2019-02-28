// SERVER
const express = require('express'); // Server Module
const router = express.Router();

// GENRES
const genres = [
    { id: 1, name: "Drama" },
    { id: 2, name: "Horror" },
    { id: 3, name: "SciFi" },
    { id: 4, name: "Comedy" },
];

// BROWSE A GENRE
router.get('/', (req, res) =>{ // On request of localhost:3000/api/genres
    res.send(genres);
})

router.get('/:id', (req,res) =>{ //Returns the genre object if found in the array
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send('The genre with the given ID was not found');
    } else
        res.send(genre);
});

// ADD A GENRE
router.post('/', (req,res) => {
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
router.put('/:id', (req,res) =>{
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
router.delete('/:id', (req,res) =>{
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

module.exports = router;