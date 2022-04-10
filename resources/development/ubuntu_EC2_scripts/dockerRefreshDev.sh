# chmod 700 dockerRefresh.sh

docker ps -a | grep "woofer" | awk '{print $1}' | xargs docker rm -f

docker image prune -a -f

docker run \
    -it \
    --rm \
    -p 3000:3000 \
    --env-file ./.env \
    -t spencerlepine/woofer-dev:latest