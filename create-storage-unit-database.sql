CREATE TABLE IF NOT EXISTS business (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    contact_name varchar(100) NOT NULL,
    contact_Number varchar(100) NOT NULL,
    contact_email varchar(200) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS locations (
    id serial PRIMARY KEY,
    country varchar(150) NOT NULL,
    address1 varchar(150) NOT NULL,
    address2 varchar(150) NOT NULL,
    address3 varchar(100) NOT NULL,
    business_id INT REFERENCES business(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS blocks (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    locations_id INT REFERENCES locations(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS unit_types (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    length INT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS units (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    blocks_id INT REFERENCES business(id) NOT NULL,
    Unit_type_id INT REFERENCES Unit_types(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS clients(
    id serial PRIMARY KEY,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email varchar(200) NOT NULL UNIQUE,
    telephone varchar(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS client_storages(
    id serial PRIMARY KEY,
    client_id INT REFERENCES clients(id) NOT NULL,
    Unit_id INT REFERENCES units(id) NOT NULL UNIQUE,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);
INSERT INTO
    business(
        name,
        contact_name,
        contact_number,
        contact_email
    )
VALUES
    ('TCG', 'Theo', '071659813', 'Theo@tcg.com');
INSERT INTO
    locations(country, address1,address2, address3, business_id)
VALUES
    ('South Africa','alexander township','corner London road sixth evanue','boikutsong flats block8 no9', 1);
INSERT INTO
    blocks(name, locations_id)
VALUES
    ('section-B', 2);
INSERT INTO
    Unit_types(
        name,
        length,
        width,
        height
    )
VALUES
    ('warehouse', 120, 180, 80);
INSERT INTO
    Units(
        name,
        blocks_id,
        Unit_type_id
    )
VALUES
    ('A3', 1, 1);
INSERT INTO
    clients(
        first_name,
        last_name,
        email,
        telephone
    )
VALUES
    ('Sabelo', 'Msibi', 'skm@gmail.com', '0715585598');
INSERT INTO
    used_storages(
        client_id,
        Unit_id,
        business_id
    )
VALUES
    (2, 17, 2);-- SELECT
    --     *
    -- FROM
    --     blocks
    -- SELECT
    --     Units.name,
    --     Units.blocks_id,
    --     Units.Unit_type_id
    -- FROM
    --     business
    --     INNER JOIN locations on business.id = locations.business_id
    --     INNER JOIN blocks on locations.id = blocks.locations_id
    --     INNER JOIN Units on blocks.id = Units.blocks_id
    -- WHERE
    --     business.name = 'Mzansi';
    -- SELECT
    --     Units.name,
    --     Units.blocks_id,
    --     Units.Unit_type_id
    -- FROM
    --     Unit_types
    --     INNER JOIN Units on Unit_types.id = Units.Unit_type_id
    -- WHERE
    --     Unit_types.name = 'garage'
    -- SELECT
    --     business.name,
    --     business.contact_name,
    --     business.contact_number,
    --     business.contact_email,
    --     locations.address
    -- FROM
    --     business
    --     INNER JOIN locations on business.id = locations.business_id;
    -- SELECT
    --     Units.name,
    --     Units.blocks_id,
    --     Units.Unit_type_id,
    --     Unit_types.name,
    --     Unit_types.lenght,
    --     Unit_types.width
    -- FROM
    --     Unit_types
    --     INNER JOIN Units on Unit_types.id = Units.Unit_type_id
    -- WHERE
    --     Unit_types.width > 50;