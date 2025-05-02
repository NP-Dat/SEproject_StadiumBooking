@echo off
:: Navigate to the APIGateway service folder and run it
start cmd /k "cd /d d:\Phuc Dat\IU\MY PROJECT\SE\SEproject_StadiumBooking\Server\microservice\APIGateway && npm install && npm run dev"

:: Navigate to the Booking service folder and run it
start cmd /k "cd /d d:\Phuc Dat\IU\MY PROJECT\SE\SEproject_StadiumBooking\Server\microservice\Booking && npm install && npm run dev"

:: Optional: Add a message to indicate the script has finished
echo Services are starting in separate windows...