CREATE DATABASE IF NOT EXISTS customer_db_v1;
USE customer_db_v1;

CREATE TABLE timeUpdate ( 
    id INT NOT NULL AUTO_INCREMENT,
    time TIME NOT NULL,
    date DATE NOT NULL,
	userID INT NOT NULL,
    updatedAttribute VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);


