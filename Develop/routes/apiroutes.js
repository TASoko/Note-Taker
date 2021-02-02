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
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      let notes = [];
      if (err) throw err;
      if (!data) {
        console.log("No data!");
        notes = [];
      } else {
        console.log("Retrieving data!");
        notes = JSON.parse(data);
      }
      console.log("These are the notes", notes);

      const inputNote = {
        id: Math.floor(Math.random() * 100),
        title: req.body.title,
        text: req.body.text,
      };
      console.log("The new note is", inputNote);
      notes.push(inputNote);

      console.log("The new note has been added!");

      fs.writeFileSync("./db/db.json", JSON.stringify(notes), "utf-8");
      res.json(inputNote);
    });
  });

  // ---------------------------------------------------------------------------
  // Delete option
  app.delete("/api/notes/:id", function (req, res) {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      console.log("Retrieving data to delete a note!");
      let notes = JSON.parse(data);
      console.log("These are the notes, one to be deleted", notes);

      const filteredNotes = notes.filter(note => {
        console.log(note.id)
        console.log(req.params.id)
      return note.id != req.params.id
      });

      console.log("Note deleted! The notes are now:", filteredNotes)

      fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes), "utf-8");

      res.sendStatus(200);

    });
  });
};
