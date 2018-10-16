var pg = require("pg");
const cors = require("cors");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var connectionString = "postgres://sabelo:1230skm@localhost:5432/storage_system";
const client = new pg.Client(connectionString);
client.connect();

app.post('/businessData', async function (req, res) {
  try {
    await client.query(`INSERT INTO business(name, contact_name, contact_number, contact_email) VALUES ( ${req.body.businessName ? `'${req.body.businessName}'` : null}, ${req.body.contactName ? `'${req.body.contactName}'` : null}, ${req.body.telephone ? `'${req.body.telephone}'` : null}, ${req.body.email ? `'${req.body.email}'` : null})`);
    res.status(201).end();
  } catch (error) {
    res.status(500).send("sorry cant register business info : " + `${error}`).end();
  }
});
app.get('/business', async function (req, res) {
  const businessId = await client.query(`SELECT name FROM business;`);
  if (businessId) {
    res.send(businessId.rows).status(201).end();
  } else {
    res.status(500).end();
  }
})
app.post('/submitBlocks', async function (req, res) {
  await client.query(`INSERT INTO blocks(name, contact_name, contact_number, contact_email) VALUES ( ${req.body.businessName ? `'${req.body.businessName}'` : null}, ${req.body.contactName ? `'${req.body.contactName}'` : null}, ${req.body.telephone ? `'${req.body.telephone}'` : null}, ${req.body.email ? `'${req.body.email}'` : null})`);
  console.log("blocks to be added to the database", req.body);
  res.status(201).end();
})

app.listen(3003, function () {
  console.log('web server listening on port 3003')
});