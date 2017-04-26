const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { DATABASE, PORT } = require('./config');

const app = express();

app.use(morgan(':method :url :res[location] :status'));

app.use(bodyParser.json());

// ADD ENDPOINTS HERE
// let title = req.query.title;
// let url = req.query.url;


app.post('/api/stories', (req, res) => {
  const reqProperties = ['title', 'url']; 
  // for(i=0; i<reqProperties.length; i++) {
  //   const property = reqProperties[i];
  //   if(!(property in req.body)) {}
      res.
  }

let server;
let knex;
function runServer(database = DATABASE, port = PORT) {
  return new Promise((resolve, reject) => {
    try {
      knex = require('knex')(database);
      server = app.listen(port, () => {
        console.info(`App listening on port ${server.address().port}`);
        resolve();
      });
    }
    catch (err) {
      console.error(`Can't start server: ${err}`);
      reject(err);
    }
  });
}

function closeServer() {
  return knex.destroy().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing servers');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => {
    console.error(`Can't start server: ${err}`);
    throw err;
  });
}

module.exports = { app, runServer, closeServer };