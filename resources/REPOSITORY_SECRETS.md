#### Settings > Secrets > Actions > New repository secret

## Create `CI` enviroment with test coverage uploads

```yml
enviroment:
  name: CI
  secrets:
    CODACY_PROJECT_TOKEN: <https://docs.codacy.com/>
```

## Create `development` enviroment with development ENV vars

```yml
enviroment: development
secrets:
  NODE_ENV: "development"
  SERVER_URL: "http://localhost:5000"
  PORT: 5000
  MONGODB_URL: "mongodb://127.0.0.1:27017/test"
  SKIP_PREFLIGHT_CHECK: true
  REACT_APP_FIREBASE_API_KEY: ""
  REACT_APP_FIREBASE_AUTH_DOMAIN: ""
  REACT_APP_FIREBASE_PROJECT_ID: ""
  REACT_APP_FIREBASE_STORAGE_BUCKET: ""
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: ""
  REACT_APP_FIREBASE_APP_ID: ""
  REACT_APP_FIREBASE_MEASUREMENT_ID: ""
```

## Create `staging` enviroment with pre-production info

```yml
enviroment:
  name: staging
  secrets:
    DOCKERHUB_CLIENT_REPO: woofer-client
    DOCKERHUB_SERVER_REPO: woofer-server
    # EC2_PASSPHRASE: "the fox jumped over the moon"
    EC2_SSH_KEY: # .pem file contents
    EC2_REMOTE_HOST: ec2-xx-xxx-xxx-xxx.us-west-2.compute.amazonaws.com
    EC2_REMOTE_USER: ec2-user
```

## Create `production` enviroment with production ENV vars

```yml
enviroment: production
secrets:
  DOCKERHUB_USERNAME: spencerlepine
  DOCKERHUB_PASSWORD: abc12345
  DOCKERHUB_CLIENT_REPO: woofer-client
  DOCKERHUB_SERVER_REPO: woofer-server
  EC2_PASSPHRASE: "the fox jumped over the moon"
  EC2_SSH_KEY: # .pem file contents
  EC2_REMOTE_HOST: ec2-xx-xxx-xxx-xxx.us-west-2.compute.amazonaws.com
  EC2_REMOTE_USER: ec2-user
  NODE_ENV: "production"
  SERVER_URL: "http://localhost:5000"
  PORT: 5000
  MONGODB_URL: "mongodb://127.0.0.1:27017/test"
  SKIP_PREFLIGHT_CHECK: true
  REACT_APP_FIREBASE_API_KEY: ""
  REACT_APP_FIREBASE_AUTH_DOMAIN: ""
  REACT_APP_FIREBASE_PROJECT_ID: ""
  REACT_APP_FIREBASE_STORAGE_BUCKET: ""
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: ""
  REACT_APP_FIREBASE_APP_ID: ""
  REACT_APP_FIREBASE_MEASUREMENT_ID: ""
```
