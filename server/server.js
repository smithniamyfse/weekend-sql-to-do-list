const express = require('express');
// An instance of the Express application is created and stored in the app variable.
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const todolistRouter = require('./routes/todolist-router');

// The bodyParser middleware is used to parse the data in the request body as an object
app.use(bodyParser.urlencoded({ extended: true }));
// Serve back static files (html, css, etc.) by default
app.use(express.static('server/public'));

// API ROUTES
//  The server defines routes for handling requests 
    // related to users using the todolistRouter middleware.
// The todolistRouter is responsible for handling requests 
    // to the '/todolist' endpoint, which includes operations 
    // such as creating, retrieving, updating, and deleting user data.
app.use('/todolist', todolistRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});