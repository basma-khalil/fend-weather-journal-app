// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

// Adding emoji to content
const emoji = require('node-emoji');

function emojiName(feelings) {
  switch(feelings) {
    case 'happy':
    case 'good':
    case 'great':
      return 'smiley';
      break;
    case 'sad':
    case 'bad':
    case 'depressed':
      return 'disappointed';
      break;
    case 'afraid':
    case 'scared':
      return 'fearful';
      break;
    case 'sick':
      return 'mask';
      break;
    case 'surprised':
      return 'open_mouth';
      break;
    case 'crying':
      return 'cry';
      break;
    case 'hungry':
      return 'yum';
      break;
    case 'in love':
      return 'heart_eyes';
      break;
    default:
      return feelings;
  }
}

// GET route
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
}

// POST route
app.post('/add', addData);

function addData (req, res) {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.icon = req.body.icon;
  projectData.content = req.body.content;
  if (emoji.hasEmoji(emojiName(req.body.content.toLowerCase()))) {
    projectData.emoji = emoji.get(emojiName(req.body.content.toLowerCase()));
  } else {
    projectData.emoji = '';
  }

  res.send(projectData);
  console.log(projectData);
}