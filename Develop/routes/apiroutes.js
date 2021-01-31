// REQUIRE fs TO WRITE TO FILE
var fs = require("fs")
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var data = require("../db.json");
var db = "./db/db.json"

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data)=> {
      if (err) throw err; { 
        let notes = JSON.parse(data);
        res.json(notes);
      } 
    })
  });

  // API POST Requests
  // Below code handles when a user submits a note and thus submits data to the server.
  // When a user submits a note data (a JSON object)
  // ...the JSON is pushed
  // ---------------------------------------------------------------------------

  // app.post("/api/notes", function(req, res) {

  //   const inputNote = {};
  //   inputNote.id = Math.random() * 100;
  //   inputNote.body = req.body.newNote
  //   res.push(inputNote); 

  //   fs.writeFileSync(db, JSON.stringify(inputNote), (err, data) => {
  //     if (err) throw err; {
  //             //then we redirect it to the root route
  //     res.redirect('/');
  //     res.json(inputNote);

  //     } 

  //   }
   
  // )});

  // ---------------------------------------------------------------------------
  // Delete option
  app.post("/api/notes/:id", function(req, res) {
    const deleteNotes = data.filter(item => item.id != req.params.id);
    data = deleteNotes;
    return res.redirect('/');
  });
};
