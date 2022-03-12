# Woofer &middot; [![CI](https://github.com/spencerlepine/woofer/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/spencerlepine/woofer/actions/workflows/main.yml) [![Coverage Status](https://coveralls.io/repos/github/spencerlepine/woofer/badge.svg?branch=main)](https://coveralls.io/github/spencerlepine/woofer?branch=main)

Dating app for dogs, a full stack MERN project.

[![Demo GIF](./whitepaper/resources/images/demo.gif)](https://gallant-torvalds-547222.netlify.app/)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Setup](#⚙️-setup)
- [API Schema](#api-schema)
- [Application Architecture](#application-architectures)
- [Technologies](#📦-technologies)
- [Ticket System](#🎯-ticket-system)
- [Contributors](#contributors)

## Description

The solo project was completed in [TIMEFRAME] to help practice full stack development.

> (EXPLAIN what users can do and the IP of this project)

## Features
TODO
<!--
### Landing Page

#### Welcome Banner

![Home Page](./resources/images/home_page.png)

#### Product Catalog Page

- Browse all available products

![Product Page](./resources/images/product_page.png)

#### Product Detail Page

- View nutrition facts
- Save the product to cart
- Rate the product

![Product Detail Page](./resources/images/product_detail_page.gif)

### User Authentication

#### Account Type Selection

#### Login / Sign up

- Choose a Customer, Farmer, or Nutritionist account
- Browse the app and product catalog without being logged in
- Create an account or login Email/Password, Google, or Facebook
- Access live chat with a nutritionist

![Login Page](./resources/images/login_page.gif)
-->

## ⚙️ Setup:

Create a Firebase project and MongoDB Atlas database.

```sh
    cd client
    cp .env.sample .env
    npm install
    npm start
```

```sh
    cd server # open new window
    cp .env.sample .env
    npm install
    npm start
```

## API Schema

See [Endpoint Schema](./whitepaper/resources/WOOFER_API.md).

## Application Architecture

![Deployment Architecture](./whitepaper/resources/images/Project_Deployment.png)

## 📦 Technologies:

Development:
- [GitHub](https://github.com/)
- [Netlify](https://www.netlify.com/)
- [Webapp.io](https://webapp.io/onboarding/github)
- [Coveralls.io](https://coveralls.io/)
- [docker-compose](https://docs.docker.com/compose/)

Front-end:
- [React](https://github.com/facebook/react/)
- [Burma](https://github.com/jgthms/bulma) CSS Framework
- [Firebase](https://firebase.google.com/) Authentication GitHub - mrbenhowl/mocking-firebase-initializeApp-and-firebase-auth-using-jest: Mocking firebase initializeApp and firebase.auth() for unit testing app using firebase

Backend:
- [Node](https://nodejs.org/)
- [Express.js](http://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)

Testing:
- [Jest](https://jestjs.io/) Jest Mock for Unit Testing MERN Back-end | by Yasaminkamali | JavaScript in Plain English
- [Crypress](https://www.cypress.io/) End-to-end testing
- [supertest](https://github.com/visionmedia/supertest) Express /endpoint testing

Modules:
- [Joi](https://github.com/sideway/joi) Input verification
- [Socket.io](https://socket.io/) API for chat

# 🎯 Ticket System
- Project Steps: [Trello Board](https://trello.com/b/tYtdHAT5/woofer-project)
- Development Process: [Trello Board](https://trello.com/b/kf2DJ80r/woofer-development)

## Contributors

- [Spencer Lepine](https://github.com/spencerlepine)

---

🏠 [spencerlepine.com](https://www.spencerlepine.com) &nbsp;&middot;&nbsp; 😺 GitHub [@spencerlepine](https://github.com/spencerlepine) &nbsp;&middot;&nbsp; 🐦 Twitter [@spencerlepine](http://twitter.com/spencerlepine)
