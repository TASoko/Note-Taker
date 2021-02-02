// REQUIRE fs TO WRITE TO FILE
var fs = require("fs");
// ===============================================================================

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // let note = [];
  // API GET Requests
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (!data) {
        return (data = []);
      }
      if (err) throw err;
      let notes = JSON.parse(data);
      console.log("Getting these notes:", notes);
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
