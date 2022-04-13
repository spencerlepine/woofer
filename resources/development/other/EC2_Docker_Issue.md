# macOS M1 Chip Docker issue

Building images on an M1 Chip can cause an issue with the Docker container. The container will appear to run, but doing `docker container ls` returns nothing.

To fix this, you can set up the `QEMU Emulator`.

## Restart the ubuntu Docker service

```sh
sudo systemctl daemon-reload
```

## Set up the QEMU Emulator on EC2

```sh
sudo su
sudo yum install qemu binfmt-support qemu-user-static -y # Install the qemu packages
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes # This step will execute the registering scripts
docker run --rm -t arm64v8/ubuntu uname -m # Testing the emulation environment
# NOW start the docker container again
docker run -d -p 80:80 -t spencerlepine/woofer:latest woofer
```

# BUILD A MULTI ARCH IMAGE

> DockerHub multi-arch [Article](https://github.com/docker/docker.github.io/blob/2d8b420d3c49712ec4a7bcec1464278fa4c41936/docker-for-mac/multi-arch.md)

```sh
docker buildx ls
docker buildx create --name mybuilder
docker buildx use mybuilder
docker buildx inspect --bootstrap
# cd path/to/file/with-Dockerfile
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t spencerlepine/demo:latest --push .
# enter the server folder
cd server
&&
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t spencerlepine/sdc-nginx --push .
&&
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t spencerlepine/node-server --push .
# build with fewer architectures
docker buildx build --platform linux/amd64,linux/arm64 -t spencerlepine/node-server --push .
docker buildx build --platform linux/amd64 -t spencerlepine/node-server --push .
```

## Links:

- [betterprogramming.pub article](https://betterprogramming.pub/containerize-node-react-postgres-with-docker-on-aws-ca548595f01e)
- [Digital Ocean article](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- [Ubuntu Article](https://askubuntu.com/questions/938700/how-do-i-install-docker-on-ubuntu-16-04-lts)
