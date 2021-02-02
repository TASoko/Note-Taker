//  Create a basic server using Express.JS
var express = require("express");
var path = require("path");

// Set up Express App
var app = express ();

// Sets an initial port. 
var PORT = process.env.PORT || 3001

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Sets up the routes js files that will run when node server.js is typed in the terminal.
require("./routes/apiroutes.js")(app);
require("./routes/htmlroutes.js")(app);

// LISTENER
// The below code "starts" the server
app.listen(PORT, function() {
  //This is to verfiy that the server actually ran and on what port.
    console.log("App listening on PORT: " + PORT);
  });
  