const express = require('express');
const serverless = require('serverless-http');
const uuidv4 = require('uuid/v4')
const bodyParser = require('body-parser');
const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

let items = [
  { id: uuidv4(), item: 'Teach me about PWA' },
  { id: uuidv4(), item: 'Make an awesome app' }
]

const router = express.Router();

router
  .get('/items.json', (req, res) => {
    res.json(items)
  })
  .post('/items.json', (req, res) => {
    items.push({
      id: uuidv4(),
      item: req.body.item
    })
    res.json(items)
  })
  .delete('/items.json', (req, res) => {
    items = items.filter(item => {
      if(item.id !== req.body.id) {
        return item
      }
    })
    res.json(items)
  })

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
