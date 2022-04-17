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
  ENV_PRODUCTION: *.env file contents*
  DOCKERHUB_USERNAME: spencerlepine
  DOCKERHUB_PASSWORD: abc12345
  DOCKERHUB_CLIENT_REPO: woofer-client
  DOCKERHUB_SERVER_REPO: woofer-server
  EC2_PASSPHRASE: "the fox jumped over the moon"
  EC2_SSH_KEY: # .pem file contents
  EC2_REMOTE_HOST: ec2-xx-xxx-xxx-xxx.us-west-2.compute.amazonaws.com
  EC2_REMOTE_USER: ec2-user
```
