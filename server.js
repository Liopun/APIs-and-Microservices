// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require('path');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.route("/").get(function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.route("/api/hello").get(function (req, res) {
  res.json({greeting: 'hello API'});
});

//Timestamp functions


//Handle the timestamp request
//.route is better than .get if the app is going to be huge
app.route("/api/timestamp/:data").get(function(req, res) {
  
  var curr_date = null;
  if(!req.params.date) {
    curr_date = new Date(Date.now());
  } else {
    var unix_timestamp = parseInt(req.params.date*1);
    curr_date = isNaN(unix_timestamp) ? new Date(req.params.date) : new Date(unix_timestamp);
  }
  
  var response = curr_date == "Invalid Date" ? { error: "Invalid Date" } : { "unix": curr_date.getTime(), "utc": curr_date.toUTCString() };
  
  res.json(response);
});

//handle 404 middleware
app.use(function(req, res, next) {
  res.status(404).type("text").send("Not Found");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});