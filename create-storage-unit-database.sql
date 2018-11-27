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
    address1 varchar(150) NOT NULL,
    address2 varchar(150) NOT NULL,
    city varchar(100) NOT NULL,
    region varchar(150) NOT NULL,
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
    business_id INT REFERENCES business(id) NOT NULL,
    length INT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS units (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    unit_type_id INT REFERENCES Unit_types(id) NOT NULL,
    block_id INT REFERENCES blocks(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS clients(
    id serial PRIMARY KEY,
    user_name varchar(100) NOT NULL,
    email varchar(200) NOT NULL UNIQUE,
    role varchar(100) NOT NULL,
    hashed_password varchar(200) NOT NULL,
    salt varchar(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS client_storages(
    id serial PRIMARY KEY,
    client_id INT REFERENCES clients(id) NOT NULL,
    unit_id INT REFERENCES units(id) NOT NULL UNIQUE,
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
    locations(
        address1,
        address2,
        city,
        region,
        business_id
    )
VALUES
    (
        'corner London road sixth evanue',
        'boikutsong flats block8 no9',
        'alexander township',
        'gauteng',
        1
    );
INSERT INTO
    blocks(name, locations_id)
VALUES
    ('section-B', 1);
INSERT INTO
    Unit_types(
        name,
        business_id,
        length,
        width,
        height
    )
VALUES
    ('warehouse', 1, 120, 180, 80);
INSERT INTO
    Units(name, Unit_type_id)
VALUES
    ('A3', 1);
INSERT INTO
    clients(
        user_name,
        email,
        role,
        hashed_password,
        salt
    )
VALUES
    (
        'Sabelo',
        'skm@gmail.com',
        'renter',
        'saokfjlsajdfljsf323rsdf23e',
        '$2b$10$hpM/htGGEvmITPs77p9HoO'
    );
INSERT INTO
    used_storages(
        client_id,
        Unit_id,
        business_id
    )
VALUES
    (2, 17, 2);-- SELECT
    -- q    *
    -- qFROM
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