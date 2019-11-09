const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

let curres;

keypressHandler.initialize(message => {
  if (curres) {
    curres.writeHead(200, headers);
    curres.write(message);
    curres.end();
    curres = null;
  } else {
    console.log('No connection yet');
  }
});

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  curres = res;

  if (req.method === 'GET' && req.url === '/swim') {
    console.log('--------> GET')
  }

  if (req.method === 'POST') {
    console.log('-------> POST')
  }
Í

  // var randomDirection = () => {
  //   let arr = ["up", "down", "left", "right"];
  //   return arr[Math.floor(Math.random() * 4)];
  // };
  // let data = randomDirection();

  // res.write('<h1>Hello Javed</h1>');
  // res.end();
  next(); // invoke next() at the end of a request to help with testing!
};

