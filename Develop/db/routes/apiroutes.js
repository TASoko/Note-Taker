// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var data = require("../db.json");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function(req, res) {
    res.json(data);
  });

  // API POST Requests
  // Below code handles when a user submits a note and thus submits data to the server.
  // When a user submits a note data (a JSON object)
  // ...the JSON is pushed
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {

    const inputNote = {};
    inputNote.id = Math.random() * 100;
    inputNote.body = req.body.newNote
    data.push(inputNote);

    //then we redirect it to the root route
    res.redirect('/');
    res.json(data);
   
  });

  // ---------------------------------------------------------------------------
  // Delete option
  app.post("/api/notes/:id", function(req, res) {
    const deleteNotes = data.filter(item => item.id != req.params.id);
    data = deleteNotes;
    return res.redirect('/');
  });
};
