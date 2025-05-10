USE stadium_booking_v2;
select * from Owners;
select * from Stadiums;
select * from EventList;
select * from EventSchedules;
select * from eventZone;
select * from Tickets;
select * from Carts;
select * from Tickets where userID = 2;
select * from Customers;
select * from Seats;



SELECT MAX(seatID) AS maxSeatID
        FROM Tickets
        WHERE scheduleID = 2 AND zoneID = 16 ;
        
   SELECT u.fullname, el.name AS eventName, es.date, es.timeStart, s.name AS stadiumName, s.address, st.seat_number
                FROM Tickets t
                JOIN Customers u ON t.userID = u.id
                JOIN EventSchedules es ON t.scheduleID = es.id
                JOIN EventList el ON es.eventID = el.id
                JOIN Stadiums s ON es.stadiumID = s.id
                JOIN Seats st ON t.seatID = st.id

                WHERE t.userID = 1;

DELETE FROM Customers
WHERE id = '1';

SELECT * FROM Customers WHERE id = 6;

INSERT INTO Customers (userName, passWord, fullName, birth, phoneNumber, address, email) VALUES
('user', '123', 'user1', '1990-01-01', '1234567890', 'address 1', 'user@g.com'),
('admin', '123', 'admin1', '1985-02-02', '9876543210', 'Địa chỉ 2', 'admin@g.com'),
('owner', '123', 'owner1', '1980-03-03', '5555555555', 'address 3', 'owner@g.com');

INSERT INTO Roles (userID, role) VALUES
(1, 'user'), 
(2, 'admin'), 
(3, 'owner'); 

INSERT INTO Stadiums (name, size, status, address) VALUES ('Stadium A', 30, 'Open', '123 Main Street');
INSERT INTO Stadiums (name, size, status, address) VALUES ('Stadium B', 30, 'Closed', '456 Elm Avenue');
INSERT INTO Stadiums (name, size, status, address) VALUES ('Stadium C', 30, 'Under Construction', '789 Oak Road');

-- Insert 10 values into EventList table
INSERT INTO EventList (name, date, owner) VALUES
('Conference A', '2025-01-15', 'Organizer 1'),
('Workshop B', '2025-01-22', 'Organizer 2'),
('Seminar C', '2025-02-05', 'Organizer 3'),
('Exhibition D', '2025-02-18', 'Organizer 4'),
('Festival E', '2025-03-10', 'Organizer 5'),
('Concert F', '2025-03-25', 'Organizer 6'),
('Tournament G', '2025-04-02', 'Organizer 7'),
('Fair H', '2025-04-15', 'Organizer 8'),
('Gala I', '2025-05-01', 'Organizer 9'),
('Summit J', '2025-05-20', 'Organizer 10');

-- Insert 10 values into EventSchedules table
INSERT INTO EventSchedules (stadiumID, eventID, date, timeStart, timeEnd) VALUES
(1, 1, '2025-01-15', '09:00:00', '17:00:00'), -- Event from EventList id 1
(2, 2, '2025-01-22', '10:00:00', '18:00:00'), -- Event from EventList id 2
(3, 3, '2025-02-05', '14:00:00', '22:00:00'), -- Event from EventList id 3
(1, 4, '2025-02-18', '11:00:00', '19:00:00'), -- Event from EventList id 4
(2, 5, '2025-03-10', '19:00:00', '23:00:00'), -- Event from EventList id 5
(3, 6, '2025-03-25', '08:00:00', '16:00:00'), -- Event from EventList id 6
(1, 7, '2025-04-02', '13:00:00', '21:00:00'), -- Event from EventList id 7
(2, 8, '2025-04-15', '15:00:00', '23:00:00'), -- Event from EventList id 8
(3, 9, '2025-05-01', '09:30:00', '17:30:00'), -- Event from EventList id 9
(1, 10, '2025-05-20', '12:00:00', '20:00:00'); -- Event from EventList id 10


-- Inserting 90 seats, 30 for each stadium (ID: 1, 2, 3)
-- Using seat numbers like A1-A10, B1-B10, C1-C10 for each.
-- Assuming all seats are initially 'Available'.

INSERT INTO Seats (stadiumID, seat_number, status) VALUES
-- Stadium 1 Seats (30 total)
(1, 'A1', 'Available'), (1, 'A2', 'Available'), (1, 'A3', 'Available'), (1, 'A4', 'Available'), (1, 'A5', 'Available'),
(1, 'A6', 'Available'), (1, 'A7', 'Available'), (1, 'A8', 'Available'), (1, 'A9', 'Available'), (1, 'A10', 'Available'),
(1, 'B1', 'Available'), (1, 'B2', 'Available'), (1, 'B3', 'Available'), (1, 'B4', 'Available'), (1, 'B5', 'Available'),
(1, 'B6', 'Available'), (1, 'B7', 'Available'), (1, 'B8', 'Available'), (1, 'B9', 'Available'), (1, 'B10', 'Available'),
(1, 'C1', 'Available'), (1, 'C2', 'Available'), (1, 'C3', 'Available'), (1, 'C4', 'Available'), (1, 'C5', 'Available'),
(1, 'C6', 'Available'), (1, 'C7', 'Available'), (1, 'C8', 'Available'), (1, 'C9', 'Available'), (1, 'C10', 'Available'),

-- Stadium 2 Seats (30 total)
(2, 'A1', 'Available'), (2, 'A2', 'Available'), (2, 'A3', 'Available'), (2, 'A4', 'Available'), (2, 'A5', 'Available'),
(2, 'A6', 'Available'), (2, 'A7', 'Available'), (2, 'A8', 'Available'), (2, 'A9', 'Available'), (2, 'A10', 'Available'),
(2, 'B1', 'Available'), (2, 'B2', 'Available'), (2, 'B3', 'Available'), (2, 'B4', 'Available'), (2, 'B5', 'Available'),
(2, 'B6', 'Available'), (2, 'B7', 'Available'), (2, 'B8', 'Available'), (2, 'B9', 'Available'), (2, 'B10', 'Available'),
(2, 'C1', 'Available'), (2, 'C2', 'Available'), (2, 'C3', 'Available'), (2, 'C4', 'Available'), (2, 'C5', 'Available'),
(2, 'C6', 'Available'), (2, 'C7', 'Available'), (2, 'C8', 'Available'), (2, 'C9', 'Available'), (2, 'C10', 'Available'),

-- Stadium 3 Seats (30 total)
(3, 'A1', 'Available'), (3, 'A2', 'Available'), (3, 'A3', 'Available'), (3, 'A4', 'Available'), (3, 'A5', 'Available'),
(3, 'A6', 'Available'), (3, 'A7', 'Available'), (3, 'A8', 'Available'), (3, 'A9', 'Available'), (3, 'A10', 'Available'),
(3, 'B1', 'Available'), (3, 'B2', 'Available'), (3, 'B3', 'Available'), (3, 'B4', 'Available'), (3, 'B5', 'Available'),
(3, 'B6', 'Available'), (3, 'B7', 'Available'), (3, 'B8', 'Available'), (3, 'B9', 'Available'), (3, 'B10', 'Available'),
(3, 'C1', 'Available'), (3, 'C2', 'Available'), (3, 'C3', 'Available'), (3, 'C4', 'Available'), (3, 'C5', 'Available'),
(3, 'C6', 'Available'), (3, 'C7', 'Available'), (3, 'C8', 'Available'), (3, 'C9', 'Available'), (3, 'C10', 'Available');

INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) VALUES ('VIP Zone A', 1, 10, 10, 1, 150.0, 'Available');
INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) 
VALUES ('Regular Zone B', 11, 30, 20, 1, 75.0, 'Available');

INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) VALUES ('VIP Zone A', 1, 10, 10, 2, 150.0, 'Available');
INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) 
VALUES ('Regular Zone B', 11, 30, 20, 2, 75.0, 'Available');

INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) VALUES ('VIP Zone A', 1, 10, 10, 3, 150.0, 'Available');
INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) 
VALUES ('Regular Zone B', 11, 30, 20, 3, 75.0, 'Available');



INSERT INTO Carts (userID, numberOfTicket, totalPrice, status) 
VALUES (1, 2, 300, 'unPaid');


