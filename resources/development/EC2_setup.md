Article (with nginx):
https://medium.com/digitalcrafts/how-to-set-up-an-ec2-instance-with-github-node-js-and-postgresql-e363cb771826

Deploy NOde to EC2:
Uses rsync tho... do not use the action
https://dev.to/stretch0/deploy-your-node-app-to-ec2-with-github-actions-h9a

Update the packages on your instance

[ec2-user ~]$ sudo yum update -y

Install Docker

[ec2-user ~]$ sudo yum install docker -y

Start the Docker Service

[ec2-user ~]$ sudo service docker start

Add the ec2-user to the docker group so you can execute Docker commands without using sudo.

[ec2-user ~]$ sudo usermod -a -G docker ec2-user
