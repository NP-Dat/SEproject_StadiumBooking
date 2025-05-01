-- Sample data for Ticket service testing
USE stadium_booking_v2;

-- Insert sample stadiums
INSERT INTO Stadiums (name, size, status, address) VALUES
('Olympic Stadium', 60000, 'active', '123 Olympic Ave, Sports City'),
('Victory Arena', 40000, 'active', '456 Victory St, Champions Town'),
('Liberty Stadium', 35000, 'active', '789 Liberty Blvd, Freedom City');

-- Insert sample events
INSERT INTO EventList (name, date, owner) VALUES
('Music Festival 2025', '2025-05-15', 'Festival Productions Inc'),
('Football Championship', '2025-06-10', 'Sports Association'),
('Tech Conference 2025', '2025-07-20', 'Tech Events LLC');

-- Insert sample event schedules
INSERT INTO EventSchedules (stadiumID, eventID, date, timeStart, timeEnd) VALUES
(1, 1, '2025-05-15', '18:00:00', '23:00:00'),
(2, 2, '2025-06-10', '19:30:00', '22:00:00'),
(3, 3, '2025-07-20', '09:00:00', '18:00:00');

-- Insert sample event zones (ticket types)
INSERT INTO eventZone (name, size, eventScheduleID, price, status) VALUES
('VIP Zone', 100, 1, 200.00, 'active'),
('Regular Zone', 500, 1, 100.00, 'active'),
('Economy Zone', 1000, 1, 50.00, 'active'),
('Premium Seating', 200, 2, 150.00, 'active'),
('Standard Seating', 800, 2, 80.00, 'active'),
('VIP Access', 50, 3, 300.00, 'active'),
('General Admission', 500, 3, 100.00, 'active');

-- Insert sample seats (just a few for testing)
INSERT INTO Seats (stadiumID, seat_number, status) VALUES
-- Seats for Olympic Stadium (stadiumID 1)
(1, 'A1', 'available'),
(1, 'A2', 'available'),
(1, 'A3', 'available'),
(1, 'B1', 'available'),
(1, 'B2', 'available'),
-- Seats for Victory Arena (stadiumID 2)
(2, 'A1', 'available'),
(2, 'A2', 'available'),
(2, 'A3', 'available'),
(2, 'B1', 'available'),
(2, 'B2', 'available'),
-- Seats for Liberty Stadium (stadiumID 3)
(3, 'A1', 'available'),
(3, 'A2', 'available'),
(3, 'A3', 'available'),
(3, 'B1', 'available'),
(3, 'B2', 'available');

-- Insert sample customers
INSERT INTO Customers (userName, passWord, fullName, birth, phoneNumber, address, email) VALUES
('john_doe', 'hashed_password_1', 'John Doe', '1990-05-15', '1234567890', '123 Main St', 'john@example.com'),
('jane_smith', 'hashed_password_2', 'Jane Smith', '1992-08-21', '0987654321', '456 Oak St', 'jane@example.com'),
('mike_jones', 'hashed_password_3', 'Mike Jones', '1985-11-30', '5556667777', '789 Pine St', 'mike@example.com');

-- Insert sample owners
INSERT INTO Owners (userName, passWord, phoneNumber, email) VALUES
('event_org1', 'hashed_password_4', '1112223333', 'eventorg1@example.com'),
('event_org2', 'hashed_password_5', '4445556666', 'eventorg2@example.com');

-- Insert sample carts
INSERT INTO Carts (userID, numberOfTicket, totalPrice, status) VALUES
(1, 2, 300.00, 'unpaid'),
(2, 1, 150.00, 'paid'),
(3, 3, 250.00, 'unpaid');

-- Insert sample tickets
INSERT INTO Tickets (userID, seatID, scheduleID, zoneID, cartID) VALUES
(1, 1, 1, 1, 1),  -- John Doe, Music Festival, VIP Zone
(1, 2, 1, 1, 1),  -- John Doe, Music Festival, VIP Zone
(2, 6, 2, 4, 2),  -- Jane Smith, Football Championship, Premium Seating
(3, 11, 3, 6, 3), -- Mike Jones, Tech Conference, VIP Access
(3, 12, 3, 7, 3), -- Mike Jones, Tech Conference, General Admission
(3, 13, 3, 7, 3); -- Mike Jones, Tech Conference, General Admission

-- Insert sample payments
INSERT INTO Payments (time, date, service, totalCost, userID, cartID) VALUES
('14:30:00', '2025-04-20', 'Credit Card', 150.00, 2, 2); -- Jane Smith paid for her ticket