const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const { DATABASE, PORT } = require('./config');

const app = express();

app.use(morgan(':method :url :res[location] :status'));

app.use(bodyParser.json());

// ADD GET ENDPOINT
app.get('/api/stories', (req, res) => {
  // const reqProperties = ['title', 'url']; 
  knex.select('title', 'url')
    .from('stories')
    .orderBy('votes', 'desc')
    // .limit(20)
    .returning(['title', 'votes'])
    .then((results) => {return res.json({results});
    });
});

//ADD POST ENDPOINT
app.post('/api/stories/:entry', (req, res) => {
  knex('stories')
    .insert({'title': 'Post 4', 'url': 'www.post4.com'})
    .where('entry', req.params.entry)
    // .increment('votes', 1)
    .returning(['title', 'url'])
    .then((results) => {return res.status(201).json({results});
    });
});
// increment — .increment(column, amount)


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