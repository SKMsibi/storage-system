var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/businessData', function (req, res, next) {
  // res.send(req.query)
});

app.listen(3003, function () {
  console.log('web server listening on port 3003')
});