// REQUIRE fs TO WRITE TO FILE
var fs = require("fs")
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var data = require("../db.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  let note = [];
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

  app.post("/api/notes", function(req, res) {

 let db = "./db/db.json";
    // fs.readFile("./db/db.json", "utf8", (err, data) => {
    //   if (err) throw err; {
        const inputNote = [];
        inputNote.id = Math.random() * 100;
        inputNote.body = req.body

        // let id = db.push(req.body);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(inputNote.body),() => {
        let id = db.push(req.body);
        console.log(inputNote);
          res.json({...req.body,id:id})
        });     
        // console.log(inputNote);
              //then we redirect it to the root route
      res.json(inputNote);

      // } 

    }
   
  );

  // ---------------------------------------------------------------------------
  // Delete option
  app.post("/api/notes/:id", function(req, res) {
    const deleteNotes = data.filter(item => item.id != req.params.id);
    data = deleteNotes;
    return res.redirect('/');
  });
};
