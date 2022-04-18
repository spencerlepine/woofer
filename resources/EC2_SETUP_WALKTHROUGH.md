## Launch the EC2 instance

1.  Visit [aws.amazon.com/ec2](https://aws.amazon.com/ec2/)
    2 Launch an `Amazon Linux 2 AMI (HVM) - Kernel 4.14, SSD Volume Type (64 bit)` instance
2.  Wait for the instance to boot up
3.  SSH into EC2 instance

## Set up the SSH Key

```sh
$ cd ~/.ssh
$ ssh-keygen -t rsa -b 4096 -C "myemail@gmail.com"
  # Enter key name: "github-actions"
  # Enter passphrase (save this for later use)
$ cat github-actions.pub >> authorized_keys
$ nano github-actions
  # Copy + Paste entire text content (save this for later use)
```

## Docker EC2 Setup:

```sh
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
# sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000
```

## Run Docker Containers

```sh
$ touch .env
$ vim .env # create production env
$ docker system prune -a --volumes
$ docker run -d -p 5000:5000 <DOCKERHUB_USERNAME>/<DOCKERHUB_SERVER_REPO>:latest --env-file ./env --name <DOCKERHUB_SERVER_REPO>
$ docker run -d -p 80:3000 <DOCKERHUB_USERNAME>/<DOCKERHUB_CLIENT_REPO>:latest --env-file ./env --name <DOCKERHUB_CLIENT_REPO>
$ curl http:localhost
```
