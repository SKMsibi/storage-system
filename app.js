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
  } catch (error) {
    res.status(500).send("sorry cant register business data : " + `${error}`).end();
  }

  try {
    const businessId = await client.query(`SELECT id FROM business WHERE name = '${req.body.businessName}';`);
    const query = await client.query(`INSERT INTO locations(country, address1,address2, address3, business_id) VALUES ( ${req.body.country ? `'${req.body.country}'` : null}, ${req.body.address1 ? `'${req.body.address1}'` : null}, ${req.body.address2 ? `'${req.body.address2}'` : null}, ${req.body.address3 ? `'${req.body.address3}'` : null}, ${businessId.rows[0].id > 0 ? businessId.rows[0].id : null} )`);
    res.status(201).end();
  } catch (error) {
    res.status(500).send("sorry cant register business address : " + `${error}`).end();
  }

});

app.post('/submitBlocks', function (req, res) {
  console.log("blocks to be added to the database", req.body);
  res.status(201).end();
})

app.listen(3003, function () {
  console.log('web server listening on port 3003')
});