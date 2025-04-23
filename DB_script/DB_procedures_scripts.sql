-- Procedure #1: insert customer into DB for register

DELIMITER //

CREATE PROCEDURE insert_customer(
    IN p_userName VARCHAR(255),
    IN p_passWord VARCHAR(255),
    IN p_fullName VARCHAR(255),
    IN p_birth DATE,
    IN p_phoneNumber VARCHAR(20),
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(255),
    OUT p_success TINYINT(1)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_success = 0;
    END;

    INSERT INTO Customers(userName, passWord, fullName, birth, phoneNumber, address, email)
    VALUES (p_userName, p_passWord, p_fullName, p_birth, p_phoneNumber, p_address, p_email);

    SET p_success = 1;
END;//

DELIMITER ;

CALL insert_customer('johndoe', 'password123', 'John Doe', '1990-01-01', '1234567890', '123 Main St', 'john@example.com', @success);
SELECT @success;