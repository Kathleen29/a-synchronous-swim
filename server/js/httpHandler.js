const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keyPressThing = require('./keypressHandler.js')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET' && req.url === '/swim') {
    console.log('--------> GET')
    // logKeypress('up')
    // console.log(req)
  }

  if (req.method === 'POST') {
    console.log('-------> POST')
  }

  var randomDirection = () => {
    let arr = ["up", "down", "left", "right"];
    return arr[Math.floor(Math.random() * 4)];
  };

  let data = randomDirection();

  res.writeHead(200, headers);
  res.write(data);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};

// var data = "data to send to client";
//   var server = http.createServer(function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write(data); // You Can Call Response.write Infinite Times BEFORE response.end
//   response.end("Hello World\n");
// }).listen(8125);
