var pg = require("pg");
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
    var validBusinesses = [];
    businessNames.rows.forEach(element => {
        var businessFound = validBusinesses.find(item => item.name === element.name);
        if (!businessFound) {
            validBusinesses.push(element);
        };
    });
    return validBusinesses;
    // await client.end();
};
async function insertBusinessLocation(businessName, address1, address2, city, region) {
    const businessId = await client.query(`SELECT id FROM business WHERE name = $1;`, [businessName]);
    await client.query("INSERT INTO locations(region,address1,address2, city , business_id) VALUES ( $1,$2,$3,$4,$5 )", [region ? region : null, address1 ? address1 : null, address2 ? address2 : null, city ? city : null, businessId.rows[0].id > 0 ? businessId.rows[0].id : null]);
    // await client.end();
};
async function insertBusinessInfo(businessName, contactName, telephone, email) {
    var addingBusiness = await client.query("INSERT INTO business(name, contact_name, contact_number, contact_email) VALUES ($1,$2,$3,$4)", [businessName ? businessName : null, contactName ? contactName : null, telephone ? telephone : null, email ? email : null]);
    // await client.end();
    return addingBusiness;
};
async function insertBlocks(params) {
    var location = params.selectedLocation.split(",");
    const businessId = await client.query('SELECT id FROM locations WHERE region = $4 AND address1 = $1 AND address2 = $2 AND city = $3', location);
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
    var results = await client.query("SELECT region,address1,address2,city FROM locations INNER JOIN business on locations.business_id = business.id  WHERE business.name = $1", [businessName]);
    return results.rows;
};
async function getAllMatchingLocations(location) {
    const units = await client.query("SELECT business_id,region,address1,address2,city FROM locations WHERE to_tsvector(region) @@ to_tsquery($1) or to_tsvector(address1) @@ to_tsquery($1) or to_tsvector(address2) @@ to_tsquery($1) or to_tsvector(city) @@ to_tsquery($1);", [location]);
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
async function insertUniteType(params) {
    var { businessName, typeName, height, length, width } = params;
    console.log('params :', businessName, typeName, height, length, width);
    const businessId = await client.query('SELECT id FROM business WHERE name = $1;', [businessName]);
    await client.query(`INSERT INTO Unit_types(name,business_id,length,width,height)VALUES($1,$2,$3,$4,$5);`, [typeName, businessId.rows[0].id, +length, +width, +height]);
};
async function getAllBlocks(businessName) {
    const blocks = await client.query('SELECT blocks.name FROM blocks INNER JOIN locations on blocks.locations_id = locations.id INNER JOIN business on locations.business_id = business.id WHERE business.name = $1', [businessName]);
    return blocks.rows
};

module.exports = {
    insertUniteType,
    getAllBusinessNames,
    getAllBusinessWithLocations,
    insertBusinessLocation,
    insertBusinessInfo,
    insertBlocks,
    getAllUnitTypes,
    getAllUnitsByUnitTypeId,
    getAllUnitsByBusinessName,
    getAllLocationsForABusiness,
    getAllMatchingLocations,
    getAllUnitsByLocation,
    getUnits,
    getAllBlocks
}  