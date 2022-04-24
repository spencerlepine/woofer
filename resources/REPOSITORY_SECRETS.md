#### Settings > Secrets > Actions > New repository secret

```yml
enviroment:
  name: CI
  secrets:
    CODACY_PROJECT_TOKEN: <https://docs.codacy.com/>

enviroment:
  name: staging
  secrets:
      DOCKERHUB_CLIENT_REPO: woofer-client
      DOCKERHUB_SERVER_REPO: woofer-server
      # EC2_PASSPHRASE: "the fox jumped over the moon"
      EC2_SSH_KEY: # .pem file contents
      EC2_REMOTE_HOST: ec2-xx-xxx-xxx-xxx.us-west-2.compute.amazonaws.com
      EC2_REMOTE_USER: ec2-user

enviroment:
  production
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
  SERVER_URL: "/"
  PORT: 5000
  MONGODB_URL: "mongodb://127.0.0.1:27017/test"
  SKIP_PREFLIGHT_CHECK: true
  # Firebase Project > Project Settings > SDK setup and configuration
  REACT_APP_FIREBASE_API_KEY: ""
  REACT_APP_FIREBASE_AUTH_DOMAIN: ""
  REACT_APP_FIREBASE_PROJECT_ID: ""
  REACT_APP_FIREBASE_STORAGE_BUCKET: ""
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: ""
  REACT_APP_FIREBASE_APP_ID: ""
  REACT_APP_FIREBASE_MEASUREMENT_ID: ""
```
