CREATE DATABASE IF NOT EXISTS stadium_booking_v2;
USE stadium_booking_v2;

-- Drop tables in reverse order of creation to avoid foreign key constraint errors
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Tickets;
DROP TABLE IF EXISTS Customers;  -- Was Users
DROP TABLE IF EXISTS Seats;  -- No change needed, not a reserved word
DROP TABLE IF EXISTS EventSchedules; -- Was Schedules
DROP TABLE IF EXISTS EventList;      -- Was Events
DROP TABLE IF EXISTS Stadiums;      -- No change needed


CREATE TABLE Stadiums (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    status VARCHAR(255) NOT NULL,  -- Consider ENUM
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE EventList (  -- Renamed from Events
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    owner VARCHAR(255) NOT NULL,  -- Consider a separate 'Owners' table
    PRIMARY KEY (id)
);

CREATE TABLE EventSchedules (  -- Renamed from Schedules
    id INT NOT NULL AUTO_INCREMENT,
    stadiumID INT NOT NULL,
    eventID INT NOT NULL,
    date DATE NOT NULL,
    timeStart TIME NOT NULL,
    timeEnd TIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (stadiumID) REFERENCES Stadiums(id) ON DELETE CASCADE,
    FOREIGN KEY (eventID) REFERENCES EventList(id) ON DELETE CASCADE  -- Use new name
);

CREATE TABLE Seats (
    id INT NOT NULL AUTO_INCREMENT,
    stadiumID INT NOT NULL,
    seat_number VARCHAR(50) NOT NULL,
    status VARCHAR(255) NOT NULL,    -- Consider ENUM
    PRIMARY KEY (id),
    FOREIGN KEY (stadiumID) REFERENCES Stadiums(id) ON DELETE CASCADE,
    UNIQUE KEY `unique_seat_in_stadium` (`stadiumID`,`seat_number`)
);

CREATE TABLE Customers (  -- Renamed from Users
    id INT NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    birth DATE NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Tickets ( -- Renamed from Ticket
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    seatID INT NOT NULL,
    scheduleID INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Customers(id) ON DELETE CASCADE,  -- Use new name
    FOREIGN KEY (scheduleID) REFERENCES EventSchedules(id) ON DELETE CASCADE,  -- Use new name
    FOREIGN KEY (seatID) REFERENCES Seats(id) ON DELETE CASCADE
);

CREATE TABLE Payments ( -- Renamed from Payment
    id INT NOT NULL AUTO_INCREMENT,
    time TIME NOT NULL,
    date DATE NOT NULL,
    service VARCHAR(255) NOT NULL,  -- Consider 'PaymentServices' table
    totalCost DECIMAL(10, 2) NOT NULL,
    numberOfTicket INT NOT NULL,
    userID INT NOT NULL,
    scheduleID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Customers(id) ON DELETE CASCADE,  -- Use new name
    FOREIGN KEY (scheduleID) REFERENCES EventSchedules(id) ON DELETE CASCADE  -- Use new name
);

-- Indexes for performance (using new table names)
CREATE INDEX idx_schedules_stadium_event ON EventSchedules (stadiumID, eventID);
CREATE INDEX idx_ticket_user_schedule ON Tickets (userID, scheduleID);
CREATE INDEX idx_payment_user_schedule ON Payments (userID, scheduleID);
CREATE INDEX idx_seats_stadium ON Seats (stadiumID);