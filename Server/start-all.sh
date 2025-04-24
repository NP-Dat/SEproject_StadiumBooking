#!/bin/bash

# Function to terminate all services
terminate_services() {
  echo "Terminating all services..."
  # Kill all background jobs
  pkill -P $$
  exit 0
}

# Set trap for Ctrl+C (SIGINT)
trap terminate_services SIGINT

echo "Starting all microservices..."

# Start Auth Service
echo "Starting Auth Service (Port 8001)..."
cd microservice/Auth || exit
npm install --silent &> /dev/null
nohup npm run dev --silent &> auth_service.log &
echo -e "Auth Service started on Port 8001\n"
cd ../..

# Start API Gateway
echo "Starting API Gateway (Port 8000)..."
cd microservice/APIGateway || exit
npm install --silent &> /dev/null
nohup npm run dev --silent &> api_gateway.log &
echo -e "API Gateway started on Port 8000\n"
cd ../..

# Uncomment and modify the following blocks as needed for other services:

# Start User Service
# echo "Starting User Service (Port 8002)..."
# cd microservice/User || exit
# npm install --silent &> /dev/null
# nohup npm run dev --silent &> user_service.log &
# echo "User Service started on Port 8002"
# cd ../..

# Start Event Service
# echo "Starting Event Service (Port 8003)..."
# cd microservice/Event || exit
# npm install --silent &> /dev/null
# nohup npm run dev --silent &> event_service.log &
# echo "Event Service started on Port 8003"
# cd ../..

# Start Booking Service
# echo "Starting Booking Service (Port 8004)..."
# cd microservice/Booking || exit
# npm install --silent &> /dev/null
# nohup npm run dev --silent &> booking_service.log &
# echo "Booking Service started on Port 8004"
# cd ../..

# Start Event Owner Service
# echo "Starting Event Owner Service (Port 8008)..."
# cd microservice/event_owner || exit
# npm install --silent &> /dev/null
# nohup npm run dev --silent &> event_owner_service.log &
# echo "Event Owner Service started on Port 8008"
# cd ../..

# Start Client (if needed)
# echo "Starting Client (Port 3000)..."
# cd client/event-owner-client || exit
# npm install --silent &> /dev/null
# nohup npm start --silent &> client.log &
# echo "Client started on Port 3000"
# cd ../..

echo "All services are starting in the background..."

# Wait indefinitely so the script doesn't exit and terminates services when Ctrl+C is pressed
wait
