# Ticket Service - Setup & Testing Guide

## Overview
The Ticket Service provides API endpoints for managing event ticket types (zones) and retrieving tickets. This document guides you through setting up and testing the service.

## Prerequisites
- Node.js (v14.x or higher)
- MySQL database server
- Postman (for testing)
- Use sample_data.sql to populate sample data for your test 

## Setup Instructions

### 1. Create a terminal in folder ticket
Navigate to the Ticket service directory:
```bash
cd Server/microservice/Ticket
```

### 2. Install dependencies
Install required npm packages:
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root of the Ticket directory with the following content:
```
PORT=8009
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=stadium_booking_v2
JWT_SECRET=stadium_booking_secret_key
```
*Note: Replace `your_mysql_password` with your actual MySQL password.*

### 4. Set up the database
Run the sample SQL script to create necessary tables and sample data:
```bash
mysql -u root -p < sample_data.sql
```
*Note: You'll be prompted to enter your MySQL password.*

### 5. Generate JWT tokens for testing
Run the token generator script:
```bash
node generateToken.js
```
This will output admin and user tokens you can use for authenticated API requests.
If you test as an admin, put the admin key inside the Authorization params / Auth Type choose Bearer Token and paste admin key inside Token 
(IDK any other ways, this is what it tolds me to do xD, hope we can resolve this soon)

### 6. Start the service
Run the service in development mode:
```bash
npm run dev
```
You should see output indicating the service is running on port 8009.

## Testing the API

### Postman Collection
Use this Postman collection to test all endpoints:
[Ticket Service Postman Collection](https://www.postman.co/workspace/My-Workspace~9ce5a3d2-baed-44b2-82ff-dd89df05b47c/collection/39948075-75ac9d45-2097-4bc6-9914-7e6f2ea5514d?action=share&creator=39948075&active-environment=39948075-d7b042dd-42bd-4aa3-9a34-d217351d510e)

### Available Endpoints

#### Ticket Types (Event Zones)
- **GET /api/events/{id}/ticket-types**  
  Get all ticket types/zones for an event  
  *Public endpoint, no authentication required*

- **POST /api/events/{id}/ticket-types**  
  Create a new ticket type for an event  
  *Admin only, requires authentication*  
  Example payload:
  ```json
  {
    "name": "VIP Zone",
    "startSeatID": 1,
    "endSeatID": 100,
    "price": 200.00,
    "status": "active",
    "eventScheduleID": 1 
  }
  ```

- **PUT /api/ticket-types/{id}**  
  Update an existing ticket type  
  *Admin only, requires authentication*  
  Example payload:
  ```json
  {
    "name": "Premium Zone",
    "startSeatID": 101,
    "endSeatID": 180,
    "price": 250.00,
    "status": "active"
  }
  ```

- **DELETE /api/ticket-types/{id}**  
  Delete a ticket type  
  *Admin only, requires authentication*

#### Tickets
- **GET /api/tickets**  
  List all tickets in the system  
  *Admin only, requires authentication*

- **GET /api/orders/{order_id}/tickets**  
  Get tickets for a specific order  
  *Requires authentication*

## Troubleshooting

### Database Connection Issues
If you encounter database connection errors:
1. Verify MySQL is running
2. Check that your `.env` file has correct database credentials
3. Ensure the `stadium_booking_v2` database exists

### Authentication Issues
If you receive "Invalid or expired token" errors:
1. Generate new tokens using `node generateToken.js`
2. Ensure your JWT_SECRET matches across services
3. Check that your token hasn't expired (default: 24 hours)

## Notes
- The service handles ticket types (zones) and ticket retrieval only
- For full ticket booking functionality, integration with the Cart service is required
