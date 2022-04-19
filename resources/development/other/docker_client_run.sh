
# LOAD THE .env into memory
export $(grep -v '^#' .env | xargs)

# Build the client image
docker build -t client" \
--build-arg NODE_ENV="$NODE_ENV" \
--build-arg SERVER_URL="$SERVER_URL" \
--build-arg PORT="$PORT" \
--build-arg MONGODB_URL="$MONGODB_URL" \
--build-arg SKIP_PREFLIGHT_CHECK="$SKIP_PREFLIGHT_CHECK" \
--build-arg REACT_APP_FIREBASE_API_KEY="$REACT_APP_FIREBASE_API_KEY" \
--build-arg REACT_APP_FIREBASE_AUTH_DOMAIN="$REACT_APP_FIREBASE_AUTH_DOMAIN" \
--build-arg REACT_APP_FIREBASE_PROJECT_ID="$REACT_APP_FIREBASE_PROJECT_ID" \
--build-arg REACT_APP_FIREBASE_STORAGE_BUCKET="$REACT_APP_FIREBASE_STORAGE_BUCKET" \
--build-arg REACT_APP_FIREBASE_MESSAGING_SENDER_ID="$REACT_APP_FIREBASE_MESSAGING_SENDER_ID" \
--build-arg REACT_APP_FIREBASE_APP_ID="$REACT_APP_FIREBASE_APP_ID" \
--build-arg REACT_APP_FIREBASE_MEASUREMENT_ID="$REACT_APP_FIREBASE_MEASUREMENT_ID" \
.

# Run the container!
docker run -it -p 3000:3000 --env NODE_ENV="$NODE_ENV"" \
--env SERVER_URL="$SERVER_URL" \
--env PORT="$PORT" \
--env MONGODB_URL="$MONGODB_URL" \
--env SKIP_PREFLIGHT_CHECK="$SKIP_PREFLIGHT_CHECK" \
--env REACT_APP_FIREBASE_API_KEY="$REACT_APP_FIREBASE_API_KEY" \
--env REACT_APP_FIREBASE_AUTH_DOMAIN="$REACT_APP_FIREBASE_AUTH_DOMAIN" \
--env REACT_APP_FIREBASE_PROJECT_ID="$REACT_APP_FIREBASE_PROJECT_ID" \
--env REACT_APP_FIREBASE_STORAGE_BUCKET="$REACT_APP_FIREBASE_STORAGE_BUCKET" \
--env REACT_APP_FIREBASE_MESSAGING_SENDER_ID="$REACT_APP_FIREBASE_MESSAGING_SENDER_ID" \
--env REACT_APP_FIREBASE_APP_ID="$REACT_APP_FIREBASE_APP_ID" \
--env REACT_APP_FIREBASE_MEASUREMENT_ID="$REACT_APP_FIREBASE_MEASUREMENT_ID" \
client

