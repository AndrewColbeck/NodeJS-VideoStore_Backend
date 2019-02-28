// SERVER
const express = require('express'); // Server Module
const helmet = require('helmet'); // Adds Headers to HTTP messages
const Joi = require('joi'); // Module for Object Validation
const app = express(); 
const genres = require('./routes/genres');
const home = require('./routes/home');
app.use(express.json()); // Enable JSON functionality
app.use(express.urlencoded({ extended: true })); // key=value&key=value (HTML Form submission)
app.use(helmet());
app.use('/api/genres', genres);
app.use('/', home);

// ASSETS
app.use(express.static('public')); // Use all assets in public folder statically

// DEBUGGERS
const startupDebugger = require('debug')('app:startup'); // export DEBUG=app:startup or DEBUG=App:*
const morgan = require('morgan'); // Logs all HTTP Requests
const logger = require('./middleware/Logger');
const authenticator = require('./middleware/Authenticator'); // TODO: Add authentication
if (app.get('env') === 'development'){
    // Note: to change environment: Terminal$ export NODE_ENV=production
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
    app.use(logger); // Middleware function to begin log requests
    app.use(authenticator); // Middleware function to authenticate  
}

// CONFIGURATION


// PORT ASSIGNMENT
const port = process.env.PORT || 3000; // export PORT=1234
app.listen(port, () => console.log(`Listening on port ${port}...`));






