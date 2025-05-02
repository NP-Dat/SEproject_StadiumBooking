@echo off
echo Starting all microservices... 

REM Start API Gateway
echo Starting API Gateway...
cd microservice/APIGateway
call npm install
start "API Gateway (Port 8000)" cmd /k npm run dev
cd ../..

REM Start Auth Service
echo Starting Auth Service...
cd microservice/Auth
call npm install
start "Auth Service (Port 8001)" cmd /k npm run dev
cd ../..

REM Start User Service
echo Starting User Service...
cd microservice/User
call npm install
start "User Service (Port 8002)" cmd /k npm run dev
cd ../..

REM Start Event Service
echo Starting Event Service...
cd microservice/Event
call npm install
start "Event Service (Port 8003)" cmd /k npm run dev
cd ../..

REM Start Booking Service
echo Starting Booking Service...
cd microservice/Booking
call npm install
start "Booking Service (Port 8004)" cmd /k npm run dev
cd ../..

REM Start Ticket Service
echo Starting Ticket Service...
cd microservice/Ticket
call npm install
start "Ticket Service (Port 8005)" cmd /k npm run dev
cd ../..

@REM REM Start Event Owner Service
@REM echo Starting Event Owner Service...
@REM cd microservice/event_owner
@REM call npm install
@REM start "Event Owner Service (Port 8008)" cmd /k npm run dev
@REM cd ../..


@REM REM Start Client
@REM echo Starting Client...
@REM cd client/event-owner-client
@REM call npm install
@REM start "Client (Port 3000)" cmd /k npm start
@REM cd ../..

echo All services are starting in separate terminal windows. 

REM use "REM" to comment out the line
REM ".\start-all.bat" run this line in terminal when your terminal is in Server folder.