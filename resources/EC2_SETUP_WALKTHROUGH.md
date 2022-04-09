## Launch the EC2 instance

1.  Visit [aws.amazon.com/ec2](https://aws.amazon.com/ec2/)
    2 Launch an `Amazon Linux 2 AMI (HVM) - Kernel 4.14, SSD Volume Type (64 bit)` instance
2.  Add `HTTP port 80 forwarding` rule to Secuirity Group
3.  Add `HTTPS port 80 forwarding` rule to Secuirity Group
4.  Wait for the instance to boot up
5.  SSH into EC2 instance

## Set up the SSH Key

```sh
  [ec2-user ~]$ cd ~/.ssh
  [ec2-user ~]$ ssh-keygen -t rsa -b 4096 -C "spencerlepine26@gmail.com"
  # enter "github-actions"
  # *enter passphrase*
  [ec2-user ~]$ cat github-actions.pub >> authorized_keys
  [ec2-user ~]$ nano github-actions
```

## Set up packages and docker

```sh
  # Update the packages on your instance
  [ec2-user ~]$ sudo yum update -y
  # Install Docker
  [ec2-user ~]$ sudo yum install docker -y
  # Start the Docker Service
  [ec2-user ~]$ sudo service docker start
  # Add the ec2-user to the docker group so you can exec
  te Docker commands without using sudo.
  [ec2-user ~]$ sudo usermod -a -G docker ec2-user
  # Verify docker installed
  [ec2-user ~]$ docker --version
  # Forward the port for HTTPS access
  [ec2-user ~]$ sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

## Start/Restart Docker Container

```sh
# Run the docker container build
[ec2-user ~]$ docker run -d -p 3000:3000 --name woofer -t spencerlepine/woofer:latest
```

#### Restart the docker container

```sh
[ec2-user ~]$ docker stop woofer
[ec2-user ~]$ docker rm woofer
[ec2-user ~]$ docker containers ls
[ec2-user ~]$ docker run -d -p 3000:3000 --name woofer -t spencerlepine/woofer:latest
```

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
docker run -d -p 3000:3000 --name woofer -t spencerlepine/woofer:latest
```

# https://github.com/docker/docker.github.io/blob/2d8b420d3c49712ec4a7bcec1464278fa4c41936/docker-for-mac/multi-arch.md

# BUILD A MULTI ARCH IMAGE

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
