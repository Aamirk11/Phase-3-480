-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS ClientAddress CASCADE;
DROP TABLE IF EXISTS CreditCard CASCADE;
DROP TABLE IF EXISTS Review CASCADE;
DROP TABLE IF EXISTS Rent CASCADE;
DROP TABLE IF EXISTS DriverCanDriveModel CASCADE;
DROP TABLE IF EXISTS Model CASCADE;
DROP TABLE IF EXISTS Car CASCADE;
DROP TABLE IF EXISTS Address CASCADE;
DROP TABLE IF EXISTS Driver CASCADE;
DROP TABLE IF EXISTS Client CASCADE;
DROP TABLE IF EXISTS Manager CASCADE;

-- Create tables
-- Manager table
CREATE TABLE Manager (
    ssn VARCHAR(11) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Client table
CREATE TABLE Client (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Address table
CREATE TABLE Address (
    address_id SERIAL PRIMARY KEY,
    road_name VARCHAR(100) NOT NULL,
    number VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL
);

-- Driver table
CREATE TABLE Driver (
    driver_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    address_id INTEGER NOT NULL,
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE
);

-- Car table
CREATE TABLE Car (
    car_id SERIAL PRIMARY KEY,
    brand VARCHAR(100) NOT NULL
);

-- Model table
CREATE TABLE Model (
    model_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    color VARCHAR(50) NOT NULL,
    construction_year INTEGER NOT NULL,
    transmission VARCHAR(10) CHECK (transmission IN ('manual', 'automatic')) NOT NULL,
    PRIMARY KEY (model_id, car_id),
    FOREIGN KEY (car_id) REFERENCES Car(car_id) ON DELETE CASCADE
);

-- DriverCanDriveModel table (many-to-many relationship between Driver and Model)
CREATE TABLE DriverCanDriveModel (
    driver_id INTEGER NOT NULL,
    model_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    PRIMARY KEY (driver_id, model_id, car_id),
    FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) ON DELETE CASCADE,
    FOREIGN KEY (model_id, car_id) REFERENCES Model(model_id, car_id) ON DELETE CASCADE
);

-- Client Address table (many-to-many relationship)
CREATE TABLE ClientAddress (
    client_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
    PRIMARY KEY (client_id, address_id),
    FOREIGN KEY (client_id) REFERENCES Client(client_id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES Address(address_id) ON DELETE CASCADE
);

-- CreditCard table
CREATE TABLE CreditCard (
    card_number VARCHAR(19) PRIMARY KEY,
    client_id INTEGER NOT NULL,
    payment_address_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(client_id) ON DELETE CASCADE,
    FOREIGN KEY (payment_address_id) REFERENCES Address(address_id) ON DELETE CASCADE
);

-- Rent table
CREATE TABLE Rent (
    rent_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    client_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,
    model_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(client_id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) ON DELETE CASCADE,
    FOREIGN KEY (model_id, car_id) REFERENCES Model(model_id, car_id) ON DELETE CASCADE
);

-- Review table
CREATE TABLE Review (
    review_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,
    message TEXT,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5) NOT NULL,
    client_id INTEGER NOT NULL,
    PRIMARY KEY (review_id, driver_id),
    FOREIGN KEY (driver_id) REFERENCES Driver(driver_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES Client(client_id) ON DELETE CASCADE
);