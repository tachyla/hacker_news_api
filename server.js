const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { DATABASE, PORT } = require('./config');

const app = express();

app.use(morgan(':method :url :res[location] :status'));

app.use(bodyParser.json());

// ADD GET ENDPOINT
app.get('/api/stories', (req, res) => {

  knex.select('title', 'url')
    .from('stories')
    .orderBy('votes')
    // .limit(20)

  // const reqProperties = ['title', 'url'];
  knex.select('title', 'url', 'votes', 'id')
    .from('stories')
    .orderBy('votes')
    // .limit(20)
    // .returningarticle(['title', 'votes'])

    .then((results) => {return res.json({results});
    });
});

//ADD POST ENDPOINT
app.post('/api/stories', (req, res) => {
  const reqProperties = ['title', 'url'];
  for(let i=0; i<reqProperties.length; i++) {
    const property = reqProperties[i];
    if(!(property in req.body)){
      //insert if statement req.body has req.body.title req.body.url, send 500 status
      return res.status(500).send('unsuccessful post!');
    }
  }

  knex('stories')
    .insert({'title': req.body.title, 'url': req.body.url})
    .then((results) => {return res.status(201).json({results});
    });
});

app.put('/api/stories/:id', (req, res) => {


  knex('stories')
    .where('id', req.params.id)
    .increment('votes')
    .then(() => {return res.status(204).end();
    });
});

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
