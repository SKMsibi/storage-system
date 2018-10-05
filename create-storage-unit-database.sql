CREATE TABLE IF NOT EXISTS Business (
    id serial PRIMARY KEY,
    name varchar(225) NOT NULL,
    contact_name varchar(255) NOT NULL,
    contact_Number varchar(255) NOT NULL,
    contact_email varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS Locations (
    id serial PRIMARY KEY,
    address varchar(225) NOT NULL,
    business_id INT REFERENCES Business(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS Blocks (
    id serial PRIMARY KEY,
    name varchar(225) NOT NULL,
    locations_id INT REFERENCES Locations(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS Unite_types (
    id serial PRIMARY KEY,
    name varchar(225) NOT NULL,
    length INT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS Unites (
    id serial PRIMARY KEY,
    name varchar(225) NOT NULL,
    blocks_id INT REFERENCES Business(id) NOT NULL,
    unite_type_id INT REFERENCES Unite_types(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS clients(
    id serial PRIMARY KEY,
    first_name varchar(225) NOT NULL,
    last_name varchar(225) NOT NULL,
    email varchar(225) NOT NULL,
    telephone varchar(225) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);CREATE TABLE IF NOT EXISTS used_storages(
    id serial PRIMARY KEY,
    client_id INT REFERENCES clients(id) NOT NULL,
    unite_id INT REFERENCES Unites(id) NOT NULL UNIQUE,
    business_id INT REFERENCES Business(id) NOT NULL,
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
    locations(address, business_id)
VALUES
    ('Gauteng Johannesburg Fourways riversands', 2)
INSERT INTO
    blocks(name, locations_id)
VALUES
    ('section-B', 2)
INSERT INTO
    unite_types(
        name,
        length,
        width,
        height
    )
VALUES
    ('warehouse', 120, 180, 80)
INSERT INTO
    unites(
        name,
        blocks_id,
        unite_type_id
    )
VALUES
    ('A3', 1, 1)
INSERT INTO
    clients(
        first_name,
        last_name,
        email,
        telephone
    )
VALUES
    ('Sabelo', 'Msibi', 'skm@gmail.com', '0715585598')
INSERT INTO
    used_storages(
        client_id,
        unite_id,
        business_id
    )
VALUES
    (2, 17, 2)
SELECT
    *
FROM
    blocks
SELECT
    unites.name,
    unites.blocks_id,
    unites.unite_type_id
FROM
    business
    INNER JOIN locations on business.id = locations.business_id
    INNER JOIN blocks on locations.id = blocks.locations_id
    INNER JOIN unites on blocks.id = unites.blocks_id
WHERE
    business.name = 'Mzansi';
SELECT
    unites.name,
    unites.blocks_id,
    unites.unite_type_id
FROM
    unite_types
    INNER JOIN unites on unite_types.id = unites.unite_type_id
WHERE
    unite_types.name = 'garage'
SELECT
    business.name,
    business.contact_name,
    business.contact_number,
    business.contact_email,
    locations.address
FROM
    business
    INNER JOIN locations on business.id = locations.business_id;
SELECT
    unites.name,
    unites.blocks_id,
    unites.unite_type_id,
    unite_types.name,
    unite_types.lenght,
    unite_types.width
FROM
    unite_types
    INNER JOIN unites on unite_types.id = unites.unite_type_id
WHERE
    unite_types.width > 50;