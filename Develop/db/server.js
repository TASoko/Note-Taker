//  Create a basic server using Express.JS
var express = require("express");
var path = require("path");

// Set up Express App
var app = express ();

// Sets an initial port. 
var PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// LISTENER
// The below code "starts" the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  