docker-compose pull
docker kill $(docker ps -q)
docker-compose up --no-build


docker run --env-file ./.env -d -p 5000:5000 spencerlepine/woofer-server:latest
docker run -d -p 3000:3000 spencerlepine/woofer-client:latest

CONTAINER_ID=$(docker ps | awk ' /spencerlepine\/woofer-client:latest/ { print $1 }')
docker cp .env $CONTAINER_ID:/.env