// REQUIRE fs TO WRITE TO FILE
var fs = require("fs");
// ===============================================================================

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  // API GET Requests
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function (req, res) {
    // The app has to first read the database file which is located in ./db/db.json before running 
    // anything else. 
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      // Because in some cases there will not be data already written we need to make sure the app still runs. In order to do this we stated that
      // if there isn't any data return data as an empty array. This step is needed!
      if (!data) {
        return (data = []);
      }
      if (err) throw err;
      //This code makes sure the data is stored as a json and is called notes. 
      let notes = JSON.parse(data);
      //At the end of this get request the app will render the response. 
      res.json(notes);
    });
  });

  // API POST Requests
  // Below code handles when a user submits a note and thus submits data to the server.
  // When a user submits a note data (a JSON object)
  // ...the JSON is pushed
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    // We have to start off the post requestion with a readFile so that when it eventually writes a file it knows
    // the information is coming from. Essentially we have to retrieve the orginal data firt before
    // we can do anything with it.
    fs.readFile("./db/db.json", "utf8", (err, data) => {
    // Like before we have to account for the app not having any inital data.
    // The below code says in this request the original notes is an empty array. 
    // This is important because we will be putting information in here.
      let notes = [];
      if (err) throw err;
      if (!data) {
        // This is saying if there is no data to start with make notes an empty array.
        console.log("No data!");
        notes = [];
      } else {
        //However, if there is data from before have it parsed in the notes array already.
        notes = JSON.parse(data);
      }
      console.log("These are the notes", notes);
      // The code below is the information we would like to collect about the inputed notes. 
      // The variable in this case was called inputNote
      const inputNote = {
        // This gives the input note a randomly generated id which will be used later on
        // Used math floor to give whole integers
        id: Math.floor(Math.random() * 100),
        // This shows the title of the note.
        title: req.body.title,
        // This shows the text or body of the note.
        text: req.body.text,
      };
      // The code below then pushes the inputNote into the notes array. Now the added notes will 
      // display in notes in terms of id, title and text.
      notes.push(inputNote);

      console.log("The new note has been added!");
      
      // This code ensures that the information created on the app appears in our db.json file.
      fs.writeFileSync("./db/db.json", JSON.stringify(notes), "utf-8");
      res.json(inputNote);
    });
  });

  // ---------------------------------------------------------------------------
  // Delete option
  app.delete("/api/notes/:id", function (req, res) {
    // We begin this request like before with the rendering of the current file/data.
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
    // Unlike before notes is sure to have data because you can't delete what is not there
    // so we simply have notes equal to the parse data
      let notes = JSON.parse(data);

    // Below is the code that will help delete a post.
    // The variable is stating that notes should be filtered and then return the 
    // notes that do not match the id. the index.js file holds the functionality of the actualy event.
    // Now, filteredNotes will be an array of all the remainging notes.
      const filteredNotes = notes.filter(note => {
      return note.id != req.params.id
      });

      console.log("Note deleted! The notes are now:", filteredNotes)

      // This code ensures that the information created on the app appears in our db.json file.
      // Now the db.json file will exsist minus the one deleted note.
      fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes), "utf-8");
      // This is tell the code it worked.
      res.sendStatus(200);

    });
  });
};
