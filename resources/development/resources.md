## All Documentation and Resources

A collection of all useful resources that helped me build this project.

### Wireframes

[Excalidraw](https://excalidraw.com/) - for drawing simple diagrams
[Trello](https://trello.com/) - boards for ticket system

### Code Coverage and GitHub Actions

Merge Jest Test coverage - [Stack Overflow](https://stackoverflow.com/questions/62560224/jest-how-to-merge-coverage-reports-from-different-jest-test-runs)
Upload Artifacts - [Article](https://github.com/actions/upload-artifact)

### End-to-end (E2E) Testing

E2E Testing w/ Puppeteer [Blog Article](https://blog.logrocket.com/react-end-to-end-testing-jest-puppeteer/)

Jest Puppetter Set up [Digital Ocean Article](https://www.digitalocean.com/community/tutorials/how-to-write-end-to-end-tests-in-node-js-using-puppeteer-and-jest)

### Socket.io Setup

Socket.io Getting Started - [Documentation](https://socket.io/get-started/chat)
React/Express Socket.io setup - [Article](https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial)
Try this stack overflow solution: [React Socket.io client](https://stackoverflow.com/questions/69780002/node-js-react-socket-io-emit-not-working)

Bulma Chat app with ROOM setup - [Article](https://dev.to/graphicbeacon/build-a-chat-application-in-dart-part-3-1bm5)

### GitHub Actions - CD/CI

Getting started with GitHub Actions CI/CD - [Blog Article](https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps/)

CI/CD using GitHub Actions [Repository Example](https://github.com/open-sauced/open-sauced/tree/main/.github)

GitHub Actions 7 Advanced Workflows - [Blog Article](https://github.blog/2021-11-18-7-advanced-workflow-automation-features-with-github-actions/)

## MERN Repo setup

MERN Monorepo boilerplate - [Article](https://gegia.me/mern-monorepo-boilerplate/)

## MERN Docker Setup

Trying to get the MERN full stack application Dockerized with nginx and docker-compose. Trying to build everything to be able to run on the EC2 instance. Also changed the GitHub Actions workflow to work with this new setup.

Complete MERN + Docker + EC2 Guide: [Article](https://xiaoyunyang.github.io/post/a-complete-guide-to-deploying-your-web-app-to-amazon-web-service/)

CORS Docker problem: [Medium Article](https://maximillianxavier.medium.com/solving-cors-problem-on-local-development-with-docker-4d4a25cd8cfe)
NGINX Docker Setup: [Medium Article](https://medium.com/@mahmed_mushtaq/deploying-a-mern-application-on-digital-ocean-with-docker-part-1-cc3932e0d620)
Full Stack Docker + React + Express + Nginx Setup: [Medium Article](https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/)
Node.js Express Server Allow CORS: [Snippet](https://www.codegrepper.com/code-examples/javascript/access-control-allow-origin+nodejs+express)

MERN Docker Deploy EC2 Example Repo: [GitHub Repository](https://github.com/kamal-hossain/MERN-docker-ec2-deploy-practice)

Docker Refactor Article
Setting up docker from scratch](https://mherman.org/blog/dockerizing-a-react-app/)

## Repo File Visualizer Feature:

Visualizer - [GitHub Action](https://github.com/githubocto/repo-visualizer)

## PoniCode Unit Test Generator GitHub Action

https://github.com/marketplace/actions/ponicode-unit-test

Create `scorecards.yml` to test code vulnerabilities:

Reusable GitHub Actions Tutorial: [YouTube Video](https://www.youtube.com/watch?v=lRypYtmbKMs)

Scorecards workflow - Code Scanning

```yml
name: Scorecards supply-chain security
on:
  # Only the default branch is supported.
  branch_protection_rule:
  schedule:
    # Weekly on Saturdays.
    - cron: "30 1 * * 6"
  push:
    branches: [main, master]

# Declare default permissions as read only.
permissions: read-all

jobs:
  analysis:
    name: Scorecards analysis
    runs-on: ubuntu-latest
    permissions:
      # Needed to upload the results to code-scanning dashboard.
      security-events: write
      actions: read
      contents: read

    steps:
      - name: "Checkout code"
        uses: actions/checkout@ec3a7ce113134d7a93b817d10a8272cb61118579 # v2.4.0
        with:
          persist-credentials: false

      - name: "Run analysis"
        uses: ossf/scorecard-action@c1aec4ac820532bab364f02a81873c555a0ba3a1 # v1.0.4
        with:
          results_file: results.sarif
          results_format: sarif
          # Read-only PAT token. To create it,
          # follow the steps in https://github.com/ossf/scorecard-action#pat-token-creation.
          repo_token: ${{ secrets.SCORECARD_READ_TOKEN }}
          # Publish the results for public repositories to enable scorecard badges. For more details, see
          # https://github.com/ossf/scorecard-action#publishing-results.
          # For private repositories, `publish_results` will automatically be set to `false`, regardless
          # of the value entered here.
          publish_results: true

      # Upload the results as artifacts (optional). Commenting out will disable uploads of run results in SARIF
      # format to the repository Actions tab.
      - name: "Upload artifact"
        uses: actions/upload-artifact@82c141cc518b40d92cc801eee768e7aafc9c2fa2 # v2.3.1
        with:
          name: SARIF file
          path: results.sarif
          retention-days: 5

      # Upload the results to GitHub's code scanning dashboard.
      - name: "Upload to code-scanning"
        uses: github/codeql-action/upload-sarif@5f532563584d71fdef14ee64d17bafb34f751ce5 # v1.0.26
        with:
          sarif_file: results.sarif
```

### GitHub Actions Docker CI

GitHub Actions Docker Build/Push Layer Caching - [Article](https://evilmartians.com/chronicles/build-images-on-github-actions-with-docker-layer-caching)

### USING GIT FLOW:

RND:
Intro to git flow command - [`git flow` cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
Git flow usage example - [Article](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/init-Gitflow-example-workflow-tutorial)

### GitHub Actions Vulnerabilities

> TOREAD: Keeping your GitHub Actions and workflows secure Part 1: Preventing pwn requests - [Article](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/)
> TOREAD: Keeping your GitHub Actions and workflows secure Part 2: Untrusted input - [Article](https://securitylab.github.com/research/github-actions-untrusted-input/)

> TOREAD: How to Hide Sensitive Things in GitHub Actions Logs - [Article](https://www.tutorialworks.com/github-actions-mask-url/)

> TOREAD: How We Discovered Vulnerabilities in CI/CD Pipelines of Popular Open-Source Projects - [Article](https://cycode.com/blog/github-actions-vulnerabilities/)

> TOCHECKOUT: Project Vulnerabilites Check w/ Synk - [GitHub Action](https://github.com/snyk/actions)

> GitHub Repository + Actions Encrypted Secrets - [Documentation](https://docs.github.com/en/enterprise-cloud@latest/actions/security-guides/encrypted-secrets)
> Accessing Enviroments in workflows: - [Stack Overflow](https://stackoverflow.com/questions/66521958/how-to-access-environment-secrets-from-a-github-workflow)

> Using environments for deployment - [GitHub Article](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
> Use GitHub Actions Encrypted-secrets, production and CI, store secrets in
> environment instead

### Code Analysis for GitHub Actions:

- Code Scanning Action Setup - [GitHub Article](https://docs.github.com/en/github-ae@latest/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/configuring-code-scanning)
- Code QL [GitHub Action](https://github.com/github/codeql-action/actions)

### GitHub Rebasing

- TO WATCH: GitHub Rebase Walkthrough - [Video](https://www.youtube.com/watch?v=KUal3Lh-xuE)
