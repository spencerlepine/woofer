# Publish the image
docker images
docker tag bb38976d03cf spencerlepine/woofer:latest
docker push spencerlepine/woofer

# docker tag 672529f7c24c spencerlepine/woofer-dev:latest
# docker push spencerlepine/woofer-dev

# Build sample container
docker build -t sample:dev .
docker run \
    -it \
    --rm \
    -p 3000:3000 \
    --env-file ./.env \
    sample:dev

# Run the product build docker image in container
docker run \
    -d \ # or "-it" to test
    --rm \
    -p 3000:3000 \
    --env-file ./.env \
    --name woofer \
    -t spencerlepine/woofer:latest



docker run \
    -d \
    --rm \
    -p 3000:3000 \
    --env-file ./.env \
    -t spencerlepine/woofer-dev:latest

docker run \
    -it \
    --rm \
    -p 3000:3000 \
    --env-file ./.env \
    -t spencerlepine/woofer-dev:latest
