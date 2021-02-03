// DEPENDENCIES
var path = require("path");

// ROUTING

module.exports = function (app) {
  // HTML GET Requests
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
  //The code below is route the app to the notes.html page when the url ends with /notes. 
  //The __dirname is used to make sure that the absolute path is taken from the computer that is using this app. 
  //It ensures that no matter the location of the html files the route will run.
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // If no matching route is found default to home.
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
