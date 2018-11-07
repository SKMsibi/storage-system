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

var helper = require('./routes/functions');
app.post('/businessData', async function (req, res) {
  try {
    await helper.insertBusinessInfo(req.body.businessName, req.body.contactName, req.body.telephone, req.body.email)
    res.status(201).end();
  } catch (error) {
    res.status(500).send("sorry cant register business info : " + `${error}`).end();
  }
});
app.get('/locations/:searchKey', async function (req, res) {
  try {
    var searchKey = req.params.searchKey;
    var allLocations = await helper.getAllMatchingLocations(searchKey);
    res.send(allLocations).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/locationsForBusiness/:businessName', async function (req, res) {
  try {
    var businessName = req.params.businessName;
    const allLocations = await helper.getAllLocationsForABusiness(businessName);
    res.send(allLocations).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/unitTypes', async function (req, res) {
  try {
    const units = await client.query(`SELECT name, length, width, height FROM unit_types;`);
    res.send(units.rows).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.post('/unitTypes', async function (req, res) {
  try {
    helper.insertUnitType(req.body)
    res.status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/businesses', async function (req, res) {
  try {
    var businessNames = await helper.getAllBusinessNames();
    res.status(200).send(businessNames).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/businessesWithLocations', async function (req, res) {
  try {
    var businessNames = await helper.getAllBusinessWithLocations();
    res.status(200).send(businessNames).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/allUnits/:searchBy/:searchPhrase', async function (req, res) {
  try {
    var allUnits = await helper.getUnits(req.params);
    res.status(201).send(allUnits).end()
  } catch (error) {
    console.log('error :', error);
    res.status(500).end()
  }
});
app.post('/unit', async function (req, res) {
  try {
    await helper.submitUnit(req.body);
    res.status(201).end()
  } catch (error) {
    console.log('error :', error);
    res.status(500).end()
  }
});

app.post('/businessLocation', async function (req, res) {
  try {
    helper.insertBusinessLocation(req.body.businessName, req.body.address1, req.body.address2, req.body.city, req.body.region);
    res.status(201).end();
  } catch (error) {
    console.log('error :', error);
    res.status(500).send("sorry cant register business address : " + `${error}`).end();
  }
});
app.post('/submitBlocks', async function (req, res) {
  try {
    await helper.insertBlocks(req.body);
    res.status(201).end();
  } catch (error) {
    console.log('error :', error);
    res.status(500).send("sorry cant register business address : " + `${error}`).end();
  }
});
app.get('/blocks/:businessName', async function (req, res) {
  try {
    var businessName = req.params["businessName"];
    var allBlocks = await helper.getAllBlocks(businessName)
    res.status(201).send(allBlocks).end()
  } catch (error) {
    res.status(500).end()
  }
});

app.post('/signUp', async function (req, res) {
  try {
    console.log('req.body :', req.body);
    res.status(201).end()
  } catch (error) {
    console.log('error :', error);
    res.status(500).end()
  }
});

app.listen(3003, function () {
  console.log('web server listening on port 3003')
});