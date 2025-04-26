CREATE DATABASE IF NOT EXISTS stadium_booking_v2;
USE stadium_booking_v2;


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

CREATE TABLE eventZone (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    eventScheduleID INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255) NOT NULL,  -- Consider ENUM
    PRIMARY KEY (id),
    FOREIGN KEY (eventScheduleID) REFERENCES EventSchedules(id) ON DELETE CASCADE
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
    userName VARCHAR(255) NOT NULL,
    passWord VARCHAR(255) NOT NULL,    
    fullName VARCHAR(255) NOT NULL,
    birth DATE NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Roles (  -- Handle Users
    id INT NOT NULL AUTO_INCREMENT,
	userID INT NOT NULL,
    role VARCHAR(255) NOT NULL,    -- Consider ENUM
    optionalKey VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE Owners (  -- Event Owner, they can book stadiums for their events
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    passWord VARCHAR(255) NOT NULL,    
    phoneNumber VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Carts ( -- Handle for Payments
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    numberOfTicket INT NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
	status VARCHAR(255) NOT NULL,  -- unPaid or Paid
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Customers(id) ON DELETE CASCADE
);

CREATE TABLE Tickets ( -- Renamed from Ticket
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    seatID INT NOT NULL,
    scheduleID INT NOT NULL,
    zoneID INT NOT NULL,
    cartID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Customers(id) ON DELETE CASCADE,  -- Use new name
    FOREIGN KEY (scheduleID) REFERENCES EventSchedules(id) ON DELETE CASCADE,  -- Use new name
    FOREIGN KEY (seatID) REFERENCES Seats(id) ON DELETE CASCADE,
    FOREIGN KEY (cartID) REFERENCES Carts(id) ON DELETE CASCADE,
    FOREIGN KEY (zoneID) REFERENCES eventZone(id) ON DELETE CASCADE
);

-- Indexes for performance (using new table names)
CREATE INDEX idx_schedules_stadium_event ON EventSchedules (stadiumID, eventID);
CREATE INDEX idx_ticket_user_schedule ON Tickets (userID, scheduleID);
CREATE INDEX idx_seats_stadium ON Seats (stadiumID);

