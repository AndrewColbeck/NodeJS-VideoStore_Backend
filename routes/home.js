// SERVER
const express = require('express'); // Server Module
const router = express.Router();


// HOME PAGE
router.get('/', (req, res) =>{ // On request of ROOT directory
    res.send('Welcome to Vidly');
});

module.exports = router;