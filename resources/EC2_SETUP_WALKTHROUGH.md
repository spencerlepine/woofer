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
