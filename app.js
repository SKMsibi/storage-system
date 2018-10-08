const cors = require("cors");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/businessData', function (req, res) {
  console.log("to be added to the database", req.body);
  res.status(201).end();
});

app.listen(3003, function () {
  console.log('web server listening on port 3003')
});