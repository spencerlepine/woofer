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
  [ec2-user ~]$ ssh-keygen -t rsa -b 4096 -C "myemail@gmail.com"
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
  # Add the ec2-user to the docker group so you can execte Docker commands without using sudo.
  [ec2-user ~]$ sudo usermod -a -G docker ec2-user
  # Verify docker installed
  [ec2-user ~]$ docker --version
  # Forward the port for HTTPS access
  [ec2-user ~]$ sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

## Install Git

```sh
#Perform a quick update on your instance:
sudo yum update -y

#Install git in your EC2 instance
sudo yum install git -y

#Check git version
git version
```

## Create the .env file

Create the `.env` file (see [.env.sample](../.env.sample))

```sh
[ec2-user ~]$ touch .env
[ec2-user ~]$ vim .env # paste values
```

### Install Docker Compose

```sh
sudo yum update
sudo yum install docker
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### Start the Docker Container

```sh
# Run the docker container build
$ git clone https://github.com/spencerlepine/woofer.git
$ cd woofer
$ docker-compose up
$ docker-compose up -d # to run in the background
```
