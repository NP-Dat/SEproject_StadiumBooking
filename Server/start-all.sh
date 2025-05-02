#!/bin/bash
# filepath: d:/Phuc Dat/IU/MY PROJECT/SE/SEproject_StadiumBooking/Server/start-all.sh

echo "Starting all microservices..."

# Function to start a service
start_service() {
    local service_name=$1
    local port=$2
    local dir=$3
    
    echo "Starting $service_name..."
    pushd $dir > /dev/null
    npm install
    echo "[$service_name ($port)] Starting in new terminal..."
    gnome-terminal --title="$service_name (Port $port)" -- bash -c "npm run dev; read -p 'Press Enter to close...'" 2>/dev/null || \
    xterm -T "$service_name (Port $port)" -e "npm run dev; read -p 'Press Enter to close...'" 2>/dev/null || \
    konsole --new-tab -p tabtitle="$service_name (Port $port)" -e bash -c "npm run dev; read -p 'Press Enter to close...'" 2>/dev/null || \
    x-terminal-emulator -T "$service_name (Port $port)" -e bash -c "npm run dev; read -p 'Press Enter to close...'" 2>/dev/null || \
    echo "Could not open terminal window for $service_name, running in background instead" && npm run dev &
    popd > /dev/null
}

# Start API Gateway
start_service "API Gateway" 8000 "microservice/APIGateway"

# Start Auth Service
start_service "Auth Service" 8001 "microservice/Auth"

# Start User Service
start_service "User Service" 8002 "microservice/User"

# Start Event Service
start_service "Event Service" 8003 "microservice/Event"

# Start Booking Service
start_service "Booking Service" 8004 "microservice/Booking"

# Start Ticket Service
start_service "Ticket Service" 8005 "microservice/Ticket"

# Commented services
# Uncomment to enable

# # Start Event Owner Service
# start_service "Event Owner Service" 8008 "microservice/event_owner"

# # Start Client
# start_service "Client" 3000 "client/event-owner-client"

echo "All services are starting in separate terminal windows."
echo "Note: This script attempts to use gnome-terminal, xterm, konsole, or a generic terminal"
echo "If no terminal is available, services will run in background"

# "chmod +x start-all.sh" to make the script executable
# "./start-all.sh" to run the script