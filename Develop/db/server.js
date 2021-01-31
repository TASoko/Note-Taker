//  Create a basic server using Express.JS
var express = require("express");
var path = require("path");

// REQUIRE fs TO WRITE TO FILE
const fs = require("fs")

require("./routes/apiroutes.js")(app);
require("./routes/htmlroutes.js")(app);


// Set up Express App
var app = express ();

// Sets an initial port. 
var PORT = process.env.PORT || 3001

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// LISTENER
// The below code "starts" the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  