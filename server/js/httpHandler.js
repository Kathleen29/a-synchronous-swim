const fs = require("fs");
const path = require("path");
const headers = require("./cors");
const multipart = require("./multipartUtils");
const keypressHandler = require("./keypressHandler");

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join(".", "background.jpg");
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = queue => {
  messageQueue = queue;
};

let curres;

module.exports.router = (req, res, next = () => {}) => {
  console.log("Serving request type " + req.method + " for url " + req.url);

  if (req.method === "GET" && req.url === "/background.jpg") {
    var img = fs.readFileSync("background.jpg");
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(img, "binary");
    console.log("--------> GET your image");
  }

  if (req.method === "POST" && req.url === "/setBackground") {
    let fileData = Buffer.alloc(0);

    req.on("data", chunk => {
      fileData = Buffer.concat([fileData, chunk]);
    });
    req.on("end", () => {
      var hopefullyAnImage = multipart.getFile(fileData);
      fs.writeFile('background.jpg', hopefullyAnImage.data, (err) => {

        res.writeHead( err ? 400 : 201, headers);
        res.end();
      });
    });

  }

  if (req.method === "GET" && req.url === "/swim") {
    curres = res;
    keypressHandler.initialize(message => {
      if (curres) {
        curres.writeHead(200, headers);
        curres.write(message);
        curres.end();
        curres = null;
      } else {
        // console.log('No connection yet');
      }
    });
  }

  // var randomDirection = () => {
  //   let arr = ["up", "down", "left", "right"];
  //   return arr[Math.floor(Math.random() * 4)];
  // };
  // let data = randomDirection();

  // res.write('<h1>Hello Javed</h1>');
  // res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
