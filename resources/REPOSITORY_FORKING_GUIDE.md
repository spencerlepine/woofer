# Repository Forking Guide

Steps to set up the repository for GitHub Actions and Deployment

### ⭐ Also see:

1. [Woofer Setup Guide](./WOOFER_SETUP_GUIDE.md)
2. [EC2 Setup Guide](./EC2_SETUP_WALKTHROUGH.md)

### Overview

1. Fork the Repository
2. DockerHub Setup
3. EC2 Setup
4. Update the Repository Secrets

## Step 1: Fork the Repository ⬇️

Fork the repository to your own GitHub Account.

## Step 2: DockerHub Setup 🐋

1. Head over to the [DockerHub](https://hub.docker.com/) page.
2. Create an account or sign in
3. Create a new repository for the client image (e.g. `woofer-client`)
4. Create a new repository for the server image (e.g. `woofer-server`)
5. Note your username, client repository name, and sever repository name

## Step 3: EC2 Setup 🏗️

1. Head over the AWS [EC2](https://aws.amazon.com/ec2/) page.
2. Create an Account/Sign in
3. Follow the [EC2 Setup Guide](./EC2_SETUP_WALKTHROUGH.md)
4. Save the `.pem` keys to reference later

## Step 5: Update the Repository Secrets 🤫

1. Navigate to your GitHub Repository
2. Follow the [Repository Secrets Overview](./REPOSITORY_SECRETS.md)
