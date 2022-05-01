# Woofer &middot; [![CI/CD](https://github.com/spencerlepine/woofer/workflows/CI%2FCD/badge.svg)](https://github.com/spencerlepine/woofer/actions/workflows/production.yml) [![Codacy Badge](https://app.codacy.com/project/badge/Coverage/345a8ceb0a7d404a841395b125cb4c41)](https://www.codacy.com/gh/spencerlepine/woofer/dashboard?utm_source=github.com&utm_medium=referral&utm_content=spencerlepine/woofer&utm_campaign=Badge_Coverage) [![Code Analysis](https://github.com/spencerlepine/woofer/workflows/Code%20Analysis/badge.svg)](https://github.com/spencerlepine/woofer/actions/workflows/code-analysis.yml)

Dating app for dogs. Customize a dating profile, update preferences, and match/chat with nearby users. View the [DEMO](https://bit.ly/woofer-demo)

[![Demo GIF](./resources/assets/demo.gif)](https://bit.ly/woofer-demo)

## 🎯 Overview

- Designed a MongoDB atlas NoSQL database managing user profile records, zip code groups, and yes/no match records
- Built real-time chat feature with Socket.io with persistent message history stored in the database.
- Integrated Firebase Authentication to manage user accounts, and verify tokens for the backend API requests.
- Integrated CI/CD pipeline with Git, Jest, GitHub Actions, Docker, and AWS EC2.
- Developed with a ticket system and feature branches, while following schemas and UI designs.

## 🌟 Features

See the [Whitepaper](./resources/WOOFER_WHITEPAPER.pdf).

## 🤔 Challenges

View [Issue Tickets](https://github.com/spencerlepine/woofer/issues?q=label%3AChallenge+is%3Aclosed+)

> Or read [Challenges](./resources/challenges.txt) text file.

## 📦 Technologies

**Front-end:** [React](https://github.com/facebook/react/), [Bulma](https://github.com/jgthms/bulma)

**Backend:** [Node](https://nodejs.org/), [Express.js](http://expressjs.com/), [MongoDB](https://docs.mongodb.com/)

**Testing:** [Jest](https://jestjs.io/) , [supertest](https://github.com/visionmedia/supertest), [Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [Puppeteer](https://pptr.dev/), [Coveralls.io](https://coveralls.io/)

**CI/CD:** [Docker](https://docs.docker.com/), [GitHub Actions](https://docs.github.com/en/actions), [DockerHub](https://hub.docker.com/), [AWS EC2](https://aws.amazon.com/ec2/)

**Modules:** [Firebase](https://firebase.google.com/) (Authentication), [Socket.io](https://socket.io/) (Chat API)

## ⚙️ Development Setup

> See [SETUP Guide](./resources/WOOFER_SETUP_GUIDE.md).

```sh
cp .env.sample .env
npm install
```

```sh
# * Open a NEW terminal *
npm run dev:client
```

## 🏗️ Application Architecture

![Deployment Architecture](./resources/assets/Project_Deployment.png)

## 🤖 CI/CD Pipeline

![CI/CD Pipeline Diagram](./resources/assets/CI_CD_PIPELINE.png)

## 🗄 Database Design

![Database Design](./resources/assets/Database_Design.png)

## 🌐 API Documentation

See [Endpoints](./resources/WOOFER_API.md).

## 🗃️ Ticket System

- Project Tickets: [Trello Board](https://trello.com/b/tYtdHAT5/woofer-project)

![Trello Tickets Screenshot](./resources/assets/Trello_Board_Tickets.png)

## 🚀 Contributors

- [Spencer Lepine](https://github.com/spencerlepine)
  - 🏠 Blog [spencerlepine.com](https://www.spencerlepine.com)
  - 😺 GitHub [@spencerlepine](https://github.com/spencerlepine)
  - 🐦 Twitter [@spencerlepine](http://twitter.com/spencerlepine)
  - 💼 [LinkedIn](https://www.linkedin.com/in/spencer-lepine)
