# Publish the image
docker images
docker tag bb38976d03cf spencerlepine/woofer:latest
docker push spencerlepine/woofer

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
