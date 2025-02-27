CREATE DATABASE IF NOT EXISTS stadium_booking_v2;
USE stadium_booking_v2;

DROP TABLE IF EXISTS `Payment`;
DROP TABLE IF EXISTS `Ticket`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `seatStadiumC`;
DROP TABLE IF EXISTS `seatStadiumB`;
DROP TABLE IF EXISTS `seatStadiumA`;
DROP TABLE IF EXISTS `Schedules`;
DROP TABLE IF EXISTS `Events`;
DROP TABLE IF EXISTS `Stadiums`;



CREATE TABLE Stadiums (
    id INT NOT NULL AUTO_INCREMENT,  -- Use AUTO_INCREMENT for primary keys
    name VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    status VARCHAR(255) NOT NULL,  -- Consider ENUM for limited status options
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Events (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,  -- Use DATET for date
    owner VARCHAR(255) NOT NULL,  -- Consider a separate 'Owners' table
    PRIMARY KEY (id)
);

CREATE TABLE Schedules (
    id INT NOT NULL AUTO_INCREMENT,
    stadiumID INT NOT NULL,
    eventID INT NOT NULL,
    date DATE NOT NULL,          -- Separate date
    timeStart TIME NOT NULL,      -- Separate time
    timeEnd TIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (stadiumID) REFERENCES Stadiums(id) ON DELETE CASCADE,  -- FK to Stadiums
    FOREIGN KEY (eventID) REFERENCES Events(id) ON DELETE CASCADE      -- FK to Events
);

--  REPLACING seatStadiumA, seatStadiumB, seatStadiumC with a single, normalized table
CREATE TABLE Seats (
    id INT NOT NULL AUTO_INCREMENT,
    stadiumID INT NOT NULL,          -- Link to the Stadium
    seat_number VARCHAR(50) NOT NULL, -- Can be 'A1', 'B2', etc.  More flexible.
    status VARCHAR(255) NOT NULL,    -- Consider ENUM ('Available', 'Booked', 'Reserved', etc.)
    PRIMARY KEY (id),
    FOREIGN KEY (stadiumID) REFERENCES Stadiums(id) ON DELETE CASCADE,
     UNIQUE KEY `unique_seat_in_stadium` (`stadiumID`,`seat_number`) -- Ensure unique seat numbers within a stadium.
);


CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    birth DATE NOT NULL,         -- Use DATE for birthdate
    phoneNumber VARCHAR(20) NOT NULL, -- Limit phone number length
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,  -- Email should be unique
    PRIMARY KEY (id)
);

CREATE TABLE Ticket (
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    seatID INT NOT NULL,       -- Now references the unified 'Seats' table
    scheduleID INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Use DECIMAL for currency
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (scheduleID) REFERENCES Schedules(id) ON DELETE CASCADE,
    FOREIGN KEY (seatID) REFERENCES Seats(id) ON DELETE CASCADE -- FK to Seats
);

CREATE TABLE Payment (
    id INT NOT NULL AUTO_INCREMENT,
    time TIME NOT NULL,      -- separate time part
    date DATE NOT NULL,      -- separate date part
    service VARCHAR(255) NOT NULL,  -- Consider a separate 'PaymentServices' table
    totalCost DECIMAL(10, 2) NOT NULL,
    numberOfTicket INT NOT NULL,
    userID INT NOT NULL,
    scheduleID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (scheduleID) REFERENCES Schedules(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_schedules_stadium_event ON Schedules (stadiumID, eventID);
CREATE INDEX idx_ticket_user_schedule ON Ticket (userID, scheduleID);
CREATE INDEX idx_payment_user_schedule ON Payment (userID, scheduleID);
CREATE INDEX idx_seats_stadium ON Seats (stadiumID);