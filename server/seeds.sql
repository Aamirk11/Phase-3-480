-- Insert data into Manager table
INSERT INTO Manager (ssn, name, email) VALUES
('123-45-6789', 'John Smith', 'john.smith@carrental.com'),
('234-56-7890', 'Emily Johnson', 'emily.johnson@carrental.com'),
('345-67-8901', 'Michael Brown', 'michael.brown@carrental.com'),
('456-78-9012', 'Sarah Davis', 'sarah.davis@carrental.com'),
('567-89-0123', 'David Wilson', 'david.wilson@carrental.com');

-- Insert data into Client table
INSERT INTO Client (name, email) VALUES
('Robert Taylor', 'robert.taylor@example.com'),
('Jennifer Garcia', 'jennifer.garcia@example.com'),
('James Martinez', 'james.martinez@example.com'),
('Patricia Robinson', 'patricia.robinson@example.com'),
('Thomas Lee', 'thomas.lee@example.com'),
('Margaret Walker', 'margaret.walker@example.com'),
('Charles Hall', 'charles.hall@example.com'),
('Lisa Young', 'lisa.young@example.com'),
('Daniel King', 'daniel.king@example.com'),
('Nancy Adams', 'nancy.adams@example.com');

-- Insert data into Address table
INSERT INTO Address (road_name, number, city) VALUES
('Main Street', '123', 'New York'),
('Oak Avenue', '456', 'Los Angeles'),
('Pine Road', '789', 'Chicago'),
('Cedar Lane', '101', 'Houston'),
('Maple Drive', '202', 'Phoenix'),
('Elm Boulevard', '303', 'Philadelphia'),
('Willow Way', '404', 'San Antonio'),
('Birch Street', '505', 'San Diego'),
('Spruce Court', '606', 'Dallas'),
('Redwood Circle', '707', 'San Jose'),
('Aspen Place', '808', 'Austin'),
('Sycamore Road', '909', 'Jacksonville'),
('Juniper Avenue', '1010', 'Fort Worth'),
('Cypress Lane', '1111', 'Columbus'),
('Palm Drive', '1212', 'Charlotte');

-- Insert data into Driver table
INSERT INTO Driver (name, address_id) VALUES
('Michael Johnson', 1),
('Emma Williams', 2),
('Christopher Davis', 3),
('Olivia Miller', 4),
('Daniel Wilson', 5),
('Sophia Moore', 6),
('Matthew Taylor', 7),
('Ava Anderson', 8),
('Andrew Thomas', 9),
('Isabella Jackson', 10);

-- Insert data into Car table
INSERT INTO Car (brand) VALUES
('Toyota'),
('Honda'),
('Ford'),
('Chevrolet'),
('BMW'),
('Mercedes-Benz'),
('Audi'),
('Volkswagen'),
('Hyundai'),
('Kia');

-- Insert data into Model table
INSERT INTO Model (model_id, car_id, color, construction_year, transmission) VALUES
(1, 1, 'Silver', 2022, 'automatic'),
(2, 1, 'Black', 2021, 'automatic'),
(1, 2, 'Blue', 2023, 'automatic'),
(1, 3, 'Red', 2022, 'manual'),
(1, 4, 'White', 2023, 'automatic'),
(1, 5, 'Black', 2021, 'automatic'),
(1, 6, 'Silver', 2022, 'automatic'),
(1, 7, 'Blue', 2021, 'automatic'),
(1, 8, 'Gray', 2023, 'manual'),
(1, 9, 'White', 2022, 'automatic'),
(1, 10, 'Red', 2021, 'automatic'),
(2, 2, 'Green', 2022, 'manual'),
(2, 3, 'Yellow', 2021, 'automatic'),
(2, 4, 'Brown', 2023, 'manual'),
(2, 5, 'Silver', 2022, 'automatic');

-- Insert data into DriverCanDriveModel table
INSERT INTO DriverCanDriveModel (driver_id, model_id, car_id) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 1, 2),
(2, 1, 3),
(2, 1, 4),
(3, 1, 5),
(3, 2, 5),
(4, 1, 6),
(5, 1, 7),
(6, 1, 8),
(7, 1, 9),
(8, 1, 10),
(9, 2, 2),
(10, 2, 3),
(1, 2, 4);

-- Insert data into ClientAddress table
INSERT INTO ClientAddress (client_id, address_id) VALUES
(1, 11),
(2, 12),
(3, 13),
(4, 14),
(5, 15),
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 5);

-- Insert data into CreditCard table
INSERT INTO CreditCard (card_number, client_id, payment_address_id) VALUES
('4111-1111-1111-1111', 1, 11),
('5500-0000-0000-0004', 2, 12),
('3400-0000-0000-009', 3, 13),
('6011-0000-0000-0004', 4, 14),
('3566-0000-0000-0006', 5, 15),
('4242-4242-4242-4242', 6, 1),
('5105-1051-0510-5100', 7, 2),
('3714-4963-5398-431', 8, 3),
('6011-6011-6011-6611', 9, 4),
('3530-1113-3330-0000', 10, 5);

-- Insert data into Rent table
INSERT INTO Rent (date, client_id, driver_id, model_id, car_id) VALUES
('2023-01-15', 1, 1, 1, 1),
('2023-02-20', 2, 2, 1, 3),
('2023-03-10', 3, 3, 1, 5),
('2023-04-05', 4, 4, 1, 6),
('2023-05-12', 5, 5, 1, 7),
('2023-06-18', 6, 6, 1, 8),
('2023-07-22', 7, 7, 1, 9),
('2023-08-30', 8, 8, 1, 10),
('2023-09-14', 9, 9, 2, 2),
('2023-10-25', 10, 10, 2, 3),
('2023-11-05', 1, 2, 1, 4),
('2023-12-12', 2, 3, 2, 5),
('2024-01-08', 3, 4, 1, 6),
('2024-02-19', 4, 5, 1, 7),
('2024-03-27', 5, 6, 1, 8);

-- Insert data into Review table
INSERT INTO Review (review_id, driver_id, message, rating, client_id) VALUES
(1, 1, 'Great service and very professional driver!', 5, 1),
(2, 2, 'Driver was on time and very friendly.', 4, 2),
(3, 3, 'Good experience overall.', 4, 3),
(4, 4, 'Driver was knowledgeable about the area.', 5, 4),
(5, 5, 'Smooth ride and excellent driver.', 5, 5),
(6, 6, 'Driver was late but very apologetic and professional afterwards.', 3, 6),
(7, 7, 'Excellent service!', 5, 7),
(8, 8, 'Driver was very helpful with my luggage.', 4, 8),
(9, 9, 'Pleasant conversation and safe driving.', 4, 9),
(10, 10, 'Driver got lost a couple of times.', 2, 10),
(11, 1, 'Would recommend this driver to anyone!', 5, 2),
(12, 2, 'Quick response and efficient service.', 4, 3),
(13, 3, 'Very polite and professional.', 5, 4),
(14, 4, 'Arrived early and was patient while I got ready.', 5, 5),
(15, 5, 'Clean vehicle and pleasant driver.', 4, 6);