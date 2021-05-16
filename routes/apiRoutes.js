/*
The following API routes are created:
GET /api/notes should read the db.json file and return all saved notes as JSON.
POST /api/notes should receive a new note to save on the request body, add it to the db.json file, 
and then return the new note to the client. Each note is given a unique id by npm package uuid when it's saved.
*/

const fs = require('fs');
const {v4 : uuidv4} = require('uuid')

// Load data from db.json
const noteData = require('../db/db.json');

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // GET /api/notes should read the db.json file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    res.json(noteData);
  });

  //POST /api/notes receive a new note to save on the request body, create a unique id, add it to the db.json file, 
  app.post('/api/notes', (req, res) => {
      const userId = uuidv4();  // generate a random unique id
      req.body.id = userId; // index.js sets members text and title but not id so we have do that here
      noteData.push(req.body);
      res.json(true);

      fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) =>
          err ? console.error(err) : console.log('success')
      );
  });   // end of app.post
}