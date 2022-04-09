```yml
# Settings > Secrets > Actions > New repository secret
github_secrets:
  DOCKER_HUB_USERNAME: johndoe
  DOCKER_HUB_PASSWORD: pass123
  DOCKER_CONTAINER_NAME: myproject
  DOCKER_HUB_REPO: johndoe/myproject
  DOCKER_HUB_REPO_DEV: johndoe/myproject-dev
  EC2_PASSPHRASE: "the fox jumped over the moon"
  EC2_SSH_KEY: # .pem file contents
  EC2_REMOTE_HOST: ec2-xx-xxx-xxx-xxx.us-west-2.compute.amazonaws.com
  EC2_REMOTE_USER: ec2-user
  EC2_PORT: "3000"
  ENV_PRODUCTION: # copy/paste .env.sample file
```
