var pg = require("pg");
var connectionString = "postgres://sabelo:1230skm@localhost:5432/storage_system";
const client = new pg.Client(connectionString);
client.connect();
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    var units = await client.query("SELECT business.name As businessName, Blocks.name As blockName,locations.region,locations.city,Unit_types.name As unitTypeName, Unit_types.length, Unit_types.width, Unit_types.height, units.name As unitsName, units.id FROM units INNER JOIN unit_types on units.unit_type_id = unit_types.id INNER JOIN blocks on units.block_id = blocks.id INNER JOIN locations on blocks.locations_id = locations.id INNER JOIN business on locations.business_id = business.id WHERE NOT EXISTS (SELECT * FROM client_storages WHERE client_storages.unit_id = units.id) AND Unit_type_id = $1", [unitTypeId]);
    return units.rows;
};
async function getAllUnitsByBusinessName(businessName) {
    const units = await client.query("SELECT business.name As businessName, Blocks.name As blockName,locations.region,locations.city,Unit_types.name As unitTypeName, Unit_types.length, Unit_types.width, Unit_types.height, units.name As unitsName, units.id FROM  units INNER JOIN unit_types on units.unit_type_id = unit_types.id INNER JOIN blocks on units.block_id = blocks.id INNER JOIN locations on blocks.locations_id = locations.id INNER JOIN business on locations.business_id = business.id  WHERE NOT EXISTS (SELECT * FROM client_storages WHERE client_storages.unit_id = units.id) AND business.name = $1;", [businessName]);
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

async function getAllAvailableLocations() {
    const locations = await client.query("SELECT business_id,region,address1,address2,city FROM locations;");
    return locations.rows;
};
async function getAllUnitsByLocation(location) {
    const units = await client.query("SELECT business.name As businessName, Blocks.name As blockName,locations.region,locations.city,Unit_types.name As unitTypeName, Unit_types.length, Unit_types.width, Unit_types.height, units.name As unitsName, units.id FROM units INNER JOIN unit_types on units.unit_type_id = unit_types.id INNER JOIN blocks on units.block_id = blocks.id INNER JOIN locations on blocks.locations_id = locations.id INNER JOIN business on locations.business_id = business.id WHERE NOT EXISTS (SELECT * FROM client_storages WHERE client_storages.unit_id = units.id) AND region = $1  AND city = $2 AND address1 = $3 AND address2 = $4;", location.split(","));
    return units.rows;
};
async function getUnits(params) {
    const { searchBy, searchPhrase } = params;
    var allUnits = [];
    if (searchBy === "unit Types") {
        var unitTypes = await getAllUnitTypes(searchPhrase);
        for (let index = 0; index < unitTypes.length; index++) {
            var unit = await getAllUnitsByUnitTypeId(unitTypes[index].id);
            allUnits = [...allUnits, ...unit]
        }
    } else if (searchBy === "business") {
        var units = await getAllUnitsByBusinessName(searchPhrase);
        allUnits = [...units]
    } else if (searchBy === "locations") {
        var units = await getAllUnitsByLocation(searchPhrase);
        allUnits = [...units]
    }
    return allUnits;
};
async function insertUnitType(params) {
    var { businessName, typeName, height, length, width } = params;
    const businessId = await client.query('SELECT id FROM business WHERE name = $1;', [businessName]);
    await client.query('INSERT INTO Unit_types(name,business_id,length,width,height)VALUES($1,$2,$3,$4,$5);', [typeName, businessId.rows[0].id, +length, +width, +height]);
};
async function getAllBlocks(businessName) {
    const blocks = await client.query('SELECT blocks.name FROM blocks INNER JOIN locations on blocks.locations_id = locations.id INNER JOIN business on locations.business_id = business.id WHERE business.name = $1', [businessName]);
    return blocks.rows
};
async function submitUnit(params) {
    var { unitName, blockName, selectedBusiness, unitType } = params;
    var unitTypeValue = unitType.split(",");
    const blockId = await client.query('SELECT blocks.id FROM blocks INNER JOIN locations on blocks.locations_id = locations.id INNER JOIN business on locations.business_id = business.id WHERE blocks.name = $1 AND business.name = $2;', [blockName, selectedBusiness]);
    const unitTypeId = await client.query('SELECT id FROM unit_types WHERE name=$1 AND height=$2 AND length=$3 AND width=$4;', unitTypeValue);
    var adding = await client.query('INSERT INTO units(name, unit_type_id, block_id)VALUES($1,$2,$3);', [unitName, unitTypeId.rows[0].id, blockId.rows[0].id]);
};
async function registerUser(params) {
    var userExists = false;
    var { userName, email, role, password1 } = params;
    const userNames = await client.query('SELECT email from clients WHERE email = $1;', [email]);
    if (userNames.rowCount > 0) {
        userExists = false;
    } else {
        var generatedSalt = await bcrypt.genSalt(saltRounds);
        var hashedPassword = await bcrypt.hash(password1, generatedSalt);
        await client.query('INSERT INTO clients(user_name, email, role, hashed_password, salt)VALUES ($1,$2,$3,$4,$5);', [userName, email, role, hashedPassword, generatedSalt]);
        userExists = true;
    }
    return userExists;
};
async function getUserInfo(params) {
    var { email } = params;
    const userInfo = await client.query('SELECT * from clients WHERE email = $1;', [email]);
    if (userInfo.rowCount <= 0) {
        userExists = false;
    } else {
        return userInfo.rows[0];
    }
};

async function logUserIn(params) {
    var { email, password } = params;
    const userInfo = await client.query('SELECT hashed_password from clients WHERE email = $1;', [email]);
    if (userInfo.rowCount <= 0) {
        userExists = false;
    } else {
        var comp = await bcrypt.compare(password, userInfo.rows[0].hashed_password);
        userExists = comp;
    }
    return userExists;
};
async function findUser(userEmail) {
    const userInfo = await client.query('SELECT * from clients WHERE email = $1;', [userEmail]);
    if (userInfo.rowCount <= 0) {
        return false;
    }
    return userInfo.rows[0];
}
async function orderUnit(unitDetails, userDetails) {
    const unit = await client.query("SELECT id, name, unit_type_id, block_id, created_at, updated_at FROM public.units WHERE id = $1;", [unitDetails.id]);
    const user = await findUser(userDetails.email);
    const unitOrder = await client.query("INSERT INTO client_storages(client_id, unit_id)VALUES ($1, $2);", [user.id, unit.rows[0].id]);
    if (unitOrder.rowCount === 1) {
        return true;
    } else return false;
};
async function findClientUnits(clientEmail) {
    const userInfo = await client.query('SELECT * from clients WHERE email = $1;', [clientEmail]);
    if (userInfo.rowCount <= 0) {
        return false;
    }
    const clientUnits = await client.query('SELECT business.name As businessName, Blocks.name As blockName,locations.region,locations.city,Unit_types.name As unitTypeName, Unit_types.length, Unit_types.width, Unit_types.height, client_storages.created_at AS bookDate,units.name As unitsName, units.id FROM units INNER JOIN client_storages on units.id = client_storages.unit_id INNER JOIN unit_types on units.unit_type_id = unit_types.id INNER JOIN blocks on units.block_id = blocks.id INNER JOIN locations on blocks.locations_id = locations.id INNER JOIN business on locations.business_id = business.id WHERE client_id = $1;', [userInfo.rows[0].id]);
    return clientUnits.rows;
}

async function removeClientUnit(unitDetails) {
    await client.query('DELETE FROM client_storages WHERE id = $1;', [unitDetails.id]);
    return true
}

module.exports = {
    removeClientUnit,
    findClientUnits,
    findUser,
    logUserIn,
    registerUser,
    submitUnit,
    insertUnitType,
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
    getAllBlocks,
    getAllAvailableLocations,
    getUserInfo,
    orderUnit
}  