# Woofer Setup Guide

Steps to run the app locally for development

### ⭐ Also see:

1. [Repository Forking Guide](./REPOSITORY_FORKING_GUIDE.md)
2. [EC2 Setup Guide](./EC2_SETUP_WALKTHROUGH.md)

### Overview

1. Clone the Repository
2. MongoDB Setup
3. Firebase Setup
4. Create the `.env` file
5. Run the app locally

## Step 1: Clone the Repository ⬇️

```sh
git clone https://github.com/spencerlepine/woofer.git
cd woofer
npm install
```

## Step 2: MongoDB Setup 🍃

#### Run MongoDB Locally

You can run a MongoDB locally for development. One way to install and run this is with homebrew if using mac. Reference the MongoDB [installation guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) for more details.

```bash
brew services stop mongodb
brew uninstall homebrew/core/mongodb

# Use the migrated distribution from custom tap
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# now running on PORT 27017 (default)
# connection string: "mongodb://127.0.0.1:27017/<myDevDatabase>"
```

#### Start a MongoDB Atlas in the Cloud

1. Head over to the [MongoDB Atlas](https://www.mongodb.com/atlas/database) page.
2. Create an account
3. Deploy a new cluster
4. Save the connection string
   > mongodb://root:password123@198.174.21.23:27017/databasename

#### [OPTIONAL] Run MongoDB in Memory

Check out the [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) package on npm.

## Step 3: Firebase Setup 🔥

1. Head over the Google [Firebase](https://firebase.google.com/) page.
2. Create an Account/Sign in
3. Start a new project
4. Click Project Overview, active as a Web Project

### Update the Authentication settings

- Navigate to the Authentication tab
- Activate _email/password_ authentication
- List `<your_domain_url>` or `localhost` under "**Authentication > Sign-in method > Authorized domains**"

### Set up Firebase Storage

- Navigate to the Storage tab
- Enable Firebase Storage
- Open the _"Rules"_ tab > Update the Storage Rules

```
rules_version = '2';
service firebase.storage {
 match /b/{bucket}/o {
   match /{userId}/{fileName} {
     // Anyone can read
     allow read;
     // Only the user can upload their own profile picture
     // Profile picture must be of content-type "image/*"
     allow write: if request.auth.uid == userId
                  && request.resource.contentType.matches('image/.+');
   }
 }
}
```

## Step 4: Create the `.env` file 🤫

Create a file in the project root directory called `.env`.

```sh
cp .env.sample
.env
```

### Save the ENV variables

Open the `.env` file and update the configuration variables

```
NODE_ENV=development
SERVER_URL="http://localhost:5000"
PORT=5000
MONGODB_URL="mongodb://127.0.0.1:27017/test"
SKIP_PREFLIGHT_CHECK=true
REACT_APP_FIREBASE_API_KEY="asdf"
REACT_APP_FIREBASE_AUTH_DOMAIN="asdf"
REACT_APP_FIREBASE_PROJECT_ID="asdf"
REACT_APP_FIREBASE_STORAGE_BUCKET="asdf"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="asdf"
REACT_APP_FIREBASE_APP_ID="asdf"
REACT_APP_FIREBASE_MEASUREMENT_ID="asdf"
```

## Step 5: Run the app locally 🚀

### 🐳 Build + Run with Docker

Install [Docker](https://www.docker.com/) locally
Run these commands to build a docker image and run the containers

```
docker-compose up --build
# visit http://localhost:3000
```

### OR

#### Run with npm

Run these commands to start up the server and client

```sh
npm run dev:server
# * Open a NEW terminal *
npm run dev:client
# visit http://localhost:3000
```
