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
    lenght INT NOT NULL,
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
    unite_id INT REFERENCES Unites(id) NOT NULL,
    business_id INT REFERENCES Business(id) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW() NOT NULL,
    updated_at timestamp NOT NULL DEFAULT NOW() NOT NULL
);