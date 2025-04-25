CREATE DATABASE IF NOT EXISTS payment_db_v1;
USE payment_db_v1;

CREATE TABLE Payments ( -- Renamed from Payment
    id INT NOT NULL AUTO_INCREMENT,
    time TIME NOT NULL,
    date DATE NOT NULL,
    service VARCHAR(255) NOT NULL,  -- Consider 'PaymentServices' table
    totalCost DECIMAL(10, 2) NOT NULL,
    cartID INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Wallet ( 
    id INT NOT NULL AUTO_INCREMENT,
	userID INT NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255),    -- Consider ENUM
    PRIMARY KEY (id)
);


