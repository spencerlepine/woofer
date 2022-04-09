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
# Forward the port for HTTPS access
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
# Run the product build docker image in container
docker run -d -p 3000:3000 --name woofer -t spencerlepine/woofer:latest