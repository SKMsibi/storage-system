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

async function getAllBusinessNames() {
  const businessNames = await client.query(`SELECT name FROM business;`);
  // await client.end();
  return businessNames.rows;
};
async function getAllBusinessWithLocations() {
  const businessNames = await client.query(`SELECT name FROM business INNER JOIN locations on business.id = locations.business_id;`);
  // await client.end();
  return businessNames.rows;
};
async function insertBusinessLocation(businessName, country, address1, address2, address3) {
  const businessId = await client.query(`SELECT id FROM business WHERE name = $1;`, [businessName]);
  await client.query("INSERT INTO locations(country, address1,address2, address3, business_id) VALUES ( $1,$2,$3,$4,$5 )", [country ? country : null, address1 ? address1 : null, address2 ? address2 : null, address3 ? address3 : null, businessId.rows[0].id > 0 ? businessId.rows[0].id : null]);
  // await client.end();
};
async function insertBusinessInfo(businessName, contactName, telephone, email) {
  var addingBusiness = await client.query("INSERT INTO business(name, contact_name, contact_number, contact_email) VALUES ($1,$2,$3,$4)", [businessName ? businessName : null, contactName ? contactName : null, telephone ? telephone : null, email ? email : null]);
  // await client.end();
  return addingBusiness;
};
async function insertBlocks(params) {
  var location = params.selectedLocation.split(",");
  const businessId = await client.query('SELECT id FROM locations WHERE country = $1 AND address1 = $2 AND address2 = $3 AND address3 = $4', location);
  for (let iterator in params.formValues) {
    await client.query("INSERT INTO blocks(name, locations_id) VALUES ($1, $2);", [params.formValues[iterator], businessId.rows[0].id]);
  }
};
async function getAllUnitTypes(unitTypeInfo) {
  var unitTypeDetails = unitTypeInfo.split(",");
  var unitTypes = await client.query("SELECT * FROM unit_types WHERE unit_types.name = $1 AND Unit_types.height = $2 AND Unit_types.length = $3 AND Unit_types.width = $4;", unitTypeDetails);
  return unitTypes.rows;
};
async function getAllUnitsByUnitTypeId(unitTypeId) {
  var units = await client.query("SELECT name FROM units WHERE Unit_type_id = $1", [unitTypeId]);
  return units.rows;
};
async function getAllUnitsByBusinessName(businessName) {
  const units = await client.query("SELECT units.name FROM business INNER JOIN Unit_types on business.id = Unit_types.business_id INNER JOIN units on Unit_types.id = units.unit_type_id WHERE business.name = $1;", [businessName]);
  return units.rows
};
async function getAllLocationsForABusiness(businessName) {
  var results = await client.query("SELECT country,address1,address2,address3 FROM locations INNER JOIN business on locations.business_id = business.id  WHERE business.name = $1", [businessName]);
  return results.rows;
};
async function getAllMatchingLocations(location) {
  const units = await client.query("SELECT locations.business_id,locations.country,locations.address1,locations.address2,locations.address3 FROM locations WHERE to_tsvector(country) @@ to_tsquery($1) or to_tsvector(address1) @@ to_tsquery($1) or to_tsvector(address2) @@ to_tsquery($1) or to_tsvector(address3) @@ to_tsquery($1);", [location]);
  return units.rows;
};
async function getAllUnitsByLocation(location) {
  const units = await client.query("SELECT units.name FROM locations INNER JOIN business on locations.business_id = business.id INNER JOIN unit_types on business.id = unit_types.business_id INNER JOIN units on Unit_types.id = units.unit_type_id  WHERE country = $1 AND address1 = $2 AND address2 = $3 AND address3 = $4;", location.split(","));
  return units.rows;
};
async function getUnits(params) {
  var allUnits = [];
  if (params.searchBy === "unit Types") {
    var unitTypes = await getAllUnitTypes(params.searchPhrase);
    for (let index = 0; index < unitTypes.length; index++) {
      var unit = await getAllUnitsByUnitTypeId(unitTypes[index].id);
      allUnits = [...allUnits, ...unit]
    }
  } else if (params.searchBy === "business") {
    var units = await getAllUnitsByBusinessName(params.searchPhrase);
    allUnits = [...units]
  } else if (params.searchBy === "locations") {
    var units = await getAllUnitsByLocation(params.searchPhrase);
    allUnits = [...units]
  }
  return allUnits;
};
app.post('/businessData', async function (req, res) {
  try {
    await insertBusinessInfo(req.body.businessName, req.body.contactName, req.body.telephone, req.body.email)
    res.status(201).end();
  } catch (error) {
    res.status(500).send("sorry cant register business info : " + `${error}`).end();
  }
});
app.get('/locations/:searchKey', async function (req, res) {
  try {
    var searchKey = req.params.searchKey;
    var allLocations = await getAllMatchingLocations(searchKey);
    res.send(allLocations).status(201).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/locationsForBusiness/:businessName', async function (req, res) {
  try {
    var businessName = req.params.businessName;
    const allLocations = await getAllLocationsForABusiness(businessName);
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
app.get('/businesses', async function (req, res) {
  try {
    var businessNames = await getAllBusinessNames();
    res.status(200).send(businessNames).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/businessesWithLocations', async function (req, res) {
  try {
    var businessNames = await getAllBusinessWithLocations();
    res.status(200).send(businessNames).end();
  } catch (error) {
    res.status(500).end();
  }
});
app.get('/allUnits/:searchBy/:searchPhrase', async function (req, res) {
  try {
    var allUnits = await getUnits(req.params);
    res.status(201).send(allUnits).end()
  } catch (error) {
    res.status(500).end()
  }
});
app.post('/businessLocation', async function (req, res) {
  try {
    insertBusinessLocation(req.body.businessName, req.body.country, req.body.address1, req.body.address2, req.body.address3);
    res.status(201).end();
  } catch (error) {
    res.status(500).send("sorry cant register business address : " + `${error}`).end();
  }
});
app.post('/submitBlocks', async function (req, res) {
  try {
    await insertBlocks(req.body);
    res.status(201).end();
  } catch (error) {

    res.status(500).send("sorry cant register business address : " + `${error}`).end();
  }
});
app.listen(3003, function () {
  console.log('web server listening on port 3003')
});