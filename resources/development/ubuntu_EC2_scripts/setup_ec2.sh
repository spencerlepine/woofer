## Launch the EC2 instance
# 1. Visit [aws.amazon.com/ec2](https://aws.amazon.com/ec2/)
# 2  Launch an `Amazon Linux 2 AMI (HVM) - Kernel 4.14, SSD Volume Type (64 bit)` instance
# 3. Add `HTTP port 80 forwarding` rule to Secuirity Group
# 4. Add `HTTPS port 80 forwarding` rule to Secuirity Group
# 5. Wait for the instance to boot up
# 6. SSH into EC2 instance

# Set up the SSH Key
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "myemail@gmail.com"
# enter "github-actions"
# *enter passphrase*
cat github-actions.pub >> authorized_keys
nano github-actions # copy contents to GitHub Repository Secrets => EC2_SSH_KEY

# Install packages + Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
# Verify docker installed
docker --version

# [optional?] Install docker compose
sudo yum update
sudo yum install docker
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Forward the port for HTTPS access
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

# Create the .env file
touch .env
vim .env # paste .env file contents, see .env.sample

# Run the product build docker image in container
# "-d" to running in background, or "-it" to see output and test
docker run \
    -d \
    --rm \
    -p 80:80 \
    --env-file ./.env \
    --name woofer \
    -t spencerlepine/woofer:latest


# Build sample container
docker build -t sample:dev .
docker run \
    -it \
    --rm \
    -p 80:80 \
    --env-file ./.env \
    sample:dev