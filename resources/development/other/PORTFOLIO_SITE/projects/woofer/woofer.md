---
date: '2021-04-20'
title: 'Woofer'
github: 'https://github.com/spencerlepine/woofer'
external: 'TODO'
description: 'Dating app for pets - a full stack MERN project. Complete with CI/CD pipeline"
tech:
  - React
  - Express
  - Node
  - MongoDB
  - Docker
  - EC2
company: ''
showInProjects: true
slug: /projects/woofer
screenshots:
  - ./woofer-logo.png
---

Dating app for pets - a full stack MERN project. Complete with CI/CD pipeline w/ GitHub Actions from Docker Hub to AWS EC2.

View the [demo](TODO), or view the [GitHub Repository](https://github.com/spencerlepine/woofer)

# 🎯 Overview

- Designed a MongoDB atlas NoSQL database managing user profile records, zip code groups, and yes/no match records
- Built real-time chat feature with Socket.io with persistent message history stored in the database.
- Integrated Firebase Authentication to manage user accounts, and verify tokens for the backend API requests.
- Integrated CI/CD pipeline with Git, Jest, GitHub Actions, Docker, and AWS EC2.
- Developed with a ticket system and feature branches, while following schemas and UI designs.

## Woofer Project Idea

who/what/when/where/why

# 🌟 Features

See the [Whitepaper](./WOOFER_WHITEPAPER.pdf).

## Project Challenges:

## Wireframes:

I planned out the UI in Figma for this project, checkout [the wireframes here](https://github.com/spencerlepine/quickcart/tree/master/whitepaper).

## Challenges:

#### Authentication

Since the goal of this project was to have grocery lists accessible on any device, I planned to deploy it. This was my first experience with Authentication, and I wasn't sure how to approach it.

With the client/server MERN stack, I began with sending a user/password to the server. I quickly realized this flaw, which led me to Firebase.

Instead of investing in the backend and database, I decided to focus on the client side. This transition allowed me only develop the UI/UX and user stories to improve the actual product.

#### The Database

In the beginning, I started with a simple MongoDB database writing CRUD operations with an Express server. I also had a `.csv` file with grocery product data, and I needed a way to import/export it all. I was able to integrate a CSV file download and upload feature in the client. However, this was not a great solution if I were to use this app on my phone as well.

The other problem was everything was stored a single user. After integrating Firebase for authentication, I decided to scrap the MERN stack and migrate to Firebase Firestore.

I found Firestore to be very intuitive and continued expanding the database. Overall, it was helped me understand the importance of following a database design and schema just like crafting code.

#### State Management

As more features were added, the code base became more complex. Eventually, I was managing many Context hooks, API helper functions, and components.

This forced me to carefully design components and organize data passed down through props. At one point, I did a complete overhaul of the codebase to clean up the project.

As a result, it was a great lesson for writing better front end code.

## 📦 More Technologies:

- [Jest](https://jestjs.io/)
- [React Testing Libary](https://testing-library.com/)
- [OpenFoodFacts](https://world.openfoodfacts.org)
- [Google CSE](https://cse.google.com)
- [Spoonacular](https://spoonacular.com/food-api/docs)

---

🏠 [spencerlepine.com](https://www.spencerlepine.com) &nbsp;&middot;&nbsp; 😺 GitHub [@spencerlepine](https://github.com/spencerlepine) &nbsp;&middot;&nbsp; 🐦 Twitter [@spencerlepine](http://twitter.com/spencerlepine)
