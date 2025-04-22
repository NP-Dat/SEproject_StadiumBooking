    @echo off
    echo Starting all microservices... 
    echo Make sure you have run 'npm install' in each service directory first.

    @REM REM Start Auth Service
    @REM echo Starting Auth Service...
    @REM cd microservice/Auth
    @REM start "Auth Service (Port 8001)" cmd /k npm run dev
    @REM cd ../..

    @REM REM Start User Service
    @REM echo Starting User Service...
    @REM cd microservice/User
    @REM start "User Service (Port 8002)" cmd /k npm run dev
    @REM cd ../..

    @REM REM Start Event Service
    @REM echo Starting Event Service...
    @REM cd microservice/Event
    @REM start "Event Service (Port 8003)" cmd /k npm run dev
    @REM cd ../..

    @REM REM Start Booking Service
    @REM echo Starting Booking Service...
    @REM cd microservice/Booking
    @REM start "Booking Service (Port 8004)" cmd /k npm run dev
    @REM cd ../..

    REM Start Event Owner Service
    echo Starting Event Owner Service...
    cd microservice/event_owner
    start "Event Owner Service (Port 8008)" cmd /k npm run dev
    cd ../..

    REM Start API Gateway
    echo Starting API Gateway...
    cd microservice/APIGateway
    start "API Gateway (Port 8000)" cmd /k npm run dev
    cd ../..

    REM Start Client
    echo Starting Client...
    cd client/event-owner-client
    start "Client (Port 3000)" cmd /k npm start
    cd ../..

    echo All services are starting in separate terminal windows. 
    echo just API Gateway and Event Owner Service at this time; and client for demo FE

    REM use "REM" to comment out the line
    REM ".\start-all.bat" run this line in terminal of Project folder to start this file
